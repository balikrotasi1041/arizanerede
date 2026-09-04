import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import app from "../src/index.js";
import {SITE_ORIGIN} from "../src/catalog.js";

const contract=JSON.parse(readFileSync("seo-url-contract.json","utf8"));
const rootResponse=await app.fetch(new Request(`${SITE_ORIGIN}/sitemap.xml`),{});
if(rootResponse.status!==200){console.error(`URL SÖZLEŞMESİ HATASI: sitemap index ${rootResponse.status}`);process.exit(1)}
const rootXml=await rootResponse.text();
const childUrls=[...rootXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
if(!rootXml.includes("<sitemapindex")||!childUrls.length){console.error("URL SÖZLEŞMESİ HATASI: sitemap.xml sitemap index değil");process.exit(1)}
const paths=[];
for(const child of childUrls){
  const response=await app.fetch(new Request(child),{});
  if(response.status!==200){console.error(`URL SÖZLEŞMESİ HATASI: alt sitemap ${child} -> ${response.status}`);process.exit(1)}
  const xml=await response.text();
  paths.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1].replace(SITE_ORIGIN,"")));
}
paths.sort();
const payload=paths.join("\n");
const sha256=createHash("sha256").update(payload).digest("hex");

if(contract.count!==paths.length||contract.sha256!==sha256){
  console.error(`URL SÖZLEŞMESİ HATASI: yayınlanan URL seti değişti. actualCount=${paths.length} actualSha256=${sha256} expectedCount=${contract.count} expectedSha256=${contract.sha256}`);
  console.error("Yeni URL ekleme/kaldırma bilinçliyse seo-url-contract.json dosyasını aynı değişiklikte güncelle. URL kaldırılıyorsa önce redirect veya gone kararı tanımlanmalı.");
  process.exit(1);
}
console.log(`URL sözleşmesi doğrulandı: ${paths.length} indeks hedefi, sha256=${sha256}`);
