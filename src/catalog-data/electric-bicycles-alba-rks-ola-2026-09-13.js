const DEVICE="elektrikli-bisiklet";
const MARKET="https://www.akakce.com/elektrikli-bisiklet.html";
const VERIFIED_AT="2026-09-13";

const ALBA_HOME="https://alba-ebikes.com/";
const ALBA_CATALOG="https://alba-ebikes.com/collections/alba-elektrikli-ulasim-araclari";
const ALBA_SERVICE="https://alba-ebikes.com/pages/satis-ve-servis-noktalari";
const ALBA_2026="https://alba-ebikes.com/pages/alba-2026-katalog";
const OLA_HOME="https://olatr.com/";
const OLA_SERVICE="https://olatr.com/servisler/";
const RKS_CATALOG="https://www.rksmotor.eu/products/katlanabilir-bisikletler.html";
const RKS_MANUALS="https://user.rksmotor.com.tr/";
const RKS_SERVICE="https://user.rksmotor.com.tr/services.php";

export const september13EbikeBrands=[
 {slug:"alba",name:"Alba",deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",officialTurkey:ALBA_HOME,officialCatalogUrl:ALBA_CATALOG,supportUrl:ALBA_HOME,manualUrl:ALBA_2026,serviceUrl:ALBA_SERVICE,warrantyUrl:ALBA_HOME,serviceMode:"official-directory",serviceSummary:"Yetkili servis adı yalnız Alba'nın resmî Bayi ve Yetkili Servis Noktaları dizininden doğrulanır; üçüncü taraf servis adı yayımlanmaz."}
];

export const september13EbikeFamilies=[
 {deviceType:DEVICE,brand:"alba",slug:"alba-fold",name:"Alba Fold",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Alba resmî ürün/katalog ve servis kaynakları"},
 {deviceType:DEVICE,brand:"alba",slug:"alba-elektrikli-bisikletler",name:"Alba Elektrikli Bisikletler",familyKind:"neutral-collection",catalogBasis:"Akakçe Türkiye pazar keşfi + Alba resmî ürün/katalog ve servis kaynakları"}
];

const c=(slug,title,risk,summary,steps,stopWhen,safety,url,label)=>({slug,title,risk,summary,steps,userCanTry:risk!=="high",stopWhen,safety,source:{label,url},communityAlternatives:[]});
function clusters(url,label){return [
 c("acilmiyor-guc","Açılmıyor / güç gelmiyor","medium","Ana güç, ekran ve bataryanın dıştan doğru oturuşu kullanıcı seviyesinde kontrol edilir.",["Bisikleti kuru ve güvenli bir yerde kapatıp yeniden açın.","Çıkarılabilir batarya varsa yalnız kilitli ve doğru oturduğunu dıştan kontrol edin.","Görünür kablolarda ezilme, kopma veya gevşek dış bağlantı olup olmadığına bakın; bağlantıları zorlamayın."],"Yanık kokusu, kıvılcım, duman, erime, sıvı girişi veya batarya deformasyonu varsa kullanmayın.","Batarya paketini, BMS'yi, kontrolcüyü, motor gövdesini veya yüksek akım tesisatını açmayın.",url,label),
 c("sarj-batarya","Şarj olmuyor / batarya dolmuyor","medium","Uygun şarj cihazı, sağlam priz, ortam sıcaklığı ve kullanıcı erişimli şarj portu kontrol edilir.",["Üreticinin uygun gördüğü şarj cihazını sağlam bir duvar prizinde deneyin.","Şarj portunda görünür nem veya yabancı madde varsa enerji vermeyin.","Batarya aşırı sıcak veya soğuksa normal ortam sıcaklığına gelmesini bekleyin."],"Batarya ya da şarj cihazı aşırı ısınıyor, şişiyor, kokuyor, kıvılcım veya duman çıkarıyorsa şarjı kesin.","Batarya veya şarj cihazını açmayın; hücre/BMS onarımı, lehim ve yüksek akım müdahalesi kullanıcı işlemi değildir.",url,label),
 c("menzil-dususu","Menzil belirgin düştü","low","Lastik basıncı, yük, destek seviyesi, eğim, sık dur-kalk ve sıcaklık menzili etkiler.",["Lastik basıncını üreticinin izin verdiği aralıkta kontrol edin.","Tam şarj sonrası benzer rota, yük ve destek seviyesinde yeniden gözlem yapın.","Soğuk hava, yüksek destek seviyesi, yokuş ve sık dur-kalk etkisini not edin."],"Batarya yüzdesi aniden düşüyor, sistem yükte kapanıyor veya batarya anormal ısınıyorsa servise geçin.","Bataryayı açarak hücre ölçümü, dengeleme veya hücre değişimi yapmayın.",url,label),
 c("motor-destegi","Motor / pedal desteği devreye girmiyor","medium","Destek seviyesi, fren kolunun serbest konumu ve pedal destek davranışı dıştan kontrol edilir.",["Ekranda destek seviyesinin sıfır olmadığını doğrulayın.","Fren kollarının tamamen serbest konuma döndüğünü kontrol edin.","Pedal çevirirken desteğin sürekli mi aralıklı mı kesildiğini not edin."],"Destek beklenmedik anda devreye giriyor, sürüşte kesiliyor veya hata tekrarlıyorsa elektrik desteğini kullanmayın.","Sensör kablolarını köprülemeyin; kontrolcü, akım, hız veya motor parametrelerini değiştirmeyin.",url,label),
 c("ekran-hata-kodu","Ekran / hata kodu / sistem uyarısı","medium","Kod veya sembol kaydedilir; yalnız resmî dokümanda belirtilen kullanıcı seviyesi kontroller uygulanır.",["Ekrandaki kodu veya sembolü ve oluştuğu koşulu not edin.","Bisikleti güvenli yerde kapatıp yeniden açın.","Yalnız dıştan görülebilen bağlantı ve fiziksel hasarı kontrol edin."],"Uyarı tekrarlıyor veya motor, batarya, fren ya da iletişim sistemiyle ilişkiliyse yetkili servise geçin.","Servis menülerinde akım, voltaj, hız limiti, teker çapı veya motor parametresi değiştirmeyin.",url,label),
 c("pedal-sensoru","Pedal sensörü / PAS sorunu","medium","Pedal desteğinin hangi koşulda başladığı veya kesildiği güvenli biçimde gözlenir.",["Destek seviyesinin aktif olduğunu doğrulayın.","Fren kollarının serbest konuma döndüğünü kontrol edin.","Sorunun sürekli mi aralıklı mı olduğunu not edin; sensör çevresinde yalnız görünür hasara bakın."],"Destek gecikmeli, kesintili veya beklenmedik biçimde güç veriyorsa sürüşü bırakın.","PAS sensörünü veya kablosunu sökmeyin, köprülemeyin ya da elektriksel ölçüm için tesisatı açmayın.",url,label),
 c("fren","Fren zayıf / sürtüyor / kol hissi anormal","high","Fren güvenlik kritik sistemdir; kullanıcı çözümü olarak yalnız sürüşü durdurma ve dış gözlem yayımlanır.",[],"Fren mesafesi uzadıysa, kol dibe gidiyorsa, disk/kaliper/hat hasarı görülüyorsa veya teker güvenle durmuyorsa sürmeyin.","Fren ayarı, kaliper hizalama, hidrolik müdahale, balata veya kablo değişimi servis seviyesidir.",url,label),
 c("lastik-jant","Lastik / jant / teker sorunu","high","Basınç ve görünür hasar sürüş öncesi değerlendirilir; motorlu göbek ve jant müdahaleleri servis seviyesidir.",[],"Lastikte yarık/balon, jantta eğrilik, tekerde gevşeklik veya belirgin yalpalama varsa sürmeyin.","Motorlu göbek tekerinde aks/kablo sökümü, jant doğrultma veya motor kablosuna müdahale kullanıcı çözümü değildir.",url,label),
 c("zincir-aktarma","Zincir / vites / aktarma sorunu","medium","Aktarma organları elektrik desteği kapalıyken dıştan gözlemlenir.",["Elektrik desteğini kapatın ve bisikleti güvenli biçimde sabitleyin.","Zincirde görünür kir/pas ve dişlilerde yabancı cisim olup olmadığını kontrol edin.","Üretici izin veriyorsa uygun bisiklet zincir yağıyla temel bakım yapın."],"Zincir sık atlıyor, aktarıcı eğri görünüyor veya tahrik kilitleniyorsa servise başvurun.","Motor enerjiliyken aktarma organlarına elinizi yaklaştırmayın; elektrikli tahrik parçalarını sökmeyin.",url,label),
 c("isiklar-ses-nem-sicaklik","Aydınlatma, anormal ses, su/nem veya sıcaklık sorunu","medium","Aydınlatma kumandası, görünür gevşeklik, su/nem ve olağandışı sıcaklık yalnız dıştan değerlendirilir.",["Aydınlatmayı kumandadan kapatıp yeniden açın ve batarya seviyesini kontrol edin.","Elektrik desteğini kapatıp gevşek aksesuar veya teker yalpalaması olup olmadığını gözlemleyin.","Görünür su/nem veya aşırı sıcaklık varsa sistemi kapalı tutup normal ve kuru koşullara dönmesini bekleyin."],"Suya batma, şarj portunda sıvı, metal sürtme, motor bölgesinden vuruntu, batarya şişmesi/koku/duman veya aşırı ısınma varsa kullanmayın.","Elektrik tesisatını kesmeyin/lehimlemeyin; batarya, kontrolcü veya motoru açarak kurutma ya da onarım yapmayın.",url,label)
];}

const m=(brand,family,slug,name,modelCode,productUrl,supportUrl,manualUrl,marketLabel)=>({deviceType:DEVICE,brand,family,slug,name,modelCode,productUrl,supportUrl,manualUrl,verifiedAt:VERIFIED_AT,verificationLevel:"official-model-page+official-support+official-service",marketSource:{label:"Akakçe elektrikli bisiklet pazar keşfi",url:MARKET,role:"market-discovery-only"},marketLabel,symptomClusters:clusters(productUrl||manualUrl,`${name} resmî teknik kaynak`)});

export const september13EbikeModels=[
 m("alba","alba-fold","fold-m","Alba Fold M","Fold M","https://alba-ebikes.com/products/alba-fold-m",ALBA_HOME,"https://alba-ebikes.com/products/alba-fold-m","Akakçe: Alba Fold M; renk varyantları tek modelde birleştirildi"),
 m("alba","alba-fold","fold-s","Alba Fold S","Fold S","https://alba-ebikes.com/products/alba-fold-s",ALBA_HOME,"https://alba-ebikes.com/products/alba-fold-s","Akakçe: Alba Fold S"),
 m("alba","alba-fold","fold-f","Alba Fold F","Fold F","https://alba-ebikes.com/products/alba-fold-f",ALBA_HOME,"https://alba-ebikes.com/products/alba-fold-f","Akakçe: Alba Fold F Standard/Premium ve renk-paket varyantları tek cihazda birleştirildi"),
 m("alba","alba-fold","fold-3","Alba Fold 3","Fold 3","https://alba-ebikes.com/products/alba-fold-f-3",ALBA_HOME,"https://alba-ebikes.com/products/alba-fold-f-3","Akakçe: Alba Fold 3"),
 m("alba","alba-fold","fold-x","Alba Fold X","Fold X","https://alba-ebikes.com/products/alba-fold-x",ALBA_HOME,"https://alba-ebikes.com/products/alba-fold-x","Akakçe: Alba Fold X; renk varyantları tek modelde birleştirildi"),
 m("alba","alba-elektrikli-bisikletler","city-2","Alba City 2","City 2","https://alba-ebikes.com/products/alba-city-2",ALBA_HOME,"https://alba-ebikes.com/products/alba-city-2","Akakçe: Alba City 2 H.Disc"),
 m("alba","alba-elektrikli-bisikletler","evoq","Alba Evoq","Evoq","https://alba-ebikes.com/products/alba-evoq",ALBA_HOME,"https://alba-ebikes.com/products/alba-evoq","Akakçe: Alba Evoq; renk varyantları tek modelde birleştirildi"),
 m("ola","ola-elektrikli-bisikletler","electrofold-efb1","OLA Electrofold EFB1","EFB1","https://olatr.com/urun/ola-electrofold-efb1-beyaz-20/",OLA_HOME,"https://olatr.com/urun/ola-electrofold-efb1-beyaz-20/","Akakçe: OLA Electrofold EFB1; renk varyantları tek modelde birleştirildi"),
 m("rks","rks-katlanabilir-e-bike","rd5","RKS RD5","RD5",RKS_CATALOG,RKS_MANUALS,RKS_MANUALS,"Akakçe: RKS RD5 250 W; antrasit/gri/mavi/siyah renkleri tek cihazda birleştirildi"),
 m("rks","rks-katlanabilir-e-bike","lesso-pro","RKS Lesso Pro","Lesso Pro",RKS_CATALOG,RKS_MANUALS,RKS_MANUALS,"Akakçe: RKS Lesso Pro; renk varyantları tek modelde birleştirildi")
];

export const september13EbikeScreening={sourceUrl:MARKET,observedAt:VERIFIED_AT,acceptedThisBatch:10,brandsPrioritized:["Alba","OLA","RKS"],held:[
 {name:"Alba Explorer",reason:"Akakçe pazar kaydı görüldü ancak güncel Alba kataloğunda aynı adla model-seviyesi resmî teknik sayfa yeterince net doğrulanamadı."},
 {name:"Alba Motobike Pro",reason:"Akakçe kaydı mevcut; güncel Alba resmî kataloğunda Motobike X1 adı öne çıktığı için nesil/ad eşleşmesi kesinleştirilmeden yayımlanmadı."},
 {name:"Alba Cargo S",reason:"Resmî Alba teknik kaydı güçlü ve Akakçe'de kayıt mevcut; bugünkü kalite paketi 10 modele ulaştığı için sonraki taramaya bırakıldı."},
 {name:"Alba Motobike X1",reason:"Resmî Alba teknik kaydı ve Akakçe ürün kaydı mevcut; bugün 10 model sınırı dolduğu için sonraki taramaya bırakıldı."}
]};
