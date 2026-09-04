const DEVICE="kedi-kopek-tiras-makinesi";
const MARKET="https://www.akakce.com/kedi-kopek-tiras-makinesi.html";
const VERIFIED_AT="2026-09-04";

export const petGroomingDeviceTypes=[
  {slug:DEVICE,name:"Kedi & Köpek Tıraş Makinesi",description:"Bıçak, kesim, çekme/sıkışma, ısınma, ses-titreşim, şarj/güç, bakım ve vakumlu grooming seti sorunları."}
];

const brand=(slug,name,urls,serviceSummary)=>({
  slug,name,deviceTypes:[DEVICE],catalogStatus:"verified-models",trustLevel:"brand-official",serviceMode:"official-contact",...urls,serviceSummary
});

export const petGroomingBrands=[
  brand("kiwi-pets","Kiwi Pets",{
    officialTurkey:"https://kiwi.com.tr/",officialCatalogUrl:"https://kiwi.com.tr/tr/kiwi-pets",
    supportUrl:"https://kiwi.com.tr/tr/kiwi-pets",manualUrl:"https://kiwi.com.tr/tr/kiwi-pets"
  },"Kiwi Pets model bilgisi ve dokümanı yalnızca Kiwi'nin resmî ürün/kılavuz sayfalarından doğrulanır; adı doğrulanmamış servis yayımlanmaz."),
  brand("powertec","Powertec",{
    officialTurkey:"https://www.powertec.com.tr/",officialCatalogUrl:"https://www.powertec.com.tr/",
    supportUrl:"https://www.powertec.com.tr/",manualUrl:"https://www.powertec.com.tr/"
  },"Powertec için ürün ve garanti bilgisi markanın resmî model sayfasından alınır; yerel servis adı resmî kaynakta doğrulanmadan yayımlanmaz."),
  brand("bezt","BEZT",{
    officialTurkey:"https://bezt.com.tr/",officialCatalogUrl:"https://bezt.com.tr/evcil-hayvan-urunleri",
    supportUrl:"https://bezt.com.tr/evcil-hayvan-urunleri",manualUrl:"https://bezt.com.tr/evcil-hayvan-urunleri"
  },"BEZT ürün ve garanti bilgisi markanın resmî ürün/destek kanalından alınır; üçüncü taraf servis yetkili servis olarak gösterilmez."),
  brand("wahl","Wahl",{
    officialTurkey:"https://www.wahlpro.com/animal",officialCatalogUrl:"https://www.wahlpro.com/animal",
    supportUrl:"https://www.wahlpro.com/animal",manualUrl:"https://www.wahlpro.com/animal"
  },"Wahl için Türkiye'de isimli servis uydurulmaz; model kılavuzu, bakım dokümanı ve resmî marka iletişimi esas alınır."),
  brand("andis","Andis",{
    officialTurkey:"https://www.andis.com/",officialCatalogUrl:"https://www.andis.com/",
    supportUrl:"https://www.andis.com/",manualUrl:"https://www.andis.com/"
  },"Andis kullanım, bakım ve garanti bilgisi yalnızca Andis'in model sayfası ve bağlı resmî dokümanlarından alınır."),
  brand("heiniger","Heiniger",{
    officialTurkey:"https://heiniger-pet-grooming.com/en",officialCatalogUrl:"https://heiniger-pet-grooming.com/en",
    supportUrl:"https://heiniger-pet-grooming.com/en",manualUrl:"https://heiniger-pet-grooming.com/en"
  },"Heiniger model, kılavuz ve yedek parça bilgisi Heiniger Pet Grooming resmî sayfalarından doğrulanır; yerel servis adı resmî teyit olmadan eklenmez."),
  brand("neakasa","Neakasa",{
    officialTurkey:"https://neakasa.com/",officialCatalogUrl:"https://neakasa.com/",
    supportUrl:"https://neakasa.com/pages/support-center",manualUrl:"https://neakasa.com/pages/support-center"
  },"Neakasa P-serisi için kılavuz ve destek Neakasa Support Center'dan alınır; üçüncü taraf onarım noktası yetkili servis olarak gösterilmez."),
  brand("aesculap","Aesculap",{
    officialTurkey:"https://www.aesculap-schermaschinen.de/en/",officialCatalogUrl:"https://www.aesculap-schermaschinen.de/en/",
    supportUrl:"https://www.aesculap-schermaschinen.de/en/",manualUrl:"https://www.aesculap-schermaschinen.de/en/"
  },"Aesculap Exacta için teknik veri, teslimat kapsamı ve kılavuz yalnızca Aesculap'ın resmî ürün/doküman sayfasından alınır.")
];

