import app from "./index.js";

const INDEXNOW_KEY = "4263b010f9dddf31bf1b4023a3d6a82d";

function analyticsResponse(response, env) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const ga = String(env?.GA_MEASUREMENT_ID || "").replace(/[^A-Za-z0-9-]/g, "");
  const clarity = String(env?.CLARITY_PROJECT_ID || "").replace(/[^A-Za-z0-9]/g, "");
  if (!ga && !clarity) return response;

  const scripts = [];
  const scriptSrc = ["'unsafe-inline'"];
  const connectSrc = ["'self'"];
  const imgSrc = ["'self'", "data:"];

  if (ga) {
    scriptSrc.push("https://www.googletagmanager.com");
    connectSrc.push("https://www.google-analytics.com", "https://region1.google-analytics.com", "https://www.googletagmanager.com");
    imgSrc.push("https://www.google-analytics.com");
    scripts.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}',{'anonymize_ip':true});</script>`);
  }

  if (clarity) {
    scriptSrc.push("https://www.clarity.ms");
    connectSrc.push("https://www.clarity.ms", "https://*.clarity.ms");
    imgSrc.push("https://www.clarity.ms", "https://*.clarity.ms");
    scripts.push(`<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarity}");</script>`);
  }

  const headers = new Headers(response.headers);
  headers.set("content-security-policy", `default-src 'self'; style-src 'unsafe-inline'; script-src ${scriptSrc.join(" ")}; img-src ${imgSrc.join(" ")}; connect-src ${connectSrc.join(" ")}; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests`);
  const secured = new Response(response.body, { status: response.status, statusText: response.statusText, headers });

  return new HTMLRewriter()
    .on("head", { element(el) { el.append(scripts.join(""), { html: true }); } })
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
