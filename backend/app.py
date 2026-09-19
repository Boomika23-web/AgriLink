"""
AgriLink Flask Backend Server
Module: backend/app.py

Central REST API server integrating:
- Products catalog & Farmer CRUD
- Orders & 5-stage status lifecycle (Placed -> Confirmed -> Preparing -> Ready -> Delivered)
- SymPy Fair Price Calculation API
- Functional Smart Matching API
- Multiprocessing Analytics dispatcher
- Real-time Socket notification bridge
- Unsold Product Alert engine
- Farmer Group Selling coordination
"""

import os
import json
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

from fair_price import calculate_fair_price
from matching import smart_match_farmers
from multiprocessing_tasks import run_all_multiprocessing_analytics, scan_unsold_product_risks
from socket_server import broadcast_notification, NOTIFICATION_HISTORY

app = Flask(__name__)
CORS(app)

# In-Memory working state with realistic seed data
PRODUCTS_DATABASE = [
    {
        "product_id": 1,
        "farmer_id": 1,
        "farmer_name": "Farmer Ramesh Kumar",
        "farmer_location": "Maduranthakam, Chengalpattu",
        "farmer_rating": 4.85,
        "distance_km": 2.5,
        "name": "Country Tomatoes (நாட்டு தக்காளி)",
        "category": "Vegetables",
        "price_per_unit": 40.0,
        "available_quantity": 65.0,
        "unit": "kg",
        "harvest_date": time.strftime("%Y-%m-%d"),
        "days_since_harvest": 0,
        "shelf_life_days": 5,
        "location": "Maduranthakam",
        "description": "Naturally sun-ripened, pesticide-free country tomatoes harvested early morning. Rich in lycopene and tangy in curries.",
        "image_url": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
        "status": "active",
        "production_cost": 28.0,
        "benchmark_fair_price": 42.0
    },
    {
        "product_id": 2,
        "farmer_id": 1,
        "farmer_name": "Farmer Ramesh Kumar",
        "farmer_location": "Maduranthakam, Chengalpattu",
        "farmer_rating": 4.85,
        "distance_km": 2.5,
        "name": "Fresh Spinach (பசலைக் கீரை)",
        "category": "Vegetables",
        "price_per_unit": 25.0,
        "available_quantity": 40.0,
        "unit": "bunch",
        "harvest_date": time.strftime("%Y-%m-%d"),
        "days_since_harvest": 0,
        "shelf_life_days": 2,
        "location": "Maduranthakam",
        "description": "Freshly cut green spinach leaves washed with clean farm water. Rich in dietary iron and fiber.",
        "image_url": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
        "status": "active",
        "production_cost": 15.0,
        "benchmark_fair_price": 26.0
    },
    {
        "product_id": 3,
        "farmer_id": 2,
        "farmer_name": "Farmer Anitha Selvam",
        "farmer_location": "Tiruchirappalli Suburban",
        "farmer_rating": 4.90,
        "distance_km": 4.0,
        "name": "Alphonso Mangoes",
        "category": "Fruits",
        "price_per_unit": 120.0,
        "available_quantity": 80.0,
        "unit": "kg",
        "harvest_date": time.strftime("%Y-%m-%d"),
        "days_since_harvest": 1,
        "shelf_life_days": 7,
        "location": "Tiruchirappalli",
        "description": "Fragrant and sweet Alphonso mangoes, naturally ripened without carbide or chemical accelerators.",
        "image_url": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
        "status": "active",
        "production_cost": 85.0,
        "benchmark_fair_price": 125.0
    },
    {
        "product_id": 4,
        "farmer_id": 3,
        "farmer_name": "Farmer Muthu Velan",
        "farmer_location": "Pollachi, Coimbatore",
        "farmer_rating": 4.70,
        "distance_km": 3.2,
        "name": "Pure Cow A2 Milk",
        "category": "Dairy",
        "price_per_unit": 58.0,
        "available_quantity": 50.0,
        "unit": "liter",
        "harvest_date": time.strftime("%Y-%m-%d"),
        "days_since_harvest": 0,
        "shelf_life_days": 2,
        "location": "Pollachi",
        "description": "Unpasteurized raw morning milk from free-range native indigenous cows. Untouched and zero water dilution.",
        "image_url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
        "status": "active",
        "production_cost": 42.0,
        "benchmark_fair_price": 60.0
    },
    {
        "product_id": 5,
        "farmer_id": 3,
        "farmer_name": "Farmer Muthu Velan",
        "farmer_location": "Pollachi, Coimbatore",
        "farmer_rating": 4.70,
        "distance_km": 3.2,
        "name": "Country Free-Range Eggs",
        "category": "Eggs",
        "price_per_unit": 12.0,
        "available_quantity": 120.0,
        "unit": "piece",
        "harvest_date": time.strftime("%Y-%m-%d"),
        "days_since_harvest": 0,
        "shelf_life_days": 14,
        "location": "Pollachi",
        "description": "Nutrient-dense brown country eggs from naturally forage-fed village poultry.",
        "image_url": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80",
        "status": "active",
        "production_cost": 8.5,
        "benchmark_fair_price": 12.0
    },
    {
        "product_id": 6,
        "farmer_id": 1,
        "farmer_name": "Farmer Ramesh Kumar",
        "farmer_location": "Maduranthakam, Chengalpattu",
        "farmer_rating": 4.85,
        "distance_km": 2.5,
        "name": "Tender Green Okra (வெண்டைக்காய்)",
        "category": "Vegetables",
        "price_per_unit": 36.0,
        "available_quantity": 30.0,
        "unit": "kg",
        "harvest_date": time.strftime("%Y-%m-%d"),
        "days_since_harvest": 0,
        "shelf_life_days": 4,
        "location": "Maduranthakam",
        "description": "Crisp and fresh bhendi handpicked this morning. Ideal for traditional sambar and crispy fry.",
        "image_url": "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80",
        "status": "active",
        "production_cost": 24.0,
        "benchmark_fair_price": 38.0
    }
]

