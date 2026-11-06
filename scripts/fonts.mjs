import fs from 'node:fs/promises';
const css=await(await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap')).text();
const urls=[...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];
await fs.mkdir('public/fonts',{recursive:true});
const buf=Buffer.from(await(await fetch(urls[0])).arrayBuffer());
await fs.writeFile('public/fonts/manrope.ttf',buf);
await fs.writeFile('public/fonts/OFL.txt',await(await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt')).text());
console.log('Manrope font downloaded',buf.length);
