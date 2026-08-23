import { deviceTypes,brands,families,models,issues,isCatalogComplete,LAST_VERIFIED } from "./catalog.js";

const esc=(v="")=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pct=(n,d)=>d?Math.round((n/d)*100):100;
const PLACEHOLDER=/(hazırlan(?:ıyor|acak)|güncellenecek|yakında|\btodo\b|\btbd\b|placeholder)/i;
const allStrings=(obj,out=[])=>{if(typeof obj==="string")out.push(obj);else if(Array.isArray(obj))for(const x of obj)allStrings(x,out);else if(obj&&typeof obj==="object")for(const x of Object.values(obj))allStrings(x,out);return out};

export function adminMetrics(){
  const brandSourceGaps=brands.filter(b=>![b.officialTurkey,b.supportUrl,b.serviceUrl].every(x=>typeof x==="string"&&x.startsWith("https://")));
  const modelSourceGaps=models.filter(m=>![m.supportUrl,m.manualUrl].every(x=>typeof x==="string"&&x.startsWith("https://")));
  const issueIntegrityGaps=issues.filter(i=>!i.officialSource?.url?.startsWith("https://")||!i.safety||!i.stopWhen||!(i.queryIntents||[]).length);
  const modelsWithoutIssues=models.filter(m=>!issues.some(i=>i.deviceType===m.deviceType&&i.brand===m.brand&&i.family===m.family&&i.model===m.slug));
  const placeholderHits=[];
  for(const [kind,items] of [["marka",brands],["seri",families],["model",models],["arıza",issues]]) for(const item of items){const hits=allStrings(item).filter(s=>PLACEHOLDER.test(s));if(hits.length)placeholderHits.push({kind,name:item.name||item.title||item.slug,hits:[...new Set(hits)]});}
  const pairs=[];
  for(const b of brands)for(const deviceType of b.deviceTypes||[]){
    const fs=families.filter(f=>f.brand===b.slug&&f.deviceType===deviceType);
    const ms=models.filter(m=>m.brand===b.slug&&m.deviceType===deviceType);
    const is=issues.filter(i=>i.brand===b.slug&&i.deviceType===deviceType);
    const complete=isCatalogComplete(deviceType,b.slug);
    const score=(complete?0:50)+(ms.length?0:30)+(is.length?0:20)+(b.catalogStatus==="support-only"?10:0);
    pairs.push({brand:b.name,brandSlug:b.slug,deviceType,complete,families:fs.length,models:ms.length,issues:is.length,score});
  }
  const completePairs=pairs.filter(x=>x.complete).length;
  const modelsWithIssues=models.length-modelsWithoutIssues.length;
  return {
    counts:{deviceTypes:deviceTypes.length,brands:brands.length,families:families.length,models:models.length,issues:issues.length,highRisk:issues.filter(i=>i.risk==="high").length},
    gaps:{brandSourceGaps,modelSourceGaps,issueIntegrityGaps,modelsWithoutIssues,placeholderHits},
    pairs,
    quality:{catalog:pct(completePairs,pairs.length),modelIssue:pct(modelsWithIssues,models.length),brandSources:pct(brands.length-brandSourceGaps.length,brands.length),issueIntegrity:pct(issues.length-issueIntegrityGaps.length,issues.length)},
    opportunities:[...pairs].sort((a,b)=>b.score-a.score||a.brand.localeCompare(b.brand,"tr")).slice(0,20),
    lastVerified:LAST_VERIFIED
  };
}

