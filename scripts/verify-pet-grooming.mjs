import app from "../src/index.js";
import {
  SITE_ORIGIN,indexableModels,indexableFamilies,brands,marketInventoryByDevice,
  petGroomingScreening,pathForDeviceType,pathForBrand,pathForFamily,pathForModel,ISSUE_QUALITY_MIN
} from "../src/catalog.js";

const DEVICE="kedi-kopek-tiras-makinesi";
const errors=[];
const expect=(ok,message)=>{if(!ok)errors.push(message)};
const models=indexableModels.filter(model=>model.deviceType===DEVICE);
const families=indexableFamilies.filter(family=>family.deviceType===DEVICE);
const petBrands=brands.filter(brand=>brand.deviceTypes?.includes(DEVICE)&&models.some(model=>model.brand===brand.slug));
const market=marketInventoryByDevice.get(DEVICE);
const https=value=>typeof value==="string"&&value.startsWith("https://");
const forbidden=/(yedek\s*bıçak|bıçak\s*seti|tarak\s*seti|yalnız\s*aksesuar|saç\s*ve\s*sakal)/i;

expect(market?.sourceUrl==="https://www.akakce.com/kedi-kopek-tiras-makinesi.html","Akakçe kategori kaynağı kayıtlı değil");
expect(market?.observedListings===265,"Akakçe tarama ürün sayısı 265 olmalı");
expect(market?.observedBrands===37,"Akakçe tarama marka sayısı 37 olmalı");
expect(petGroomingScreening?.acceptedModels===18,"Kalite kapısından geçen model sayısı 18 olmalı");
expect(models.length===18,`Public kaliteyi geçen pet grooming modeli 18 olmalı; mevcut=${models.length}`);
expect(petBrands.length===8,`Public marka sayısı 8 olmalı; mevcut=${petBrands.length}`);
expect(families.length===9,`Public seri/aile sayısı 9 olmalı; mevcut=${families.length}`);

for(const model of models){
  expect(!forbidden.test(`${model.name} ${model.modelCode}`),`Aksesuar/yanlış ürün tam cihaz gibi yayımlanıyor: ${model.name}`);
  expect(https(model.productUrl)&&https(model.supportUrl)&&https(model.manualUrl),`Resmî ürün/destek/kılavuz kaynağı eksik: ${model.name}`);
  expect(model.marketSource?.role==="market-discovery-only",`Akakçe teknik kaynak rolüne taşmış: ${model.name}`);
  expect(model.marketSource?.url===market.sourceUrl,`Akakçe kategori kaynağı yanlış: ${model.name}`);
  expect((model.symptomClusters||[]).length>=ISSUE_QUALITY_MIN,`Sorun kapsamı kalite eşiğinin altında: ${model.name}`);
  for(const cluster of model.symptomClusters||[]){
    expect(Boolean(cluster.title&&cluster.summary&&cluster.stopWhen&&cluster.safety),`Eksik güvenlik/teşhis alanı: ${model.name}/${cluster.slug}`);
    expect(https(cluster.source?.url),`Sorun kümesinde resmî HTTPS kaynak yok: ${model.name}/${cluster.slug}`);
  }
}

const heldNames=new Set(["KPPC-10851","Pet Trim","2-in-1 Trimmer","Pro 2-in-1 Trimmer","GM-9125","GM-8149","GM-9126","Max 50 Black","Prima Trimmer","Arko Pro","Saphir Cord","Style Mini"]);
for(const model of models){
  expect(![...heldNames].some(name=>model.name.toLocaleLowerCase("tr-TR").includes(name.toLocaleLowerCase("tr-TR"))),`Bekletilen model yanlışlıkla public oldu: ${model.name}`);
}

const paths=[pathForDeviceType({slug:DEVICE}),...petBrands.map(brand=>pathForBrand(DEVICE,brand.slug)),...families.map(pathForFamily),...models.map(pathForModel)];
for(const path of paths){
  const response=await app.fetch(new Request(`${SITE_ORIGIN}${path}`),{});
  const text=await response.text();
  expect(response.status===200,`Pet grooming rota 200 değil: ${path} -> ${response.status}`);
  expect(!String(response.headers.get("x-robots-tag")||"").toLowerCase().includes("noindex"),`Pet grooming rota noindex başlığı içeriyor: ${path}`);
  expect(!text.includes('name="robots" content="noindex'),`Pet grooming rota noindex meta içeriyor: ${path}`);
  expect(text.includes(`<link rel="canonical" href="${SITE_ORIGIN}${path}">`),`Canonical eksik/yanlış: ${path}`);
}

if(errors.length){for(const error of errors)console.error(`PET GROOMING HATASI: ${error}`);process.exit(1)}
console.log(`Pet grooming kalite kapısı geçti: Akakçe ${market.observedListings} kayıt/${market.observedBrands} marka tarandı; ${petBrands.length} marka, ${families.length} seri/aile ve ${models.length} tam cihaz yalnız resmî teknik kaynak + en az ${ISSUE_QUALITY_MIN} sorun kümesiyle public.`);
