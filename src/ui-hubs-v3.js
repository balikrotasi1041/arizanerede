import {
  deviceTypes,brands,indexableIssues,indexableFamilies,indexableModels,indexableEditorialGuides,
  serviceGuideByBrand,pathForDeviceType,pathForBrand,pathForFamily,pathForModel,pathForIssue,supportLinksForBrand
} from "./catalog.js";
import {esc,ext,page,crumb,tree,SITE_ORIGIN} from "./ui-base.js";

function brandSupport(brand){
  const links=supportLinksForBrand(brand).map(([label,url])=>`<div class="source">${ext(url,label)}</div>`).join("");
  return `<div class="card"><span class="kicker">Marka destek merkezi</span><h3>Resmî kaynaklar</h3>${links}<p><b>Servis kuralı:</b> ${esc(brand.serviceSummary||"Yetkili servis adı yalnızca markanın resmî kaynağında doğrulanır.")}</p></div>`;
}

function renderCommunity(cluster){
  const items=(cluster.communityAlternatives||[]).filter(x=>x.userSafe===true&&!x.serviceLevel&&!x.requiresOpening&&!x.electricalWork&&!x.highCurrent&&!x.refrigerant);
  if(!items.length)return"";
  return `<details><summary>Kullanıcıların önerdiği alternatif yöntemler</summary><div class="stop" style="border-left-color:#0f766e;background:#f0f7f5"><b>Resmî yöntem değildir.</b> Yalnızca söküm, elektrik, yüksek akım, gaz/soğutucu veya güvenlik kritik ayar gerektirmeyen öneriler gösterilir.</div>${items.map(item=>`<div class="source"><p>${esc(item.method)}</p>${item.sourceUrl?ext(item.sourceUrl,item.sourceLabel||"Kullanıcı deneyimi"):esc(item.sourceLabel||"Kullanıcı deneyimi")}</div>`).join("")}</details>`;
}

function renderCluster(cluster){
  const checks=(cluster.safeChecks||[]).length?`<h3>Güvenli dış kontrol</h3><ul>${cluster.safeChecks.map(step=>`<li>${esc(step)}</li>`).join("")}</ul>`:"";
  const steps=cluster.risk==="high"?`<p><b>Onarım adımı verilmez.</b> Bu başlık servis sınırında tutulur.</p>${checks}`:`${checks}<ol>${(cluster.steps||[]).map(step=>`<li>${esc(step)}</li>`).join("")}</ol>`;
  const research=(cluster.researchSources||[]).filter(url=>typeof url==="string"&&url.startsWith("https://")).map((url,i)=>`<div class="source"><small>${i?"Ek teknik araştırma kaynağı":"Sorun ailesi için resmî teknik araştırma"}</small>${ext(url,"Kaynağı aç")}</div>`).join("");
  return `<div class="card"><span class="risk ${esc(cluster.risk)}">${cluster.risk==="high"?"Servis sınırı güçlü":cluster.risk==="medium"?"Dikkatli kullanıcı kontrolü":"Düşük riskli kullanıcı kontrolü"}</span><h2>${esc(cluster.title)}</h2><p>${esc(cluster.summary)}</p>${steps}<div class="stop"><b>Burada dur:</b> ${esc(cluster.stopWhen)}</div><details><summary>Güvenlik sınırı</summary><p>${esc(cluster.safety)}</p></details>${renderCommunity(cluster)}<div class="source"><small>Model kapsamı / resmî kılavuz-destek</small>${ext(cluster.source.url,cluster.source.label)}</div>${research}</div>`;
}

const quickProblems=[
  ["Açılmıyor","açılmıyor"],["Şarj olmuyor","şarj olmuyor"],["Hata kodu","hata kodu"],["Wi-Fi bağlanmıyor","wifi bağlanmıyor"],
  ["Ses var, görüntü yok","ses var görüntü yok"],["Kağıt sıkıştı","kağıt sıkıştı"],["Soğutmuyor","soğutmuyor"],["Batarya çabuk bitiyor","batarya hızlı bitiyor"],
  ["Servis bul","yetkili servis"],["Driver / BIOS","driver bios firmware"]
];

function topProblems(models,limit=10){
  const counts=new Map();
  for(const model of models)for(const cluster of model.symptomClusters||[])counts.set(cluster.title,(counts.get(cluster.title)||0)+1);
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"tr")).slice(0,limit).map(([title])=>title);
}
function problemPanel(items){
  if(!items.length)return"";
  return `<div class="problemBox"><span class="kicker">Araştırılan sorun alanları</span><h2>Bu grupta hangi arızalar ele alınıyor?</h2><div class="problemChips">${items.map(item=>`<span class="problemChip">${esc(item)}</span>`).join("")}</div></div>`;
}