const safeCluster=(slug,title,risk,summary,steps,stopWhen,safety,sourceUrl,sourceLabel)=>({
  slug,title,risk,summary,steps,userCanTry:risk!=="high",stopWhen,safety,
  source:{label:sourceLabel,url:sourceUrl},communityAlternatives:[]
});

function clipperClusters(sourceUrl,label,{vacuum=false,cordless=true}={}){
  const clusters=[
    safeCluster("acilmiyor-guc-yok","Açılmıyor / güç belirtisi yok","low","Anahtar, resmî güç kaynağı, şarj durumu ve dış bağlantılar kullanıcı seviyesinde kontrol edilir.",[
      "Cihazı kapatıp üreticinin belirttiği güç/şarj kaynağını ve bağlantıyı kontrol edin.",
      "Kablo, fiş, şarj yuvası ve dış temaslarda görünür hasar olmadığını doğrulayın.",
      "Kılavuzdaki normal şarj/başlatma süresini bekleyip yeniden deneyin."
    ],"Yanık kokusu, erime, sıvı, kıvılcım veya gövdede aşırı ısınma varsa kullanmayı bırakın.","Motor gövdesini, adaptörü veya batarya paketini açmayın; farklı voltajlı adaptör kullanmayın.",sourceUrl,label),
    safeCluster("bicak-donmuyor-sikisiyor","Bıçak dönmüyor / sıkışıyor","low","Bıçak çevresinde tüy birikmesi, yanlış oturma ve kullanıcı bakımına açık hareketli parçalar kontrol edilir.",[
      "Cihazı tamamen kapatın ve güçten ayırın.",
      "Yalnızca kılavuzun kullanıcı bakımına açtığı bıçak/başlık bölümündeki tüyleri temizleme fırçasıyla uzaklaştırın.",
      "Çıkarılabilir bıçağı üreticinin gösterdiği yönde doğru oturtup yeniden deneyin."
    ],"Bıçak çatlak/eğriyse, tahrik mekanizması hareket etmiyorsa veya metalik ses sürüyorsa cihazı çalıştırmayın.","Çalışan bıçağa el sürmeyin; tahrik motorunu veya kapalı gövdeyi sökmeyin.",sourceUrl,label),
    safeCluster("kesmiyor-tuyu-cekiyor","Kesim zayıf / tüyü çekiyor","low","Bıçak temizliği, yağlama, tarak seçimi ve tüyün düğümlü/ıslak olması kontrol edilir.",[
      "Bıçak ve kılavuz tarağı tüyden arındırın.",
      "Üreticinin bakım talimatında belirtilen bıçak yağlama yöntemini uygulayın.",
      "Tüy tipine uygun tarak ve kesim yönünü kullanıp küçük bir alanda yeniden deneyin."
    ],"Bıçak cildi çekiyor, çiziyor veya hayvan rahatsız oluyorsa işlemi durdurun; bıçak hasarlıysa değişim/servis gerekir.","Düğümlü tüyü bıçakla zorlamayın; cilt kıvrımlarında ve hassas bölgelerde üreticinin izin vermediği çok kısa kesimi uygulamayın.",sourceUrl,label),
    safeCluster("bicak-asiri-isiniyor","Bıçak aşırı ısınıyor","medium","Uzun kesintisiz kullanım, kir/yağ eksikliği ve bıçak sürtünmesi kontrol edilir.",[
      "Cihazı kapatın ve bıçağın tamamen soğumasını bekleyin.",
      "Bıçağı temizleyip kılavuzdaki yağlama/bakım adımını uygulayın.",
      "Üreticinin önerdiği çalışma molalarına uyarak yeniden başlayın."
    ],"Bıçak kısa sürede tekrar çok ısınıyor, renk değiştiriyor veya yanık kokusu oluşuyorsa kullanmayı bırakın.","Sıcak bıçağı hayvanın cildine temas ettirmeyin; suya daldırma veya resmî olmayan soğutucu/kimyasal uygulamayın.",sourceUrl,label),
    safeCluster("ses-titresim-artti","Ses / titreşim arttı","medium","Bıçak oturuşu, gevşek kullanıcı aksesuarı ve tüy birikmesi dıştan kontrol edilir.",[
      "Cihazı kapatıp bıçak ve tarakların doğru kilitlendiğini kontrol edin.",
      "Kullanıcı bakımına açık bölgelerdeki tüy birikimini temizleyin.",
      "Başlıksız çalıştırma kılavuzda açıkça izinli değilse denemeyin; normal kurulumla kısa test yapın."
    ],"Vurma, sürtme, yüksek metalik ses, gövde ısınması veya belirgin titreşim devam ediyorsa servise geçin.","Motor yatağına, eksantriğe veya iç dişlilere müdahale etmeyin.",sourceUrl,label),
    safeCluster("tarak-baslik-oturmuyor","Tarak / başlık oturmuyor veya çıkıyor","low","Doğru aksesuarın seçilmesi, tırnakların kırık olmaması ve takma yönü kontrol edilir.",[
      "Model için doğru kılavuz tarak veya başlığı seçtiğinizi doğrulayın.",
      "Bağlantı tırnaklarında kırık, eğrilik veya araya sıkışmış tüy olup olmadığını kontrol edin.",
      "Kılavuzdaki takma yönünü izleyip zorlamadan yerine oturtun."
    ],"Başlık kilitlenmiyor, bağlantı parçası kırık veya bıçak hizası bozuksa kullanmayın.","Uyumsuz tarağı zorlayarak takmayın; kırık bağlantı parçasını yapıştırarak bıçak yakınında kullanmayın.",sourceUrl,label),
    safeCluster("temizlik-yaglama-bakim","Temizlik / yağlama / rutin bakım","low","Bıçak, tarak ve çıkarılabilir bakım parçaları üreticinin talimatına göre temizlenir ve yağlanır.",[
      "Cihazı kapatıp güç kaynağından ayırın.",
      "Tüyleri temizleme fırçasıyla uzaklaştırın; yalnızca üreticinin yıkanabilir dediği parçaları yıkayın.",
      "Bıçak için üreticinin belirttiği bakım yağını/maddesini ve miktarı kullanın."
    ],"Pas, kırık diş, kablo/batarya hasarı veya içeri sıvı girişi görülürse cihazı yeniden çalıştırmayın.","Elektrikli gövdeyi suya sokmayın; rastgele yağ, çözücü veya basınçlı sıvı kullanmayın.",sourceUrl,label),
    safeCluster("sarj-batarya-kablo","Şarj / batarya / güç kablosu sorunu","medium",cordless?"Şarj süresi, resmî adaptör/kablo, şarj teması ve çalışma süresi model talimatına göre kontrol edilir.":"Güç kablosu, fiş ve priz dıştan kontrol edilir; kablolu cihazda enerji beslemesi dışında iç müdahale yapılmaz.",cordless?[
      "Resmî veya model için üreticinin belirttiği şarj cihazını kullanın.",
      "Şarj portu ve kabloda dış hasar olmadığını kontrol edin.",
      "Tam şarj süresini tamamlayıp çalışma süresini yeniden gözlemleyin."
    ]:[
      "Prizde enerji olduğunu başka düşük riskli bir cihazla doğrulayın.",
      "Fiş ve kablonun dış yüzeyinde kesik, ezilme veya gevşeklik olmadığını kontrol edin.",
      "Kabloyu çekiştirmeden normal konumda yeniden deneyin."
    ],"Bataryada şişme/sızıntı, şarjda aşırı ısınma veya kabloda çıplak iletken/yanık izi varsa kullanmayın.","Batarya hücresi, şarj devresi, adaptör veya güç kablosu içini kullanıcı tamiri olarak açmayın.",sourceUrl,label)
  ];
  if(vacuum){
    clusters.push(safeCluster("vakum-emis-dustu","Vakum emişi düştü / tüy toplanmıyor","low","Toz haznesi, filtre, hortum ve kullanıcı erişimli hava yolu tıkanıklığı kontrol edilir.",[
      "Cihazı kapatıp toz haznesini boşaltın.",
      "Kılavuzda kullanıcı bakımına açık filtre ve hortumu tüy/tıkanıklık açısından kontrol edin.",
      "Filtre yıkanabiliyorsa tamamen kuruduktan sonra doğru yönde yeniden takın."
    ],"Motor sesi değişiyor, gövde aşırı ısınıyor veya kullanıcı erişimi dışındaki hava yolu tıkalıysa servise geçin.","Vakum motorunu açmayın; ıslak filtreyle veya sıvı çekmek için üretici izin vermedikçe çalıştırmayın.",sourceUrl,label));
  }
  return clusters;
}

