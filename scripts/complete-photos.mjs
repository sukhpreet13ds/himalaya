import fs from 'node:fs/promises';
const all=JSON.parse(await fs.readFile('scripts/photo-candidates.json','utf8'));
const queries={chopta:'Tungnath',chakrata:'Chakrata',hampta:'Hampta',harshil:'Harsil',jibhi:'Tirthan'};
const strip=s=>(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&');
for(const [key,q] of Object.entries(queries)){
 const params=new URLSearchParams({action:'query',generator:'search',gsrsearch:q+' filetype:bitmap',gsrnamespace:'6',gsrlimit:'40',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'2400',format:'json'});
 const j=await(await fetch('https://commons.wikimedia.org/w/api.php?'+params)).json();
 const found=Object.values(j.query?.pages||{}).sort((a,b)=>a.index-b.index).filter(p=>{const i=p.imageinfo?.[0];return i&&i.width>=1920&&i.width/i.height>1.25&&/CC0|Public domain|CC BY/i.test(i.extmetadata?.LicenseShortName?.value||'')});
 all[key]=found.slice(0,5).map(p=>{const i=p.imageinfo[0],m=i.extmetadata;return {title:p.title.replace('File:',''),url:i.thumburl||i.url,original:i.url,page:i.descriptionurl,author:strip(m.Artist?.value),license:m.LicenseShortName?.value,licenseUrl:m.LicenseUrl?.value,width:i.width,height:i.height,description:strip(m.ImageDescription?.value)}});
 console.log(key,JSON.stringify(all[key].map(p=>({title:p.title,width:p.width,height:p.height}))));
}
await fs.writeFile('scripts/photo-candidates.json',JSON.stringify(all,null,2));
