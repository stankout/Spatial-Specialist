import {z} from "zod";
import {
  foregroundColors,
  foregroundCssVariables,
  resolveForegroundPalette,
  type SurfaceTone,
} from "@/lib/visuals/contrast";
import {proceduralSceneIdSchema} from "@/lib/media/procedural-scenes";

export const visualPageKeys=["homepage","deal","condition","space","about","services","search","articles","videos","guides","contact","booking","footer"] as const;
export const visualPageKeySchema=z.enum(visualPageKeys);
export type VisualPageKey=z.infer<typeof visualPageKeySchema>;

const percent=z.number().min(0).max(100);
const blur=z.number().min(0).max(48);
const safeHexSchema=z.string().regex(/^#[0-9a-fA-F]{6}$/,"Use a six-digit hexadecimal color.");

export const fontRoleSchema=z.enum(["editorial","modern","technical","cyber","display"]);
export const textColorTokenSchema=z.enum(["auto","ink","ivory","muted","mint","brass","sage","crimson","signal-blue"]);
export const textColorSchema=z.union([textColorTokenSchema,safeHexSchema]);
export const textGradientSchema=z.enum(["none","mint-signal","aurora","holographic","cool-cyber","warm-signal","brass-deal","space-mint","crimson","monochrome-light"]);
export const textBlendModeSchema=z.enum(["normal","screen","multiply","overlay","soft-light"]);
export const autoContrastSchema=z.enum(["off","subtle","strong"]);
export const textBackgroundSchema=z.enum(["none","subtle-glass","dark-glass","light-glass","signal-panel","soft-gradient-panel"]);
export const textMotionSchema=z.enum(["none","gradient-drift","light-sweep","soft-pulse","signal-flicker"]);
export const textEffectTargets=["heading","body","eyebrow","cta","muted","accent"] as const;
export const textEffectTargetSchema=z.enum(textEffectTargets);
export type TextEffectTarget=z.infer<typeof textEffectTargetSchema>;

export const textEffectLayerSchema=z.object({
  color:textColorSchema,
  opacity:percent,
  gradient:textGradientSchema,
  gradientAngle:z.number().min(0).max(360),
  gradientStart:textColorSchema,
  gradientEnd:textColorSchema,
  strokeEnabled:z.boolean(),
  strokeColor:textColorSchema,
  strokeWidth:z.number().min(0).max(3),
  strokeOpacity:percent,
  glowEnabled:z.boolean(),
  glowColor:textColorSchema,
  glowIntensity:percent,
  glowRadius:z.number().min(0).max(40),
  shadowEnabled:z.boolean(),
  shadowColor:textColorSchema,
  shadowOpacity:percent,
  shadowBlur:z.number().min(0).max(40),
  shadowX:z.number().min(-20).max(20),
  shadowY:z.number().min(-20).max(20),
  background:textBackgroundSchema,
  backgroundOpacity:percent,
  backgroundBlur:z.number().min(0).max(32),
  backgroundPadding:z.number().int().min(0).max(3),
  backgroundRadius:z.number().min(0).max(24),
  blendMode:textBlendModeSchema,
  autoContrast:autoContrastSchema,
  motion:textMotionSchema.default("none"),
  motionSpeed:z.number().min(4).max(40).default(18),
  reveal:z.enum(["none","fade","rise","focus"]).default("none"),
}).strict();
export type TextEffectLayer=z.infer<typeof textEffectLayerSchema>;
const textEffectLayerOverrideSchema=textEffectLayerSchema.partial().extend({motion:textMotionSchema.optional(),motionSpeed:z.number().min(4).max(40).optional(),reveal:z.enum(["none","fade","rise","focus"]).optional()}).strict();

export const baselineTextEffect:TextEffectLayer={
  color:"auto",opacity:100,gradient:"none",gradientAngle:110,gradientStart:"auto",gradientEnd:"auto",
  strokeEnabled:false,strokeColor:"ink",strokeWidth:0,strokeOpacity:0,
  glowEnabled:false,glowColor:"mint",glowIntensity:18,glowRadius:12,
  shadowEnabled:false,shadowColor:"ink",shadowOpacity:24,shadowBlur:14,shadowX:0,shadowY:5,
  background:"none",backgroundOpacity:72,backgroundBlur:12,backgroundPadding:0,backgroundRadius:0,
  blendMode:"normal",autoContrast:"subtle",motion:"none",motionSpeed:18,reveal:"none",
};
export const baselineTextEffects=Object.fromEntries(textEffectTargets.map(target=>[target,structuredClone(baselineTextEffect)])) as Record<TextEffectTarget,TextEffectLayer>;
export const textEffectsSchema=z.object(Object.fromEntries(textEffectTargets.map(target=>[target,textEffectLayerSchema])) as Record<TextEffectTarget,typeof textEffectLayerSchema>).strict();
export const textEffectsOverrideSchema=z.object(Object.fromEntries(textEffectTargets.map(target=>[target,textEffectLayerOverrideSchema.optional()])) as Record<TextEffectTarget,z.ZodOptional<typeof textEffectLayerOverrideSchema>>).strict();
export type TextEffects=z.infer<typeof textEffectsSchema>;
export type TextEffectsOverride=z.infer<typeof textEffectsOverrideSchema>;

export const backdropSchema=z.object({
  enabled:z.boolean(),
  mediaType:z.enum(["auto","image","video","none"]).default("auto"),
  mediaFit:z.enum(["cover","contain","source"]).default("cover"),
  primaryOpacity:percent,
  primaryBrightness:z.number().min(40).max(160),
  primarySaturation:z.number().min(0).max(180),
  primaryContrast:z.number().min(50).max(160),
  videoOpacity:percent.default(100),
  videoBrightness:z.number().min(40).max(160).default(100),
  videoContrast:z.number().min(50).max(160).default(100),
  videoSaturation:z.number().min(0).max(180).default(100),
  videoBlur:z.number().min(0).max(24).default(0),
  playbackSpeed:z.union([z.literal(.5),z.literal(.75),z.literal(1),z.literal(1.25)]).default(1),
  ambientOpacity:percent,
  ambientBlur:blur,
  ambientBrightness:z.number().min(20).max(120),
  ambientSaturation:z.number().min(0).max(160),
  overlayStrength:percent,
  alignment:z.enum(["left","center","right"]),
  panEnabled:z.boolean().default(true),
  panDirection:z.enum(["vertical","static"]).default("vertical"),
  panIntensity:z.number().min(0).max(100),
}).strict();

export const surfaceSchema=z.object({
  mode:z.enum(["clear","soft","light","dark","glass"]),opacity:percent,blur:blur,borderStrength:percent,
  tint:z.enum(["neutral","ivory","mint","sage","ink"]),shadowStrength:percent,
  depth:z.number().min(0).max(100).default(36),edgeGlow:z.number().min(0).max(60).default(8),
  hoverLift:z.number().min(0).max(12).default(3),response:z.number().min(0).max(100).default(32),
}).strict();
const surfaceOverrideSchema=z.object({mode:surfaceSchema.shape.mode.optional(),opacity:percent.optional(),blur:blur.optional(),borderStrength:percent.optional(),tint:surfaceSchema.shape.tint.optional(),shadowStrength:percent.optional(),depth:z.number().min(0).max(100).optional(),edgeGlow:z.number().min(0).max(60).optional(),hoverLift:z.number().min(0).max(12).optional(),response:z.number().min(0).max(100).optional()}).strict();

export const motionSchema=z.object({
  enabled:z.boolean().default(true),theme:z.enum(["calm","property-intelligence","market-network","spatial-field","editorial-archive","hud-minimal"]).default("calm"),
  intensity:z.number().min(0).max(100).default(28),speed:z.number().min(.5).max(2).default(1),
  parallax:z.boolean().default(true),parallaxStrength:z.number().min(0).max(24).default(7),
  hoverEnergy:z.number().min(0).max(60).default(20),pauseOffscreen:z.boolean().default(true),
}).strict();
export const ambientFieldSchema=z.object({
  enabled:z.boolean().default(true),brightness:z.number().min(20).max(120).default(54),glowStrength:z.number().min(0).max(60).default(16),
  glowSpread:z.number().min(0).max(48).default(24),noise:z.number().min(0).max(12).default(2),blurDepth:z.number().min(0).max(32).default(16),
  driftSpeed:z.number().min(12).max(120).default(58),nodeNetwork:z.boolean().default(false),nodeDensity:z.number().int().min(0).max(12).default(5),
  nodeFlicker:z.number().min(0).max(20).default(4),lineSweep:z.number().min(0).max(50).default(10),
}).strict();
export const gridHudSchema=z.object({
  enabled:z.boolean().default(true),style:z.enum(["architectural","market","spatial","editorial","hud"]).default("architectural"),
  opacity:z.number().min(0).max(35).default(9),density:z.number().min(24).max(120).default(64),drift:z.number().min(0).max(20).default(3),
  scan:z.enum(["none","horizontal","vertical"]).default("none"),scanSpeed:z.number().min(4).max(30).default(16),radar:z.boolean().default(false),
}).strict();
export const transitionSchema=z.object({
  style:z.enum(["none","editorial","depth","scan","spatial"]).default("editorial"),duration:z.number().min(.2).max(1.5).default(.72),
  distance:z.number().min(0).max(48).default(14),stagger:z.number().min(0).max(.4).default(.08),lightPass:z.boolean().default(true),
}).strict();
export const proceduralVisualSchema=z.object({mode:z.enum(["page-default","off","procedural"]).default("page-default"),sceneId:proceduralSceneIdSchema.default("ac-ambient-intelligence"),intensity:z.number().min(0).max(100).default(28),motionSpeed:z.number().min(.1).max(2).default(.72)}).strict();
const motionOverrideSchema=z.object({enabled:z.boolean().optional(),theme:motionSchema.shape.theme.removeDefault().optional(),intensity:z.number().min(0).max(100).optional(),speed:z.number().min(.5).max(2).optional(),parallax:z.boolean().optional(),parallaxStrength:z.number().min(0).max(24).optional(),hoverEnergy:z.number().min(0).max(60).optional(),pauseOffscreen:z.boolean().optional()}).strict();
const ambientOverrideSchema=z.object({enabled:z.boolean().optional(),brightness:z.number().min(20).max(120).optional(),glowStrength:z.number().min(0).max(60).optional(),glowSpread:z.number().min(0).max(48).optional(),noise:z.number().min(0).max(12).optional(),blurDepth:z.number().min(0).max(32).optional(),driftSpeed:z.number().min(12).max(120).optional(),nodeNetwork:z.boolean().optional(),nodeDensity:z.number().int().min(0).max(12).optional(),nodeFlicker:z.number().min(0).max(20).optional(),lineSweep:z.number().min(0).max(50).optional()}).strict();
const gridOverrideSchema=z.object({enabled:z.boolean().optional(),style:gridHudSchema.shape.style.removeDefault().optional(),opacity:z.number().min(0).max(35).optional(),density:z.number().min(24).max(120).optional(),drift:z.number().min(0).max(20).optional(),scan:gridHudSchema.shape.scan.removeDefault().optional(),scanSpeed:z.number().min(4).max(30).optional(),radar:z.boolean().optional()}).strict();
const transitionOverrideSchema=z.object({style:transitionSchema.shape.style.removeDefault().optional(),duration:z.number().min(.2).max(1.5).optional(),distance:z.number().min(0).max(48).optional(),stagger:z.number().min(0).max(.4).optional(),lightPass:z.boolean().optional()}).strict();
const proceduralOverrideSchema=z.object({mode:proceduralVisualSchema.shape.mode.removeDefault().optional(),sceneId:proceduralSceneIdSchema.optional(),intensity:z.number().min(0).max(100).optional(),motionSpeed:z.number().min(.1).max(2).optional()}).strict();

export const typographySchema=z.object({
  fontRole:fontRoleSchema.default("modern"),displayScale:z.enum(["compact","standard","expressive"]),bodyScale:z.enum(["compact","standard","generous"]),
  headingWeight:z.enum(["regular","medium","semibold","bold"]),italic:z.boolean().default(false),lineHeight:z.enum(["tight","standard","relaxed"]).default("standard"),
  letterSpacing:z.enum(["tight","standard","technical"]),textTone:z.enum(["auto","light","dark"]),
}).strict();

export const foregroundSchema=z.object({
  mode:z.enum(["auto","light","dark","custom"]).default("auto"),
  autoContrast:z.boolean().default(true),
  customColor:safeHexSchema.default(foregroundColors.ivory),
}).strict().default({mode:"auto",autoContrast:true,customColor:foregroundColors.ivory});

export const mediaPresentationSchema=z.object({fit:z.enum(["source","contain","portrait-frame","editorial-frame","background"]),focalX:percent,focalY:percent,frame:z.enum(["none","hairline","glass","dark"]),cornerStyle:z.enum(["square","subtle"])}).strict();
export const footerVisualSchema=z.object({surface:z.enum(["solid-dark","glass-dark","transparent-dark"]),alignment:z.enum(["split","center"]),accent:z.enum(["mint","brass","sage","neutral"]),typeStyle:z.enum(["technical","editorial"]),dividerStrength:percent,panelOpacity:percent,blur}).strict();

export const visualSettingsSchema=z.object({
  accent:z.enum(["mint","brass","sage","neutral","service-default"]),
  backdrop:backdropSchema,surface:surfaceSchema,typography:typographySchema,foreground:foregroundSchema,
  textEffects:textEffectsSchema.default(()=>structuredClone(baselineTextEffects)),
  motion:motionSchema.default({enabled:true,theme:"calm",intensity:28,speed:1,parallax:true,parallaxStrength:7,hoverEnergy:20,pauseOffscreen:true}),
  ambient:ambientFieldSchema.default({enabled:true,brightness:54,glowStrength:16,glowSpread:24,noise:2,blurDepth:16,driftSpeed:58,nodeNetwork:false,nodeDensity:5,nodeFlicker:4,lineSweep:10}),
  grid:gridHudSchema.default({enabled:true,style:"architectural",opacity:9,density:64,drift:3,scan:"none",scanSpeed:16,radar:false}),
  transition:transitionSchema.default({style:"editorial",duration:.72,distance:14,stagger:.08,lightPass:true}),
  procedural:proceduralVisualSchema.default({mode:"page-default",sceneId:"ac-ambient-intelligence",intensity:28,motionSpeed:.72}),
  media:mediaPresentationSchema,footer:footerVisualSchema,
}).strict();
export type VisualSettings=z.infer<typeof visualSettingsSchema>;

export const visualSettingsOverrideSchema=z.object({
  accent:visualSettingsSchema.shape.accent.optional(),backdrop:backdropSchema.partial().strict().optional(),surface:surfaceOverrideSchema.optional(),
  typography:typographySchema.partial().strict().optional(),foreground:foregroundSchema.removeDefault().partial().strict().optional(),textEffects:textEffectsOverrideSchema.optional(),motion:motionOverrideSchema.optional(),ambient:ambientOverrideSchema.optional(),grid:gridOverrideSchema.optional(),transition:transitionOverrideSchema.optional(),procedural:proceduralOverrideSchema.optional(),media:mediaPresentationSchema.partial().strict().optional(),footer:footerVisualSchema.partial().strict().optional(),
}).strict();
export type VisualSettingsOverride=z.infer<typeof visualSettingsOverrideSchema>;

export const visualSections:Record<VisualPageKey,readonly string[]>={
  homepage:["hero","services","featured","clarity","perspective","guides","cta"],deal:["hero","pathways","property-media","market-context","service-area","resources","cta"],
  condition:["hero","process","systems","report","defect-library","standards","credentials","faq","cta"],space:["hero","pathways","methodology","analysis","selection","interpretation","cta"],
  about:["hero","perspective","method"],services:["hero","services"],search:["hero","form","results"],articles:["hero","library","detail"],videos:["hero","library","detail"],guides:["hero","library","detail"],contact:["hero","form"],booking:["hero","form"],footer:["footer"],
};

const pageOverrideSchema=z.object({settings:visualSettingsOverrideSchema.default({}),sections:z.record(z.string(),visualSettingsOverrideSchema).default({})}).strict();
export type VisualPageOverride=z.infer<typeof pageOverrideSchema>;
const pagesSchema=z.partialRecord(visualPageKeySchema,pageOverrideSchema);
export const visualConfigSchema=z.object({version:z.literal(1),global:visualSettingsSchema,pages:pagesSchema,locales:z.object({en:pagesSchema.optional(),vi:pagesSchema.optional()}).strict().default({})}).strict().superRefine((value,ctx)=>{
  const inspect=(pages:z.infer<typeof pagesSchema>,prefix:(string|number)[])=>{for(const [page,override] of Object.entries(pages)){const allowed=visualSections[page as VisualPageKey]??[];for(const section of Object.keys(override?.sections??{}))if(!allowed.includes(section))ctx.addIssue({code:"custom",message:`Unknown visual section: ${page}.${section}`,path:[...prefix,page,"sections",section]})}};
  inspect(value.pages,["pages"]);if(value.locales.en)inspect(value.locales.en,["locales","en"]);if(value.locales.vi)inspect(value.locales.vi,["locales","vi"]);
});
export type VisualConfig=z.infer<typeof visualConfigSchema>;

export const baselineVisualSettings:VisualSettings={
  accent:"service-default",
  backdrop:{enabled:true,mediaType:"auto",mediaFit:"cover",primaryOpacity:100,primaryBrightness:100,primarySaturation:100,primaryContrast:100,videoOpacity:100,videoBrightness:100,videoContrast:100,videoSaturation:100,videoBlur:0,playbackSpeed:1,ambientOpacity:100,ambientBlur:30,ambientBrightness:58,ambientSaturation:72,overlayStrength:0,alignment:"center",panEnabled:true,panDirection:"vertical",panIntensity:100},
  surface:{mode:"glass",opacity:76,blur:16,borderStrength:22,tint:"ivory",shadowStrength:0,depth:36,edgeGlow:8,hoverLift:3,response:32},
  typography:{fontRole:"modern",displayScale:"standard",bodyScale:"standard",headingWeight:"medium",italic:false,lineHeight:"standard",letterSpacing:"standard",textTone:"auto"},
  foreground:{mode:"auto",autoContrast:true,customColor:foregroundColors.ivory},
  textEffects:structuredClone(baselineTextEffects),
  motion:{enabled:true,theme:"calm",intensity:28,speed:1,parallax:true,parallaxStrength:7,hoverEnergy:20,pauseOffscreen:true},
  ambient:{enabled:true,brightness:54,glowStrength:16,glowSpread:24,noise:2,blurDepth:16,driftSpeed:58,nodeNetwork:false,nodeDensity:5,nodeFlicker:4,lineSweep:10},
  grid:{enabled:true,style:"architectural",opacity:9,density:64,drift:3,scan:"none",scanSpeed:16,radar:false},
  transition:{style:"editorial",duration:.72,distance:14,stagger:.08,lightPass:true},
  procedural:{mode:"page-default",sceneId:"ac-ambient-intelligence",intensity:28,motionSpeed:.72},
  media:{fit:"source",focalX:50,focalY:50,frame:"none",cornerStyle:"square"},
  footer:{surface:"solid-dark",alignment:"split",accent:"mint",typeStyle:"technical",dividerStrength:30,panelOpacity:3,blur:0},
};
export const baselineVisualConfig:VisualConfig={version:1,global:baselineVisualSettings,pages:{},locales:{}};
const serviceAccents:Partial<Record<VisualPageKey,VisualSettings["accent"]>>={deal:"brass",condition:"sage",space:"mint"};
const pageVisualDefaults:Partial<Record<VisualPageKey,VisualSettingsOverride>>={
  homepage:{motion:{theme:"property-intelligence",intensity:34},ambient:{glowStrength:18,nodeNetwork:true,nodeDensity:5,lineSweep:12},grid:{style:"architectural",opacity:10,scan:"horizontal"},transition:{style:"depth"},procedural:{sceneId:"ac-ambient-intelligence",intensity:34,motionSpeed:.72}},
  deal:{motion:{theme:"market-network",intensity:38},ambient:{glowStrength:14,nodeNetwork:true,nodeDensity:8,lineSweep:20},grid:{style:"market",opacity:12,density:56,scan:"horizontal"},transition:{style:"scan"},procedural:{sceneId:"market-network",intensity:38,motionSpeed:.86}},
  condition:{motion:{theme:"hud-minimal",intensity:18},ambient:{enabled:false},grid:{style:"hud",opacity:8,scan:"none"},transition:{style:"editorial"},procedural:{sceneId:"security-grid",intensity:18,motionSpeed:.58}},
  space:{motion:{theme:"spatial-field",intensity:32},ambient:{glowStrength:20,nodeNetwork:true,nodeDensity:6,lineSweep:8},grid:{style:"spatial",opacity:12,scan:"vertical",radar:true},transition:{style:"spatial"},procedural:{sceneId:"spatial-field",intensity:32,motionSpeed:.66}},
  about:{motion:{theme:"calm",intensity:22},ambient:{glowStrength:12,nodeNetwork:false},grid:{style:"architectural",opacity:7},transition:{style:"editorial"},procedural:{sceneId:"ac-ambient-intelligence",intensity:22}},
  services:{motion:{theme:"property-intelligence",intensity:24},ambient:{glowStrength:12,nodeNetwork:true,nodeDensity:4},grid:{style:"architectural",opacity:8},transition:{style:"depth"},procedural:{sceneId:"ac-ambient-intelligence",intensity:24}},
  search:{motion:{theme:"editorial-archive",intensity:18},ambient:{glowStrength:8,nodeNetwork:false},grid:{style:"editorial",opacity:6},transition:{style:"editorial"},procedural:{sceneId:"signal-terminal",intensity:18}},
  articles:{motion:{theme:"editorial-archive",intensity:20},ambient:{glowStrength:10,nodeNetwork:false},grid:{style:"editorial",opacity:6},transition:{style:"editorial"},procedural:{sceneId:"global-intelligence",intensity:20}},
  videos:{motion:{theme:"editorial-archive",intensity:24},grid:{style:"editorial",opacity:7},transition:{style:"depth"},procedural:{sceneId:"cyber-archive",intensity:22}},
  guides:{motion:{theme:"editorial-archive",intensity:18},grid:{style:"editorial",opacity:6},transition:{style:"editorial"},procedural:{sceneId:"cyber-archive",intensity:18}},
};

function mergeTextEffects(base:TextEffects,override?:TextEffectsOverride):TextEffects{const next=structuredClone(base);if(!override)return next;for(const target of textEffectTargets)if(override[target])next[target]={...next[target],...override[target]};return next}
function mergeSettings(base:VisualSettings,override?:VisualSettingsOverride):VisualSettings{if(!override)return structuredClone(base);return {accent:override.accent??base.accent,backdrop:{...base.backdrop,...override.backdrop},surface:{...base.surface,...override.surface},typography:{...base.typography,...override.typography},foreground:{...base.foreground,...override.foreground},textEffects:mergeTextEffects(base.textEffects,override.textEffects),motion:{...base.motion,...override.motion},ambient:{...base.ambient,...override.ambient},grid:{...base.grid,...override.grid},transition:{...base.transition,...override.transition},procedural:{...base.procedural,...override.procedural},media:{...base.media,...override.media},footer:{...base.footer,...override.footer}}}
export function resolveVisualSettings(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi"="en",section?:string):VisualSettings{const pageOverride=config.pages[page],localeOverride=config.locales[locale]?.[page];let result=mergeSettings(config.global,{accent:serviceAccents[page]??config.global.accent});result=mergeSettings(result,pageVisualDefaults[page]);result=mergeSettings(result,pageOverride?.settings);result=mergeSettings(result,localeOverride?.settings);if(section){result=mergeSettings(result,pageOverride?.sections[section]);result=mergeSettings(result,localeOverride?.sections[section])}return result}

export const visualPresets={
  "editorial-clear":{surface:{mode:"clear",opacity:0,blur:0,borderStrength:16,tint:"neutral",shadowStrength:0},typography:{displayScale:"expressive",bodyScale:"standard",headingWeight:"medium",letterSpacing:"tight",textTone:"auto"},foreground:{mode:"auto",autoContrast:true}},
  "cyber-glass":{surface:{mode:"glass",opacity:76,blur:16,borderStrength:22,tint:"ivory",shadowStrength:0},typography:{displayScale:"standard",bodyScale:"standard",headingWeight:"medium",letterSpacing:"technical",textTone:"auto"},foreground:{mode:"auto",autoContrast:true}},
  "immersive-backdrop":{backdrop:{enabled:true,primaryOpacity:100,primaryBrightness:92,primarySaturation:92,primaryContrast:108,ambientOpacity:100,ambientBlur:30,ambientBrightness:48,ambientSaturation:68,overlayStrength:12,alignment:"center",panIntensity:100},surface:{mode:"glass",opacity:62,blur:14,borderStrength:18,tint:"ink",shadowStrength:8},foreground:{mode:"auto",autoContrast:true}},
  "high-contrast":{surface:{mode:"dark",opacity:94,blur:0,borderStrength:34,tint:"ink",shadowStrength:0},typography:{displayScale:"standard",bodyScale:"standard",headingWeight:"semibold",letterSpacing:"standard",textTone:"light"},foreground:{mode:"light",autoContrast:true}},
  "service-default":{foreground:{mode:"auto",autoContrast:true}},
  "cinematic-calm":{motion:{enabled:true,theme:"calm",intensity:22,speed:.8,parallax:true,parallaxStrength:5,hoverEnergy:12},ambient:{enabled:true,brightness:52,glowStrength:12,glowSpread:28,noise:1,blurDepth:20,driftSpeed:76,nodeNetwork:false,nodeDensity:3,nodeFlicker:2,lineSweep:5},grid:{enabled:true,style:"architectural",opacity:6,density:72,drift:2,scan:"none",scanSpeed:20,radar:false},transition:{style:"editorial",duration:.9,distance:10,stagger:.08,lightPass:true}},
  "property-intelligence":{motion:{enabled:true,theme:"property-intelligence",intensity:34,speed:1,parallax:true,parallaxStrength:7,hoverEnergy:20},ambient:{enabled:true,brightness:58,glowStrength:18,glowSpread:24,noise:2,blurDepth:16,driftSpeed:58,nodeNetwork:true,nodeDensity:5,nodeFlicker:4,lineSweep:12},grid:{enabled:true,style:"architectural",opacity:10,density:64,drift:3,scan:"horizontal",scanSpeed:18,radar:false},transition:{style:"depth",duration:.72,distance:14,stagger:.08,lightPass:true}},
  "market-network":{motion:{enabled:true,theme:"market-network",intensity:38,speed:1.08,parallax:true,parallaxStrength:6,hoverEnergy:26},ambient:{enabled:true,brightness:50,glowStrength:14,glowSpread:20,noise:2,blurDepth:12,driftSpeed:46,nodeNetwork:true,nodeDensity:8,nodeFlicker:5,lineSweep:20},grid:{enabled:true,style:"market",opacity:12,density:56,drift:4,scan:"horizontal",scanSpeed:13,radar:false},transition:{style:"scan",duration:.62,distance:12,stagger:.06,lightPass:true}},
  "spatial-field":{motion:{enabled:true,theme:"spatial-field",intensity:32,speed:.86,parallax:true,parallaxStrength:9,hoverEnergy:18},ambient:{enabled:true,brightness:56,glowStrength:20,glowSpread:32,noise:1,blurDepth:22,driftSpeed:70,nodeNetwork:true,nodeDensity:6,nodeFlicker:3,lineSweep:8},grid:{enabled:true,style:"spatial",opacity:12,density:72,drift:3,scan:"vertical",scanSpeed:22,radar:true},transition:{style:"spatial",duration:.88,distance:18,stagger:.1,lightPass:true}},
  "editorial-archive":{motion:{enabled:true,theme:"editorial-archive",intensity:18,speed:.74,parallax:false,parallaxStrength:0,hoverEnergy:12},ambient:{enabled:true,brightness:48,glowStrength:8,glowSpread:18,noise:2,blurDepth:12,driftSpeed:88,nodeNetwork:false,nodeDensity:2,nodeFlicker:1,lineSweep:4},grid:{enabled:true,style:"editorial",opacity:6,density:88,drift:1,scan:"none",scanSpeed:24,radar:false},transition:{style:"editorial",duration:.82,distance:9,stagger:.06,lightPass:false}},
  "hud-minimal":{motion:{enabled:true,theme:"hud-minimal",intensity:18,speed:.9,parallax:false,parallaxStrength:0,hoverEnergy:10},ambient:{enabled:false,brightness:46,glowStrength:4,glowSpread:12,noise:0,blurDepth:8,driftSpeed:80,nodeNetwork:false,nodeDensity:2,nodeFlicker:1,lineSweep:4},grid:{enabled:true,style:"hud",opacity:8,density:48,drift:1,scan:"none",scanSpeed:20,radar:false},transition:{style:"editorial",duration:.6,distance:8,stagger:.04,lightPass:false}},
  "motion-off":{motion:{enabled:false,intensity:0,parallax:false,parallaxStrength:0,hoverEnergy:0},ambient:{enabled:false,glowStrength:0,nodeNetwork:false,lineSweep:0},grid:{enabled:false,opacity:0,scan:"none",radar:false},transition:{style:"none",duration:.2,distance:0,stagger:0,lightPass:false}},
} as const satisfies Record<string,VisualSettingsOverride>;
export type VisualPresetKey=keyof typeof visualPresets;

const textPreset=(typography:VisualSettingsOverride["typography"],heading:Partial<TextEffectLayer>,body:Partial<TextEffectLayer>={})=>({typography,textEffects:{heading,body}} satisfies VisualSettingsOverride);
export const textPresets={
  "editorial-clear":textPreset({fontRole:"editorial",headingWeight:"medium",letterSpacing:"tight",lineHeight:"tight"},{color:"auto",gradient:"none",glowEnabled:false,strokeEnabled:false,background:"none",blendMode:"normal"}),
  "cyber-mint":textPreset({fontRole:"cyber",headingWeight:"semibold",letterSpacing:"technical"},{color:"mint",gradient:"mint-signal",glowEnabled:true,glowColor:"mint",glowIntensity:24,glowRadius:14,motion:"light-sweep",motionSpeed:20}),
  holographic:textPreset({fontRole:"display",headingWeight:"medium"},{gradient:"holographic",color:"ivory",glowEnabled:true,glowColor:"signal-blue",glowIntensity:18,blendMode:"screen",motion:"gradient-drift",motionSpeed:24}),
  aurora:textPreset({fontRole:"modern",headingWeight:"semibold"},{gradient:"aurora",color:"ivory",glowEnabled:true,glowColor:"mint",glowIntensity:16}),
  "signal-blue":textPreset({fontRole:"technical",headingWeight:"semibold",letterSpacing:"technical"},{color:"signal-blue",gradient:"cool-cyber",glowEnabled:true,glowColor:"signal-blue",glowIntensity:20}),
  "signal-gold":textPreset({fontRole:"editorial",headingWeight:"semibold"},{color:"brass",gradient:"warm-signal",shadowEnabled:true,shadowColor:"ink",shadowOpacity:30}),
  "void-white":textPreset({fontRole:"modern",headingWeight:"medium"},{color:"ivory",gradient:"none",shadowEnabled:true,shadowOpacity:42,shadowBlur:18,autoContrast:"strong"},{color:"ivory",autoContrast:"strong"}),
  "crimson-tech":textPreset({fontRole:"technical",headingWeight:"semibold",letterSpacing:"technical"},{color:"crimson",gradient:"crimson",glowEnabled:true,glowColor:"crimson",glowIntensity:18}),
  "soft-glass":textPreset({fontRole:"modern",headingWeight:"medium"},{color:"auto",background:"subtle-glass",backgroundOpacity:68,backgroundBlur:14,backgroundPadding:2,backgroundRadius:8,autoContrast:"strong"}),
  "high-contrast":textPreset({fontRole:"modern",headingWeight:"bold"},{color:"auto",background:"dark-glass",backgroundOpacity:88,backgroundPadding:2,autoContrast:"strong"},{color:"auto",autoContrast:"strong"}),
  deal:textPreset({fontRole:"editorial",headingWeight:"semibold",letterSpacing:"tight"},{color:"brass",gradient:"brass-deal",shadowEnabled:true,shadowOpacity:24}),
  space:textPreset({fontRole:"technical",headingWeight:"medium",letterSpacing:"technical"},{color:"mint",gradient:"space-mint",glowEnabled:true,glowColor:"mint",glowIntensity:15,motion:"soft-pulse",motionSpeed:18}),
} as const satisfies Record<string,VisualSettingsOverride>;
export type TextPresetKey=keyof typeof textPresets;

function mergeOverride(current:VisualSettingsOverride,preset:VisualSettingsOverride):VisualSettingsOverride{return {...current,...structuredClone(preset),typography:{...current.typography,...preset.typography},textEffects:{...current.textEffects,...Object.fromEntries(textEffectTargets.map(target=>[target,{...current.textEffects?.[target],...preset.textEffects?.[target]}]))}}}
export function applyVisualPreset(config:VisualConfig,page:VisualPageKey,preset:VisualPresetKey):VisualConfig{const next=structuredClone(config),current=next.pages[page]??{settings:{},sections:{}};current.settings=mergeOverride(current.settings,visualPresets[preset]);next.pages[page]=current;return visualConfigSchema.parse(next)}
export function applyGlobalVisualPreset(config:VisualConfig,preset:VisualPresetKey):VisualConfig{const next=structuredClone(config);next.global=mergeSettings(next.global,visualPresets[preset]);return visualConfigSchema.parse(next)}
export function applyTextPreset(config:VisualConfig,page:VisualPageKey,preset:TextPresetKey,options:{locale?:"en"|"vi";section?:string}={}):VisualConfig{const next=structuredClone(config),target=options.locale?(next.locales[options.locale]??={}):next.pages,entry=target[page]??{settings:{},sections:{}};if(options.section)entry.sections[options.section]=mergeOverride(entry.sections[options.section]??{},textPresets[preset]);else entry.settings=mergeOverride(entry.settings,textPresets[preset]);target[page]=entry;return visualConfigSchema.parse(next)}
export function applyGlobalTextPreset(config:VisualConfig,preset:TextPresetKey):VisualConfig{const next=structuredClone(config);next.global=mergeSettings(next.global,textPresets[preset]);return visualConfigSchema.parse(next)}
export function resetVisualPage(config:VisualConfig,page:VisualPageKey):VisualConfig{const next=structuredClone(config);delete next.pages[page];delete next.locales.en?.[page];delete next.locales.vi?.[page];return visualConfigSchema.parse(next)}
export function resetVisualSection(config:VisualConfig,page:VisualPageKey,section:string):VisualConfig{const next=structuredClone(config);delete next.pages[page]?.sections[section];delete next.locales.en?.[page]?.sections[section];delete next.locales.vi?.[page]?.sections[section];return visualConfigSchema.parse(next)}
export function publishVisualSnapshot(draft:VisualConfig):VisualConfig{return visualConfigSchema.parse(structuredClone(draft))}
export function clampVisualNumber(value:number,min:number,max:number){return Math.min(max,Math.max(min,Number.isFinite(value)?value:min))}

const colorTokens={auto:"currentColor",ink:"#081310",ivory:"#f4f1e8",muted:"#a9afa8",mint:"#91d6bb",brass:"#b79964",sage:"#9ab2a2",crimson:"#d85f68","signal-blue":"#68b9ff"} as const;
const gradientTokens:Record<z.infer<typeof textGradientSchema>,[string,string]>= {none:["transparent","transparent"],"mint-signal":["#d8fff0","#67d9ac"],aurora:["#73e2be","#7f8fff"],holographic:["#7cf4da","#c89cff"],"cool-cyber":["#64dcff","#7585ff"],"warm-signal":["#f2d39b","#b9864d"],"brass-deal":["#f0d6a7","#a77c40"],"space-mint":["#e0fff4","#75cfae"],crimson:["#ff969e","#b72e48"],"monochrome-light":["#ffffff","#aeb7b2"]};
function colorValue(value:z.infer<typeof textColorSchema>,fallback:string){if(value==="auto")return fallback;if(value.startsWith("#"))return value;return colorTokens[value as keyof typeof colorTokens]}
function contrastFallback(settings:VisualSettings,effect:TextEffectLayer,target:TextEffectTarget){if(effect.autoContrast==="off"||!settings.foreground.autoContrast)return settings.foreground.mode==="light"||settings.typography.textTone==="light"?colorTokens.ivory:settings.foreground.mode==="dark"||settings.typography.textTone==="dark"?colorTokens.ink:"currentColor";return `var(--fg-${target==="body"?"secondary":target==="eyebrow"?"label":target==="cta"?"button":target==="accent"?"accent":target},currentColor)`}
function effectVariables(settings:VisualSettings,target:TextEffectTarget){
  const effect=settings.textEffects[target],semanticAuto=effect.color==="auto"&&effect.autoContrast!=="off"&&settings.foreground.autoContrast,fallback=contrastFallback(settings,effect,target),color=colorValue(effect.color,fallback),start=colorValue(effect.gradientStart,gradientTokens[effect.gradient][0]),end=colorValue(effect.gradientEnd,gradientTokens[effect.gradient][1]),gradient=effect.gradient==="none"?"none":`linear-gradient(${effect.gradientAngle}deg,${start},${end})`,stroke=colorValue(effect.strokeColor,colorTokens.ink),glow=colorValue(effect.glowColor,colorTokens.mint),shadow=colorValue(effect.shadowColor,colorTokens.ink);
  const motionName={none:"none","gradient-drift":"living-gradient","light-sweep":"living-light-sweep","soft-pulse":"living-text-pulse","signal-flicker":"living-signal"}[effect.motion];
  const shadows=[] as string[];
  if(effect.glowEnabled&&effect.glowIntensity>0)shadows.push(`0 0 ${effect.glowRadius}px color-mix(in srgb,${glow} ${effect.glowIntensity}%,transparent)`);
  if(effect.shadowEnabled&&effect.shadowOpacity>0)shadows.push(`${effect.shadowX}px ${effect.shadowY}px ${effect.shadowBlur}px color-mix(in srgb,${shadow} ${effect.shadowOpacity}%,transparent)`);
  const backing={none:"transparent","subtle-glass":"rgb(244 241 232 / .18)","dark-glass":"rgb(8 19 16 / .78)","light-glass":"rgb(244 241 232 / .82)","signal-panel":"rgb(34 93 73 / .62)","soft-gradient-panel":"rgb(93 111 104 / .28)"}[effect.background],variables:{[key:string]:string}={
    [`--visual-${target}-opacity`]:String(effect.opacity/100),
    [`--visual-${target}-gradient`]:gradient,
    [`--visual-${target}-stroke`]:effect.strokeEnabled?`${effect.strokeWidth}px color-mix(in srgb,${stroke} ${effect.strokeOpacity}%,transparent)`:"0 transparent",
    [`--visual-${target}-shadow`]:shadows.length?shadows.join(","):"none",
    [`--visual-${target}-backing`]:`color-mix(in srgb,${backing} ${effect.backgroundOpacity}%,transparent)`,
    [`--visual-${target}-backdrop`]:effect.background==="none"?"none":`blur(${effect.backgroundBlur}px)`,
    [`--visual-${target}-padding`]:`${effect.backgroundPadding*.18}em ${effect.backgroundPadding*.28}em`,
    [`--visual-${target}-radius`]:`${effect.backgroundRadius}px`,
    [`--visual-${target}-blend`]:effect.blendMode,
    [`--visual-${target}-motion-name`]:motionName,
    [`--visual-${target}-motion-speed`]:`${effect.motionSpeed}s`,
  };
  if(!semanticAuto)variables[`--visual-${target}-color`]=color;
  if(effect.gradient!=="none")variables[`--visual-${target}-fill`]="transparent";
  else if(!semanticAuto)variables[`--visual-${target}-fill`]=color;
  return variables;
}

export function visualCssVariables(settings:VisualSettings,toneOverride?:SurfaceTone):Record<string,string>{
  const scales={compact:".92",standard:"1",expressive:"1.1"} as const,body={compact:".94",standard:"1",generous:"1.06"} as const,spacing={tight:"-.025em",standard:"0em",technical:".035em"} as const,lineHeight={tight:".92",standard:"1.05",relaxed:"1.18"} as const,fontRole={editorial:"var(--font-montserrat),Arial,sans-serif",modern:"var(--font-exo-2),var(--font-montserrat),Arial,sans-serif",technical:"var(--font-oxanium),var(--font-montserrat),Arial,sans-serif",cyber:"var(--font-oxanium),var(--font-exo-2),var(--font-montserrat),Arial,sans-serif",display:"var(--font-exo-2),var(--font-montserrat),Arial,sans-serif"} as const;
  const surfaceRgb={neutral:"232 230 222",ivory:"244 241 232",mint:"176 215 197",sage:"154 178 162",ink:"8 19 16"} as const,accentColor={mint:"#91d6bb",brass:"#b79964",sage:"#9ab2a2",neutral:"#d7d3c9","service-default":"#91d6bb"} as const;
  const foreground=resolveForegroundPalette(settings,toneOverride??"auto");
  const transitionName={none:"none",editorial:"living-section-in",depth:"living-section-in",scan:"living-section-scan",spatial:"living-section-spatial"}[settings.transition.style];
  const livingVariables={
    "--visual-living-accent-color":accentColor[settings.accent],"--visual-motion-intensity":String(settings.motion.intensity/100),"--visual-motion-speed":String(settings.motion.speed),"--visual-parallax-strength":`${settings.motion.parallaxStrength}px`,"--visual-hover-energy":String(settings.motion.hoverEnergy/100),
    "--visual-living-brightness":`${settings.ambient.brightness}%`,"--visual-ambient-glow":String(settings.ambient.glowStrength/100),"--visual-ambient-spread":`${settings.ambient.glowSpread}vw`,"--visual-ambient-noise":String(settings.ambient.noise/100),"--visual-ambient-depth":`${settings.ambient.blurDepth}px`,"--visual-ambient-duration":`${settings.ambient.driftSpeed/settings.motion.speed}s`,
    "--visual-node-opacity":String(Math.min(.24,settings.ambient.nodeDensity*.018)),"--visual-node-flicker":String(settings.ambient.nodeFlicker/100),"--visual-line-sweep":String(settings.ambient.lineSweep/100),
    "--visual-grid-opacity":String(settings.grid.opacity/100),"--visual-grid-density":`${settings.grid.density}px`,"--visual-grid-drift":`${settings.grid.drift}px`,"--visual-scan-duration":`${settings.grid.scanSpeed/settings.motion.speed}s`,
    "--visual-transition-name":transitionName,"--visual-transition-duration":`${settings.transition.duration}s`,"--visual-transition-distance":`${settings.transition.distance}px`,"--visual-transition-stagger":`${settings.transition.stagger}s`,
    "--visual-surface-depth":String(settings.surface.depth/100),"--visual-edge-glow":String(settings.surface.edgeGlow/100),"--visual-hover-lift":`${settings.surface.hoverLift}px`,"--visual-surface-response":String(settings.surface.response/100),
  };
  return {...livingVariables,"--visual-accent":settings.accent,"--visual-accent-color":accentColor[settings.accent],"--visual-backdrop-enabled":settings.backdrop.enabled?"1":"0","--visual-primary-opacity":String(settings.backdrop.primaryOpacity/100),"--visual-primary-brightness":`${settings.backdrop.primaryBrightness}%`,"--visual-primary-saturation":`${settings.backdrop.primarySaturation}%`,"--visual-primary-contrast":`${settings.backdrop.primaryContrast}%`,"--visual-primary-filter":`brightness(${settings.backdrop.primaryBrightness}%) saturate(${settings.backdrop.primarySaturation}%) contrast(${settings.backdrop.primaryContrast}%)`,"--visual-video-opacity":String(settings.backdrop.videoOpacity/100),"--visual-video-filter":`brightness(${settings.backdrop.videoBrightness}%) contrast(${settings.backdrop.videoContrast}%) saturate(${settings.backdrop.videoSaturation}%) blur(${settings.backdrop.videoBlur}px)`,"--visual-video-fit":settings.backdrop.mediaFit==="source"?"contain":settings.backdrop.mediaFit,"--visual-ambient-opacity":String(settings.backdrop.ambientOpacity/100),"--visual-ambient-blur":`${settings.backdrop.ambientBlur}px`,"--visual-ambient-brightness":`${settings.backdrop.ambientBrightness}%`,"--visual-ambient-saturation":`${settings.backdrop.ambientSaturation}%`,"--visual-ambient-filter":`brightness(${settings.backdrop.ambientBrightness}%) saturate(${settings.backdrop.ambientSaturation}%)`,"--visual-overlay-opacity":String(settings.backdrop.overlayStrength/100),"--visual-backdrop-align":settings.backdrop.alignment==="left"?"18%":settings.backdrop.alignment==="right"?"82%":"50%","--visual-pan-intensity":settings.backdrop.panEnabled&&settings.backdrop.panDirection==="vertical"?String(settings.backdrop.panIntensity/100):"0","--visual-surface-opacity":String(settings.surface.opacity/100),"--visual-surface-rgb":settings.surface.mode==="dark"?"8 19 16":surfaceRgb[settings.surface.tint],"--visual-surface-blur":`${settings.surface.blur}px`,"--visual-border-opacity":String(settings.surface.borderStrength/100),"--visual-shadow-opacity":String(settings.surface.shadowStrength/100),"--visual-display-scale":scales[settings.typography.displayScale],"--visual-body-scale":body[settings.typography.bodyScale],"--visual-heading-weight":({regular:"400",medium:"500",semibold:"600",bold:"700"} as const)[settings.typography.headingWeight],"--visual-heading-style":settings.typography.italic?"italic":"normal","--visual-heading-line-height":lineHeight[settings.typography.lineHeight],"--visual-font-family":fontRole[settings.typography.fontRole],"--visual-ui-tracking":spacing[settings.typography.letterSpacing],"--visual-media-x":`${settings.media.focalX}%`,"--visual-media-y":`${settings.media.focalY}%`,...foregroundCssVariables(foreground),...Object.assign({},...textEffectTargets.map(target=>effectVariables(settings,target)))};
}
