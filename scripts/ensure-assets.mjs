import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const manifest=JSON.parse(await fs.readFile(new URL('./vercel-assets.json',import.meta.url),'utf8'));
const root=path.resolve('public');
const hash=data=>createHash('sha256').update(data).digest('hex');
let downloaded=0;
const queue=[...manifest.files];
await Promise.all(Array.from({length:6},async()=>{
 while(queue.length){
  const item=queue.shift();
  const target=path.resolve(root,item.path);
  if(!target.startsWith(root+path.sep))throw new Error('Invalid asset path');
  try{if(hash(await fs.readFile(target))===item.sha256)continue}catch{}
  const response=await fetch(new URL(item.path,manifest.origin),{signal:AbortSignal.timeout(90000)});
  if(!response.ok)throw new Error(`Asset download failed: ${item.path} (${response.status})`);
  const data=Buffer.from(await response.arrayBuffer());
  if(hash(data)!==item.sha256)throw new Error(`Asset checksum mismatch: ${item.path}`);
  await fs.mkdir(path.dirname(target),{recursive:true});
  await fs.writeFile(target,data);downloaded++;
 }
}));
console.log(`Verified ${manifest.files.length} local assets; downloaded ${downloaded}.`);