const family=(brand,slug,name,kind="neutral-collection")=>({
  deviceType:DEVICE,brand,slug,name,familyKind:kind,
  catalogBasis:"Akakçe 2026-09-04 Türkiye pazar taraması + üreticinin resmî model, kullanım/bakım veya destek kaynağı",
  marketSourceUrl:MARKET,verifiedAt:VERIFIED_AT
});

export const petGroomingFamilies=[
  family("kiwi-pets","evcil-hayvan-bakim","Evcil Hayvan Bakım"),
  family("powertec","pet-clipper","Pet Clipper"),
  family("bezt","pet-care","Pet Care"),
  family("wahl","km-serisi","KM Serisi","official-family"),
  family("andis","pet-clippers","Pet Clippers"),
  family("heiniger","opal","Opal","official-family"),
  family("heiniger","saphir","Saphir","official-family"),
  family("neakasa","p-serisi-grooming-vacuum","P Serisi Grooming Vacuum","official-family"),
  family("aesculap","exacta","Exacta","official-family")
];

function model(brand,familySlug,slug,name,modelCode,productUrl,{supportUrl=productUrl,manualUrl=productUrl,vacuum=false,cordless=true}={}){
  const sourceUrl=manualUrl||supportUrl||productUrl;
  return {
    deviceType:DEVICE,brand,family:familySlug,slug,name,modelCode,productUrl,supportUrl,manualUrl,
    verifiedAt:VERIFIED_AT,indexable:true,verificationLevel:"market-and-official-model-source",
    officialLabel:`${name} resmî ürün / kullanım-bakım kaynağı`,
    marketSource:{label:"Akakçe Türkiye kedi & köpek tıraş makinesi pazar keşfi",url:MARKET,role:"market-discovery-only"},
    softwareResources:[],symptomClusters:clipperClusters(sourceUrl,`${name} resmî kullanım / bakım kaynağı`,{vacuum,cordless})
  };
}

