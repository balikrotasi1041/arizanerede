import {escalationRoutes,SITE_ORIGIN} from "./catalog.js";
import {esc,ext,page,crumb} from "./ui-base.js";

const riskText={low:"Kullanıcı seviyesinde güvenli kontrol",medium:"Dikkatli kullanıcı kontrolü",high:"Servis sınırı"};

export const pathForEditorialGuide=guide=>`/rehber/${guide.slug}/`;
export const pathForServiceGuide=guide=>`/servis/${guide.slug}/`;

export function renderEditorialGuide(guide,{noindex=false}={}){
  const sections=guide.sections.map(section=>`<div class="card"><span class="risk ${esc(section.risk||"low")}">${esc(riskText[section.risk]||riskText.low)}</span><h2>${esc(section.title)}</h2><p>${esc(section.text)}</p></div>`).join("");
  const sources=guide.sources.map(source=>`<div class="source">${ext(source.url,source.label)}</div>`).join("");
  const canonical=`${SITE_ORIGIN}${pathForEditorialGuide(guide)}`;
  const jsonLd=JSON.stringify({"@context":"https://schema.org","@type":"TechArticle","headline":guide.title,"dateModified":"2026-09-02","mainEntityOfPage":canonical,"publisher":{"@type":"Organization","name":"Arıza Nerede?"}}).replace(/</g,"\\u003c");
  return page(
    `${guide.title} | Arıza Nerede?`,guide.description,canonical,
    `<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:"Rehber"},{label:guide.title}])}<section class="detail"><span class="eyebrow">Doğrulanmış teknik rehber</span><h1 class="title">${esc(guide.title)}</h1><p class="lead">${esc(guide.intro)}</p><div class="cols"><article><div class="qa">${sections}</div><div class="stop"><b>Burada dur:</b> ${esc(guide.stopWhen)}</div><details><summary>Güvenlik sınırı</summary><p>${esc(guide.safety)}</p></details></article><aside class="side"><div class="card"><span class="kicker">Birincil kaynaklar</span><h3>Üretici / marka belgeleri</h3>${sources}<p><small>Bu sayfa resmî kaynakların kullanıcıya anlaşılır şekilde düzenlenmiş özetidir. Model kılavuzu ile çelişen durumda model kılavuzu esas alınır.</small></p></div></aside></div></section></div>`,
    {jsonLd,noindex}
  );
}

export function renderServiceGuide(guide,{noindex=false}={}){
  const canonical=`${SITE_ORIGIN}${pathForServiceGuide(guide)}`;
  const contact=[guide.phone?`<p><b>Telefon:</b> ${esc(guide.phone)}</p>`:"",guide.email?`<p><b>E-posta:</b> ${esc(guide.email)}</p>`:""] .join("");
  const routes=escalationRoutes.map(route=>`<a class="route" href="${esc(route.url)}" target="_blank" rel="noopener noreferrer">${esc(route.title)} ↗</a>`).join("");
  const jsonLd=JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":guide.title,"url":canonical,"dateModified":"2026-09-02"}).replace(/</g,"\\u003c");
  return page(
    `${guide.title} | Arıza Nerede?`,guide.description,canonical,
    `<div class="shell">${crumb([{label:"Ana sayfa",url:"/"},{label:"Servis",url:"/servis-garanti-haklari/"},{label:guide.title}])}<section class="detail"><span class="eyebrow">Marka tarafından doğrulanan kanal</span><h1 class="title">${esc(guide.title)}</h1><p class="lead">${esc(guide.summary)}</p><div class="cols"><article><div class="qa"><div class="card"><span class="kicker">1 · Önce resmî desteği aç</span><h2>Model ve seri numarasını hazırla</h2><p>Destek talebinden önce cihazın tam model kodunu, seri numarasını, satın alma belgesini ve görünen hata kodunu kaydet. Cihazdaki arızayı kısa video veya fotoğrafla belgelemek servis iletişimini kolaylaştırabilir.</p><div class="actions">${ext(guide.officialUrl,"Resmî destek merkezi","btn")}${ext(guide.serviceUrl,"Resmî servis kanalı","btn alt")}</div></div><div class="card"><span class="kicker">2 · İsimli servis kuralı</span><h2>Rastgele servis listesi kullanma</h2><p>Arıza Nerede, bir işletmeyi yalnızca marka/üreticinin güncel resmî kaynağı doğruluyorsa “yetkili servis” olarak adlandırır. Arama reklamı, harita kaydı veya üçüncü taraf dizin tek başına yetki kanıtı değildir.</p></div><div class="card"><span class="kicker">3 · İletişim</span><h2>Markanın yayımladığı kanal</h2>${contact}<p>Telefon ve e-posta bilgileri marka kaynağı değişebileceği için işlem öncesinde resmî sayfadan yeniden kontrol edilmelidir.</p></div><div class="card"><span class="kicker">4 · Uyuşmazlık çıkarsa</span><h2>Teknik servisten tüketici hakkına geç</h2><p>Garanti reddi, onarım yapılmaması veya satıcıyla uyuşmazlık teknik teşhisin dışına çıkar. Uygun başvuru yolunu NereyeBaşvurulur rehberinden takip edebilirsiniz.</p><div class="routes">${routes}</div></div></div></article><aside class="side"><div class="card"><span class="kicker">Resmî bağlantılar</span>${ext(guide.officialUrl,"Destek / yardım")}${guide.serviceUrl!==guide.officialUrl?`<div class="source">${ext(guide.serviceUrl,"Servis")}</div>`:""}<div class="source"><a href="/servis-garanti-haklari/">Servis ve garanti hakları →</a></div></div></aside></div></section></div>`,
    {jsonLd,noindex}
  );
}
