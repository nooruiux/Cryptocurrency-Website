// Responsive audit: horizontal overflow, text overflow, edge-touching text, tap targets.
// Usage: node scripts/responsive-audit.mjs [url] [widths,comma,separated]
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3000";
const widths = (process.argv[3] ?? "360,375,414,768,834,1024,1280,1440,1920,2560").split(",").map(Number);
const launch = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};
const browser = await chromium.launch(launch);
let failed = false;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); }
    scrollTo(0, 0);
    await document.fonts.ready;
  });
  await page.waitForTimeout(300);
  const r = await page.evaluate((w) => {
    const out = { scrollWidth: document.documentElement.scrollWidth, innerWidth: innerWidth, textOverflow: [], edge: [], tap: [] };
    const visible = (el) => {
      const s = getComputedStyle(el);
      if (s.visibility === "hidden" || s.display === "none" || el.closest("[aria-hidden=true],[inert],.sr-only,.sr-only-focusable")) return false;
      const b = el.getBoundingClientRect();
      return b.width > 0 && b.height > 0;
    };
    const label = (el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30)}"`;
    const inMarquee = (el) => el.closest("[data-section=slider]");
    // Text elements: leaf-ish nodes with direct text
    for (const el of document.querySelectorAll("body *")) {
      if (!visible(el) || inMarquee(el)) continue;
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!hasText) continue;
      const b = el.getBoundingClientRect();
      if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === "visible" && el.clientWidth > 0 && getComputedStyle(el).display !== "inline")
        out.textOverflow.push(label(el) + ` sw=${el.scrollWidth} cw=${el.clientWidth}`);
      // Text touching/beyond the viewport edge (allow 8px min breathing room); skip horizontally scrollable regions
      if (!el.closest("[data-scroll-x]") && (b.left < 8 || b.right > w - 8)) out.edge.push(label(el) + ` l=${Math.round(b.left)} r=${Math.round(b.right)}`);
    }
    if (w < 1024) {
      for (const el of document.querySelectorAll("a[href],button,input,[role=tab],[role=radio],summary")) {
        if (!visible(el) || inMarquee(el)) continue;
        const b = el.getBoundingClientRect();
        if (b.width < 44 || b.height < 44) out.tap.push(label(el) + ` ${Math.round(b.width)}x${Math.round(b.height)}`);
      }
    }
    return out;
  }, width);
  const overflow = r.scrollWidth !== r.innerWidth;
  const ok = !overflow && !r.textOverflow.length && !r.edge.length && !r.tap.length;
  if (!ok) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"} ${width}px  scrollWidth=${r.scrollWidth} textOverflow=${r.textOverflow.length} edge=${r.edge.length} tap<44=${r.tap.length}`);
  for (const k of ["textOverflow", "edge", "tap"]) for (const x of r[k].slice(0, Number(process.env.MAX ?? 12))) console.log(`   ${k}: ${x}`);
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
