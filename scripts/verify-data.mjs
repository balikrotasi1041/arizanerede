import {
  deviceTypes, brands, families, models, issues, PROVINCES,
  deviceTypeBySlug, brandBySlug, familyByKey, modelByKey, pathForIssue,
  indexableFamilies,indexableModels,isModelIndexable,marketInventory
} from "../src/catalog.js";

const errors=[];
for(const d of deviceTypes){ if(!d.slug||!d.name) errors.push(`Cihaz türü eksik: ${JSON.stringify(d)}`); }
for(const b of brands){
  if(!b.officialTurkey?.startsWith("https://")) errors.push(`Resmî marka kaynağı eksik: ${b.name}`);
  if(!b.supportUrl?.startsWith("https://")) errors.push(`Destek kaynağı eksik: ${b.name}`);
  if(!b.serviceUrl?.startsWith("https://")) errors.push(`Servis kaynağı eksik: ${b.name}`);
  if(b.trustLevel!=="brand-official") errors.push(`Marka güven katmanı hatalı: ${b.name}`);
  for(const d of b.deviceTypes||[]) if(!deviceTypeBySlug.has(d)) errors.push(`Marka cihaz türü yok: ${b.name}/${d}`);
}
for(const f of families){
  if(!deviceTypeBySlug.has(f.deviceType)) errors.push(`Aile cihaz türü yok: ${f.deviceType}/${f.slug}`);
  if(!brandBySlug.has(f.brand)) errors.push(`Aile markası yok: ${f.brand}/${f.slug}`);
  if(!brandBySlug.get(f.brand)?.deviceTypes.includes(f.deviceType)) errors.push(`Aile marka-cihaz eşleşmesi yok: ${f.brand}/${f.deviceType}`);
  if(!["official-family","neutral-collection",undefined].includes(f.familyKind)) errors.push(`Aile türü geçersiz: ${f.brand}/${f.slug}`);
}
const modelKeys=new Set();
for(const m of models){
  const mk=`${m.deviceType}/${m.brand}/${m.family}/${m.slug}`;
  if(modelKeys.has(mk)) errors.push(`Tekrarlanan model yolu: ${mk}`); else modelKeys.add(mk);
  const fk=`${m.deviceType}/${m.brand}/${m.family}`;
  if(!familyByKey.has(fk)) errors.push(`Model ailesi yok: ${fk}/${m.slug}`);
  if(!m.supportUrl?.startsWith("https://")||!m.manualUrl?.startsWith("https://")) errors.push(`Model resmî kaynağı eksik: ${m.brand}/${m.slug}`);
  if(/akakce\.com/i.test(`${m.supportUrl} ${m.manualUrl} ${m.productUrl||""}`)) errors.push(`Akakçe teknik/resmî kaynak olarak kullanılamaz: ${m.brand}/${m.slug}`);
  if(!m.modelCode?.trim()) errors.push(`Model kodu eksik: ${m.brand}/${m.slug}`);
  if(m.marketSource?.role!=="market-discovery-only"||!/akakce\.com/i.test(m.marketSource?.url||"")) errors.push(`Pazar keşif kaynağı/rolü eksik: ${m.brand}/${m.slug}`);
  if(!m.verifiedAt) errors.push(`Model doğrulama tarihi eksik: ${m.brand}/${m.slug}`);
  if((m.symptomClusters||[]).length<1) errors.push(`Model belirti kapsamı eksik: ${m.brand}/${m.slug}`);
  for(const c of m.symptomClusters||[]){
    if(!["low","medium","high"].includes(c.risk)) errors.push(`Belirti riski geçersiz: ${m.brand}/${m.slug}/${c.slug}`);
    if(!c.title||!c.summary||!c.stopWhen||!c.safety||!c.source?.url?.startsWith("https://")) errors.push(`Belirti bütünlüğü eksik: ${m.brand}/${m.slug}/${c.slug}`);
    if(/akakce\.com/i.test(c.source?.url||"")) errors.push(`Akakçe belirti kanıtı olarak kullanılamaz: ${m.brand}/${m.slug}/${c.slug}`);
    if(c.risk==="high"&&c.userCanTry!==false) errors.push(`Yüksek riskli belirti kullanıcı adımı yayımlayamaz: ${m.brand}/${m.slug}/${c.slug}`);
    if(c.risk!=="high"&&!(c.steps||[]).length) errors.push(`Düşük/orta riskli belirti adımı eksik: ${m.brand}/${m.slug}/${c.slug}`);
    const steps=(c.steps||[]).join(" ");
    if(/batarya paketini aç|bms.{0,20}(?:aç|sök)|kontrolcüyü (?:aç|sök)|elektronik kartı (?:aç|sök)|lehim|gaz (?:dolum|boşalt)|soğutucu devresini aç/i.test(steps)) errors.push(`Servis seviyesi işlem kullanıcı adımlarına sızmış: ${m.brand}/${m.slug}/${c.slug}`);
  }
  for(const s of m.softwareResources||[]) if(!s.url?.startsWith("https://")) errors.push(`Yazılım kaynağı geçersiz: ${m.brand}/${m.slug}`);
  if(!isModelIndexable(m)) errors.push(`Model indeks koşullarını karşılamıyor: ${m.brand}/${m.slug}`);
}
for(const i of issues){
  const mk=`${i.deviceType}/${i.brand}/${i.family}/${i.model}`;
  if(!modelByKey.has(mk)) errors.push(`Sorun modeli yok: ${i.title}`);
  if(!i.officialSource?.url?.startsWith("https://")) errors.push(`Sorun resmî kaynağı yok: ${i.title}`);
  if(!["low","medium","high"].includes(i.risk)) errors.push(`Risk seviyesi geçersiz: ${i.title}`);
  if(!i.safety||!i.stopWhen) errors.push(`Güvenlik sınırı eksik: ${i.title}`);
  if(i.risk==="high"&&i.userCanTry!==false) errors.push(`Yüksek riskli kayıtta DIY kapatılmalı: ${i.title}`);
  if(!(i.queryIntents||[]).length) errors.push(`Arama niyeti takma adı eksik: ${i.title}`);
  if(pathForIssue(i).split("/").filter(Boolean).length!==5) errors.push(`Sorun yolu hatalı: ${i.title}`);
  for(const a of i.communityAlternatives||[]){
    if(a.userSafe!==true) errors.push(`Topluluk yöntemi userSafe değil: ${i.title}`);
    if(a.serviceLevel===true||a.requiresOpening===true||a.electricalWork===true||a.highCurrent===true||a.refrigerant===true) errors.push(`Servis seviyesindeki topluluk yöntemi yayımlanamaz: ${i.title}`);
    if(i.risk==="high") errors.push(`Yüksek riskli kayıtta topluluk alternatifi olamaz: ${i.title}`);
    if(!a.method||!a.sourceLabel) errors.push(`Topluluk alternatifi kaynak/yöntem eksik: ${i.title}`);
  }
}
if(PROVINCES.length!==81) errors.push(`İl sayısı 81 değil: ${PROVINCES.length}`);
if(marketInventory.length!==deviceTypes.length) errors.push(`Pazar keşif kaydı kategori sayısıyla eşleşmiyor: ${marketInventory.length}/${deviceTypes.length}`);
for(const market of marketInventory)if(!/https:\/\/www\.akakce\.com\//.test(market.sourceUrl)||market.observedAt!=="2026-08-26")errors.push(`Pazar keşif kaydı geçersiz: ${market.deviceType}`);
if(indexableModels.length!==models.length) errors.push(`Yayın koşulunu karşılamayan model var: ${indexableModels.length}/${models.length}`);
if(indexableFamilies.length!==families.length) errors.push(`Modeli olmayan aile var: ${indexableFamilies.length}/${families.length}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log(`OK: ${deviceTypes.length} cihaz türü, ${brands.length} marka destek kaydı, ${families.length} doğrulanmış seri/aile, ${models.length} yayın koşulunu karşılayan tam model, ${models.reduce((n,m)=>n+m.symptomClusters.length,0)} belirti kümesi, ${issues.length} ayrı sorun rotası, ${PROVINCES.length} il.`);
