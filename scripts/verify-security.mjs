import { readFileSync } from "node:fs";

const source = readFileSync("src/index.js", "utf8");
const wrangler = readFileSync("wrangler.jsonc", "utf8");
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

for (const ip of [
  "130.12.180.39", "43.228.157.197", "158.69.55.82", "158.69.55.148",
  "34.24.16.181", "45.148.10.247", "45.148.10.244", "93.123.109.166",
  "93.123.109.165", "195.178.110.103", "195.178.110.132", "195.178.110.101",
  "195.178.110.155",
]) {
  expect(source.includes(`"${ip}"`), `Doğrulanmış kötüye kullanım IP'si blocklist içinde olmalı: ${ip}`);
}

expect(source.includes("BLOCKED_ASNS") && source.includes("48090"), "Gözlenen yüksek riskli AS48090 ASN engeli korunmalı.");
expect(source.includes("clientAsn") && source.includes("request?.cf?.asn"), "Cloudflare ASN sinyali Worker seviyesinde uygulanmalı.");

for (const signature of [
  "CF-Connecting-IP",
  "decodeURIComponent",
  "x-robots-tag",
  "wp|wordpress",
  "wp-login\\.php",
  "xmlrpc\\.php",
  "auth\\/callback",
  "WEB-INF",
  "next\\.config",
  "phpmyadmin",
  "rails\\/info\\/properties",
  "jenkinsfile",
  "backup",
  "\\.env",
]) {
  expect(source.includes(signature), `Güvenlik imzası/koruması eksik: ${signature}`);
}

expect(source.includes('[^/]+\\.php'), "PHP probe istekleri genel olarak erken reddedilmeli.");
expect(source.includes('request.method==="TRACE"'), "TRACE istekleri açıkça reddedilmeli.");
expect(source.includes('!["GET","HEAD"].includes(request.method)'), "GET/HEAD dışındaki yöntemler reddedilmeli.");
expect(source.includes("private, no-store"), "Güvenlik cevapları cache dışı kalmalı.");
expect(source.includes("noindex, nofollow, noarchive, nosnippet"), "Probe ve blok yanıtları arama indeksinden dışlanmalı.");
expect(wrangler.includes('"workers_dev": false'), "Production Worker workers.dev alt alanında yayınlanmamalı.");
expect(wrangler.includes('"ADMIN_ACCESS_READY": "false"'), "Access JWT doğrulaması tamamlanana kadar admin fail-closed kalmalı.");

if (errors.length) {
  for (const error of errors) console.error(`GÜVENLİK HATASI: ${error}`);
  process.exit(1);
}

console.log("Arıza Nerede güvenlik duruşu doğrulandı: IP/ASN engelleri, scanner probe korumaları, workers.dev kapatması, yöntem kısıtları ve admin fail-closed mevcut.");