export const petGroomingModels=[
  model("kiwi-pets","evcil-hayvan-bakim","kppc-10850","KPPC-10850 Evcil Hayvan Tüy Kesme Makinesi ve Bakım Seti","KPPC-10850","https://kiwi.com.tr/tr/kiwi-pets/evcil-hayvan-bakimi-80-c/kppc-10850-327-pt"),
  model("powertec","pet-clipper","tr-9100","TR-9100 Kedi Köpek Pet Evcil Hayvan Tıraş Makinesi","TR-9100","https://www.powertec.com.tr/urun/tr-9100-profesyonel-kopek-kedi-hayvan-tiras-makinesi-74"),
  model("powertec","pet-clipper","tr-9000","TR-9000 Kedi Köpek Tıraş Makinesi Seti","TR-9000","https://www.powertec.com.tr/urun/tr-9000-kedi-kopek-tiras-makinesi-seti-pet-evcil-hayvan-tuy-kesme-makas-ve-metal-tarak-hediyeli-145"),
  model("bezt","pet-care","pro-groom","Pro Groom Evcil Hayvan Kedi Köpek Bakım Seti","BZT-PET09","https://bezt.com.tr/bezt-pro-groom-evcil-hayvan-kedi-kopek-bakim-seti",{vacuum:true}),
  model("wahl","km-serisi","km10","KM10 Profesyonel Hayvan Tıraş Makinesi","KM10 / 9791","https://www.wahlpro.com/shop/km10-km10",{manualUrl:"https://www.wahlpro.com/shop/km10-km10",cordless:false}),
  model("wahl","km-serisi","km5","KM5 Profesyonel Hayvan Tıraş Makinesi","KM5 / 9787","https://www.wahlpro.com/amfile/file/download/file/3045/product/6129/",{supportUrl:"https://www.wahlpro.com/animal",manualUrl:"https://www.wahlpro.com/amfile/file/download/file/3045/product/6129/",cordless:false}),
  model("andis","pet-clippers","agc2","AGC2 Professional 2-Speed Detachable Blade Clipper","AGC2 / 22610","https://international.andis.com/shop/detail/22610/professional-2-speed-detachable-blade-clipper-eu",{cordless:false}),
  model("andis","pet-clippers","pulse-zr-ii","Pulse ZR II Detachable Blade Clipper","DBLC-2 / 79175","https://andis.com/shop/detail/79175/pulse-zr-ii-detachable-blade-clipper-ukeuaus"),
  model("andis","pet-clippers","envision","enVISION Cordless Clipper Pet","CLC-5 / 561134","https://www.andis.com/shop/detail/561134/envision-cordless-clipper-pet"),
  model("heiniger","opal","opal","Opal Cordless Battery Clipper","Opal / 709-000 EU-CH","https://heiniger-pet-grooming.com/en/produkte/schermaschine/show/opal"),
  model("heiniger","opal","opal-special-edition","Opal Special Edition Cordless Clipper","Opal Special Edition / 709-016 EU-CH","https://heiniger-pet-grooming.com/produkte/schermaschine/show/opal-special-edition"),
  model("heiniger","saphir","saphir-basic","Saphir Basic Cordless Animal Clipper","Saphir Basic / 707-300 EU-CH","https://heiniger-pet-grooming.com/en/produkte/schermaschine/show/saphir-basic"),
  model("heiniger","saphir","saphir-style","Saphir Style Cordless Animal Clipper","Saphir Style / 707-750 EU-CH","https://heiniger-pet-grooming.com/produkte/schermaschine/show/saphir-style"),
  model("heiniger","saphir","saphir-pink","Saphir Pink Cordless Animal Clipper","Saphir Pink","https://heiniger-pet-grooming.com/en/produkte/schermaschine/show/saphir-pink"),
  model("neakasa","p-serisi-grooming-vacuum","p0-pro","P0 Pro Pet Grooming Vacuum","P0 Pro","https://neakasa.com/pages/pet-grooming-faq",{supportUrl:"https://neakasa.com/pages/support-center",manualUrl:"https://neakasa.com/pages/support-center",vacuum:true,cordless:false}),
  model("neakasa","p-serisi-grooming-vacuum","p1-pro","P1 Pro 5-in-1 Pet Grooming Vacuum Kit","P1 Pro","https://neakasa.com/products/neakasa-p1-pro-pet-grooming-vacuum",{supportUrl:"https://neakasa.com/pages/support-center",manualUrl:"https://neakasa.com/pages/support-center",vacuum:true,cordless:false}),
  model("neakasa","p-serisi-grooming-vacuum","p2-pro","P2 Pro 5-in-1 Pet Grooming Vacuum Kit","P2 Pro","https://neakasa.com/products/neakasa-p2-pro-dog-grooming-kit-vacuum",{supportUrl:"https://neakasa.com/pages/support-center",manualUrl:"https://neakasa.com/pages/support-center",vacuum:true,cordless:false}),
  model("aesculap","exacta","gt416","Exacta Battery-operated Trimmer","GT416","https://www.aesculap-schermaschinen.de/en/product/aesculap-battery-operated-trimmer-exacta/938527/94729")
];

