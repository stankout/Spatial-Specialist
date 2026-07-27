import {publishVisualSnapshot,visualConfigSchema,type VisualConfig} from "@/lib/visuals/config";

export type VisualEditorOperation="idle"|"saving"|"draft-saved"|"save-failed"|"publishing"|"published"|"publish-failed";

export type VisualEditorState={
  publishedConfig:VisualConfig;
  savedDraftConfig:VisualConfig;
  workingVisualConfig:VisualConfig;
  previewConfig:VisualConfig;
  draftUpdatedAt:string|null;
  publishedAt:string|null;
  operation:VisualEditorOperation;
  error:string|null;
};

function snapshot(config:VisualConfig){return visualConfigSchema.parse(structuredClone(config))}

export function createVisualEditorState(savedDraftConfig:VisualConfig,publishedConfig:VisualConfig,draftUpdatedAt:string|null,publishedAt:string|null):VisualEditorState{
  const workingVisualConfig=snapshot(savedDraftConfig);
  return {publishedConfig:snapshot(publishedConfig),savedDraftConfig:snapshot(savedDraftConfig),workingVisualConfig,previewConfig:snapshot(workingVisualConfig),draftUpdatedAt,publishedAt,operation:"idle",error:null};
}

export function setWorkingVisualConfig(state:VisualEditorState,config:VisualConfig):VisualEditorState{
  const workingVisualConfig=snapshot(config);
  return {...state,workingVisualConfig,previewConfig:snapshot(workingVisualConfig),operation:"idle",error:null};
}

export function setVisualOperation(state:VisualEditorState,operation:VisualEditorOperation,error:string|null=null):VisualEditorState{return {...state,operation,error}}

export function acceptSavedDraft(state:VisualEditorState,config:VisualConfig,draftUpdatedAt:string):VisualEditorState{
  const savedDraftConfig=snapshot(config);
  return {...state,savedDraftConfig,workingVisualConfig:snapshot(config),previewConfig:snapshot(config),draftUpdatedAt,operation:"draft-saved",error:null};
}

export function acceptPublishedVisuals(state:VisualEditorState,config:VisualConfig,draftUpdatedAt:string,publishedAt:string):VisualEditorState{
  const publishedConfig=publishVisualSnapshot(config);
  return {...state,publishedConfig,savedDraftConfig:snapshot(config),workingVisualConfig:snapshot(config),previewConfig:snapshot(config),draftUpdatedAt,publishedAt,operation:"published",error:null};
}

function flatten(value:unknown,prefix="",output=new Map<string,string>()){
  if(value!==null&&typeof value==="object"&&!Array.isArray(value)){
    for(const [key,child] of Object.entries(value))flatten(child,prefix?`${prefix}.${key}`:key,output);
  }else output.set(prefix,JSON.stringify(value));
  return output;
}

export function countVisualChanges(left:VisualConfig,right:VisualConfig){
  const a=flatten(left),b=flatten(right),keys=new Set([...a.keys(),...b.keys()]);
  let changes=0;for(const key of keys)if(a.get(key)!==b.get(key))changes+=1;return changes;
}

export function isVisualConfigEqual(left:VisualConfig,right:VisualConfig){return countVisualChanges(left,right)===0}
