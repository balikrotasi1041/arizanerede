export const SITE_ORIGIN = "https://arizanerede.com";
export const LAST_VERIFIED = "2026-08-23";
export const SERBIS_URL = "https://www.servis.gov.tr/Genel/Sorgu";

export const PROVINCES = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkâri","Hatay","Iğdır","Isparta","İstanbul","İzmir","Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kırıkkale","Kırklareli","Kırşehir","Kilis","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir","Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Şanlıurfa","Şırnak","Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"
];

export const deviceTypes = [
  { slug: "robot-supurge", name: "Robot Süpürge", description: "Hata kodları, haritalama, şarj, istasyon, sensör, filtre ve bakım sorunları." },
  { slug: "dikey-supurge", name: "Dikey Süpürge", description: "Filtre, hava akışı, batarya, fırça ve ekran uyarıları." },
  { slug: "kahve-makinesi", name: "Kahve Makinesi", description: "Hata kodları, demleme, kireç, su akışı, öğütücü ve bakım uyarıları." }
];

export const brands = [
  {
    slug: "roborock", name: "Roborock", deviceTypes: ["robot-supurge"], officialTurkey: "https://tr.roborock.com/",
    supportUrl: "https://help.roborock.com/", serviceUrl: "https://tr.roborock.com/pages/contact-us",
    warrantyUrl: "https://tr.roborock.com/pages/service-warranty", serviceMode: "national",
    serviceSummary: "Türkiye resmî sayfasında tek yetkili servis olarak RECCI TEKNOLOJİ A.Ş. belirtiliyor.",
    nationalService: { name: "RECCI TEKNOLOJİ A.Ş.", city: "İstanbul", address: "19 Mayıs Mah., Dr. Hüsnü İsmet Öztürk Sok. No:1A/21 Şişli / İstanbul", phone: "0850 308 67 77", whatsapp: "0544 308 80 00", email: "support-tr@roborock-eu.com" }
  },
  {
    slug: "dyson", name: "Dyson", deviceTypes: ["dikey-supurge"], officialTurkey: "https://www.dyson.com.tr/",
    supportUrl: "https://www.dyson.com.tr/destek", serviceUrl: "https://www.dyson.com.tr/destek/servis-noktalari",
    serviceMode: "official-directory", serviceSummary: "Dyson Türkiye, SERBİS'e kayıtlı yetkili servislerini il ve ilçe bilgileriyle resmî servis sayfasında yayımlıyor.",
    nationalService: { phone: "0850 532 1144" }
  },
  {
    slug: "philips", name: "Philips", deviceTypes: ["kahve-makinesi", "dikey-supurge"], officialTurkey: "https://www.philips.com.tr/",
    supportUrl: "https://www.philips.com.tr/c-w/support-home.html", serviceUrl: "https://www.philips.com.tr/c-s/support/service-locator",
    serviceMode: "locator", serviceSummary: "Philips'in resmî servis bulucusu ürün grubu ve konum bilgisiyle yetkili servisleri listeliyor."
  },
  {
    slug: "xiaomi", name: "Xiaomi", deviceTypes: ["robot-supurge"], officialTurkey: "https://www.mi.com/tr/",
    supportUrl: "https://www.mi.com/tr/support/", serviceUrl: "https://www.mi.com/tr/support/service-centre/",
    manualUrl: "https://www.mi.com/tr/support/user-guide/", serviceMode: "locator",
    serviceSummary: "Xiaomi Türkiye resmî servis merkezi bulucusu cihaz türü ve konuma göre yetkili servis araması sağlıyor."
  },
  {
    slug: "dreame", name: "Dreame", deviceTypes: ["robot-supurge", "dikey-supurge"], officialTurkey: "https://dreametech.com.tr/",
    supportUrl: "https://dreametech.com.tr/pages/product-support", serviceUrl: "https://dreametech.com.tr/pages/contact",
    manualUrl: "https://dreametech.com.tr/pages/kullanici-kilavuzu", serviceMode: "limited-centres",
    serviceSummary: "Dreame Türkiye resmî sayfası Ankara ve İstanbul'daki yetkili servis merkezlerini yayımlıyor.",
    nationalService: { phone: "0850 762 0100", email: "servis_tr@dreame.tech" },
    centres: [
      { city: "Ankara", name: "BDH Bilişim Destek Hizmetleri Sanayi ve Ticaret A.Ş.", address: "Kızılay Mah. Necatibey Cad. No:55/A Çankaya / Ankara" },
      { city: "İstanbul", name: "BDH Bilişim Destek Hizmetleri Sanayi ve Ticaret A.Ş.", address: "Bağlarbaşı Mah. Cemal Bey Cad. No:110 Maltepe / İstanbul" },
      { city: "İstanbul", name: "Teknoser Bilişim A.Ş.", address: "Yeşilce Mah. Demirbaş Sk. No:10 Kağıthane / İstanbul" },
      { city: "İstanbul", name: "Ouno Teknik Servis Hizmetleri A.Ş.", address: "Tepeören Demokrasi Cad. No:137 Tuzla / İstanbul" }
    ]
  }
];

