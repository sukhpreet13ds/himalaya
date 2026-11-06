import fs from 'node:fs/promises';
import sharp from 'sharp';
const candidates=JSON.parse(await fs.readFile('scripts/photo-candidates.json','utf8'));
const selection={hero:[0,1],manali:[0,1],chopta:[2,3,1],udaipur:[0,2,1],chakrata:[2,0,1],hampta:[1,2,3],harshil:[1,2,0],kasol:[0,1],jaisalmer:[0,2,3],jibhi:[0,1,3]};
const credits={};
await fs.mkdir('public/images',{recursive:true});
for(const [key,indices] of Object.entries(selection)){
 credits[key]=[];
 for(let n=0;n<indices.length;n++){
  const p=candidates[key][indices[n]];
  const filename=`${key}-${n}`;
  let res=await fetch(p.url);
  if(!res.ok)res=await fetch(p.original);
  if(!res.ok)throw new Error(`${key}: ${res.status}`);
  const data=Buffer.from(await res.arrayBuffer());
  await sharp(data).rotate().resize({width:key==='hero'?2500:2400,withoutEnlargement:true}).webp({quality:88,effort:5}).toFile(`public/images/${filename}.webp`);
  await sharp(data).rotate().resize({width:960,withoutEnlargement:true}).webp({quality:85,effort:5}).toFile(`public/images/${filename}-small.webp`);
  credits[key].push({src:`/images/${filename}.webp`,small:`/images/${filename}-small.webp`,alt:p.title.replace(/\.(jpg|jpeg|png)$/i,'').replace(/ - panoramio| DSC\d+/g,''),author:p.author,page:p.page,license:p.license,licenseUrl:p.licenseUrl});
  console.log(`${key}-${n}: ${p.title}`);
 }
}
await fs.writeFile('lib/photo-credits.json',JSON.stringify(credits,null,2));
