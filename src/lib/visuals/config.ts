import {z} from "zod";

export const visualPageKeys=["homepage","deal","condition","space","videos","guides","contact","booking","footer"] as const;
export const visualPageKeySchema=z.enum(visualPageKeys);
export type VisualPageKey=z.infer<typeof visualPageKeySchema>;

const percent=z.number().min(0).max(100);
const blur=z.number().min(0).max(48);

export const backdropSchema=z.object({
  enabled:z.boolean(),
  primaryOpacity:percent,
  primaryBrightness:z.number().min(40).max(160),
  primarySaturation:z.number().min(0).max(180),
  primaryContrast:z.number().min(50).max(160),
  ambientOpacity:percent,
  ambientBlur:blur,
  ambientBrightness:z.number().min(20).max(120),
  ambientSaturation:z.number().min(0).max(160),
  overlayStrength:percent,
  alignment:z.enum(["left","center","right"]),
  panIntensity:z.number().min(0).max(100),
}).strict();

export const surfaceSchema=z.object({
  mode:z.enum(["clear","soft","light","dark","glass"]),
  opacity:percent,
  blur:blur,
  borderStrength:percent,
  tint:z.enum(["neutral","ivory","mint","sage","ink"]),
  shadowStrength:percent,
}).strict();

export const typographySchema=z.object({
  displayScale:z.enum(["compact","standard","expressive"]),
  bodyScale:z.enum(["compact","standard","generous"]),
  headingWeight:z.enum(["medium","semibold"]),
  letterSpacing:z.enum(["tight","standard","technical"]),
  textTone:z.enum(["auto","light","dark"]),
}).strict();

export const mediaPresentationSchema=z.object({
  fit:z.enum(["source","contain","portrait-frame","editorial-frame","background"]),
  focalX:percent,
  focalY:percent,
  frame:z.enum(["none","hairline","glass","dark"]),
  cornerStyle:z.enum(["square","subtle"]),
}).strict();

export const footerVisualSchema=z.object({
  surface:z.enum(["solid-dark","glass-dark","transparent-dark"]),
  alignment:z.enum(["split","center"]),
  accent:z.enum(["mint","brass","sage","neutral"]),
  typeStyle:z.enum(["technical","editorial"]),
  dividerStrength:percent,
  panelOpacity:percent,
  blur:blur,
}).strict();

export const visualSettingsSchema=z.object({
  accent:z.enum(["mint","brass","sage","neutral","service-default"]),
  backdrop:backdropSchema,
  surface:surfaceSchema,
  typography:typographySchema,
  media:mediaPresentationSchema,
  footer:footerVisualSchema,
}).strict();
export type VisualSettings=z.infer<typeof visualSettingsSchema>;

export const visualSettingsOverrideSchema=z.object({
  accent:visualSettingsSchema.shape.accent.optional(),
  backdrop:backdropSchema.partial().strict().optional(),
  surface:surfaceSchema.partial().strict().optional(),
  typography:typographySchema.partial().strict().optional(),
  media:mediaPresentationSchema.partial().strict().optional(),
  footer:footerVisualSchema.partial().strict().optional(),
}).strict();
export type VisualSettingsOverride=z.infer<typeof visualSettingsOverrideSchema>;

export const visualSections:Record<VisualPageKey,readonly string[]>={
  homepage:["hero","services","featured","clarity","perspective","guides","cta"],
  deal:["hero","pathways","property-media","market-context","service-area","resources","cta"],
  condition:["hero","process","systems","report","defect-library","standards","credentials","faq","cta"],
  space:["hero","pathways","methodology","analysis","selection","interpretation","cta"],
  videos:["hero","library"],
  guides:["hero","library"],
  contact:["hero","form"],
  booking:["hero","form"],
  footer:["footer"],
};

const pageOverrideSchema=z.object({
  settings:visualSettingsOverrideSchema.default({}),
  sections:z.record(z.string(),visualSettingsOverrideSchema).default({}),
}).strict();
export type VisualPageOverride=z.infer<typeof pageOverrideSchema>;

