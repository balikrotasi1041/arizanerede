import * as base from "./data.js";
import { extraDeviceTypes, extraBrands, legalResources } from "./catalog-expansion.js";
import { scooterFamilies, scooterModels } from "./catalog-scooters.js";
import { marketBrands } from "./catalog-data/brands.js";
import { homeFamilies,homeModels } from "./catalog-data/home.js";
import { computingFamilies,computingModels } from "./catalog-data/computing.js";
import { displayPrintFamilies,displayPrintModels } from "./catalog-data/display-print.js";
import { climateMobilityFamilies,climateMobilityModels } from "./catalog-data/climate-mobility.js";
import { refreshBrands,refreshFamilies,refreshModels } from "./catalog-data/market-refresh-2026-08.js";
import { buildSymptomClusters,VERIFIED_AT } from "./catalog-data/helpers.js";
import { marketInventory,marketInventoryByDevice } from "./catalog-data/market.js";

function uniqueBy(items,keyFn){const map=new Map();for(const item of items)map.set(keyFn(item),item);return [...map.values()];}

export const deviceTypes=uniqueBy([...base.deviceTypes,...extraDeviceTypes],x=>x.slug);

const mergedBrands=new Map(base.brands.map(b=>[b.slug,{...b,catalogStatus:b.catalogStatus||"partial-verified",trustLevel:b.trustLevel||"brand-official"}]));
for(const extra of [...extraBrands,...marketBrands,...refreshBrands]){
  const current=mergedBrands.get(extra.slug);
  if(!current){mergedBrands.set(extra.slug,extra);continue;}
  mergedBrands.set(extra.slug,{
    ...current,
    ...extra,
    deviceTypes:[...new Set([...(current.deviceTypes||[]),...(extra.deviceTypes||[])])],
    catalogStatus: extra.catalogStatus||current.catalogStatus,
    trustLevel:"brand-official"
  });
}
export const brands=[...mergedBrands.values()];

const expandedFamilies=[...base.families,...scooterFamilies,...homeFamilies,...computingFamilies,...displayPrintFamilies,...climateMobilityFamilies,...refreshFamilies];
export const families=uniqueBy(expandedFamilies,x=>`${x.deviceType}/${x.brand}/${x.slug}`);
const expandedModels=[...base.models,...scooterModels,...homeModels,...computingModels,...displayPrintModels,...climateMobilityModels,...refreshModels];
export const models=uniqueBy(expandedModels.map(model=>{
  const sourceUrl=model.manualUrl||model.supportUrl||model.productUrl;
  const market=marketInventoryByDevice.get(model.deviceType);
  return {
    ...model,
    modelCode:model.modelCode||model.name,
    productUrl:model.productUrl||model.supportUrl,
    verifiedAt:model.verifiedAt||VERIFIED_AT,
    verificationLevel:model.verificationLevel||"official-model-source",
    marketSource:model.marketSource||(market?{label:"Akakçe Türkiye kategori envanteri keşfi",url:market.sourceUrl,role:"market-discovery-only"}:undefined),
    symptomClusters:model.symptomClusters?.length?model.symptomClusters:buildSymptomClusters(model.deviceType,sourceUrl,`${model.name} resmî kılavuz / destek`)
  };
}),x=>`${x.deviceType}/${x.brand}/${x.family}/${x.slug}`);
export const issues=base.issues;

export const SITE_ORIGIN=base.SITE_ORIGIN;
export const LAST_VERIFIED=base.LAST_VERIFIED;
export const SERBIS_URL=base.SERBIS_URL;
export const PROVINCES=base.PROVINCES;
export const escalationRoutes=base.escalationRoutes;
export const normalize=base.normalize;
export { legalResources,marketInventory,marketInventoryByDevice };

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
  return b.catalogStatus==="complete"||b.completeDeviceTypes?.includes(deviceType);
}

const httpsUrl=value=>typeof value==="string"&&value.startsWith("https://");
export function isModelIndexable(model){
  return model?.indexable!==false&&httpsUrl(model?.supportUrl)&&httpsUrl(model?.manualUrl)&&
    typeof model?.modelCode==="string"&&model.modelCode.trim().length>0&&
    typeof model?.verifiedAt==="string"&&(model.symptomClusters||[]).length>0&&
    model.symptomClusters.every(cluster=>cluster.title&&cluster.summary&&cluster.stopWhen&&cluster.safety&&httpsUrl(cluster.source?.url));
}
export const indexableModels=models.filter(isModelIndexable);
const indexableFamilyKeys=new Set(indexableModels.map(m=>`${m.deviceType}/${m.brand}/${m.family}`));
export function isFamilyIndexable(family){return indexableFamilyKeys.has(`${family.deviceType}/${family.brand}/${family.slug}`)}
export const indexableFamilies=families.filter(isFamilyIndexable);
const indexableBrandKeys=new Set(indexableModels.map(m=>`${m.deviceType}/${m.brand}`));
export function isBrandIndexable(deviceType,brand){return indexableBrandKeys.has(`${deviceType}/${brand}`)}

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
