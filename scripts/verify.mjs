import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const slugs=['manali-kasol','chopta-tungnath','udaipur-mount-abu-kumbhalgarh','chakrata','hampta-pass','harshil-valley','kasol-kheerganga','jaisalmer','jibhi-tirthan-valley'];
const routes=['/','/packages/',...slugs.map(s=>`/packages/${s}/`),'/about/','/contact/','/photo-credits/'];
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report={pages:[],widths:[1440,768,390,320],images:0,whatsappLinks:0,interactions:[]};
await fs.mkdir('artifacts',{recursive:true});
try{
 for(const width of report.widths){
  await page.setViewportSize({width,height:900});
  for(const route of routes){
   const res=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});assert.equal(res.status(),200,route);
   await page.evaluate(async()=>{const imgs=[...document.images];imgs.forEach(img=>img.loading='eager');await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),images:document.images.length,links:[...document.querySelectorAll('a[href*="wa.me"]')].map(a=>({href:a.href,label:a.getAttribute('aria-label')||a.textContent}))}));
   assert.equal(result.overflow,false,`Overflow ${route} at ${width}`);assert.deepEqual(result.broken,[],`Broken images ${route}`);
   for(const link of result.links){const u=new URL(link.href);assert.equal(u.pathname,'/919354097831');assert(u.searchParams.get('text')?.includes('HimalayaHikes'));report.whatsappLinks++}
   if(route.startsWith('/packages/')&&route!=='/packages/'){const title=await page.locator('h1').innerText();const booking=await page.locator('.booking-sidebar a').getAttribute('href');assert(new URL(booking).searchParams.get('text').includes(title),`Wrong package enquiry ${route}`)}
   report.images+=result.images;report.pages.push({route,width,status:res.status()});
  }
  await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})))});
  await page.screenshot({path:`artifacts/home-${width}.png`,fullPage:width===1440||width===390});
 }
 await page.setViewportSize({width:1440,height:900});
 await page.goto('http://127.0.0.1:3000/');
 const cards=page.locator('.package-card');assert.equal(await cards.count(),9);
 for(let i=0;i<9;i++){assert.equal(await cards.nth(i).locator('.card-photo').getAttribute('href'),`/packages/${slugs[i]}/`);const name=await cards.nth(i).locator('h3').innerText();const wa=await cards.nth(i).locator('.card-actions a').last().getAttribute('href');assert(new URL(wa).searchParams.get('text').includes(name));}
 await cards.nth(4).locator('.card-photo').click();await page.waitForURL('**/packages/hampta-pass/');assert.equal(await page.locator('h1').innerText(),'Hampta Pass');report.interactions.push('All nine cards map to correct routes and messages; Hampta Pass click works');
 await page.goto('http://127.0.0.1:3000/packages/');await page.getByRole('button',{name:'Treks & Trails',exact:true}).click();assert.equal(await page.locator('.package-card').count(),3);await page.getByRole('button',{name:'All Destinations',exact:true}).click();await page.getByRole('textbox',{name:'Search destinations'}).fill('jaisalmer');assert.equal(await page.locator('.package-card').count(),1);await page.getByRole('textbox',{name:'Search destinations'}).fill('not-a-destination');assert.equal(await page.locator('.empty-results').count(),1);await page.getByRole('button',{name:'Show All Destinations'}).click();assert.equal(await page.locator('.package-card').count(),9);report.interactions.push('Category filters, search and empty-state reset work');
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:3000/');await page.getByRole('button',{name:'Open menu',exact:true}).click();assert(await page.locator('#mobile-nav').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-nav').count(),0);await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('#mobile-nav').getByRole('link',{name:'Contact Us'}).click();await page.waitForURL('**/contact/');assert.equal(await page.locator('#mobile-nav').count(),0);report.interactions.push('Mobile menu opens, Escape closes it, and Contact navigation works');
 await page.getByLabel('Your name').fill('Test Traveller');await page.getByLabel('Your destination').selectOption('Hampta Pass');await page.getByLabel('Your travel ideas').fill('Four travellers, flexible dates.');const message=await page.locator('input[name="text"]').inputValue();assert(message.includes('Test Traveller')&&message.includes('Hampta Pass')&&message.includes('Four travellers'));assert.equal(await page.locator('form').getAttribute('action'),'https://wa.me/919354097831');report.interactions.push('Contact form prepares the correct WhatsApp destination and traveller message');
 const allLinks=new Set();for(const route of routes){await page.goto('http://127.0.0.1:3000'+route);for(const href of await page.locator('a[href^="/"]').evaluateAll(a=>a.map(x=>x.getAttribute('href'))))allLinks.add(href)}for(const href of allLinks){assert.equal((await page.request.get('http://127.0.0.1:3000'+href)).status(),200,`Broken internal link ${href}`)}report.interactions.push(`${allLinks.size} unique internal link targets return HTTP 200`);
 assert.deepEqual(errors,[],'Browser runtime errors');report.runtimeErrors=errors;
 await fs.writeFile('artifacts/verification.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({pageChecks:report.pages.length,imageChecks:report.images,whatsappLinkChecks:report.whatsappLinks,interactions:report.interactions,runtimeErrors:errors},null,2));
}finally{await browser.close()}
