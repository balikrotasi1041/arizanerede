import {
  SITE_ORIGIN,deviceTypes,brands,indexableFamilies,indexableModels,indexableIssues,
  indexableEditorialGuides,indexableServiceGuides,isBrandIndexable,
  pathForDeviceType,pathForBrand,pathForFamily,pathForModel,pathForIssue
} from "./catalog.js";

const UPDATED="2026-09-04";
const xmlEscape=value=>String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&apos;");
const unique=items=>[...new Set(items)];
const slugify=value=>String(value||"").toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");

const brandPaths=[];
for(const device of deviceTypes){
  for(const brand of brands.filter(item=>item.deviceTypes.includes(device.slug)&&isBrandIndexable(device.slug,item.slug))){
    brandPaths.push(pathForBrand(device.slug,brand.slug));
  }
}

export const sitemapGroups={
  hubs:unique([
    "/","/kaynak-politikasi/","/servis-garanti-haklari/",
    ...deviceTypes.map(pathForDeviceType),...brandPaths,...indexableFamilies.map(pathForFamily)
  ]),
  models:unique(indexableModels.map(pathForModel)),
  issues:unique(indexableIssues.map(pathForIssue)),
  guides:unique([
    ...indexableEditorialGuides.map(guide=>`/rehber/${guide.slug}/`),
    ...indexableServiceGuides.map(guide=>`/servis/${guide.slug}/`)
  ])
};

export const allIndexablePaths=unique(Object.values(sitemapGroups).flat());
const canonicalSet=new Set(allIndexablePaths);
const canonicalWithoutSlash=new Map(allIndexablePaths.filter(path=>path!=="/").map(path=>[path.replace(/\/$/,""),path]));

export function sitemapIndex(){
  const names=Object.keys(sitemapGroups);
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${names.map(name=>`<sitemap><loc>${SITE_ORIGIN}/sitemap-${name}.xml</loc><lastmod>${UPDATED}</lastmod></sitemap>`).join("")}</sitemapindex>`;
}

export function sitemapUrlset(name){
  const paths=sitemapGroups[name];
  if(!paths)return null;
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${SITE_ORIGIN}${xmlEscape(path)}</loc><lastmod>${UPDATED}</lastmod></url>`).join("")}</urlset>`;
}

export function canonicalRedirectFor(path){
  if(path==="/"||path.endsWith("/"))return null;
  return canonicalWithoutSlash.get(path)||null;
}

const legacyCandidates=new Map();
const ambiguous=new Set();
function addLegacy(from,to){
  if(canonicalSet.has(from))return;
  const existing=legacyCandidates.get(from);
  if(existing&&existing!==to){ambiguous.add(from);legacyCandidates.delete(from);return;}
  if(!ambiguous.has(from))legacyCandidates.set(from,to);
}

for(const model of indexableModels){
  const canonical=pathForModel(model);
  const aliases=new Set([model.slug,slugify(model.name),slugify(model.modelCode)]);
  for(const alias of aliases){
    if(!alias)continue;
    addLegacy(`/${model.deviceType}/${model.brand}/${alias}/`,canonical);
  }
}
for(const issue of indexableIssues){
  const canonical=pathForIssue(issue);
  const model=indexableModels.find(item=>item.deviceType===issue.deviceType&&item.brand===issue.brand&&item.family===issue.family&&item.slug===issue.model);
  if(!model)continue;
  const modelAliases=new Set([model.slug,slugify(model.name),slugify(model.modelCode)]);
  for(const alias of modelAliases){
    if(!alias)continue;
    addLegacy(`/${issue.deviceType}/${issue.brand}/${alias}/${issue.slug}/`,canonical);
  }
}

export function legacyRedirectFor(path){
  const withSlash=path.endsWith("/")?path:`${path}/`;
  return legacyCandidates.get(withSlash)||null;
}
