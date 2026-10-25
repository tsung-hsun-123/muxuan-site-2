/**
 * Post-build prerender script.
 *
 * For each blog article route, writes a dist/blog/[slug]/index.html that
 * has the correct <title>, <meta description>, <link rel="canonical">,
 * Open Graph tags, and JSON-LD baked directly into the HTML.
 *
 * This means Googlebot sees full metadata immediately — no JS execution
 * required — so each blog post is indexed as an individual page.
 *
 * Run after `vite build`:
 *   node scripts/prerender.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, process.env.PRERENDER_DIST_DIR || "../dist");
const locations = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../client/src/data/locations.json"), "utf-8"));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function renderLocations() {
  return `<main class="container mx-auto px-4 py-20"><h1>全台及海外服務據點</h1><div class="grid sm:grid-cols-2 gap-8">${locations.map((loc) => `<section class="bg-white rounded-xl p-8"><h2>${escapeHtml(loc.name)}</h2><address class="not-italic">${escapeHtml(loc.addressLocality)} ${escapeHtml(loc.streetAddress)}<br><a href="tel:${escapeHtml(loc.phone.replace(/\s/g, ""))}">${escapeHtml(loc.phone)}</a></address><p>${escapeHtml(loc.hours)}</p><p>公休：${escapeHtml(loc.closed)}</p>${loc.directions.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}<a href="${escapeHtml(loc.mapUrl)}">查看地圖</a></section>`).join("")}</div></main>`;
}
const baseHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHtmlPath)) {
  console.error("❌  dist/index.html not found — run `npm run build` first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");

// Read the same article records as the rendered blog.
const ts = (await import("typescript")).default;
const articleSource = fs.readFileSync(path.resolve(__dirname, "../client/src/data/articles.ts"), "utf-8");
const articleModule = ts.transpileModule(articleSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { articles } = await import(`data:text/javascript;base64,${Buffer.from(articleModule).toString("base64")}`);
const absoluteImage = (article) => new URL(article.coverImage || "/opengraph.jpg", "https://muxuantw.com").href;

function buildJsonLd(article) {
  const url = `https://muxuantw.com/blog/${article.slug}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: "https://muxuantw.com" },
          { "@type": "ListItem", position: 2, name: "護髮部落格", item: "https://muxuantw.com/blog" },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": url,
        headline: article.title,
        name: article.title,
        description: article.metaDescription,
        datePublished: article.date,
        dateModified: article.lastUpdated ?? article.date,
        articleSection: article.category,
        inLanguage: "zh-TW",
        url,
        isPartOf: { "@id": "https://muxuantw.com/blog" },
        author: article.authorType === "Organization" ? {
          "@type": "Organization", "@id": "https://muxuantw.com/#organization",
          name: "沐璿草本護髮中心", url: "https://muxuantw.com/about",
        } : {
          "@type": "Person", name: "葉玉女", jobTitle: "創辦人",
          url: "https://muxuantw.com/about",
          worksFor: { "@id": "https://muxuantw.com/#organization" },
        },
        publisher: { "@id": "https://muxuantw.com/#organization" },
        image: {
          "@type": "ImageObject",
          url: absoluteImage(article),
          width: 1200,
          height: 630,
          description: article.coverAlt,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      },
    ],
  });
}

function escape(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

let count = 0;

for (const article of articles) {
  const url = `https://muxuantw.com/blog/${article.slug}`;
  const pageTitle = article.seoTitle ?? `${article.title} | 沐璿草本護髮部落格`;

  let html = baseHtml;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(pageTitle)}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escape(article.metaDescription)}"`
  );

  // <link rel="canonical">
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`
  );

  html = html.replace(/(<link rel="alternate" hreflang="[^"]+" href=")[^"]*(")/g, `$1${url}$2`);

  // OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escape(pageTitle)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escape(article.metaDescription)}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="article"`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${escape(absoluteImage(article))}"`
  );
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    `<meta property="og:image:alt" content="${escape(article.coverAlt)}"`
  );

  // Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escape(pageTitle)}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escape(article.metaDescription)}"`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${escape(absoluteImage(article))}"`
  );

  // Inject article-specific JSON-LD just before </head>
  // (the base JSON-LD with Organization/WebSite stays; this adds BlogPosting)
  const articleJsonLd = `  <script id="article-jsonld" type="application/ld+json">\n  ${buildJsonLd(article)}\n  </script>\n</head>`;
  html = html.replace("</head>", articleJsonLd);

  // Write to dist/blog/[slug]/index.html
  const outDir = path.join(distDir, "blog", article.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

  console.log(`✅  dist/blog/${article.slug}/index.html`);
  count++;
}

console.log(`\n🎉  Prerendered ${count} blog routes.`);

// ─── Static shell pages for all main SPA routes ──────────────────────────────
// Vite's `emptyOutDir: true` wipes dist/ on every build, so these files must
// be re-created here (after the Vite build) rather than committed to git.
// Having a real file at dist/about/index.html means Vercel serves it directly
// instead of relying on catch-all rewrites, which avoids any routing edge cases.

const shellRoutes = [
  { route: "about",     title: "關於沐璿 | 沐璿草本護髮中心",     desc: "了解沐璿草本護髮中心的品牌故事、創辦理念，以及16年草本護髮專業經驗。" },
  { route: "cases",     title: "成功案例 | 沐璿草本護髮中心",     desc: "查看沐璿草本護髮真實調理案例，包括白髮、落髮、頭皮屑與油脂失衡等問題的改善成果。" },
  { route: "services",  title: "服務介紹 | 沐璿草本護髮中心",     desc: "沐璿草本護髮中心提供草本頭皮護理、草本染髮等服務，採用天然當歸、人蔘、何首烏配方，安全溫和。" },
  { route: "contact",   title: "聯絡我們 | 沐璿草本護髮中心",     desc: "聯絡沐璿草本護髮中心，預約台北林森店或嘉義店草本頭皮護理服務。" },
  { route: "locations", title: "門市資訊 | 沐璿草本護髮中心",     desc: "查看沐璿草本護髮中心台北林森店、嘉義店及新加坡門市地址、電話與營業時間。" },
  { route: "faq",       title: "草本護髮常見問題 | 沐璿草本護髮中心", desc: "關於沐璿草本護髮的常見問題：療程是否有效、能否改善落髮、草本與化學染髮的差異，以及費用與護理頻率說明。" },
  { route: "blog",      title: "護髮部落格 | 沐璿草本護髮中心",   desc: "沐璿草本護髮部落格：草本護髮知識、頭皮保養教學、染髮安全指南，由專業護理師撰寫。" },
];

let shellCount = 0;
for (const { route, title, desc } of shellRoutes) {
  const url = `https://muxuantw.com/${route}`;
  let html = baseHtml;

  // Patch <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Patch <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${desc}"`
  );

  // Patch <link rel="canonical"> — THIS is the critical fix
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`
  );

  // Patch OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);

  // Patch Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`);

  const outDir = path.join(distDir, route);
  if (route === "locations") {
    // Serve the real directory without JavaScript; React replaces it on startup.
    html = html.replace(/<div id="seo-content"[^>]*>[\s\S]*?<\/div>/, "");
    const rootStart = html.indexOf('<div id="root">');
    if (rootStart < 0) throw new Error("Locations prerender: root element missing");
    const tags = /<div\b[^>]*>|<\/div>/g;
    tags.lastIndex = rootStart;
    let depth = 0;
    let rootEnd = -1;
    for (let match; (match = tags.exec(html));) {
      depth += match[0].startsWith("</") ? -1 : 1;
      if (depth === 0) { rootEnd = tags.lastIndex; break; }
    }
    if (rootEnd < 0) throw new Error("Locations prerender: root element unclosed");
    html = html.slice(0, rootStart) + `<div id="root">${renderLocations()}</div>` + html.slice(rootEnd);
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`✅  dist/${route}/index.html  (canonical: ${url})`);
  shellCount++;
}

console.log(`\n🎉  Wrote ${shellCount} static shell pages for SPA routes.`);
