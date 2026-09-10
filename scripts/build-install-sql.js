/**
 * Builds database/hotelcozumleri.sql from schema parts.
 * Run: node scripts/build-install-sql.js
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

let sql = `-- Hotel Çözümleri — Full Database Install
-- Import this file into a fresh MySQL database (utf8mb4)
-- After import: npm run create-admin

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

`;

const schema = readFileSync(join(root, "database/schema.sql"), "utf8");
const body = schema
  .replace(/^--.*\n/gm, "")
  .replace(/SET NAMES utf8mb4;\n?/g, "")
  .replace(/SET FOREIGN_KEY_CHECKS = 0;\n?/g, "")
  .replace(/SET FOREIGN_KEY_CHECKS = 1;\n?/g, "");

sql += body.replace(
  /CREATE TABLE IF NOT EXISTS orders \([\s\S]*?\) ENGINE=InnoDB[^;]+;/,
  `CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  user_id INT UNSIGNED NOT NULL,
  status ENUM('pending','confirmed','preparing','shipped','completed','cancelled') NOT NULL DEFAULT 'pending',
  payment_status ENUM('pending','processing','paid','failed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  payment_method ENUM('paytr','iyzico','bank_transfer','card','transfer') DEFAULT NULL,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  vat_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  grand_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
  shipping_address_id INT UNSIGNED DEFAULT NULL,
  billing_address_id INT UNSIGNED DEFAULT NULL,
  customer_note TEXT DEFAULT NULL,
  admin_note TEXT DEFAULT NULL,
  stock_deducted TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
  INDEX idx_orders_user (user_id),
  INDEX idx_orders_number (order_number),
  INDEX idx_orders_status (status),
  INDEX idx_orders_payment_status (payment_status),
  INDEX idx_orders_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
).replace(
  /CREATE TABLE IF NOT EXISTS quote_requests \([\s\S]*?\) ENGINE=InnoDB[^;]+;/,
  `CREATE TABLE IF NOT EXISTS quote_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quote_number VARCHAR(50) DEFAULT NULL UNIQUE,
  user_id INT UNSIGNED DEFAULT NULL,
  hotel_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  city VARCHAR(100) DEFAULT NULL,
  room_count INT DEFAULT NULL,
  position VARCHAR(100) DEFAULT NULL,
  status ENUM('new','reviewing','quoted','approved','rejected','closed') NOT NULL DEFAULT 'new',
  note TEXT DEFAULT NULL,
  admin_note TEXT DEFAULT NULL,
  quoted_subtotal DECIMAL(12,2) DEFAULT NULL,
  quoted_vat DECIMAL(12,2) DEFAULT NULL,
  quoted_discount DECIMAL(12,2) DEFAULT NULL,
  quoted_total DECIMAL(12,2) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_quotes_email (email),
  INDEX idx_quotes_status (status),
  INDEX idx_quotes_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
).replace(
  /CREATE TABLE IF NOT EXISTS quote_request_items \([\s\S]*?\) ENGINE=InnoDB[^;]+;/,
  `CREATE TABLE IF NOT EXISTS quote_request_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quote_request_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED DEFAULT NULL,
  variant_id INT UNSIGNED DEFAULT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  quoted_unit_price DECIMAL(12,2) DEFAULT NULL,
  note TEXT DEFAULT NULL,
  logo_option VARCHAR(50) DEFAULT NULL,
  FOREIGN KEY (quote_request_id) REFERENCES quote_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
).replace(
  /INDEX idx_products_status \(status\)\n\) ENGINE=InnoDB/,
  `INDEX idx_products_status (status),
  INDEX idx_products_sku (sku)
) ENGINE=InnoDB`
);

const faz5 = readFileSync(join(root, "database/migration-faz5.sql"), "utf8");
const faz5Tables = faz5
  .replace(/^--.*\n/gm, "")
  .replace(/SET NAMES utf8mb4;\n?/g, "")
  .replace(/SET FOREIGN_KEY_CHECKS = 0;\n?/g, "")
  .replace(/SET FOREIGN_KEY_CHECKS = 1;\n?/g, "")
  .replace(/ALTER TABLE[\s\S]*$/g, "")
  .trim();

sql += "\n" + faz5Tables + "\n\n";

const faz6 = readFileSync(join(root, "database/migration-faz6.sql"), "utf8");
const faz6Body = faz6
  .replace(/^--.*\n/gm, "")
  .replace(/SET NAMES utf8mb4;\n?/g, "")
  .replace(/SET FOREIGN_KEY_CHECKS = 0;\n?/g, "")
  .replace(/SET FOREIGN_KEY_CHECKS = 1;\n?/g, "")
  .trim();

sql += faz6Body + "\n\nSET FOREIGN_KEY_CHECKS = 1;\n";

writeFileSync(join(root, "database/hotelcozumleri.sql"), sql);
console.log("Created database/hotelcozumleri.sql");