export function renderHome(){
  const cards=deviceTypes.map(device=>{
    const published=indexableModels.filter(model=>model.deviceType===device.slug);
    return `<a class="card cardLink" href="${pathForDeviceType(device)}"><span class="kicker">Cihaz türü</span><h3>${esc(device.name)}</h3><p>${esc(device.description)}</p><small>${new Set(published.map(model=>model.brand)).size} doğrulanmış marka · ${published.length} tam model</small><br><b>Arıza ve model ağacını aç →</b></a>`;
  }).join("");
  const chips=quickProblems.map(([label,q])=>`<a class="problemChip" href="/ara/?q=${encodeURIComponent(q)}">${esc(label)}</a>`).join("");
  return page("Arıza Nerede? | Cihaz arızası, hata kodu, kılavuz ve resmî servis","Cihaz türünü, markayı, seriyi ve modeli seç; hata kodunun anlamını, güvenli çözümü, kılavuzu, sürücü/yazılım kaynağını ve resmî servisi bul.",`${SITE_ORIGIN}/`,`<div class="shell"><section class="hero"><span class="eyebrow">Teşhis ağacı + resmî kaynak</span><h1>Cihazın ne söylüyor? Arızanın izini adım adım bul.</h1><p>Marka, model, hata kodu, belirti, sürücü veya kılavuzdaki bir ibareyi ara. Resmî kaynak öncelikli, güvenli kullanıcı müdahalesi sınırları belirlenmiş cevap merkezi.</p><form class="search" action="/ara"><input name="q" maxlength="140" placeholder="Örn: Xiaomi Scooter şarj olmuyor"><button class="btn">Ara</button></form><div class="problemBox"><span class="kicker">Modeli bilmiyor musun?</span><h2>Sorunun ne?</h2><div class="problemChips">${chips}</div></div></section><section class="section" id="cihazlar"><h2>Cihaz türünü seç</h2><div class="grid">${cards}</div></section></div>`);
}

export function renderDeviceType(device){
  const rows=brands.filter(brand=>brand.deviceTypes.includes(device.slug)).map(brand=>({brand,count:indexableModels.filter(model=>model.deviceType===device.slug&&model.brand===brand.slug).length})).filter(item=>item.count>0).sort((a,b)=>a.brand.name.localeCompare(b.brand.name,"tr")).map(({brand,count})=>`<a class="card cardLink" href="${pathForBrand(device.slug,brand.slug)}"><span class="kicker">${count} doğrulanmış model</span><h3>${esc(brand.name)}</h3><p>Arıza başlıkları, hata kodları, kılavuz, yazılım/sürücü ve marka doğrulamalı servis kaynağı.</p></a>`).join("");
  return page(`${device.name} arızaları, hata kodları, markalar ve servis | Arıza Nerede?`,`${device.name} arızaları, hata kodları, markalar, kılavuz, sürücü/yazılım ve resmî servis kaynakları.`,`${SITE_ORIGIN}${pathForDeviceType(device)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name}])}<section class="detail"><span class="eyebrow">Cihaz türü</span><h1 class="title">${esc(device.name)} arızaları ve hata kodları</h1><p class="lead">Markayı seç. Yayındaki marka ve modeller yalnızca doğrulanmış kaynak ve yeterli sorun kapsamı bulunan kayıtlardan oluşur.</p><div class="grid">${rows}</div></section></div>`);
}

