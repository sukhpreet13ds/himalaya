import fs from 'node:fs/promises';
const photos=JSON.parse(await fs.readFile('lib/photo-credits.json','utf8'));
const orders={chopta:[1,0,2],udaipur:[2,0,1],hampta:[2,0,1],jibhi:[2,1,0],jaisalmer:[0,2]};
for(const [key,order] of Object.entries(orders))photos[key]=order.map(i=>photos[key][i]);
await fs.writeFile('lib/photo-credits.json',JSON.stringify(photos,null,2));
await fs.unlink('public/hero-preview.jpg').catch(()=>{});
const font=await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf');
if(font.ok)await fs.writeFile('public/fonts/manrope.ttf',Buffer.from(await font.arrayBuffer()));
console.log('Curated destination imagery and variable font ready.');
