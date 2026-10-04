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

// Search Console 2026-09-20: only high-confidence historical 404s whose replacement
// model URL is still a canonical index target. Do not broaden this into catch-all redirects.
export const rescueRedirectEntries=[
  [
    "/dikey-supurge/dreame/r-ve-z-serileri/r20/",
    "/dikey-supurge/dreame/dikey-supurge-modelleri/r20/"
  ],
  [
    "/dikey-supurge/dyson/v-ve-gen5-serileri/v15-detect/",
    "/dikey-supurge/dyson/v15-serisi/v15-detect/"
  ],
  [
    "/dikey-supurge/philips/kablosuz-dikey-serileri/xc8057-01/",
    "/dikey-supurge/philips/kablosuz-dikey-supurge-modelleri/xc8057-01/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01m/gidon-bosluk/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01m/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01m/motor-guc-kesiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01m/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01m/uygulamaya-baglanmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01m/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01s/acilmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01s/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-02k/acilmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-02k/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-02k/gidon-bosluk/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-02k/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-02k/uygulamaya-baglanmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-02k/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03k/firmware-guncellenmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03k/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03m/acilmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03m/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03m/fren-zayif-veya-sesli/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03m/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/ekran-hata-kodu/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/fren-zayif-veya-sesli/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/gidon-bosluk/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/sarj-olmuyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-03p/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/mx-01/acilmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/mx-01/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/mx-01/firmware-guncellenmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/mx-01/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/mx-03/fren-zayif-veya-sesli/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/mx-03/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-007/firmware-guncellenmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-007/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-007/sarj-olmuyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-007/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-008/gidon-bosluk/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-008/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-008/uygulamaya-baglanmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-008/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-012-x-plus/uygulamaya-baglanmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-012-x-plus/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-012/ekran-hata-kodu/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-012/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-012/sarj-olmuyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-012/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-013-x-plus/firmware-guncellenmiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-013-x-plus/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-013-x-plus/lastik-hava-kaciriyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/ov-013-x-plus/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/rx-04/ekran-hata-kodu/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/rx-04/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/rx-06p/motor-guc-kesiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/rx-06p/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/rx-10/isik-veya-sinyal-calismiyor/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/rx-10/"
  ],
  [
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/sb-800/gidon-bosluk/",
    "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/sb-800/"
  ],
  [
    "/kahve-makinesi/philips/tam-otomatik-espresso/ep2331-10/su-akitiyor/",
    "/kahve-makinesi/philips/tam-otomatik-espresso/ep2331-10/"
  ],
  [
    "/robot-supurge/dreame/l-serisi/l40-ultra-ae/",
    "/robot-supurge/dreame/robot-supurge-modelleri/l40-ultra-ae/"
  ],
  [
    "/televizyon/onvo/google-whale-ve-android-tv/55vq90f3ua/",
    "/televizyon/onvo/televizyon-modelleri/55vq90f3ua/"
  ],
  [
    "/televizyon/sunny/webos-ve-qled/sn65fmn252/",
    "/televizyon/sunny/guncel-tv-modelleri/sn65fmn252/"
  ]
];
for(const [from,to] of rescueRedirectEntries){
  if(canonicalSet.has(from))throw new Error(`Kurtarma yönlendirmesi artık canonical olmuş: ${from}`);
  if(!canonicalSet.has(to))throw new Error(`Kurtarma yönlendirmesi hedefi canonical değil: ${from} -> ${to}`);
}
const rescueRedirects=new Map(rescueRedirectEntries);


