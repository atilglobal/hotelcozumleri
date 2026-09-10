-- FAZ 5 Migration
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Admin users (separate from customer users)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('SUPER_ADMIN', 'ADMIN') NOT NULL DEFAULT 'ADMIN',
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  last_login_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_admin_users_email (email),
  INDEX idx_admin_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `group` VARCHAR(50) NOT NULL,
  `key` VARCHAR(100) NOT NULL,
  value TEXT DEFAULT NULL,
  type ENUM('string','number','boolean','json','secret') NOT NULL DEFAULT 'string',
  is_public TINYINT(1) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_settings (`group`, `key`),
  INDEX idx_settings_group (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bank accounts
CREATE TABLE IF NOT EXISTS bank_accounts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bank_name VARCHAR(100) NOT NULL,
  account_holder VARCHAR(200) NOT NULL,
  iban VARCHAR(34) NOT NULL,
  branch VARCHAR(100) DEFAULT NULL,
  account_number VARCHAR(50) DEFAULT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
  description TEXT DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('active', 'passive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_bank_accounts_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payment transactions
CREATE TABLE IF NOT EXISTS payment_transactions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  provider ENUM('paytr','iyzico','bank_transfer') NOT NULL,
  provider_transaction_id VARCHAR(255) DEFAULT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
  status ENUM('pending','processing','paid','failed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  request_reference VARCHAR(100) DEFAULT NULL,
  provider_reference VARCHAR(255) DEFAULT NULL,
  metadata JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
  UNIQUE KEY uk_provider_tx (provider, provider_transaction_id),
  INDEX idx_payment_order (order_id),
  INDEX idx_payment_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Order status history
CREATE TABLE IF NOT EXISTS order_status_history (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  old_status VARCHAR(50) DEFAULT NULL,
  new_status VARCHAR(50) NOT NULL,
  changed_by INT UNSIGNED DEFAULT NULL,
  note TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES admin_users(id) ON DELETE SET NULL,
  INDEX idx_order_history_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin notes (orders, quotes, etc.)
CREATE TABLE IF NOT EXISTS admin_notes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  entity_type ENUM('order','quote','hotelio_demo','form') NOT NULL,
  entity_id INT UNSIGNED NOT NULL,
  admin_user_id INT UNSIGNED NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  INDEX idx_admin_notes_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inventory transactions
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED DEFAULT NULL,
  variant_id INT UNSIGNED DEFAULT NULL,
  type ENUM('reserve','deduct','restore') NOT NULL,
  quantity INT NOT NULL,
  reference_type ENUM('order','payment','manual','cancel') NOT NULL,
  reference_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_inventory_product (product_id),
  INDEX idx_inventory_ref (reference_type, reference_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_user_id INT UNSIGNED DEFAULT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) DEFAULT NULL,
  entity_id INT UNSIGNED DEFAULT NULL,
  metadata JSON DEFAULT NULL,
  ip_address VARCHAR(45) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL,
  INDEX idx_audit_entity (entity_type, entity_id),
  INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('order','quote','hotelio_demo','form') NOT NULL,
  entity_id INT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_notifications_read (is_read, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hotelio demo requests
CREATE TABLE IF NOT EXISTS hotelio_demo_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  hotel_name VARCHAR(255) NOT NULL,
  city VARCHAR(100) DEFAULT NULL,
  room_count INT DEFAULT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  position VARCHAR(100) DEFAULT NULL,
  modules JSON DEFAULT NULL,
  note TEXT DEFAULT NULL,
  status ENUM('new','called','demo_scheduled','demo_done','quoted','sold','negative') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_hotelio_status (status),
  INDEX idx_hotelio_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Form submissions (contact, service quote, etc.)
CREATE TABLE IF NOT EXISTS form_submissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  form_type ENUM('contact','service_quote','general') NOT NULL,
  full_name VARCHAR(200) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  hotel_name VARCHAR(255) DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  message TEXT DEFAULT NULL,
  payload JSON DEFAULT NULL,
  status ENUM('new','read','processing','completed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_form_type (form_type),
  INDEX idx_form_status (status),
  INDEX idx_form_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quote number sequence
CREATE TABLE IF NOT EXISTS quote_number_seq (
  id INT UNSIGNED NOT NULL DEFAULT 1 PRIMARY KEY,
  last_number INT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO quote_number_seq (id, last_number) VALUES (1, 0);

-- Alter existing tables
ALTER TABLE orders
  MODIFY payment_status ENUM('pending','processing','paid','failed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  MODIFY payment_method ENUM('paytr','iyzico','bank_transfer','card','transfer') DEFAULT NULL,
  ADD COLUMN admin_note TEXT DEFAULT NULL AFTER customer_note,
  ADD COLUMN stock_deducted TINYINT(1) NOT NULL DEFAULT 0 AFTER admin_note,
  ADD INDEX idx_orders_status (status),
  ADD INDEX idx_orders_payment_status (payment_status),
  ADD INDEX idx_orders_created (created_at);

ALTER TABLE quote_requests
  ADD COLUMN quote_number VARCHAR(50) DEFAULT NULL UNIQUE AFTER id,
  ADD COLUMN admin_note TEXT DEFAULT NULL AFTER note,
  ADD COLUMN quoted_subtotal DECIMAL(12,2) DEFAULT NULL AFTER admin_note,
  ADD COLUMN quoted_vat DECIMAL(12,2) DEFAULT NULL AFTER quoted_subtotal,
  ADD COLUMN quoted_discount DECIMAL(12,2) DEFAULT NULL AFTER quoted_vat,
  ADD COLUMN quoted_total DECIMAL(12,2) DEFAULT NULL AFTER quoted_discount,
  ADD INDEX idx_quotes_status (status),
  ADD INDEX idx_quotes_created (created_at);

ALTER TABLE quote_request_items
  ADD COLUMN quoted_unit_price DECIMAL(12,2) DEFAULT NULL AFTER quantity;

ALTER TABLE products
  ADD INDEX idx_products_sku (sku);

SET FOREIGN_KEY_CHECKS = 1;
