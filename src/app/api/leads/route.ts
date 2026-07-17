import { NextResponse } from "next/server";
import { leadSchema, type NormalizedLead } from "@/lib/lead";
import { getLeadProvider } from "@/lib/lead-provider";
import { memoryRateLimit } from "@/lib/rate-limit";

export async function POST(request:Request){
  const key=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"local";
  if(!await memoryRateLimit.check(key))return NextResponse.json({ok:false,error:"Please wait before trying again."},{status:429});
  let body:unknown;try{body=await request.json()}catch{return NextResponse.json({ok:false,error:"Invalid request."},{status:400})}
  const parsed=leadSchema.safeParse(body);if(!parsed.success)return NextResponse.json({ok:false,error:"Please review the highlighted fields.",issues:parsed.error.flatten()},{status:400});
  if(parsed.data.completionTimeMs<2500)return NextResponse.json({ok:false,error:"Please take a moment to review your request."},{status:400});
  const lead:NormalizedLead={...parsed.data,id:crypto.randomUUID(),createdAt:new Date().toISOString()};
  const result=await getLeadProvider().submit(lead);if(!result.ok)return NextResponse.json({ok:false,error:"Your request could not be delivered. Please try again."},{status:503});
  return NextResponse.json({ok:true,id:lead.id,type:lead.type});
}
