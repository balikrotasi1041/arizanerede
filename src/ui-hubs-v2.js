import {
  deviceTypes,brands,indexableIssues,indexableFamilies,indexableModels,indexableEditorialGuides,
  isBrandIndexable,isFamilyIndexable,isModelIndexable,serviceGuideByBrand,
  pathForDeviceType,pathForBrand,pathForFamily,pathForModel,pathForIssue,supportLinksForBrand
} from "./catalog.js";
import {esc,ext,page,crumb,tree,SITE_ORIGIN} from "./ui-base.js";

function brandSupport(brand){
  const links=supportLinksForBrand(brand).map(([label,url])=>`<div class="source">${ext(url,label)}</div>`).join("");
  return `<div class="card"><span class="kicker">Marka destek merkezi</span><h3>Resmî kaynaklar</h3>${links||"<p>Yalnızca doğrulanmış marka kanalları gösterilir.</p>"}<p><b>Servis kuralı:</b> ${esc(brand.serviceSummary||"Yetkili servis adı yalnızca markanın resmî kaynağında doğrulanır.")}</p></div>`;
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

const problemChips=[
  ["Açılmıyor","açılmıyor"],["Şarj olmuyor","şarj olmuyor"],["Hata kodu","hata kodu"],["Wi-Fi bağlanmıyor","wifi bağlanmıyor"],
  ["Ses var, görüntü yok","ses var görüntü yok"],["Kağıt sıkıştı","kağıt sıkıştı"],["Soğutmuyor","soğutmuyor"],["Batarya çabuk bitiyor","batarya hızlı bitiyor"],
  ["Servis bul","yetkili servis"],["Driver / BIOS","driver bios firmware"]
];

export function renderHome(){
  const cards=deviceTypes.map(device=>{
    const published=indexableModels.filter(model=>model.deviceType===device.slug);
    return `<a class="card cardLink" href="${pathForDeviceType(device)}"><span class="kicker">Cihaz türü</span><h3>${esc(device.name)}</h3><p>${esc(device.description)}</p><small>${new Set(published.map(model=>model.brand)).size} model kataloğu bulunan marka · ${published.length} doğrulanmış tam model</small><br><b>Markaları ve destek kaynaklarını aç →</b></a>`;
  }).join("");
  const chips=problemChips.map(([label,q])=>`<a class="problemChip" href="/ara/?q=${encodeURIComponent(q)}">${esc(label)}</a>`).join("");
  return page(
    "Arıza Nerede? | Cihaz arızası, hata kodu, kılavuz ve resmî servis",
    "Cihaz türünü, markayı, seriyi ve modeli seç; hata kodunun anlamını, güvenli çözümü, kılavuzu, sürücü/yazılım kaynağını ve resmî servisi bul.",
    `${SITE_ORIGIN}/`,
    `<div class="shell"><section class="hero"><span class="eyebrow">Teşhis ağacı + resmî kaynak</span><h1>Cihazın ne söylüyor? Arızanın izini adım adım bul.</h1><p>Marka, model, hata kodu, belirti, sürücü veya kılavuzdaki bir ibareyi ara. Resmî kaynak öncelikli, güvenli kullanıcı müdahalesi sınırları belirlenmiş cevap merkezi.</p><form class="search" action="/ara"><input name="q" maxlength="140" placeholder="Örn: Xiaomi Scooter şarj olmuyor"><button class="btn">Ara</button></form><div class="problemBox"><span class="kicker">Modeli bilmiyor musun?</span><h2>Sorunun ne?</h2><div class="problemChips">${chips}</div></div></section><section class="section" id="cihazlar"><h2>Cihaz türünü seç</h2><div class="grid">${cards}</div></section></div>`
  );
}

export function renderDeviceType(device){
  const rows=brands.filter(brand=>brand.deviceTypes.includes(device.slug)).sort((a,b)=>a.name.localeCompare(b.name,"tr")).map(brand=>{
    const count=indexableModels.filter(model=>model.deviceType===device.slug&&model.brand===brand.slug).length;
    return `<a class="card cardLink" href="${pathForBrand(device.slug,brand.slug)}"${count?"":' rel="nofollow"'}><span class="kicker">${count?`${count} doğrulanmış model`:"Yalnızca resmî destek"}</span><h3>${esc(brand.name)}</h3><p>Resmî destek, kılavuz, yazılım/sürücü ve marka doğrulamalı servis kaynağı.</p></a>`;
  }).join("");
  return page(`${device.name} arıza kodları, markalar ve destek | Arıza Nerede?`,`${device.name} markaları, hata kodları, kılavuz, sürücü/yazılım ve resmî servis kaynakları.`,`${SITE_ORIGIN}${pathForDeviceType(device)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name}])}<section class="detail"><span class="eyebrow">Cihaz türü</span><h1 class="title">${esc(device.name)}</h1><p class="lead">Markayı seç. Tam model rotaları yalnızca resmî kaynak ve yeterli araştırılmış sorun kapsamı bulunan kayıtlarda indekslenir.</p><div class="grid">${rows}</div></section></div>`);
}

export function renderBrand(device,brand){
  const publishedFamilies=indexableFamilies.filter(family=>family.deviceType===device.slug&&family.brand===brand.slug);
  const familyRows=publishedFamilies.map(family=>{
    const count=indexableModels.filter(model=>model.deviceType===device.slug&&model.brand===brand.slug&&model.family===family.slug).length;
    return `<a class="card cardLink" href="${pathForFamily(family)}"><span class="kicker">${family.familyKind==="official-family"?"Resmî seri / aile":"Nötr ürün grubu"}</span><h3>${esc(family.name)}</h3><p>${count} doğrulanmış tam model.</p></a>`;
  }).join("");
  const catalogBlock=familyRows?`<section style="margin-top:22px"><h2>Doğrulanmış model kataloğu</h2><div class="grid">${familyRows}</div></section>`:`<div class="empty" style="margin-top:18px"><b>Bu marka-kategori çifti yalnızca destek kaydı olarak tutuluyor.</b><br>Resmî model ve yeterli sorun kapsamı doğrulanmadığı için model rotası indeks hedefi üretilmez.</div>`;
  const serviceGuide=serviceGuideByBrand.get(brand.slug);
  const guideLinks=indexableEditorialGuides.filter(guide=>guide.brand===brand.slug).map(guide=>`<a class="route" href="/rehber/${guide.slug}/">${esc(guide.title)} →</a>`).join("");
  const serviceBlock=serviceGuide?`<div class="card" style="margin-top:14px"><span class="kicker">Resmî servis merkezi</span><h3>${esc(serviceGuide.title)}</h3><p>Marka tarafından yayımlanan servis ve destek kanalını tek sayfada aç.</p><a class="btn alt" href="/servis/${serviceGuide.slug}/">Servis rehberini aç →</a></div>`:"";
  const editorialBlock=guideLinks?`<div class="card" style="margin-top:14px"><span class="kicker">Özel teknik rehberler</span><div class="routes" style="margin-top:10px">${guideLinks}</div></div>`:"";
  return page(`${brand.name} ${device.name} destek, kılavuz, servis ve modeller | Arıza Nerede?`,`${brand.name} ${device.name} resmî destek, kılavuz, sürücü/yazılım, yetkili servis ve doğrulanmış model ağacı.`,`${SITE_ORIGIN}${pathForBrand(device.slug,brand.slug)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name,url:pathForDeviceType(device)},{label:brand.name}])}<section class="detail"><span class="eyebrow">${esc(device.name)}</span><h1 class="title">${esc(brand.name)}</h1><div class="cols"><article><p class="lead">Öncelik markanın kendi teknik verisidir. Yetkili servis olarak yalnızca marka tarafından doğrulanan kanal gösterilir.</p>${catalogBlock}</article><aside class="side">${brandSupport(brand)}${serviceBlock}${editorialBlock}<div class="card" style="margin-top:14px"><span class="kicker">Servis veya garanti sorunu</span><p>Servis kaydı, teslim belgesi, garanti veya onarım uyuşmazlığında haklarınızı ayrı rehberden kontrol edin.</p><a class="btn alt" href="/servis-garanti-haklari/">Servis ve tüketici hakları →</a></div></aside></div></section></div>`,{noindex:!isBrandIndexable(device.slug,brand.slug)});
}

export function renderFamily(device,brand,family){
  const familyModels=indexableModels.filter(model=>model.deviceType===device.slug&&model.brand===brand.slug&&model.family===family.slug);
  const rows=familyModels.map(model=>`<a class="card cardLink" href="${pathForModel(model)}"><span class="kicker">Tam model · ${esc(model.modelCode)}</span><h3>${esc(brand.name)} ${esc(model.name)}</h3><p>${model.symptomClusters.length} araştırılmış sorun alanı · kılavuz · resmî destek${model.softwareResources?.length?" · yazılım":""}.</p></a>`).join("");
  const tableRows=familyModels.map(model=>`<tr><td><a href="${pathForModel(model)}"><b>${esc(model.name)}</b></a><br><small>${esc(model.modelCode)}</small></td><td>${model.symptomClusters.length}</td><td>Var</td><td>Var</td><td>${model.softwareResources?.length?"Var":"Genel destek"}</td></tr>`).join("");
  const comparison=familyModels.length?`<section class="section compact"><span class="kicker">Aynı aileyi tek bakışta gör</span><h2>${esc(brand.name)} ${esc(family.name)} model karşılaştırma dizini</h2><p class="lead">Bu tablo fiyat karşılaştırması değildir. Hangi tam model için ne kadar teknik içerik, kılavuz ve resmî destek rotası bulunduğunu gösterir.</p><div class="tableWrap"><table><thead><tr><th>Model</th><th>Sorun alanı</th><th>Kılavuz</th><th>Destek</th><th>Yazılım</th></tr></thead><tbody>${tableRows}</tbody></table></div></section>`:"";
  return page(`${brand.name} ${family.name} modelleri, sorunları ve destek | Arıza Nerede?`,`${brand.name} ${family.name} için ${familyModels.length} doğrulanmış tam model; model kodları, araştırılmış sorun alanları, kılavuz ve resmî destek.`,`${SITE_ORIGIN}${pathForFamily(family)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name,url:pathForDeviceType(device)},{label:brand.name,url:pathForBrand(device.slug,brand.slug)},{label:family.name}])}<section class="detail"><span class="eyebrow">${family.familyKind==="official-family"?"Resmî seri / aile":"Nötr ürün grubu"}</span><h1 class="title">${esc(brand.name)} ${esc(family.name)}</h1><p class="lead">${familyModels.length} doğrulanmış tam model. Model sayfaları yalnız kılavuz/destek kaynağı ve asgari sorun kapsamı tamamlandığında indekslenir.</p><div class="grid">${rows||'<div class="empty">Yayımlanabilir tam model kaydı bulunmuyor.</div>'}</div></section>${comparison}</div>`,{noindex:!isFamilyIndexable(family)});
}

export function renderModel(device,brand,family,model){
  const direct=indexableIssues.filter(issue=>issue.model===model.slug&&issue.brand===brand.slug&&issue.deviceType===device.slug);
  const issueRows=direct.map(issue=>`<a class="result" href="${pathForIssue(issue)}"><small>${esc(issue.code)}</small><br><strong>${esc(issue.title)}</strong><p>${esc(issue.short)}</p></a>`).join("");
  const software=model.softwareResources?.length?model.softwareResources.map(resource=>`<div class="source"><small>Yazılım / firmware / uygulama</small>${ext(resource.url,resource.label)}<p>${esc(resource.note)}</p></div>`).join(""):`<div class="source"><small>Yazılım</small>Ayrı bir model indirme bağlantısı doğrulanmadı; yalnızca aşağıdaki resmî destek ve kılavuz kanallarını kullanın.</div>`;
  const clusters=(model.symptomClusters||[]).map(renderCluster).join("");
  const directIssues=issueRows?`<h2>Model-spesifik doğrulanmış hata / arıza sayfaları</h2><p class="lead">Yalnızca bağımsız teknik niyeti olan ve resmî kaynağı bulunan hata kayıtları ayrı URL olarak yayımlanır.</p><div class="results">${issueRows}</div>`:"";
  const product=model.productUrl?`<div class="source">${ext(model.productUrl,"Resmî ürün / katalog")}</div>`:"";
  const market=model.marketSource?.url?`<div class="source"><small>Pazar keşfi · destek kaynağı değildir</small>${ext(model.marketSource.url,"Akakçe kategori envanteri")}</div>`:"";
  const coverage=`<div class="answer"><strong>${model.symptomClusters.length} araştırılmış sorun alanı</strong><span>${direct.length?`${direct.length} ayrı model-spesifik hata rotası indeks kalite kapısını geçti. `:""}Geri kalan belirtiler bu model sayfasında tutulur; her belirti için ince SEO sayfası üretilmez.</span></div>`;
  const serviceGuide=serviceGuideByBrand.get(brand.slug);
  const serviceGuideLink=serviceGuide?`<p><a href="/servis/${serviceGuide.slug}/">${esc(brand.name)} resmî servis rehberi →</a></p>`:"";
  const titleCode=model.modelCode&&model.name.toLocaleLowerCase("tr-TR").includes(String(model.modelCode).toLocaleLowerCase("tr-TR"))?model.name:`${model.name} (${model.modelCode})`;
  return page(`${brand.name} ${titleCode}: arızalar, kılavuz, yazılım ve servis | Arıza Nerede?`,`${brand.name} ${model.name} (${model.modelCode}) hata kodları, yaygın sorunlar, kullanıcı kılavuzu, resmî destek, yazılım ve servis kaynağı.`,`${SITE_ORIGIN}${pathForModel(model)}`,`<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:device.name,url:pathForDeviceType(device)},{label:brand.name,url:pathForBrand(device.slug,brand.slug)},{label:family.name,url:pathForFamily(family)},{label:model.name}])}<section class="detail"><span class="eyebrow">Tam cihaz modeli · ${esc(model.modelCode)}</span><h1 class="title">${esc(brand.name)} ${esc(model.name)}</h1>${tree([{label:device.name,url:pathForDeviceType(device)},{label:brand.name,url:pathForBrand(device.slug,brand.slug)},{label:family.name,url:pathForFamily(family)},{label:model.name}])}${coverage}<div class="cols"><article>${directIssues}<h2>Bu model için araştırılmış yaygın arıza ve belirti alanları</h2><p class="lead">Üç örnekle sınırlandırılmaz. Güç, bağlantı, mekanik, yazılım, bakım ve hata kodu kümeleri kullanıcı/servis güvenlik sınırlarına göre ayrılır.</p><div class="qa">${clusters}</div></article><aside class="side"><div class="card"><span class="kicker">Resmî model kaynakları</span>${product}<div class="source">${ext(model.supportUrl,"Resmî destek")}</div><div class="source">${ext(model.manualUrl,"Kılavuz / belgeler")}</div>${software}<p><small>Doğrulama: ${esc(model.verifiedAt)} · ${esc(model.verificationLevel)}</small></p></div><div class="card" style="margin-top:14px"><span class="kicker">Resmî yetkili servis / onarım kanalı</span><p>${esc(brand.serviceSummary||"Servis adı yalnızca markanın resmî kaynağında doğrulanır.")}</p>${brand.serviceUrl?ext(brand.serviceUrl,"Markanın resmî servis kaynağı","btn alt"):""}${serviceGuideLink}</div><div class="card" style="margin-top:14px"><span class="kicker">Katalog kanıtı</span>${market}<p><small>Pazar kaynağı yalnız Türkiye'de satılan model keşfi için kullanılır; teknik doğrulama üretici kaynağından yapılır.</small></p></div></aside></div></section></div>`,{noindex:!isModelIndexable(model)});
}
