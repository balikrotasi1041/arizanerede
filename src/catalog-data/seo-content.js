export const SEO_ROLLOUT_STAGE=1;
export const SEO_UPDATED="2026-09-02";

const STANDALONE_PREFIXES=[
  "roborock-error-",
  "philips-error-",
  "xiaomi-error-",
  "xiaomi-6-pro-error-",
  "xiaomi-5-plus-error-table",
  "daikin-",
  "canon-"
];

const STAGE_ONE_MODELS=[
  ["roborock","S8"],
  ["roborock","S8 MaxV Ultra"],
  ["philips","5500 Serisi LatteGo EP5547/90"],
  ["xiaomi","Electric Scooter 6 Pro"],
  ["daikin","Sensira FTXF50F"],
  ["canon","PIXMA G3410"],
  ["canon","PIXMA G3411"]
];

const STAGE_ONE_XIAOMI_CODES=new Set(["Error 10","Error 14","Error 15","Error 18","Error 21","Error 35","Error 36","Error 39","Error 53"]);
const STAGE_ONE_CANON_CODES=new Set(["1640","5100","5200","5B00"]);

const modelIsStageOne=model=>STAGE_ONE_MODELS.some(([brand,name])=>model.brand===brand&&model.name===name);
const standaloneCluster=cluster=>STANDALONE_PREFIXES.some(prefix=>cluster.slug===prefix||cluster.slug.startsWith(prefix));

function issueCode(cluster){
  const error=cluster.title.match(/Error\s+[0-9]+(?:\/[0-9]+)?/i);
  if(error)return error[0].replace(/^error/i,"Error");
  const daikin=cluster.title.match(/Daikin\s+([A-Z][A-Z0-9]+)/i);
  if(daikin)return daikin[1].toUpperCase();
  const canon=cluster.title.match(/Canon\s+(?:Support Code\s+)?([A-Z0-9]{3,6})/i);
  if(canon)return canon[1].toUpperCase();
  return cluster.title.split(":")[0].trim();
}

function cleanIssueSlug(cluster){
  return cluster.slug
    .replace(/^roborock-/,"")
    .replace(/^philips-/,"")
    .replace(/^xiaomi-6-pro-/,"")
    .replace(/^xiaomi-/,"")
    .replace(/^daikin-/,"")
    .replace(/^canon-/,"");
}

function seoTier(model,cluster){
  if(!modelIsStageOne(model))return 2;
  const code=issueCode(cluster);
  if(model.brand==="xiaomi"&&!STAGE_ONE_XIAOMI_CODES.has(code))return 2;
  if(model.brand==="canon"&&!STAGE_ONE_CANON_CODES.has(code))return 2;
  return 1;
}

export function buildStandaloneIssues(models,brands){
  const brandMap=new Map(brands.map(brand=>[brand.slug,brand]));
  const output=[];
  for(const model of models){
    const brand=brandMap.get(model.brand);
    if(!brand)continue;
    for(const cluster of model.symptomClusters||[]){
      if(!standaloneCluster(cluster))continue;
      const code=issueCode(cluster);
      const titleTail=cluster.title.includes(":")?cluster.title.split(":").slice(1).join(":").trim():cluster.title;
      output.push({
        deviceType:model.deviceType,
        brand:model.brand,
        family:model.family,
        model:model.slug,
        slug:cleanIssueSlug(cluster),
        code,
        title:`${brand.name} ${model.name} ${code}${titleTail&&titleTail!==code?`: ${titleTail}`:""}`,
        short:cluster.summary,
        meaning:cluster.summary,
        risk:cluster.risk,
        userCanTry:cluster.userCanTry!==false&&cluster.risk!=="high",
        steps:cluster.steps||[],
        stopWhen:cluster.stopWhen,
        safety:cluster.safety,
        parts:[],
        manualNotes:[{term:code,explanation:cluster.summary}],
        queryIntents:[
          `${brand.name} ${model.name} ${code}`,
          `${brand.name} ${model.modelCode||model.name} ${code} nedir`,
          `${brand.name} ${model.name} ${code} çözümü`,
          `${brand.name} ${model.name} hata kodu ${code.replace(/^Error\s+/i,"")}`
        ],
        officialSource:{label:`${brand.name} resmî teknik kaynak`,url:cluster.source?.url||model.supportUrl},
        communityAlternatives:cluster.communityAlternatives||[],
        updated:model.verifiedAt||SEO_UPDATED,
        seoTier:seoTier(model,cluster),
        generatedFrom:"official-model-specific-cluster"
      });
    }
  }
  return output;
}

