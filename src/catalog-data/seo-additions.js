import {defineCatalog} from "./helpers.js";

const canonG3411=defineCatalog({
  deviceType:"yazici",
  brand:"canon",
  familySlug:"pixma",
  familyName:"PIXMA",
  familyKind:"official-family",
  marketSourceUrl:"https://www.akakce.com/murekkep-puskurtmeli-yazici.html",
  catalogBasis:"Search Console talebi + Canon Europe resmî ürün/uyumluluk envanteri; teknik hata kodu yalnız model kapsamı ayrıca doğrulanırsa yayımlanır",
  productUrl:"https://www.canon.com.tr/printers/pixma-inkjet-printers/",
  supportUrl:"https://www.canon.com.tr/support/",
  manualUrl:"https://www.canon.com.tr/support/",
  softwareUrl:"https://www.canon.com.tr/support/",
  models:[{
    name:"PIXMA G3411",
    code:"G3411",
    productUrl:"https://sfcc-service.canon-europe.com/ink-toner-paper/",
    supportUrl:"https://www.canon.com.tr/support/",
    manualUrl:"https://www.canon.com.tr/support/"
  }]
});

export const seoAdditionFamilies=[canonG3411.family];
export const seoAdditionModels=canonG3411.models;