// "Aile/seri" katmanı kullanıcı menüsündeki "model" seviyesidir. Exact model bir sonraki katmandır.
export const families = [
  { deviceType: "robot-supurge", brand: "roborock", slug: "s-serisi", name: "S Serisi" },
  { deviceType: "dikey-supurge", brand: "dyson", slug: "v15-serisi", name: "V15 Serisi" },
  { deviceType: "kahve-makinesi", brand: "philips", slug: "5400-series", name: "5400 Series" },
  { deviceType: "robot-supurge", brand: "xiaomi", slug: "s10-serisi", name: "S10 Serisi" },
  { deviceType: "robot-supurge", brand: "dreame", slug: "l10s-serisi", name: "L10s Serisi" }
];

export const models = [
  {
    deviceType: "robot-supurge", brand: "roborock", family: "s-serisi", slug: "s8", name: "S8",
    supportUrl: "https://help.roborock.com/en-US/product/s8", manualUrl: "https://help.roborock.com/en-US/product/s8",
    softwareResources: [{ label: "Roborock resmî destek", url: "https://help.roborock.com/", note: "Firmware ve uygulama işlemlerinde yalnızca üreticinin resmî kanalını kullanın." }],
    officialLabel: "Roborock S8 resmî destek merkezi"
  },
  {
    deviceType: "dikey-supurge", brand: "dyson", family: "v15-serisi", slug: "v15-detect", name: "V15 Detect",
    supportUrl: "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/owners",
    manualUrl: "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/owners",
    softwareResources: [], officialLabel: "Dyson V15 resmî sahip/destek sayfası"
  },
  {
    deviceType: "kahve-makinesi", brand: "philips", family: "5400-series", slug: "ep5441-50", name: "EP5441/50",
    supportUrl: "https://www.philips.com.tr/c-p/EP5441_50/philips-5400-series-fully-automatic-espresso-machines/destek",
    manualUrl: "https://www.philips.com.tr/c-p/EP5441_50/philips-5400-series-fully-automatic-espresso-machines/destek",
    softwareResources: [], officialLabel: "Philips EP5441/50 resmî destek ve belgeler"
  },
  {
    deviceType: "robot-supurge", brand: "xiaomi", family: "s10-serisi", slug: "robot-vacuum-s10-plus", name: "Robot Vacuum S10+",
    supportUrl: "https://www.mi.com/tr/support/", manualUrl: "https://www.mi.com/tr/support/user-guide-pdf/xiaomi-robot-vacuum-s10%2B/",
    softwareResources: [{ label: "Xiaomi Türkiye destek", url: "https://www.mi.com/tr/support/", note: "Uygulama ve cihaz yazılımı için resmî destek kanalını kullanın." }],
    officialLabel: "Xiaomi Türkiye resmî destek/kılavuz"
  },
  {
    deviceType: "robot-supurge", brand: "dreame", family: "l10s-serisi", slug: "l10s-ultra", name: "L10s Ultra",
    supportUrl: "https://dreametech.com.tr/pages/product-support", manualUrl: "https://dreametech.com.tr/pages/kullanici-kilavuzu",
    softwareResources: [{ label: "Dreame ürün desteği", url: "https://dreametech.com.tr/pages/product-support", note: "Firmware ve uygulama adımlarını yalnızca üreticinin resmî kanallarından izleyin." }],
    officialLabel: "Dreame Türkiye resmî destek ve kılavuzlar"
  }
];

