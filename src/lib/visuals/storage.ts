import "server-only";
import {mkdir,readFile,rename,writeFile} from "node:fs/promises";
import path from "node:path";
import {baselineVisualConfig,publishVisualSnapshot,visualConfigSchema,type VisualConfig} from "@/lib/visuals/config";

export type VisualStore={draft:VisualConfig;published:VisualConfig;draftUpdatedAt:string|null;publishedAt:string|null};
const storePathFor=(root:string)=>path.join(root,".dev-data","visual-director.json");

const emptyStore=():VisualStore=>({draft:structuredClone(baselineVisualConfig),published:structuredClone(baselineVisualConfig),draftUpdatedAt:null,publishedAt:null});

export async function readVisualStore(root=process.cwd()):Promise<VisualStore>{
  try{
    const parsed=JSON.parse(await readFile(storePathFor(root),"utf8")) as Partial<VisualStore>;
    return {draft:visualConfigSchema.parse(parsed.draft),published:visualConfigSchema.parse(parsed.published),draftUpdatedAt:parsed.draftUpdatedAt??null,publishedAt:parsed.publishedAt??null};
  }catch{return emptyStore()}
}

async function writeStore(store:VisualStore,root:string){
  if(process.env.NODE_ENV==="production")throw new Error("Visual Director local storage is disabled in production.");
  const storePath=storePathFor(root),directory=path.dirname(storePath),temporary=`${storePath}.${process.pid}.tmp`;
  await mkdir(directory,{recursive:true});
  await writeFile(temporary,`${JSON.stringify(store,null,2)}\n`,"utf8");
  await rename(temporary,storePath);
}

export async function saveVisualDraft(config:VisualConfig,root=process.cwd()){const current=await readVisualStore(root);const next={...current,draft:visualConfigSchema.parse(config),draftUpdatedAt:new Date().toISOString()};await writeStore(next,root);return next}
export async function publishVisualDraft(config?:VisualConfig,root=process.cwd()){const current=await readVisualStore(root),published=publishVisualSnapshot(config??current.draft),timestamp=new Date().toISOString();const next={...current,draft:publishVisualSnapshot(published),published,draftUpdatedAt:timestamp,publishedAt:timestamp};await writeStore(next,root);return next}

export async function resetVisualDraft(root=process.cwd()){const current=await readVisualStore(root);const next={...current,draft:structuredClone(baselineVisualConfig),draftUpdatedAt:new Date().toISOString()};await writeStore(next,root);return next}

export async function getPublicVisualConfig(root=process.cwd()){return (await readVisualStore(root)).published}
export async function getDraftVisualConfig(root=process.cwd()){return (await readVisualStore(root)).draft}
export const visualStoreFile=storePathFor(process.cwd());
