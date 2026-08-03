import type {CSSProperties,ReactNode} from "react";
import {VisualPreviewBridge} from "@/components/visual-preview-bridge";
import {LivingVisualEnvironment} from "@/components/living-visual-environment";
import {resolveVisualSettings,visualCssVariables,type VisualConfig,type VisualPageKey} from "@/lib/visuals/config";
import {hasCustomVisualSurface,hasCustomVisualTypography,visualPreviewAttributes,visualSectionCss} from "@/lib/visuals/preview";
import {getDraftVisualConfig,getPublicVisualConfig} from "@/lib/visuals/storage";

type VariableStyle=CSSProperties&Record<`--${string}`,string>;

export async function VisualPage({page,locale,preview=false,children}:{page:VisualPageKey;locale:"en"|"vi";preview?:boolean;children:ReactNode}){
  const config=preview&&process.env.NODE_ENV!=="production"?await getDraftVisualConfig():await getPublicVisualConfig();
  return <VisualPageScope config={config} page={page} locale={locale} livePreview={preview&&process.env.NODE_ENV!=="production"}>{children}</VisualPageScope>
}

export function VisualPageScope({config,page,locale,livePreview=false,children}:{config:VisualConfig;page:VisualPageKey;locale:"en"|"vi";livePreview?:boolean;children:ReactNode}){
  const settings=resolveVisualSettings(config,page,locale),style=visualCssVariables(settings) as VariableStyle,customSurface=hasCustomVisualSurface(config,page,locale),customTypography=hasCustomVisualTypography(config,page,locale),sectionCss=visualSectionCss(config,page,locale),attributes=visualPreviewAttributes(settings);
  return <div className="visual-page-scope" data-visual-page={page} {...attributes} data-visual-custom-surface={customSurface} data-visual-custom-type={customTypography} style={style}>{sectionCss&&<style data-visual-section-rules>{sectionCss}</style>}{livePreview&&<VisualPreviewBridge page={page} locale={locale}/>}<LivingVisualEnvironment page={page} sceneId={settings.procedural.mode==="off"?null:settings.procedural.sceneId} intensity={settings.procedural.intensity} motionSpeed={settings.procedural.motionSpeed}/>{children}</div>
}
