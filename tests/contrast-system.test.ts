import {readFile} from "node:fs/promises";
import path from "node:path";
import {describe,expect,it} from "vitest";
import {baselineVisualConfig,resolveVisualSettings,visualConfigSchema,visualCssVariables} from "@/lib/visuals/config";
import {contrastRatio,readableForeground,resolveForegroundPalette,resolveSurfaceTone} from "@/lib/visuals/contrast";

function settings(){return structuredClone(baselineVisualConfig.global)}

describe("semantic foreground resolver",()=>{
  it("selects dark foreground for light and glass-light surfaces",()=>{
    const light=settings();light.surface.mode="light";
    expect(resolveSurfaceTone(light)).toBe("light");
    expect(resolveForegroundPalette(light).family).toBe("dark");
    const glass=settings();glass.surface.mode="glass";glass.surface.tint="ivory";
    expect(resolveSurfaceTone(glass)).toBe("glass-light");
    expect(resolveForegroundPalette(glass).primary).toBe("#081310");
  });

  it("selects light foreground for dark, glass-dark, and uncertain backdrop surfaces",()=>{
    const dark=settings();dark.surface.mode="dark";
    expect(resolveForegroundPalette(dark).family).toBe("light");
    const glass=settings();glass.surface.mode="glass";glass.surface.tint="ink";
    expect(resolveSurfaceTone(glass)).toBe("glass-dark");
    expect(resolveForegroundPalette(glass).primary).toBe("#f4f1e8");
    const backdrop=settings();backdrop.surface.mode="clear";backdrop.backdrop.enabled=true;
    expect(resolveSurfaceTone(backdrop)).toBe("backdrop-dark");
  });

  it("supports LIGHT, DARK, CUSTOM, and Auto Contrast off overrides",()=>{
    const value=settings();value.surface.mode="dark";
    value.foreground.mode="dark";
    expect(resolveForegroundPalette(value).family).toBe("dark");
    value.foreground.mode="light";
    expect(resolveForegroundPalette(value).family).toBe("light");
    value.foreground.mode="custom";value.foreground.customColor="#aabbcc";
    expect(resolveForegroundPalette(value).primary).toBe("#aabbcc");
    value.foreground.mode="auto";value.foreground.autoContrast=false;value.typography.textTone="dark";
    expect(resolveForegroundPalette(value).family).toBe("dark");
  });

  it("calculates WCAG contrast and chooses a readable CTA foreground",()=>{
    expect(contrastRatio("#f4f1e8","#081310")).toBeGreaterThan(4.5);
    expect(contrastRatio("#081310","#f4f1e8")).toBeGreaterThan(4.5);
    expect(readableForeground("#f4f1e8").color).toBe("#081310");
    expect(readableForeground("#081310").color).toBe("#f4f1e8");
  });

  it("keeps semantic Text FX colors inheritable across nested dark and light surfaces",()=>{
    const variables=visualCssVariables(settings());
    expect(variables["--visual-heading-color"]).toBeUndefined();
    expect(variables["--visual-body-color"]).toBeUndefined();
    expect(variables["--visual-cta-color"]).toBeUndefined();
    expect(variables["--fg-heading"]).toBe("#081310");
  });
});

describe("foreground persistence and bilingual parity",()=>{
  it("defaults legacy visual records to AUTO with the guard enabled",()=>{
    const legacy=structuredClone(baselineVisualConfig) as unknown as {global:Record<string,unknown>};
    delete legacy.global.foreground;
    const parsed=visualConfigSchema.parse(legacy);
    expect(parsed.global.foreground).toEqual({mode:"auto",autoContrast:true,customColor:"#f4f1e8"});
  });

  it("resolves identical contrast capability for EN and VI without locale-specific behavior",()=>{
    const config=structuredClone(baselineVisualConfig);
    config.pages.space={settings:{foreground:{mode:"light",autoContrast:true}},sections:{}};
    expect(resolveVisualSettings(config,"space","en").foreground).toEqual(resolveVisualSettings(config,"space","vi").foreground);
  });

  it("prevents essential muted roles from collapsing to disabled opacity",async()=>{
    const css=await readFile(path.join(process.cwd(),"src","app","foreground-system.css"),"utf8");
    expect(css).toContain("opacity: max(var(--visual-muted-opacity, 1), .68)");
    expect(css).toContain("--fg-muted: #bdcbc3");
    expect(css).toContain("--visual-cta-color: var(--fg-on-light)");
    expect(css).toContain(".visual-preview-copy h2");
    expect(css).toContain("color: var(--fg-heading)");
  });
});