ORDERS_DATABASE = [
    {
        "order_id": "AGRI-8492",
        "consumer_name": "Priya Sundaram",
        "farmer_name": "Farmer Ramesh Kumar",
        "farmer_id": 1,
        "items": [
            {"product_id": 1, "product_name": "Country Tomatoes", "quantity": 5.0, "unit": "kg", "unit_price": 40.0, "subtotal": 200.0}
        ],
        "total_amount": 200.0,
        "delivery_fee": 20.0,
        "grand_total": 220.0,
        "status": "Confirmed",  # Placed -> Confirmed -> Preparing -> Ready -> Delivered
        "delivery_address": "No. 42, 3rd Main Road, Anna Nagar, Chennai",
        "payment_method": "Cash on Delivery",
        "placed_at": "Today 09:30 AM"
    }
]

FARMER_GROUPS = [
    {
        "group_id": 1,
        "group_name": "Chengalpattu Bulk Tomato Collective",
        "target_crop": "Country Tomatoes",
        "combined_target_quantity": 100.0,
        "current_pooled_quantity": 60.0,
        "unit": "kg",
        "status": "open",
        "members": [
            {"farmer_name": "Farmer Ramesh", "contribution": 20.0},
            {"farmer_name": "Farmer Balan", "contribution": 15.0},
            {"farmer_name": "Farmer Muthu", "contribution": 25.0}
        ]
    }
]


# ===================== API ENDPOINTS =====================

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "online",
        "platform": "AgriLink Python Flask Backend",
        "timestamp": time.time(),
        "python_modules": {
            "functional_programming": "backend/matching.py",
            "socket_programming": "backend/socket_server.py (Port 65432)",
            "multiprocessing": "backend/multiprocessing_tasks.py",
            "sympy": "backend/fair_price.py",
            "tkinter_admin": "backend/admin_gui.py"
        }
    })


