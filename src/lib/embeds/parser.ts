import {randomUUID} from "node:crypto";
import {embedBlockSchema,type EmbedBlock,type EmbedInput} from "@/lib/embeds/types";

const YOUTUBE_HOSTS=new Set(["youtube.com","www.youtube.com","m.youtube.com","youtu.be","music.youtube.com"]);
const SPOTIFY_TYPES=new Set(["track","album","playlist","show","episode"]);
const permissionSet=new Set(["fullscreen","autoplay","encrypted-media","picture-in-picture"]);
function safeUrl(value:string){if(/\s|[<>"']/.test(value))throw new Error("URL contains unsafe characters.");let url:URL;try{url=new URL(value)}catch{throw new Error("Enter a complete HTTPS URL.")}if(url.protocol!=="https:")throw new Error("Only HTTPS URLs are supported.");if(url.username||url.password)throw new Error("URLs containing credentials are not supported.");return url}
function allowedHosts(value=process.env.EMBED_ALLOWED_HOSTS||""){return new Set(value.split(",").map(item=>item.trim().toLowerCase()).filter(Boolean))}
function validYouTubeId(value:string|null){return value&&/^[A-Za-z0-9_-]{11}$/.test(value)?value:null}
function validPlaylistId(value:string|null){return value&&/^[A-Za-z0-9_-]{10,80}$/.test(value)?value:null}
function base(input:EmbedInput,provider:EmbedBlock["provider"],sourceUrl:string,embedUrl:string,contentType:EmbedBlock["contentType"],renderMode:EmbedBlock["renderMode"]="iframe"){
  const now=new Date().toISOString();return embedBlockSchema.parse({id:randomUUID(),provider,sourceUrl,embedUrl,contentType,title:input.title||{en:"",vi:""},caption:input.caption||{en:"",vi:""},aspectRatio:input.aspectRatio||(contentType==="audio"||contentType==="album"||contentType==="podcast"?"compact":"16:9"),theme:input.theme||"auto",autoplay:false,renderMode,allowedPermissions:input.allowedPermissions||[],createdAt:now,updatedAt:now});
}
export function parseEmbedInput(input:EmbedInput):EmbedBlock{
  const url=safeUrl(input.url.trim());const host=url.hostname.toLowerCase();
  if(YOUTUBE_HOSTS.has(host)){
    const video=validYouTubeId(host==="youtu.be"?url.pathname.slice(1).split("/")[0]:url.searchParams.get("v"));const playlist=validPlaylistId(url.searchParams.get("list"));
    const normalizedHost="https://www.youtube.com";
    if(url.pathname==="/playlist"&&playlist)return base(input,"youtube",`${normalizedHost}/playlist?list=${playlist}`,`${normalizedHost}/embed/videoseries?list=${playlist}`,"playlist");
    if(video)return base(input,"youtube",`${normalizedHost}/watch?v=${video}${playlist?`&list=${playlist}`:""}`,`${normalizedHost}/embed/${video}${playlist?`?list=${playlist}`:""}`,"video");
    if(playlist)return base(input,"youtube",`${normalizedHost}/playlist?list=${playlist}`,`${normalizedHost}/embed/videoseries?list=${playlist}`,"playlist");
    if(host==="music.youtube.com")return base(input,"youtube",url.toString(),url.toString(),"other","externalLink");
    throw new Error("This YouTube URL does not contain a valid video or playlist identifier.");
  }
  if(host==="open.spotify.com"){
    const [type,id]=url.pathname.split("/").filter(Boolean);if(!SPOTIFY_TYPES.has(type)||!id||!/^[A-Za-z0-9]{10,32}$/.test(id))throw new Error("Unsupported Spotify URL.");
    const contentType=type==="track"?"audio":type==="album"?"album":type==="playlist"?"playlist":type==="show"||type==="episode"?"podcast":"other";
    return base(input,"spotify",`https://open.spotify.com/${type}/${id}`,`https://open.spotify.com/embed/${type}/${id}`,contentType);
  }
  if(host==="soundcloud.com"||host==="www.soundcloud.com"){
    const segments=url.pathname.split("/").filter(Boolean);if(segments.length<2)throw new Error("Enter a SoundCloud track or playlist URL.");
    const source=`https://soundcloud.com/${segments.join("/")}`;const type=segments.includes("sets")?"playlist":"audio";
    return base(input,"soundcloud",source,`https://w.soundcloud.com/player/?url=${encodeURIComponent(source)}&auto_play=false`,type);
  }
  if(!allowedHosts().has(host))throw new Error("This hostname is not included in EMBED_ALLOWED_HOSTS.");
  const permissions=(input.allowedPermissions||[]).filter(item=>permissionSet.has(item));return base({...input,allowedPermissions:permissions},"customIframe",url.toString(),url.toString(),"other");
}

export function updateEmbed(existing:EmbedBlock,input:EmbedInput){const parsed=parseEmbedInput(input);return embedBlockSchema.parse({...parsed,id:existing.id,createdAt:existing.createdAt,updatedAt:new Date().toISOString()})}
