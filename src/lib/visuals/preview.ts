import {z} from "zod";
import {baselineVisualSettings,resolveVisualSettings,visualConfigSchema,visualCssVariables,visualSections,type VisualConfig,type VisualPageKey,type VisualSettings} from "@/lib/visuals/config";

export const visualPreviewMessageSchema=z.object({
  type:z.literal("ac-visual-preview"),
  config:visualConfigSchema,
  page:z.enum(["homepage","deal","condition","space","videos","guides","contact","booking","footer"]),
  locale:z.enum(["en","vi"]),
}).strict();
export type VisualPreviewMessage=z.infer<typeof visualPreviewMessageSchema>;

export const visualPreviewReadyMessageSchema=z.object({
  type:z.literal("ac-visual-preview-ready"),
  page:z.enum(["homepage","deal","condition","space","videos","guides","contact","booking","footer"]),
  locale:z.enum(["en","vi"]),
}).strict();

export function createVisualPreviewMessage(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi"):VisualPreviewMessage{return visualPreviewMessageSchema.parse({type:"ac-visual-preview",config,page,locale})}
export function createVisualPreviewReadyMessage(page:VisualPageKey,locale:"en"|"vi"){return visualPreviewReadyMessageSchema.parse({type:"ac-visual-preview-ready",page,locale})}

export function visualPreviewAttributes(settings:VisualSettings){
  return {
    "data-visual-accent":settings.accent,
    "data-visual-surface":settings.surface.mode,
    "data-visual-text":settings.typography.textTone,
    "data-visual-display":settings.typography.displayScale,
    "data-visual-body":settings.typography.bodyScale,
    "data-visual-spacing":settings.typography.letterSpacing,
    "data-visual-media":settings.media.fit,
    "data-visual-frame":settings.media.frame,
    "data-visual-backdrop-enabled":String(settings.backdrop.enabled),
    "data-visual-alignment":settings.backdrop.alignment,
  } as const;
}

export function visualSectionCss(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi"){
  return visualSections[page].map(section=>{
    const sectionSettings=resolveVisualSettings(config,page,locale,section),variables=visualCssVariables(sectionSettings),shared=config.pages[page]?.sections[section],localized=config.locales[locale]?.[page]?.sections[section],hasSurface=Boolean(shared?.surface||localized?.surface),surface=hasSurface?`background:rgb(${variables["--visual-surface-rgb"]} / ${variables["--visual-surface-opacity"]});backdrop-filter:blur(${variables["--visual-surface-blur"]});color:${sectionSettings.typography.textTone==="light"||sectionSettings.surface.mode==="dark"?"#f4f1e8":sectionSettings.typography.textTone==="dark"?"#081310":"inherit"};`:"";
    return `[data-visual-page="${page}"] [data-visual-section="${section}"]{${Object.entries(variables).map(([key,value])=>`${key}:${value}`).join(";")};${surface}}`;
  }).join("");
}

export function visualPreviewModel(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi",section?:string){
  const settings=resolveVisualSettings(config,page,locale,section);
  return {settings,variables:visualCssVariables(settings),attributes:visualPreviewAttributes(settings)};
}

export function hasCustomVisualSurface(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi"){return Boolean(config.pages[page]?.settings.surface||config.locales[locale]?.[page]?.settings.surface||JSON.stringify(config.global.surface)!==JSON.stringify(baselineVisualSettings.surface))}
export function hasCustomVisualTypography(config:VisualConfig,page:VisualPageKey,locale:"en"|"vi"){return Boolean(config.pages[page]?.settings.typography||config.locales[locale]?.[page]?.settings.typography||JSON.stringify(config.global.typography)!==JSON.stringify(baselineVisualSettings.typography))}
