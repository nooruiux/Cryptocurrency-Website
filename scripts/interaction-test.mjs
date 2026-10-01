// Real-interaction smoke test on touch viewports.
// Usage: node scripts/interaction-test.mjs [url=http://localhost:3000] [widths=375,768]
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3000";
const widths = (process.argv[3] ?? "375,768").split(",").map(Number);
const launchOptions = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};
const browser = await chromium.launch(launchOptions);
let failed = 0;

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 800 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const results = [];
  const check = async (name, fn) => {
    try {
      await fn();
      results.push(`  PASS ${name}`);
    } catch (error) {
      failed++;
      results.push(`  FAIL ${name}: ${error.message.split("\n")[0]}`);
    }
  };
  const expect = (cond, msg) => {
    if (!cond) throw new Error(msg);
  };

  await check("drawer opens, traps focus, closes on Esc and link tap", async () => {
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.tap();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await dialog.waitFor({ state: "visible" });
    await page.waitForTimeout(350);
    expect((await trigger.getAttribute("aria-expanded")) === "true", "aria-expanded not true");
    const links = await dialog.getByRole("link").allInnerTexts();
    expect(links.length === 9, `expected 9 drawer links (logo + 6 + Login + CTA), got ${links.length}`);
    expect(await page.evaluate(() => document.body.style.overflow === "hidden"), "body scroll not locked");
    expect(await page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null), "focus not in drawer");
    for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null), "focus escaped drawer");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(350);
    expect((await trigger.getAttribute("aria-expanded")) === "false", "Esc did not close");
    expect(await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Open menu"), "focus not restored");
    await trigger.tap();
    await page.waitForTimeout(350);
    await dialog.getByRole("link", { name: "Plans" }).tap();
    await page.waitForTimeout(900);
    expect((await trigger.getAttribute("aria-expanded")) === "false", "link tap did not close");
    expect(page.url().endsWith("#mining-plan"), `navigated to ${page.url()}`);
  });

  const price = page.locator("#mining-plan [role=tabpanel] p").first();
  const profit = page.locator("#mining-plan dd.text-mint").first();
  const roi = page.locator("#calculator dd");
  const hash = page.getByRole("spinbutton");

  await check("term tabs change the plan price", async () => {
    expect((await price.innerText()).includes("585.75"), `default price ${await price.innerText()}`);
    await page.getByRole("tab", { name: "24-Month" }).tap();
    const p24 = await price.innerText();
    expect(!p24.includes("585.75"), "price unchanged after 24-Month tab");
    expect((await page.getByRole("tab", { name: "24-Month" }).getAttribute("aria-selected")) === "true", "tab not selected");
    await page.getByRole("tab", { name: "18-Month" }).tap();
  });

  await check("currency toggle switches to EUR", async () => {
    await page.getByRole("radio", { name: "EUR" }).tap();
    expect((await profit.innerText()).includes("EUR"), `profit ${await profit.innerText()}`);
    await page.getByRole("radio", { name: "USD" }).tap();
  });

  await check("hashpower chips set value + aria-pressed", async () => {
    await page.getByRole("button", { name: "50 TH/s" }).tap();
    expect((await hash.inputValue()) === "50", `hash ${await hash.inputValue()}`);
    expect((await page.getByRole("button", { name: "50 TH/s" }).getAttribute("aria-pressed")) === "true", "chip not pressed");
  });

  await check("stepper increments / decrements", async () => {
    await page.getByRole("button", { name: "Increase hashpower" }).tap();
    expect((await hash.inputValue()) === "51", `after + ${await hash.inputValue()}`);
    await page.getByRole("button", { name: "Decrease hashpower" }).tap();
    await page.getByRole("button", { name: "Decrease hashpower" }).tap();
    expect((await hash.inputValue()) === "49", `after −− ${await hash.inputValue()}`);
    await hash.fill("12");
    await hash.blur();
    expect((await profit.innerText()).includes("368.10"), `baseline profit ${await profit.innerText()}`);
  });

  await check("profit calculator scenarios change ROI", async () => {
    const before = await roi.innerText();
    await page.getByRole("radio", { name: "$100k" }).tap();
    const after = await roi.innerText();
    expect(before !== after, `ROI unchanged (${before})`);
    await page.getByRole("radio", { name: "+20%" }).tap();
    expect((await roi.innerText()) !== after, "difficulty did not change ROI");
  });

  await check("slider marquee runs and pauses on touch", async () => {
    const track = page.locator('[aria-label="Live market prices"] .animate-marquee');
    await track.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const state = () => track.evaluate((el) => getComputedStyle(el).animationPlayState);
    const x = () => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    expect((await state()) === "running", `initial ${await state()}`);
    const a = await x();
    await page.waitForTimeout(500);
    expect((await x()) !== a, "marquee not moving");
    const cardW = await page.locator('[aria-label="Live market prices"] article').first().evaluate((el) => el.offsetWidth);
    expect(cardW === (width < 768 ? 280 : 320), `card width ${cardW}`);
    await page.locator('[aria-label="Live market prices"] > div').tap({ force: true });
    expect((await state()) === "paused", `after tap ${await state()}`);
    const b = await x();
    await page.waitForTimeout(500);
    expect((await x()) === b, "moved while paused");
  });

  console.log(`${width}px`);
  console.log(results.join("\n"));
  await context.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
