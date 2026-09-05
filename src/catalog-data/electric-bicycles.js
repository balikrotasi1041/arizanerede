const DEVICE="elektrikli-bisiklet";
const MARKET="https://www.akakce.com/elektrikli-bisiklet.html";
const VERIFIED_AT="2026-09-05";

export const electricBicycleDeviceTypes=[
  {slug:DEVICE,name:"Elektrikli Bisiklet",description:"Motor desteği, batarya/şarj, menzil, gösterge, pedal sensörü, fren, lastik/jant, zincir-aktarma ve aydınlatma sorunları."}
];

const brand=(slug,name,urls)=>({
  slug,name,deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",...urls
});

export const electricBicycleBrands=[
  brand("volta","Volta",{
    officialTurkey:"https://volta.com.tr/",
    officialCatalogUrl:"https://volta.com.tr/collections/elektrikli-bisiklet",
    supportUrl:"https://volta.com.tr/pages/bakim-garanti",
    manualUrl:"https://volta.com.tr/pages/bakim-garanti",
    serviceUrl:"https://volta.com.tr/pages/servis-noktalari",
    warrantyUrl:"https://volta.com.tr/pages/bakim-garanti",
    serviceMode:"official-directory"
  }),
  brand("skyjet","Skyjet",{
    officialTurkey:"https://www.skyjet.com.tr/?lang=tr",
    officialCatalogUrl:"https://www.skyjet.com.tr/?lang=tr",
    supportUrl:"https://www.skyjet.com.tr/contact.html",
    manualUrl:"https://drive.google.com/drive/folders/1EdgvI2PA40GkYGu-UKlprRyZ4bXf7GeE?usp=sharing",
    serviceUrl:"https://www.skyjet.com.tr/bayi-agi.html",
    warrantyUrl:"https://www.skyjet.com.tr/?lang=tr",
    serviceMode:"official-directory"
  })
];

const family=(brand,slug,name,kind="neutral-collection")=>({
  deviceType:DEVICE,brand,slug,name,familyKind:kind,
  catalogBasis:"Akakçe Türkiye pazar keşfi + üreticinin resmî ürün/destek/kılavuz kaynakları"
});

export const electricBicycleFamilies=[
  family("volta","volta-elektrikli-bisikletler","Volta Elektrikli Bisikletler"),
  family("skyjet","nitro-serisi","Nitro Serisi","official-family"),
  family("skyjet","diger-e-bike","Skyjet Diğer E-Bike Modelleri")
];

const safe=(slug,title,risk,summary,steps,stopWhen,safety,sourceUrl,label)=>({
  slug,title,risk,summary,steps,userCanTry:risk!=="high",stopWhen,safety,
  source:{label,url:sourceUrl},communityAlternatives:[]
});

