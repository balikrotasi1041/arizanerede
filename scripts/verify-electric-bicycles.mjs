import app from "../src/index.js";
import {
  SITE_ORIGIN,indexableModels,indexableFamilies,brands,marketInventoryByDevice,
  electricBicycleScreening,pathForDeviceType,pathForBrand,pathForFamily,pathForModel,ISSUE_QUALITY_MIN
} from "../src/catalog.js";

const DEVICE="elektrikli-bisiklet";
const errors=[];
const expect=(ok,message)=>{if(!ok)errors.push(message)};
const models=indexableModels.filter(model=>model.deviceType===DEVICE);
const families=indexableFamilies.filter(family=>family.deviceType===DEVICE);
const ebikeBrands=brands.filter(brand=>brand.deviceTypes?.includes(DEVICE)&&models.some(model=>model.brand===brand.slug));
const market=marketInventoryByDevice.get(DEVICE);
const https=value=>typeof value==="string"&&value.startsWith("https://");

expect(market?.sourceUrl==="https://www.akakce.com/elektrikli-bisiklet.html","Akakçe elektrikli bisiklet kaynağı kayıtlı değil");
expect(market?.observedListings===587,"İlk pazar taraması 587 kayıt olmalı");
expect(market?.observedBrands===42,"İlk pazar taraması 42 marka olmalı");
expect(electricBicycleScreening?.acceptedModels===10,"İlk günlük elektrikli bisiklet paketi 10 model olmalı");
expect(models.length===10,`Public elektrikli bisiklet modeli 10 olmalı; mevcut=${models.length}`);
expect(ebikeBrands.length===2,`İlk pakette 2 marka olmalı; mevcut=${ebikeBrands.length}`);
expect(families.length===3,`İlk pakette 3 aile/seri olmalı; mevcut=${families.length}`);
expect(electricBicycleScreening.held?.some(item=>item.name==="Volta VSM"),"Akakçe/üretici sınıflandırma çatışması VSM için kayıtlı değil");
expect(!models.some(model=>/\bVSM\b/i.test(model.name)),"Volta VSM üretici e-bike olarak sınıflandırmadığı halde public olmuş");

for(const model of models){
  expect(https(model.productUrl)&&https(model.supportUrl)&&https(model.manualUrl),`Resmî ürün/destek/kılavuz kaynağı eksik: ${model.name}`);
  expect(model.marketSource?.role==="market-discovery-only",`Akakçe teknik kaynak rolüne taşmış: ${model.name}`);
  expect(model.marketSource?.url===market.sourceUrl,`Akakçe kategori kaynağı yanlış: ${model.name}`);
  expect((model.symptomClusters||[]).length>=ISSUE_QUALITY_MIN,`Sorun kapsamı kalite eşiğinin altında: ${model.name}`);
  for(const cluster of model.symptomClusters||[]){
    expect(Boolean(cluster.title&&cluster.summary&&cluster.stopWhen&&cluster.safety),`Eksik güvenlik/teşhis alanı: ${model.name}/${cluster.slug}`);
    expect(https(cluster.source?.url),`Sorun kümesinde resmî HTTPS kaynak yok: ${model.name}/${cluster.slug}`);
    if(cluster.risk==="high") expect(cluster.userCanTry===false&&!(cluster.steps||[]).length,`Yüksek riskli elektrikli bisiklet sorunu DIY adımı içeriyor: ${model.name}/${cluster.slug}`);
    const steps=(cluster.steps||[]).join(" ");
    expect(!/batarya paketini aç|bms|kontrolcüyü aç|motor gövdesini aç|lehim|fren kaliperini sök|hidrolik fren havası/i.test(steps),`Servis seviyesi işlem kullanıcı adımlarına sızmış: ${model.name}/${cluster.slug}`);
  }
}

const paths=[pathForDeviceType({slug:DEVICE}),...ebikeBrands.map(brand=>pathForBrand(DEVICE,brand.slug)),...families.map(pathForFamily),...models.map(pathForModel)];
for(const path of paths){
  const response=await app.fetch(new Request(`${SITE_ORIGIN}${path}`),{});
  const text=await response.text();
  expect(response.status===200,`Elektrikli bisiklet rota 200 değil: ${path} -> ${response.status}`);
  expect(!String(response.headers.get("x-robots-tag")||"").toLowerCase().includes("noindex"),`Elektrikli bisiklet rota noindex başlığı içeriyor: ${path}`);
  expect(!text.includes('name="robots" content="noindex'),`Elektrikli bisiklet rota noindex meta içeriyor: ${path}`);
  expect(text.includes(`<link rel="canonical" href="${SITE_ORIGIN}${path}">`),`Canonical eksik/yanlış: ${path}`);
}

if(errors.length){for(const error of errors)console.error(`E-BIKE HATASI: ${error}`);process.exit(1)}
console.log(`Elektrikli bisiklet kalite kapısı geçti: Akakçe ${market.observedListings} kayıt/${market.observedBrands} marka pazar taraması; bugün ${ebikeBrands.length} marka, ${families.length} seri/aile ve ${models.length} tam model public.`);