export const editorialGuides=[
  {
    slug:"tchibo-cafissimo-isik-uyarilari",
    title:"Tchibo Cafissimo ışık uyarıları ve sık sorunlar",
    description:"Cafissimo kontrol lambaları, kireç uyarısı, su haznesi, kol ve akış sorunları için Tchibo'nun resmî kılavuz ve destek bilgilerinin özeti.",
    deviceType:"kahve-makinesi",brand:"tchibo",family:"cafissimo",seoTier:1,
    intro:"Cafissimo modellerinde ışığın rengi ve yanıp sönme biçimi modele göre farklı anlam taşıyabilir. Aşağıdaki bilgiler Tchibo'nun resmî Cafissimo yardım sayfası ve Cafissimo Mini/Pure kılavuzlarında açıkça yayımlanan ortak kullanıcı kontrollerini bir araya getirir. Kendi modelinizin kılavuzu son sözdür.",
    sections:[
      {title:"Kırmızı kontrol lambası yanıp sönüyor",text:"Cafissimo Mini kılavuzunda kırmızı yanıp sönen kontrol lambası boş su haznesiyle ilişkilendirilir. Hazneyi taze suyla doldurun, doğru oturttuğunuzu kontrol edin ve model kılavuzundaki yeniden başlatma/doldurma adımını izleyin.",risk:"low"},
      {title:"Sarı kontrol lambası / kireç uyarısı",text:"Tchibo'nun Cafissimo Mini kılavuzu sarı uyarıyı kireç giderme ihtiyacıyla ilişkilendirir. Tchibo ayrıca Cafissimo sisteminde düzenli kireç çözmeyi ve modelin kullanım kılavuzundaki programa uyulmasını önerir.",risk:"low"},
      {title:"Makine ses çıkarıyor ama kahve akmıyor",text:"Tchibo'nun Cafissimo yardım sayfası yoğun kireçlenmenin demlemeyi bozabileceğini ve yüksek sese yol açabileceğini belirtir. Önce modelin resmî kireç çözme programı uygulanır; sorun sürerse teknik servise geçilir.",risk:"low"},
      {title:"Kol kapanmıyor",text:"Cafissimo Mini kılavuzunda kapsül haznesinin doluluğu ve deforme/sıkışmış kapsül kontrol edilir. Kolu zorlamayın; mekanik direnç devam ederse servise başvurun.",risk:"low"},
      {title:"Kireç giderme durulaması yarıda kaldı",text:"Mini kılavuzunda durulama aşamasında su haznesinin yeterli seviyede doldurulması ve programın model talimatına göre tamamlanması istenir. Program sürekli yarıda kalıyorsa cihazı açmadan Tchibo desteğine geçin.",risk:"low"}
    ],
    sources:[
      {label:"Tchibo Cafissimo yardım ve kılavuz merkezi",url:"https://www.tchibo.com.tr/c/yardim-cafissimo-hakkinda-bilgiler"},
      {label:"Tchibo şikayet, garanti ve teknik destek",url:"https://www.tchibo.com.tr/c/yardim-sikayet-garanti"},
      {label:"Cafissimo Mini resmî kullanım kılavuzu",url:"https://www.tchibo.com.tr/newmedia/document/1887284dddcb09e1/anleitung-cafissimo-mini.pdf"}
    ],
    stopWhen:"Su/elektrik kaçağı, yanık kokusu, pompanın anormal çalışması, kol mekanizmasında fiziksel kırılma veya resmî bakım sonrasında devam eden arıza varsa gövdeyi açmayın ve Tchibo teknik desteğine geçin.",
    safety:"Kahve makinesinin pompa, ısıtıcı, elektrik kartı veya kapalı gövdesi kullanıcı tamiri kapsamında değildir."
  },
  {
    slug:"nespresso-kirec-uyarisi",
    title:"Nespresso kireç çözme uyarısı: ne yapmalı?",
    description:"Nespresso Original ve Vertuo makinelerinde kireç çözme uyarısı görüldüğünde model kılavuzu, resmî kireç çözücü ve güvenli bakım sınırı.",
    deviceType:"kahve-makinesi",brand:"nespresso",family:"kapsul-kahve-makineleri",seoTier:1,
    intro:"Nespresso makinelerinde kireç çözme adımı modele göre değişir. Nespresso Türkiye, makine yardım sayfasında modeli seçerek kireç çözme talimatının izlenmesini ve resmî kireç çözme ürününün kullanım kılavuzuna göre uygulanmasını önerir.",
    sections:[
      {title:"Önce tam modeli doğrulayın",text:"Essenza Mini, Creatista, Lattissima ve Vertuo gibi ailelerin tuş kombinasyonları ve program akışı aynı değildir. Makine yardım merkezinde kendi modelinizi seçmeden başka modelin tuş sırasını uygulamayın.",risk:"low"},
      {title:"Resmî kireç çözme programını tamamlayın",text:"Nespresso Türkiye'nin ürün ve makine yardım sayfalarında kireç çözme işlemi model bazında gösterilir. Program başladıktan sonra durulama dahil model talimatındaki bütün aşamaları tamamlayın.",risk:"low"},
      {title:"Sirke kullanmayın",text:"Nespresso Türkiye'nin kireç çözme kiti sayfası sirke kullanımının makineye zarar verebileceği konusunda açık uyarı içerir. Üreticinin önerdiği kireç çözme yöntemini kullanın.",risk:"low"},
      {title:"Uyarı gitmiyorsa",text:"Kireç çözme ve durulama doğru tamamlandığı halde uyarı devam ediyorsa rastgele reset kombinasyonları yerine modelin resmî makine yardımını ve Nespresso Müşteri İletişim Merkezi'ni kullanın.",risk:"medium"}
    ],
    sources:[
      {label:"Nespresso Türkiye makine yardımı",url:"https://www.nespresso.com/tr/tr/machine-assistance"},
      {label:"Nespresso Türkiye kireç çözme kiti ve güvenlik uyarıları",url:"https://www.nespresso.com/tr/tr/order/accessories/original/descaling-kit"},
      {label:"Nespresso Türkiye hizmetler ve teknik destek",url:"https://www.nespresso.com/tr/tr/services"}
    ],
    stopWhen:"Makine su kaçırıyor, elektriksel koku/ısı oluşuyor, pompa hiç akış vermiyor veya resmî kireç çözme programı tamamlanamıyorsa servise geçin.",
    safety:"Isıtıcı, pompa ve elektrikli gövdeyi açmayın; model dışı reset veya kimyasal kullanmayın."
  }
];