function ebikeClusters(sourceUrl,label){
  return [
    safe("acilmiyor-guc-yok","Açılmıyor / elektrik desteği yok","medium","Batarya oturuşu, ana güç düğmesi, gösterge ve dış bağlantılar kullanıcı seviyesinde kontrol edilir.",[
      "Bisikleti güvenli ve kuru bir yerde durdurun, ana gücü kapatıp yeniden açın.",
      "Çıkarılabilir batarya varsa kılavuzdaki kilitleme/oturtma konumunu dıştan kontrol edin.",
      "Gösterge, kablo ve konektörlerde yalnız görünür gevşeklik/hasar kontrolü yapın; bağlantıları zorlamayın."
    ],"Yanık kokusu, kıvılcım, erime, sıvı girişi veya batarya gövdesinde şekil bozukluğu varsa kullanmayı bırakın.","Batarya paketini, kontrolcüyü, motor gövdesini veya yüksek akım bağlantılarını açmayın.",sourceUrl,label),
    safe("sarj-olmuyor","Şarj olmuyor / şarj kesiliyor","medium","Resmî şarj cihazı, priz, batarya sıcaklığı ve kullanıcı erişimli şarj bağlantısı kontrol edilir.",[
      "Üreticinin model için belirttiği şarj cihazını kullanın ve farklı bir sağlam priz deneyin.",
      "Şarj portunda görünür kir/nem varsa enerji vermeden önce tamamen kuru olduğundan emin olun.",
      "Batarya aşırı sıcak veya çok soğuksa üreticinin önerdiği ortam sıcaklığına gelmesini bekleyip yeniden deneyin."
    ],"Şarj cihazı/batarya aşırı ısınıyor, şişiyor, koku veya kıvılcım oluşuyorsa şarjı derhal kesin.","Şarj cihazını, batarya hücrelerini veya BMS'yi kullanıcı tamiri olarak açmayın.",sourceUrl,label),
    safe("menzil-dustu","Menzil belirgin düştü","low","Lastik basıncı, yük, destek seviyesi, hava sıcaklığı ve batarya şarj durumu menzili etkileyebilir.",[
      "Lastik basınçlarını üretici/lastik üzerindeki izinli aralıkta kontrol edin.",
      "Tam şarj sonrası aynı rota ve benzer destek seviyesinde menzili yeniden gözlemleyin.",
      "Aşırı yük, düşük sıcaklık, yüksek destek seviyesi ve sık dur-kalk etkisini not edin."
    ],"Menzil ani biçimde çok düşmüşse, batarya ısınıyor/şişiyor veya şarj yüzdesi aniden çöküyorsa servise geçin.","Batarya paketini açarak hücre ölçümü, dengeleme veya hücre değişimi yapmayın.",sourceUrl,label),
    safe("pedal-destegi-calismiyor","Pedal desteği devreye girmiyor","medium","Destek seviyesi, fren kolu kesme sensörü, pedal sensörü çevresi ve gösterge ayarları dıştan kontrol edilir.",[
      "Gösterge üzerindeki destek seviyesinin 0 olmadığını doğrulayın.",
      "Fren kollarının tamamen serbest konuma döndüğünü kontrol edin.",
      "Pedal sensörü/mıknatıs halkasında dıştan görünür kırık, kayma veya yoğun kir olup olmadığını kontrol edin."
    ],"Fren sensörü, pedal sensörü veya motor bağlantısı arızası şüphesi sürüyorsa bisikleti elektrik desteğiyle kullanmayın ve servise başvurun.","Sensör kablolarını köprülemeyin, kontrolcü ayarlarını güvenlik limitlerini aşacak şekilde değiştirmeyin.",sourceUrl,label),
    safe("gosterge-hata-kodu","Gösterge uyarısı / hata kodu","medium","Kod veya sembol önce modelin resmî kılavuzundaki anlamıyla eşleştirilir; yalnız kullanıcıya açık kontroller uygulanır.",[
      "Ekrandaki kodu/sembolü ve oluştuğu koşulu not edin.",
      "Bisikleti güvenli yerde kapatıp kısa süre sonra yeniden başlatın.",
      "Kılavuzda kullanıcı kontrolü olarak belirtilmiş kablo, sensör veya batarya oturuşunu dıştan kontrol edin."
    ],"Kod tekrarlıyor, motor/fren/batarya ile ilişkiliyse veya sürüş güvenliği etkileniyorsa servise geçin.","Servis menülerindeki hız, akım, teker çapı veya motor parametrelerini kaynağı doğrulamadan değiştirmeyin.",sourceUrl,label),
    safe("fren-zayif-surtuyor","Fren zayıf / sürtme yapıyor","high","Fren güvenlik kritik bir sistemdir. Kullanıcı yalnız dış gözlem ve kol hissi kontrolü yapmalıdır.",[],"Fren mesafesi uzadıysa, kol dibe gidiyorsa, disk/kampana hasarlıysa veya teker güvenle durmuyorsa sürüş yapmayın.","Fren ayarı, hidrolik müdahale, kablo değişimi veya balata hizalama sürüş güvenliğini etkileyebilir; servis seviyesinde ele alınmalıdır.",sourceUrl,label),
    safe("lastik-jant-sorunu","Lastik / jant / teker sorunu","high","Basınç ve görünür hasar sürüş öncesi kontrol edilir; jant eğriliği ve bağlantı sorunları servis seviyesidir.",[],"Lastikte yarık/balon, jantta eğrilik, gevşek teker veya anormal yalpalama varsa sürüş yapmayın.","Motorlu göbek tekerinde kablo/aks sökümü ve jant doğrultma kullanıcı çözümü olarak önerilmez.",sourceUrl,label),
    safe("zincir-aktarma","Zincir / aktarma sesi veya atlama","medium","Zincirde görünür kir, aşırı gevşeklik, vites geçişi ve kullanıcı bakımına açık yağlama noktaları kontrol edilir.",[
      "Elektrik desteğini kapatın ve bisikleti sabitleyin.",
      "Zincirde görünür kir/pas ve dişlilerde yabancı cisim olup olmadığını kontrol edin.",
      "Üreticinin bakım talimatı izin veriyorsa uygun bisiklet zincir yağıyla bakım yapın."
    ],"Zincir sık sık atıyor, dişli/eğri aktarıcı görülüyor veya tahrik sırasında kilitlenme oluyorsa servise geçin.","Motor enerjiliyken aktarma organlarına elinizi yaklaştırmayın; elektrikli tahrik grubunu sökmeyin.",sourceUrl,label),
    safe("isik-aydinlatma","Far / stop / aydınlatma çalışmıyor","medium","Ana aydınlatma anahtarı, gösterge ayarı ve kullanıcı erişimli dış bağlantılar kontrol edilir.",[
      "Aydınlatmayı gösterge/anahtar üzerinden kapatıp yeniden açın.",
      "Batarya seviyesini ve varsa ayrı aydınlatma bağlantısını dıştan kontrol edin.",
      "Kılavuz izin veriyorsa değiştirilebilir lamba/aksesuarı doğru modelle doğrulayın."
    ],"Kablo ezilmesi, kısa devre belirtisi veya ana tesisat sorunu varsa servise geçin.","Ana tesisatı açmayın, kablo köprülemeyin veya sigorta değerini değiştirmeyin.",sourceUrl,label),
    safe("ses-titresim","Anormal ses / titreşim","medium","Gevşek aksesuar, zincir, teker ve dış bağlantılar gözle kontrol edilir; motor içi ses servis konusudur.",[
      "Sesin motor desteği açık/kapalıyken ve pedal çevirirken değişip değişmediğini not edin.",
      "Sepet, çamurluk, bagaj ve dış vidalarda görünür gevşeklik olup olmadığını kontrol edin.",
      "Teker, zincir veya motor bölgesinden gelen vuruntu varsa sürüşü uzatmayın."
    ],"Metalik vuruntu, motor göbeğinden sürtme, teker yalpalaması veya frenle birlikte titreşim varsa servise geçin.","Motor göbeğini veya kontrolcüyü açmayın; güvenlik kritik bağlantılara müdahale etmeyin.",sourceUrl,label),
    safe("su-nem","Su / yoğun nem sonrası sorun","high","Elektrikli bisiklette su teması sonrası güç vermek ikincil hasar riski taşır.",[],"Yoğun yağmur, suya batma, şarj portuna sıvı girişi veya gösterge/batarya içinde nem şüphesi varsa sistemi kapalı tutun.","Bataryayı açarak kurutma, sıcak hava tabancası, köprüleme veya ıslakken şarj etme yapmayın; üretici servisine danışın.",sourceUrl,label),
    safe("batarya-asiri-isinma","Batarya / elektrik sistemi aşırı ısınıyor","high","Batarya ve yüksek akım sistemi kullanıcı onarımı değildir.",[],"Bataryada aşırı ısınma, şişme, koku, duman veya anormal ses varsa kullanmayı ve şarjı derhal durdurun, güvenli alana geçin.","Batarya paketini açmayın, delmeyin, hücre değiştirmeyin, BMS/kontrolcü üzerinde işlem yapmayın.",sourceUrl,label)
  ];
}

