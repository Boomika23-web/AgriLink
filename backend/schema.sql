-- ==============================================================================
-- AgriLink Database Schema (MySQL 8.0+)
-- Advanced Programming Practice (APP) Project
-- "AgriLink: A Smart Direct-to-Consumer Agricultural Marketplace with Fair Price Discovery"
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS agrilink_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE agrilink_db;

-- 1. Users Table (Core authentication & role-based access)
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('farmer', 'consumer', 'admin') NOT NULL DEFAULT 'consumer',
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Farmers Profile Table
CREATE TABLE IF NOT EXISTS Farmers (
    farmer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    farm_name VARCHAR(150) NOT NULL,
    farm_location VARCHAR(200) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_sales DECIMAL(12, 2) DEFAULT 0.00,
    rating DECIMAL(3, 2) DEFAULT 5.00,
    total_ratings_count INT DEFAULT 0,
    upi_id VARCHAR(100),
    is_verified BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Consumers Profile Table
CREATE TABLE IF NOT EXISTS Consumers (
    consumer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    delivery_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    preferred_category VARCHAR(50) DEFAULT 'All',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Products Table
CREATE TABLE IF NOT EXISTS Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    category ENUM('Vegetables', 'Fruits', 'Dairy', 'Eggs', 'Other') NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    available_quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'kg',
    harvest_date DATE NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    status ENUM('active', 'out_of_stock', 'low_stock', 'archived') DEFAULT 'active',
    production_cost DECIMAL(10, 2) DEFAULT 0.00,
    shelf_life_days INT DEFAULT 5,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES Farmers(farmer_id) ON DELETE CASCADE,
    INDEX idx_product_category (category),
    INDEX idx_product_status (status)
) ENGINE=InnoDB;

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(32) NOT NULL UNIQUE,
    consumer_id INT NOT NULL,
    farmer_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 20.00,
    status ENUM('Placed', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Placed',
    delivery_address TEXT NOT NULL,
    payment_method ENUM('Cash on Delivery', 'UPI / Online Transfer') DEFAULT 'Cash on Delivery',
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (consumer_id) REFERENCES Consumers(consumer_id) ON DELETE RESTRICT,
    FOREIGN KEY (farmer_id) REFERENCES Farmers(farmer_id) ON DELETE RESTRICT,
    INDEX idx_order_status (status)
) ENGINE=InnoDB;

-- 6. OrderItems Table
CREATE TABLE IF NOT EXISTS OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 7. Ratings Table
CREATE TABLE IF NOT EXISTS Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    farmer_id INT NOT NULL,
    consumer_id INT NOT NULL,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    review_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (farmer_id) REFERENCES Farmers(farmer_id) ON DELETE CASCADE,
    FOREIGN KEY (consumer_id) REFERENCES Consumers(consumer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. PriceHistory Table (Captures SymPy Fair Price Estimates and Historical Settled Prices)
CREATE TABLE IF NOT EXISTS PriceHistory (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    recorded_date DATE NOT NULL,
    production_cost DECIMAL(10, 2) NOT NULL,
    market_demand_level ENUM('Low', 'Medium', 'High') NOT NULL,
    market_supply_level ENUM('Low', 'Medium', 'High') NOT NULL,
    calculated_min_price DECIMAL(10, 2) NOT NULL,
    calculated_max_price DECIMAL(10, 2) NOT NULL,
    actual_listed_price DECIMAL(10, 2) NOT NULL,
    sympy_model_version VARCHAR(20) DEFAULT 'v1.0-elasticity',
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. Notifications Table (Stores notifications broadcasted via Python Socket Server)
CREATE TABLE IF NOT EXISTS Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_user_id INT NOT NULL,
    order_id INT,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    event_type ENUM('order_placed', 'order_confirmed', 'order_preparing', 'order_ready', 'order_delivered', 'unsold_alert') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 10. FarmerGroups Table (For Farmer Group Selling Feature)
CREATE TABLE IF NOT EXISTS FarmerGroups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(150) NOT NULL,
    target_crop VARCHAR(100) NOT NULL,
    combined_target_quantity DECIMAL(10, 2) NOT NULL,
    current_pooled_quantity DECIMAL(10, 2) DEFAULT 0.00,
    unit VARCHAR(20) NOT NULL DEFAULT 'kg',
    status ENUM('open', 'locked', 'fulfilled') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 11. FarmerGroupMembers Table
CREATE TABLE IF NOT EXISTS FarmerGroupMembers (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    farmer_id INT NOT NULL,
    contributed_quantity DECIMAL(10, 2) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES FarmerGroups(group_id) ON DELETE CASCADE,
    FOREIGN KEY (farmer_id) REFERENCES Farmers(farmer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Sample Seed Data for testing
INSERT INTO Users (user_id, username, email, password_hash, role, full_name, phone) VALUES
(1, 'farmer_ramesh', 'ramesh@agrilink.in', 'pbkdf2:sha256:dummyhash', 'farmer', 'Ramesh Kumar', '+91 98401 23456'),
(2, 'farmer_anitha', 'anitha@agrilink.in', 'pbkdf2:sha256:dummyhash', 'farmer', 'Anitha Selvam', '+91 98402 34567'),
(3, 'farmer_muthu', 'muthu@agrilink.in', 'pbkdf2:sha256:dummyhash', 'farmer', 'Muthu Velan', '+91 98403 45678'),
(4, 'consumer_priya', 'priya@gmail.com', 'pbkdf2:sha256:dummyhash', 'consumer', 'Priya Sundaram', '+91 97901 11223'),
(5, 'admin_agrilink', 'admin@agrilink.in', 'pbkdf2:sha256:dummyhash', 'admin', 'AgriLink System Administrator', '+91 90000 00000');

INSERT INTO Farmers (farmer_id, user_id, farm_name, farm_location, latitude, longitude, total_sales, rating, total_ratings_count, upi_id) VALUES
(1, 1, 'Green Valley Organic Farms', 'Maduranthakam, Chengalpattu', 12.6800, 79.8800, 48500.00, 4.85, 42, 'ramesh.farmer@upi'),
(2, 2, 'Cauvery Fresh Orchards', 'Tiruchirappalli Suburban', 10.7905, 78.7047, 62100.00, 4.90, 58, 'anitha.cauvery@upi'),
(3, 3, 'Velan Dairy & Farms', 'Pollachi, Coimbatore', 10.6609, 77.0048, 34000.00, 4.70, 27, 'muthu.velan@upi');

INSERT INTO Consumers (consumer_id, user_id, delivery_address, city, latitude, longitude, preferred_category) VALUES
(1, 4, 'No. 42, 3rd Main Road, Anna Nagar', 'Chennai', 13.0827, 80.2100, 'Vegetables');

INSERT INTO Products (product_id, farmer_id, name, category, price_per_unit, available_quantity, unit, harvest_date, location, description, image_url, status, production_cost, shelf_life_days) VALUES
(1, 1, 'Country Tomatoes (நாட்டு தக்காளி)', 'Vegetables', 40.00, 65.0, 'kg', CURDATE(), 'Maduranthakam', 'Naturally sun-ripened pesticide-free country tomatoes, harvested early morning.', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80', 'active', 28.00, 5),
(2, 1, 'Fresh Spinach (பசலைக் கீரை)', 'Vegetables', 25.00, 40.0, 'bunch', CURDATE(), 'Maduranthakam', 'Crisp, organic green leafy spinach with high iron content.', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80', 'active', 15.00, 2),
(3, 2, 'Alphonso Mangoes', 'Fruits', 120.00, 80.0, 'kg', CURDATE(), 'Tiruchirappalli', 'Aromatic, naturally tree-ripened sweet mangoes with zero chemical carbides.', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80', 'active', 85.00, 7),
(4, 3, 'Pure Cow A2 Milk', 'Dairy', 58.00, 50.0, 'liter', CURDATE(), 'Pollachi', 'Fresh unadulterated grass-fed cow milk delivered within hours of morning milking.', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80', 'active', 42.00, 2),
(5, 3, 'Country Free-Range Eggs', 'Eggs', 12.00, 120.0, 'piece', CURDATE(), 'Pollachi', 'Brown shell nutritious country eggs from naturally roaming hens.', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80', 'active', 8.50, 14),
(6, 1, 'Tender Green Okra (வெண்டைக்காய்)', 'Vegetables', 36.00, 30.0, 'kg', CURDATE(), 'Maduranthakam', 'Crisp and tender bhendi harvested this morning, ideal for sambar.', 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80', 'active', 24.00, 4);

INSERT INTO FarmerGroups (group_id, group_name, target_crop, combined_target_quantity, current_pooled_quantity, unit, status) VALUES
(1, 'Chengalpattu Tomato Producers Collective', 'Country Tomatoes', 100.00, 60.00, 'kg', 'open');

INSERT INTO FarmerGroupMembers (membership_id, group_id, farmer_id, contributed_quantity) VALUES
(1, 1, 1, 20.00),
(2, 1, 2, 15.00),
(3, 1, 3, 25.00);
