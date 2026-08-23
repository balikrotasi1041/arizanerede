import {
  deviceTypes, brands, families, models, issues, PROVINCES,
  deviceTypeBySlug, brandBySlug, familyByKey, modelByKey, pathForIssue
} from "../src/data.js";

const errors=[];
for(const d of deviceTypes){ if(!d.slug||!d.name) errors.push(`Cihaz türü eksik: ${JSON.stringify(d)}`); }
for(const b of brands){
  if(!b.serviceUrl?.startsWith("https://")) errors.push(`Servis kaynağı eksik: ${b.name}`);
  for(const d of b.deviceTypes||[]) if(!deviceTypeBySlug.has(d)) errors.push(`Marka cihaz türü yok: ${b.name}/${d}`);
}
for(const f of families){
  if(!deviceTypeBySlug.has(f.deviceType)) errors.push(`Aile cihaz türü yok: ${f.deviceType}/${f.slug}`);
  if(!brandBySlug.has(f.brand)) errors.push(`Aile markası yok: ${f.brand}/${f.slug}`);
  if(!brandBySlug.get(f.brand)?.deviceTypes.includes(f.deviceType)) errors.push(`Aile marka-cihaz eşleşmesi yok: ${f.brand}/${f.deviceType}`);
}
for(const m of models){
  const fk=`${m.deviceType}/${m.brand}/${m.family}`;
  if(!familyByKey.has(fk)) errors.push(`Model ailesi yok: ${fk}/${m.slug}`);
  if(!m.supportUrl?.startsWith("https://")||!m.manualUrl?.startsWith("https://")) errors.push(`Model resmî kaynağı eksik: ${m.brand}/${m.slug}`);
  for(const s of m.softwareResources||[]) if(!s.url?.startsWith("https://")) errors.push(`Yazılım kaynağı geçersiz: ${m.brand}/${m.slug}`);
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
}
if(PROVINCES.length!==81) errors.push(`İl sayısı 81 değil: ${PROVINCES.length}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log(`OK: ${deviceTypes.length} cihaz türü, ${brands.length} marka, ${families.length} seri/aile, ${models.length} tam model, ${issues.length} doğrulanmış sorun, ${PROVINCES.length} il.`);