@app.route("/api/products", methods=["GET", "POST"])
def manage_products():
    if request.method == "GET":
        category = request.args.get("category", "All")
        search = request.args.get("search", "").lower()

        filtered = PRODUCTS_DATABASE
        if category != "All":
            filtered = [p for p in filtered if p["category"] == category]
        if search:
            filtered = [p for p in filtered if search in p["name"].lower() or search in p["farmer_name"].lower()]

        return jsonify({"products": filtered, "count": len(filtered)})

    elif request.method == "POST":
        data = request.get_json() or {}
        new_id = max([p["product_id"] for p in PRODUCTS_DATABASE], default=0) + 1
        new_prod = {
            "product_id": new_id,
            "farmer_id": data.get("farmer_id", 1),
            "farmer_name": data.get("farmer_name", "Farmer Ramesh Kumar"),
            "farmer_location": data.get("location", "Maduranthakam"),
            "farmer_rating": 4.85,
            "distance_km": round(float(data.get("distance_km", 3.0)), 1),
            "name": data.get("name", "Farm Produce"),
            "category": data.get("category", "Vegetables"),
            "price_per_unit": float(data.get("price_per_unit", 40.0)),
            "available_quantity": float(data.get("available_quantity", 25.0)),
            "unit": data.get("unit", "kg"),
            "harvest_date": data.get("harvest_date", time.strftime("%Y-%m-%d")),
            "days_since_harvest": 0,
            "shelf_life_days": int(data.get("shelf_life_days", 5)),
            "location": data.get("location", "Local Farm"),
            "description": data.get("description", "Directly harvested fresh farm produce."),
            "image_url": data.get("image_url", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"),
            "status": "active",
            "production_cost": float(data.get("production_cost", 25.0)),
            "benchmark_fair_price": float(data.get("price_per_unit", 40.0))
        }
        PRODUCTS_DATABASE.insert(0, new_prod)
        return jsonify({"message": "Product added successfully", "product": new_prod}), 201


@app.route("/api/fair-price", methods=["POST"])
def fair_price_endpoint():
    """Requirement: SymPy Mathematical Price Model API."""
    data = request.get_json() or {}
    product_name = data.get("product_name", "Tomato")
    production_cost = float(data.get("production_cost", 30.0))
    demand_level = data.get("demand_level", "High")
    supply_level = data.get("supply_level", "Medium")
    days_since_harvest = int(data.get("days_since_harvest", 0))
    shelf_life_days = int(data.get("shelf_life_days", 5))
    quantity_kg = float(data.get("quantity_kg", 50.0))
    distance_km = float(data.get("transport_distance_km", 15.0))

    result = calculate_fair_price(
        product_name=product_name,
        production_cost=production_cost,
        demand_level=demand_level,
        supply_level=supply_level,
        days_since_harvest=days_since_harvest,
        shelf_life_days=shelf_life_days,
        quantity_kg=quantity_kg,
        transport_distance_km=distance_km
    )
    return jsonify(result)


@app.route("/api/smart-matching", methods=["POST"])
def smart_matching_endpoint():
    """Requirement: Functional Programming Smart Matching API."""
    data = request.get_json() or {}
    category = data.get("category", "All")
    max_price = float(data.get("max_price", 1000.0))
    max_distance = float(data.get("max_distance_km", 50.0))
    min_rating = float(data.get("min_rating", 3.0))
    weights = data.get("weights")

    ranked = smart_match_farmers(
        products=PRODUCTS_DATABASE,
        consumer_lat=13.0827,
        consumer_lon=80.2100,
        target_category=category,
        max_price=max_price,
        max_distance_km=max_distance,
        min_rating=min_rating,
        custom_weights=weights
    )
    return jsonify({"matches": ranked, "total_matched": len(ranked)})


@app.route("/api/orders", methods=["GET", "POST"])
def orders_endpoint():
    if request.method == "GET":
        return jsonify({"orders": ORDERS_DATABASE})

    elif request.method == "POST":
        data = request.get_json() or {}
        order_num = f"AGRI-{int(time.time() % 100000):05d}"
        new_order = {
            "order_id": order_num,
            "consumer_name": data.get("consumer_name", "Priya Sundaram"),
            "farmer_name": data.get("farmer_name", "Farmer Ramesh Kumar"),
            "farmer_id": data.get("farmer_id", 1),
            "items": data.get("items", []),
            "total_amount": float(data.get("total_amount", 0.0)),
            "delivery_fee": float(data.get("delivery_fee", 20.0)),
            "grand_total": float(data.get("grand_total", 0.0)),
            "status": "Placed",
            "delivery_address": data.get("delivery_address", "Local Delivery Address"),
            "payment_method": data.get("payment_method", "Cash on Delivery"),
            "placed_at": "Just now"
        }
        ORDERS_DATABASE.insert(0, new_order)

        # Broadcast via Python socket server
        summary_txt = ", ".join([f"{it.get('product_name')} ({it.get('quantity')}{it.get('unit', 'kg')})" for it in new_order["items"]])
        broadcast_notification(
            event_type="order_placed",
            message=f"New order received! Order #{order_num} ({summary_txt})",
            target_role="farmer",
            order_id=order_num
        )

        return jsonify({"message": "Order placed successfully", "order": new_order}), 201


@app.route("/api/orders/<order_id>/status", methods=["PUT"])
def update_order_status(order_id):
    data = request.get_json() or {}
    new_status = data.get("status")

    for ord_item in ORDERS_DATABASE:
        if ord_item["order_id"] == order_id:
            ord_item["status"] = new_status
            # Trigger real-time socket message
            messages = {
                "Confirmed": f"Your order #{order_id} has been confirmed by the farmer.",
                "Preparing": f"Farmer is currently harvesting and packing order #{order_id}.",
                "Ready": f"Your order #{order_id} is packed and ready for delivery.",
                "Delivered": f"Order #{order_id} has been delivered fresh to your address!"
            }
            msg = messages.get(new_status, f"Order #{order_id} status changed to {new_status}.")
            broadcast_notification(
                event_type=f"order_{new_status.lower()}",
                message=msg,
                target_role="consumer",
                order_id=order_id
            )
            return jsonify({"message": f"Status updated to {new_status}", "order": ord_item})

    return jsonify({"error": "Order not found"}), 404


@app.route("/api/multiprocessing/run-analytics", methods=["POST"])
def trigger_multiprocessing():
    """Requirement: Multiprocessing background analytics execution."""
    data = request.get_json() or {}
    res = run_all_multiprocessing_analytics(product_data=PRODUCTS_DATABASE, order_data=ORDERS_DATABASE)
    return jsonify(res)


@app.route("/api/unsold-alerts", methods=["GET"])
def get_unsold_alerts():
    """Requirement: Unsold Product Alert feature."""
    alert_result = scan_unsold_product_risks({"products": PRODUCTS_DATABASE})
    return jsonify(alert_result)


@app.route("/api/farmer-groups", methods=["GET", "POST"])
def farmer_groups_endpoint():
    """Requirement: Farmer Group Selling feature."""
    if request.method == "GET":
        return jsonify({"groups": FARMER_GROUPS})
    elif request.method == "POST":
        data = request.get_json() or {}
        group_id = int(data.get("group_id", 1))
        farmer_name = data.get("farmer_name", "Farmer Ramesh")
        contribution = float(data.get("contribution", 10.0))

        for grp in FARMER_GROUPS:
            if grp["group_id"] == group_id:
                grp["members"].append({"farmer_name": farmer_name, "contribution": contribution})
                grp["current_pooled_quantity"] += contribution
                if grp["current_pooled_quantity"] >= grp["combined_target_quantity"]:
                    grp["status"] = "fulfilled"
                return jsonify({"message": "Quantity added to group batch", "group": grp})

        return jsonify({"error": "Group not found"}), 404


@app.route("/api/notifications", methods=["GET"])
def get_notifications():
    """Returns the real-time notification stream maintained by the socket server."""
    return jsonify({"notifications": NOTIFICATION_HISTORY})


@app.route("/api/admin/metrics", methods=["GET"])
def get_admin_metrics():
    total_sales = sum(o["total_amount"] for o in ORDERS_DATABASE)
    return jsonify({
        "total_farmers": 42,
        "total_consumers": 186,
        "total_products": len(PRODUCTS_DATABASE),
        "total_orders": len(ORDERS_DATABASE),
        "total_sales": total_sales,
        "category_breakdown": {
            "Vegetables": 38,
            "Fruits": 16,
            "Dairy": 6,
            "Eggs": 4
        }
    })


if __name__ == "__main__":
    print("Starting AgriLink Python Flask API server on http://0.0.0.0:5000 ...")
    app.run(host="0.0.0.0", port=5000, debug=True)