export function renderBrand(device,brand){
  const publishedFamilies=indexableFamilies.filter(family=>family.deviceType===device.slug&&family.brand===brand.slug);
  const publishedModels=indexableModels.filter(model=>model.deviceType===device.slug&&model.brand===brand.slug);
  const directIssues=indexableIssues.filter(issue=>issue.deviceType===device.slug&&issue.brand===brand.slug);
  const familyRows=publishedFamilies.map(family=>{
    const familyModels=publishedModels.filter(model=>model.family===family.slug);
    return `<a class="card cardLink" href="${pathForFamily(family)}"><span class="kicker">${family.familyKind==="official-family"?"Resmî seri / aile":"Ürün grubu"}</span><h3>${esc(family.name)}</h3><p>${familyModels.length} tam model · ${familyModels.reduce((n,m)=>n+(m.symptomClusters||[]).length,0)} araştırılmış sorun alanı.</p></a>`;
  }).join("");
  const serviceGuide=serviceGuideByBrand.get(brand.slug);
  const guideLinks=indexableEditorialGuides.filter(guide=>guide.brand===brand.slug).map(guide=>`<a class="route" href="/rehber/${guide.slug}/">${esc(guide.title)} →</a>`).join("");
  const serviceBlock=serviceGuide?`<div class="card" style="margin-top:14px"><span class="kicker">Resmî servis merkezi</span><h3>${esc(serviceGuide.title)}</h3><p>Marka tarafından yayımlanan servis ve destek kanalını tek sayfada aç.</p><a class="btn alt" href="/servis/${serviceGuide.slug}/">Servis rehberini aç →</a></div>`:"";
  const editorialBlock=guideLinks?`<div class="card" style="margin-top:14px"><span class="kicker">Özel teknik rehberler</span><div class="routes" style="margin-top:10px">${guideLinks}</div></div>`:"";
  return page(`${brand.name} ${device.name} arızaları, hata kodları, kılavuz ve yetkili servis | Arıza Nerede?`,`${brand.name} ${device.name} arızaları, hata kodları, resmî kılavuz, yazılım/sürücü ve marka doğrulamalı yetkili servis kaynakları.`,`${SITE_ORIGIN}${pathForBrand(device.slug,brand.slug)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name,url:pathForDeviceType(device)},{label:brand.name}])}<section class="detail"><span class="eyebrow">${esc(device.name)} teknik destek merkezi</span><h1 class="title">${esc(brand.name)} ${esc(device.name)} arızaları ve destek</h1><div class="answer"><strong>${publishedModels.length} tam model · ${directIssues.length} bağımsız hata/arıza sayfası</strong><span>Bu merkez model kataloğundan çok arıza, hata kodu, kılavuz, yazılım ve resmî servis erişimi için düzenlenir.</span></div><div class="cols"><article><p class="lead">Öncelik markanın kendi teknik verisidir. Hata kodları ve kullanıcı müdahalesi sınırları model bazında ayrılır; yetkili servis olarak yalnızca marka tarafından doğrulanan kanal gösterilir.</p>${problemPanel(topProblems(publishedModels))}<section style="margin-top:22px"><h2>Seriler ve tam model aileleri</h2><div class="grid">${familyRows}</div></section></article><aside class="side">${brandSupport(brand)}${serviceBlock}${editorialBlock}<div class="card" style="margin-top:14px"><span class="kicker">Servis veya garanti sorunu</span><p>Servis kaydı, teslim belgesi, garanti veya onarım uyuşmazlığında haklarınızı ayrı rehberden kontrol edin.</p><a class="btn alt" href="/servis-garanti-haklari/">Servis ve tüketici hakları →</a></div></aside></div></section></div>`);
}

export function renderFamily(device,brand,family){
  const familyModels=indexableModels.filter(model=>model.deviceType===device.slug&&model.brand===brand.slug&&model.family===family.slug);
  const familyIssues=indexableIssues.filter(issue=>issue.deviceType===device.slug&&issue.brand===brand.slug&&issue.family===family.slug);
  const rows=familyModels.map(model=>`<a class="card cardLink" href="${pathForModel(model)}"><span class="kicker">Tam model · ${esc(model.modelCode)}</span><h3>${esc(brand.name)} ${esc(model.name)}</h3><p>${model.symptomClusters.length} araştırılmış sorun alanı · kılavuz · resmî destek${model.softwareResources?.length?" · yazılım":""}.</p></a>`).join("");
  const comparison=`<div class="tableWrap" style="margin-top:20px"><table><thead><tr><th>Model</th><th>Model kodu</th><th>Sorun alanı</th><th>Bağımsız hata</th><th>Kaynak</th></tr></thead><tbody>${familyModels.map(model=>`<tr><td><a href="${pathForModel(model)}"><b>${esc(brand.name)} ${esc(model.name)}</b></a></td><td>${esc(model.modelCode)}</td><td>${model.symptomClusters.length}</td><td>${familyIssues.filter(issue=>issue.model===model.slug).length}</td><td>${ext(model.manualUrl,"Kılavuz")}</td></tr>`).join("")}</tbody></table></div>`;
  return page(`${brand.name} ${family.name} arızaları, hata kodları ve kılavuz | Arıza Nerede?`,`${brand.name} ${family.name} tam modelleri, yaygın arızaları, hata kodları, kılavuz ve resmî teknik destek kaynakları.`,`${SITE_ORIGIN}${pathForFamily(family)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name,url:pathForDeviceType(device)},{label:brand.name,url:pathForBrand(device.slug,brand.slug)},{label:family.name}])}<section class="detail"><span class="eyebrow">${family.familyKind==="official-family"?"Resmî seri / aile":"Ürün grubu"}</span><h1 class="title">${esc(brand.name)} ${esc(family.name)} arızaları ve modelleri</h1><div class="answer"><strong>${familyModels.length} tam model · ${familyIssues.length} bağımsız hata/arıza sayfası</strong><span>Bu ailedeki modeller ortak sorun başlıkları yanında model-spesifik hata kodları ve resmî destek kaynaklarıyla ayrıştırılır.</span></div>${problemPanel(topProblems(familyModels))}<h2 style="margin-top:24px">Tam modeller</h2><div class="grid">${rows}</div><h2 style="margin-top:26px">Teknik destek karşılaştırması</h2>${comparison}</section></div>`);
}

