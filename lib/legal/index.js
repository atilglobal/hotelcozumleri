import { query, getPool } from "@/lib/db";
import { sanitizeHtml } from "@/lib/sanitize";

export const LEGAL_SLUGS = {
  kvkk: { title: "KVKK Aydınlatma Metni", path: "/kvkk" },
  "gizlilik-politikasi": { title: "Gizlilik Politikası", path: "/gizlilik-politikasi" },
  "cerez-politikasi": { title: "Çerez Politikası", path: "/cerez-politikasi" },
  "mesafeli-satis-sozlesmesi": { title: "Mesafeli Satış Sözleşmesi", path: "/mesafeli-satis-sozlesmesi" },
  "on-bilgilendirme-formu": { title: "Ön Bilgilendirme Formu", path: "/on-bilgilendirme-formu" },
  "iade-ve-iptal-politikasi": { title: "İade ve İptal Politikası", path: "/iade-ve-iptal-politikasi" },
  "kullanim-kosullari": { title: "Kullanım Koşulları", path: "/kullanim-kosullari" },
};

const DEFAULT_CONTENT = `<p>Hotel Çözümleri olarak kişisel verilerinizin güvenliği ve şeffaflığı bizim için önemlidir. Bu sayfadaki metin yönetim panelinden güncellenmektedir.</p>
<p>Sorularınız için <a href="/iletisim">iletişim</a> sayfamızdan bize ulaşabilirsiniz.</p>`;

export async function getLegalPage(slug) {
  const meta = LEGAL_SLUGS[slug];
  if (!meta) return null;

  if (!getPool()) {
    return { slug, title: meta.title, content: DEFAULT_CONTENT, updated_at: null };
  }

  try {
    const rows = await query("SELECT * FROM legal_pages WHERE slug = ? LIMIT 1", [slug]);
    if (rows.length) return rows[0];
    return { slug, title: meta.title, content: DEFAULT_CONTENT, updated_at: null };
  } catch {
    return { slug, title: meta.title, content: DEFAULT_CONTENT, updated_at: null };
  }
}

export async function getAllLegalPages() {
  if (!getPool()) {
    return Object.entries(LEGAL_SLUGS).map(([slug, meta]) => ({
      slug,
      title: meta.title,
      content: DEFAULT_CONTENT,
      updated_at: null,
    }));
  }
  try {
    const rows = await query("SELECT * FROM legal_pages ORDER BY title");
    const map = new Map(rows.map((r) => [r.slug, r]));
    return Object.entries(LEGAL_SLUGS).map(([slug, meta]) =>
      map.get(slug) || { slug, title: meta.title, content: DEFAULT_CONTENT, updated_at: null }
    );
  } catch {
    return Object.entries(LEGAL_SLUGS).map(([slug, meta]) => ({
      slug,
      title: meta.title,
      content: DEFAULT_CONTENT,
      updated_at: null,
    }));
  }
}

export async function updateLegalPage(slug, { title, content }) {
  if (!LEGAL_SLUGS[slug]) throw new Error("INVALID_SLUG");
  const safeContent = sanitizeHtml(content || "");
  const safeTitle = String(title || LEGAL_SLUGS[slug].title).trim();
  await query(
    `INSERT INTO legal_pages (slug, title, content) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content), updated_at = CURRENT_TIMESTAMP`,
    [slug, safeTitle, safeContent]
  );
  return { ok: true };
}