const rescueWave2Candidates=[
  "/dikey-supurge/karaca/vantuz-ve-aquaclean/vantuz-power-up-pro/hava-yolu-tikali/",
  "/elektrikli-scooter/segway-ninebot/f-e-ve-max-serileri/e2-pro/isik-veya-sinyal-calismiyor/",
  "/dizustu-bilgisayar/casper/nirvana-ve-excalibur/excalibur-g915/wifi-baglanmiyor/",
  "/elektrikli-scooter/xiaomi/scooter-4-serisi/scooter-4-lite-2nd-gen/acilmiyor/",
  "/masaustu-bilgisayar/hp/pro-tower/pro-tower-400-g9/ses-yok/",
  "/klima/sunny/inverter-split/18000-btu-a-plus-plus/acilmiyor/",
  "/kahve-makinesi/bosch/verocafe-ve-verocup/tqu60307/acilmiyor/",
  "/yazici/xerox/phaser-ve-b-serileri/phaser-3020/yazdirmiyor/",
  "/dizustu-bilgisayar/dell/inspiron-ve-latitude/latitude-3550/ekran-gelmiyor/",
  "/dikey-supurge/fakir/inovator-ve-bolt/bolt-x-plus-aqua-8472/",
  "/televizyon/lg/oled-ve-qned/55qned86a/goruntu-yok-ses-var/",
  "/klima/baymak/elegant-prime/elegant-prime-12/isitmiyor/",
  "/yazici/hp/smart-tank-ve-laserjet-tank/smart-tank-580/hata-isiklari/",
  "/televizyon/samsung/neo-qled-ve-crystal-uhd/ue55du8000uxtk/hdmi-sinyal-yok/",
  "/elektrikli-scooter/onvo/elektrikli-scooter-modelleri/kx-01k/ekran-hata-kodu/",
  "/dikey-supurge/arcelik/imperium-go/sd-9361/cekis-gucu-dustu/",
  "/dikey-supurge/fakir/inovator-ve-bolt/inovator-7286/asiri-isiniyor/",
  "/dikey-supurge/dreame/r-ve-z-serileri/r20/pil-hizli-bitiyor/",
  "/klima/daikin/sensira-ve-shira/ftxp25n9/anormal-ses/",
  "/dizustu-bilgisayar/acer/aspire-ve-nitro/aspire-5-a515-58/fan-sesi/",
  "/dizustu-bilgisayar/casper/nirvana-ve-excalibur/nirvana-s100/ekran-gelmiyor/",
  "/kahve-makinesi/bosch/verocafe-ve-verocup/tis30321rw/kahve-vermiyor/",
  "/yazici/xerox/phaser-ve-b-serileri/phaser-3020/bos-sayfa/",
  "/klima/regal/rgl-serisi/rgl-18000-a/kumanda-calismiyor/",
  "/kahve-makinesi/bosch/verocafe-ve-verocup/tis30321rw/kirec-uyarisi/",
  "/dizustu-bilgisayar/dell/inspiron-ve-latitude/latitude-3550/pil-hizli-bitiyor/",
  "/klima/samsung/windfree/ar12txcaawk-sk/acilmiyor/",
  "/robot-supurge/homend/alex/alex-laser-1291h/",
  "/televizyon/vestel/4k-smart-tv/50ua9740/ses-yok-goruntu-var/",
  "/klima/grundig/g-serisi-inverter/gac-12003/wifi-baglanmiyor/",
  "/elektrikli-scooter/segway-ninebot/f-e-ve-max-serileri/f2-pro-ii/fren-zayif-veya-sesli/",
  "/klima/daikin/sensira-ve-shira/ftxp25n9/wifi-baglanmiyor/",
  "/dizustu-bilgisayar/hp/victus-ve-hp-laptop/hp-laptop-15-fd/acilmiyor/",
  "/dikey-supurge/homend/dustrider/dustrider-1271h/cekis-gucu-dustu/",
  "/robot-supurge/homend/alex/alex-50-pro/acilmiyor/",
  "/televizyon/sunny/webos-ve-qled/sn55qmn252/ekranda-cizgi-veya-leke/",
  "/kahve-makinesi/beko/espresso-ve-turk-kahvesi/tkm-8961-a/cezveyi-algilamiyor/",
  "/robot-supurge/homend/alex/alex-laser-1291h/istasyonu-bulamiyor/",
  "/yazici/pantum/p-ve-m-serileri/p2500w/yazdirmiyor/",
  "/elektrikli-scooter/segway-ninebot/f-e-ve-max-serileri/e2-pro/firmware-guncellenmiyor/"
];
function resolveHistoricalModelPath(path){
  const segments=path.split("/").filter(Boolean);
  if(segments.length!==4&&segments.length!==5)return null;
  const [device,brand,,modelAlias,issueAlias]=segments;
  if(issueAlias){
    const familylessIssue=`/${device}/${brand}/${modelAlias}/${issueAlias}/`;
    const issueTarget=legacyCandidates.get(familylessIssue);
    if(issueTarget)return issueTarget;
  }
  const familylessModel=`/${device}/${brand}/${modelAlias}/`;
  return canonicalSet.has(familylessModel)?familylessModel:(legacyCandidates.get(familylessModel)||null);
}
export const rescueWave2Entries=rescueWave2Candidates.map(from=>[from,resolveHistoricalModelPath(from)]);
const unresolvedWave2=rescueWave2Entries.filter(([,to])=>!to);
if(unresolvedWave2.length)throw new Error(`Kurtarma 2. dalga çözülemeyen URL'ler: ${unresolvedWave2.map(([from])=>from).join(", ")}`);
for(const [from,to] of rescueWave2Entries){
  if(canonicalSet.has(from))throw new Error(`Kurtarma 2. dalga URL artık canonical: ${from}`);
  if(!canonicalSet.has(to))throw new Error(`Kurtarma 2. dalga hedef canonical değil: ${from} -> ${to}`);
  rescueRedirects.set(from,to);
}

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
  return rescueRedirects.get(withSlash)||legacyCandidates.get(withSlash)||null;
}
