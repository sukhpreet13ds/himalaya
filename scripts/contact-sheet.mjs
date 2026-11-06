import fs from 'node:fs/promises';
import sharp from 'sharp';
const photos=JSON.parse(await fs.readFile('lib/photo-credits.json','utf8'));
const composites=[];
let i=0;
for(const [key,items] of Object.entries(photos)){
 for(const p of items){
  const image=await sharp('public'+p.small).resize(260,170,{fit:'cover'}).toBuffer();
  const top=Math.floor(i/4)*205,left=(i%4)*280;
  composites.push({input:image,left,top});
  const label=Buffer.from(`<svg width="270" height="30"><text x="5" y="20" font-size="13" fill="#102b3d">${key}: ${items.indexOf(p)}</text></svg>`);
  composites.push({input:label,left,top:top+170});i++;
 }
}
await fs.mkdir('artifacts',{recursive:true});
await sharp({create:{width:1120,height:Math.ceil(i/4)*205,channels:3,background:'#fff'}}).composite(composites).jpeg().toFile('artifacts/contact-sheet.jpg');
