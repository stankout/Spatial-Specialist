import {describe,expect,it,vi} from "vitest";
import {executeUpload,type UploadGate} from "@/lib/media/upload-flow";

describe("Studio upload flow",()=>{
  it("does not call reset on null after a successful upload",async()=>{const gate:UploadGate={active:false};await expect(executeUpload({gate,form:null,request:async()=>({ok:true,asset:{id:"asset-1"}})})).resolves.toMatchObject({kind:"success"})});
  it("preserves the selected file when upload fails",async()=>{const reset=vi.fn();const result=await executeUpload({gate:{active:false},form:{reset},request:async()=>({ok:false,error:"Invalid image."})});expect(result).toEqual({kind:"error",error:"Invalid image."});expect(reset).not.toHaveBeenCalled()});
  it("prevents a duplicate request while an upload is active",async()=>{const gate:UploadGate={active:false};let release:()=>void=()=>{};const pending=new Promise<void>(resolve=>{release=resolve});const request=vi.fn(async()=>{await pending;return {ok:true,asset:{id:"asset-1"}}});const first=executeUpload({gate,form:null,request});const duplicate=await executeUpload({gate,form:null,request});expect(duplicate).toEqual({kind:"duplicate"});expect(request).toHaveBeenCalledTimes(1);release();await first});
});
