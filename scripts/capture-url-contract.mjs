import {writeFileSync} from "node:fs";
import {createHash} from "node:crypto";
import app from "../src/index.js";
import {SITE_ORIGIN} from "../src/catalog.js";

const rootResponse=await app.fetch(new Request(`${SITE_ORIGIN}/sitemap.xml`),{});
if(rootResponse.status!==200) throw new Error(`sitemap index ${rootResponse.status}`);
const rootXml=await rootResponse.text();
const childUrls=[...rootXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
const paths=[];
for(const child of childUrls){
  const response=await app.fetch(new Request(child),{});
  if(response.status!==200) throw new Error(`child sitemap ${child} -> ${response.status}`);
  const xml=await response.text();
  paths.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1].replace(SITE_ORIGIN,"")));
}
paths.sort();
const sha256=createHash("sha256").update(paths.join("\n")).digest("hex");
writeFileSync("url-contract-actual.json",JSON.stringify({count:paths.length,sha256},null,2)+"\n");
console.log(`Captured URL contract: ${paths.length} ${sha256}`);