function css(){return `<style>:root{--bg:#071315;--panel:#0d1d20;--panel2:#10262a;--line:#234147;--ink:#ecf7f5;--muted:#91aaa8;--teal:#41c7b7;--amber:#f0bd62;--red:#f17878;--green:#63d497}*{box-sizing:border-box}body{margin:0;background:linear-gradient(150deg,#071315,#0a171a 55%,#081113);color:var(--ink);font:14px/1.5 Inter,system-ui,sans-serif}a{color:inherit}.shell{max-width:1240px;margin:auto;padding:24px}.top{display:flex;gap:18px;align-items:center;justify-content:space-between;margin-bottom:24px}.top h1{font-size:28px;margin:0}.top p{margin:3px 0;color:var(--muted)}.nav{display:flex;gap:8px;flex-wrap:wrap}.nav a{padding:9px 12px;border:1px solid var(--line);border-radius:10px;text-decoration:none;background:#0b191c}.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.metric,.panel{border:1px solid var(--line);border-radius:16px;background:linear-gradient(145deg,var(--panel),var(--panel2));padding:16px}.metric b{font-size:27px;display:block}.metric small,.muted{color:var(--muted)}.cols{display:grid;grid-template-columns:1.2fr .8fr;gap:14px;margin-top:14px}.panel h2{margin:0 0 14px;font-size:18px}.barrow{display:grid;grid-template-columns:150px 1fr 46px;align-items:center;gap:10px;margin:12px 0}.bar{height:9px;background:#1b3439;border-radius:20px;overflow:hidden}.bar i{display:block;height:100%;background:var(--teal);border-radius:inherit}.ok{color:var(--green)}.warn{color:var(--amber)}.bad{color:var(--red)}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:9px 8px;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.05em}.pill{display:inline-block;padding:4px 8px;border-radius:999px;background:#16363a;color:var(--teal);font-size:12px}.pill.warn{background:#3a2f18;color:#f4ca77}.pill.bad{background:#3b2022;color:#ff9898}.links{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.links a{padding:11px;border:1px solid var(--line);border-radius:10px;text-decoration:none;background:#0a1719}.alert{padding:14px;border-radius:12px;background:#3b2022;border:1px solid #6e3035}.good{padding:14px;border-radius:12px;background:#123127;border:1px solid #22583f}.foot{margin-top:18px;color:var(--muted);font-size:12px}@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}.cols{grid-template-columns:1fr}.barrow{grid-template-columns:120px 1fr 42px}}@media(max-width:520px){.grid{grid-template-columns:1fr 1fr}.shell{padding:14px}.top{align-items:flex-start;flex-direction:column}.links{grid-template-columns:1fr}}</style>`}
function frame(title,body,email=""){return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>${esc(title)} | Arıza Nerede?</title>${css()}</head><body><div class="shell"><header class="top"><div><h1>Arıza Nerede? · Yönetim</h1><p>${email?`Oturum: ${esc(email)}`:"Korunan yönetim alanı"}</p></div><nav class="nav"><a href="/admin/dashboard/">Dashboard</a><a href="/admin/seo-radar/">SEO Fırsat Radarı</a><a href="/admin/data-health/">Veri Sağlığı</a><a href="/">Siteyi aç ↗</a></nav></header>${body}<div class="foot">Yönetim sayfaları sitemap dışında, noindex ve no-store olarak servis edilir.</div></div></body></html>`}

export function renderAdminLocked(){return frame("Yönetim erişimi kapalı",`<section class="panel"><h2>Cloudflare Access henüz etkin değil</h2><div class="alert">Dashboard verileri güvenlik nedeniyle gösterilmiyor. <b>arizanerede.com/admin/*</b> yolu Cloudflare Access ile korunup uygulama etkinleştirildiğinde panel açılacak.</div></section>`)}

export function renderAdminDashboard(env={},email=""){
  const m=adminMetrics(),c=m.counts,g=m.gaps;
  const blank=g.placeholderHits.length;
  const integ=[
    ["Google Search Console",env.SEARCH_CONSOLE_STATUS==="verified","Doğrulandı"],
    ["Bing Webmaster",env.BING_WEBMASTER_STATUS==="verified","Doğrulandı"],
    ["Yandex Webmaster",env.YANDEX_WEBMASTER_STATUS==="verified","Doğrulandı"],
    ["IndexNow",true,"Otomatik bildirim"],
    ["GA4",Boolean(env.GA_MEASUREMENT_ID),env.GA_MEASUREMENT_ID||"Bağlı değil"],
    ["Microsoft Clarity",Boolean(env.CLARITY_PROJECT_ID),env.CLARITY_PROJECT_ID||"Bağlı değil"]
  ];
  const body=`<div class="grid">${[["Cihaz türü",c.deviceTypes],["Marka",c.brands],["Seri / aile",c.families],["Tam model",c.models],["Arıza kaydı",c.issues],["Boş/placeholder",blank]].map(([l,v])=>`<div class="metric"><small>${l}</small><b class="${l.includes("Boş")?(v?"bad":"ok"):""}">${v}</b></div>`).join("")}</div>
  <div class="cols"><section class="panel"><h2>Yayın bütünlüğü</h2>${[["Katalog kapsamı",m.quality.catalog],["Model → arıza",m.quality.modelIssue],["Marka kaynakları",m.quality.brandSources],["Arıza bütünlüğü",m.quality.issueIntegrity]].map(([l,v])=>`<div class="barrow"><span>${l}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}%</b></div>`).join("")}${blank===0?`<div class="good"><b>0 boş kayıt</b> · placeholder metin tespit edilmedi.</div>`:`<div class="alert"><b>${blank} placeholder alarmı</b> · Veri Sağlığı sayfasını aç.</div>`}</section>
  <section class="panel"><h2>Entegrasyonlar</h2><table>${integ.map(([n,ok,d])=>`<tr><td>${esc(n)}</td><td><span class="pill ${ok?"":"bad"}">${ok?"Aktif":"Eksik"}</span></td><td class="muted">${esc(d)}</td></tr>`).join("")}</table></section></div>
  <div class="cols"><section class="panel"><h2>Öncelikli içerik boşlukları</h2><table><thead><tr><th>Marka / cihaz</th><th>Model</th><th>Arıza</th><th>Durum</th></tr></thead><tbody>${m.opportunities.slice(0,10).map(x=>`<tr><td>${esc(x.brand)} · ${esc(deviceTypes.find(d=>d.slug===x.deviceType)?.name||x.deviceType)}</td><td>${x.models}</td><td>${x.issues}</td><td><span class="pill ${x.complete?"":"warn"}">${x.complete?"Katalog tamam":"Genişlet"}</span></td></tr>`).join("")}</tbody></table><p><a href="/admin/seo-radar/">Tüm fırsatları aç →</a></p></section>
  <section class="panel"><h2>Hızlı geçişler</h2><div class="links"><a target="_blank" rel="noopener" href="https://analytics.google.com/">Google Analytics ↗</a><a target="_blank" rel="noopener" href="https://clarity.microsoft.com/">Clarity ↗</a><a target="_blank" rel="noopener" href="https://search.google.com/search-console">Search Console ↗</a><a target="_blank" rel="noopener" href="https://www.bing.com/webmasters/">Bing Webmaster ↗</a><a target="_blank" rel="noopener" href="https://webmaster.yandex.com/">Yandex Webmaster ↗</a><a target="_blank" rel="noopener" href="https://github.com/balikrotasi1041/arizanerede">GitHub repo ↗</a></div><p class="muted">Son veri doğrulama etiketi: ${esc(m.lastVerified)}</p></section></div>`;
  return frame("Dashboard",body,email);
}

export function renderSeoRadar(email=""){
  const m=adminMetrics();
  const rows=m.opportunities.map((x,i)=>`<tr><td>${i+1}</td><td>${esc(x.brand)}</td><td>${esc(deviceTypes.find(d=>d.slug===x.deviceType)?.name||x.deviceType)}</td><td>${x.families}</td><td>${x.models}</td><td>${x.issues}</td><td><span class="pill ${x.complete?"":"warn"}">${x.complete?"Tam":"Eksik katalog"}</span></td></tr>`).join("");
  const noIssues=m.gaps.modelsWithoutIssues.slice(0,40).map(x=>`<tr><td>${esc(brands.find(b=>b.slug===x.brand)?.name||x.brand)}</td><td>${esc(x.name)}</td><td>${esc(deviceTypes.find(d=>d.slug===x.deviceType)?.name||x.deviceType)}</td></tr>`).join("");
  return frame("SEO Fırsat Radarı",`<section class="panel"><h2>Marka × cihaz genişleme önceliği</h2><table><thead><tr><th>#</th><th>Marka</th><th>Cihaz</th><th>Seri</th><th>Model</th><th>Arıza</th><th>Katalog</th></tr></thead><tbody>${rows}</tbody></table></section><section class="panel" style="margin-top:14px"><h2>Arıza içeriği olmayan modeller</h2>${noIssues?`<table><thead><tr><th>Marka</th><th>Model</th><th>Cihaz</th></tr></thead><tbody>${noIssues}</tbody></table>`:`<div class="good">Tüm yayımlanmış modellerin en az bir doğrulanmış arıza kaydı var.</div>`}</section>`,email);
}

export function renderDataHealth(email=""){
  const m=adminMetrics(),g=m.gaps;
  const list=(items,fn)=>items.length?`<table><tbody>${items.map(fn).join("")}</tbody></table>`:`<div class="good">Sorun bulunmadı.</div>`;
  return frame("Veri Sağlığı",`<div class="grid"><div class="metric"><small>Marka kaynak açığı</small><b class="${g.brandSourceGaps.length?"bad":"ok"}">${g.brandSourceGaps.length}</b></div><div class="metric"><small>Model kaynak açığı</small><b class="${g.modelSourceGaps.length?"bad":"ok"}">${g.modelSourceGaps.length}</b></div><div class="metric"><small>Arıza bütünlük açığı</small><b class="${g.issueIntegrityGaps.length?"bad":"ok"}">${g.issueIntegrityGaps.length}</b></div><div class="metric"><small>Arızasız model</small><b class="${g.modelsWithoutIssues.length?"warn":"ok"}">${g.modelsWithoutIssues.length}</b></div><div class="metric"><small>Placeholder</small><b class="${g.placeholderHits.length?"bad":"ok"}">${g.placeholderHits.length}</b></div><div class="metric"><small>Yüksek risk</small><b>${m.counts.highRisk}</b></div></div><div class="cols"><section class="panel"><h2>Marka kaynak eksikleri</h2>${list(g.brandSourceGaps,b=>`<tr><td>${esc(b.name)}</td><td class="muted">Resmî site / destek / servis alanlarından en az biri eksik</td></tr>`)}</section><section class="panel"><h2>Model kaynak eksikleri</h2>${list(g.modelSourceGaps,x=>`<tr><td>${esc(brands.find(b=>b.slug===x.brand)?.name||x.brand)} ${esc(x.name)}</td><td class="muted">Destek veya kılavuz eksik</td></tr>`)}</section></div><div class="cols"><section class="panel"><h2>Arıza bütünlük eksikleri</h2>${list(g.issueIntegrityGaps,x=>`<tr><td>${esc(x.title)}</td><td class="muted">Resmî kaynak / güvenlik / durma koşulu / arama niyeti kontrol edilmeli</td></tr>`)}</section><section class="panel"><h2>Placeholder taraması</h2>${list(g.placeholderHits,x=>`<tr><td>${esc(x.kind)} · ${esc(x.name)}</td><td class="bad">${esc(x.hits.join(" | "))}</td></tr>`)}</section></div>`,email);
}
