import fs from 'node:fs/promises';
const file='components/sections.tsx';
let content=await fs.readFile(file,'utf8');
content=content.replace('<Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"','<Image src={p.small} alt={p.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"');
await fs.writeFile(file,content);
