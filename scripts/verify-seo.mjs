import app from "../src/index.js";
import {
  SITE_ORIGIN,deviceTypes,brands,indexableFamilies,issues,indexableIssues,indexableModels,indexableEditorialGuides,indexableServiceGuides,
  isBrandIndexable,pathForDeviceType,pathForBrand,pathForFamily,pathForIssue,pathForModel
} from "../src/catalog.js";
import {pathForEditorialGuide,pathForServiceGuide} from "../src/ui.js";

const errors=[];
const expect=(ok,message)=>{if(!ok)errors.push(message)};
const get=path=>app.fetch(new Request(`${SITE_ORIGIN}${path}`),{});
const noNoindex=async(path,label)=>{
  const response=await get(path);const text=await response.text();
  expect(response.status===200,`${label} 200 değil: ${path} -> ${response.status}`);
  expect(!String(response.headers.get("x-robots-tag")||"").toLowerCase().includes("noindex"),`${label} X-Robots noindex olamaz: ${path}`);
  expect(!text.includes('name="robots" content="noindex'),`${label} meta robots noindex olamaz: ${path}`);
  return text;
};

const sitemapResponse=await get("/sitemap.xml");
const sitemapIndex=await sitemapResponse.text();
expect(sitemapResponse.status===200,"Sitemap index 200 dönmeli.");
expect(sitemapIndex.includes("<sitemapindex"),"/sitemap.xml sitemapindex üretmeli.");
const childSitemaps=[...sitemapIndex.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
expect(childSitemaps.length===4,"Sitemap index dört alt sitemap içermeli.");
const sitemapUrls=[];
for(const absolute of childSitemaps){
  const path=absolute.replace(SITE_ORIGIN,"");
  const response=await get(path);
  const xml=await response.text();
  expect(response.status===200,`Alt sitemap 200 değil: ${path}`);
  sitemapUrls.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]));
}
const uniqueUrls=new Set(sitemapUrls);
expect(uniqueUrls.size===sitemapUrls.length,"Alt sitemapler yinelenen URL içeriyor.");
expect(sitemapUrls.every(url=>url.startsWith(`${SITE_ORIGIN}/`)),"Sitemap yalnız canonical host URL'leri içermeli.");
expect(!sitemapUrls.some(url=>url.includes("/ara")||url.includes("/admin/")),"Arama ve admin sitemap dışında kalmalı.");

for(const absolute of sitemapUrls){
  const path=absolute.slice(SITE_ORIGIN.length)||"/";
  await noNoindex(path,"Sitemap URL");
}

const unpublishedIssues=issues.filter(issue=>!indexableIssues.includes(issue));
expect(unpublishedIssues.length===0,`Tamamlanmamış veya indeks dışı teknik arıza kaydı kalamaz: ${unpublishedIssues.length}`);
for(const issue of issues){
  const path=pathForIssue(issue);
  expect(uniqueUrls.has(`${SITE_ORIGIN}${path}`),`Arıza sitemap'te yok: ${path}`);
}

for(const guide of indexableEditorialGuides){
  const path=pathForEditorialGuide(guide);
  expect(uniqueUrls.has(`${SITE_ORIGIN}${path}`),`Editoryal rehber sitemap'te yok: ${path}`);
}
for(const guide of indexableServiceGuides){
  const path=pathForServiceGuide(guide);
  expect(uniqueUrls.has(`${SITE_ORIGIN}${path}`),`Servis rehberi sitemap'te yok: ${path}`);
}
for(const device of deviceTypes)expect(uniqueUrls.has(`${SITE_ORIGIN}${pathForDeviceType(device)}`),`Kategori sitemap'te yok: ${device.slug}`);
for(const family of indexableFamilies)expect(uniqueUrls.has(`${SITE_ORIGIN}${pathForFamily(family)}`),`Aile sitemap'te yok: ${family.brand}/${family.slug}`);
for(const device of deviceTypes){for(const brand of brands.filter(item=>item.deviceTypes.includes(device.slug)&&isBrandIndexable(device.slug,item.slug)))expect(uniqueUrls.has(`${SITE_ORIGIN}${pathForBrand(device.slug,brand.slug)}`),`Marka hub sitemap'te yok: ${device.slug}/${brand.slug}`);}

const protectedModels=[
  ["dreame","R20"],
  ["baymak","Elegant Soft 12"],
  ["tcl","65T61C"],
  ["lg","OLED evo 55C64LA"],
  ["grundig","50 GQ 750 A"],
  ["tchibo","Cafissimo Picco"],
  ["canon","PIXMA G3470"],
  ["arcelik","TEM 9690"]
];
for(const [brand,name] of protectedModels){
  const model=indexableModels.find(item=>item.brand===brand&&item.name===name);
  expect(Boolean(model),`Search Console değeri olan model katalogdan kayboldu: ${brand}/${name}`);
  if(model){
    const path=pathForModel(model);
    expect(uniqueUrls.has(`${SITE_ORIGIN}${path}`),`Korunan model sitemap'ten kayboldu: ${path}`);
    const text=await noNoindex(path,"Korunan model");
    expect(text.includes("arızaları"),`Korunan model title/H1 arıza niyetine odaklanmıyor: ${path}`);
  }
}

const searchText=await noNoindex("/ara/?q=55C64LA","İç arama");
expect(searchText.includes("55C64LA"),"İç arama model kodu sorgusuna cevap vermiyor");

if(errors.length){for(const error of errors)console.error(`SEO HATASI: ${error}`);process.exit(1)}
console.log(`SEO kalite kapısı geçti: ${sitemapUrls.length} indeks hedefi, ${indexableIssues.length}/${issues.length} teknik arıza public ve indeks hedefinde, ${indexableEditorialGuides.length} rehber, ${indexableServiceGuides.length} servis sayfası; noindex kullanılmıyor.`);
