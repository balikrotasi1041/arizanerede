import {
  SITE_ORIGIN, PROVINCES, deviceTypes, brands, families, models, issues,indexableIssues,
  indexableFamilies,indexableModels,isBrandIndexable,isFamilyIndexable,isModelIndexable,isIssueIndexable,
  indexableEditorialGuides,indexableServiceGuides,editorialGuideBySlug,serviceGuideBySlug,SEO_ROLLOUT_STAGE,
  deviceTypeBySlug, brandBySlug, familyByKey, modelByKey, issueByKey,
  pathForDeviceType, pathForBrand, pathForFamily, pathForModel, pathForIssue, normalize
} from "./catalog.js";
import {
  renderHome, renderDeviceType, renderBrand, renderFamily, renderModel, renderIssue, renderSearch,
  renderPolicy, renderServiceRights, renderEditorialGuide, renderServiceGuide, render404,
  pathForEditorialGuide,pathForServiceGuide
} from "./ui.js";
import { renderAdminLocked,renderAdminDashboard,renderSeoRadar,renderDataHealth } from "./admin-dashboard.js";

const BLOCKED_IPS = new Set([
  "130.12.180.39",
  "43.228.157.197",
  "158.69.55.82",
  "158.69.55.148",
  "34.24.16.181",
  "45.148.10.247",
  "45.148.10.244",
  "93.123.109.166",
  "93.123.109.165",
  "195.178.110.103",
  "195.178.110.132",
  "195.178.110.101",
  "195.178.110.155",
]);

const BLOCKED_ASNS = new Set([48090]);

const SENSITIVE_SCAN_PATTERNS = [
  /^\/(?:[^/]+\/)*(?:\.env(?:\.[^/]+)?(?:\/|$)|\.git(?:\/|$)|\.svn(?:\/|$)|\.hg(?:\/|$))/i,
  /^\/(?:wp|wordpress)(?:\/|$)/i,
  /^\/(?:blog\/)?wp-json(?:\/|$)/i,
  /^\/(?:wp-admin(?:\/|$)|wp-login\.php$|wp-config\.php$|xmlrpc\.php$)/i,
  /^\/(?:[^/]+\/)*[^/]+\.php(?:\/|$)/i,
  /^\/auth\/callback(?:\/|$)/i,
  /^\/(?:phpmyadmin(?:\/|$)|adminer(?:\.php|\/|$)|phpinfo\.php$|info\.php$|server-status(?:\/|$))/i,
  /^\/(?:console|cgi-bin|actuator|server-info|WEB-INF|\.aws)(?:\/|$)/i,
  /^\/key\/info$/i,
  /^\/(?:next\.config\.(?:js|mjs|ts)|nuxt\.config\.(?:js|ts)|vite\.config\.(?:js|ts))$/i,
  /^\/(?:appsettings(?:\.[^/]+)?\.json$|app\.config$|web\.config$|\.DS_Store$)/i,
  /^\/(?:vendor\/phpunit(?:\/|$)|composer\.(?:json|lock)$|package-lock\.json$|yarn\.lock$|pnpm-lock\.yaml$)/i,
  /^\/(?:backup(?:[-_.][^/]*)?\.(?:sql|tgz|zip|tar(?:\.gz)?)|dump(?:[-_.][^/]*)?\.sql|export\.sql)$/i,
  /^\/(?:rails\/info\/properties|jenkinsfile|log4j(?:2)?\.properties|cron\.log)$/i,
  /^\/(?:admin|administrator|cpanel|webmail)(?:\/|$)/i,
];

