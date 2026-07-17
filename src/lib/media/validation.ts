const signatures={
  "image/jpeg":(b:Buffer)=>b[0]===0xff&&b[1]===0xd8&&b[2]===0xff,
  "image/png":(b:Buffer)=>b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
  "image/webp":(b:Buffer)=>b.subarray(0,4).toString()==="RIFF"&&b.subarray(8,12).toString()==="WEBP",
  "image/avif":(b:Buffer)=>b.subarray(4,8).toString()==="ftyp"&&["avif","avis"].includes(b.subarray(8,12).toString()),
} as const;
const extensions:Record<string,string[]>={"image/jpeg":[".jpg",".jpeg"],"image/png":[".png"],"image/webp":[".webp"],"image/avif":[".avif"]};
export const mediaLimits={maxFileSize:10*1024*1024,maxDimension:12000};
export type ValidatedImage={mimeType:keyof typeof signatures;width:number;height:number;extension:string};
export function validateImage(buffer:Buffer,filename:string,declaredMime:string):ValidatedImage{
  if(!buffer.length||buffer.length>mediaLimits.maxFileSize)throw new Error("Image must be between 1 byte and 10 MB.");
  const mime=(Object.keys(signatures) as Array<keyof typeof signatures>).find(type=>signatures[type](buffer));if(!mime)throw new Error("Only valid JPEG, PNG, WebP, or AVIF images are accepted.");
  if(declaredMime&&declaredMime!==mime)throw new Error("The file content does not match its declared MIME type.");
  const extension=filename.slice(filename.lastIndexOf(".")).toLowerCase();if(!extensions[mime].includes(extension))throw new Error("The filename extension does not match the image content.");
  const {width,height}=readDimensions(buffer,mime);if(width>mediaLimits.maxDimension||height>mediaLimits.maxDimension)throw new Error("Image dimensions exceed the 12,000px limit.");
  return {mimeType:mime,width,height,extension};
}
function readDimensions(buffer:Buffer,mime:keyof typeof signatures){
  if(mime==="image/png")return {width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)};
  if(mime==="image/jpeg"){let offset=2;while(offset+9<buffer.length){if(buffer[offset]!==0xff){offset++;continue}const marker=buffer[offset+1];const length=buffer.readUInt16BE(offset+2);if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return {height:buffer.readUInt16BE(offset+5),width:buffer.readUInt16BE(offset+7)};offset+=2+length}}
  if(mime==="image/webp"&&buffer.subarray(12,16).toString()==="VP8X")return {width:1+buffer.readUIntLE(24,3),height:1+buffer.readUIntLE(27,3)};
  return {width:0,height:0};
}
