import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
async function walk(dir){const result=[];for(const item of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())result.push(...await walk(file));else result.push(file)}return result}
const assets=[];
for(const file of await walk('public'))assets.push({path:path.relative('public',file).replaceAll('\\','/'),sha256:createHash('sha256').update(await fs.readFile(file)).digest('hex')});
await fs.writeFile('scripts/vercel-assets.json',JSON.stringify({origin:'https://himalayahikes-travel.goldy-ldh7376.chatgpt.site/',files:assets},null,2));
const sources=[...await walk('app'),...await walk('components'),...await walk('lib'),'package.json','package-lock.json','next.config.ts','postcss.config.mjs','tsconfig.json','next-env.d.ts','scripts/ensure-assets.mjs','scripts/vercel-assets.json'];
const files=[];
for(const file of sources)files.push({file:file.replaceAll('\\','/'),data:await fs.readFile(file,'utf8'),encoding:'utf-8'});
await fs.mkdir('artifacts',{recursive:true});
await fs.writeFile('artifacts/vercel-source.json',JSON.stringify(files));
console.log(JSON.stringify({sourceFiles:files.length,assets:assets.length,sourceBytes:JSON.stringify(files).length}));