export const petGroomingScreening={
  sourceUrl:MARKET,observedListings:265,observedBrands:37,screenedAt:VERIFIED_AT,acceptedModels:petGroomingModels.length,
  policy:"Akakçe pazar keşfidir. Yalnız tam cihaz, tekilleştirilmiş model ve resmî model/kullanım-bakım kaynağı doğrulanan kayıt public kataloğa alınır.",
  held:[
    {brand:"Kiwi Pets",items:["KPPC-10851"],reason:"Akakçe kaydı görüldü; bu taramada model-spesifik resmî teknik/kılavuz sayfası doğrulanamadı."},
    {brand:"BEZT",items:["Pet Trim"],reason:"Akakçe kaydı görüldü; Pro Groom kadar güçlü model-spesifik resmî dokümantasyon doğrulanamadı."},
    {brand:"Petkit",items:["2-in-1 Trimmer","Pro 2-in-1 Trimmer"],reason:"Resmî destek/kılavuz merkezinde bu tam trimmer modelleri model-spesifik olarak doğrulanamadı."},
    {brand:"Goldmaster",items:["GM-9125","GM-8149","GM-9126"],reason:"Bu taramada resmî model-spesifik kullanım/bakım kaynağı doğrulanamadı."},
    {brand:"Moser",items:["Max 50 Black","Prima Trimmer","Arko Pro"],reason:"Akakçe adayları mevcut; güncel resmî model-spesifik doküman eşleştirmesi tamamlanmadan public rota açılmadı."},
    {brand:"Heiniger",items:["Saphir Cord","Style Mini"],reason:"Akakçe kaydı mevcut; bu turda tam ürün+kılavuz eşleşmesi diğer Heiniger modelleri kadar güçlü doğrulanamadı."}
  ],
  excludedKinds:["yedek bıçak","bıçak seti","tarak/başlık","yalnız aksesuar","renk/paket tekrarı","insan saç/sakal makinesi yanlış kategori eşleşmesi"]
};
