# AgriLink: Smart Direct-to-Consumer Agricultural Marketplace with Fair Price Discovery

> **College Advanced Programming Practice (APP) Project**  
> Backend Technology: **Python (Flask, SymPy, Sockets, Multiprocessing, Tkinter, MySQL)**  
> Frontend Technology: **React, Tailwind CSS, Responsive Design**

---

## 🌾 Project Purpose
AgriLink connects local farmers directly with consumers, providing an **additional direct sales channel** and improving price transparency. It bridges the gap between rural producers and urban buyers with:
- **Fair Price Discovery**: An innovative mathematical model powered by **SymPy** calculating an estimated recommended price range based on production cost, demand, supply, and freshness decay.
- **Smart Matching**: A **purely functional programming** pipeline ranking farmers by proximity, freshness, pricing, and ratings using `map()`, `filter()`, `sorted()`, and `lambda` expressions.
- **Real-Time Notifications**: Python **Socket Programming** for instantaneous order dispatch, farmer alerts, and order status tracking.
- **Multiprocessing Analytics**: Asynchronous, parallel background computing using Python's `multiprocessing` library to execute demand analysis, product velocity, sales ledgers, and an **Unsold Product Alert** scanner.
- **Farmer Group Selling**: Collaborative batch pooling enabling multiple smallholders to fulfill large bulk consumer demands together.
- **Admin Desktop GUI**: A native **Tkinter** administration console for real-time monitoring and analytics dispatch.

---

## 🎓 Mapping of Python APP Requirements

| Requirement | Module File | How it is used in the Architecture |
| :--- | :--- | :--- |
| **1. Functional Programming** | `backend/matching.py` | Uses pure functions, higher-order functions (closures), `map()`, `filter()`, `sorted()`, and `lambda` predicates to rank farmers across multi-dimensional criteria without side-effects. |
| **2. Socket Programming** | `backend/socket_server.py` & `backend/socket_client.py` | Implements a multi-threaded TCP socket server on port 65432 broadcasting instant notifications ("New order received!", "Your order has been confirmed.", "Your order is ready.") to connected clients. |
| **3. Multiprocessing** | `backend/multiprocessing_tasks.py` | Uses `multiprocessing.Pool` across multi-core CPUs for CPU-bound tasks: Demand Trend Analysis, Sales Report Generation, Product Velocity Analytics, and the **Unsold Product Risk Scanner**. |
| **4. SymPy** | `backend/fair_price.py` | Implements symbolic calculus and algebra (`sp.Symbol`, `sp.Eq`, `sp.solve`) to derive fair equilibrium prices balancing production costs, perishable decay curves, and market elasticity. |
| **5. Tkinter** | `backend/admin_gui.py` | Provides a standalone desktop GUI for platform administrators featuring live KPI scorecards, Treeview tables, Unsold Product alerts, and multiprocessing triggers. |

---

## 🗄️ Database Architecture (MySQL)
The complete schema is available in `backend/schema.sql` and includes:
1. `Users` — Unified authentication and role-based permissions (Farmer, Consumer, Admin).
2. `Farmers` — Farm profiles, GPS coordinates, total sales, and rating metrics.
3. `Consumers` — Consumer delivery addresses, preferred categories, and coordinates.
4. `Products` — Agricultural produce, category, price, quantity, unit, harvest dates, and shelf-life.
5. `Orders` — Order tracking with 5-stage status lifecycle (`Placed` → `Confirmed` → `Preparing` → `Ready` → `Delivered`).
6. `OrderItems` — Line items linking products to orders.
7. `Ratings` — Consumer feedback and star ratings.
8. `PriceHistory` — Historical records of SymPy fair price estimates and settled market rates.
9. `Notifications` — Log of socket-dispatched order alerts.
10. `FarmerGroups` & `FarmerGroupMembers` — Group Selling batch coordination.

---

## 🚀 How to Run the Project

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm
- MySQL 8.0+ (or use the built-in SQLite auto-fallback)

### 1. Backend Setup & Run
```bash
# 1. Navigate to backend directory
cd backend

# 2. (Optional) Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Import MySQL schema (if MySQL is running)
mysql -u root -p < schema.sql

# 5. Start the Socket Notification Server (Terminal 1)
python socket_server.py

# 6. Start the Flask REST API Server (Terminal 2)
python app.py

# 7. (Optional) Launch the Tkinter Admin Desktop GUI (Terminal 3)
python admin_gui.py
```

### 2. Frontend Setup & Run
```bash
# 1. Install npm packages
npm install

# 2. Start the development server
npm run dev
# AgriLink will be available at http://localhost:3000
```
