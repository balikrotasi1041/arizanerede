import {defineCatalog} from "./helpers.js";

const INK="https://www.akakce.com/murekkep-puskurtmeli-yazici.html";
const definitions=[
  {deviceType:"yazici",brand:"epson",familySlug:"ecotank",familyName:"EcoTank",familyKind:"official-family",marketSourceUrl:INK,catalogBasis:"Akakçe Türkiye pazar keşfi + Epson Türkiye ürün/destek/kılavuz/garanti ve servis kanalları",productUrl:"https://www.epson.com.tr/printers/ecotank",supportUrl:"https://www.epson.com.tr/support",manualUrl:"https://www.epson.com.tr/support",softwareUrl:"https://www.epson.com.tr/support",models:[
    {name:"EcoTank L6290",code:"L6290",productUrl:"https://www.epson.com.tr/printers/ecotank/business/ecotank-business-l6290-c11cj60404",supportUrl:"https://www.epson.eu/support/sc/epson-l6290/s/s1944",manualUrl:"https://www.epson.eu/support/sc/epson-l6290/s/s1944"},
    {name:"EcoTank L1250",code:"L1250",productUrl:"https://www.epson.com.tr/printers/ecotank/home/ecotank-home-l1250-c11cj71403",supportUrl:"https://www.epson.eu/support/sc/epson-l1250/s/s2067",manualUrl:"https://www.epson.eu/support/sc/epson-l1250/s/s2067"},
    {name:"EcoTank L5290",code:"L5290",productUrl:"https://www.epson.com.tr/printers/ecotank/business/ecotank-business-l5290-c11cj65405"},
    {name:"EcoTank L3210",code:"L3210",productUrl:"https://www.epson.com.tr/printers/ecotank/home/ecotank-home-l3210-c11cj68403"},
    {name:"EcoTank L3251",code:"L3251",productUrl:"https://www.epson.com.tr/discover/printers/ecotank-home"}
  ]},
  {deviceType:"yazici",brand:"canon",familySlug:"pixma",familyName:"PIXMA",familyKind:"official-family",marketSourceUrl:INK,catalogBasis:"Akakçe Türkiye pazar keşfi + Canon Türkiye resmî PIXMA ürün ve destek kanalları",productUrl:"https://www.canon.com.tr/printers/pixma-inkjet-printers/",supportUrl:"https://www.canon.com.tr/support/",manualUrl:"https://www.canon.com.tr/support/",softwareUrl:"https://www.canon.com.tr/support/",models:[
    {name:"PIXMA TR4650",code:"TR4650"},
    {name:"PIXMA E3640",code:"E3640"},
    {name:"PIXMA G5040",code:"G5040"},
    {name:"PIXMA G2470",code:"G2470"},
    {name:"PIXMA MG2551S",code:"MG2551S"}
  ]}
];
const built=definitions.map(defineCatalog);
export const printerExpansionFamilies=built.map(x=>x.family);
export const printerExpansionModels=built.flatMap(x=>x.models);
