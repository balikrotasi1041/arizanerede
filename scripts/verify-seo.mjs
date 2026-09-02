import app from "../src/index.js";
import {
  SITE_ORIGIN,issues,indexableIssues,indexableModels,indexableEditorialGuides,indexableServiceGuides,
  pathForIssue,pathForModel
} from "../src/catalog.js";
import {pathForEditorialGuide,pathForServiceGuide} from "../src/ui.js";

const errors=[];
const expect=(ok,message)=>{if(!ok)errors.push(message)};
const get=path=>app.fetch(new Request(`${SITE_ORIGIN}${path}`),{});

const sitemapResponse=await get("/sitemap.xml");
const sitemapText=await sitemapResponse.text();
const sitemapUrls=[...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
const uniqueUrls=new Set(sitemapUrls);
expect(sitemapResponse.status===200,"Sitemap 200 dönmeli.");
expect(uniqueUrls.size===sitemapUrls.length,"Sitemap yinelenen URL içeriyor.");
expect(sitemapUrls.every(url=>url.startsWith(`${SITE_ORIGIN}/`)),"Sitemap yalnız canonical host URL'leri içermeli.");

for(const absolute of sitemapUrls){
  const path=absolute.slice(SITE_ORIGIN.length)||"/";
  const response=await get(path);
  expect(response.status===200,`Sitemap URL 200 değil: ${path} -> ${response.status}`);
  expect(!response.headers.get("x-robots-tag")?.includes("noindex"),`Sitemap URL noindex olamaz: ${path}`);
}

const unpublishedIssues=issues.filter(issue=>!indexableIssues.includes(issue));
expect(unpublishedIssues.length===0,`Tamamlanmamış veya indeks dışı teknik arıza kaydı kalamaz: ${unpublishedIssues.length}`);
for(const issue of issues){
  const path=pathForIssue(issue);
  const response=await get(path);
  const text=await response.text();
  expect(response.status===200,`Arıza sayfası 200 değil: ${path} -> ${response.status}`);
  expect(sitemapText.includes(`${SITE_ORIGIN}${path}`),`Arıza sitemap'te yok: ${path}`);
  expect(!response.headers.get("x-robots-tag")?.includes("noindex"),`Arıza X-Robots-Tag noindex olamaz: ${path}`);
  expect(!text.includes('name="robots" content="noindex'),`Arıza meta robots noindex olamaz: ${path}`);
}

for(const guide of indexableEditorialGuides){
  const path=pathForEditorialGuide(guide);
  const response=await get(path);
  expect(response.status===200,`Editoryal rehber başarısız: ${path}`);
  expect(sitemapText.includes(`${SITE_ORIGIN}${path}`),`Editoryal rehber sitemap'te yok: ${path}`);
}
for(const guide of indexableServiceGuides){
  const path=pathForServiceGuide(guide);
  const response=await get(path);
  expect(response.status===200,`Servis rehberi başarısız: ${path}`);
  expect(sitemapText.includes(`${SITE_ORIGIN}${path}`),`Servis rehberi sitemap'te yok: ${path}`);
}

const protectedModels=[
  ["dreame","R20"],
  ["baymak","Elegant Soft 12"],
  ["tcl","65T61C"],
  ["lg","OLED evo 55C64LA"],
  ["grundig","50 GQ 750 A"],
  ["tchibo","Cafissimo Picco"],
  ["canon","PIXMA G3470"]
];
for(const [brand,name] of protectedModels){
  const model=indexableModels.find(item=>item.brand===brand&&item.name===name);
  expect(Boolean(model),`Search Console değeri olan model katalogdan kayboldu: ${brand}/${name}`);
  if(model){
    const path=pathForModel(model);
    const response=await get(path);
    expect(response.status===200,`Korunan model rotası bozuldu: ${path}`);
    expect(sitemapText.includes(`${SITE_ORIGIN}${path}`),`Korunan model sitemap'ten kayboldu: ${path}`);
  }
}

if(errors.length){for(const error of errors)console.error(`SEO HATASI: ${error}`);process.exit(1)}
console.log(`SEO kalite kapısı geçti: ${sitemapUrls.length} sitemap URL, ${indexableIssues.length}/${issues.length} teknik arıza indeks hedefinde, ${indexableEditorialGuides.length} rehber, ${indexableServiceGuides.length} servis sayfası.`);