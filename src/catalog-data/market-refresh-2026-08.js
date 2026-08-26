import {defineCatalog} from "./helpers.js";

// 26 Ağustos 2026 Akakçe kategori taramasında öne çıkan kayıtlar burada
// tekilleştirilir. Akakçe yalnızca pazar keşif kaynağıdır; teknik kaynakların
// tamamı üretici alan adlarına aittir.
const ROBOT="https://www.akakce.com/robot-supurge.html";
const STICK="https://www.akakce.com/dikey-supurge.html";
const ESPRESSO="https://www.akakce.com/espresso-makinesi.html";
const FILTER="https://www.akakce.com/filtre-kahve-makinesi.html";
const TURKISH="https://www.akakce.com/turk-kahve-makinesi.html";
const LAPTOP="https://www.akakce.com/laptop-notebook.html";
const DESKTOP="https://www.akakce.com/bilgisayar-masaustu.html";
const TV="https://www.akakce.com/televizyon.html";
const LASER="https://www.akakce.com/lazer-yazici.html";
const INK="https://www.akakce.com/murekkep-puskurtmeli-yazici.html";
const SCOOTER="https://www.akakce.com/elektrikli-scooter.html";

export const refreshBrands=[
  {
    slug:"siemens",name:"Siemens",deviceTypes:["dikey-supurge"],catalogStatus:"verified-models",trustLevel:"brand-official",
    officialTurkey:"https://www.siemens-home.bsh-group.com/tr/tr/",officialCatalogUrl:"https://www.siemens-home.bsh-group.com/tr/tr/category/elektrikli-supurgeler",
    supportUrl:"https://www.siemens-home.bsh-group.com/tr/tr/services",manualUrl:"https://www.siemens-home.bsh-group.com/tr/tr/services",
    serviceUrl:"https://www.siemens-home.bsh-group.com/tr/tr/services",serviceMode:"official-contact",
    serviceSummary:"Siemens ürün, kılavuz ve onarım yönlendirmesi yalnızca Siemens Ev Aletleri Türkiye'nin model servis sayfalarından alınır."
  }
];

