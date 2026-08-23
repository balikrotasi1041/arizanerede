import { readFileSync } from "node:fs";

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

const edge = readFileSync("src/edge-entry.js", "utf8");
const wrangler = readFileSync("wrangler.jsonc", "utf8");
const workflow = readFileSync(".github/workflows/indexnow.yml", "utf8");
const ui = readFileSync("src/ui-base.js", "utf8");

expect(edge.includes("4263b010f9dddf31bf1b4023a3d6a82d"), "IndexNow anahtarı Worker girişinde bulunmalı.");
expect(edge.includes("GA_MEASUREMENT_ID"), "GA4 ortam değişkeni kancası bulunmalı.");
expect(edge.includes("CLARITY_PROJECT_ID"), "Clarity ortam değişkeni kancası bulunmalı.");
expect(wrangler.includes('"main": "src/edge-entry.js"'), "Wrangler edge-entry üzerinden çalışmalı.");
expect(workflow.includes("https://api.indexnow.org/indexnow"), "IndexNow otomatik bildirim endpoint'i workflow içinde bulunmalı.");
expect(workflow.includes("/sitemap.xml"), "IndexNow workflow sitemap URL'lerini kullanmalı.");
expect(ui.includes('name="yandex-verification"') && ui.includes("95689cac05702e84"), "Yandex doğrulama etiketi korunmalı.");

if (errors.length) {
  for (const error of errors) console.error(`KEŞİF/ÖLÇÜM HATASI: ${error}`);
  process.exit(1);
}

console.log("Arıza Nerede keşif altyapısı doğrulandı: Yandex, IndexNow ve opsiyonel GA4/Clarity kancaları mevcut.");
