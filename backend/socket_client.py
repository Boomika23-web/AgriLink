"""
AgriLink Real-Time Notification Socket Client
Module: backend/socket_client.py
Requirement: Python APP Requirement #2 — Socket Programming (Client side)

Description:
Demonstrates a client script connecting to the AgriLink socket server.
Can be executed as:
  python backend/socket_client.py farmer
or:
  python backend/socket_client.py consumer
"""

import socket
import json
import sys
import threading
import time

SERVER_HOST = "127.0.0.1"
SERVER_PORT = 65432


def listen_for_notifications(client_sock: socket.socket):
    """Background listener loop printing notifications pushed from socket server."""
    buffer = ""
    try:
        while True:
            data = client_sock.recv(1024).decode("utf-8")
            if not data:
                print("\n[Socket Client] Disconnected from server.")
                break
            buffer += data
            while "\n" in buffer:
                line, buffer = buffer.split("\n", 1)
                if line.strip():
                    try:
                        msg = json.loads(line)
                        print(f"\n📢 [LIVE SOCKET NOTIFICATION] {msg.get('timestamp')}")
                        print(f"   Event: {msg.get('event')}")
                        print(f"   Message: {msg.get('message')}")
                        print(">> ", end="", flush=True)
                    except json.JSONDecodeError:
                        print(f"\n[Raw Message]: {line}")
    except Exception as e:
        print(f"\n[Socket Client] Listener error: {e}")


def run_client(role: str = "consumer"):
    """Main client connection routine."""
    print(f"Connecting to AgriLink Socket Server at {SERVER_HOST}:{SERVER_PORT} as '{role}'...")
    client_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_sock.connect((SERVER_HOST, SERVER_PORT))
        print("Connected successfully!")

        # Register role
        reg_payload = json.dumps({"action": "REGISTER", "role": role}) + "\n"
        client_sock.sendall(reg_payload.encode("utf-8"))

        # Start listener thread
        listener_thread = threading.Thread(target=listen_for_notifications, args=(client_sock,), daemon=True)
        listener_thread.start()

        print("\nCommands available:")
        print("  1. send_order <order_id> <item_summary>")
        print("  2. update_status <order_id> <Confirmed|Preparing|Ready|Delivered>")
        print("  3. exit")

        while True:
            cmd = input(">> ").strip()
            if cmd == "exit":
                break
            elif cmd.startswith("send_order"):
                parts = cmd.split(" ", 2)
                order_id = parts[1] if len(parts) > 1 else "AGRI-999"
                summary = parts[2] if len(parts) > 2 else "Fresh Farm Produce"
                req = json.dumps({"action": "ORDER_PLACED", "order_id": order_id, "summary": summary}) + "\n"
                client_sock.sendall(req.encode("utf-8"))
            elif cmd.startswith("update_status"):
                parts = cmd.split(" ", 2)
                order_id = parts[1] if len(parts) > 1 else "AGRI-999"
                status = parts[2] if len(parts) > 2 else "Confirmed"
                req = json.dumps({"action": "ORDER_STATUS_UPDATE", "order_id": order_id, "status": status}) + "\n"
                client_sock.sendall(req.encode("utf-8"))
            else:
                print("Unknown command. Type 'send_order <id> <desc>' or 'update_status <id> <status>'")

    except ConnectionRefusedError:
        print(f"[Error] Could not connect to {SERVER_HOST}:{SERVER_PORT}. Ensure socket_server.py is running.")
    finally:
        client_sock.close()


if __name__ == "__main__":
    client_role = sys.argv[1] if len(sys.argv) > 1 else "consumer"
    run_client(client_role)