const definitions=[
  {
    deviceType:"robot-supurge",brand:"roborock",familySlug:"robot-supurge-modelleri",familyName:"Robot Süpürge Modelleri",marketSourceUrl:ROBOT,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Roborock Türkiye/Global resmî ürün ve destek sayfaları",
    productUrl:"https://tr.roborock.com/pages/robot-vacuums",supportUrl:"https://help.roborock.com/",manualUrl:"https://support.roborock.com/",softwareUrl:"https://help.roborock.com/",
    models:[
      {name:"Saros 20 Sonic",code:"Saros 20 Sonic",productUrl:"https://global.roborock.com/pages/roborock-saros-20-sonic"},
      {name:"Saros 20",code:"Saros 20",productUrl:"https://global.roborock.com/pages/roborock-saros-20"},
      {name:"Qrevo L Pro",code:"Qrevo L Pro",productUrl:"https://tr.roborock.com/pages/roborock-qrevo-l-pro"},
      {name:"Qrevo C Pro",code:"Qrevo C Pro",productUrl:"https://tr.roborock.com/pages/roborock-qrevo-c-pro"},
      {name:"Qrevo Edge 2 Pro",code:"Qrevo Edge 2 Pro",productUrl:"https://global.roborock.com/pages/roborock-qrevo-edge-2-pro"},
      {name:"Qrevo Curv 2 Pro",code:"Qrevo Curv 2 Pro",productUrl:"https://global.roborock.com/pages/roborock-qrevo-curv-2-pro"},
      {name:"Qrevo Curv 2 Flow",code:"Qrevo Curv 2 Flow",productUrl:"https://tr.roborock.com/pages/roborock-qrevo-curv-2-flow"},
      {name:"Qrevo CurvX",code:"Qrevo CurvX",productUrl:"https://global.roborock.com/pages/roborock-qrevo-curv-series"}
    ]
  },
  {
    deviceType:"robot-supurge",brand:"dreame",familySlug:"robot-supurge-modelleri",familyName:"Robot Süpürge Modelleri",marketSourceUrl:ROBOT,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Dreame Türkiye ürün ve Kullanım/Destek Bilgileri",
    productUrl:"https://dreametech.com.tr/collections/robot-vacuums",supportUrl:"https://dreametech.com.tr/pages/dreametr-serviceinfo",manualUrl:"https://dreametech.com.tr/pages/dreametr-serviceinfo",softwareUrl:"https://dreametech.com.tr/pages/product-support",
    models:[{name:"L50 Ultra CE",code:"L50 Ultra CE",productUrl:"https://dreametech.com.tr/products/dreame-l50-ultra-ce-robot-supurge"}]
  },
  {
    deviceType:"robot-supurge",brand:"xiaomi",familySlug:"robot-vacuum",familyName:"Robot Vacuum",familyKind:"official-family",marketSourceUrl:ROBOT,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Xiaomi resmî ürün, teknik özellik ve Türkiye destek sayfaları",
    productUrl:"https://www.mi.com/global/product-list/vacuum-cleaner/robot-vacuum/",supportUrl:"https://www.mi.com/tr/support/",manualUrl:"https://www.mi.com/tr/support/user-guide/",softwareUrl:"https://www.mi.com/tr/support/",
    models:[{name:"Robot Vacuum H50 Pro",code:"H50 Pro",productUrl:"https://www.mi.com/global/product/xiaomi-robot-vacuum-h50-pro/",manualUrl:"https://www.mi.com/global/product/xiaomi-robot-vacuum-h50-pro/specs/"}]
  },
  {
    deviceType:"dikey-supurge",brand:"dyson",familySlug:"kablosuz-dikey-supurge-modelleri",familyName:"Kablosuz Dikey Süpürge Modelleri",marketSourceUrl:STICK,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Dyson Türkiye ürün sahibi/kılavuz sayfası",
    productUrl:"https://www.dyson.com.tr/products/floor-cleaners/wet/pencilwash",supportUrl:"https://www.dyson.com.tr/products/floor-cleaners/wet/pencilwash/destek-bilgileri",manualUrl:"https://www.dyson.com.tr/products/floor-cleaners/wet/pencilwash/destek-bilgileri",
    models:[{name:"PencilWash Islak Zemin Temizleyici",code:"PencilWash"}]
  },
  {
    deviceType:"dikey-supurge",brand:"philips",familySlug:"kablosuz-dikey-supurge-modelleri",familyName:"Kablosuz Dikey Süpürge Modelleri",marketSourceUrl:STICK,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Philips Türkiye model ürün/destek sayfası",
    productUrl:"https://www.philips.com.tr/c-p/XC8057_01/8000-serisi-kablosuz-elektrikli-suepuerge-aqua-plus",supportUrl:"https://www.philips.com.tr/c-w/support-home.html",manualUrl:"https://www.philips.com.tr/c-w/support-home.html",
    models:[{name:"Aqua Plus 8000 Serisi XC8057/01",code:"XC8057/01",manualUrl:"https://www.philips.com.tr/c-p/XC8057_01/8000-serisi-kablosuz-elektrikli-suepuerge-aqua-plus/destek"}]
  },
  {
    deviceType:"dikey-supurge",brand:"siemens",familySlug:"iq500",familyName:"iQ500",familyKind:"official-family",marketSourceUrl:STICK,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Siemens Türkiye ürün, kılavuz ve model servis sayfaları",
    productUrl:"https://www.siemens-home.bsh-group.com/tr/tr/category/elektrikli-supurgeler",supportUrl:"https://www.siemens-home.bsh-group.com/tr/tr/services",manualUrl:"https://www.siemens-home.bsh-group.com/tr/tr/services",
    models:[
      {name:"iQ500 VSM120HYG Islak ve Kuru Şarjlı Süpürge",code:"VSM120HYG",productUrl:"https://www.siemens-home.bsh-group.com/tr/tr/product/elektrikli-supurgeler/sarjli-supurgeler/VSM120HYG",supportUrl:"https://www.siemens-home.bsh-group.com/tr/tr/productservice/VSM120HYG-01",manualUrl:"https://www.siemens-home.bsh-group.com/tr/tr/productservice/VSM120HYG-01"},
      {name:"iQ500 VSM120XXL Şarjlı Süpürge",code:"VSM120XXL",productUrl:"https://www.siemens-home.bsh-group.com/tr/tr/product/elektrikli-supurgeler/sarjli-supurgeler/VSM120XXL"},
      {name:"iQ500 VSM120B Şarjlı Süpürge",code:"VSM120B",supportUrl:"https://www.siemens-home.bsh-group.com/tr/tr/productservice/VSM120B-04",manualUrl:"https://www.siemens-home.bsh-group.com/tr/tr/productservice/VSM120B-04"}
    ]
  },
  {
    deviceType:"kahve-makinesi",brand:"philips",familySlug:"tam-otomatik-espresso",familyName:"Tam Otomatik Espresso Makineleri",marketSourceUrl:ESPRESSO,
    catalogBasis:"Akakçe 2026-08-26 espresso taraması + Philips Türkiye ürün ve model destek sayfaları",productUrl:"https://www.philips.com.tr/c-p/EP5543_80/-",supportUrl:"https://www.philips.com.tr/c-w/support-home.html",manualUrl:"https://www.philips.com.tr/c-w/support-home.html",
    models:[
      {name:"5500 Serisi LatteGo EP5543/80",code:"EP5543/80",productUrl:"https://www.philips.com.tr/c-p/EP5543_80/-",manualUrl:"https://www.philips.com.tr/c-p/EP5543_80/-/destek"},
      {name:"3300 Serisi LatteGo EP3347/90",code:"EP3347/90",productUrl:"https://www.philips.com.tr/c-p/EP3347_90/-",manualUrl:"https://www.philips.com.tr/c-p/EP3347_90/-/destek"},
      {name:"Café Aromis 8000 Serisi EP8757/20",code:"EP8757/20",productUrl:"https://www.philips.com.tr/c-p/EP8757_20/-",manualUrl:"https://www.philips.com.tr/c-p/EP8757_20/-/destek"}
    ]
  },
  {
    deviceType:"kahve-makinesi",brand:"philips",familySlug:"baristina",familyName:"Baristina",familyKind:"official-family",marketSourceUrl:ESPRESSO,
    catalogBasis:"Akakçe 2026-08-26 espresso taraması + Philips Baristina resmî ürün/destek sayfası",productUrl:"https://www.philips.com.tr/c-p/BAR300_03/baristina-espresso-machine",supportUrl:"https://www.philips.com.tr/c-p/BAR300_03/baristina-espresso-machine/destek",manualUrl:"https://www.philips.com.tr/c-p/BAR300_03/baristina-espresso-machine/destek",
    models:[{name:"Baristina BAR300/03",code:"BAR300/03"}]
  },
  {
    deviceType:"kahve-makinesi",brand:"philips",familySlug:"5400-series",familyName:"5400 Series",familyKind:"official-family",marketSourceUrl:ESPRESSO,
    catalogBasis:"Akakçe espresso taraması + Philips Türkiye 5400 Serisi resmî ürün/destek sayfası",productUrl:"https://www.philips.com.tr/c-p/EP5447_90/philips-5400-series-tam-otomatik-espresso-makineleri",supportUrl:"https://www.philips.com.tr/c-w/support-home.html",manualUrl:"https://www.philips.com.tr/c-p/EP5447_90/philips-5400-series-tam-otomatik-espresso-makineleri/destek",
    models:[{name:"5400 Serisi LatteGo EP5447/90",code:"EP5447/90"}]
  },
  {
    deviceType:"kahve-makinesi",brand:"delonghi",familySlug:"espresso-makineleri",familyName:"Espresso Makineleri",marketSourceUrl:ESPRESSO,
    catalogBasis:"Akakçe 2026-08-26 espresso taraması + De'Longhi resmî ürün/kılavuz merkezi",productUrl:"https://www.delonghi.com/tr-tr/kahve/kahve-makineleri/c/coffee_makers",supportUrl:"https://www.delonghi.com/tr-tr/contact-us",manualUrl:"https://www.delonghi.com/tr-tr/manuals",
    models:[{name:"Magnifica Evo Next ECAM310.80.SB",code:"ECAM310.80.SB",productUrl:"https://www.delonghi.com/en-us/p/magnifica-evo-next-magnifica-evo-next-espresso-machine/ECAM31080SB.html"}]
  },
  {
    deviceType:"kahve-makinesi",brand:"bosch",familySlug:"filtre-kahve-makineleri",familyName:"Filtre Kahve Makineleri",marketSourceUrl:FILTER,
    catalogBasis:"Akakçe 2026-08-26 filtre kahve taraması + Bosch Türkiye ürün, kılavuz ve yetkili servis sayfaları",productUrl:"https://www.bosch-home.com.tr/tr/category/kahve-makineleri/filtre-kahve-makineleri",supportUrl:"https://www.bosch-home.com.tr/musteri-hizmetleri",manualUrl:"https://www.bosch-home.com.tr/musteri-hizmetleri/kullanim-kilavuzlari",
    models:[
      {name:"MyMoment TKA6M273",code:"TKA6M273",productUrl:"https://www.bosch-home.com.tr/tr/product/kahve-makineleri/filtre-kahve-makineleri/TKA6M273",manualUrl:"https://www.bosch-home.com.tr/tr/product/kahve-makineleri/filtre-kahve-makineleri/TKA6M273"},
      {name:"MyMoment TKA4M233",code:"TKA4M233",productUrl:"https://www.bosch-home.com.tr/tr/product/kahve-makineleri/filtre-kahve-makineleri/TKA4M233",manualUrl:"https://www.bosch-home.com.tr/tr/product/kahve-makineleri/filtre-kahve-makineleri/TKA4M233"}
    ]
  },
  {
    deviceType:"kahve-makinesi",brand:"arcelik",familySlug:"turk-kahve-makineleri",familyName:"Türk Kahve Makineleri",marketSourceUrl:TURKISH,
    catalogBasis:"Akakçe 2026-08-26 Türk kahvesi taraması + Arçelik Türkiye ürün/kılavuz ve yetkili servis sistemi",productUrl:"https://www.arcelik.com.tr/turk-kahve-makinesi",supportUrl:"https://www.arcelik.com.tr/destek",manualUrl:"https://www.arcelik.com.tr/destek/kullanim-kilavuzu",
    models:[{name:"Telve TKM 9961",code:"TKM 9961"},{name:"Telve-X TKM 3341",code:"TKM 3341"},{name:"Telve-X Sütlü TKM 6448",code:"TKM 6448"}]
  },
  {
    deviceType:"kahve-makinesi",brand:"arzum",familySlug:"okka",familyName:"OKKA",familyKind:"official-family",marketSourceUrl:TURKISH,
    catalogBasis:"Akakçe 2026-08-26 Türk kahvesi taraması + Arzum OKKA ürün/kılavuz ve yetkili servis sistemi",productUrl:"https://www.arzum.com.tr/okka",supportUrl:"https://destek.arzum.com.tr/",manualUrl:"https://destek.arzum.com.tr/kullanim-kilavuzlari",
    models:[{name:"OKKA Minio OK004",code:"OK004"},{name:"OKKA Minio Duo OK006",code:"OK006"},{name:"OKKA Minio Pro OK0010",code:"OK0010"},{name:"OKKA Rich Spin Pro OK0020",code:"OK0020"}]
  },
  {
    deviceType:"kahve-makinesi",brand:"grundig",familySlug:"turk-kahve-makineleri",familyName:"Türk Kahve Makineleri",marketSourceUrl:TURKISH,
    catalogBasis:"Akakçe 2026-08-26 Türk kahvesi taraması + Grundig Türkiye ürün/destek sistemi",productUrl:"https://www.grundig.com.tr/turk-kahve-makinesi",supportUrl:"https://www.grundig.com.tr/destek",manualUrl:"https://www.grundig.com.tr/destek",
    models:[{name:"TCM 7061 D",code:"TCM 7061 D"},{name:"TCM 7061 ST",code:"TCM 7061 ST"},{name:"TKM 1551 S",code:"TKM 1551 S"}]
  },
  {
    deviceType:"dizustu-bilgisayar",brand:"apple",familySlug:"macbook-neo",familyName:"MacBook Neo",familyKind:"official-family",marketSourceUrl:LAPTOP,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Apple Türkiye ürün, teknik özellik ve başlangıç kılavuzu",productUrl:"https://www.apple.com/tr/macbook-neo/",supportUrl:"https://support.apple.com/tr-tr/docs/mac/301292",manualUrl:"https://support.apple.com/tr-tr/guide/macbook-neo/welcome/mac",softwareUrl:"https://support.apple.com/tr-tr/macos",
    models:[{name:"MacBook Neo 13 inç (A18 Pro)",code:"MacBook Neo 13 A18 Pro"}]
  },
  {
    deviceType:"dizustu-bilgisayar",brand:"lenovo",familySlug:"dizustu-modelleri",familyName:"Dizüstü Bilgisayar Modelleri",marketSourceUrl:LAPTOP,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + Lenovo Türkiye ürün/model destek portalı",productUrl:"https://www.lenovo.com/tr/tr/laptops/",supportUrl:"https://support.lenovo.com/tr/tr/",manualUrl:"https://support.lenovo.com/tr/tr/",softwareUrl:"https://support.lenovo.com/tr/tr/",
    models:[{name:"IdeaPad Slim 3 15ARP10 83K70098TR",code:"83K70098TR"}]
  },
  {
    deviceType:"dizustu-bilgisayar",brand:"hp",familySlug:"dizustu-modelleri",familyName:"Dizüstü Bilgisayar Modelleri",marketSourceUrl:LAPTOP,
    catalogBasis:"Akakçe 2026-08-26 pazar taraması + HP Türkiye ürün kodu destek/sürücü portalı",productUrl:"https://www.hp.com/tr-tr/shop/list.aspx?fc_ptyp_laptops=1",supportUrl:"https://support.hp.com/tr-tr/",manualUrl:"https://support.hp.com/tr-tr/",softwareUrl:"https://support.hp.com/tr-tr/drivers",
    models:[{name:"HP 255R G10 D30M3ET",code:"D30M3ET"}]
  },
  {
    deviceType:"masaustu-bilgisayar",brand:"lenovo",familySlug:"thinkcentre",familyName:"ThinkCentre",familyKind:"official-family",marketSourceUrl:DESKTOP,
    catalogBasis:"Akakçe 2026-08-26 marka masaüstü taraması + Lenovo Türkiye ürün/model destek portalı",productUrl:"https://www.lenovo.com/tr/tr/desktops/",supportUrl:"https://support.lenovo.com/tr/tr/",manualUrl:"https://support.lenovo.com/tr/tr/",softwareUrl:"https://support.lenovo.com/tr/tr/",
    models:[{name:"ThinkCentre Neo 50t 12UAS1CF00",code:"12UAS1CF00"}]
  },
  {
    deviceType:"televizyon",brand:"samsung",familySlug:"televizyon-modelleri",familyName:"Televizyon Modelleri",marketSourceUrl:TV,
    catalogBasis:"Akakçe 2026-08-26 TV taraması + Samsung Türkiye 2026 model ürün/destek/kılavuz sayfaları",productUrl:"https://www.samsung.com/tr/tvs/all-tvs/",supportUrl:"https://www.samsung.com/tr/support/",manualUrl:"https://www.samsung.com/tr/support/user-manuals-and-guide/",softwareUrl:"https://www.samsung.com/tr/support/",
    models:[
      {name:"Mini LED 65M70H",code:"UE65M70HAUXTK",productUrl:"https://www.samsung.com/tr/tvs/mini-led-tv/m70h-65-inch-4k-smart-tv-ue65m70hauxtk/",supportUrl:"https://www.samsung.com/tr/support/model/UE65M70HAUXTK/",manualUrl:"https://www.samsung.com/tr/support/model/UE65M70HAUXTK/"},
      {name:"Mini LED 75M70H",code:"UE75M70HAUXTK",supportUrl:"https://www.samsung.com/tr/support/model/UE75M70HAUXTK/",manualUrl:"https://www.samsung.com/tr/support/model/UE75M70HAUXTK/"}
    ]
  },
  {
    deviceType:"televizyon",brand:"lg",familySlug:"televizyon-modelleri",familyName:"Televizyon Modelleri",marketSourceUrl:TV,
    catalogBasis:"Akakçe 2026-08-26 TV taraması + LG Türkiye 2026 ürün/model destek sayfası",productUrl:"https://www.lg.com/tr/tv-soundbar/",supportUrl:"https://www.lg.com/tr/destek/",manualUrl:"https://www.lg.com/tr/destek/product-support/manuals-software/",softwareUrl:"https://www.lg.com/tr/destek/product-support/manuals-software/",
    models:[{name:"QNED evo AI 65QNED87B6A",code:"65QNED87B6A",productUrl:"https://www.lg.com/tr/tv-soundbar/qned-evo/65qned87b6a/"}]
  },
  {
    deviceType:"televizyon",brand:"tcl",familySlug:"televizyon-modelleri",familyName:"Televizyon Modelleri",marketSourceUrl:TV,
    catalogBasis:"Akakçe 2026-08-26 TV taraması + TCL resmî ürün/model destek sayfası",productUrl:"https://www.tcl.com/tr/tr/tvs",supportUrl:"https://www.tcl.com/tr/tr/support-tv",manualUrl:"https://www.tcl.com/tr/tr/support-tv",softwareUrl:"https://www.tcl.com/tr/tr/support-tv",
    models:[{name:"50T6C",code:"50T6C",productUrl:"https://www.tcl.com/de/de/tvs/50t6c",supportUrl:"https://www.tcl.com/eastafrica/en/support-tv/model/50t6c",manualUrl:"https://www.tcl.com/eastafrica/en/support-tv/model/50t6c"}]
  },
  {
    deviceType:"yazici",brand:"canon",familySlug:"i-sensys",familyName:"i-SENSYS",familyKind:"official-family",marketSourceUrl:LASER,
    catalogBasis:"Akakçe 2026-08-26 lazer taraması + Canon Türkiye ürün/model destek ve indirme portalı",productUrl:"https://www.canon.com.tr/business/products/office-printers/",supportUrl:"https://www.canon.com.tr/support/",manualUrl:"https://www.canon.com.tr/support/",softwareUrl:"https://www.canon.com.tr/support/",
    models:["i-SENSYS LBP6030B","i-SENSYS LBP243dw","i-SENSYS LBP646Cdw","i-SENSYS MF752Cdw","i-SENSYS MF3010"]
  },
  {
    deviceType:"yazici",brand:"canon",familySlug:"pixma",familyName:"PIXMA",familyKind:"official-family",marketSourceUrl:INK,
    catalogBasis:"Akakçe 2026-08-26 mürekkep püskürtmeli taraması + Canon Türkiye ürün/model destek portalı",productUrl:"https://www.canon.com.tr/printers/pixma-inkjet-printers/",supportUrl:"https://www.canon.com.tr/support/",manualUrl:"https://www.canon.com.tr/support/",softwareUrl:"https://www.canon.com.tr/support/",
    models:["PIXMA G3480","PIXMA E414","PIXMA E3640","PIXMA G2470","PIXMA MG2551S"]
  },
  {
    deviceType:"yazici",brand:"canon",familySlug:"maxify",familyName:"MAXIFY",familyKind:"official-family",marketSourceUrl:INK,
    catalogBasis:"Akakçe 2026-08-26 mürekkep püskürtmeli taraması + Canon Türkiye iş yazıcısı ve destek portalı",productUrl:"https://www.canon.com.tr/business/products/office-printers/",supportUrl:"https://www.canon.com.tr/support/",manualUrl:"https://www.canon.com.tr/support/",softwareUrl:"https://www.canon.com.tr/support/",
    models:["MAXIFY GX7140"]
  },
  {
    deviceType:"yazici",brand:"epson",familySlug:"ecotank",familyName:"EcoTank",familyKind:"official-family",marketSourceUrl:INK,
    catalogBasis:"Akakçe 2026-08-26 mürekkep püskürtmeli taraması + Epson Türkiye ürün, sürücü ve servis portalı",productUrl:"https://www.epson.com.tr/discover/printers/ecotank",supportUrl:"https://www.epson.com.tr/support",manualUrl:"https://www.epson.com.tr/support",softwareUrl:"https://www.epson.com.tr/support",
    models:[
      {name:"EcoTank L4360",code:"L4360",productUrl:"https://www.epson.com.tr/yazicilar/ev/l4360-c11cl41411",manualUrl:"https://www.epson.com.tr/yazicilar/ev/l4360-c11cl41411"},
      {name:"EcoTank L3251",code:"L3251",productUrl:"https://www.epson.com.tr/printers/ecotank/home/ecotank-home-l3251-c11cj67406",manualUrl:"https://www.epson.com.tr/printers/ecotank/home/ecotank-home-l3251-c11cj67406"},
      {name:"EcoTank L3356",code:"L3356",productUrl:"https://www.epson.com.tr/printers/ecotank/home/ecotank-home-l3356-c11cl62415",manualUrl:"https://www.epson.com.tr/printers/ecotank/home/ecotank-home-l3356-c11cl62415"},
      "EcoTank L3252","EcoTank L5290","EcoTank L1210","EcoTank L8180","EcoTank M3170"
    ]
  },
  {
    deviceType:"yazici",brand:"hp",familySlug:"laserjet",familyName:"LaserJet",familyKind:"official-family",marketSourceUrl:LASER,
    catalogBasis:"Akakçe 2026-08-26 lazer taraması + HP Türkiye ürün kodu destek, kılavuz ve sürücü portalı",productUrl:"https://www.hp.com/tr-tr/printers/laserjet-printers.html",supportUrl:"https://support.hp.com/tr-tr/",manualUrl:"https://support.hp.com/tr-tr/",softwareUrl:"https://support.hp.com/tr-tr/drivers",
    models:[
      {name:"LaserJet M111cw",code:"1Y7D2A"},{name:"LaserJet M111w",code:"7MD68A"},{name:"LaserJet M111a",code:"7MD67A"},
      {name:"Color Laser 150nw",code:"4ZB95A"},{name:"LaserJet Pro 3003dw",code:"3G654A"},{name:"LaserJet MFP M4103dw",code:"2Z627A"}
    ]
  },
  {
    deviceType:"yazici",brand:"hp",familySlug:"smart-tank",familyName:"Smart Tank",familyKind:"official-family",marketSourceUrl:INK,
    catalogBasis:"Akakçe 2026-08-26 mürekkep püskürtmeli taraması + HP Türkiye ürün kodu destek, kılavuz ve sürücü portalı",productUrl:"https://www.hp.com/tr-tr/printers/smart-tank.html",supportUrl:"https://support.hp.com/tr-tr/",manualUrl:"https://support.hp.com/tr-tr/",softwareUrl:"https://support.hp.com/tr-tr/drivers",
    models:[{name:"Smart Tank 581",code:"4A8D4A"},{name:"Smart Tank 585",code:"1F3Y4A"},{name:"Smart Tank 580",code:"1F3Y2A"}]
  },
  {
    deviceType:"yazici",brand:"brother",familySlug:"lazer-yazicilar",familyName:"Lazer Yazıcılar",marketSourceUrl:LASER,
    catalogBasis:"Akakçe 2026-08-26 lazer taraması + Brother resmî model kılavuz ve sürücü portalı",productUrl:"https://www.brother.com.tr/printers",supportUrl:"https://support.brother.com/",manualUrl:"https://support.brother.com/",softwareUrl:"https://support.brother.com/",
    models:["HL-1111","DCP-1511","HL-L1232W","DCP-L1632W"]
  },
  {
    deviceType:"elektrikli-scooter",brand:"segway-ninebot",familySlug:"ekickscooter",familyName:"eKickScooter",familyKind:"official-family",marketSourceUrl:SCOOTER,
    catalogBasis:"Akakçe 2026-08-26 scooter taraması + Segway resmî ürün ve destek portalı",productUrl:"https://turkiye.segway.com/ekickscooter/",supportUrl:"https://support.segway.com/",manualUrl:"https://support.segway.com/",softwareUrl:"https://turkiye.segway.com/",
    models:[{name:"C2 Lite",code:"C2 Lite",productUrl:"https://turkiye.segway.com/ekickscooter/products/c2-lite.html",manualUrl:"https://store.segway.com/media/wysiwyg/c2lite/pdf/ProductManualC2Lite.pdf"}]
  }
];

const built=definitions.map(defineCatalog);
export const refreshFamilies=built.map(x=>x.family);
export const refreshModels=built.flatMap(x=>x.models);
