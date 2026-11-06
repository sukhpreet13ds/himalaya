import fs from 'node:fs/promises';
const queries = { hero: 'Himalayas sunrise mountain landscape', manali: 'Manali mountains landscape', chopta: 'Chopta Tungnath landscape', udaipur: 'Udaipur Lake Pichola', chakrata: 'Chakrata landscape', hampta: 'Hampta Pass landscape', harshil: 'Harsil valley landscape', kasol: 'Kheerganga landscape', jaisalmer: 'Jaisalmer desert dunes', jibhi: 'Jibhi Tirthan landscape' };
await fs.mkdir('public/images', {recursive:true});
const strip = s => (s || '').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&');
const all = {};
for (const [key, query] of Object.entries(queries)) {
 const params = new URLSearchParams({action:'query',generator:'search',gsrsearch:query+' filetype:bitmap',gsrnamespace:'6',gsrlimit:'18',prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'2400',format:'json'});
 const res=await fetch('https://commons.wikimedia.org/w/api.php?'+params);
 const j=await res.json();
 const candidates=Object.values(j.query?.pages || {}).sort((a,b)=>a.index-b.index).filter(p=>{const i=p.imageinfo?.[0];return i && i.width>=1920 && i.width/i.height>1.2 && /CC0|Public domain|CC BY/i.test(i.extmetadata?.LicenseShortName?.value||'')});
 all[key]=candidates.slice(0,key==='hero'?3:4).map(p=>{const i=p.imageinfo[0],m=i.extmetadata;return {title:p.title.replace('File:',''),url:i.thumburl||i.url,original:i.url,page:i.descriptionurl,author:strip(m.Artist?.value),license:m.LicenseShortName?.value,licenseUrl:m.LicenseUrl?.value,width:i.width,height:i.height,description:strip(m.ImageDescription?.value)}});
 console.log(key,JSON.stringify(all[key].map(p=>({title:p.title,width:p.width,height:p.height}))));
}
await fs.writeFile('scripts/photo-candidates.json',JSON.stringify(all,null,2));
