-- Hotel Çözümleri Demo Seed Data (Development only)
SET NAMES utf8mb4;

INSERT INTO brands (id, name, slug, status) VALUES
(1, 'Hotel Çözümleri', 'hotel-cozumleri', 'active'),
(2, 'ProClean', 'proclean', 'active'),
(3, 'SoftLine', 'softline', 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO categories (id, parent_id, name, slug, description, sort_order, status) VALUES
(1, NULL, 'Otel Tekstili', 'otel-tekstili', 'Havlu, bornoz, nevresim ve otel tekstil ürünleri.', 1, 'active'),
(2, 1, 'Havlu', 'havlu', NULL, 1, 'active'),
(3, 1, 'Bornoz', 'bornoz', NULL, 2, 'active'),
(4, 1, 'Nevresim', 'nevresim', NULL, 3, 'active'),
(5, NULL, 'Sarf & Temizlik', 'sarf-temizlik', 'Oda içi ve endüstriyel temizlik ürünleri.', 2, 'active'),
(6, 5, 'Oda İçi Ürünler', 'oda-ici-urunler', NULL, 1, 'active'),
(7, 5, 'Endüstriyel Temizlik', 'endustriyel-temizlik', NULL, 2, 'active'),
(8, NULL, 'Kapı Sistemleri', 'kapi-sistemleri', 'Mifare kartlar ve kapı aksesuarları.', 3, 'active'),
(9, 8, 'Mifare Kartlar', 'mifare-kartlar', NULL, 1, 'active'),
(10, NULL, 'SPA', 'spa-urunleri', 'SPA sarf ve wellness ürünleri.', 4, 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO products (id, name, slug, sku, short_description, description, category_id, brand_id, price, stock, stock_type, status, featured, is_quote_only, min_order_quantity, unit, main_image, vat_rate, allows_logo) VALUES
(1, 'Premium Otel Havlusu', 'premium-otel-havlusu', 'HC-HV-001', 'Yüksek emicilik ve dayanıklılık sunan premium otel havlusu.', '500 gsm pamuklu otel havlusu.', 2, 3, 189.00, 500, 'stocked', 'active', 1, 0, 1, 'adet', '/images/products/havlu.svg', 20, 1),
(2, 'Otel Bornozu', 'otel-bornozu', 'HC-BR-001', 'Konforlu ve dayanıklı otel bornozu.', 'Premium otel bornozu.', 3, 3, 349.00, 200, 'stocked', 'active', 0, 0, 1, 'adet', '/images/products/bornoz.svg', 20, 1),
(9, 'Endüstriyel Otel Çamaşır Deterjanı', 'otel-camasir-deterjani', 'HC-CD-20L', 'Çamaşırhane için endüstriyel deterjan, 20L.', 'Endüstriyel çamaşır deterjanı.', 7, 2, 1250.00, 30, 'quote', 'active', 0, 1, 1, 'adet', '/images/products/deterjan.svg', 20, 0)
ON DUPLICATE KEY UPDATE name=VALUES(name);
