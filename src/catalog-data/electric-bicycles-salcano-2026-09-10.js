const DEVICE="elektrikli-bisiklet";
const MARKET="https://www.akakce.com/elektrikli-bisiklet.html";
const MARKET_BRAND="https://www.akakce.com/elektrikli-bisiklet/salcano.html";
const VERIFIED_AT="2026-09-10";
const HOME="https://www.salcano.com/";
const CATALOG="https://www.salcano.com/katalog/";
const SUPPORT="https://www.salcano.com/iletisim/";
const SERVICE="https://www.salcano.com/bayilerservisler/";

export const salcanoEbikeBrands=[
 {slug:"salcano",name:"Salcano",deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",officialTurkey:HOME,officialCatalogUrl:CATALOG,supportUrl:SUPPORT,manualUrl:CATALOG,serviceUrl:SERVICE,warrantyUrl:SUPPORT,serviceMode:"official-directory",serviceSummary:"Yetkili servis adı yalnız Salcano'nun resmî Bayi & Servisler dizininden doğrulanır; üçüncü taraf servis adı yayımlanmaz."}
];

export const salcanoEbikeFamilies=[
 {deviceType:DEVICE,brand:"salcano",slug:"cappadocia",name:"Cappadocia",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Salcano resmî model/katalog kaynakları"},
 {deviceType:DEVICE,brand:"salcano",slug:"marina",name:"Marina",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Salcano resmî model/katalog kaynakları"},
 {deviceType:DEVICE,brand:"salcano",slug:"serenity",name:"Serenity",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Salcano resmî model/katalog kaynakları"},
 {deviceType:DEVICE,brand:"salcano",slug:"caballo",name:"Caballo",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Salcano resmî model kaynağı"},
 {deviceType:DEVICE,brand:"salcano",slug:"antilope",name:"Antilope",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Salcano resmî model kaynağı"},
 {deviceType:DEVICE,brand:"salcano",slug:"gr-plus",name:"GR Plus",familyKind:"official-family",catalogBasis:"Akakçe Türkiye pazar keşfi + Salcano resmî model kaynağı"}
];

const c=(slug,title,risk,summary,steps,stopWhen,safety,url,label)=>({slug,title,risk,summary,steps,userCanTry:risk!=="high",stopWhen,safety,source:{label,url},communityAlternatives:[]});
function clusters(url,label){return [
 c("acilmiyor-guc","Açılmıyor / güç gelmiyor","medium","Ekran, ana güç ve bataryanın dıştan oturuşu kontrol edilir.",["Bisikleti güvenli ve kuru yerde kapatıp yeniden açın.","Çıkarılabilir batarya varsa yalnız dış kilit ve oturuşunu kontrol edin.","Görünür kablolarda darbe, ezilme veya gevşek dış bağlantı olup olmadığına bakın."],"Koku, duman, kıvılcım, erime, sıvı girişi veya batarya deformasyonu varsa kullanmayın.","Batarya paketi, BMS, kontrolcü, motor gövdesi veya yüksek akım tesisatını açmayın.",url,label),
 c("sarj-batarya","Şarj / batarya sorunu","medium","Doğru şarj cihazı, priz, ortam sıcaklığı ve şarj portunun dış durumu kontrol edilir.",["Üreticinin önerdiği/uyumlu şarj cihazını sağlam bir prizde deneyin.","Şarj portunda görünür nem varsa enerji vermeden tamamen kurumasını bekleyin.","Batarya çok sıcak veya soğuksa normal ortam sıcaklığına gelmesini bekleyin."],"Batarya veya şarj cihazı aşırı ısınıyor, şişiyor, kokuyor ya da duman çıkarıyorsa şarjı kesin.","Batarya/şarj cihazını açmayın; hücre, BMS, lehim veya yüksek akım ölçümü yapmayın.",url,label),
 c("menzil-dususu","Menzil belirgin düştü","low","Lastik basıncı, yük, rota, sıcaklık ve destek seviyesi menzili etkiler.",["Lastik basıncını üreticinin izin verdiği aralıkta kontrol edin.","Tam şarj sonrası benzer rota ve destek seviyesinde tekrar gözlemleyin.","Soğuk hava, yokuş, yük ve sık dur-kalk etkisini not edin."],"Yüzde aniden düşüyor, sistem yükte kapanıyor veya batarya anormal ısınıyorsa servise geçin.","Bataryayı açarak hücre ölçümü, dengeleme veya hücre değişimi yapmayın.",url,label),
 c("motor-destegi","Motor / pedal desteği devreye girmiyor","medium","Destek seviyesi, fren kolu konumu ve pedal desteği davranışı dıştan gözlenir.",["Destek seviyesinin sıfır olmadığını doğrulayın.","Fren kollarının serbest konuma döndüğünü kontrol edin.","Pedal çevirirken desteğin sürekli mi aralıklı mı kesildiğini not edin."],"Destek beklenmedik anda devreye giriyor veya sürüşte kesiliyorsa elektrik desteğini kullanmayın.","Sensör kablolarını köprülemeyin; kontrolcü veya motor parametrelerini değiştirmeyin.",url,label),
 c("ekran-hata-kodu","Ekran / hata kodu / sistem uyarısı","medium","Kod veya sembol kaydedilir; yalnız resmî dokümandaki kullanıcı seviyesindeki kontroller uygulanır.",["Kod veya sembolü ve oluştuğu koşulu not edin.","Bisikleti güvenli yerde kapatıp yeniden açın.","Yalnız dıştan görülebilen bağlantı ve hasarı kontrol edin."],"Uyarı tekrarlıyor veya motor, batarya ya da fren sistemiyle ilişkiliyse servise geçin.","Servis menülerinde hız, akım, teker çapı veya motor parametresi değiştirmeyin.",url,label),
 c("pedal-sensoru","Pedal sensörü / destek algılama sorunu","medium","Pedal desteğinin hangi koşulda başladığı veya kesildiği dıştan gözlenir.",["Elektrik desteği açıkken güvenli alanda düşük destek seviyesinde davranışı gözlemleyin.","Fren kollarının serbest olduğunu doğrulayın.","Sorunun belirli vites veya pedal konumuyla ilişkisini not edin."],"Destek gecikmeli, kesintili veya beklenmedik biçimde güç veriyorsa sürüşü bırakın.","Sensör, mıknatıs veya kablo tesisatına servis seviyesinde ayar/söküm yapmayın.",url,label),
 c("fren","Fren zayıf / sürtüyor / kol hissi anormal","high","Fren güvenlik kritik sistemdir; kullanıcı çözümü olarak yalnız sürüşü durdurma ve dış gözlem verilir.",[],"Fren mesafesi uzadıysa, kol dibe gidiyorsa, disk/kaliper/hat hasarı varsa sürmeyin.","Kaliper hizalama, hidrolik müdahale, balata/kablo değişimi veya fren ayarı servis seviyesidir.",url,label),
 c("lastik-jant","Lastik / jant / teker sorunu","high","Basınç ve görünür hasar kontrol edilir; jant ve aks müdahaleleri servis seviyesidir.",[],"Lastikte yarık/balon, jantta eğrilik, tekerde gevşeklik veya yalpalama varsa sürmeyin.","Motorlu göbekte aks/kablo sökümü ve jant doğrultma kullanıcı çözümü değildir.",url,label),
 c("zincir-aktarma","Zincir / vites / aktarma sorunu","medium","Aktarma elektrik desteği kapalıyken dıştan gözlemlenir.",["Elektrik desteğini kapatın.","Zincirde görünür kir/pas ve dişlilerde yabancı cisim olup olmadığını kontrol edin.","Üretici izin veriyorsa uygun bisiklet zincir yağıyla temel bakım yapın."],"Zincir sık atlıyor, aktarıcı eğri veya tahrik kilitlenmiş görünüyorsa servise başvurun.","Motor enerjiliyken aktarmaya elinizi yaklaştırmayın ve elektrikli tahrik parçalarını sökmeyin.",url,label),
 c("isiklar","Aydınlatma / ışıklar çalışmıyor","medium","Varsa sistem ekranından aydınlatma durumu ve dış kablo/armatür hasarı gözlenir.",["Aydınlatma kumandasını ve ekran göstergesini kontrol edin.","Lambada görünür darbe veya nem olup olmadığına bakın.","Bisikleti kapatıp yeniden açarak sistemi tekrar deneyin."],"Kablo hasarı, kısa devre belirtisi, yanık kokusu veya tekrarlayan sigorta/koruma davranışı varsa servise geçin.","Elektrik tesisatını kesmeyin, ek yapmayın veya lehimlemeyin.",url,label),
 c("ses-titresim","Anormal ses / titreşim","medium","Sesin teker, aktarma veya elektrik desteğiyle ilişkisi güvenli biçimde gözlenir.",["Elektrik desteğini kapatıp bisikleti elde yavaşça yürütün.","Sesin teker dönüşü, zincir veya motor desteğiyle ilişkisini not edin.","Görünür gevşek aksesuar olup olmadığını kontrol edin."],"Metal sürtmesi, teker yalpalaması, motor bölgesinden vuruntu veya frenle ilişkili ses varsa sürmeyin.","Motor gövdesini açmayın veya yatak/dişli müdahalesi yapmayın.",url,label),
 c("su-nem","Su / nem sonrası sorun","high","Elektrikli bisiklet suya maruz kaldıysa enerji verilmeden dıştan değerlendirilir.",[],"Batarya, şarj portu, ekran veya konnektörlerde görünür su/nem varsa kullanmayın ve şarj etmeyin.","Gövde, batarya, kontrolcü veya motoru açarak kurutma yapmayın; ısı tabancası kullanmayın.",url,label),
 c("sicaklik","Aşırı sıcak / soğukta performans sorunu","medium","Batarya ve elektronik sistemler aşırı sıcaklıkta performans veya koruma davranışı gösterebilir.",["Bisikleti doğrudan güneşten veya aşırı soğuktan uzak, kuru ve normal sıcaklıktaki ortama alın.","Batarya normal sıcaklığa gelmeden şarj etmeyin.","Sıcaklık normale döndükten sonra sistemi tekrar gözlemleyin."],"Batarya veya motor olağandışı sıcak, şişmiş, kokulu ya da tekrarlı korumaya geçiyorsa kullanmayın.","Batarya paketini açmayın, termal sensör veya BMS üzerinde işlem yapmayın.",url,label)
];}

const model=(family,slug,name,code,url,marketLabel)=>({deviceType:DEVICE,brand:"salcano",family,slug,name,modelCode:code,productUrl:url,supportUrl:SUPPORT,manualUrl:url,verifiedAt:VERIFIED_AT,verificationLevel:"official-product+official-support+official-service",marketSource:{label:"Akakçe Salcano elektrikli bisiklet pazar keşfi",url:MARKET,role:"market-discovery-only"},marketLabel,symptomClusters:clusters(url,`${name} Salcano resmî ürün/kılavuz kaynağı`)});

export const salcanoEbikeModels=[
 model("marina","marina-bafang","Salcano Marina Bafang","Marina Bafang","https://www.salcano.com/urun/marina-bafang/","Akakçe: Salcano Marina Bafang 249 W katlanabilir"),
 model("caballo","caballo-7-speed","Salcano Caballo 7 Speed","Caballo 7 Speed","https://www.salcano.com/urun/caballo-7-speed/","Akakçe: Salcano Caballo 20 jant 7 vites elektrikli katlanır"),
 model("cappadocia","cappadocia-2","Salcano Cappadocia 2","Cappadocia 2","https://www.salcano.com/urun/cappadocia-2/","Akakçe: Salcano Cappadocia 2 249 W"),
 model("cappadocia","cappadocia-1","Salcano Cappadocia 1","Cappadocia 1","https://www.salcano.com/urun/cappadocia-1/","Akakçe: Salcano Cappadocia 1 250 W / 27.5 2026"),
 model("serenity","serenity-1","Salcano Serenity 1","Serenity 1","https://www.salcano.com/urun/serenity-1/","Akakçe: Salcano Serenity 1 250 W"),
 model("marina","marina-w-7-speed","Salcano Marina W 7 Speed","Marina W 7 Speed","https://www.salcano.com/urun/marina-w-7-speed/","Akakçe: Salcano Marina W katlanır elektrikli bisiklet"),
 model("cappadocia","cappadocia-6","Salcano Cappadocia 6","Cappadocia 6","https://www.salcano.com/urun/cappadocia-6/","Akakçe: Salcano Cappadocia 6 elektrikli dağ bisikleti"),
 model("antilope","antilope-7-speed","Salcano Antilope 7 Speed","Antilope 7 Speed","https://www.salcano.com/urun/antilope-7-speed/","Akakçe: Salcano Antilope 20 jant elektrikli katlanır"),
 model("gr-plus","gr-plus-di2","Salcano GR Plus Di2","GR Plus Di2","https://www.salcano.com/urun/gr-plus-di2/","Akakçe: Salcano GR Plus 250 W / GR Plus Di2"),
 model("cappadocia","cappadocia-nirvana-alloy-12s-29","Salcano Cappadocia Nirvana Alloy 12S 29","Cappadocia Nirvana Alloy 12S 29","https://www.salcano.com/urun/cappadocia-nirvana-alloy-12s-29/","Akakçe: Salcano Cappadocia Nirvana Alloy 12S")
];

export const salcanoEbikeScreening={sourceUrl:MARKET,brandSourceUrl:MARKET_BRAND,observedAt:VERIFIED_AT,acceptedThisBatch:10,brandsPrioritized:["Salcano"],held:[
 {name:"Salcano Marina Shimano 8S",reason:"Salcano resmî ürün sayfası doğrulandı; ancak 10 Eylül Akakçe Salcano marka envanterinde doğrudan ayrı model kaydı görünmediği için bu pakette bekletildi."},
 {name:"Salcano Serenity MT1",reason:"Resmî teknik ürün sayfası güçlü; Akakçe mevcut Salcano envanterinde model-seviyesi pazar keşfi bu turda doğrulanamadığı için bekletildi."},
 {name:"Salcano Cappadocia 1 renk/kadro varyantları",reason:"Akakçe'deki gri/turuncu, mat siyah ve kadro ölçüsü varyantları ana Cappadocia 1 modelinden ayrı cihaz olarak çoğaltılmadı."},
 {name:"Salcano Caballo renk varyantları",reason:"Akakçe antrasit ve mat siyah kayıtları tek Caballo 7 Speed cihazında birleştirildi; renk varyantı ayrı model değildir."}
]};