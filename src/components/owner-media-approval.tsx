"use client";
import {useState} from "react";
import type {MediaAsset} from "@/lib/media/types";
import {getPublicMediaEligibility} from "@/lib/media/approval";

export function OwnerMediaApproval({initialAssets}:{initialAssets:MediaAsset[]}){
 const [assets,setAssets]=useState(initialAssets),[message,setMessage]=useState("");
 async function update(id:string,updates:Partial<MediaAsset>){
  const result=await fetch("/api/studio/media",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,...updates})}).then(response=>response.json());
  if(result.ok)setAssets(current=>current.map(asset=>asset.id===id?result.asset:asset));
  setMessage(result.ok?"Approval state saved.":result.error);
 }
 return <section className="owner-approval"><header><p className="eyebrow">Owner approval</p><h2>Review imported media before publishing</h2><p>Privacy, rights, and public use are separate confirmations. Downloaded media is never assumed safe.</p></header><p role="status">{message}</p>{assets.filter(asset=>asset.imported).map(asset=>{const eligibility=getPublicMediaEligibility(asset);return <article key={asset.id}><div><strong>{asset.title.en||asset.originalFilename}</strong><small>{asset.mediaRole} · {asset.serviceLens}</small></div><div className="approval-summary">{eligibility.checks.map(check=><span key={check.key}>{check.passed?"✓":"×"} {check.label}</span>)}</div><div><button disabled={asset.privacyReviewed} onClick={()=>update(asset.id,{privacyReviewed:true,possiblePrivateInformation:false})}>Mark privacy reviewed</button><button disabled={asset.rightsStatus==="owner-created"} onClick={()=>update(asset.id,{rightsStatus:"owner-created"})}>Confirm owner-created</button><button disabled={!asset.privacyReviewed||asset.rightsStatus==="unreviewed"||asset.rightsStatus==="rights-unclear"||asset.approvedForPublicUse} onClick={()=>update(asset.id,{approvedForPublicUse:true})}>Approve for public use</button>{asset.approvedForPublicUse&&<button onClick={()=>update(asset.id,{approvedForPublicUse:false})}>Revoke public approval</button>}</div></article>})}</section>;
}
