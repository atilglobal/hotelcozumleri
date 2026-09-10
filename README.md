# Hotel Çözümleri

Oteller için e-ticaret, Hotelio otel yönetim platformu tanıtımı, çözüm sayfaları ve B2B teklif sistemi.

**Domain:** [hotelcozumleri.com](https://hotelcozumleri.com)

## Gereksinimler

- Node.js 20 LTS (veya uyumlu LTS sürüm)
- npm
- MySQL 8.x / MariaDB 10.6+

## Kurulum

1. Proje dosyalarını sunucuya yükleyin
2. Bağımlılıkları kurun:
   ```bash
   npm install
   ```
3. Ortam değişkenlerini ayarlayın:
   ```bash
   cp .env.example .env
   ```
   `.env` dosyasını düzenleyin (DB, SESSION_SECRET, SITE_URL vb.)
4. Veritabanını oluşturun ve SQL dosyasını import edin:
   ```bash
   npm run build:sql
   ```
   phpMyAdmin veya CLI ile `database/hotelcozumleri.sql` dosyasını import edin.
5. Admin kullanıcısı oluşturun:
   ```bash
   npm run create-admin admin@hotelcozumleri.com GuvenliSifre123
   ```
6. Production build alın:
   ```bash
   npm run build
   ```
7. Uygulamayı başlatın:
   ```bash
   npm start
   ```
   DirectAdmin / hosting ortamında `PORT` değişkeni panel tarafından verilir.

## Demo Veri (Opsiyonel)

Geliştirme ortamı için:
```bash
mysql -u USER -p DATABASE < database/demo_seed.sql
```

Production kurulumda demo seed otomatik çalıştırılmamalıdır.

## Payment Setup

### PayTR
- `PAYTR_MERCHANT_ID`, `PAYTR_MERCHANT_KEY`, `PAYTR_MERCHANT_SALT`
- Callback URL: `https://hotelcozumleri.com/api/payments/paytr/callback`
- Admin panel → Ayarlar → Ödeme üzerinden de yapılandırılabilir

### iyzico
- `IYZICO_API_KEY`, `IYZICO_SECRET_KEY`, `IYZICO_BASE_URL`
- Callback URL: `https://hotelcozumleri.com/api/payments/iyzico/callback`

### Havale / EFT
- Admin panel → Banka Hesapları bölümünden IBAN bilgilerini girin

## SMTP

E-posta bildirimleri için `.env` dosyasında SMTP ayarlarını yapın:
- Sipariş alındı, ödeme başarılı, havale bilgileri
- Şifre sıfırlama, teklif/demo talepleri
- Admin bildirimleri (`ADMIN_NOTIFICATION_EMAIL`)

SMTP yapılandırılmamışsa sipariş işlemleri devam eder; mail gönderimi atlanır ve loglanır.

## File Permissions

- Uygulama dosyaları: `755` (dizinler), `644` (dosyalar)
- Upload dizini (varsa): minimum yazma yetkisi (`775` veya hosting önerisine göre)
- `.env` dosyası: `600` — web root dışında veya erişime kapalı tutulmalı
- `777` kullanmayın

## Production

- `NODE_ENV=production`
- `SITE_URL=https://hotelcozumleri.com`
- Güçlü `SESSION_SECRET` ve `ADMIN_SESSION_SECRET` kullanın
- HTTPS zorunlu (Let's Encrypt)
- `npm run build && npm start`

DirectAdmin kurulumu için: [DIRECTADMIN_DEPLOYMENT.md](./DIRECTADMIN_DEPLOYMENT.md)

## Backup

Düzenli yedekleyin:
- MySQL veritabanı (günlük)
- Upload/media dosyaları
- `.env` dosyası (güvenli, şifreli konumda)

Yedek dosyalarını public klasöre koymayın.

## Security Notes

- SQL dosyasında varsayılan admin kullanıcısı yoktur; `npm run create-admin` kullanın
- Admin panel `/admin` — güçlü şifre ve HTTPS zorunlu
- Ödeme callback'leri sunucu tarafında doğrulanır
- Hassas veriler (şifre, kart, token) loglanmaz
- Yasal metinler admin panelden düzenlenir; production öncesi hukuk danışmanı onayı önerilir

## Scripts

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm start` | Production sunucu |
| `npm run lint` | ESLint |
| `npm run create-admin` | Admin kullanıcı oluştur |
| `npm run build:sql` | `hotelcozumleri.sql` oluştur |
