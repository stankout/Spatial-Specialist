import {readFile} from "node:fs/promises";
import path from "node:path";
import {describe,expect,it} from "vitest";
import {backgroundVideoPolicy,isBackdropVideo,presentationModeForBackdrop,safePlaybackSpeed,shouldPauseBackdropVideo} from "@/lib/media/backdrop";
import {applyTextPreset,baselineVisualConfig,textGradientSchema,textPresets,visualConfigSchema,visualCssVariables} from "@/lib/visuals/config";

describe("Visual Director 2.1 text effects",()=>{
  it("validates safe gradients and rejects unsafe visual values",()=>{
    for(const gradient of ["none","mint-signal","aurora","holographic","cool-cyber","warm-signal","brass-deal","space-mint","crimson","monochrome-light"])expect(textGradientSchema.parse(gradient)).toBe(gradient);
    for(const mutate of [
      (config:typeof baselineVisualConfig)=>{config.global.textEffects.heading.color="url(javascript:alert(1))" as never},
      (config:typeof baselineVisualConfig)=>{config.global.textEffects.heading.strokeWidth=8},
      (config:typeof baselineVisualConfig)=>{config.global.textEffects.heading.glowRadius=100},
      (config:typeof baselineVisualConfig)=>{config.global.textEffects.heading.shadowX=80},
      (config:typeof baselineVisualConfig)=>{config.global.textEffects.heading.blendMode="difference" as never},
      (config:typeof baselineVisualConfig)=>{config.global.textEffects.heading.autoContrast="pixel-scan" as never},
    ]){const config=structuredClone(baselineVisualConfig);mutate(config);expect(visualConfigSchema.safeParse(config).success).toBe(false)}
  });

  it("applies every text preset without changing backdrop or media presentation",()=>{
    for(const preset of Object.keys(textPresets) as Array<keyof typeof textPresets>){
      const source=structuredClone(baselineVisualConfig),backdrop=structuredClone(source.global.backdrop),media=structuredClone(source.global.media),next=applyTextPreset(source,"space",preset);
      expect(next.global.backdrop).toEqual(backdrop);
      expect(next.global.media).toEqual(media);
      expect(source.pages.space).toBeUndefined();
      expect(next.pages.space?.settings.textEffects).toBeDefined();
    }
  });

  it("creates immediate CSS-variable changes for color, opacity, gradient, glow, stroke, and shadow",()=>{
    const settings=structuredClone(baselineVisualConfig.global),base=visualCssVariables(settings);
    settings.textEffects.heading={...settings.textEffects.heading,color:"#33ccaa",opacity:64,gradient:"aurora",strokeEnabled:true,strokeWidth:1,strokeOpacity:70,glowEnabled:true,glowIntensity:40,shadowEnabled:true,shadowOpacity:30};
    const changed=visualCssVariables(settings);
    expect(changed["--visual-heading-color"]).toBe("#33ccaa");
    expect(changed["--visual-heading-opacity"]).toBe("0.64");
    expect(changed["--visual-heading-gradient"]).toContain("linear-gradient");
    expect(changed["--visual-heading-stroke"]).not.toBe(base["--visual-heading-stroke"]);
    expect(changed["--visual-heading-shadow"]).toContain(",");
  });

  it("uses semantic auto contrast without overriding an explicit owner color",()=>{
    const settings=structuredClone(baselineVisualConfig.global);
    settings.surface.mode="dark";
    expect(visualCssVariables(settings)["--visual-heading-color"]).toBeUndefined();
    expect(visualCssVariables(settings)["--fg-heading"]).toBe("#f4f1e8");
    settings.textEffects.heading.color="#123456";
    expect(visualCssVariables(settings)["--visual-heading-color"]).toBe("#123456");
  });

  it("migrates the previous config shape through schema defaults",()=>{
    const legacy=structuredClone(baselineVisualConfig) as unknown as Record<string,unknown>;
    const global=legacy.global as Record<string,unknown>,typography=global.typography as Record<string,unknown>,backdrop=global.backdrop as Record<string,unknown>;
    delete global.textEffects;delete global.foreground;delete typography.fontRole;delete typography.italic;delete typography.lineHeight;delete backdrop.mediaType;delete backdrop.videoOpacity;delete backdrop.panEnabled;
    const parsed=visualConfigSchema.parse(legacy);
    expect(parsed.global.textEffects.heading.opacity).toBe(100);
    expect(parsed.global.typography.fontRole).toBe("modern");
    expect(parsed.global.backdrop.mediaType).toBe("auto");
    expect(parsed.global.foreground).toEqual({mode:"auto",autoContrast:true,customColor:"#f4f1e8"});
  });
});

describe("immersive backdrop policy",()=>{
  const video={mimeType:"video/mp4"} as const,image={mimeType:"image/webp"} as const;
  it("enforces muted inline looping autoplay for background video",()=>{expect(backgroundVideoPolicy).toEqual({muted:true,autoPlay:true,loop:true,playsInline:true})});
  it("selects stable video and 9:16 image modes deterministically",()=>{expect(isBackdropVideo(video)).toBe(true);expect(presentationModeForBackdrop(video)).toBe("scroll-pan-video");expect(presentationModeForBackdrop(image)).toBe("scroll-pan-image")});
  it("pauses motion when reduced motion is requested and allowlists playback speed",()=>{expect(shouldPauseBackdropVideo(true)).toBe(true);expect(safePlaybackSpeed(.75)).toBe(.75);expect(safePlaybackSpeed(3)).toBe(1)});
});

describe("Vietnamese typography and public markers",()=>{
  it("keeps normal and italic Vietnamese-capable font files in one whole-string stack",async()=>{const css=await readFile(path.join(process.cwd(),"src","app","art-direction.css"),"utf8");for(const font of ["exo2-vietnamese.woff2","exo2-italic-vietnamese.woff2","montserrat-vietnamese.woff2","montserrat-italic-vietnamese.woff2"])expect(css).toContain(font);expect(css).toContain('html[lang="vi"] .visual-page-scope{--visual-font-family:var(--font-exo-2),var(--font-montserrat),Arial,sans-serif!important}')});
  it("uses semantic public service markers instead of legacy three-service counts",async()=>{const files=await Promise.all(["cards.tsx","lead-form.tsx","real-estate-hub.tsx","spatial-consultation-hub.tsx"].map(file=>readFile(path.join(process.cwd(),"src","components",file),"utf8")));const publicSource=files.join("\n");expect(publicSource).not.toMatch(/0[123]\s*\/\s*03/);expect(publicSource).not.toContain("service.number")});
});