export const serviceGuides=[
  {
    slug:"sharkninja",title:"Shark ve Ninja Türkiye yetkili servis ve destek",description:"Shark ve Ninja ürünlerinde Türkiye resmî destek hattı, servis noktaları, kullanım kılavuzu, sorun giderme ve garantiye geçiş yolu.",seoTier:1,brands:["shark","ninja"],
    officialUrl:"https://www.sharkninja.com.tr/pages/destek",serviceUrl:"https://www.sharkninja.com.tr/pages/destek",phone:"0 (850) 433 43 30",email:"contact@md.sharkninja.com.tr",
    summary:"SharkNinja Türkiye resmî destek merkezi servis noktaları, ürün kaydı, kullanım kılavuzları, sorun giderme, yedek parça ve aksesuar desteğini aynı merkezden sunuyor. İsimli servis yalnızca bu resmî kanal veya markanın yönlendirdiği kayıt üzerinden doğrulanmalıdır."
  },
  {
    slug:"tchibo",title:"Tchibo Cafissimo Türkiye teknik servis ve garanti",description:"Cafissimo kahve makineleri için Tchibo Türkiye teknik destek, onarım, garanti, yedek parça ve servise gönderim bilgileri.",seoTier:1,brands:["tchibo"],
    officialUrl:"https://www.tchibo.com.tr/c/yardim-sikayet-garanti",serviceUrl:"https://www.tchibo.com.tr/c/yardim-sikayet-garanti",phone:"444 2 826",email:"servis@tchibo.com.tr",
    summary:"Tchibo Türkiye, Cafissimo ve Tchibo markalı elektronik ürünler için teknik destek, onarım, gerekli görülürse değişim/iade onayı ve yedek parça süreçlerini resmî müşteri hizmetleri üzerinden yürütüyor. Servise gönderim adresi için önce Tchibo Müşteri Hizmetleri ile iletişim kurulmalıdır."
  },
  {
    slug:"nespresso",title:"Nespresso Türkiye makine servisi ve teknik destek",description:"Nespresso kahve makineleri için Türkiye makine yardımı, müşteri iletişim merkezi ve teknik servis yönlendirmesi.",seoTier:1,brands:["nespresso"],
    officialUrl:"https://www.nespresso.com/tr/tr/machine-assistance",serviceUrl:"https://www.nespresso.com/tr/tr/services",phone:"0800 211 01 00 / 444 20 21",email:"",
    summary:"Nespresso Türkiye, tüketici makineleri için makine yardımı ve Müşteri İletişim Merkezi üzerinden teknik servis desteği sunuyor. Model bazlı bakım ve sorun giderme adımları makine yardım merkezinden seçilmelidir."
  },
  {
    slug:"dreame",title:"Dreame Türkiye yetkili servis ve müşteri desteği",description:"Dreame Türkiye ürün desteği, kılavuz, servis iletişimi ve marka tarafından yayımlanan servis merkezlerine ulaşım.",seoTier:1,brands:["dreame"],
    officialUrl:"https://dreametech.com.tr/pages/product-support",serviceUrl:"https://dreametech.com.tr/pages/contact",phone:"0850 762 0100",email:"servis_tr@dreame.tech",
    summary:"Dreame Türkiye ürün desteği, kılavuz ve servis iletişim kanallarını resmî sitesinde yayımlar. Fizikî servis adı yalnızca Dreame'nin güncel resmî kanalında doğrulandığı ölçüde kullanılmalıdır."
  }
];

export const indexableEditorialGuides=editorialGuides.filter(x=>x.seoTier<=SEO_ROLLOUT_STAGE);
export const indexableServiceGuides=serviceGuides.filter(x=>x.seoTier<=SEO_ROLLOUT_STAGE);
export const editorialGuideBySlug=new Map(editorialGuides.map(x=>[x.slug,x]));
export const serviceGuideBySlug=new Map(serviceGuides.map(x=>[x.slug,x]));
export const serviceGuideByBrand=new Map(serviceGuides.flatMap(guide=>guide.brands.map(brand=>[brand,guide])));