export function renderModel(device,brand,family,model){
  const direct=indexableIssues.filter(issue=>issue.model===model.slug&&issue.brand===brand.slug&&issue.deviceType===device.slug);
  const issueRows=direct.map(issue=>`<a class="result" href="${pathForIssue(issue)}"><small>${esc(issue.code)}</small><br><strong>${esc(issue.title)}</strong><p>${esc(issue.short)}</p></a>`).join("");
  const software=model.softwareResources?.length?model.softwareResources.map(resource=>`<div class="source"><small>Yazılım / firmware / uygulama</small>${ext(resource.url,resource.label)}<p>${esc(resource.note)}</p></div>`).join(""):`<div class="source"><small>Yazılım</small>Ayrı bir model indirme bağlantısı doğrulanmadı; yalnızca aşağıdaki resmî destek ve kılavuz kanallarını kullanın.</div>`;
  const clusters=(model.symptomClusters||[]).map(renderCluster).join("");
  const directIssues=issueRows?`<h2>Model-spesifik doğrulanmış hata / arıza sayfaları</h2><p class="lead">Bunlar genel belirti başlığından ayrı, doğrudan kod veya modele özgü teknik kayıt olarak doğrulanmıştır.</p><div class="results">${issueRows}</div>`:"";
  const product=model.productUrl?`<div class="source">${ext(model.productUrl,"Resmî ürün / katalog")}</div>`:"";
  const market=model.marketSource?.url?`<div class="source"><small>Pazar keşfi · destek kaynağı değildir</small>${ext(model.marketSource.url,"Akakçe kategori envanteri")}</div>`:"";
  const coverage=`<div class="answer"><strong>${model.symptomClusters.length} araştırılmış sorun alanı</strong><span>${direct.length?`${direct.length} ayrı model-spesifik hata rotası ayrıca yayında. `:""}Sorun kapsamı resmî model/destek kaynakları, kategori teknik kaynakları ve güvenli olduğu doğrulanan kullanıcı deneyimleriyle genişletilir.</span></div>`;
  return page(`${brand.name} ${model.name} arızaları, hata kodları, kılavuz ve destek | Arıza Nerede?`,`${brand.name} ${model.name} (${model.modelCode}) hata kodları, yaygın sorunlar, kullanıcı kılavuzu, resmî destek ve yazılım kaynağı.`,`${SITE_ORIGIN}${pathForModel(model)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name,url:pathForDeviceType(device)},{label:brand.name,url:pathForBrand(device.slug,brand.slug)},{label:family.name,url:pathForFamily(family)},{label:model.name}])}<section class="detail"><span class="eyebrow">Tam cihaz modeli · ${esc(model.modelCode)}</span><h1 class="title">${esc(brand.name)} ${esc(model.name)} arızaları</h1>${tree([{label:device.name,url:pathForDeviceType(device)},{label:brand.name,url:pathForBrand(device.slug,brand.slug)},{label:family.name,url:pathForFamily(family)},{label:model.name}])}${coverage}<div class="cols"><article>${directIssues}<h2>Bu model için araştırılmış yaygın arıza ve belirti alanları</h2><p class="lead">Genel sorun aileleri modelin resmî kılavuz ve destek kaynaklarıyla birlikte verilir; model-spesifik hata kodları varsa ayrıca bağımsız sayfalara ayrılır.</p><div class="qa">${clusters}</div></article><aside class="side"><div class="card"><span class="kicker">Resmî model kaynakları</span>${product}<div class="source">${ext(model.supportUrl,"Resmî destek")}</div><div class="source">${ext(model.manualUrl,"Kılavuz / belgeler")}</div>${software}<p><small>Doğrulama: ${esc(model.verifiedAt)} · ${esc(model.verificationLevel)}</small></p></div><div class="card" style="margin-top:14px"><span class="kicker">Markanın doğruladığı servis yönü</span><div class="source">${ext(brand.serviceUrl,"Resmî yetkili servis / onarım kanalı")}</div><p>${esc(brand.serviceSummary||"Yetkili servis adı ve konumu yalnızca markanın bu resmî kanalından doğrulanır.")}</p></div><div class="card" style="margin-top:14px">${market}<p>Akakçe yalnızca Türkiye'de fiilî listeleme keşfi için kullanılır; teknik destek veya yetkili servis doğrulaması için kullanılmaz.</p></div></aside></div></section></div>`);
}
