import {defineCatalog} from "./helpers.js";

const ROBOT="https://www.akakce.com/robot-supurge.html";
const ESPRESSO="https://www.akakce.com/espresso-makinesi.html";
const INK="https://www.akakce.com/murekkep-puskurtmeli-yazici.html";

const definitions=[
  {deviceType:"robot-supurge",brand:"roborock",familySlug:"qrevo-l",familyName:"Qrevo L",familyKind:"official-family",marketSourceUrl:ROBOT,catalogBasis:"Akakçe Türkiye pazar keşfi + Roborock Türkiye resmî ürün ve destek kanalları",productUrl:"https://tr.roborock.com/pages/roborock-qrevo-l-pro",supportUrl:"https://support.roborock.com/hc/en-us",manualUrl:"https://support.roborock.com/hc/en-us",softwareUrl:"https://help.roborock.com/",models:[{name:"Qrevo L Pro",code:"Qrevo L Pro",productUrl:"https://tr.roborock.com/pages/roborock-qrevo-l-pro",supportUrl:"https://support.roborock.com/hc/en-us",manualUrl:"https://support.roborock.com/hc/en-us"}]},
  {deviceType:"kahve-makinesi",brand:"delonghi",familySlug:"magnifica-s",familyName:"Magnifica S",familyKind:"official-family",marketSourceUrl:ESPRESSO,catalogBasis:"Akakçe Türkiye pazar keşfi + De'Longhi resmî model destek/kılavuz kanalları",productUrl:"https://www.delonghi.com/en-my/s/ECAM22.110.B",supportUrl:"https://www.delonghi.com/en-my/s/ECAM22.110.B",manualUrl:"https://www.delonghi.com/en-my/s/ECAM22.110.B",models:[{name:"Magnifica S ECAM22.110.B",code:"ECAM22.110.B",productUrl:"https://www.delonghi.com/en-my/s/ECAM22.110.B",supportUrl:"https://www.delonghi.com/en-my/s/ECAM22.110.B",manualUrl:"https://www.delonghi.com/en-my/s/ECAM22.110.B"}]},
  {deviceType:"yazici",brand:"canon",familySlug:"maxify-gx",familyName:"MAXIFY GX",familyKind:"official-family",marketSourceUrl:INK,catalogBasis:"Akakçe Türkiye pazar keşfi + Canon resmî MAXIFY ürün/destek kanalları",productUrl:"https://www.canon.com.tr/printers/",supportUrl:"https://www.canon.com.tr/support/",manualUrl:"https://www.canon.com.tr/support/",softwareUrl:"https://www.canon.com.tr/support/",models:[{name:"MAXIFY GX4040",code:"GX4040",productUrl:"https://tst-sfcc-service.canon-europe.com/5779C009/5779C009.html",supportUrl:"https://www.canon.com.tr/support/",manualUrl:"https://www.canon.com.tr/support/"}]}
];

const built=definitions.map(defineCatalog);
export const dailySeptember19Families=built.map(x=>x.family);
export const dailySeptember19Models=built.flatMap(x=>x.models);
export const dailySeptember19Screening={observedAt:"2026-09-19",acceptedThisBatch:3,categories:["robot-supurge","kahve-makinesi","yazici"],standaloneIssueUrlsCreated:0,policy:"Sorunlar model sayfasında tutulur; yeni bağımsız sorun/ariza/hata URL'si üretilmez.",held:[{name:"Epson EcoTank L3256",reason:"L3250/L3251 ailesine yakın varyant konumlandırması nedeniyle bu turda ayrı model olarak çoğaltılmadı."},{name:"Roborock Qrevo L",reason:"Qrevo L Pro ile aynı turda aile varyantı çoğaltmamak ve model-seviyesi resmî doğrulamayı ayrı tutmak için bekletildi."}]};
