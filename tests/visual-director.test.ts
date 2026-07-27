import {describe,expect,it} from "vitest";
import {applyGlobalVisualPreset,applyVisualPreset,baselineVisualConfig,baselineVisualSettings,clampVisualNumber,publishVisualSnapshot,resetVisualPage,resetVisualSection,resolveVisualSettings,visualConfigSchema,visualCssVariables} from "@/lib/visuals/config";
import {acceptPublishedVisuals,acceptSavedDraft,countVisualChanges,createVisualEditorState,setWorkingVisualConfig} from "@/lib/visuals/editor-state";
import {createVisualPreviewMessage,createVisualPreviewReadyMessage,visualPreviewModel,visualPreviewMessageSchema,visualPreviewReadyMessageSchema} from "@/lib/visuals/preview";

describe("Studio Visual Director",()=>{
  it("keeps Baseline V1 deterministic when no override exists",()=>{
    expect(resolveVisualSettings(baselineVisualConfig,"homepage","en")).toEqual(baselineVisualSettings);
    expect(visualCssVariables(resolveVisualSettings(baselineVisualConfig,"homepage","en"))["--visual-ambient-blur"]).toBe("30px");
  });

  it("inherits global, page, section, then locale values",()=>{
    const config=structuredClone(baselineVisualConfig);
    config.global.surface.opacity=70;
    config.pages.space={settings:{surface:{opacity:62}},sections:{analysis:{surface:{opacity:44}}}};
    config.locales.vi={space:{settings:{typography:{bodyScale:"generous"}},sections:{analysis:{accent:"sage"}}}};
    const result=resolveVisualSettings(visualConfigSchema.parse(config),"space","vi","analysis");
    expect(result.surface.opacity).toBe(44);
    expect(result.typography.bodyScale).toBe("generous");
    expect(result.accent).toBe("sage");
  });

  it("falls back to shared settings when Vietnamese has no override",()=>{
    const config=structuredClone(baselineVisualConfig);
    config.pages.deal={settings:{typography:{displayScale:"expressive"}},sections:{}};
    expect(resolveVisualSettings(visualConfigSchema.parse(config),"deal","vi").typography.displayScale).toBe("expressive");
  });

  it("clamps numeric input and rejects persisted out-of-range values",()=>{
    expect(clampVisualNumber(200,0,100)).toBe(100);
    expect(clampVisualNumber(-5,0,100)).toBe(0);
    const invalid=structuredClone(baselineVisualConfig);
    invalid.global.backdrop.primaryOpacity=101;
    expect(()=>visualConfigSchema.parse(invalid)).toThrow();
  });

  it("rejects CSS, script, URL, class, and unknown section injection",()=>{
    for(const payload of [
      {...baselineVisualConfig,global:{...baselineVisualSettings,accent:"url(javascript:alert(1))"}},
      {...baselineVisualConfig,global:{...baselineVisualSettings,rawCss:"body{display:none}"}},
      {...baselineVisualConfig,pages:{space:{settings:{surface:{mode:"<script>alert(1)</script>"}},sections:{}}}},
      {...baselineVisualConfig,pages:{space:{settings:{},sections:{"hero body.dark":{accent:"mint"}}}}},
    ])expect(()=>visualConfigSchema.parse(payload)).toThrow();
  });

  it("applies presets without mutating the source and supports page reset",()=>{
    const preset=applyVisualPreset(baselineVisualConfig,"condition","high-contrast");
    expect(resolveVisualSettings(preset,"condition").surface.mode).toBe("dark");
    expect(baselineVisualConfig.pages.condition).toBeUndefined();
    expect(resetVisualPage(preset,"condition").pages.condition).toBeUndefined();
  });

  it("applies a global preset as the inherited default",()=>{
    const config=applyGlobalVisualPreset(baselineVisualConfig,"high-contrast");
    expect(config.global.surface.mode).toBe("dark");
    expect(resolveVisualSettings(config,"homepage").typography.headingWeight).toBe("semibold");
  });

  it("resets one section without removing the page override",()=>{
    const config=structuredClone(baselineVisualConfig);
    config.pages.deal={settings:{accent:"brass"},sections:{hero:{surface:{opacity:40}},cta:{surface:{opacity:80}}}};
    const reset=resetVisualSection(visualConfigSchema.parse(config),"deal","hero");
    expect(reset.pages.deal?.settings.accent).toBe("brass");
    expect(reset.pages.deal?.sections.hero).toBeUndefined();
    expect(reset.pages.deal?.sections.cta).toBeDefined();
  });

  it("publishes an isolated validated snapshot",()=>{
    const draft=applyVisualPreset(baselineVisualConfig,"homepage","editorial-clear"),published=publishVisualSnapshot(draft);
    draft.pages.homepage!.settings.accent="mint";
    expect(published.pages.homepage?.settings.accent).toBeUndefined();
  });

  it("creates visibly different preview variables for strong backdrop values",()=>{
    const quiet=structuredClone(baselineVisualConfig),strong=structuredClone(baselineVisualConfig);
    quiet.global.backdrop={...quiet.global.backdrop,enabled:false,primaryOpacity:20,primaryBrightness:70,primarySaturation:30,primaryContrast:60,ambientOpacity:25,ambientBlur:0,ambientBrightness:25,ambientSaturation:20,overlayStrength:0,alignment:"left",panIntensity:0};
    quiet.global.surface={...quiet.global.surface,opacity:20,blur:0,borderStrength:0};
    strong.global.backdrop={...strong.global.backdrop,enabled:true,primaryOpacity:100,primaryBrightness:130,primarySaturation:170,primaryContrast:150,ambientOpacity:100,ambientBlur:48,ambientBrightness:110,ambientSaturation:150,overlayStrength:70,alignment:"right",panIntensity:100};
    strong.global.surface={...strong.global.surface,opacity:90,blur:40,borderStrength:90};
    const quietModel=visualPreviewModel(visualConfigSchema.parse(quiet),"homepage","en"),strongModel=visualPreviewModel(visualConfigSchema.parse(strong),"homepage","en");
    expect(quietModel.variables["--visual-backdrop-enabled"]).toBe("0");
    expect(strongModel.variables["--visual-backdrop-enabled"]).toBe("1");
    expect(quietModel.variables["--visual-primary-opacity"]).not.toBe(strongModel.variables["--visual-primary-opacity"]);
    expect(quietModel.variables["--visual-ambient-opacity"]).not.toBe(strongModel.variables["--visual-ambient-opacity"]);
    expect(quietModel.variables["--visual-overlay-opacity"]).not.toBe(strongModel.variables["--visual-overlay-opacity"]);
    expect(quietModel.variables["--visual-primary-brightness"]).toBe("70%");
    expect(strongModel.variables["--visual-primary-brightness"]).toBe("130%");
    expect(quietModel.variables["--visual-ambient-blur"]).toBe("0px");
    expect(strongModel.variables["--visual-ambient-blur"]).toBe("48px");
    expect(quietModel.variables["--visual-surface-opacity"]).toBe("0.2");
    expect(strongModel.variables["--visual-surface-opacity"]).toBe("0.9");
    expect(quietModel.variables["--visual-backdrop-align"]).toBe("18%");
    expect(strongModel.variables["--visual-backdrop-align"]).toBe("82%");
  });

  it("keeps published, saved, working, and preview state boundaries explicit",()=>{
    const initial=createVisualEditorState(baselineVisualConfig,baselineVisualConfig,null,null),working=applyVisualPreset(baselineVisualConfig,"space","immersive-backdrop"),stateA=setWorkingVisualConfig(initial,working);
    expect(stateA.previewConfig).toEqual(working);
    expect(stateA.savedDraftConfig).toEqual(baselineVisualConfig);
    expect(stateA.publishedConfig).toEqual(baselineVisualConfig);
    expect(countVisualChanges(stateA.workingVisualConfig,stateA.savedDraftConfig)).toBeGreaterThan(0);
    const stateB=acceptSavedDraft(stateA,working,"2026-07-26T12:00:00.000Z");
    expect(stateB.savedDraftConfig).toEqual(working);
    expect(stateB.publishedConfig).toEqual(baselineVisualConfig);
    expect(countVisualChanges(stateB.workingVisualConfig,stateB.savedDraftConfig)).toBe(0);
    const stateC=acceptPublishedVisuals(stateB,working,"2026-07-26T12:01:00.000Z","2026-07-26T12:01:00.000Z");
    expect(stateC.publishedConfig).toEqual(working);
    expect(stateC.savedDraftConfig).toEqual(working);
    expect(stateC.previewConfig).toEqual(working);
  });

  it("uses a validated same-origin bridge payload shape for full-page preview",()=>{
    const message=createVisualPreviewMessage(baselineVisualConfig,"deal","vi");
    expect(visualPreviewMessageSchema.parse(message)).toMatchObject({type:"ac-visual-preview",page:"deal",locale:"vi"});
    expect(()=>visualPreviewMessageSchema.parse({...message,page:"../../api"})).toThrow();
    expect(visualPreviewReadyMessageSchema.parse(createVisualPreviewReadyMessage("deal","vi"))).toEqual({type:"ac-visual-preview-ready",page:"deal",locale:"vi"});
  });
});
