"""
AgriLink Real-Time Notification Socket Server
Module: backend/socket_server.py
Requirement: Python APP Requirement #2 — Socket Programming

Description:
A multi-threaded TCP socket server implementing real-time bidirectional messaging
between AgriLink farmers, consumers, and administrative dispatch.
Handles:
- Client registration (Farmer, Consumer, Admin)
- Real-time order placement notifications ("New order received!")
- Farmer status update broadcasts ("Your order has been confirmed.", "Your order is ready.")
- Thread-safe broadcast architecture with client connection pooling.
"""

import socket
import threading
import json
import time
from typing import Dict, List, Any

HOST = "0.0.0.0"
PORT = 65432

# In-memory store for connected clients: {client_id: {"socket": socket_obj, "role": str, "address": tuple}}
CONNECTED_CLIENTS: Dict[str, Dict[str, Any]] = {}
CLIENTS_LOCK = threading.Lock()

# Persistent notification history for REST fallback / replay
NOTIFICATION_HISTORY: List[Dict[str, Any]] = [
    {
        "id": "notif-1",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "event": "order_received",
        "target": "farmer",
        "message": "New order received! Order #AGRI-8492 (Country Tomatoes × 5kg)",
        "order_id": "AGRI-8492"
    },
    {
        "id": "notif-2",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "event": "order_confirmed",
        "target": "consumer",
        "message": "Your order #AGRI-8492 has been confirmed by Farmer Ramesh.",
        "order_id": "AGRI-8492"
    },
    {
        "id": "notif-3",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "event": "order_ready",
        "target": "consumer",
        "message": "Your order #AGRI-8492 is freshly packed and ready for dispatch.",
        "order_id": "AGRI-8492"
    }
]


def broadcast_notification(event_type: str, message: str, target_role: str = "all", order_id: str = None) -> Dict[str, Any]:
    """
    Broadcasts a notification message to all matching connected socket clients.
    Thread-safe and updates notification history.
    """
    payload = {
        "id": f"notif-{int(time.time() * 1000)}",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "event": event_type,
        "target": target_role,
        "message": message,
        "order_id": order_id
    }

    NOTIFICATION_HISTORY.insert(0, payload)
    if len(NOTIFICATION_HISTORY) > 50:
        NOTIFICATION_HISTORY.pop()

    encoded_msg = (json.dumps(payload) + "\n").encode("utf-8")

    with CLIENTS_LOCK:
        disconnected_clients = []
        for client_id, client_data in CONNECTED_CLIENTS.items():
            if target_role == "all" or client_data.get("role") == target_role:
                try:
                    client_data["socket"].sendall(encoded_msg)
                except (socket.error, BrokenPipeError):
                    disconnected_clients.append(client_id)

        # Clean up stale connections
        for dead_id in disconnected_clients:
            try:
                CONNECTED_CLIENTS[dead_id]["socket"].close()
            except Exception:
                pass
            del CONNECTED_CLIENTS[dead_id]

    return payload


def handle_client_connection(client_socket: socket.socket, client_address: tuple):
    """
    Dedicated worker thread handling an individual TCP socket client.
    Listens for JSON commands: REGISTER, NOTIFY, STATUS_CHANGE, PING.
    """
    client_id = f"{client_address[0]}:{client_address[1]}"
    print(f"[Socket Server] New connection accepted from {client_id}")

    try:
        buffer = ""
        while True:
            chunk = client_socket.recv(1024).decode("utf-8")
            if not chunk:
                break
            buffer += chunk

            while "\n" in buffer:
                line, buffer = buffer.split("\n", 1)
                line = line.strip()
                if not line:
                    continue

                try:
                    data = json.loads(line)
                    action = data.get("action")

                    if action == "REGISTER":
                        role = data.get("role", "consumer")
                        with CLIENTS_LOCK:
                            CONNECTED_CLIENTS[client_id] = {
                                "socket": client_socket,
                                "role": role,
                                "address": client_address,
                                "registered_at": time.time()
                            }
                        ack = {"status": "REGISTERED", "client_id": client_id, "role": role}
                        client_socket.sendall((json.dumps(ack) + "\n").encode("utf-8"))
                        print(f"[Socket Server] Client {client_id} registered as role: {role}")

                    elif action == "ORDER_PLACED":
                        order_id = data.get("order_id", "AGRI-NEW")
                        item_summary = data.get("summary", "Fresh Produce")
                        broadcast_notification(
                            event_type="order_placed",
                            message=f"New order received! Order #{order_id} ({item_summary})",
                            target_role="farmer",
                            order_id=order_id
                        )

                    elif action == "ORDER_STATUS_UPDATE":
                        order_id = data.get("order_id")
                        new_status = data.get("status")
                        messages = {
                            "Confirmed": f"Your order #{order_id} has been confirmed by the farmer.",
                            "Preparing": f"Farmer is currently harvesting and packing order #{order_id}.",
                            "Ready": f"Your order #{order_id} is ready for pickup/delivery.",
                            "Delivered": f"Order #{order_id} has been delivered fresh to your address."
                        }
                        msg = messages.get(new_status, f"Order #{order_id} status updated to {new_status}.")
                        broadcast_notification(
                            event_type=f"order_{new_status.lower()}",
                            message=msg,
                            target_role="consumer",
                            order_id=order_id
                        )

                    elif action == "PING":
                        pong = {"action": "PONG", "timestamp": time.time()}
                        client_socket.sendall((json.dumps(pong) + "\n").encode("utf-8"))

                except json.JSONDecodeError:
                    err = {"error": "Invalid JSON format"}
                    client_socket.sendall((json.dumps(err) + "\n").encode("utf-8"))

    except Exception as e:
        print(f"[Socket Server] Connection error with {client_id}: {e}")
    finally:
        with CLIENTS_LOCK:
            if client_id in CONNECTED_CLIENTS:
                del CONNECTED_CLIENTS[client_id]
        try:
            client_socket.close()
        except Exception:
            pass
        print(f"[Socket Server] Connection closed for {client_id}")


def start_socket_server(host: str = HOST, port: int = PORT):
    """Initializes and runs the TCP socket server in a listening loop."""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    try:
        server_socket.bind((host, port))
        server_socket.listen(10)
        print(f"[Socket Server] AgriLink Socket Server running on {host}:{port}")

        while True:
            client_sock, client_addr = server_socket.accept()
            worker = threading.Thread(
                target=handle_client_connection,
                args=(client_sock, client_addr),
                daemon=True
            )
            worker.start()
    except Exception as e:
        print(f"[Socket Server] Server failed to bind/listen: {e}")
    finally:
        server_socket.close()


if __name__ == "__main__":
    start_socket_server()
