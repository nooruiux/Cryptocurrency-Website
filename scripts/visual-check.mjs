// Visual QA: screenshots localhost at a given width, full page + per-section crops.
// Usage: node scripts/visual-check.mjs [width=1440] [outDir=.visual] [url=http://localhost:3000]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const width = Number(process.argv[2] ?? 1440);
const outDir = process.argv[3] ?? ".visual";
const url = process.argv[4] ?? "http://localhost:3000";
mkdirSync(outDir, { recursive: true });

const launchOptions = {};
if (process.env.PW_CHROMIUM) launchOptions.executablePath = process.env.PW_CHROMIUM;
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  // Trigger whileInView reveals, then return to top.
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 30));
  }
  window.scrollTo(0, 0);
  await document.fonts.ready;
});
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/full-${width}.png`, fullPage: true });
const sections = await page.$$eval("[data-section]", (els) =>
  els.map((el) => {
    const r = el.getBoundingClientRect();
    return { name: el.getAttribute("data-section"), y: r.top + window.scrollY, h: r.height };
  }),
);
console.log(JSON.stringify({ width, height: await page.evaluate(() => document.body.scrollHeight), sections }));
await browser.close();
