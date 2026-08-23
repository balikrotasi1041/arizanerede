import { readFileSync } from "node:fs";

const source = readFileSync("src/index.js", "utf8");
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

for (const ip of ["130.12.180.39", "43.228.157.197", "158.69.55.82", "158.69.55.148"]) {
  expect(source.includes(`"${ip}"`), `Doğrulanmış kötüye kullanım IP'si blocklist içinde olmalı: ${ip}`);
}

for (const signature of [
  "CF-Connecting-IP",
  "decodeURIComponent",
  "x-robots-tag",
  "wp-login\\.php",
  "xmlrpc\\.php",
  "phpmyadmin",
  "rails\\/info\\/properties",
  "jenkinsfile",
  "backup",
  "\.env",
]) {
  expect(source.includes(signature), `Güvenlik imzası/koruması eksik: ${signature}`);
}

expect(source.includes('request.method==="TRACE"'), "TRACE istekleri açıkça reddedilmeli.");
expect(source.includes('!["GET","HEAD"].includes(request.method)'), "GET/HEAD dışındaki yöntemler reddedilmeli.");
expect(source.includes("private, no-store"), "Güvenlik cevapları cache dışı kalmalı.");
expect(source.includes("noindex, nofollow, noarchive, nosnippet"), "Probe ve blok yanıtları arama indeksinden dışlanmalı.");

if (errors.length) {
  for (const error of errors) console.error(`GÜVENLİK HATASI: ${error}`);
  process.exit(1);
}

console.log("Arıza Nerede güvenlik duruşu doğrulandı: blocklist, hassas probe korumaları, yöntem kısıtları ve noindex güvenlik yanıtları mevcut.");