const model=(brand,family,slug,name,modelCode,productUrl,manualUrl,notes={})=>({
  deviceType:DEVICE,brand,family,slug,name,modelCode,productUrl,
  supportUrl:productUrl,manualUrl,
  verifiedAt:VERIFIED_AT,verificationLevel:"official-model-source",
  marketSource:{label:"Akakçe elektrikli bisiklet kategori keşfi",url:MARKET,role:"market-discovery-only"},
  symptomClusters:ebikeClusters(manualUrl||productUrl,`${name} resmî ürün / kullanım-bakım kaynağı`),
  ...notes
});

const VOLTA_MANUALS="https://volta.com.tr/pages/bakim-garanti";
const SKYJET_MANUALS="https://drive.google.com/drive/folders/1EdgvI2PA40GkYGu-UKlprRyZ4bXf7GeE?usp=sharing";

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
  model("skyjet","diger-e-bike","robusto-premium","Skyjet Robusto Premium","Robusto Premium","https://www.skyjet.com.tr/model/robusto.html",SKYJET_MANUALS,{marketLabel:"Akakçe: Skyjet Robusto Premium 750 W"})
];

export const electricBicycleScreening={
  sourceUrl:MARKET,observedAt:VERIFIED_AT,
  observedListings:587,observedBrands:42,
  acceptedModels:10,
  held:[
    {name:"Volta VSM",reason:"Akakçe elektrikli bisiklet sayfasında listelense de üretici VSM'yi elektrikli moped/motosiklet olarak sınıflıyor; e-bike kataloğuna alınmadı."}
  ]
};
