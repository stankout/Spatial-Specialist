import type {CSSProperties} from "react";
import {ProceduralScene} from "@/components/procedural-scene";
import type {ProceduralSceneId} from "@/lib/media/procedural-scenes";
import type {VisualPageKey} from "@/lib/visuals/config";

const networkNodes=[["12%","19%"],["34%","11%"],["58%","27%"],["82%","16%"],["22%","54%"],["48%","61%"],["76%","49%"],["91%","72%"],["16%","86%"],["61%","88%"],["38%","37%"],["70%","78%"]] as const;
const networkLines=[["10%","21%","30deg"],["31%","13%","12deg"],["54%","28%","-18deg"],["20%","55%","8deg"],["47%","62%","-12deg"],["73%","51%","28deg"],["17%","85%","-8deg"],["60%","87%","-20deg"]] as const;

const pageScenes:Partial<Record<VisualPageKey,ProceduralSceneId>>={homepage:"ac-ambient-intelligence",deal:"market-network",condition:"security-grid",space:"spatial-field",about:"ac-ambient-intelligence",services:"ac-ambient-intelligence",search:"signal-terminal",articles:"global-intelligence",videos:"cyber-archive",guides:"cyber-archive"};

export function LivingVisualEnvironment({page,sceneId,intensity,motionSpeed}:{page?:VisualPageKey;sceneId?:ProceduralSceneId|null;intensity?:number;motionSpeed?:number}={}){
  const activeScene=sceneId===null?null:sceneId??(page?pageScenes[page]:undefined);
  return <div className="living-visual-environment" aria-hidden="true">
    {activeScene&&<ProceduralScene sceneId={activeScene} intensity={intensity} motionSpeed={motionSpeed} className="living-procedural-scene" decorative/>}
    <div className="living-ambient living-ambient-a"/>
    <div className="living-ambient living-ambient-b"/>
    <div className="living-grid"/>
    <div className="living-network">
      {networkLines.map(([left,top,rotate],index)=><i className="living-network-line" style={{left,top,"--network-rotate":rotate} as CSSProperties} key={`line-${index}`}/>) }
      {networkNodes.map(([left,top],index)=><i className="living-network-node" style={{left,top,"--node-delay":`${index*-.7}s`} as CSSProperties} key={`node-${index}`}/>) }
    </div>
    <div className="living-radar"><i/><i/><i/></div>
    <div className="living-scan"/>
    <div className="living-noise"/>
  </div>;
}
