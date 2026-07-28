import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

await page.goto("http://localhost:3000/producto/answer-the-call-wolf", { waitUntil: "networkidle", timeout: 30000 });
let err = await page.locator("text=/Unhandled Runtime Error|Failed to compile/i").count();
console.log("wolf errors:", err);
await page.screenshot({ path: "/private/tmp/claude-501/-Users-paurodriguez-tradingview-mcp-jackson/d2be0f39-3fb1-4069-ac38-314fc45f1390/scratchpad/model_caption_black.png", fullPage: false });

await page.locator('button[aria-label="Azul lavado"]').click();
await page.waitForTimeout(300);
await page.screenshot({ path: "/private/tmp/claude-501/-Users-paurodriguez-tradingview-mcp-jackson/d2be0f39-3fb1-4069-ac38-314fc45f1390/scratchpad/model_caption_denim.png", fullPage: false });

await page.goto("http://localhost:3000/producto/swamp-crocodile", { waitUntil: "networkidle", timeout: 30000 });
await page.screenshot({ path: "/private/tmp/claude-501/-Users-paurodriguez-tradingview-mcp-jackson/d2be0f39-3fb1-4069-ac38-314fc45f1390/scratchpad/model_croc_cream.png", fullPage: false });

await browser.close();