function securityHeaders(headers=new Headers()){
  headers.set("strict-transport-security","max-age=31536000; includeSubDomains");headers.set("x-content-type-options","nosniff");headers.set("referrer-policy","strict-origin-when-cross-origin");headers.set("x-frame-options","DENY");headers.set("cross-origin-opener-policy","same-origin");headers.set("permissions-policy","camera=(), microphone=(), geolocation=()");headers.set("content-security-policy","default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests");return headers;
}
function securityResponse(status){
  const headers=securityHeaders(new Headers({"cache-control":"private, no-store","x-robots-tag":"noindex, nofollow, noarchive, nosnippet"}));
  return new Response(null,{status,headers});
}
function clientIp(request){return String(request.headers.get("CF-Connecting-IP")||"").trim()}
function clientAsn(request){const asn=Number(request?.cf?.asn);return Number.isFinite(asn)?asn:0}
function normalizedProbePath(pathname){
  let value=String(pathname||"/");
  for(let pass=0;pass<2;pass+=1){try{const decoded=decodeURIComponent(value);if(decoded===value)break;value=decoded}catch{break}}
  return value.replace(/\\/g,"/").replace(/\/{2,}/g,"/");
}
function isSensitiveScanPath(pathname){const normalized=normalizedProbePath(pathname);return SENSITIVE_SCAN_PATTERNS.some(pattern=>pattern.test(normalized));}
function html(body,status=200,{noindex=false}={}){const headers=securityHeaders(new Headers({"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=0, s-maxage=600"}));if(noindex)headers.set("x-robots-tag","noindex, follow");return new Response(body,{status,headers})}
function adminHtml(body,status=200){return new Response(body,{status,headers:securityHeaders(new Headers({"content-type":"text/html; charset=utf-8","cache-control":"private, no-store","x-robots-tag":"noindex, nofollow, noarchive, nosnippet"}))})}
function redirect(location){return new Response(null,{status:308,headers:securityHeaders(new Headers({location}))})}
function xmlEscape(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&apos;")}
function isAdminPath(path){return path==="/admin"||path==="/admin/"||path.startsWith("/admin/")}
function adminSession(request,env){
  if(env?.ADMIN_ACCESS_READY!=="true")return null;
  const jwt=String(request.headers.get("Cf-Access-Jwt-Assertion")||"");
  if(!jwt)return null;
  return {email:String(request.headers.get("Cf-Access-Authenticated-User-Email")||"Cloudflare Access kullanıcısı")};
}

function search(q){
  const terms=normalize(q).split(" ").filter(Boolean);if(!terms.length)return[];
  const brandCandidates=[];
  for(const d of deviceTypes){for(const b of brands.filter(x=>x.deviceTypes.includes(d.slug))){brandCandidates.push({type:"Marka destek merkezi",title:`${b.name} ${d.name}`,description:"Resmî destek · kılavuz · sürücü/yazılım · yetkili servis",url:pathForBrand(d.slug,b.slug),hay:`${b.name} ${d.name} destek kullanıcı kılavuzu driver sürücü yazılım firmware bios yetkili servis garanti hata arıza`});}}
  const guideCandidates=indexableEditorialGuides.map(g=>({type:"Teknik rehber",title:g.title,description:g.description,url:pathForEditorialGuide(g),hay:`${g.title} ${g.description} ${(g.sections||[]).map(x=>`${x.title} ${x.text}`).join(" ")}`}));
  const serviceCandidates=indexableServiceGuides.map(g=>({type:"Resmî servis rehberi",title:g.title,description:g.description,url:pathForServiceGuide(g),hay:`${g.title} ${g.description} ${g.summary} ${(g.brands||[]).join(" ")} servis yetkili servis teknik destek garanti`}));
  const candidates=[
    ...indexableIssues.map(i=>({type:"Arıza / hata",title:i.title,description:`${i.code} · ${i.short}`,url:pathForIssue(i),hay:[i.title,i.code,i.short,i.meaning,...(i.queryIntents||[]),...(i.manualNotes||[]).flatMap(n=>[n.term,n.explanation]),...(i.parts||[]).map(p=>p.name)].join(" ")})),
    ...guideCandidates,...serviceCandidates,
    ...indexableModels.map(m=>{const b=brandBySlug.get(m.brand);return{type:"Tam model",title:`${b.name} ${m.name}`,description:`${m.symptomClusters.length} doğrulanmış belirti kümesi · kılavuz · yazılım · resmî destek`,url:pathForModel(m),hay:`${b.name} ${m.name} ${m.modelCode} ${(m.symptomClusters||[]).map(c=>`${c.title} ${c.summary}`).join(" ")} kullanıcı kılavuzu yazılım firmware driver sürücü hata arıza destek`}}),
    ...indexableFamilies.map(f=>{const b=brandBySlug.get(f.brand);return{type:"Seri / model ailesi",title:`${b.name} ${f.name}`,description:"Tam cihaz modelleri",url:pathForFamily(f),hay:`${b.name} ${f.name}`}}),
    ...brandCandidates,
    ...deviceTypes.map(d=>({type:"Cihaz türü",title:d.name,description:d.description,url:pathForDeviceType(d),hay:`${d.name} ${d.description}`}))
  ];
  return candidates.map(x=>{const h=normalize(x.hay),t=normalize(x.title);return{...x,score:terms.reduce((s,k)=>s+(t.includes(k)?4:0)+(h.includes(k)?2:0),0)}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,40);
}

function sitemap(){
  const urls=[
    "/","/kaynak-politikasi/","/servis-garanti-haklari/",
    ...deviceTypes.map(pathForDeviceType),...indexableFamilies.map(pathForFamily),...indexableModels.map(pathForModel),...indexableIssues.map(pathForIssue),
    ...indexableEditorialGuides.map(pathForEditorialGuide),...indexableServiceGuides.map(pathForServiceGuide)
  ];
  for(const d of deviceTypes){for(const b of brands.filter(x=>x.deviceTypes.includes(d.slug)&&isBrandIndexable(d.slug,x.slug)))urls.push(pathForBrand(d.slug,b.slug));}
  const unique=[...new Set(urls)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${unique.map(u=>`<url><loc>${SITE_ORIGIN}${xmlEscape(u)}</loc><lastmod>2026-09-02</lastmod></url>`).join("")}</urlset>`;
}

export default {async fetch(request,env={}){
  const ip=clientIp(request);if(BLOCKED_IPS.has(ip))return securityResponse(403);
  const asn=clientAsn(request);if(BLOCKED_ASNS.has(asn))return securityResponse(403);
  const url=new URL(request.url);
  if(request.method==="TRACE")return securityResponse(405);
  if(isSensitiveScanPath(url.pathname)&&!url.pathname.startsWith("/admin/"))return securityResponse(404);
  if(!["GET","HEAD"].includes(request.method))return securityResponse(405);
  let path;try{path=decodeURIComponent(url.pathname)}catch{return securityResponse(400)}
  if(url.hostname==="www.arizanerede.com")return redirect(`${SITE_ORIGIN}${url.pathname}${url.search}`);

  if(isAdminPath(path)){
    if(env?.ADMIN_ACCESS_READY!=="true")return adminHtml(renderAdminLocked(),403);
    const session=adminSession(request,env);if(!session)return securityResponse(403);
    if(path==="/admin"||path==="/admin/")return redirect(`${SITE_ORIGIN}/admin/dashboard/`);
    if(path==="/admin/dashboard"||path==="/admin/dashboard/")return adminHtml(renderAdminDashboard(env,session.email));
    if(path==="/admin/seo-radar"||path==="/admin/seo-radar/")return adminHtml(renderSeoRadar(session.email));
    if(path==="/admin/data-health"||path==="/admin/data-health/")return adminHtml(renderDataHealth(session.email));
    return adminHtml(render404(),404);
  }

  if(path==="/robots.txt")return new Response(`User-agent: *\nAllow: /\nDisallow: /ara\nDisallow: /admin/\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,{headers:securityHeaders(new Headers({"content-type":"text/plain; charset=utf-8"}))});
  if(path==="/sitemap.xml")return new Response(sitemap(),{headers:securityHeaders(new Headers({"content-type":"application/xml; charset=utf-8"}))});
  if(path==="/health")return new Response(JSON.stringify({status:"ok",release:"v0.8-controlled-seo-depth",seoRolloutStage:SEO_ROLLOUT_STAGE,deviceTypes:deviceTypes.length,brands:brands.length,indexableBrandPairs:deviceTypes.reduce((n,d)=>n+brands.filter(b=>b.deviceTypes.includes(d.slug)&&isBrandIndexable(d.slug,b.slug)).length,0),supportOnlyPairs:deviceTypes.reduce((n,d)=>n+brands.filter(b=>b.deviceTypes.includes(d.slug)&&!isBrandIndexable(d.slug,b.slug)).length,0),families:families.length,indexableFamilies:indexableFamilies.length,models:models.length,indexableModels:indexableModels.length,symptomClusters:indexableModels.reduce((n,m)=>n+m.symptomClusters.length,0),verifiedIssues:issues.length,indexableIssues:indexableIssues.length,stagedIssues:issues.length-indexableIssues.length,indexableEditorialGuides:indexableEditorialGuides.length,indexableServiceGuides:indexableServiceGuides.length,adminAccessReady:env?.ADMIN_ACCESS_READY==="true"}),{headers:securityHeaders(new Headers({"content-type":"application/json; charset=utf-8","cache-control":"no-store"}))});
  if(path==="/")return html(renderHome());
  if(path==="/kaynak-politikasi"||path==="/kaynak-politikasi/")return html(renderPolicy());
  if(path==="/servis-garanti-haklari"||path==="/servis-garanti-haklari/")return html(renderServiceRights());
  if(path==="/ara"||path==="/ara/"){const q=(url.searchParams.get("q")||"").slice(0,140);return html(renderSearch(q,search(q)),200,{noindex:true});}
  const p=path.split("/").filter(Boolean);
  if(p.length===2&&p[0]==="rehber"){
    const guide=editorialGuideBySlug.get(p[1]);
    return guide?html(renderEditorialGuide(guide,{noindex:guide.seoTier>SEO_ROLLOUT_STAGE}),200,{noindex:guide.seoTier>SEO_ROLLOUT_STAGE}):html(render404(),404);
  }
  if(p.length===2&&p[0]==="servis"){
    const guide=serviceGuideBySlug.get(p[1]);
    return guide?html(renderServiceGuide(guide,{noindex:guide.seoTier>SEO_ROLLOUT_STAGE}),200,{noindex:guide.seoTier>SEO_ROLLOUT_STAGE}):html(render404(),404);
  }
  if(p.length===1){const d=deviceTypeBySlug.get(p[0]);return d?html(renderDeviceType(d)):html(render404(),404)}
  if(p.length===2){const d=deviceTypeBySlug.get(p[0]),b=brandBySlug.get(p[1]);return d&&b&&b.deviceTypes.includes(d.slug)?html(renderBrand(d,b),200,{noindex:!isBrandIndexable(d.slug,b.slug)}):html(render404(),404)}
  if(p.length===3){const d=deviceTypeBySlug.get(p[0]),b=brandBySlug.get(p[1]),f=familyByKey.get(`${p[0]}/${p[1]}/${p[2]}`);return d&&b&&f?html(renderFamily(d,b,f),200,{noindex:!isFamilyIndexable(f)}):html(render404(),404)}
  if(p.length===4){const d=deviceTypeBySlug.get(p[0]),b=brandBySlug.get(p[1]),f=familyByKey.get(`${p[0]}/${p[1]}/${p[2]}`),m=modelByKey.get(`${p[0]}/${p[1]}/${p[2]}/${p[3]}`);return d&&b&&f&&m?html(renderModel(d,b,f,m),200,{noindex:!isModelIndexable(m)}):html(render404(),404)}
  if(p.length===5){
    const d=deviceTypeBySlug.get(p[0]),b=brandBySlug.get(p[1]),f=familyByKey.get(`${p[0]}/${p[1]}/${p[2]}`),m=modelByKey.get(`${p[0]}/${p[1]}/${p[2]}/${p[3]}`),i=issueByKey.get(`${p[0]}/${p[1]}/${p[2]}/${p[3]}/${p[4]}`);
    const raw=(url.searchParams.get("il")||"Kocaeli").slice(0,40),province=PROVINCES.includes(raw)?raw:"Kocaeli";
    if(!(d&&b&&f&&m&&i))return html(render404(),404);
    const noindex=!isIssueIndexable(i);
    return html(renderIssue(d,b,f,m,i,province,{noindex}),200,{noindex});
  }
  return html(render404(),404);
}};
