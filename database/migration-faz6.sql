-- FAZ 6 Migration: Blog, Legal Pages
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS blog_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT DEFAULT NULL,
  status ENUM('active', 'passive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_blog_categories_slug (slug),
  INDEX idx_blog_categories_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT DEFAULT NULL,
  content LONGTEXT DEFAULT NULL,
  featured_image VARCHAR(500) DEFAULT NULL,
  author_id INT UNSIGNED DEFAULT NULL,
  category_id INT UNSIGNED DEFAULT NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  published_at TIMESTAMP NULL DEFAULT NULL,
  seo_title VARCHAR(255) DEFAULT NULL,
  seo_description TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES admin_users(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL,
  INDEX idx_blog_posts_slug (slug),
  INDEX idx_blog_posts_status (status),
  INDEX idx_blog_posts_published (published_at),
  INDEX idx_blog_posts_category (category_id),
  FULLTEXT INDEX ft_blog_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS legal_pages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_legal_pages_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO blog_categories (name, slug, description, status) VALUES
('Otel Yönetimi', 'otel-yonetimi', 'Otel operasyon ve yönetim içerikleri', 'active'),
('Hotelio', 'hotelio', 'Hotelio otel yönetim platformu', 'active'),
('Otel Teknolojileri', 'otel-teknolojileri', 'Otel teknoloji trendleri', 'active'),
('Otel Tekstili', 'otel-tekstili', 'Tekstil ve konfor çözümleri', 'active'),
('Hijyen & Temizlik', 'hijyen-temizlik', 'Hijyen ve temizlik uygulamaları', 'active'),
('SPA & Wellness', 'spa-wellness', 'SPA ve wellness içerikleri', 'active'),
('Dijital Pazarlama', 'dijital-pazarlama', 'Otel dijital pazarlama', 'active'),
('Otelcilik İpuçları', 'otelcilik-ipuclari', 'Pratik otelcilik önerileri', 'active');

INSERT INTO legal_pages (slug, title, content) VALUES
('kvkk', 'KVKK Aydınlatma Metni', '<p>Hotel Çözümleri olarak kişisel verilerinizin güvenliği bizim için önemlidir. Bu metin yönetim panelinden güncellenmektedir.</p><p>Sorularınız için <a href=\"/iletisim\">iletişim</a> sayfamızdan bize ulaşabilirsiniz.</p>'),
('gizlilik-politikasi', 'Gizlilik Politikası', '<p>Gizlilik uygulamalarımız hakkında bilgi almak için bu sayfayı inceleyebilirsiniz. Metin yönetim panelinden güncellenmektedir.</p>'),
('cerez-politikasi', 'Çerez Politikası', '<p>Web sitemizde kullanılan çerezler hakkında bilgi bu sayfada yer almaktadır.</p>'),
('mesafeli-satis-sozlesmesi', 'Mesafeli Satış Sözleşmesi', '<p>Online alışverişlerinizde geçerli mesafeli satış sözleşmesi metni yönetim panelinden düzenlenebilir.</p>'),
('on-bilgilendirme-formu', 'Ön Bilgilendirme Formu', '<p>Satın alma öncesi bilgilendirme metni yönetim panelinden düzenlenebilir.</p>'),
('iade-ve-iptal-politikasi', 'İade ve İptal Politikası', '<p>İade ve iptal koşulları yönetim panelinden düzenlenebilir.</p>'),
('kullanim-kosullari', 'Kullanım Koşulları', '<p>Web sitesi kullanım koşulları yönetim panelinden düzenlenebilir.</p>')
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT IGNORE INTO settings (`group`, `key`, value, type, is_public) VALUES
('general', 'site_name', 'Hotel Çözümleri', 'string', 1),
('general', 'contact_email', 'info@hotelcozumleri.com', 'string', 1),
('general', 'contact_phone', '+90 554 104 62 91', 'string', 1),
('general', 'address', 'Gölcük / Kocaeli', 'string', 1),
('general', 'company_note', 'ASK Bilişim iştirakidir.', 'string', 1);

SET FOREIGN_KEY_CHECKS = 1;
