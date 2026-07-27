import {mkdir,readFile,rename,writeFile} from "node:fs/promises";
import path from "node:path";
import {mediaSectionSchema,type MediaSection} from "@/lib/media/composition-types";
const file=(root:string)=>path.join(root,".dev-data","page-media-sections.json");
export async function listMediaSections(root=process.cwd()):Promise<MediaSection[]>{if(process.env.NODE_ENV==="production")return [];try{return mediaSectionSchema.array().parse(JSON.parse(await readFile(file(root),"utf8")))}catch(error){if((error as NodeJS.ErrnoException).code==="ENOENT")return [];throw error}}
export async function saveMediaSections(items:MediaSection[],root=process.cwd()){const target=file(root);await mkdir(path.dirname(target),{recursive:true});const temp=`${target}.tmp`;await writeFile(temp,JSON.stringify(mediaSectionSchema.array().parse(items),null,2));await rename(temp,target)}
