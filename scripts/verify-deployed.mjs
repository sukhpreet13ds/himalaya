import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
const origin='https://himalayahikes.vercel.app';
const slugs=['manali-kasol','chopta-tungnath','udaipur-mount-abu-kumbhalgarh','chakrata','hampta-pass','harshil-valley','kasol-kheerganga','jaisalmer','jibhi-tirthan-valley'];
const routes=['/','/packages/',...slugs.map(s=>`/packages/${s}/`),'/about/','/contact/','/photo-credits/'];
const report={origin,routes:[],assets:0,browserChecks:[],errors:[]};
for(const route of routes){const r=await fetch(origin+route);assert.equal(r.status,200,route);const html=await r.text();assert(html.includes('HimalayaHikes')&&html.includes('<h1'),`Unexpected login/error page: ${route}`);report.routes.push(route)}
const manifest=JSON.parse(await fs.readFile('scripts/vercel-assets.json','utf8'));
const queue=[...manifest.files];
await Promise.all(Array.from({length:6},async()=>{while(queue.length){const item=queue.shift();const r=await fetch(`${origin}/${item.path}`);assert.equal(r.status,200,item.path);const bytes=Buffer.from(await r.arrayBuffer());assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256,item.path);report.assets++}}));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage();page.on('pageerror',e=>report.errors.push(e.message));for(const width of [1440,390]){await page.setViewportSize({width,height:900});for(const route of ['/','/packages/hampta-pass/','/contact/']){await page.goto(origin+route,{waitUntil:'networkidle'});await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})))});const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,whatsapp:[...document.querySelectorAll('a[href*="wa.me"]')].every(a=>a.href.startsWith('https://wa.me/919354097831?text='))}));assert(!state.overflow,`${route} overflow at ${width}`);assert.equal(state.broken,0,`${route} broken images`);assert(state.whatsapp);report.browserChecks.push({route,width})}}assert.deepEqual(report.errors,[]);await fs.writeFile('artifacts/vercel-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({publicRoutes:report.routes.length,verifiedAssets:report.assets,browserChecks:report.browserChecks.length,runtimeErrors:report.errors},null,2))}finally{await browser.close()}
