import app from "./index.js";

const INDEXNOW_KEY = "4263b010f9dddf31bf1b4023a3d6a82d";

function injectOptionalAnalytics(response, env) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html") || (!env?.GA_MEASUREMENT_ID && !env?.CLARITY_PROJECT_ID)) return response;

  const snippets = [];
  if (env?.GA_MEASUREMENT_ID) {
    const id = String(env.GA_MEASUREMENT_ID).replace(/[^A-Za-z0-9-]/g, "");
    if (id) snippets.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{'anonymize_ip':true});</script>`);
  }
  if (env?.CLARITY_PROJECT_ID) {
    const id = String(env.CLARITY_PROJECT_ID).replace(/[^A-Za-z0-9]/g, "");
    if (id) snippets.push(`<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${id}");</script>`);
  }
  if (!snippets.length) return response;

  return new HTMLRewriter()
    .on("head", { element(el) { el.append(snippets.join(""), { html: true }); } })
    .transform(response);
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
    return injectOptionalAnalytics(response, env);
  }
};
