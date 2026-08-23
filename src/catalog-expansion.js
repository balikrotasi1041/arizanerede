export const extraDeviceTypes = [
  { slug: "dizustu-bilgisayar", name: "Dizüstü Bilgisayar", description: "Açılış, BIOS, sürücü, batarya, ekran, ağ, depolama, ısınma ve donanım uyarıları." },
  { slug: "masaustu-bilgisayar", name: "Masaüstü Bilgisayar", description: "POST/BIOS, sürücü, görüntü, güç, depolama, ağ ve bileşen sorunları." },
  { slug: "televizyon", name: "Televizyon", description: "Görüntü, ses, Smart TV, ağ, uygulama, yazılım, panel ve hata uyarıları." },
  { slug: "yazici", name: "Yazıcı", description: "Hata kodları, kağıt besleme, kartuş/toner, baskı kalitesi, ağ ve sürücü sorunları." },
  { slug: "klima", name: "Klima", description: "Hata kodları, soğutma/ısıtma, filtre, drenaj, kumanda ve çalışma uyarıları." },
  { slug: "elektrikli-scooter", name: "Elektrikli Scooter", description: "Hata kodları, şarj, batarya, ekran, fren, lastik, motor, uygulama ve firmware sorunları." }
];

const supportOnly = "support-only";
const brandOfficial = "brand-official";

