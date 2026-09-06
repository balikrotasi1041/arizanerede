const DEVICE="elektrikli-bisiklet";
const MARKET="https://www.akakce.com/elektrikli-bisiklet.html";
const VERIFIED_AT="2026-09-06";

export const electricBicycleDeviceTypes=[
  {slug:DEVICE,name:"Elektrikli Bisiklet",description:"Motor desteği, batarya/şarj, menzil, gösterge, pedal sensörü, fren, lastik/jant, zincir-aktarma ve aydınlatma sorunları."}
];

const brand=(slug,name,urls)=>({slug,name,deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",...urls});

export const electricBicycleBrands=[
  brand("volta","Volta",{officialTurkey:"https://volta.com.tr/",officialCatalogUrl:"https://volta.com.tr/collections/elektrikli-bisiklet",supportUrl:"https://volta.com.tr/pages/bakim-garanti",manualUrl:"https://volta.com.tr/pages/bakim-garanti",serviceUrl:"https://volta.com.tr/pages/servis-noktalari",warrantyUrl:"https://volta.com.tr/pages/bakim-garanti",serviceMode:"official-directory"}),
  brand("skyjet","Skyjet",{officialTurkey:"https://www.skyjet.com.tr/?lang=tr",officialCatalogUrl:"https://www.skyjet.com.tr/?lang=tr",supportUrl:"https://www.skyjet.com.tr/contact.html",manualUrl:"https://drive.google.com/drive/folders/1EdgvI2PA40GkYGu-UKlprRyZ4bXf7GeE?usp=sharing",serviceUrl:"https://www.skyjet.com.tr/bayi-agi.html",warrantyUrl:"https://www.skyjet.com.tr/?lang=tr",serviceMode:"official-directory"}),
  brand("ape-ryder","Ape Ryder",{officialTurkey:"https://www.aperyder.com.tr/",officialCatalogUrl:"https://www.aperyder.com.tr/",supportUrl:"https://www.aperyder.com.tr/",manualUrl:"https://www.aperyder.com.tr/",serviceUrl:"https://www.aperyder.com.tr/",warrantyUrl:"https://www.aperyder.com.tr/",serviceMode:"official-contact"}),
  brand("corelli","Corelli",{officialTurkey:"https://www.corelli.com.tr/",officialCatalogUrl:"https://www.corelli.com.tr/bisikletler",supportUrl:"https://www.corelli.com.tr/iletisim",manualUrl:"https://corelli.com.tr/kullanim-kilavuzlari",serviceUrl:"https://corelli.com.tr/servis-noktalari",warrantyUrl:"https://www.corelli.com.tr/iletisim",serviceMode:"official-directory"})
];

const family=(brand,slug,name,kind="neutral-collection")=>({deviceType:DEVICE,brand,slug,name,familyKind:kind,catalogBasis:"Akakçe Türkiye pazar keşfi + üreticinin resmî ürün/destek/kılavuz kaynakları"});

export const electricBicycleFamilies=[
  family("volta","volta-elektrikli-bisikletler","Volta Elektrikli Bisikletler"),
  family("skyjet","nitro-serisi","Nitro Serisi","official-family"),
  family("skyjet","diger-e-bike","Skyjet Diğer E-Bike Modelleri"),
  family("ape-ryder","ape-ryder-e-bike","Ape Ryder E-Bike","official-family"),
  family("corelli","voniq-serisi","Corelli Voniq Serisi","official-family")
];

const safe=(slug,title,risk,summary,steps,stopWhen,safety,sourceUrl,label)=>({slug,title,risk,summary,steps,userCanTry:risk!=="high",stopWhen,safety,source:{label,url:sourceUrl},communityAlternatives:[]});

function ebikeClusters(sourceUrl,label){return [
  safe("acilmiyor-guc-yok","Açılmıyor / elektrik desteği yok","medium","Batarya oturuşu, ana güç düğmesi, gösterge ve dış bağlantılar kullanıcı seviyesinde kontrol edilir.",["Bisikleti kuru ve güvenli yerde durdurup ana gücü kapatın ve yeniden açın.","Çıkarılabilir batarya varsa yalnız dıştan kilit/oturuş konumunu kontrol edin.","Gösterge ve görünür konektörlerde gevşeklik veya hasar olup olmadığına bakın; zorlamayın."],"Yanık kokusu, kıvılcım, erime, sıvı girişi veya batarya gövdesinde şekil bozukluğu varsa kullanmayı bırakın.","Batarya paketini, kontrolcüyü, motor gövdesini veya yüksek akım bağlantılarını açmayın.",sourceUrl,label),
  safe("sarj-olmuyor","Şarj olmuyor / şarj kesiliyor","medium","Resmî şarj cihazı, priz, batarya sıcaklığı ve kullanıcı erişimli şarj bağlantısı kontrol edilir.",["Üreticinin belirttiği şarj cihazını kullanın ve sağlam bir priz deneyin.","Şarj portunda görünür nem/kir varsa enerji vermeden önce tamamen kuru olduğundan emin olun.","Batarya çok sıcak veya soğuksa normal ortam sıcaklığına gelmesini bekleyin."],"Şarj cihazı veya batarya aşırı ısınıyor, şişiyor, koku ya da kıvılcım oluşuyorsa şarjı kesin.","Şarj cihazını, batarya hücrelerini veya BMS'yi açmayın.",sourceUrl,label),
  safe("menzil-dustu","Menzil belirgin düştü","low","Lastik basıncı, yük, destek seviyesi, sıcaklık ve batarya doluluğu menzili etkiler.",["Lastik basıncını üretici/lastik üzerindeki izinli aralıkta kontrol edin.","Tam şarj sonrası benzer rota ve destek seviyesinde menzili yeniden gözlemleyin.","Aşırı yük, soğuk hava, yüksek destek seviyesi ve sık dur-kalk etkisini not edin."],"Menzil ani biçimde çökerse, batarya ısınır/şişer veya yüzde göstergesi aniden düşerse servise başvurun.","Batarya paketini açarak hücre ölçümü, dengeleme veya hücre değişimi yapmayın.",sourceUrl,label),
  safe("pedal-destegi-calismiyor","Pedal desteği devreye girmiyor","medium","Destek seviyesi, fren kesme sensörü ve pedal sensörü çevresi dıştan kontrol edilir.",["Gösterge üzerindeki destek seviyesinin 0 olmadığını doğrulayın.","Fren kollarının tamamen serbest konuma döndüğünü kontrol edin.","Pedal sensörü/mıknatıs halkasında görünür kırık, kayma veya yoğun kir olup olmadığına bakın."],"Motor desteği düzensizse veya fren sensörü/pedal sensörü arızası şüphesi sürüyorsa elektrik desteğiyle sürmeyin.","Sensör kablolarını köprülemeyin ve kontrolcü limitlerini değiştirmeyin.",sourceUrl,label),
  safe("gosterge-hata-kodu","Gösterge uyarısı / hata kodu","medium","Kod veya sembol modelin resmî kılavuzuyla eşleştirilir; yalnız kullanıcıya açık kontroller uygulanır.",["Ekrandaki kodu/sembolü ve oluştuğu koşulu not edin.","Bisikleti güvenli yerde kapatıp yeniden başlatın.","Kılavuzda kullanıcı kontrolü olarak belirtilmiş dış bağlantı ve sensörleri gözle kontrol edin."],"Kod tekrarlıyor veya motor/fren/batarya ile ilişkiliyse servise geçin.","Servis menülerindeki hız, akım, teker çapı veya motor parametrelerini değiştirmeyin.",sourceUrl,label),
  safe("fren-zayif-surtuyor","Fren zayıf / sürtme yapıyor","high","Fren güvenlik kritik bir sistemdir; kullanıcı yalnız dış gözlem ve kol hissi kontrolü yapmalıdır.",[],"Fren mesafesi uzadıysa, kol dibe gidiyorsa, disk/kampana hasarlıysa veya teker güvenle durmuyorsa sürmeyin.","Fren ayarı, hidrolik müdahale, kablo değişimi veya balata hizalama servis seviyesidir.",sourceUrl,label),
  safe("lastik-jant-sorunu","Lastik / jant / teker sorunu","high","Basınç ve görünür hasar sürüş öncesi kontrol edilir; jant ve aks sorunları servis seviyesidir.",[],"Lastikte yarık/balon, jantta eğrilik, gevşek teker veya yalpalama varsa sürmeyin.","Motorlu göbek tekerinde aks/kablo sökümü ve jant doğrultma kullanıcı çözümü değildir.",sourceUrl,label),
  safe("zincir-aktarma","Zincir / aktarma sesi veya atlama","medium","Zincir, vites ve görünür aktarma elemanları yalnız dıştan kontrol edilir.",["Elektrik desteğini kapatın ve bisikleti sabitleyin.","Zincirde görünür kir/pas ve dişlilerde yabancı cisim olup olmadığına bakın.","Üretici izin veriyorsa uygun bisiklet zincir yağıyla bakım yapın."],"Zincir sık atlıyor, aktarıcı eğri görünüyor veya tahrik kilitleniyorsa servise başvurun.","Motor enerjiliyken aktarma organlarına elinizi yaklaştırmayın; elektrikli tahriki sökmeyin.",sourceUrl,label),
  safe("isik-aydinlatma","Far / stop / aydınlatma çalışmıyor","medium","Ana aydınlatma anahtarı, gösterge ayarı ve dış bağlantılar kontrol edilir.",["Aydınlatmayı gösterge/anahtar üzerinden kapatıp yeniden açın.","Batarya seviyesini ve görünür aydınlatma bağlantısını dıştan kontrol edin.","Kılavuz izin veriyorsa değiştirilebilir lamba/aksesuarın doğru model olduğunu doğrulayın."],"Kablo ezilmesi, kısa devre belirtisi veya ana tesisat sorunu varsa servise geçin.","Ana tesisatı açmayın, kablo köprülemeyin veya sigorta değerini değiştirmeyin.",sourceUrl,label),
  safe("su-nem","Su / yoğun nem sonrası sorun","high","Yoğun su teması sonrası yeniden enerji vermek ikincil hasar riski taşır.",[],"Suya batma, şarj portuna sıvı girişi veya batarya/gösterge içinde nem şüphesi varsa sistemi kapalı tutun.","Bataryayı açarak kurutma, sıcak hava uygulama, köprüleme veya ıslakken şarj etme yapmayın.",sourceUrl,label),
  safe("batarya-asiri-isinma","Batarya / elektrik sistemi aşırı ısınıyor","high","Batarya ve yüksek akım sistemi kullanıcı onarımı değildir.",[],"Aşırı ısınma, şişme, koku, duman veya anormal ses varsa kullanımı ve şarjı derhal durdurun.","Batarya paketini açmayın, delmeyin, hücre değiştirmeyin, BMS/kontrolcü üzerinde işlem yapmayın.",sourceUrl,label)
];}

const model=(brand,family,slug,name,modelCode,productUrl,manualUrl,notes={})=>({deviceType:DEVICE,brand,family,slug,name,modelCode,productUrl,supportUrl:productUrl,manualUrl,verifiedAt:VERIFIED_AT,verificationLevel:"official-model-source",marketSource:{label:"Akakçe elektrikli bisiklet kategori keşfi",url:MARKET,role:"market-discovery-only"},symptomClusters:ebikeClusters(manualUrl||productUrl,`${name} resmî ürün / kullanım-bakım kaynağı`),...notes});

const VOLTA_MANUALS="https://volta.com.tr/pages/bakim-garanti";
const SKYJET_MANUALS="https://drive.google.com/drive/folders/1EdgvI2PA40GkYGu-UKlprRyZ4bXf7GeE?usp=sharing";
const CORELLI_MANUALS="https://corelli.com.tr/kullanim-kilavuzlari";

export const electricBicycleModels=[
  model("volta","volta-elektrikli-bisikletler","vb1-neo","Volta VB1 Neo","VB1 Neo","https://volta.com.tr/pages/vb1-elektrikli-bisiklet-bakim-garanti",VOLTA_MANUALS,{marketLabel:"Akakçe: Volta VB1 Neo 250 W katlanabilir"}),
  model("volta","volta-elektrikli-bisikletler","vb2","Volta VB2","VB2","https://volta.com.tr/pages/vb2-elektrikli-bisiklet-bakim-garanti",VOLTA_MANUALS,{marketLabel:"Akakçe: Volta VB2 250 W katlanabilir"}),
  model("volta","volta-elektrikli-bisikletler","vb2-pro","Volta VB2 Pro","VB2 Pro","https://volta.com.tr/products/vb2-pro-elektrikli-bisiklet",VOLTA_MANUALS,{marketLabel:"Akakçe: Volta VB2 Pro 250 W"}),
  model("volta","volta-elektrikli-bisikletler","vb3","Volta VB3","VB3","https://volta.com.tr/pages/vb3-elektrikli-bisiklet-bakim-garanti",VOLTA_MANUALS,{marketLabel:"Akakçe: Volta VB3 250 W"}),
  model("volta","volta-elektrikli-bisikletler","vb4","Volta VB4","VB4","https://volta.com.tr/pages/vb4-elektrikli-bisiklet-bakim-garanti",VOLTA_MANUALS,{marketLabel:"Akakçe: Volta VB4 250 W"}),
  model("volta","volta-elektrikli-bisikletler","vb5","Volta VB5","VB5","https://volta.com.tr/products/vb5-elektrikli-bisiklet",VOLTA_MANUALS,{marketLabel:"Akakçe: Volta VB5 250 W 3 tekerlekli"}),
  model("skyjet","nitro-serisi","nitro-pro","Skyjet Nitro Pro","Nitro Pro","https://www.skyjet.com.tr/model/nitro-pro.html",SKYJET_MANUALS,{marketLabel:"Akakçe: Skyjet Nitro Pro 250 W katlanabilir"}),
  model("skyjet","nitro-serisi","nitro-16","Skyjet Nitro 16","Nitro 16","https://www.skyjet.com.tr/model/nitro-16.html",SKYJET_MANUALS,{marketLabel:"Akakçe: Skyjet Nitro 16 250 W katlanabilir"}),
  model("skyjet","diger-e-bike","s25","Skyjet S25","S25","https://www.skyjet.com.tr/model/s25.html",SKYJET_MANUALS,{marketLabel:"Akakçe: Skyjet S25 250 W katlanabilir"}),
  model("skyjet","diger-e-bike","robusto-premium","Skyjet Robusto Premium","Robusto Premium","https://www.skyjet.com.tr/model/robusto.html",SKYJET_MANUALS,{marketLabel:"Akakçe: Skyjet Robusto Premium 750 W"}),
  model("ape-ryder","ape-ryder-e-bike","mandrill","Ape Ryder Mandrill","Mandrill","https://www.aperyder.com.tr/model/mandrill.html","https://www.aperyder.com.tr/model/mandrill.html",{marketLabel:"Akakçe: Ape Ryder Mandrill"}),
  model("ape-ryder","ape-ryder-e-bike","genon-ultra","Ape Ryder Genon Ultra","Genon Ultra","https://www.aperyder.com.tr/model/genon-ultra.html","https://www.aperyder.com.tr/model/genon-ultra.html",{marketLabel:"Akakçe: Ape Ryder Genon Ultra"}),
  model("ape-ryder","ape-ryder-e-bike","gibbon-ultra-pro","Ape Ryder Gibbon Ultra Pro","Gibbon Ultra Pro","https://www.aperyder.com.tr/model/gibbon-ultra-pro.html","https://www.aperyder.com.tr/model/gibbon-ultra-pro.html",{marketLabel:"Akakçe: Ape Ryder Gibbon Ultra Pro"}),
  model("ape-ryder","ape-ryder-e-bike","jambo-pro","Ape Ryder Jambo Pro","Jambo Pro","https://www.aperyder.com.tr/model/jambo-pro.html","https://www.aperyder.com.tr/model/jambo-pro.html",{marketLabel:"Akakçe: Ape Ryder Jambo Pro"}),
  model("ape-ryder","ape-ryder-e-bike","loris","Ape Ryder Loris","Loris","https://www.aperyder.com.tr/model/loris.html","https://www.aperyder.com.tr/model/loris.html",{marketLabel:"Akakçe: Ape Ryder Loris"}),
  model("ape-ryder","ape-ryder-e-bike","baboon","Ape Ryder Baboon","Baboon","https://www.aperyder.com.tr/model/baboon.html","https://www.aperyder.com.tr/model/baboon.html",{marketLabel:"Akakçe: Ape Ryder Baboon"}),
  model("ape-ryder","ape-ryder-e-bike","gibbon-ultra","Ape Ryder Gibbon Ultra","Gibbon Ultra","https://www.aperyder.com.tr/model/gibbon-ultra.html","https://www.aperyder.com.tr/model/gibbon-ultra.html",{marketLabel:"Akakçe: Ape Ryder Gibbon Ultra"}),
  model("ape-ryder","ape-ryder-e-bike","roloway","Ape Ryder Roloway","Roloway","https://www.aperyder.com.tr/model/roloway.html","https://www.aperyder.com.tr/model/roloway.html",{marketLabel:"Akakçe: Ape Ryder Roloway"}),
  model("ape-ryder","ape-ryder-e-bike","a10","Ape Ryder A10","A10","https://www.aperyder.com.tr/model/a10.html","https://www.aperyder.com.tr/model/a10.html",{marketLabel:"Akakçe: Ape Ryder A10"}),
  model("corelli","voniq-serisi","voniq-eco-magnesium","Corelli Voniq Eco Magnesium","Voniq Eco Magnesium","https://www.corelli.com.tr/bisikletler/elektrikli-bisikletler/voniq-eco-magnesium-211",CORELLI_MANUALS,{marketLabel:"Akakçe: Corelli Voniq Eco Magnesium 250 W katlanabilir"})
];

export const electricBicycleScreening={sourceUrl:MARKET,observedAt:VERIFIED_AT,observedListings:587,observedBrands:42,acceptedModels:20,lastBatchAccepted:10,lastBatchDate:VERIFIED_AT,held:[{name:"Volta VSM",reason:"Akakçe elektrikli bisiklet sayfasında listelense de üretici VSM'yi elektrikli moped/motosiklet olarak sınıflıyor; e-bike kataloğuna alınmadı."},{name:"RKS RD8 Premium 1500W",reason:"Akakçe'de elektrikli bisiklet olarak listeleniyor; bu turda model-seviyesi resmî ürün/kılavuz doğrulaması kalite eşiğini karşılamadığı için bekletildi."}]};