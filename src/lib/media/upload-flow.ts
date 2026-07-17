export type UploadGate={active:boolean};
type ResettableForm={reset:()=>void};
type UploadResult={ok:boolean;error?:string;asset?:{id:string}};

export async function executeUpload({gate,form,request}:{gate:UploadGate;form:ResettableForm|null;request:()=>Promise<UploadResult>}){
  if(gate.active)return {kind:"duplicate" as const};
  gate.active=true;
  try{
    const result=await request();
    if(!result.ok)return {kind:"error" as const,error:result.error||"Image upload failed."};
    form?.reset();
    return {kind:"success" as const,asset:result.asset};
  }catch(error){
    return {kind:"error" as const,error:error instanceof Error?error.message:"Image upload failed."};
  }finally{
    gate.active=false;
  }
}
