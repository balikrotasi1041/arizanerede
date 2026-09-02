import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import app from "../src/index.js";
import {SITE_ORIGIN} from "../src/catalog.js";

const contract=JSON.parse(readFileSync("seo-url-contract.json","utf8"));
const response=await app.fetch(new Request(`${SITE_ORIGIN}/sitemap.xml`),{});
if(response.status!==200){console.error(`URL SÖZLEŞMESİ HATASI: sitemap ${response.status}`);process.exit(1)}
const xml=await response.text();
const paths=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1].replace(SITE_ORIGIN,"")).sort();
const payload=paths.join("\n");
const sha256=createHash("sha256").update(payload).digest("hex");

if(contract.count!==paths.length||contract.sha256!==sha256){
  console.error(`URL SÖZLEŞMESİ HATASI: yayınlanan URL seti değişti. actualCount=${paths.length} actualSha256=${sha256} expectedCount=${contract.count} expectedSha256=${contract.sha256}`);
  console.error("Yeni URL ekleme/kaldırma bilinçliyse seo-url-contract.json dosyasını aynı değişiklikte güncelle. URL kaldırılıyorsa önce redirect veya gone kararı tanımlanmalı.");
  process.exit(1);
}
console.log(`URL sözleşmesi doğrulandı: ${paths.length} indeks hedefi, sha256=${sha256}`);
