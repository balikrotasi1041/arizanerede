import app from "./index.js";

const INDEXNOW_KEY = "4263b010f9dddf31bf1b4023a3d6a82d";

function analyticsResponse(response, env) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const ga = String(env?.GA_MEASUREMENT_ID || "").replace(/[^A-Za-z0-9-]/g, "");
  const clarity = String(env?.CLARITY_PROJECT_ID || "").replace(/[^A-Za-z0-9]/g, "");
  if (!ga && !clarity) return response;

  const scriptSrc = ["'unsafe-inline'"];
  const connectSrc = ["'self'"];
  const imgSrc = ["'self'", "data:"];

  if (ga) {
    scriptSrc.push("https://www.googletagmanager.com");
    connectSrc.push("https://www.google-analytics.com", "https://region1.google-analytics.com", "https://www.googletagmanager.com");
    imgSrc.push("https://www.google-analytics.com");
  }

  if (clarity) {
    scriptSrc.push("https://www.clarity.ms");
    connectSrc.push("https://www.clarity.ms", "https://*.clarity.ms");
    imgSrc.push("https://www.clarity.ms", "https://*.clarity.ms");
  }

  const consentScript = `<script>(function(){
    var GA=${JSON.stringify(ga)};
    var CLARITY=${JSON.stringify(clarity)};
    var KEY='arizanerede_analytics_consent';
    function getChoice(){try{return localStorage.getItem(KEY)||''}catch(e){return ''}}
    function setChoice(v){try{localStorage.setItem(KEY,v)}catch(e){}}
    function loadGA(){if(!GA||window.__anGaLoaded)return;window.__anGaLoaded=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA);document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',GA,{'anonymize_ip':true});}
    function loadClarity(){if(!CLARITY||window.__anClarityLoaded)return;window.__anClarityLoaded=true;window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});var t=document.createElement('script');t.async=1;t.src='https://www.clarity.ms/tag/'+CLARITY;var y=document.getElementsByTagName('script')[0];y.parentNode.insertBefore(t,y);}
    function start(){loadGA();loadClarity()}
    function show(){var b=document.getElementById('an-consent');if(b)b.hidden=false}
    function hide(){var b=document.getElementById('an-consent');if(b)b.hidden=true}
    window.__anConsentAccept=function(){setChoice('granted');hide();start()};
    window.__anConsentReject=function(){setChoice('denied');hide();if(window.clarity)window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'})};
    window.__anConsentSettings=function(){setChoice('');show()};
    document.addEventListener('DOMContentLoaded',function(){var c=getChoice();if(c==='granted')start();else if(c!=='denied')show()});
  })();</script>`;

  const consentStyle = `<style>#an-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:auto;padding:16px 18px;border:1px solid #dce7e4;border-radius:16px;background:#fff;box-shadow:0 12px 34px rgba(24,51,55,.16);font:14px/1.45 system-ui,sans-serif;color:#183337}#an-consent[hidden]{display:none}#an-consent p{margin:0 0 12px;color:#526b6e}#an-consent .an-actions{display:flex;gap:8px;flex-wrap:wrap}#an-consent button,#an-cookie-settings{border:0;border-radius:10px;padding:9px 12px;font-weight:700;cursor:pointer}#an-consent .accept{background:#0f766e;color:#fff}#an-consent .reject{background:#eef3f2;color:#183337}#an-cookie-settings{position:fixed;right:12px;bottom:12px;z-index:9000;background:#fff;border:1px solid #dce7e4;color:#526b6e;font-size:12px}@media(max-width:640px){#an-consent{left:10px;right:10px;bottom:10px}#an-cookie-settings{right:8px;bottom:8px}}</style>`;

  const consentUi = `<div id="an-consent" hidden role="dialog" aria-label="Analitik çerez tercihleri"><strong>Analitik tercihiniz</strong><p>Siteyi geliştirmek için Google Analytics ve Microsoft Clarity kullanıyoruz. Analitik ölçümler yalnızca izin verirseniz etkinleşir.</p><div class="an-actions"><button class="accept" type="button" onclick="window.__anConsentAccept()">Analitiğe izin ver</button><button class="reject" type="button" onclick="window.__anConsentReject()">Reddet</button></div></div><button id="an-cookie-settings" type="button" onclick="window.__anConsentSettings()">Çerez tercihleri</button>`;

  const headers = new Headers(response.headers);
  headers.set("content-security-policy", `default-src 'self'; style-src 'unsafe-inline'; script-src ${scriptSrc.join(" ")}; img-src ${imgSrc.join(" ")}; connect-src ${connectSrc.join(" ")}; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests`);
  const secured = new Response(response.body, { status: response.status, statusText: response.statusText, headers });

  return new HTMLRewriter()
    .on("head", { element(el) { el.append(consentStyle + consentScript, { html: true }); } })
    .on("body", { element(el) { el.append(consentUi, { html: true }); } })
    .transform(secured);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && url.pathname === `/${INDEXNOW_KEY}.txt`) {
      return new Response(request.method === "HEAD" ? null : `${INDEXNOW_KEY}\n`, {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=86400",
          "x-content-type-options": "nosniff"
        }
      });
    }

    const response = await app.fetch(request, env, ctx);
    return analyticsResponse(response, env);
  }
};
