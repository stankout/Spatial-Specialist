import {describe,expect,it} from "vitest";
import {readFileSync} from "node:fs";
import {applyVisualPreset,baselineVisualConfig,resolveVisualSettings,textPresets,visualConfigSchema,visualCssVariables,visualPresets} from "@/lib/visuals/config";
import {visualPreviewAttributes} from "@/lib/visuals/preview";

describe("AC Living Visual Engine 3.0",()=>{
  it("migrates a valid V1 visual document that predates living motion",()=>{
    const legacy=structuredClone(baselineVisualConfig) as unknown as Record<string,unknown>;
    const global=legacy.global as Record<string,unknown>;
    delete global.motion;delete global.ambient;delete global.grid;delete global.transition;delete global.procedural;
    const surface=global.surface as Record<string,unknown>;
    delete surface.depth;delete surface.edgeGlow;delete surface.hoverLift;delete surface.response;
    const effects=global.textEffects as Record<string,Record<string,unknown>>;
    for(const effect of Object.values(effects)){delete effect.motion;delete effect.motionSpeed;delete effect.reveal}
    const parsed=visualConfigSchema.parse(legacy);
    expect(parsed.global.motion.theme).toBe("calm");
    expect(parsed.global.ambient.driftSpeed).toBe(58);
    expect(parsed.global.procedural.mode).toBe("page-default");
    expect(parsed.global.surface.hoverLift).toBe(3);
    expect(parsed.global.textEffects.heading.motion).toBe("none");
  });

  it("keeps semantic bounds strict and rejects unsafe motion values",()=>{
    const invalid=structuredClone(baselineVisualConfig);
    invalid.global.motion.speed=20;
    invalid.global.ambient.nodeDensity=100;
    invalid.global.grid.opacity=90;
    expect(()=>visualConfigSchema.parse(invalid)).toThrow();
  });

  it("resolves distinct public themes without forking the brand system",()=>{
    expect(resolveVisualSettings(baselineVisualConfig,"homepage").motion.theme).toBe("property-intelligence");
    expect(resolveVisualSettings(baselineVisualConfig,"deal").motion.theme).toBe("market-network");
    expect(resolveVisualSettings(baselineVisualConfig,"space").motion.theme).toBe("spatial-field");
    expect(resolveVisualSettings(baselineVisualConfig,"about").motion.theme).toBe("calm");
    expect(resolveVisualSettings(baselineVisualConfig,"search").motion.theme).toBe("editorial-archive");
  });

  it("preserves Global to Page to Locale to Section inheritance",()=>{
    const config=structuredClone(baselineVisualConfig);
    config.global.motion.intensity=10;
    config.pages.space={settings:{motion:{intensity:24}},sections:{analysis:{motion:{intensity:36}}}};
    config.locales.vi={space:{settings:{motion:{speed:.8}},sections:{analysis:{grid:{opacity:18}}}}};
    const settings=resolveVisualSettings(visualConfigSchema.parse(config),"space","vi","analysis");
    expect(settings.motion.intensity).toBe(36);
    expect(settings.motion.speed).toBe(.8);
    expect(settings.grid.opacity).toBe(18);
  });

  it("exposes deterministic CSS variables and preview attributes",()=>{
    const settings=resolveVisualSettings(baselineVisualConfig,"deal"),variables=visualCssVariables(settings),attributes=visualPreviewAttributes(settings);
    expect(variables["--visual-motion-intensity"]).toBe("0.38");
    expect(variables["--visual-grid-density"]).toBe("56px");
    expect(attributes["data-visual-motion-theme"]).toBe("market-network");
    expect(attributes["data-visual-scan"]).toBe("horizontal");
  });

  it("provides reusable owner presets including a complete motion-off state",()=>{
    expect(Object.keys(visualPresets)).toEqual(expect.arrayContaining(["cinematic-calm","property-intelligence","market-network","spatial-field","editorial-archive","hud-minimal","motion-off"]));
    const disabled=resolveVisualSettings(applyVisualPreset(baselineVisualConfig,"homepage","motion-off"),"homepage");
    expect(disabled.motion.enabled).toBe(false);
    expect(disabled.ambient.enabled).toBe(false);
    expect(disabled.grid.enabled).toBe(false);
    expect(textPresets.holographic.textEffects.heading?.motion).toBe("gradient-drift");
  });

  it("does not weaken Auto Contrast when motion is enabled",()=>{
    const settings=resolveVisualSettings(applyVisualPreset(baselineVisualConfig,"space","spatial-field"),"space");
    expect(settings.foreground.autoContrast).toBe(true);
    expect(settings.textEffects.heading.autoContrast).toBe("subtle");
  });

  it("ships reduced-motion, mobile, and print safety fallbacks",()=>{
    const css=readFileSync("src/app/living-visual-engine.css","utf8");
    expect(css).toContain("@media (prefers-reduced-motion:reduce)");
    expect(css).toContain("@media (max-width:700px)");
    expect(css).toContain("@media print");
    expect(css).toContain("pointer-events:none");
    expect(css).toContain("animation-timeline:view()");
  });
});