export const issues = [
  {
    deviceType: "robot-supurge", brand: "roborock", family: "s-serisi", model: "s8", slug: "error-10", code: "Error 10",
    title: "Roborock S8 Error 10", short: "Filtre kontrolü gerekiyor.",
    meaning: "Roborock'un resmî yönlendirmesi Error 10 için filtreyi temizlemeyi, tamamen kurutmayı ve yeniden takmayı öneriyor.",
    risk: "low", userCanTry: true,
    steps: [
      "Cihazı durdurun ve filtreyi çıkarın.",
      "Filtrede belirgin kir veya tıkanıklık olup olmadığını kontrol edin ve üreticinin bakım talimatına göre temizleyin.",
      "Filtreyi tamamen kurutmadan yeniden takmayın.",
      "Filtre tamamen kuruyken yeniden takın ve cihazı yeniden deneyin."
    ],
    stopWhen: "Hata temiz ve tamamen kuru filtreyle devam ediyorsa cihazı sökmeyin; yetkili desteğe geçin.",
    safety: "Islak veya nemli filtreyi cihaza geri takmayın. Motor bölümüne müdahale etmeyin.",
    parts: [
      { name: "Uyumlu filtre", need: "Filtre hasarlı, deforme veya kullanım ömrünü doldurmuşsa gerekebilir.", sourceType: "üretici uyumluluğu doğrulanmalı" }
    ],
    manualNotes: [
      { term: "Error 10", explanation: "Filtre bakım/kontrol uyarısı olarak ele alınır; model kapsamı resmî destek kaynağından doğrulanır." }
    ],
    queryIntents: [
      "Roborock S8 Error 10 nedir", "Roborock S8 Error 10 ne anlama geliyor", "Roborock S8 Error 10 ne yapmalıyım",
      "Roborock S8 Error 10 nasıl giderilir", "Roborock S8 Error 10 kendim giderebilir miyim", "Roborock S8 Error 10 hangi parça gerekir",
      "Roborock S8 kullanıcı kılavuzu Error 10"
    ],
    officialSource: { label: "Roborock resmî Error 10 çözümü", url: "https://support.roborock.com/hc/en-us/articles/360035731571-What-should-I-do-when-error-10-occurs" },
    updated: LAST_VERIFIED
  },
  {
    deviceType: "dikey-supurge", brand: "dyson", family: "v15-serisi", model: "v15-detect", slug: "filtre-temizleme-uyarisi", code: "Filtre uyarısı",
    title: "Dyson V15 filtre temizleme uyarısı", short: "Filtrenin bakım zamanı gelmiş olabilir.",
    meaning: "Dyson V15 resmî destek sayfası, filtre bakımını yaklaşık ayda bir öneriyor ve filtre yıkandıktan sonra tamamen kurumasını istiyor.",
    risk: "low", userCanTry: true,
    steps: ["Cihazı kapatın ve şarjdan ayırın.", "Filtreyi üreticinin resmî bakım adımlarına göre çıkarın ve temizleyin.", "Filtreyi iyi havalanan bir yerde tamamen kurutun.", "Tamamen kuru olduğundan emin olduktan sonra yeniden takın."],
    stopWhen: "Uyarı kuru ve doğru takılmış filtreyle devam ediyorsa servis desteğine geçin.",
    safety: "Dyson resmî desteği filtrenin en az 24 saat kurumaya bırakılmasını öneriyor. Nemliyken geri takmayın.",
    parts: [{ name: "Uyumlu filtre", need: "Filtre fiziksel olarak hasarlıysa veya bakım sonrasında sorun sürüyorsa gerekebilir.", sourceType: "Dyson uyumluluğu doğrulanmalı" }],
    manualNotes: [{ term: "Filtre uyarısı", explanation: "Filtre bakım ihtiyacını bildirir; bakım ve kurutma adımları modelin resmî destek sayfasından izlenmelidir." }],
    queryIntents: ["Dyson V15 filtre ışığı ne demek", "Dyson V15 filtre uyarısı ne yapmalıyım", "Dyson V15 filtre nasıl temizlenir", "Dyson V15 filtre değiştirmeli miyim", "Dyson V15 kullanıcı kılavuzu filtre"],
    officialSource: { label: "Dyson V15 resmî destek", url: "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/owners" }, updated: LAST_VERIFIED
  },
  {
    deviceType: "dikey-supurge", brand: "dyson", family: "v15-serisi", model: "v15-detect", slug: "hava-kanali-tikali", code: "Hava yolu tıkalı",
    title: "Dyson V15 hava yolu tıkalı uyarısı", short: "Hava akış yolunda tıkanıklık olabilir.",
    meaning: "Dyson V15 resmî destek sayfası hava yolu tıkanıklığı uyarısı gösterildiğinde hava yollarının kontrol edilmesini öneriyor.",
    risk: "medium", userCanTry: true,
    steps: ["Cihazı kapatın ve şarjdan ayırın.", "Hazne, boru ve erişilebilir hava yolu parçalarında görünür tıkanıklık olup olmadığını kontrol edin.", "Yalnızca kullanıcı tarafından çıkarılmak üzere tasarlanmış parçaları sökün.", "Tıkanıklığı giderdikten sonra parçaları doğru şekilde yerine takıp yeniden deneyin."],
    stopWhen: "Tıkanıklık motor gövdesinde görünüyorsa, erişilemiyorsa veya cihaz anormal ısınıyor/koku yapıyorsa kullanmayı bırakıp servise geçin.",
    safety: "Kesici alet, tel veya motor bölümüne girecek cisim kullanmayın. Kontrol sırasında cihaz çalışır durumda olmamalı.",
    parts: [],
    manualNotes: [{ term: "Hava yolu tıkalı", explanation: "Cihazın erişilebilir hava akış yolunda tıkanıklık algıladığını ifade eder." }],
    queryIntents: ["Dyson V15 hava yolu tıkalı ne demek", "Dyson V15 tıkanıklık nasıl giderilir", "Dyson V15 çekiş düştü ne yapmalıyım", "Dyson V15 kendim açabilir miyim"],
    officialSource: { label: "Dyson V15 resmî destek", url: "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/owners" }, updated: LAST_VERIFIED
  }
];

