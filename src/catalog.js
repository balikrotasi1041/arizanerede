import * as base from "./data.js";
import { extraDeviceTypes, extraBrands, legalResources } from "./catalog-expansion.js";

function uniqueBy(items,keyFn){const map=new Map();for(const item of items)map.set(keyFn(item),item);return [...map.values()];}

export const deviceTypes=uniqueBy([...base.deviceTypes,...extraDeviceTypes],x=>x.slug);

const mergedBrands=new Map(base.brands.map(b=>[b.slug,{...b,catalogStatus:b.catalogStatus||"partial-verified",trustLevel:b.trustLevel||"brand-official"}]));
for(const extra of extraBrands){
  const current=mergedBrands.get(extra.slug);
  if(!current){mergedBrands.set(extra.slug,extra);continue;}
  mergedBrands.set(extra.slug,{
    ...current,
    ...extra,
    deviceTypes:[...new Set([...(current.deviceTypes||[]),...(extra.deviceTypes||[])])],
    catalogStatus: current.catalogStatus==="complete"?"complete":(extra.catalogStatus||current.catalogStatus),
    trustLevel:"brand-official"
  });
}
export const brands=[...mergedBrands.values()];

// Yeni kategorilerde seri/model ağacı ancak marka-kategori kataloğu tamamlandığında yayımlanır.
// Bu nedenle mevcut doğrulanmış seri/model/sorun kayıtları korunur, support-only markalarda hayalî aile/model üretilmez.
export const families=base.families;
export const models=base.models;
export const issues=base.issues;

export const SITE_ORIGIN=base.SITE_ORIGIN;
export const LAST_VERIFIED=base.LAST_VERIFIED;
export const SERBIS_URL=base.SERBIS_URL;
export const PROVINCES=base.PROVINCES;
export const escalationRoutes=base.escalationRoutes;
export const normalize=base.normalize;
export { legalResources };

export const deviceTypeBySlug=new Map(deviceTypes.map(x=>[x.slug,x]));
export const brandBySlug=new Map(brands.map(x=>[x.slug,x]));
export const familyByKey=new Map(families.map(x=>[`${x.deviceType}/${x.brand}/${x.slug}`,x]));
export const modelByKey=new Map(models.map(x=>[`${x.deviceType}/${x.brand}/${x.family}/${x.slug}`,x]));
export const issueByKey=new Map(issues.map(x=>[`${x.deviceType}/${x.brand}/${x.family}/${x.model}/${x.slug}`,x]));

export const pathForDeviceType=base.pathForDeviceType;
export const pathForBrand=base.pathForBrand;
export const pathForFamily=base.pathForFamily;
export const pathForModel=base.pathForModel;
export const pathForIssue=base.pathForIssue;

export function isCatalogComplete(deviceType,brand){
  const b=brandBySlug.get(brand);
  if(!b||!b.deviceTypes?.includes(deviceType))return false;
  return b.catalogStatus==="complete";
}

export function supportLinksForBrand(brand){
  return [
    ["Resmî marka sitesi",brand.officialTurkey],
    ["Resmî ürün kataloğu",brand.officialCatalogUrl],
    ["Destek merkezi",brand.supportUrl],
    ["Kılavuz / belgeler",brand.manualUrl],
    ["Sürücü / yazılım / firmware",brand.softwareUrl],
    ["Yetkili servis / onarım",brand.serviceUrl],
    ["Garanti",brand.warrantyUrl]
  ].filter(([,url])=>typeof url==="string"&&url.startsWith("https://"));
}
