export const foregroundColors = {
  ink: "#081310",
  inkSecondary: "#263b34",
  inkMuted: "#4d6159",
  inkSubtle: "#62756d",
  ivory: "#f4f1e8",
  ivorySecondary: "#dce5df",
  ivoryMuted: "#bdcbc3",
  ivorySubtle: "#9fb2a8",
  mint: "#91d6bb",
  brass: "#b79964",
} as const;

export type SurfaceTone =
  | "light"
  | "dark"
  | "glass-light"
  | "glass-dark"
  | "backdrop-light"
  | "backdrop-dark"
  | "accent"
  | "auto";

export type ForegroundMode = "auto" | "light" | "dark" | "custom";

export type ContrastSettings = {
  surface: {
    mode: "clear" | "soft" | "light" | "dark" | "glass";
    tint: "neutral" | "ivory" | "mint" | "sage" | "ink";
  };
  backdrop: {
    enabled: boolean;
    primaryBrightness: number;
    overlayStrength: number;
  };
  typography: { textTone: "auto" | "light" | "dark" };
  foreground?: {
    mode: ForegroundMode;
    autoContrast: boolean;
    customColor: string;
  };
};

export type ForegroundPalette = {
  family: "dark" | "light" | "custom";
  surfaceTone: SurfaceTone;
  primary: string;
  secondary: string;
  muted: string;
  subtle: string;
  accent: string;
  heading: string;
  label: string;
  link: string;
  icon: string;
  border: string;
  button: string;
  buttonMuted: string;
  onLight: string;
  onDark: string;
};

function expandHex(hex: string) {
  const value = hex.replace("#", "");
  return value.length === 3
    ? value
        .split("")
        .map((part) => `${part}${part}`)
        .join("")
    : value;
}

export function relativeLuminance(hex: string) {
  const value = expandHex(hex);
  if (!/^[0-9a-f]{6}$/i.test(value)) return 0;
  const channels = [0, 2, 4].map((offset) => {
    const channel = Number.parseInt(value.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

export function contrastRatio(first: string, second: string) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function readableForeground(
  background: string,
  dark = foregroundColors.ink,
  light = foregroundColors.ivory,
) {
  const darkRatio = contrastRatio(background, dark);
  const lightRatio = contrastRatio(background, light);
  return darkRatio >= lightRatio
    ? { color: dark, ratio: darkRatio }
    : { color: light, ratio: lightRatio };
}

export function resolveSurfaceTone(settings: ContrastSettings): SurfaceTone {
  if (settings.surface.mode === "dark") return "dark";
  if (settings.surface.mode === "light" || settings.surface.mode === "soft") {
    return "light";
  }
  if (settings.surface.mode === "glass") {
    return settings.surface.tint === "ink" ? "glass-dark" : "glass-light";
  }
  if (settings.backdrop.enabled) {
    // Media luminance is intentionally not sampled frame-by-frame. A clear surface
    // over media receives the safe dark-backdrop family and a CSS readability scrim.
    return "backdrop-dark";
  }
  return "light";
}

function automaticFamily(tone: SurfaceTone): "dark" | "light" {
  return tone === "dark" || tone === "glass-dark" || tone === "backdrop-dark"
    ? "light"
    : "dark";
}

export function resolveForegroundPalette(
  settings: ContrastSettings,
  toneOverride: SurfaceTone = "auto",
): ForegroundPalette {
  const foreground = settings.foreground ?? {
    mode: "auto" as const,
    autoContrast: true,
    customColor: foregroundColors.ivory,
  };
  const surfaceTone = toneOverride === "auto" ? resolveSurfaceTone(settings) : toneOverride;
  const legacyFamily =
    settings.typography.textTone === "light"
      ? "light"
      : settings.typography.textTone === "dark"
        ? "dark"
        : automaticFamily(surfaceTone);
  const family =
    foreground.mode === "custom"
      ? "custom"
      : foreground.mode === "light"
        ? "light"
        : foreground.mode === "dark"
          ? "dark"
          : foreground.autoContrast
            ? automaticFamily(surfaceTone)
            : legacyFamily;

  if (family === "custom") {
    const custom = foreground.customColor;
    return {
      family,
      surfaceTone,
      primary: custom,
      secondary: `color-mix(in srgb, ${custom} 88%, transparent)`,
      muted: `color-mix(in srgb, ${custom} 76%, transparent)`,
      subtle: `color-mix(in srgb, ${custom} 66%, transparent)`,
      accent: custom,
      heading: custom,
      label: `color-mix(in srgb, ${custom} 86%, transparent)`,
      link: custom,
      icon: custom,
      border: `color-mix(in srgb, ${custom} 34%, transparent)`,
      button: custom,
      buttonMuted: `color-mix(in srgb, ${custom} 82%, transparent)`,
      onLight: foregroundColors.ink,
      onDark: foregroundColors.ivory,
    };
  }

  const lightForeground = family === "light";
  return {
    family,
    surfaceTone,
    primary: lightForeground ? foregroundColors.ivory : foregroundColors.ink,
    secondary: lightForeground
      ? foregroundColors.ivorySecondary
      : foregroundColors.inkSecondary,
    muted: lightForeground ? foregroundColors.ivoryMuted : foregroundColors.inkMuted,
    subtle: lightForeground ? foregroundColors.ivorySubtle : foregroundColors.inkSubtle,
    accent: lightForeground ? foregroundColors.mint : "#24634f",
    heading: lightForeground ? foregroundColors.ivory : foregroundColors.ink,
    label: lightForeground ? foregroundColors.ivorySecondary : foregroundColors.inkSecondary,
    link: lightForeground ? foregroundColors.mint : "#185b46",
    icon: lightForeground ? foregroundColors.ivorySecondary : foregroundColors.inkSecondary,
    border: lightForeground ? "rgb(244 241 232 / .34)" : "rgb(8 19 16 / .28)",
    button: lightForeground ? foregroundColors.ivory : foregroundColors.ink,
    buttonMuted: lightForeground
      ? foregroundColors.ivorySecondary
      : foregroundColors.inkSecondary,
    onLight: foregroundColors.ink,
    onDark: foregroundColors.ivory,
  };
}

export function foregroundCssVariables(palette: ForegroundPalette) {
  return {
    "--fg-primary": palette.primary,
    "--fg-secondary": palette.secondary,
    "--fg-muted": palette.muted,
    "--fg-subtle": palette.subtle,
    "--fg-accent": palette.accent,
    "--fg-heading": palette.heading,
    "--fg-label": palette.label,
    "--fg-link": palette.link,
    "--fg-icon": palette.icon,
    "--fg-border": palette.border,
    "--fg-button": palette.button,
    "--fg-button-muted": palette.buttonMuted,
    "--fg-on-light": palette.onLight,
    "--fg-on-dark": palette.onDark,
  } as const;
}