export const escalationRoutes = [
  { key: "warranty-repair", title: "Garanti kapsamında ücretsiz tamir yapılmıyorsa", url: "https://nereyebasvurulur.com/konu/garanti-kapsaminda-ucretsiz-tamir-yapilmiyor/" },
  { key: "service-no-repair", title: "Yetkili servis ürünü tamir etmiyorsa", url: "https://nereyebasvurulur.com/konu/yetkili-servis-urunu-tamir-etmiyor/" },
  { key: "defective-product", title: "Bozuk/kusurlu ürünü satıcı kabul etmiyorsa", url: "https://nereyebasvurulur.com/konu/bozuk-kusurlu-urun-satici-kabul-etmiyor/" },
  { key: "thh", title: "Tüketici Hakem Heyetine başvuru yolu", url: "https://nereyebasvurulur.com/konu/tuketici-hakem-heyetine-basvuru/" }
];

export const deviceTypeBySlug = new Map(deviceTypes.map(x => [x.slug, x]));
export const brandBySlug = new Map(brands.map(x => [x.slug, x]));
export const familyByKey = new Map(families.map(x => [`${x.deviceType}/${x.brand}/${x.slug}`, x]));
export const modelByKey = new Map(models.map(x => [`${x.deviceType}/${x.brand}/${x.family}/${x.slug}`, x]));
export const issueByKey = new Map(issues.map(x => [`${x.deviceType}/${x.brand}/${x.family}/${x.model}/${x.slug}`, x]));

export function pathForDeviceType(x) { return `/${x.slug}/`; }
export function pathForBrand(deviceType, brand) { return `/${deviceType}/${brand}/`; }
export function pathForFamily(x) { return `/${x.deviceType}/${x.brand}/${x.slug}/`; }
export function pathForModel(x) { return `/${x.deviceType}/${x.brand}/${x.family}/${x.slug}/`; }
export function pathForIssue(x) { return `/${x.deviceType}/${x.brand}/${x.family}/${x.model}/${x.slug}/`; }

export function normalize(value = "") {
  return String(value).toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}\s+-]/gu, " ").replace(/\s+/g, " ").trim();
}
