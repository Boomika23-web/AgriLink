"""
AgriLink Database Connection & Query Layer
Module: backend/database.py

Supports MySQL connection (via mysql.connector) and portable SQLite fallback
for zero-friction local and college project evaluation.
"""

import os
import sqlite3
from typing import List, Dict, Any, Optional

DB_CONFIG = {
    "host": os.environ.get("MYSQL_HOST", "localhost"),
    "user": os.environ.get("MYSQL_USER", "root"),
    "password": os.environ.get("MYSQL_PASSWORD", ""),
    "database": os.environ.get("MYSQL_DATABASE", "agrilink_db"),
    "port": int(os.environ.get("MYSQL_PORT", 3306))
}

USE_SQLITE_FALLBACK = True
SQLITE_DB_PATH = os.path.join(os.path.dirname(__file__), "agrilink.sqlite3")


def get_db_connection():
    """Returns an active MySQL connection or SQLite fallback."""
    global USE_SQLITE_FALLBACK
    if not USE_SQLITE_FALLBACK:
        try:
            import mysql.connector
            conn = mysql.connector.connect(**DB_CONFIG)
            return conn
        except Exception as e:
            print(f"[Database] MySQL connection failed ({e}). Falling back to SQLite.")
            USE_SQLITE_FALLBACK = True

    conn = sqlite3.connect(SQLITE_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_sqlite_tables():
    """Initializes local SQLite database for instant offline functionality."""
    conn = sqlite3.connect(SQLITE_DB_PATH)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        farmer_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price_per_unit REAL NOT NULL,
        available_quantity REAL NOT NULL,
        unit TEXT NOT NULL DEFAULT 'kg',
        harvest_date TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        status TEXT DEFAULT 'active',
        production_cost REAL DEFAULT 0.0,
        shelf_life_days INTEGER DEFAULT 5
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_number TEXT UNIQUE NOT NULL,
        consumer_name TEXT NOT NULL,
        farmer_name TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'Placed',
        delivery_address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()


initialize_sqlite_tables()
