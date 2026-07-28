"use client";

import {useEffect} from "react";
import {resolveVisualSettings,visualCssVariables,type VisualPageKey} from "@/lib/visuals/config";
import {createVisualPreviewReadyMessage,hasCustomVisualSurface,hasCustomVisualTypography,visualPreviewAttributes,visualPreviewMessageSchema,visualSectionCss} from "@/lib/visuals/preview";

export function VisualPreviewBridge({page,locale}:{page:VisualPageKey;locale:"en"|"vi"}){
  useEffect(()=>{
    if(process.env.NODE_ENV==="production")return;
    const receive=(event:MessageEvent<unknown>)=>{
      if(event.origin!==window.location.origin)return;
      const parsed=visualPreviewMessageSchema.safeParse(event.data);
      if(!parsed.success||parsed.data.page!==page||parsed.data.locale!==locale)return;
      const root=document.querySelector<HTMLElement>(`[data-visual-page="${page}"]`);if(!root)return;
      const settings=resolveVisualSettings(parsed.data.config,page,locale),variables=visualCssVariables(settings),attributes=visualPreviewAttributes(settings);
      for(const property of Array.from(root.style))if(property.startsWith("--visual-")||property.startsWith("--fg-"))root.style.removeProperty(property);
      for(const [key,value] of Object.entries(variables))root.style.setProperty(key,value);
      for(const [key,value] of Object.entries(attributes))root.setAttribute(key,value);
      root.dataset.visualCustomSurface=String(hasCustomVisualSurface(parsed.data.config,page,locale));
      root.dataset.visualCustomType=String(hasCustomVisualTypography(parsed.data.config,page,locale));
      const style=root.querySelector<HTMLStyleElement>("style[data-visual-section-rules]");if(style)style.textContent=visualSectionCss(parsed.data.config,page,locale);
      root.dataset.visualLivePreview="true";
    };
    window.addEventListener("message",receive);
    window.parent.postMessage(createVisualPreviewReadyMessage(page,locale),window.location.origin);
    return()=>window.removeEventListener("message",receive);
  },[locale,page]);
  return null;
}
