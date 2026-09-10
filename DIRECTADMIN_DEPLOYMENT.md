# DirectAdmin Deployment — Hotel Çözümleri

Bu rehber, hotelcozumleri.com projesinin DirectAdmin hosting ortamına kurulumunu adım adım açıklar.

## Ön Gereksinimler

1. DirectAdmin panel erişimi
2. Hosting paketinde **Node.js Application** desteği (CustomBuild veya CloudLinux Node.js Selector)
3. MySQL veritabanı
4. Domain: `hotelcozumleri.com`
5. Node.js LTS (20.x önerilir)

> Hosting'inizde Node.js desteği yoksa destek ekibine başvurun veya VPS kullanın.

---

## 1. Domain ve SSL

1. DirectAdmin → **Account Manager** → **Domain Setup**
2. Domain: `hotelcozumleri.com` aktif olmalı
3. **SSL Certificates** → Let's Encrypt ile sertifika oluşturun
4. **Force SSL** / HTTPS yönlendirmesini etkinleştirin
5. Canonical tercih: `https://hotelcozumleri.com` (www → non-www redirect)

---

## 2. Dosyaları Yükleme

### Seçenek A: Git ile
```bash
cd /home/kullanici/domains/hotelcozumleri.com
git clone <repo-url> app
cd app
npm install
```

### Seçenek B: FTP/SFTP
- Dosyaları domain dizinine yükleyin
- `node_modules` yüklemeyin; sunucuda `npm install` çalıştırın

**Önemli:** `.env` dosyasını `public_html` içinde tarayıcıdan erişilebilir konuma koymayın. Mümkünse bir üst dizinde tutun veya DirectAdmin env panelini kullanın.

---

## 3. MySQL Kurulumu

1. DirectAdmin → **MySQL Management**
2. **Create Database** → örn. `kullanici_hotel`
3. **Create Database User** → güçlü şifre
4. Kullanıcıya veritabanı yetkisi verin (ALL PRIVILEGES)
5. **phpMyAdmin** açın
6. Veritabanını seçin → **Import**
7. `database/hotelcozumleri.sql` dosyasını import edin

`.env` dosyasına girin:
```
DB_HOST=localhost
DB_NAME=kullanici_hotel
DB_USER=kullanici_dbuser
DB_PASSWORD=guvenli_sifre
DB_PORT=3306
```

---

## 4. Ortam Değişkenleri (.env)

Domain dizininde `.env` oluşturun (`.env.example` referans alın):

```
NODE_ENV=production
SITE_URL=https://hotelcozumleri.com
NEXT_PUBLIC_SITE_URL=https://hotelcozumleri.com
SESSION_SECRET=<64+ karakter rastgele>
ADMIN_SESSION_SECRET=<64+ karakter rastgele>
PORT=<hosting tarafından verilen port>
```

Ödeme ve SMTP ayarlarını da ekleyin (README.md referans).

---

## 5. Admin Oluşturma

SSH ile proje dizinine gidin:
```bash
npm run create-admin admin@hotelcozumleri.com GuvenliSifre123!
```

---

## 6. Node.js Application (DirectAdmin)

Panel yapısına göre adımlar değişebilir:

### CloudLinux Node.js Selector
1. **Setup Node.js App**
2. Node.js version: 20.x LTS
3. Application mode: **Production**
4. Application root: `/home/kullanici/domains/hotelcozumleri.com/app`
5. Application URL: `hotelcozumleri.com`
6. Application startup file: `node_modules/next/dist/bin/next`
7. Startup command / arguments:
   ```
   start
   ```
   veya tam komut:
   ```
   node node_modules/next/dist/bin/next start
   ```
8. `PORT` değişkenini hosting panelinden atayın — kod `process.env.PORT` kullanır

### Build
SSH'de:
```bash
npm run build
```
Panelde **Restart App** yapın.

---

## 7. Reverse Proxy (Nginx/Apache)

DirectAdmin genellikle otomatik proxy yapar. Manuel gerekiyorsa:

**Nginx örnek:**
```nginx
location / {
    proxy_pass http://127.0.0.1:PORT;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## 8. Upload / Media Storage

Yerel dosya sistemi kullanılıyorsa:
- Upload dizini: `public/uploads/` (oluşturun)
- Deploy sırasında bu klasör **silinmemeli**
- Yedekleme planına dahil edin
- İzin: `775` (owner/group write)

---

## 9. Cron Jobs (İleride)

Bu fazda zorunlu cron yok. İleride mail retry / cleanup için:
- DirectAdmin → **Cron Jobs**
- Örnek: `0 3 * * * cd /path/to/app && node scripts/cleanup.js`

---

## 10. Ödeme Callback URL'leri

Production'da payment sağlayıcı panellerinde:
- PayTR callback: `https://hotelcozumleri.com/api/payments/paytr/callback`
- iyzico callback: `https://hotelcozumleri.com/api/payments/iyzico/callback`

---

## 11. Kontrol Listesi

- [ ] HTTPS aktif, HTTP → HTTPS redirect
- [ ] `hotelcozumleri.sql` import edildi
- [ ] Admin oluşturuldu
- [ ] `npm run build` başarılı
- [ ] Ana sayfa açılıyor
- [ ] Admin panel `/admin/login` erişilebilir
- [ ] robots.txt ve sitemap.xml erişilebilir
- [ ] Ödeme callback URL'leri yapılandırıldı
- [ ] SMTP test edildi (opsiyonel)
- [ ] Yasal sayfalar admin panelden kontrol edildi
- [ ] Yedekleme planı oluşturuldu

---

## 12. Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| 502 Bad Gateway | Node app çalışmıyor; logları kontrol edin, PORT doğru mu |
| DB connection error | `.env` DB bilgileri, MySQL kullanıcı yetkileri |
| Build hatası | Node sürümü, `npm install` tekrar |
| Session/login sorunu | `SESSION_SECRET` set mi, HTTPS + secure cookie |
| Upload kayboluyor | Deploy script upload klasörünü silmemeli |

Log konumları hosting yapılandırmasına göre değişir. DirectAdmin error log ve Node.js app loglarını kontrol edin.
