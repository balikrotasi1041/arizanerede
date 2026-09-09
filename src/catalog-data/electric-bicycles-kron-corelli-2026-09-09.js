const DEVICE="elektrikli-bisiklet";
const MARKET="https://www.akakce.com/elektrikli-bisiklet.html";
const VERIFIED_AT="2026-09-09";
const CORELLI_MANUAL="https://corelli.com.tr/kullanim-kilavuzlari";
const CORELLI_SERVICE="https://corelli.com.tr/servis-noktalari";
const KRON_HOME="https://www.kronbisiklet.com.tr/";

export const kronCorelliEbikeBrands=[
 {slug:"kron",name:"Kron",deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",officialTurkey:KRON_HOME,officialCatalogUrl:"https://www.kronbisiklet.com.tr/kategori/elektrikli-bisikletler/",supportUrl:KRON_HOME,manualUrl:KRON_HOME,serviceUrl:KRON_HOME,warrantyUrl:KRON_HOME,serviceMode:"official-contact",serviceSummary:"Servis yönlendirmesi yalnız Kron'un resmî iletişim/satış-servis kanallarından doğrulanır; üçüncü taraf servis adı yayımlanmaz."},
 {slug:"corelli",name:"Corelli",deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",officialTurkey:"https://www.corelli.com.tr/",officialCatalogUrl:"https://www.corelli.com.tr/bisikletler/elektrikli-bisikletler",supportUrl:"https://www.corelli.com.tr/iletisim",manualUrl:CORELLI_MANUAL,serviceUrl:CORELLI_SERVICE,warrantyUrl:"https://www.corelli.com.tr/iletisim",serviceMode:"official-directory",serviceSummary:"Yetkili servis yalnız Corelli'nin resmî Servis Noktaları dizininden doğrulanır."}
];

export const kronCorelliEbikeFamilies=[
 {deviceType:DEVICE,brand:"kron",slug:"kron-e-mtb",name:"Kron E-MTB",familyKind:"neutral-collection",catalogBasis:"Akakçe Türkiye pazar keşfi + Kron resmî model sayfaları"},
 {deviceType:DEVICE,brand:"kron",slug:"kron-sehir-e-bike",name:"Kron Şehir E-Bike",familyKind:"neutral-collection",catalogBasis:"Akakçe Türkiye pazar keşfi + Kron resmî model sayfaları"},
 {deviceType:DEVICE,brand:"corelli",slug:"corelli-sehir-e-bike",name:"Corelli Şehir E-Bike",familyKind:"neutral-collection",catalogBasis:"Akakçe Türkiye pazar keşfi + Corelli resmî model/kılavuz/servis kaynakları"},
 {deviceType:DEVICE,brand:"corelli",slug:"corelli-katlanir-e-bike",name:"Corelli Katlanır E-Bike",familyKind:"neutral-collection",catalogBasis:"Akakçe Türkiye pazar keşfi + Corelli resmî model/kılavuz/servis kaynakları"}
];

const c=(slug,title,risk,summary,steps,stopWhen,safety,url,label)=>({slug,title,risk,summary,steps,userCanTry:risk!=="high",stopWhen,safety,source:{label,url},communityAlternatives:[]});
function clusters(url,label){return [
 c("acilmiyor-guc","Açılmıyor / güç gelmiyor","medium","Ana güç, ekran, bataryanın dıştan oturuşu ve görünür bağlantılar güvenli kullanıcı kontrolüdür.",["Sistemi güvenli ve kuru yerde kapatıp yeniden açın.","Çıkarılabilir batarya varsa yalnız dıştan kilit ve oturuşunu kontrol edin.","Görünür kablolarda darbe veya ezilme olup olmadığına bakın."],"Koku, duman, kıvılcım, erime, sıvı girişi veya batarya deformasyonu varsa kullanmayın.","Batarya paketi, BMS, kontrolcü, motor gövdesi ve yüksek akım tesisatını açmayın.",url,label),
 c("sarj-batarya","Şarj / batarya sorunu","medium","Resmî/uyumlu şarj cihazı, sağlam priz, ortam sıcaklığı ve şarj portunun dış durumu kontrol edilir.",["Üreticinin belirttiği şarj cihazını sağlam bir prizde deneyin.","Şarj portunda görünür nem varsa enerji vermeden kurumasını bekleyin.","Batarya çok sıcak veya soğuksa normal ortam sıcaklığına gelmesini bekleyin."],"Batarya veya şarj cihazı aşırı ısınıyor, şişiyor, kokuyor ya da duman çıkarıyorsa şarjı kesin.","Batarya/şarj cihazını açmayın; hücre, BMS, lehim veya yüksek akım ölçümü yapmayın.",url,label),
 c("menzil-dususu","Menzil belirgin düştü","low","Basınç, yük, rota, sıcaklık ve destek seviyesi menzili etkiler.",["Lastik basıncını izinli aralıkta kontrol edin.","Tam şarj sonrası benzer rota ve destek seviyesinde yeniden gözlemleyin.","Soğuk hava, yokuş, yük ve sık dur-kalk etkisini not edin."],"Yüzde aniden düşüyor, sistem yükte kapanıyor veya batarya anormal ısınıyorsa servise geçin.","Bataryayı açarak hücre ölçümü, dengeleme veya değişim yapmayın.",url,label),
 c("motor-destegi","Motor / pedal desteği devreye girmiyor","medium","Destek seviyesi, fren kolunun serbest konumu ve pedal desteği davranışı dıştan gözlenir.",["Destek seviyesinin sıfır olmadığını doğrulayın.","Fren kollarının serbest konuma döndüğünü kontrol edin.","Pedal çevirirken desteğin sürekli mi aralıklı mı kesildiğini not edin."],"Destek beklenmedik anda devreye giriyor veya sürüşte kesiliyorsa elektrik desteğini kullanmayın.","Sensör kablolarını köprülemeyin; kontrolcü veya motor parametrelerini değiştirmeyin.",url,label),
 c("ekran-hata-kodu","Ekran / hata kodu / sistem uyarısı","medium","Kod veya sembol kaydedilir ve yalnız resmî dokümandaki kullanıcı seviyesindeki kontroller uygulanır.",["Kod veya sembolü ve oluştuğu koşulu not edin.","Bisikleti güvenli yerde kapatıp yeniden açın.","Yalnız dıştan görülebilen bağlantı ve hasarı kontrol edin."],"Uyarı tekrarlıyor veya motor, batarya ya da fren sistemiyle ilişkiliyse servise geçin.","Servis menülerinde hız, akım, teker çapı veya motor parametresi değiştirmeyin.",url,label),
 c("fren","Fren zayıf / sürtüyor / kol hissi anormal","high","Fren güvenlik kritik sistemdir; kullanıcı çözümü olarak yalnız sürüşü durdurma ve dış gözlem verilir.",[],"Fren mesafesi uzadıysa, kol dibe gidiyorsa, disk/kaliper/hat hasarı varsa sürmeyin.","Fren ayarı, kaliper hizalama, hidrolik müdahale, balata veya kablo değişimi servis seviyesidir.",url,label),
 c("lastik-jant","Lastik / jant / teker sorunu","high","Basınç ve görünür hasar kontrol edilir; jant ve aks müdahaleleri servis seviyesidir.",[],"Lastikte yarık/balon, jantta eğrilik, tekerde gevşeklik veya yalpalama varsa sürmeyin.","Motorlu göbekte aks/kablo sökümü ve jant doğrultma kullanıcı çözümü değildir.",url,label),
 c("zincir-aktarma","Zincir / vites / aktarma sorunu","medium","Aktarma elektrik desteği kapalıyken dıştan gözlemlenir.",["Elektrik desteğini kapatın.","Zincirde görünür kir/pas ve dişlilerde yabancı cisim olup olmadığını kontrol edin.","Üretici izin veriyorsa uygun bisiklet zincir yağıyla temel bakım yapın."],"Zincir sık atlıyor, aktarıcı eğri veya tahrik kilitlenmiş görünüyorsa servise başvurun.","Motor enerjiliyken aktarmaya elinizi yaklaştırmayın ve elektrikli tahrik parçalarını sökmeyin.",url,label)
];}
const model=(brand,family,slug,name,code,url,manual,marketLabel,extra={})=>({deviceType:DEVICE,brand,family,slug,name,modelCode:code,productUrl:url,supportUrl:brand==="corelli"?CORELLI_SERVICE:KRON_HOME,manualUrl:manual,verifiedAt:VERIFIED_AT,verificationLevel:"official-product+official-support",marketSource:{label:"Akakçe elektrikli bisiklet kategori/marka keşfi",url:MARKET,role:"market-discovery-only"},marketLabel,symptomClusters:clusters(manual,`${name} resmî ürün / destek kaynağı`),...extra});

export const kronCorelliEbikeModels=[
 model("kron","kron-e-mtb","makalu","Kron Makalu","Makalu 25","https://www.kronbisiklet.com.tr/katalog/makalu/","https://www.kronbisiklet.com.tr/katalog/makalu/","Akakçe: Kron Makalu 250 W"),
 model("kron","kron-sehir-e-bike","zeon","Kron Zeon","Zeon 25","https://www.kronbisiklet.com.tr/katalog/zeon/","https://www.kronbisiklet.com.tr/katalog/zeon/","Akakçe: Kron Zeon 250 W"),
 model("kron","kron-e-mtb","naica","Kron Naica","Naica 25","https://www.kronbisiklet.com.tr/katalog/naica/","https://www.kronbisiklet.com.tr/katalog/naica/","Akakçe: Kron Naica Bosch"),
 model("kron","kron-sehir-e-bike","agartha","Kron Agartha","Agartha","https://www.kronbisiklet.com.tr/katalog/agartha/","https://www.kronbisiklet.com.tr/katalog/agartha/","Akakçe: Kron Agartha 250 W"),
 model("corelli","corelli-sehir-e-bike","alvien","Corelli Alvien","Alvien","https://corelli.com.tr/bisikletler/elektrikli-bisikletler/alvien-194",CORELLI_MANUAL,"Akakçe: Corelli Alvien 250 W"),
 model("corelli","corelli-sehir-e-bike","e-lite-l","Corelli E-Lite-L","E-Lite-L","https://www.corelli.com.tr/bisikletler/elektrikli-bisikletler/elitel-184",CORELLI_MANUAL,"Akakçe: Corelli E-Lite-L 250 W"),
 model("corelli","corelli-katlanir-e-bike","dial","Corelli Dial","Dial","https://www.corelli.com.tr/bisikletler/elektrikli-bisikletler/dial-205",CORELLI_MANUAL,"Akakçe: Corelli Dial 250 W katlanabilir"),
 model("corelli","corelli-sehir-e-bike","moven","Corelli Moven","Moven","https://www.corelli.com.tr/en/bisikletler/elektrikli-bisikletler/moven-195",CORELLI_MANUAL,"Akakçe: Corelli Moven 250 W"),
 model("corelli","corelli-katlanir-e-bike","truva","Corelli Truva","Truva","https://www.corelli.com.tr/bisikletler/elektrikli-bisikletler/truva-190",CORELLI_MANUAL,"Akakçe: Corelli Truva katlanır fat e-bike"),
 model("corelli","corelli-katlanir-e-bike","voniq-eco-s-magnesium","Corelli Voniq Eco S Magnesium","Voniq Eco S Magnesium","https://www.corelli.com.tr/bisikletler/elektrikli-bisikletler/voniq-eco-s-magnesium-212",CORELLI_MANUAL,"Akakçe: Corelli Voniq-S Eco Mg 250 W katlanabilir")
];

export const kronCorelliEbikeScreening={sourceUrl:MARKET,observedAt:VERIFIED_AT,acceptedThisBatch:10,brandsPrioritized:["Kron","Corelli"],held:[
 {name:"Kron Elektrone Nord",reason:"Akakçe pazar kaydı güçlü; bu turda Kron resmî model-seviyesi ürün/kılavuz eşleşmesi yeterince net bulunamadığı için bekletildi."},
 {name:"Kron Loop Discovery",reason:"Akakçe'de listeleniyor; resmî Kron model sayfası/teknik doküman eşleşmesi kalite eşiğini karşılamadığı için bekletildi."},
 {name:"Corelli Voniq Eco Magnesium renk kayıtları",reason:"Ana model zaten katalogda; Akakçe renk/paket varyantları ayrı cihaz olarak çoğaltılmadı."}
]};