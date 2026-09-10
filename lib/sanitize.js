const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "em", "b", "i", "u", "ul", "ol", "li",
  "h2", "h3", "h4", "blockquote", "a", "img",
]);

const ALLOWED_ATTRS = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "width", "height"]),
};

function stripDangerous(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function sanitizeAttr(tag, name, value) {
  if (!ALLOWED_ATTRS[tag]?.has(name)) return null;
  if (name === "href" || name === "src") {
    const v = String(value).trim();
    if (/^(https?:\/\/|\/|#|mailto:)/i.test(v)) return v;
    return null;
  }
  if (name === "target" && value === "_blank") return "_blank";
  if (name === "rel" && value) return "noopener noreferrer";
  return String(value).replace(/[<>"']/g, "");
}

export function sanitizeHtml(html) {
  const cleaned = stripDangerous(html);
  return cleaned.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, tagName, attrs) => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (match.startsWith("</")) return `</${tag}>`;

    const attrParts = [];
    const attrRegex = /([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let m;
    while ((m = attrRegex.exec(attrs)) !== null) {
      const name = m[1].toLowerCase();
      const value = m[3] ?? m[4] ?? m[5] ?? "";
      const safe = sanitizeAttr(tag, name, value);
      if (safe !== null) attrParts.push(`${name}="${safe}"`);
    }
    if (tag === "a" && attrParts.some((a) => a.startsWith('target="_blank"'))) {
      if (!attrParts.some((a) => a.startsWith("rel="))) {
        attrParts.push('rel="noopener noreferrer"');
      }
    }
    const selfClosing = tag === "br" || tag === "img";
    if (selfClosing) return `<${tag}${attrParts.length ? " " + attrParts.join(" ") : ""} />`;
    return `<${tag}${attrParts.length ? " " + attrParts.join(" ") : ""}>`;
  });
}

export function stripHtml(html) {
  return String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
