import {isValidElement,type ReactNode} from "react";
import {describe,expect,it} from "vitest";
import {SpatialConsultationHub} from "@/components/spatial-consultation-hub";
import {mediaAssetSchema} from "@/lib/media/types";

function classNames(node:ReactNode,result:string[]=[]):string[]{
 if(Array.isArray(node)){node.forEach(child=>classNames(child,result));return result}
 if(!isValidElement<{className?:string;children?:ReactNode}>(node))return result;
 if(typeof node.props.className==="string")result.push(node.props.className);
 classNames(node.props.children,result);
 return result;
}
function hrefs(node:ReactNode,result:string[]=[]):string[]{
 if(Array.isArray(node)){node.forEach(child=>hrefs(child,result));return result}
 if(!isValidElement<{href?:string;children?:ReactNode}>(node))return result;
 if(typeof node.props.href==="string")result.push(node.props.href);
 hrefs(node.props.children,result);
 return result;
}

const compass=mediaAssetSchema.parse({id:"compass",filename:"compass.png",originalFilename:"IMG_0228.png",url:"/compass.png",provider:"local",mimeType:"image/png",width:4000,height:6000,fileSize:10,title:{en:"Compass portrait",vi:""},alt:{en:"Anh Cao holding a compass",vi:"Anh Cao cầm la bàn"},caption:{en:"",vi:""},focalPoint:{x:.5,y:1},mediaRole:"compass-portrait",serviceLens:"space",createdAt:"2026-01-01",updatedAt:"2026-01-01"});

describe("SPACE hero media",()=>{
 it("uses the blueprint fallback when no compass portrait is assigned",()=>{const classes=classNames(SpatialConsultationHub({locale:"en",media:{}}));expect(classes.some(value=>value.includes("space-hero-diagram"))).toBe(true);expect(classes.some(value=>value.includes("space-hero-portrait"))).toBe(false)});
 it("moves the assigned compass portrait into the hero without a lower duplicate",()=>{const classes=classNames(SpatialConsultationHub({locale:"en",media:{"spatial.compassPortrait":compass}}));expect(classes.some(value=>value.includes("space-hero-portrait"))).toBe(true);expect(classes.some(value=>value.includes("space-hero-diagram"))).toBe(false);expect(classes.some(value=>value.includes("space-compass-preview"))).toBe(false)});
 it.each(["en","vi"] as const)("keeps the %s SPACE pathways in an ordered, linked sequence",(locale)=>{const tree=SpatialConsultationHub({locale,media:{}}),classes=classNames(tree),links=hrefs(tree);expect(classes).toContain("space-pathway-circuit");for(const slug of ["residential-consultation","property-selection","business-consultation","space-audit"])expect(links).toContain(`/${locale}/spatial-consultation/${slug}`);expect(classes).not.toContain("space-pathway-grid")});
});
