import "server-only";
import {mkdir,readFile,rename,writeFile} from "node:fs/promises";
import path from "node:path";
import {baselineVisualConfig,publishVisualSnapshot,visualConfigSchema,type VisualConfig} from "@/lib/visuals/config";

export type VisualStore={draft:VisualConfig;published:VisualConfig;draftUpdatedAt:string|null;publishedAt:string|null};
const storePath=path.join(process.cwd(),".dev-data","visual-director.json");

const emptyStore=():VisualStore=>({draft:structuredClone(baselineVisualConfig),published:structuredClone(baselineVisualConfig),draftUpdatedAt:null,publishedAt:null});

export async function readVisualStore():Promise<VisualStore>{
  try{
    const parsed=JSON.parse(await readFile(storePath,"utf8")) as Partial<VisualStore>;
    return {draft:visualConfigSchema.parse(parsed.draft),published:visualConfigSchema.parse(parsed.published),draftUpdatedAt:parsed.draftUpdatedAt??null,publishedAt:parsed.publishedAt??null};
  }catch{return emptyStore()}
}

async function writeStore(store:VisualStore){
  if(process.env.NODE_ENV==="production")throw new Error("Visual Director local storage is disabled in production.");
  const directory=path.dirname(storePath),temporary=`${storePath}.${process.pid}.tmp`;
  await mkdir(directory,{recursive:true});
  await writeFile(temporary,`${JSON.stringify(store,null,2)}\n`,"utf8");
  await rename(temporary,storePath);
}

export async function saveVisualDraft(config:VisualConfig){const current=await readVisualStore();const next={...current,draft:visualConfigSchema.parse(config),draftUpdatedAt:new Date().toISOString()};await writeStore(next);return next}
export async function publishVisualDraft(config?:VisualConfig){const current=await readVisualStore(),published=publishVisualSnapshot(config??current.draft),timestamp=new Date().toISOString();const next={...current,draft:publishVisualSnapshot(published),published,draftUpdatedAt:timestamp,publishedAt:timestamp};await writeStore(next);return next}

export async function resetVisualDraft(){const current=await readVisualStore();const next={...current,draft:structuredClone(baselineVisualConfig),draftUpdatedAt:new Date().toISOString()};await writeStore(next);return next}

export async function getPublicVisualConfig(){return (await readVisualStore()).published}
export async function getDraftVisualConfig(){return (await readVisualStore()).draft}
export const visualStoreFile=storePath;
