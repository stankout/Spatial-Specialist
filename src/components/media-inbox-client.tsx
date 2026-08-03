"use client";

import Image from "next/image";
import Link from "next/link";
import {useMemo,useState} from "react";
import {Film,RefreshCw} from "lucide-react";
import type {MediaInboxEntry} from "@/lib/media/inbox";
import {mediaRoleSchema,serviceLensSchema} from "@/lib/media/types";

type InboxFilter="all"|"images"|"videos"|"portrait"|"landscape"|"9:16"|"unreviewed"|"imported"|"private"|"duplicate"|"needs-conversion";

export function MediaInboxClient({initialItems}:{initialItems:MediaInboxEntry[]}){
 const [items,setItems]=useState(initialItems),[filter,setFilter]=useState<InboxFilter>("all"),[selected,setSelected]=useState<string[]>([]),[status,setStatus]=useState("");
 const visible=useMemo(()=>items.filter(item=>filter==="all"||filter==="images"&&item.mediaType==="image"||filter==="videos"&&item.mediaType==="video"||filter==="portrait"&&item.orientation==="portrait"||filter==="landscape"&&item.orientation==="landscape"||filter==="9:16"&&item.orientation==="vertical-9-16"||item.status===filter),[items,filter]);
 async function refresh(){const data=await fetch("/api/studio/media/inbox").then(response=>response.json());if(data.ok)setItems(data.items)}
 async function act(item:MediaInboxEntry,action:"import"|"private"|"reject",role=item.ownerRole||suggestRole(item),serviceLens=item.ownerServiceLens||suggestLens(item)){const body=action==="import"?{action,id:item.id,role,serviceLens}:{action:"decision",id:item.id,status:action==="private"?"private":"rejected",role,serviceLens};const result=await fetch("/api/studio/media/inbox",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)}).then(response=>response.json());setStatus(result.ok?`${item.filename}: ${action} complete.`:result.error);if(result.ok)await refresh()}
 async function importSelected(){for(const id of selected){const item=items.find(entry=>entry.id===id);if(item)await act(item,"import")}setSelected([])}
 return <section className="media-inbox">
  <div className="studio-status" role="status" aria-live="polite">{status}</div>
  <div className="inbox-toolbar"><Link href="/studio/media">← Media Library</Link><label>Filter<select value={filter} onChange={event=>setFilter(event.target.value as InboxFilter)}>{["all","images","videos","portrait","landscape","9:16","unreviewed","imported","private","duplicate","needs-conversion"].map(value=><option key={value}>{value}</option>)}</select></label><button onClick={()=>setSelected(visible.map(item=>item.id))}>Select all visible</button><button onClick={()=>setSelected([])}>Clear selection</button><button disabled={!selected.length} onClick={()=>void importSelected()}>Import selected</button><button onClick={()=>void refresh()}><RefreshCw/> Refresh</button></div>
  <p className="inbox-explainer">Scanning suggests context; only the owner decides what enters the library. Importing never publishes an asset.</p>
  <div className="inbox-grid">{visible.map(item=><article key={item.id} className={`inbox-item status-${item.status}`}>
   <label className="inbox-select"><input type="checkbox" checked={selected.includes(item.id)} onChange={event=>setSelected(current=>event.target.checked?[...current,item.id]:current.filter(id=>id!==item.id))}/><span>Select</span></label>
   <div className="inbox-preview">{item.previewUrl?<Image src={item.previewUrl} alt="" fill sizes="280px" unoptimized/>:<Film/>}</div>
   <div className="inbox-meta"><span>{item.status}</span><h2>{item.filename}</h2><p>{item.sourceFolder}</p><dl><div><dt>Type</dt><dd>{item.mediaType}</dd></div><div><dt>Size</dt><dd>{formatBytes(item.fileSize)}</dd></div><div><dt>Dimensions</dt><dd>{item.width&&item.height?`${item.width} × ${item.height}`:"Unavailable"}</dd></div><div><dt>Duration</dt><dd>{item.duration===null?"Unavailable":`${item.duration.toFixed(1)}s`}</dd></div><div><dt>Codec</dt><dd>{item.codec||"Not detected"}</dd></div><div><dt>Orientation</dt><dd>{item.orientation}</dd></div><div><dt>Suggested role</dt><dd>{suggestRole(item)}</dd></div><div><dt>Context</dt><dd>{item.detectedContext} · {item.recommendedService}</dd></div></dl><small className="inbox-review-note">Owner review required · Import does not publish</small>{item.notes.map(note=><small key={note}>{note}</small>)}{item.possiblePrivateInformation&&<strong className="studio-warning">Possible private information</strong>}</div>
   <div className="inbox-actions"><label>Import as<select defaultValue={suggestRole(item)} id={`role-${item.id}`}>{mediaRoleSchema.options.map(role=><option key={role}>{role}</option>)}</select></label><label>Service lens<select defaultValue={suggestLens(item)} id={`lens-${item.id}`}>{serviceLensSchema.options.map(lens=><option key={lens}>{lens}</option>)}</select></label><button onClick={()=>{const role=(document.getElementById(`role-${item.id}`) as HTMLSelectElement).value as typeof mediaRoleSchema.options[number],lens=(document.getElementById(`lens-${item.id}`) as HTMLSelectElement).value as typeof serviceLensSchema.options[number];void act(item,"import",role,lens)}}>Import</button><button onClick={()=>void act(item,"private")}>Mark private</button><button onClick={()=>void act(item,"reject")}>Do not import</button></div>
  </article>)}</div>
 </section>
}

function suggestRole(item:MediaInboxEntry):typeof mediaRoleSchema.options[number]{if(item.filename.includes("IMG_0228"))return "compass-portrait";if(item.mediaType==="video")return "content-video";if(item.detectedContext==="diagram")return "compass-diagram";if(item.orientation==="vertical-9-16")return "scroll-background-9-16";if(item.detectedContext==="owner-portrait")return "owner-portrait";return "general-media"}
function suggestLens(item:MediaInboxEntry):typeof serviceLensSchema.options[number]{if(item.filename.toLowerCase().includes("real estate"))return "deal";if(item.recommendedService==="space")return "space";return "general"}
function formatBytes(value:number){return value<1024*1024?`${Math.round(value/1024)} KB`:`${(value/1024/1024).toFixed(1)} MB`}