const pagesSchema=z.partialRecord(visualPageKeySchema,pageOverrideSchema);
export const visualConfigSchema=z.object({
  version:z.literal(1),
  global:visualSettingsSchema,
  pages:pagesSchema,
  locales:z.object({en:pagesSchema.optional(),vi:pagesSchema.optional()}).strict().default({}),
}).strict().superRefine((value,ctx)=>{
  const inspect=(pages:z.infer<typeof pagesSchema>,prefix:(string|number)[])=>{
    for(const [page,override] of Object.entries(pages)){
      const allowed=visualSections[page as VisualPageKey]??[];
      for(const section of Object.keys(override?.sections??{}))if(!allowed.includes(section))ctx.addIssue({code:"custom",message:`Unknown visual section: ${page}.${section}`,path:[...prefix,page,"sections",section]});
    }
  };
  inspect(value.pages,["pages"]);
  if(value.locales.en)inspect(value.locales.en,["locales","en"]);
  if(value.locales.vi)inspect(value.locales.vi,["locales","vi"]);
});
export type VisualConfig=z.infer<typeof visualConfigSchema>;

export const baselineVisualSettings:VisualSettings={
  accent:"service-default",
  backdrop:{enabled:true,primaryOpacity:100,primaryBrightness:100,primarySaturation:100,primaryContrast:100,ambientOpacity:100,ambientBlur:30,ambientBrightness:58,ambientSaturation:72,overlayStrength:0,alignment:"center",panIntensity:100},
  surface:{mode:"glass",opacity:76,blur:16,borderStrength:22,tint:"ivory",shadowStrength:0},
  typography:{displayScale:"standard",bodyScale:"standard",headingWeight:"medium",letterSpacing:"standard",textTone:"auto"},
  media:{fit:"source",focalX:50,focalY:50,frame:"none",cornerStyle:"square"},
  footer:{surface:"solid-dark",alignment:"split",accent:"mint",typeStyle:"technical",dividerStrength:30,panelOpacity:3,blur:0},
};

export const baselineVisualConfig:VisualConfig={version:1,global:baselineVisualSettings,pages:{},locales:{}};

const serviceAccents:Partial<Record<VisualPageKey,VisualSettings["accent"]>>={deal:"brass",condition:"sage",space:"mint"};

function mergeSettings(base:VisualSettings,override?:VisualSettingsOverride):VisualSettings{
  if(!override)return structuredClone(base);
  return {
    accent:override.accent??base.accent,
    backdrop:{...base.backdrop,...override.backdrop},
    surface:{...base.surface,...override.surface},
    typography:{...base.typography,...override.typography},
    media:{...base.media,...override.media},
    footer:{...base.footer,...override.footer},
  };
}

export function resolveVisualSettings(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi"="en",section?:string):VisualSettings{
  const pageOverride=config.pages[page];
  const localeOverride=config.locales[locale]?.[page];
  let result=mergeSettings(config.global,{accent:serviceAccents[page]??config.global.accent});
  result=mergeSettings(result,pageOverride?.settings);
  result=mergeSettings(result,localeOverride?.settings);
  if(section){result=mergeSettings(result,pageOverride?.sections[section]);result=mergeSettings(result,localeOverride?.sections[section]);}
  return result;
}

export const visualPresets={
  "editorial-clear":{surface:{mode:"clear",opacity:0,blur:0,borderStrength:16,tint:"neutral",shadowStrength:0},typography:{displayScale:"expressive",bodyScale:"standard",headingWeight:"medium",letterSpacing:"tight",textTone:"auto"}},
  "cyber-glass":{surface:{mode:"glass",opacity:76,blur:16,borderStrength:22,tint:"ivory",shadowStrength:0},typography:{displayScale:"standard",bodyScale:"standard",headingWeight:"medium",letterSpacing:"technical",textTone:"auto"}},
  "immersive-backdrop":{backdrop:{enabled:true,primaryOpacity:100,primaryBrightness:92,primarySaturation:92,primaryContrast:108,ambientOpacity:100,ambientBlur:30,ambientBrightness:48,ambientSaturation:68,overlayStrength:12,alignment:"center",panIntensity:100},surface:{mode:"glass",opacity:62,blur:14,borderStrength:18,tint:"ink",shadowStrength:8}},
  "high-contrast":{surface:{mode:"dark",opacity:94,blur:0,borderStrength:34,tint:"ink",shadowStrength:0},typography:{displayScale:"standard",bodyScale:"standard",headingWeight:"semibold",letterSpacing:"standard",textTone:"light"}},
  "service-default":{},
} as const satisfies Record<string,VisualSettingsOverride>;
export type VisualPresetKey=keyof typeof visualPresets;

