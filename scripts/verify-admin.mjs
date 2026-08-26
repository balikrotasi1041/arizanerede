import { readFileSync } from "node:fs";
import { adminMetrics } from "../src/admin-dashboard.js";

const index=readFileSync("src/index.js","utf8");
const edge=readFileSync("src/edge-entry.js","utf8");
const wrangler=readFileSync("wrangler.jsonc","utf8");
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};

for(const route of ["/admin/dashboard/","/admin/seo-radar/","/admin/data-health/"]) expect(index.includes(route.replace(/\/$/,"")),`Admin rota eksik: ${route}`);
expect(index.includes('Disallow: /admin/'),"robots.txt admin alanını engellemeli");
expect(index.includes('x-robots-tag'),"Admin yanıtlarında X-Robots-Tag bulunmalı");
expect(index.includes('private, no-store'),"Admin yanıtları cache dışı olmalı");
expect(index.includes('ADMIN_ACCESS_READY'),"Admin Access fail-closed anahtarı eksik");
expect(index.includes('Cf-Access-Jwt-Assertion'),"Cloudflare Access oturum kontrolü eksik");
expect(wrangler.includes('"ADMIN_ACCESS_READY": "false"')||wrangler.includes('"ADMIN_ACCESS_READY": "true"'),"Admin Access yapılandırma değişkeni eksik");
expect(edge.includes('url.pathname.startsWith("/admin/")'),"Admin trafiği analitik enjeksiyonundan hariç tutulmalı");

const metrics=adminMetrics();
expect(Number.isFinite(metrics.quality.categoryCoverage),"Kategori kapsam metriği üretilemiyor");
expect(Number.isFinite(metrics.quality.brandCategoryCoverage),"Marka-kategori kapsam metriği üretilemiyor");
expect(Number.isFinite(metrics.quality.modelPublishable),"Model yayın metriği üretilemiyor");
expect(Number.isFinite(metrics.quality.symptomCoverage),"Model-belirti kapsam metriği üretilemiyor");
expect(metrics.counts.symptomClusters>metrics.counts.models,"Belirti kümeleri gerçek model verisinden hesaplanmalı");
expect(metrics.counts.supportOnlyPairs===metrics.gaps.supportOnlyPairs.length,"Support-only sayacı gerçek açık listesiyle eşleşmeli");
expect(metrics.categoryRows.length===metrics.counts.deviceTypes,"Her kategori için kapsam satırı üretilmeli");
expect(metrics.categoryRows.every(x=>Number.isFinite(x.models)&&Number.isFinite(x.supportOnlyPairs)),"Kategori metrikleri sayısal olmalı");
expect(metrics.gaps.placeholderHits.length===0,`Yayında ${metrics.gaps.placeholderHits.length} placeholder kaydı var`);

if(errors.length){for(const e of errors)console.error(`ADMIN HATASI: ${e}`);process.exit(1)}
console.log(`Admin dashboard doğrulandı: ${metrics.counts.deviceTypes} kategori, ${metrics.counts.indexedBrandPairs}/${metrics.counts.brandPairs} modeli olan marka-kategori çifti, ${metrics.counts.indexableModels} model, ${metrics.counts.symptomClusters} belirti, ${metrics.counts.supportOnlyPairs} support-only açık, placeholder=0.`);
