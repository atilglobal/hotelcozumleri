import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const BASE = "http://localhost:3001";
const OUT = path.join(process.cwd(), "public", "preview");

const sections = [
  {
    id: "ana",
    title: "Ana Sayfa",
    pages: [{ slug: "home", path: "/", label: "Ana Sayfa" }],
  },
  {
    id: "cozumler",
    title: "Çözümler",
    pages: [
      { slug: "cozumler", path: "/cozumler", label: "Çözümler Hub" },
      { slug: "otel-web-sitesi", path: "/cozumler/otel-web-sitesi", label: "Otel Web Sitesi" },
      { slug: "sosyal-medya", path: "/cozumler/sosyal-medya", label: "Sosyal Medya" },
      { slug: "kapi-sistemleri", path: "/cozumler/kapi-sistemleri", label: "Kapı Sistemleri" },
      { slug: "otel-tekstili", path: "/cozumler/otel-tekstili", label: "Otel Tekstili" },
      { slug: "sarf-temizlik", path: "/cozumler/sarf-temizlik", label: "Sarf & Temizlik" },
      { slug: "spa-kurulumu", path: "/cozumler/spa-kurulumu", label: "SPA Kurulumu" },
      { slug: "yapay-cicek-dekorasyon", path: "/cozumler/yapay-cicek-dekorasyon", label: "Yapay Çiçek & Dekorasyon" },
    ],
  },
  {
    id: "hotelio",
    title: "Hotelio",
    pages: [
      { slug: "hotelio", path: "/hotelio", label: "Hotelio Landing" },
      { slug: "hotelio-moduller", path: "/hotelio/moduller", label: "Hotelio Modüller" },
    ],
  },
  {
    id: "tedarik",
    title: "Tedarik",
    pages: [{ slug: "tedarik", path: "/tedarik", label: "Tedarik Merkezi" }],
  },
  {
    id: "kurumsal",
    title: "Kurumsal & Form",
    pages: [
      { slug: "hakkimizda", path: "/hakkimizda", label: "Hakkımızda" },
      { slug: "projeler", path: "/projeler", label: "Projeler" },
      { slug: "blog", path: "/blog", label: "Blog" },
      { slug: "iletisim", path: "/iletisim", label: "İletişim" },
      { slug: "teklif-al", path: "/teklif-al", label: "Teklif Al" },
      { slug: "hotelio-demo", path: "/hotelio-demo", label: "Hotelio Demo" },
    ],
  },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const manifest = [];

for (const section of sections) {
  for (const page of section.pages) {
    const tab = await context.newPage();
    await tab.addInitScript(() => {
      localStorage.setItem(
        "hc_cookie_consent",
        JSON.stringify({ essential: true, analytics: true, marketing: true, updatedAt: Date.now() })
      );
    });
    const url = `${BASE}${page.path}`;
    console.log(`Capturing ${page.label}...`);
    try {
      await tab.goto(url, { waitUntil: "networkidle", timeout: 90000 });
      await tab.waitForTimeout(2000);
      const heroFile = `${page.slug}-hero.png`;
      const fullFile = `${page.slug}-full.png`;
      await tab.screenshot({ path: path.join(OUT, heroFile), fullPage: false });
      await tab.screenshot({ path: path.join(OUT, fullFile), fullPage: true });
      manifest.push({
        ...page,
        section: section.id,
        sectionTitle: section.title,
        hero: `/preview/${heroFile}`,
        full: `/preview/${fullFile}`,
        live: page.path,
      });
      console.log(`  OK ${page.slug}`);
    } catch (err) {
      console.error(`  FAIL ${page.slug}:`, err.message);
    }
    await tab.close();
  }
}

await browser.close();

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hotel Çözümleri — Site Önizleme</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: "Segoe UI", system-ui, sans-serif; background: #07101C; color: #e2e8f0; }
    header { position: sticky; top: 0; z-index: 100; background: rgba(7,16,28,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.5rem; }
    header h1 { font-size: 1.25rem; font-weight: 600; }
    header p { font-size: 0.85rem; color: #94a3b8; margin-top: 0.25rem; }
    nav { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
    nav a { font-size: 0.75rem; padding: 0.35rem 0.75rem; border-radius: 999px; background: rgba(255,255,255,0.06); color: #cbd5e1; text-decoration: none; border: 1px solid rgba(255,255,255,0.08); }
    nav a:hover { border-color: rgba(201,169,98,0.5); color: #c9a962; }
    main { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
    section { margin-bottom: 3rem; }
    section > h2 { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a962; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .page { background: #0f1a2e; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; margin-bottom: 1.5rem; overflow: hidden; }
    .page-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .page-head h3 { font-size: 1rem; font-weight: 600; }
    .page-head .path { font-size: 0.75rem; color: #64748b; font-family: monospace; }
    .actions { display: flex; gap: 0.5rem; }
    .actions a, .actions button { font-size: 0.75rem; padding: 0.4rem 0.85rem; border-radius: 6px; cursor: pointer; text-decoration: none; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #e2e8f0; }
    .actions a.primary { background: #c9a962; color: #07101C; border-color: #c9a962; font-weight: 600; }
    .actions button.active { background: rgba(201,169,98,0.15); border-color: #c9a962; color: #c9a962; }
    .preview-wrap { background: #050a12; max-height: 70vh; overflow: auto; }
    .preview-wrap img { width: 100%; display: block; }
    .preview-wrap.hero img { max-height: 500px; object-fit: cover; object-position: top; }
    footer { text-align: center; padding: 2rem; color: #64748b; font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.06); }
  </style>
</head>
<body>
  <header>
    <h1>Hotel Çözümleri — Komple Site Önizleme</h1>
    <p>${manifest.length} sayfa · Hero + tam sayfa görüntüleri · Canlı siteye tek tıkla geç</p>
    <nav>
      ${[...new Set(manifest.map((m) => m.section))].map((id) => {
        const t = manifest.find((m) => m.section === id).sectionTitle;
        return `<a href="#${id}">${t}</a>`;
      }).join("")}
    </nav>
  </header>
  <main>
    ${sections.map((sec) => {
      const items = manifest.filter((m) => m.section === sec.id);
      if (!items.length) return "";
      return `<section id="${sec.id}"><h2>${sec.title}</h2>${items.map((p) => `
        <article class="page" data-slug="${p.slug}">
          <div class="page-head">
            <div><h3>${p.label}</h3><div class="path">${p.live}</div></div>
            <div class="actions">
              <button type="button" class="toggle active" data-mode="hero">Hero</button>
              <button type="button" class="toggle" data-mode="full">Tam Sayfa</button>
              <a class="primary" href="${p.live}" target="_blank" rel="noopener">Canlı Aç →</a>
            </div>
          </div>
          <div class="preview-wrap hero">
            <img src="${p.hero}" alt="${p.label} hero" data-hero="${p.hero}" data-full="${p.full}" />
          </div>
        </article>`).join("")}</section>`;
    }).join("")}
  </main>
  <footer>Önizleme localhost:3001 üzerinde oluşturuldu · ${new Date().toLocaleString("tr-TR")}</footer>
  <script>
    document.querySelectorAll(".page").forEach((page) => {
      const img = page.querySelector("img");
      const wrap = page.querySelector(".preview-wrap");
      page.querySelectorAll(".toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
          page.querySelectorAll(".toggle").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const mode = btn.dataset.mode;
          img.src = mode === "full" ? img.dataset.full : img.dataset.hero;
          wrap.classList.toggle("hero", mode === "hero");
        });
      });
    });
  </script>
</body>
</html>`;

await writeFile(path.join(OUT, "index.html"), html);
await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\\nPreview ready: ${BASE}/preview/index.html (${manifest.length} pages)`);