export const extraBrands = [
  {
    slug: "xiaomi", name: "Xiaomi", deviceTypes: ["elektrikli-scooter"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.mi.com/tr/", officialCatalogUrl: "https://www.mi.com/tr/",
    supportUrl: "https://www.mi.com/tr/support/", manualUrl: "https://www.mi.com/tr/support/user-guide/", softwareUrl: "https://www.mi.com/tr/support/",
    serviceUrl: "https://www.mi.com/tr/support/service-centre/", serviceMode: "locator",
    serviceSummary: "Scooter servisi yalnızca Xiaomi Türkiye'nin resmî servis merkezi bulucusundan seçilir."
  },
  {
    slug: "casper", name: "Casper", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.casper.com.tr/", officialCatalogUrl: "https://www.casper.com.tr/",
    supportUrl: "https://www.casper.com.tr/destek", manualUrl: "https://www.casper.com.tr/destek", softwareUrl: "https://www.casper.com.tr/destek",
    serviceUrl: "https://www.casper.com.tr/servis-noktalari", serviceMode: "official-directory",
    serviceSummary: "Servis adı ve adresi yalnızca Casper'ın il/ilçe bazlı resmî servis listesine dayanır."
  },
  {
    slug: "monster", name: "Monster", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.monsternotebook.com.tr/", officialCatalogUrl: "https://www.monsternotebook.com.tr/",
    supportUrl: "https://www.monsternotebook.com.tr/teknik-servis", manualUrl: "https://www.monsternotebook.com.tr/", softwareUrl: "https://www.monsternotebook.com.tr/",
    serviceUrl: "https://www.monsternotebook.com.tr/teknik-servis", serviceMode: "official-directory",
    serviceSummary: "Yalnızca Monster'ın kendi teknik servis noktaları ve resmî sevk/kargo prosedürü gösterilir."
  },
  {
    slug: "lenovo", name: "Lenovo", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.lenovo.com/tr/tr/", officialCatalogUrl: "https://www.lenovo.com/tr/tr/",
    supportUrl: "https://support.lenovo.com/tr/tr/", manualUrl: "https://support.lenovo.com/tr/tr/", softwareUrl: "https://support.lenovo.com/tr/tr/",
    serviceUrl: "https://support.lenovo.com/tr/tr/", serviceMode: "official-contact",
    serviceSummary: "Servis yönlendirmesi Lenovo Türkiye destek portalındaki güncel onarım/servis seçeneklerinden yapılır."
  },
  {
    slug: "asus", name: "ASUS", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.asus.com/tr/", officialCatalogUrl: "https://www.asus.com/tr/",
    supportUrl: "https://www.asus.com/tr/support/", manualUrl: "https://www.asus.com/tr/support/download-center/", softwareUrl: "https://www.asus.com/tr/support/download-center/",
    serviceUrl: "https://www.asus.com/tr/support/service-center/t%C3%BCrkiye/", serviceMode: "official-directory",
    serviceSummary: "ASUS servis noktaları yalnızca ASUS Türkiye'nin resmî servis merkezi sayfasından alınır."
  },
  {
    slug: "acer", name: "Acer", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.acer.com/tr-tr/", officialCatalogUrl: "https://www.acer.com/tr-tr/",
    supportUrl: "https://www.acer.com/tr-tr/support/index.html", manualUrl: "https://www.acer.com/tr-tr/support/drivers-and-manuals", softwareUrl: "https://www.acer.com/tr-tr/support/drivers-and-manuals",
    serviceUrl: "https://www.acer.com/tr-tr/support/contact-acer/service-contact", serviceMode: "official-directory",
    serviceSummary: "Acer'ın Türkiye servis/onarım bilgileri resmî destek sayfasından doğrulanır; dışarıdan servis eklenmez."
  },
  {
    slug: "msi", name: "MSI", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://tr.msi.com/", officialCatalogUrl: "https://tr.msi.com/",
    supportUrl: "https://tr.msi.com/support", manualUrl: "https://tr.msi.com/support/download", softwareUrl: "https://tr.msi.com/support/download",
    serviceUrl: "https://tr.msi.com/page/service-location-new", serviceMode: "official-directory",
    serviceSummary: "MSI servis konumu ve RMA yönlendirmesi yalnızca MSI Türkiye destek kanallarından alınır."
  },
  {
    slug: "hp", name: "HP", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar", "yazici"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.hp.com/tr-tr/", officialCatalogUrl: "https://www.hp.com/tr-tr/",
    supportUrl: "https://support.hp.com/tr-tr/", manualUrl: "https://support.hp.com/tr-tr/", softwareUrl: "https://support.hp.com/tr-tr/drivers",
    serviceUrl: "https://support.hp.com/tr-tr/", serviceMode: "official-contact",
    serviceSummary: "HP için servis adı uydurulmaz; seri/model üzerinden resmî HP destek ve onarım akışı kullanılır."
  },
  {
    slug: "dell", name: "Dell", deviceTypes: ["dizustu-bilgisayar", "masaustu-bilgisayar"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.dell.com/tr-tr/", officialCatalogUrl: "https://www.dell.com/tr-tr/",
    supportUrl: "https://www.dell.com/support/home/tr-tr", manualUrl: "https://www.dell.com/support/home/tr-tr", softwareUrl: "https://www.dell.com/support/home/tr-tr",
    serviceUrl: "https://www.dell.com/support/home/tr-tr", serviceMode: "official-contact",
    serviceSummary: "Dell servis/onarım akışı Service Tag veya model üzerinden Dell'in resmî destek portalında doğrulanır."
  },
  {
    slug: "onvo", name: "ONVO", deviceTypes: ["televizyon", "elektrikli-scooter"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://onvo.com.tr/", officialCatalogUrl: "https://onvo.com.tr/bilgi-merkezi",
    supportUrl: "https://onvo.com.tr/bilgi-merkezi", manualUrl: "https://onvo.com.tr/bilgi-merkezi", softwareUrl: "https://onvo.com.tr/bilgi-merkezi",
    serviceUrl: "https://onvo.com.tr/yetkili-servis-noktalarimiz", serviceMode: "official-directory",
    serviceSummary: "ONVO TV ve e-scooter servisleri yalnızca markanın resmî yetkili servis sayfasından gösterilir."
  },
  {
    slug: "sunny", name: "Sunny", deviceTypes: ["televizyon", "klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.sunny.com.tr/", officialCatalogUrl: "https://www.sunny.com.tr/",
    supportUrl: "https://www.sunny.com.tr/teknik-destek-formu/", manualUrl: "https://www.sunny.com.tr/", softwareUrl: "https://www.sunny.com.tr/",
    serviceUrl: "https://www.sunny.com.tr/magazalarimiz-ve-yetkili-servislerimiz/", serviceMode: "official-directory",
    serviceSummary: "TV servisleri Sunny'nin resmî listesiyle; klima servisleri markanın ayrı iklimlendirme servis listesiyle doğrulanır."
  },
  {
    slug: "axen", name: "Axen", deviceTypes: ["televizyon"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.axen.com.tr/", officialCatalogUrl: "https://www.axen.com.tr/",
    supportUrl: "https://www.axen.com.tr/iletisim/", manualUrl: "https://www.axen.com.tr/", softwareUrl: "https://www.axen.com.tr/",
    serviceUrl: "https://www.axen.com.tr/yetkili-servislerimiz/", serviceMode: "official-directory",
    serviceSummary: "Axen servisleri yalnızca markanın il/ilçe seçilen resmî yetkili servis dizininden alınır."
  },
  {
    slug: "vestel", name: "Vestel", deviceTypes: ["televizyon", "klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.vestel.com.tr/", officialCatalogUrl: "https://www.vestel.com.tr/",
    supportUrl: "https://www.vestel.com.tr/destek", manualUrl: "https://www.vestel.com.tr/destek", softwareUrl: "https://www.vestel.com.tr/destek",
    serviceUrl: "https://www.vestel.com.tr/destek", serviceMode: "official-contact",
    serviceSummary: "Vestel için yalnızca markanın resmî destek kanalının doğruladığı servis/onarım yönlendirmesi kullanılır."
  },
  {
    slug: "samsung", name: "Samsung", deviceTypes: ["televizyon", "klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.samsung.com/tr/", officialCatalogUrl: "https://www.samsung.com/tr/",
    supportUrl: "https://www.samsung.com/tr/support/", manualUrl: "https://www.samsung.com/tr/support/", softwareUrl: "https://www.samsung.com/tr/support/",
    serviceUrl: "https://www.samsung.com/tr/support/service-center/", serviceMode: "official-directory",
    serviceSummary: "Samsung servisleri yalnızca Samsung Türkiye'nin resmî servis merkezi aramasından alınır."
  },
  {
    slug: "lg", name: "LG", deviceTypes: ["televizyon", "klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.lg.com/tr/", officialCatalogUrl: "https://www.lg.com/tr/",
    supportUrl: "https://www.lg.com/tr/destek", manualUrl: "https://www.lg.com/tr/destek", softwareUrl: "https://www.lg.com/tr/destek",
    serviceUrl: "https://www.lg.com/tr/destek", serviceMode: "official-contact",
    serviceSummary: "LG servis bilgisi yalnızca LG Türkiye destek akışından doğrulanır."
  },
  {
    slug: "tcl", name: "TCL", deviceTypes: ["televizyon", "klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.tcl.com/tr/tr", officialCatalogUrl: "https://www.tcl.com/tr/tr",
    supportUrl: "https://www.tcl.com/tr/tr/support", manualUrl: "https://www.tcl.com/tr/tr/support", softwareUrl: "https://www.tcl.com/tr/tr/support",
    serviceUrl: "https://www.tcl.com/tr/tr/support", serviceMode: "official-contact",
    serviceSummary: "TCL için adı doğrulanmamış yerel servis eklenmez; resmî Türkiye destek kanalına yönlendirilir."
  },
  {
    slug: "epson", name: "Epson", deviceTypes: ["yazici"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.epson.com.tr/", officialCatalogUrl: "https://www.epson.com.tr/",
    supportUrl: "https://www.epson.com.tr/support", manualUrl: "https://www.epson.com.tr/support", softwareUrl: "https://www.epson.com.tr/support",
    serviceUrl: "https://www.epson.com.tr/dealer-and-service-search", serviceMode: "official-directory",
    serviceSummary: "Epson servisleri yalnızca Epson Türkiye'nin resmî bayi/servis aramasından seçilir."
  },
  {
    slug: "brother", name: "Brother", deviceTypes: ["yazici"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.brother.com.tr/", officialCatalogUrl: "https://www.brother.com.tr/",
    supportUrl: "https://www.brother.com.tr/support", manualUrl: "https://www.brother.com.tr/support", softwareUrl: "https://www.brother.com.tr/support",
    serviceUrl: "https://www.brother.com.tr/support", serviceMode: "official-contact",
    serviceSummary: "Brother model desteği, sürücüler, kılavuzlar ve servis yönlendirmesi resmî Brother destek portalından alınır."
  },
  {
    slug: "canon", name: "Canon", deviceTypes: ["yazici"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.canon.com.tr/", officialCatalogUrl: "https://www.canon.com.tr/",
    supportUrl: "https://www.canon.com.tr/support/", manualUrl: "https://www.canon.com.tr/support/", softwareUrl: "https://www.canon.com.tr/support/",
    serviceUrl: "https://www.canon.com.tr/support/", serviceMode: "official-contact",
    serviceSummary: "Canon için servis ve indirme bağlantıları yalnızca Canon Türkiye destek portalından verilir."
  },
  {
    slug: "daikin", name: "Daikin", deviceTypes: ["klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.daikin.com.tr/", officialCatalogUrl: "https://www.daikin.com.tr/",
    supportUrl: "https://www.daikin.com.tr/", manualUrl: "https://www.daikin.com.tr/", softwareUrl: "https://www.daikin.com.tr/",
    serviceUrl: "https://www.daikin.com.tr/", serviceMode: "official-contact",
    serviceSummary: "Daikin için servis adı yalnızca Daikin Türkiye'nin güncel resmî kanalında doğrulandıktan sonra gösterilir."
  },
  {
    slug: "baymak", name: "Baymak", deviceTypes: ["klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.baymak.com.tr/", officialCatalogUrl: "https://www.baymak.com.tr/",
    supportUrl: "https://www.baymak.com.tr/", manualUrl: "https://www.baymak.com.tr/", softwareUrl: "https://www.baymak.com.tr/",
    serviceUrl: "https://www.baymak.com.tr/", serviceMode: "official-contact",
    serviceSummary: "Baymak klima servis yönlendirmesinde yalnızca markanın kendi resmî kanalı kullanılacaktır."
  },
  {
    slug: "airfel", name: "Airfel", deviceTypes: ["klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.airfel.com.tr/", officialCatalogUrl: "https://www.airfel.com.tr/",
    supportUrl: "https://www.airfel.com.tr/", manualUrl: "https://www.airfel.com.tr/", softwareUrl: "https://www.airfel.com.tr/",
    serviceUrl: "https://www.airfel.com.tr/", serviceMode: "official-contact",
    serviceSummary: "Airfel servis adı ve iletişim bilgisi yalnızca markanın resmî Türkiye kanalından doğrulandıktan sonra gösterilir."
  },
  {
    slug: "mitsubishi-electric", name: "Mitsubishi Electric", deviceTypes: ["klima"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://klima.mitsubishielectric.com.tr/", officialCatalogUrl: "https://klima.mitsubishielectric.com.tr/",
    supportUrl: "https://klima.mitsubishielectric.com.tr/", manualUrl: "https://klima.mitsubishielectric.com.tr/", softwareUrl: "https://klima.mitsubishielectric.com.tr/",
    serviceUrl: "https://klima.mitsubishielectric.com.tr/", serviceMode: "official-contact",
    serviceSummary: "Mitsubishi Electric klima servis yönlendirmesi yalnızca markanın resmî Türkiye kaynağına dayanır."
  },
  {
    slug: "navee", name: "NAVEE", deviceTypes: ["elektrikli-scooter"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.naveetech.com/", officialCatalogUrl: "https://www.naveetech.com/",
    supportUrl: "https://service.naveetech.com/", manualUrl: "https://service.naveetech.com/", softwareUrl: "https://service.naveetech.com/",
    serviceUrl: "https://service.naveetech.com/", serviceMode: "official-contact",
    serviceSummary: "NAVEE'nin resmî teknik portalı kullanılır; Türkiye için marka tarafından doğrulanmış isimli servis bulunmadan yerel servis listelenmez."
  },
  {
    slug: "rks", name: "RKS", deviceTypes: ["elektrikli-scooter"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://www.rksmotor.com.tr/", officialCatalogUrl: "https://www.rksmotor.com.tr/",
    supportUrl: "https://user.rksmotor.com.tr/", manualUrl: "https://user.rksmotor.com.tr/", softwareUrl: "https://user.rksmotor.com.tr/",
    serviceUrl: "https://user.rksmotor.com.tr/services.php", serviceMode: "official-directory",
    serviceSummary: "RKS servisleri yalnızca markanın resmî kullanıcı destek portalındaki servis ağına dayanır."
  },
  {
    slug: "volta", name: "Volta", deviceTypes: ["elektrikli-scooter"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://volta.com.tr/", officialCatalogUrl: "https://volta.com.tr/kategoriler",
    supportUrl: "https://volta.com.tr/pages/bakim-garanti", manualUrl: "https://volta.com.tr/pages/bakim-garanti", softwareUrl: "https://volta.com.tr/pages/bakim-garanti",
    serviceUrl: "https://volta.com.tr/pages/bayiler", serviceMode: "official-directory",
    serviceSummary: "Volta servis/bayi yönlendirmesi yalnızca Volta'nın resmî ağından gösterilir."
  },
  {
    slug: "segway-ninebot", name: "Segway-Ninebot", deviceTypes: ["elektrikli-scooter"], catalogStatus: supportOnly, trustLevel: brandOfficial,
    officialTurkey: "https://turkiye.segway.com/", officialCatalogUrl: "https://turkiye.segway.com/ekickscooter/",
    supportUrl: "https://turkiye.segway.com/", manualUrl: "https://turkiye.segway.com/", softwareUrl: "https://turkiye.segway.com/",
    serviceUrl: "https://turkiye.segway.com/", serviceMode: "official-contact",
    serviceSummary: "Segway-Ninebot için yalnızca Türkiye resmî sitesinin servis/destek yönlendirmesi kullanılır; haricî servis eklenmez."
  }
];

export const legalResources = [
  { label: "SERBİS Yetkili Servis Sorgulama", url: "https://www.servis.gov.tr/Genel/Sorgu", authority: "Ticaret Bakanlığı" },
  { label: "Satış Sonrası Hizmetler Hakkında Bilgilendirme", url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/satis-sonrasi-hizmetler-hakkinda-bilgilendirme", authority: "Ticaret Bakanlığı" },
  { label: "Garanti Belgeleri Hakkında Bilgilendirme", url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/garanti-belgeleri-hakkinda-bilgilendirme", authority: "Ticaret Bakanlığı" },
  { label: "Ayıplı Mal ve Hizmetler Hakkında Bilgilendirme", url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/ayipli-mal-ve-hizmetler-hakkinda-bilgilendirme", authority: "Ticaret Bakanlığı" }
];
