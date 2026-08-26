import app from "../src/index.js";
import {
  SITE_ORIGIN,deviceTypes,brands,indexableFamilies,indexableModels,issues,
  pathForDeviceType,pathForBrand,pathForFamily,pathForModel,pathForIssue
} from "../src/catalog.js";
import {adminMetrics} from "../src/admin-dashboard.js";

const errors=[];
const expect=(ok,message)=>{if(!ok)errors.push(message)};
const get=async(path,env={})=>app.fetch(new Request(`${SITE_ORIGIN}${path}`),env);
const body=async(path,env={})=>{const response=await get(path,env);return {response,text:await response.text()}};
const PLACEHOLDER=/(hazırlan(?:ıyor|acak)|güncellenecek|yakında|\btodo\b|\btbd\b|placeholder)/i;

for(const device of deviceTypes){
  const {response,text}=await body(pathForDeviceType(device));
  expect(response.status===200,`Kategori rotası başarısız: ${device.slug}`);
  expect(text.includes(`<link rel="canonical" href="${SITE_ORIGIN}${pathForDeviceType(device)}">`),`Kategori canonical eksik: ${device.slug}`);
}
for(const family of indexableFamilies){
  const {response,text}=await body(pathForFamily(family));
  expect(response.status===200,`Aile rotası başarısız: ${family.brand}/${family.slug}`);
  expect(!text.includes('name="robots" content="noindex'),`Yayınlanan aile noindex olmamalı: ${family.brand}/${family.slug}`);
}
for(const model of indexableModels){
  const path=pathForModel(model);
  const {response,text}=await body(path);
  expect(response.status===200,`Model rotası başarısız: ${path}`);
  expect(text.includes(`<link rel="canonical" href="${SITE_ORIGIN}${path}">`),`Model canonical eksik: ${path}`);
  expect(!text.includes('name="robots" content="noindex'),`Yayınlanan model noindex olmamalı: ${path}`);
  expect(text.includes("Doğrulanmış arıza ve belirti kümeleri"),`Model belirti kapsamı görünmüyor: ${path}`);
  expect(text.includes("Resmî yetkili servis / onarım kanalı"),`Model resmî servis yönü görünmüyor: ${path}`);
  expect(text.includes("Pazar keşfi · destek kaynağı değildir"),`Akakçe kaynak rolü ayrıştırılmamış: ${path}`);
  expect(!PLACEHOLDER.test(text),`Model sayfasında placeholder var: ${path}`);
}
for(const issue of issues){
  const {response,text}=await body(pathForIssue(issue));
  expect(response.status===200,`Arıza rotası başarısız: ${pathForIssue(issue)}`);
  expect(text.includes(issue.title),`Arıza başlığı görünmüyor: ${pathForIssue(issue)}`);
}

const scooter=indexableModels.find(x=>x.deviceType==="elektrikli-scooter");
if(scooter){
  const {text}=await body(pathForModel(scooter));
  expect((text.match(/Onarım adımı verilmez/g)||[]).length>=2,"Scooter yüksek risk kümelerinde onarım adımları gizlenmeli");
  expect(!text.includes("Scooter'ı kapatın ve kılavuzdaki şarj sıcaklığı"),"Yüksek riskli şarj adımları kullanıcıya yayımlanmamalı");
  expect(!text.includes("Fren kaliperi ayarı yapın"),"Servis seviyesi fren işlemi yayımlanmamalı");
}

const search=await body("/ara/?q=X20%20Pro");
expect(search.response.status===200,"İç arama rotası başarısız");
expect(search.response.headers.get("x-robots-tag")?.includes("noindex"),"İç arama X-Robots-Tag ile noindex olmalı");
expect(search.text.includes("Robot Vacuum X20 Pro"),"Yeni katalog iç aramada bulunamıyor");

const sitemapResponse=await get("/sitemap.xml");
const sitemap=await sitemapResponse.text();
expect(sitemapResponse.status===200,"Sitemap başarısız");
expect(!sitemap.includes("/admin/")&&!sitemap.includes("/ara/"),"Admin veya arama sitemap'e girmemeli");
for(const model of indexableModels)expect(sitemap.includes(`${SITE_ORIGIN}${pathForModel(model)}`),`Model sitemap'te yok: ${pathForModel(model)}`);

const robots=await body("/robots.txt");
expect(robots.text.includes("Disallow: /admin/")&&robots.text.includes(`${SITE_ORIGIN}/sitemap.xml`),"robots.txt admin/sitemap kuralları eksik");
const health=await get("/health");
const healthData=await health.json();
expect(healthData.indexableModels===indexableModels.length,"Health model sayısı gerçek veriden gelmiyor");
expect(healthData.symptomClusters===indexableModels.reduce((n,m)=>n+m.symptomClusters.length,0),"Health belirti sayısı gerçek veriden gelmiyor");

const metrics=adminMetrics();
const supportOnly=metrics.gaps.supportOnlyPairs[0];
if(supportOnly){
  const result=await body(pathForBrand(supportOnly.deviceType,supportOnly.brandSlug));
  expect(result.response.status===200,"Support-only marka destek rotası çalışmıyor");
  expect(result.response.headers.get("x-robots-tag")?.includes("noindex"),"Support-only marka rotası noindex değil");
}
const locked=await get("/admin/dashboard/",{ADMIN_ACCESS_READY:"false"});
expect(locked.status===403,"Admin anahtarı false iken fail-closed değil");
expect(locked.headers.get("cache-control")==="private, no-store","Admin kilit yanıtı cache dışı değil");
expect(locked.headers.get("x-robots-tag")?.includes("noindex"),"Admin kilit yanıtı noindex değil");
const noJwt=await get("/admin/dashboard/",{ADMIN_ACCESS_READY:"true"});
expect(noJwt.status===403,"Access JWT olmadan admin açılmamalı");
const adminRequest=new Request(`${SITE_ORIGIN}/admin/dashboard/`,{headers:{"Cf-Access-Jwt-Assertion":"test-only","Cf-Access-Authenticated-User-Email":"test@example.invalid"}});
const dashboard=await app.fetch(adminRequest,{ADMIN_ACCESS_READY:"true"});
const dashboardText=await dashboard.text();
expect(dashboard.status===200&&dashboardText.includes("Support-only kalan marka"),"Yetkili admin dashboard gerçek kapsamı göstermiyor");

if(errors.length){for(const error of errors)console.error(`ROTA HATASI: ${error}`);process.exit(1)}
console.log(`Rotalar doğrulandı: ${deviceTypes.length} kategori, ${indexableFamilies.length} aile, ${indexableModels.length} model, ${issues.length} ayrı arıza rotası; sitemap, arama, health ve admin fail-closed çalışıyor.`);
