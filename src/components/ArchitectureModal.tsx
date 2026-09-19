import React, { useState } from 'react';
import {
  X,
  Code2,
  Terminal,
  Database,
  Radio,
  Cpu,
  Sparkles,
  Monitor,
  Copy,
  Check,
  FolderTree,
  FileCode,
  Layers
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'mapping' | 'fair_price' | 'matching' | 'socket' | 'multiprocessing' | 'tkinter' | 'flask' | 'schema' | 'commands'
  >('mapping');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-zinc-900 text-zinc-100 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl border border-zinc-700 overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-800 px-6 py-4 flex items-center justify-between border-b border-zinc-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  AgriLink: Python APP Architecture & Code Explorer
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 uppercase">
                  College Project Review
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Advanced Programming Practice: Functional, Sockets, Multiprocessing, SymPy, Tkinter & MySQL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-zinc-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-zinc-850 px-6 pt-2 border-b border-zinc-700 flex gap-1 overflow-x-auto text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mapping' ? 'bg-zinc-800 text-emerald-400 font-bold border-t-2 border-emerald-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Requirements Mapping</span>
          </button>

          <button
            onClick={() => setActiveTab('fair_price')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fair_price' ? 'bg-zinc-800 text-amber-400 font-bold border-t-2 border-amber-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>4. SymPy Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'matching' ? 'bg-zinc-800 text-emerald-400 font-bold border-t-2 border-emerald-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>1. Functional Matching</span>
          </button>

          <button
            onClick={() => setActiveTab('socket')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'socket' ? 'bg-zinc-800 text-cyan-400 font-bold border-t-2 border-cyan-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>2. Socket Server</span>
          </button>

          <button
            onClick={() => setActiveTab('multiprocessing')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'multiprocessing' ? 'bg-zinc-800 text-purple-400 font-bold border-t-2 border-purple-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. Multiprocessing</span>
          </button>

          <button
            onClick={() => setActiveTab('tkinter')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tkinter' ? 'bg-zinc-800 text-rose-400 font-bold border-t-2 border-rose-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>5. Tkinter GUI</span>
          </button>

          <button
            onClick={() => setActiveTab('flask')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flask' ? 'bg-zinc-800 text-blue-400 font-bold border-t-2 border-blue-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Flask REST Server</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema' ? 'bg-zinc-800 text-amber-300 font-bold border-t-2 border-amber-400' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MySQL Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('commands')}
            className={`px-3.5 py-2 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'commands' ? 'bg-zinc-800 text-green-400 font-bold border-t-2 border-green-500' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Run Commands</span>
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto font-sans text-sm space-y-4">
          {activeTab === 'mapping' && (
            <div className="space-y-6">
              <div className="bg-emerald-950/60 border border-emerald-800/80 p-4 rounded-2xl">
                <h4 className="font-bold text-emerald-300 text-base mb-1">
                  🎓 Python Advanced Programming Practice (APP) Requirements Fulfillment
                </h4>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  The AgriLink architecture is designed to demonstrate advanced Python concepts across 5 specialized modules, with Python serving as the primary backend technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>1. Functional Programming (`matching.py`)</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    Uses higher-order functions, pure closures, <code className="text-emerald-300">map()</code>, <code className="text-emerald-300">filter()</code>, <code className="text-emerald-300">sorted()</code>, and <code className="text-emerald-300">lambda</code> expressions to compute composite scores across distance, freshness, price, rating, and quantity.
                  </p>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    File: backend/matching.py
                  </span>
                </div>

                <div className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                    <Radio className="w-4 h-4" />
                    <span>2. Socket Programming (`socket_server.py`)</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    Multi-threaded TCP socket server using Python's standard <code className="text-cyan-300">socket</code> and <code className="text-cyan-300">threading</code> libraries. Broadcasts real-time events ("New order received!", "Your order has been confirmed.", "Your order is ready.").
                  </p>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    File: backend/socket_server.py (Port 65432)
                  </span>
                </div>

                <div className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>3. Multiprocessing (`multiprocessing_tasks.py`)</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    Employs <code className="text-purple-300">multiprocessing.Pool</code> to distribute CPU-bound analytical tasks (Demand Analysis, Sales Ledgers, Product Velocity, and Unsold Inventory Risk Scanning) across multiple CPU cores without blocking main server threads.
                  </p>
                  <span className="text-[11px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                    File: backend/multiprocessing_tasks.py
                  </span>
                </div>

                <div className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>4. SymPy Mathematical Modeling (`fair_price.py`)</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    Uses symbolic calculus (<code className="text-amber-300">sp.Symbol</code>, <code className="text-amber-300">sp.Eq</code>, <code className="text-amber-300">sp.solve</code>) to model demand-supply equilibrium, perishable freshness decay curves, and farmer production cost recovery intervals.
                  </p>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    File: backend/fair_price.py
                  </span>
                </div>

                <div className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-2xl md:col-span-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1.5">
                    <Monitor className="w-4 h-4" />
                    <span>5. Tkinter Desktop GUI (`admin_gui.py`)</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    Native desktop administration application using Python <code className="text-rose-300">tkinter</code> and <code className="text-rose-300">ttk</code> with Treeview tables for live orders and products, Unsold Product alerts, and real-time multiprocessing pool dispatch.
                  </p>
                  <span className="text-[11px] font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                    File: backend/admin_gui.py
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fair_price' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 font-bold">backend/fair_price.py (SymPy Equilibrium Engine)</span>
                <button
                  onClick={() => handleCopy('backend/fair_price.py', 'fair_price')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'fair_price' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'fair_price' ? 'Copied Path!' : 'Copy Path'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-amber-200 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`import sympy as sp
import math

def calculate_fair_price(product_name, production_cost, demand_level="High", supply_level="Medium", days_since_harvest=0):
    # SymPy Symbolic Equation Formulation
    P = sp.Symbol('P', positive=True, real=True)
    C = sp.Symbol('C', positive=True, real=True)
    D = sp.Symbol('D', positive=True, real=True)
    S = sp.Symbol('S', positive=True, real=True)
    F = sp.Symbol('F', positive=True, real=True)
    L = sp.Symbol('L', positive=True, real=True)

    # Consumer willingness vs Farmer reservation cost
    willingness_curve = D * F * (1.45 * C + L) - 0.35 * P
    farmer_cost_curve = C + L + (0.15 * C * S)

    # Solve symbolically: willingness_curve = farmer_cost_curve
    eq_condition = sp.Eq(willingness_curve, farmer_cost_curve)
    solved_price_expr = sp.solve(eq_condition, P)
    ...
    return {
        "recommended_min_price": min_recommended,
        "recommended_max_price": max_recommended,
        "sympy_formula": "P_eq = solve(Eq(willingness_curve, farmer_cost_curve), P)",
        "disclaimer": "Estimated recommended price range. Not guaranteed market price."
    }`}
              </pre>
            </div>
          )}

          {activeTab === 'matching' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-emerald-400 font-bold">backend/matching.py (Functional Programming Pipeline)</span>
                <button
                  onClick={() => handleCopy('backend/matching.py', 'matching')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'matching' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'matching' ? 'Copied Path!' : 'Copy Path'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`from functools import reduce

# Pure closure for distance evaluation
def compute_distance_score(max_dist=50.0):
    return lambda dist: max(0.0, 1.0 - (dist / max_dist))

def smart_match_farmers(products, consumer_lat, consumer_lon, target_category="All", ...):
    # Step 1: Functional Filtering using filter() and lambda predicates
    combined_predicate = lambda p: (
        (target_category == "All" or p["category"] == target_category) and
        p["price_per_unit"] <= max_price and
        p["distance_km"] <= max_distance_km and
        p["farmer_rating"] >= min_rating
    )
    filtered = list(filter(combined_predicate, products))

    # Step 2: Functional Mapping using map() to calculate composite multi-factor score
    evaluate_match = lambda item: {
        **item,
        "match_score": round(
            compute_distance_score(max_distance_km)(item["distance_km"]) * 0.30 +
            freshness_scorer(item["days_since_harvest"]) * 0.25 +
            price_competitiveness(item["price_per_unit"]) * 0.20 +
            rating_normalizer(item["farmer_rating"]) * 0.15 +
            quantity_weight(item["available_quantity"]) * 0.10, 2
        )
    }
    scored = list(map(evaluate_match, filtered))

    # Step 3: Functional Sorting using sorted() with lambda key
    return sorted(scored, key=lambda x: x["match_score"], reverse=True)`}
              </pre>
            </div>
          )}

          {activeTab === 'socket' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-400 font-bold">backend/socket_server.py (Multi-Threaded TCP Server)</span>
                <button
                  onClick={() => handleCopy('backend/socket_server.py', 'socket')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'socket' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'socket' ? 'Copied Path!' : 'Copy Path'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`import socket
import threading
import json

HOST = "0.0.0.0"
PORT = 65432
CONNECTED_CLIENTS = {}
CLIENTS_LOCK = threading.Lock()

def broadcast_notification(event_type, message, target_role="all", order_id=None):
    payload = {"event": event_type, "message": message, "order_id": order_id}
    encoded = (json.dumps(payload) + "\\n").encode('utf-8')
    with CLIENTS_LOCK:
        for cid, client in CONNECTED_CLIENTS.items():
            if target_role == "all" or client["role"] == target_role:
                client["socket"].sendall(encoded)

def handle_client_connection(client_socket, client_address):
    # Dedicated thread per client handling REGISTER, ORDER_PLACED, ORDER_STATUS_UPDATE...
    ...`}
              </pre>
            </div>
          )}

          {activeTab === 'multiprocessing' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-purple-400 font-bold">backend/multiprocessing_tasks.py (Pool Engine)</span>
                <button
                  onClick={() => handleCopy('backend/multiprocessing_tasks.py', 'multiprocessing')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'multiprocessing' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'multiprocessing' ? 'Copied Path!' : 'Copy Path'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-purple-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`from multiprocessing import Pool, cpu_count
import os, time

def analyze_demand_trends(payload):
    pid = os.getpid()
    # CPU-bound regression work
    return {"task": "Demand Trends", "worker_pid": pid}

def scan_unsold_product_risks(payload):
    pid = os.getpid()
    # Scans batches near shelf-life expiration and generates Unsold Product Alerts
    return {"task": "Unsold Risk Scanner", "worker_pid": pid, "alerts": [...]}

def run_all_multiprocessing_analytics():
    num_workers = min(4, max(1, cpu_count()))
    tasks = [
        (analyze_demand_trends, {}),
        (generate_sales_report, {}),
        (compute_product_analytics, {}),
        (scan_unsold_product_risks, {})
    ]
    with Pool(processes=num_workers) as pool:
        async_results = [pool.apply_async(fn, (payload,)) for fn, payload in tasks]
        return [res.get(timeout=10) for res in async_results]`}
              </pre>
            </div>
          )}

          {activeTab === 'tkinter' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-rose-400 font-bold">backend/admin_gui.py (Tkinter Desktop App)</span>
                <button
                  onClick={() => handleCopy('python backend/admin_gui.py', 'tkinter')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'tkinter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'tkinter' ? 'Copied Command!' : 'Copy: python backend/admin_gui.py'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-rose-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`import tkinter as tk
from tkinter import ttk, messagebox

class AgriLinkAdminGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("AgriLink — College APP Admin Console (Tkinter)")
        self.root.geometry("980x680")
        self.setup_styles()
        self.build_ui()

    def build_ui(self):
        # 1. Header Frame with agricultural green accents
        # 2. Key Metrics Row (Farmers, Consumers, Products, Orders, Sales)
        # 3. ttk.Notebook with 5 Tabs:
        #    - Live Orders & Status Pipeline
        #    - Products & Categories
        #    - Unsold Product Risk Alerts
        #    - Multiprocessing Analytics Trigger
        #    - Python APP Architecture Review`}
              </pre>
            </div>
          )}

          {activeTab === 'flask' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-blue-400 font-bold">backend/app.py (Flask REST Server)</span>
                <button
                  onClick={() => handleCopy('python backend/app.py', 'flask')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'flask' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'flask' ? 'Copied Command!' : 'Copy: python backend/app.py'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-blue-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`from flask import Flask, request, jsonify
from flask_cors import CORS
from fair_price import calculate_fair_price
from matching import smart_match_farmers
from multiprocessing_tasks import run_all_multiprocessing_analytics
from socket_server import broadcast_notification

app = Flask(__name__)
CORS(app)

@app.route("/api/fair-price", methods=["POST"])
def fair_price_endpoint(): ...

@app.route("/api/smart-matching", methods=["POST"])
def smart_matching_endpoint(): ...

@app.route("/api/orders/<order_id>/status", methods=["PUT"])
def update_status(order_id):
    # Updates status: Placed -> Confirmed -> Preparing -> Ready -> Delivered
    # Emits live TCP socket notification...`}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-300 font-bold">backend/schema.sql (MySQL 8.0+ Schema)</span>
                <button
                  onClick={() => handleCopy('mysql -u root -p < backend/schema.sql', 'schema')}
                  className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'schema' ? 'Copied Command!' : 'Copy Import Command'}</span>
                </button>
              </div>
              <pre className="bg-black/90 p-4 rounded-2xl text-amber-200 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
{`-- MySQL Tables: Users, Farmers, Consumers, Products, Orders, OrderItems, Ratings, PriceHistory, Notifications, FarmerGroups, FarmerGroupMembers
CREATE TABLE Users (user_id INT AUTO_INCREMENT PRIMARY KEY, role ENUM('farmer', 'consumer', 'admin'), ...);
CREATE TABLE Farmers (farmer_id INT AUTO_INCREMENT PRIMARY KEY, farm_name VARCHAR(150), rating DECIMAL(3,2), ...);
CREATE TABLE Consumers (consumer_id INT AUTO_INCREMENT PRIMARY KEY, delivery_address TEXT, ...);
CREATE TABLE Products (product_id INT AUTO_INCREMENT PRIMARY KEY, category ENUM('Vegetables','Fruits','Dairy','Eggs','Other'), price_per_unit DECIMAL(10,2), ...);
CREATE TABLE Orders (order_id INT AUTO_INCREMENT PRIMARY KEY, status ENUM('Placed','Confirmed','Preparing','Ready','Delivered'), ...);
CREATE TABLE OrderItems (order_item_id INT AUTO_INCREMENT PRIMARY KEY, ...);
CREATE TABLE Ratings (rating_id INT AUTO_INCREMENT PRIMARY KEY, stars INT, ...);
CREATE TABLE PriceHistory (history_id INT AUTO_INCREMENT PRIMARY KEY, calculated_min_price DECIMAL(10,2), ...);
CREATE TABLE Notifications (notification_id INT AUTO_INCREMENT PRIMARY KEY, event_type VARCHAR(50), ...);
CREATE TABLE FarmerGroups (group_id INT AUTO_INCREMENT PRIMARY KEY, combined_target_quantity DECIMAL(10,2), ...);`}
              </pre>
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="space-y-4">
              <div className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700">
                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>How to Run the Entire Project Locally</span>
                </h4>
                <div className="space-y-3 font-mono text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-400 block mb-1"># Terminal 1: Start Real-time Python Socket Server</span>
                    <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-cyan-300 flex justify-between items-center">
                      <code>python backend/socket_server.py</code>
                      <button
                        onClick={() => handleCopy('python backend/socket_server.py', 'cmd1')}
                        className="text-[11px] text-zinc-400 hover:text-white"
                      >
                        {copied === 'cmd1' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-400 block mb-1"># Terminal 2: Start Flask REST API Server</span>
                    <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-blue-300 flex justify-between items-center">
                      <code>python backend/app.py</code>
                      <button
                        onClick={() => handleCopy('python backend/app.py', 'cmd2')}
                        className="text-[11px] text-zinc-400 hover:text-white"
                      >
                        {copied === 'cmd2' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-400 block mb-1"># Terminal 3: (Optional) Launch Desktop Tkinter Admin Console</span>
                    <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-rose-300 flex justify-between items-center">
                      <code>python backend/admin_gui.py</code>
                      <button
                        onClick={() => handleCopy('python backend/admin_gui.py', 'cmd3')}
                        className="text-[11px] text-zinc-400 hover:text-white"
                      >
                        {copied === 'cmd3' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-400 block mb-1"># Terminal 4: Start Frontend Vite / React Web App</span>
                    <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-emerald-300 flex justify-between items-center">
                      <code>npm run dev</code>
                      <button
                        onClick={() => handleCopy('npm run dev', 'cmd4')}
                        className="text-[11px] text-zinc-400 hover:text-white"
                      >
                        {copied === 'cmd4' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-zinc-800 px-6 py-3 flex items-center justify-between border-t border-zinc-700 text-xs text-zinc-400 shrink-0">
          <span>AgriLink Advanced Programming Practice Project Review</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