export function applyVisualPreset(config:VisualConfig,page:VisualPageKey,preset:VisualPresetKey):VisualConfig{
  const next=structuredClone(config);
  const current=next.pages[page]??{settings:{},sections:{}};
  current.settings={...current.settings,...structuredClone(visualPresets[preset])};
  next.pages[page]=current;
  return visualConfigSchema.parse(next);
}
export function applyGlobalVisualPreset(config:VisualConfig,preset:VisualPresetKey):VisualConfig{const next=structuredClone(config);next.global=mergeSettings(next.global,visualPresets[preset]);return visualConfigSchema.parse(next)}

export function resetVisualPage(config:VisualConfig,page:VisualPageKey):VisualConfig{const next=structuredClone(config);delete next.pages[page];delete next.locales.en?.[page];delete next.locales.vi?.[page];return visualConfigSchema.parse(next)}
export function resetVisualSection(config:VisualConfig,page:VisualPageKey,section:string):VisualConfig{const next=structuredClone(config);delete next.pages[page]?.sections[section];delete next.locales.en?.[page]?.sections[section];delete next.locales.vi?.[page]?.sections[section];return visualConfigSchema.parse(next)}
export function publishVisualSnapshot(draft:VisualConfig):VisualConfig{return visualConfigSchema.parse(structuredClone(draft))}

export function clampVisualNumber(value:number,min:number,max:number){return Math.min(max,Math.max(min,Number.isFinite(value)?value:min))}

export function visualCssVariables(settings:VisualSettings):Record<string,string>{
  const scales={compact:".92",standard:"1",expressive:"1.1"} as const,body={compact:".94",standard:"1",generous:"1.06"} as const,spacing={tight:"-.025em",standard:"0em",technical:".035em"} as const;
  const surfaceRgb={neutral:"232 230 222",ivory:"244 241 232",mint:"176 215 197",sage:"154 178 162",ink:"8 19 16"} as const,accentColor={mint:"#91d6bb",brass:"#b79964",sage:"#9ab2a2",neutral:"#d7d3c9","service-default":"#91d6bb"} as const;
  return {
    "--visual-accent":settings.accent,
    "--visual-accent-color":accentColor[settings.accent],
    "--visual-backdrop-enabled":settings.backdrop.enabled?"1":"0",
    "--visual-primary-opacity":String(settings.backdrop.primaryOpacity/100),
    "--visual-primary-brightness":`${settings.backdrop.primaryBrightness}%`,
    "--visual-primary-saturation":`${settings.backdrop.primarySaturation}%`,
    "--visual-primary-contrast":`${settings.backdrop.primaryContrast}%`,
    "--visual-primary-filter":`brightness(${settings.backdrop.primaryBrightness}%) saturate(${settings.backdrop.primarySaturation}%) contrast(${settings.backdrop.primaryContrast}%)`,
    "--visual-ambient-opacity":String(settings.backdrop.ambientOpacity/100),
    "--visual-ambient-blur":`${settings.backdrop.ambientBlur}px`,
    "--visual-ambient-brightness":`${settings.backdrop.ambientBrightness}%`,
    "--visual-ambient-saturation":`${settings.backdrop.ambientSaturation}%`,
    "--visual-ambient-filter":`brightness(${settings.backdrop.ambientBrightness}%) saturate(${settings.backdrop.ambientSaturation}%)`,
    "--visual-overlay-opacity":String(settings.backdrop.overlayStrength/100),
    "--visual-backdrop-align":settings.backdrop.alignment==="left"?"18%":settings.backdrop.alignment==="right"?"82%":"50%",
    "--visual-pan-intensity":String(settings.backdrop.panIntensity/100),
    "--visual-surface-opacity":String(settings.surface.opacity/100),
    "--visual-surface-rgb":settings.surface.mode==="dark"?"8 19 16":surfaceRgb[settings.surface.tint],
    "--visual-surface-blur":`${settings.surface.blur}px`,
    "--visual-border-opacity":String(settings.surface.borderStrength/100),
    "--visual-shadow-opacity":String(settings.surface.shadowStrength/100),
    "--visual-display-scale":scales[settings.typography.displayScale],
    "--visual-body-scale":body[settings.typography.bodyScale],
    "--visual-heading-weight":settings.typography.headingWeight==="semibold"?"600":"400",
    "--visual-ui-tracking":spacing[settings.typography.letterSpacing],
    "--visual-media-x":`${settings.media.focalX}%`,
    "--visual-media-y":`${settings.media.focalY}%`,
  };
}
