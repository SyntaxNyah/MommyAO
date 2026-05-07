/**
 * Advanced CSS Theme Maker for LemmyAO
 *
 * Provides a beautiful, intuitive UI for customising every visual aspect of the
 * client. Changes are applied live, persisted to localStorage, and can be
 * exported / imported as a plain .css file.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GradientStop {
  color: string;
  position: number;
}

export interface ThemeConfig {
  // Body
  bodyBg: string;
  bodyColor: string;
  bodyFontFamily: string;
  bodyFontSize: string;
  bodyBgImage: string;       // data-URL or ""
  bodyBgSize: string;        // cover | contain | auto | tile
  bodyBgPosition: string;    // center | top left | …

  // Extended background type
  bodyBgType: string;          // "solid" | "gradient" | "image" | "url" | "pattern" | "video"
  bodyBgGradientType: string;  // "linear" | "radial" | "conic"
  bodyBgGradientAngle: number;
  bodyBgGradientStops: GradientStop[];
  bodyBgUrl: string;           // URL for image background
  bodyBgRepeat: string;        // CSS background-repeat value
  bodyBgPattern: string;       // "dots"|"stripes"|"diagonal"|"grid"|"checkerboard"|"hexagons"|"triangles"|"zigzag"
  bodyBgPatternFg: string;
  bodyBgPatternBg: string;
  bodyBgPatternOpacity: number;
  bodyBgPatternScale: number;
  bodyBgVideo: string;         // .webm/.mp4 URL

  // Noise texture overlay
  noiseOverlayEnabled: boolean;
  noiseOverlayOpacity: number;

  // Chromatic aberration
  chromaticAberrationEnabled: boolean;
  chromaticAberrationAmount: number;

  // Locked color properties (excluded from Randomize)
  lockedColors: string[];

  // Color temperature (-100 = cool, 0 = neutral, 100 = warm)
  colorTemperature: number;

  // Menu / sidebar
  menuBg: string;
  menuColor: string;

  // Buttons
  buttonBg: string;
  buttonColor: string;
  buttonBorder: string;
  buttonRadius: string;

  // IC log
  logBg: string;
  logColor: string;

  // OOC log
  oocBg: string;
  oocColor: string;
  oocFontSize: string;         // Separate font size for OOC log

  // Input boxes
  inputBg: string;
  inputColor: string;
  inputBorder: string;

  // Layout (GoldenLayout panels)
  layoutBg: string;

  // IC controls bar
  icControlsBg: string;

  // Tab bar
  tabBg: string;
  tabActiveBg: string;
  tabColor: string;
  tabActiveColor: string;

  // Health bars
  defHpColor: string;
  proHpColor: string;

  // Player list
  playerlistBg: string;
  playerlistColor: string;
  playerlistBorder: string;
  playerlistBgImage: string;  // data-URL or ""

  // Opacity (0–100) for background colours; 100 = fully opaque
  bodyBgOpacity: number;
  menuBgOpacity: number;
  logBgOpacity: number;
  oocBgOpacity: number;
  inputBgOpacity: number;
  layoutBgOpacity: number;
  icControlsBgOpacity: number;
  tabBgOpacity: number;
  tabActiveBgOpacity: number;
  playerlistBgOpacity: number;

  // Extra raw CSS appended at the end
  extraCSS: string;
}

const DEFAULT_CONFIG: ThemeConfig = {
  bodyBg: "#ffffff",
  bodyColor: "#000000",
  bodyFontFamily: "sans-serif",
  bodyFontSize: "14",
  bodyBgImage: "",
  bodyBgSize: "cover",
  bodyBgPosition: "center",

  bodyBgType: "solid",
  bodyBgGradientType: "linear",
  bodyBgGradientAngle: 135,
  bodyBgGradientStops: [
    { color: "#667eea", position: 0 },
    { color: "#764ba2", position: 100 },
  ],
  bodyBgUrl: "",
  bodyBgRepeat: "no-repeat",
  bodyBgPattern: "dots",
  bodyBgPatternFg: "#333333",
  bodyBgPatternBg: "#ffffff",
  bodyBgPatternOpacity: 100,
  bodyBgPatternScale: 20,
  bodyBgVideo: "",

  noiseOverlayEnabled: false,
  noiseOverlayOpacity: 15,

  chromaticAberrationEnabled: false,
  chromaticAberrationAmount: 2,

  lockedColors: [],
  colorTemperature: 0,

  menuBg: "#f0f0f0",
  menuColor: "#000000",

  buttonBg: "#7b2900",
  buttonColor: "#ffffff",
  buttonBorder: "#ffffff",
  buttonRadius: "3",

  logBg: "#ffffff",
  logColor: "#000000",

  oocBg: "#f5f5f5",
  oocColor: "#222222",
  oocFontSize: "14",

  inputBg: "#ffffff",
  inputColor: "#000000",
  inputBorder: "#cccccc",

  layoutBg: "#ffffff",

  icControlsBg: "#f8f8f8",

  tabBg: "#dddddd",
  tabActiveBg: "#bbbbbb",
  tabColor: "#333333",
  tabActiveColor: "#000000",

  defHpColor: "#169de0",
  proHpColor: "#e01f5f",

  playerlistBg: "#f0f0f0",
  playerlistColor: "#000000",
  playerlistBorder: "#cccccc",
  playerlistBgImage: "",

  bodyBgOpacity: 100,
  menuBgOpacity: 100,
  logBgOpacity: 100,
  oocBgOpacity: 100,
  inputBgOpacity: 100,
  layoutBgOpacity: 100,
  icControlsBgOpacity: 100,
  tabBgOpacity: 100,
  tabActiveBgOpacity: 100,
  playerlistBgOpacity: 100,

  extraCSS: "",
};

const PRESETS: Record<string, Partial<ThemeConfig>> = {
  default: {},
  dark: {
    bodyBg: "#121212",
    bodyColor: "#e0e0e0",
    menuBg: "#1a1a1a",
    menuColor: "#e0e0e0",
    buttonBg: "#1e1e1e",
    buttonColor: "#e0e0e0",
    buttonBorder: "#444444",
    logBg: "#111111",
    logColor: "#e0e0e0",
    oocBg: "#1a1a1a",
    oocColor: "#cccccc",
    inputBg: "#222222",
    inputColor: "#e0e0e0",
    inputBorder: "#444444",
    layoutBg: "#121212",
    icControlsBg: "#1e1e1e",
    tabBg: "#222222",
    tabActiveBg: "#333333",
    tabColor: "#cccccc",
    tabActiveColor: "#ffffff",
    defHpColor: "#1565c0",
    proHpColor: "#b71c1c",
    playerlistBg: "#1a1a1a",
    playerlistColor: "#e0e0e0",
    playerlistBorder: "#444444",
  },
  sunset: {
    bodyBg: "#1a0a2e",
    bodyColor: "#f5e6ff",
    menuBg: "#2d1b4e",
    menuColor: "#f5e6ff",
    buttonBg: "#c2185b",
    buttonColor: "#ffffff",
    buttonBorder: "#e91e63",
    logBg: "#12071e",
    logColor: "#f5e6ff",
    oocBg: "#1e0d35",
    oocColor: "#e0cfff",
    inputBg: "#2a1550",
    inputColor: "#f5e6ff",
    inputBorder: "#7b1fa2",
    layoutBg: "#1a0a2e",
    icControlsBg: "#200f38",
    tabBg: "#2d1b4e",
    tabActiveBg: "#5b2685",
    tabColor: "#d1b3ff",
    tabActiveColor: "#ffffff",
    defHpColor: "#7b1fa2",
    proHpColor: "#c2185b",
    playerlistBg: "#2d1b4e",
    playerlistColor: "#f5e6ff",
    playerlistBorder: "#7b1fa2",
  },
  ocean: {
    bodyBg: "#0a1628",
    bodyColor: "#b3d9ff",
    menuBg: "#0d1f3c",
    menuColor: "#b3d9ff",
    buttonBg: "#0277bd",
    buttonColor: "#ffffff",
    buttonBorder: "#0288d1",
    logBg: "#060f1e",
    logColor: "#cce5ff",
    oocBg: "#0a1628",
    oocColor: "#90caf9",
    inputBg: "#0d2040",
    inputColor: "#b3d9ff",
    inputBorder: "#1565c0",
    layoutBg: "#0a1628",
    icControlsBg: "#0b1a30",
    tabBg: "#112244",
    tabActiveBg: "#1565c0",
    tabColor: "#90caf9",
    tabActiveColor: "#ffffff",
    defHpColor: "#0288d1",
    proHpColor: "#00838f",
    playerlistBg: "#0d1f3c",
    playerlistColor: "#b3d9ff",
    playerlistBorder: "#1565c0",
  },
  forest: {
    bodyBg: "#0d1f0d",
    bodyColor: "#c8e6c9",
    menuBg: "#1b3a1b",
    menuColor: "#c8e6c9",
    buttonBg: "#2e7d32",
    buttonColor: "#ffffff",
    buttonBorder: "#388e3c",
    logBg: "#071407",
    logColor: "#dcedc8",
    oocBg: "#112811",
    oocColor: "#a5d6a7",
    inputBg: "#1b3a1b",
    inputColor: "#c8e6c9",
    inputBorder: "#388e3c",
    layoutBg: "#0d1f0d",
    icControlsBg: "#122012",
    tabBg: "#1b3a1b",
    tabActiveBg: "#2e7d32",
    tabColor: "#a5d6a7",
    tabActiveColor: "#ffffff",
    defHpColor: "#388e3c",
    proHpColor: "#f9a825",
    playerlistBg: "#1b3a1b",
    playerlistColor: "#c8e6c9",
    playerlistBorder: "#388e3c",
  },
  haschenLemmy: {
    // "Haschen & Lemmy" — inspired by The Coffin of Andy and Leyley.
    // Palette: coffin-dark near-blacks with a rotting brownish-green undertone,
    // sickly parchment/bone text, dried-blood crimson accents.
    bodyBg: "#0c0a06",
    bodyColor: "#c9b882",
    bodyFontFamily: "Georgia, serif",
    menuBg: "#0f0d08",
    menuColor: "#b8a870",
    buttonBg: "#3d0a0a",
    buttonColor: "#e8d5a3",
    buttonBorder: "#7a1515",
    buttonRadius: "1",
    logBg: "#080602",
    logColor: "#c2ab72",
    oocBg: "#0d0b06",
    oocColor: "#a89a60",
    inputBg: "#141008",
    inputColor: "#c9b882",
    inputBorder: "#3d2e10",
    layoutBg: "#0c0a06",
    icControlsBg: "#100e08",
    tabBg: "#1a1507",
    tabActiveBg: "#3d0a0a",
    tabColor: "#8a7a45",
    tabActiveColor: "#e8d5a3",
    defHpColor: "#6b3a1f",
    proHpColor: "#8b1a1a",
    playerlistBg: "#0f0d08",
    playerlistColor: "#b8a870",
    playerlistBorder: "#3d2e10",
    extraCSS: `/* Haschen & Lemmy — extra decay touches */
body {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.18) 2px,
    rgba(0,0,0,0.18) 3px
  );
}
.client_button {
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 11px;
}
.client_button:hover {
  background-color: #5a1010;
  border-color: #a02020;
}
#client_log, #client_ooclog {
  border-left: 2px solid #3d0a0a;
}
.lm_tab.lm_active {
  border-bottom: 2px solid #8b1a1a;
}`,
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Converts a #rrggbb hex colour + an opacity (0–100) to a CSS rgba() string. */
function hexToRgba(hex: string, opacity: number): string {
  if (opacity >= 100) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = Math.max(0, Math.min(1, opacity / 100)).toFixed(2);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// ─── HSL Helpers ─────────────────────────────────────────────────────────────

/** Converts a #rrggbb hex to {h:0–360, s:0–100, l:0–100}. */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// ─── OKLCH Helpers ───────────────────────────────────────────────────────────

function sRGBToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSRGB(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function rgbToOklab(r8: number, g8: number, b8: number): [number, number, number] {
  const lr = sRGBToLinear(r8 / 255);
  const lg = sRGBToLinear(g8 / 255);
  const lb = sRGBToLinear(b8 / 255);
  const lp = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const mp = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const sp = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * lp + 0.7936177850 * mp - 0.0040720468 * sp,
    1.9779984951 * lp - 2.4285922050 * mp + 0.4505937099 * sp,
    0.0259040371 * lp + 0.7827717662 * mp - 0.8086757660 * sp,
  ];
}

function oklabToRgb(L: number, a: number, bk: number): [number, number, number] {
  const lp = L + 0.3963377774 * a + 0.2158037573 * bk;
  const mp = L - 0.1055613458 * a - 0.0638541728 * bk;
  const sp = L - 0.0894841775 * a - 1.2914855480 * bk;
  const l = lp * lp * lp;
  const m = mp * mp * mp;
  const s = sp * sp * sp;
  const r = linearToSRGB(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s);
  const g = linearToSRGB(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s);
  const b = linearToSRGB(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
  return [
    Math.round(Math.max(0, Math.min(255, r * 255))),
    Math.round(Math.max(0, Math.min(255, g * 255))),
    Math.round(Math.max(0, Math.min(255, b * 255))),
  ];
}

/** Converts a #rrggbb hex to {l:0–100, c:0–40, h:0–360}. */
export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const [L, a, bk] = rgbToOklab(r, g, b);
  const c = Math.sqrt(a * a + bk * bk);
  const hRaw = Math.atan2(bk, a) * 180 / Math.PI;
  return {
    l: Math.round(L * 100),
    c: Math.round(c * 40 * 10) / 10,
    h: Math.round(hRaw < 0 ? hRaw + 360 : hRaw),
  };
}

/** Converts OKLCH (l:0–100, c:0–40, h:0–360) back to #rrggbb hex. */
export function oklchToHex(l: number, c: number, h: number): string {
  const hRad = h * Math.PI / 180;
  const cNorm = c / 40;
  const a = cNorm * Math.cos(hRad);
  const bk = cNorm * Math.sin(hRad);
  const [r, g, b] = oklabToRgb(l / 100, a, bk);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ─── Pattern SVG Generator ───────────────────────────────────────────────────

function hexToRgbaStr(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${(opacity / 100).toFixed(2)})`;
}

/** Generates a base64-encoded SVG pattern as a CSS-safe data URL. */
export function generatePatternDataURL(
  pattern: string,
  fg: string,
  bg: string,
  opacity: number,
  scale: number,
): string {
  const s = Math.max(4, Math.round(scale));
  const h = s / 2;
  const fgColor = hexToRgbaStr(fg, opacity);
  let svg = "";
  switch (pattern) {
    case "stripes":
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><rect width="${s}" height="${h}" fill="${fgColor}"/></svg>`;
      break;
    case "diagonal":
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><path d="M-${h},${h} l${s},-${s} M0,${s} l${s},-${s} M${h},${s + h} l${s},-${s}" stroke="${fgColor}" stroke-width="${Math.max(1, h * 0.5)}" fill="none"/></svg>`;
      break;
    case "grid":
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><path d="M ${s} 0 L 0 0 0 ${s}" stroke="${fgColor}" stroke-width="1" fill="none"/></svg>`;
      break;
    case "checkerboard":
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><rect width="${h}" height="${h}" fill="${fgColor}"/><rect x="${h}" y="${h}" width="${h}" height="${h}" fill="${fgColor}"/></svg>`;
      break;
    case "hexagons": {
      const w2 = Math.round(s * 1.732);
      const r2 = s * 0.9;
      const cx = w2 / 2;
      const cy = s;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const ang = (i * 60 - 30) * Math.PI / 180;
        return `${(cx + r2 * Math.cos(ang)).toFixed(1)},${(cy + r2 * Math.sin(ang)).toFixed(1)}`;
      }).join(" ");
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w2}" height="${s * 2}"><rect width="${w2}" height="${s * 2}" fill="${bg}"/><polygon points="${pts}" stroke="${fgColor}" stroke-width="1" fill="none"/></svg>`;
      break;
    }
    case "triangles":
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><polygon points="${h},2 ${s - 2},${s - 2} 2,${s - 2}" fill="${fgColor}"/></svg>`;
      break;
    case "zigzag": {
      const zw = s * 2;
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${zw}" height="${s}"><rect width="${zw}" height="${s}" fill="${bg}"/><polyline points="0,${s} ${h},0 ${s},${s} ${s + h},0 ${zw},${s}" stroke="${fgColor}" stroke-width="2" fill="none"/></svg>`;
      break;
    }
    case "noise": {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s * 4}" height="${s * 4}"><filter id="nf"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${(opacity / 100).toFixed(2)} 0"/></filter><rect width="${s * 4}" height="${s * 4}" filter="url(#nf)" fill="${bg}"/></svg>`;
      break;
    }
    default: // dots
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><circle cx="${h}" cy="${h}" r="${Math.max(1, h * 0.4)}" fill="${fgColor}"/></svg>`;
  }
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ─── Noise Overlay ───────────────────────────────────────────────────────────

function generateNoiseDataURL(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ─── Gradient interpolation helper ───────────────────────────────────────────

function interpolateGradientColor(stops: GradientStop[], pos: number): string {
  if (stops.length === 0) return "#808080";
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  if (pos <= sorted[0].position) return sorted[0].color;
  if (pos >= sorted[sorted.length - 1].position) return sorted[sorted.length - 1].color;
  let before = sorted[0];
  let after = sorted[sorted.length - 1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].position <= pos && sorted[i + 1].position >= pos) {
      before = sorted[i];
      after = sorted[i + 1];
      break;
    }
  }
  const t = (pos - before.position) / (after.position - before.position);
  const r1 = parseInt(before.color.slice(1, 3), 16);
  const g1 = parseInt(before.color.slice(3, 5), 16);
  const b1 = parseInt(before.color.slice(5, 7), 16);
  const r2 = parseInt(after.color.slice(1, 3), 16);
  const g2 = parseInt(after.color.slice(3, 5), 16);
  const b2 = parseInt(after.color.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ─── Palette Harmony Generator ───────────────────────────────────────────────

/** Returns an array of #rrggbb hex colours derived from a seed hex using the chosen harmony. */
export function generateHarmony(seedHex: string, type: string): string[] {
  const { h, s, l } = hexToHsl(seedHex);
  switch (type) {
    case "complementary":
      return [seedHex, hslToHex((h + 180) % 360, s, l)];
    case "triadic":
      return [seedHex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case "split-complementary":
      return [seedHex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    case "analogous":
      return [hslToHex((h - 30 + 360) % 360, s, l), seedHex, hslToHex((h + 30) % 360, s, l)];
    case "tetradic":
      return [seedHex, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    default:
      return [seedHex];
  }
}

/** Applies a harmony palette to the accent/button/HP colours in the config. */
function applyHarmonyToConfig(config: ThemeConfig, harmony: string[]): ThemeConfig {
  const [c0, c1 = c0, c2 = c0, c3 = c0] = harmony;
  return {
    ...config,
    buttonBg: c1,
    buttonBorder: c2,
    tabActiveBg: c1,
    defHpColor: c2,
    proHpColor: c3,
  };
}

// ─── Color Temperature Shift ─────────────────────────────────────────────────

const COLOR_PROPS: (keyof ThemeConfig)[] = [
  "bodyBg", "bodyColor", "menuBg", "menuColor", "buttonBg", "buttonColor",
  "buttonBorder", "logBg", "logColor", "oocBg", "oocColor", "inputBg",
  "inputColor", "inputBorder", "layoutBg", "icControlsBg", "tabBg", "tabActiveBg",
  "tabColor", "tabActiveColor", "defHpColor", "proHpColor", "playerlistBg",
  "playerlistColor", "playerlistBorder",
];

/**
 * Shifts all colour properties by the given temperature offset
 * (positive = warm/orange shift, negative = cool/blue shift).
 */
export function applyTemperatureShift(config: ThemeConfig, shift: number): ThemeConfig {
  if (shift === 0) return config;
  const result = { ...config };
  const hueDelta = shift * 0.3;           // ±30° max
  const satDelta = Math.abs(shift) * 0.1; // +10% saturation boost at extremes
  for (const prop of COLOR_PROPS) {
    const val = result[prop];
    if (typeof val !== "string" || !val.startsWith("#")) continue;
    if (result.lockedColors.includes(prop as string)) continue;
    const { h, s, l } = hexToHsl(val);
    const newH = ((h + hueDelta) % 360 + 360) % 360;
    const newS = Math.max(0, Math.min(100, s + satDelta));
    (result as any)[prop] = hslToHex(newH, newS, l);
  }
  return result;
}

// ─── CSS Generation ───────────────────────────────────────────────────────────

/** Builds the body background CSS block based on the active background type. */
function buildBodyBgCSS(config: ThemeConfig): string {
  const solidBg = hexToRgba(config.bodyBg, Number(config.bodyBgOpacity ?? 100));
  const size = config.bodyBgSize === "tile" ? "auto" : (config.bodyBgSize || "cover");
  const repeat = config.bodyBgSize === "tile" ? "repeat" : (config.bodyBgRepeat || "no-repeat");
  const pos = config.bodyBgPosition || "center";

  switch (config.bodyBgType) {
    case "gradient": {
      const stops = (config.bodyBgGradientStops ?? []).map(s => `${s.color} ${s.position}%`).join(", ");
      let gradCSS = "";
      switch (config.bodyBgGradientType) {
        case "radial":  gradCSS = `radial-gradient(ellipse at center, ${stops})`; break;
        case "conic":   gradCSS = `conic-gradient(from ${config.bodyBgGradientAngle ?? 0}deg, ${stops})`; break;
        default:        gradCSS = `linear-gradient(${config.bodyBgGradientAngle ?? 135}deg, ${stops})`;
      }
      return `background: ${gradCSS};`;
    }
    case "image":
      if (config.bodyBgImage) {
        return `background-color: ${solidBg};
  background-image: url('${config.bodyBgImage}');
  background-size: ${size};
  background-repeat: ${repeat};
  background-position: ${pos};
  background-attachment: fixed;`;
      }
      return `background-color: ${solidBg};`;
    case "url":
      if (config.bodyBgUrl) {
        return `background-color: ${solidBg};
  background-image: url('${config.bodyBgUrl}');
  background-size: ${size};
  background-repeat: ${repeat};
  background-position: ${pos};
  background-attachment: fixed;`;
      }
      return `background-color: ${solidBg};`;
    case "pattern": {
      const pUrl = generatePatternDataURL(
        config.bodyBgPattern || "dots",
        config.bodyBgPatternFg || "#333333",
        config.bodyBgPatternBg || "#ffffff",
        config.bodyBgPatternOpacity ?? 100,
        config.bodyBgPatternScale ?? 20,
      );
      return `background-color: ${config.bodyBgPatternBg || "#ffffff"};
  background-image: url("${pUrl}");
  background-repeat: repeat;
  background-size: ${config.bodyBgPatternScale ?? 20}px ${config.bodyBgPatternScale ?? 20}px;`;
    }
    case "video":
      return `background-color: ${solidBg};`;
    default: // solid
      return `background-color: ${solidBg};`;
  }
}

export function generateCSS(config: ThemeConfig): string {
  const bodyBgColor = hexToRgba(config.bodyBg, Number(config.bodyBgOpacity ?? 100));
  const menuBgColor = hexToRgba(config.menuBg, Number(config.menuBgOpacity ?? 100));
  const logBgColor = hexToRgba(config.logBg, Number(config.logBgOpacity ?? 100));
  const oocBgColor = hexToRgba(config.oocBg, Number(config.oocBgOpacity ?? 100));
  const inputBgColor = hexToRgba(config.inputBg, Number(config.inputBgOpacity ?? 100));
  const layoutBgColor = hexToRgba(config.layoutBg, Number(config.layoutBgOpacity ?? 100));
  const icControlsBgColor = hexToRgba(config.icControlsBg, Number(config.icControlsBgOpacity ?? 100));
  const tabBgColor = hexToRgba(config.tabBg, Number(config.tabBgOpacity ?? 100));
  const tabActiveBgColor = hexToRgba(config.tabActiveBg, Number(config.tabActiveBgOpacity ?? 100));
  const playerlistBgColor = hexToRgba(config.playerlistBg, Number(config.playerlistBgOpacity ?? 100));
  return `/* LemmyAO Theme Maker — generated theme */
body {
  background-color: ${bodyBgColor};
  color: ${config.bodyColor};
  font-family: ${config.bodyFontFamily};
  font-size: ${config.bodyFontSize}px;${buildBgImageCSS(config)}
}

.client_button {
  margin: 1px;
  padding: 2px 15px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: ${config.buttonColor};
  background-color: ${config.buttonBg};
  border-radius: ${config.buttonRadius}px;
  border-style: solid;
  border-width: 1px;
  border-color: ${config.buttonBorder};
  box-shadow: 1px 1px inset;
}

#client_menu {
  background-color: ${menuBgColor};
  color: ${config.menuColor};
  overflow-y: auto;
  height: 100%;
}

.menu_content {
  background-color: ${menuBgColor};
  color: ${config.menuColor};
}

.menu_text {
  color: ${config.menuColor};
  background-color: ${menuBgColor};
}

#client_log {
  background-color: ${logBgColor};
  color: ${config.logColor};
}

#client_ooclog {
  background-color: ${oocBgColor};
  color: ${config.oocColor};
}

#client_inputbox {
  background-color: ${inputBgColor};
  color: ${config.inputColor};
  border: 1px solid ${config.inputBorder};
}

#client_oocinput {
  background-color: ${inputBgColor};
  color: ${config.inputColor};
}

#client_iccontrols {
  background-color: ${icControlsBgColor};
}

.lm_goldenlayout,
.lm_content {
  background-color: ${layoutBgColor} !important;
}

.lm_tab {
  color: ${config.tabColor};
  background-color: ${tabBgColor};
}

.lm_tab.lm_active {
  color: ${config.tabActiveColor};
  background-color: ${tabActiveBgColor};
}

#evi_name {
  background-color: ${inputBgColor};
  color: ${config.inputColor};
  border: 1px solid ${config.inputBorder};
}

#evi_desc {
  flex: 1 auto;
  background-color: ${inputBgColor};
  color: ${config.inputColor};
  border: 1px solid ${config.inputBorder};
}

#client_defense_hp > .health-bar {
  background-color: ${config.defHpColor};
}

#client_prosecutor_hp > .health-bar {
  background-color: ${config.proHpColor};
}

#client_playerlist {
  background-color: ${playerlistBgColor};
  color: ${config.playerlistColor};${config.playerlistBgImage ? `
  background-image: url('${config.playerlistBgImage}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;` : ""}
}

#client_playerlist th,
#client_playerlist td {
  border-bottom: 1px solid ${config.playerlistBorder};
  color: ${config.playerlistColor};
}

#client_playerlist th {
  border-bottom: 2px solid ${config.playerlistBorder};
}

#client_ooclog {
  font-size: ${config.oocFontSize || config.bodyFontSize}px;
}
${config.noiseOverlayEnabled ? `
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: ${(config.noiseOverlayOpacity ?? 15) / 100};
  background-image: url("${generateNoiseDataURL()}");
  background-repeat: repeat;
  background-size: 200px 200px;
}` : ""}
${config.chromaticAberrationEnabled ? `
#client_log *, #client_ooclog * {
  text-shadow: ${config.chromaticAberrationAmount ?? 2}px 0 ${(config.chromaticAberrationAmount ?? 2) * 2}px rgba(255,0,0,0.45),
               -${config.chromaticAberrationAmount ?? 2}px 0 ${(config.chromaticAberrationAmount ?? 2) * 2}px rgba(0,200,255,0.45);
}
.client_button {
  text-shadow: ${config.chromaticAberrationAmount ?? 2}px 0 0 rgba(255,0,0,0.3),
               -${config.chromaticAberrationAmount ?? 2}px 0 0 rgba(0,200,255,0.3);
}` : ""}
${config.colorTemperature !== 0 ? `
body { filter: hue-rotate(${Math.round(-(config.colorTemperature ?? 0) * 0.25)}deg)${(config.colorTemperature ?? 0) > 0 ? ` sepia(${Math.round((config.colorTemperature ?? 0) * 0.25)}%)` : ""}; }` : ""}
${config.extraCSS}`;
}

// ─── Persistence ──────────────────────────────────────────────────────────────

const LS_KEY_CONFIG = "themeMakerConfig";
const LS_KEY_CSS = "customCSS";
const LS_KEY_THEME = "theme";

export function saveThemeMakerConfig(config: ThemeConfig): void {
  localStorage.setItem(LS_KEY_CONFIG, JSON.stringify(config));
  const css = generateCSS(config);
  localStorage.setItem(LS_KEY_CSS, css);
  localStorage.setItem(LS_KEY_THEME, "custom");
}

export function loadThemeMakerConfig(): ThemeConfig | null {
  const raw = localStorage.getItem(LS_KEY_CONFIG);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ThemeConfig>;
    // Ensure array fields are properly hydrated
    if (!Array.isArray(parsed.bodyBgGradientStops)) {
      parsed.bodyBgGradientStops = DEFAULT_CONFIG.bodyBgGradientStops;
    }
    if (!Array.isArray(parsed.lockedColors)) {
      parsed.lockedColors = [];
    }
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return null;
  }
}

// ─── Apply CSS ────────────────────────────────────────────────────────────────

function applyThemeMakerCSS(css: string): void {
  let el = document.getElementById("client_custom_style") as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = "client_custom_style";
    document.head.appendChild(el);
  }
  el.textContent = css;
  const themeLink = document.getElementById("client_theme") as HTMLLinkElement | null;
  if (themeLink) themeLink.disabled = true;
}

/** Injects or removes the <video> element used for video backgrounds. */
function applyVideoBackground(config: ThemeConfig): void {
  let videoEl = document.getElementById("tm_bg_video") as HTMLVideoElement | null;
  if (config.bodyBgType === "video" && config.bodyBgVideo) {
    if (!videoEl) {
      videoEl = document.createElement("video");
      videoEl.id = "tm_bg_video";
      videoEl.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:-1;pointer-events:none;";
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      (videoEl as any).playsInline = true;
      document.body.insertBefore(videoEl, document.body.firstChild);
    }
    const currentSrc = videoEl.querySelector("source")?.getAttribute("src");
    if (currentSrc !== config.bodyBgVideo) {
      videoEl.innerHTML = `<source src="${config.bodyBgVideo}" type="video/mp4"><source src="${config.bodyBgVideo}" type="video/webm">`;
      videoEl.load();
      videoEl.play().catch(() => { /* autoplay blocked */ });
    }
  } else if (videoEl) {
    videoEl.remove();
  }
}

export function applyThemeMakerConfig(config: ThemeConfig): void {
  applyThemeMakerCSS(generateCSS(config));
  applyVideoBackground(config);
}

// ─── Modal HTML ───────────────────────────────────────────────────────────────

function injectModalHTML(): void {
  if (document.getElementById("tm_overlay")) return;

  const html = `
<div id="tm_overlay" role="dialog" aria-modal="true" aria-label="Theme Maker" style="display:none">
  <div id="tm_modal" tabindex="-1">
    <div id="tm_header">
      <span id="tm_title">🎨 Theme Maker</span>
      <div id="tm_header_actions">
        <button class="tm_btn tm_btn_secondary" id="tm_import_btn" title="Import a .css or .json theme file">📂 Import</button>
        <button class="tm_btn tm_btn_secondary" id="tm_export_btn" title="Export theme as CSS file">💾 Export CSS</button>
        <button class="tm_btn tm_btn_secondary" id="tm_export_json_btn" title="Export theme as JSON for easy re-import">📋 Export JSON</button>
        <button class="tm_btn tm_btn_close" id="tm_close_btn" title="Close Theme Maker">✕</button>
      </div>
    </div>

    <div id="tm_body">
      <!-- Sidebar / tab list -->
      <nav id="tm_tabs" role="tablist">
        <button class="tm_tab tm_tab_active" data-tab="colors" role="tab" aria-selected="true">🎨 Colors</button>
        <button class="tm_tab" data-tab="background" role="tab" aria-selected="false">🖼 Background</button>
        <button class="tm_tab" data-tab="typography" role="tab" aria-selected="false">✏️ Typography</button>
        <button class="tm_tab" data-tab="advanced" role="tab" aria-selected="false">⚙️ Advanced</button>
        <div id="tm_presets_section">
          <p class="tm_section_label">Quick Presets</p>
          <button class="tm_preset_btn" data-preset="default">☀️ Default</button>
          <button class="tm_preset_btn" data-preset="dark">🌑 Dark</button>
          <button class="tm_preset_btn" data-preset="sunset">🌅 Sunset</button>
          <button class="tm_preset_btn" data-preset="ocean">🌊 Ocean</button>
          <button class="tm_preset_btn" data-preset="forest">🌿 Forest</button>
          <button class="tm_preset_btn" data-preset="haschenLemmy">🪦 Haschen &amp; Lemmy</button>
        </div>
      </nav>

      <!-- Tab panels -->
      <div id="tm_panels">

        <!-- Colors -->
        <div class="tm_panel tm_panel_active" data-panel="colors">
          <h3 class="tm_panel_title">Color Settings</h3>

          <div class="tm_group">
            <h4 class="tm_group_title">🖥 Page</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyBg">Page background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_bodyBg" data-prop="bodyBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_bodyBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyBgOpacity">Page bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_bodyBgOpacity" data-prop="bodyBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_bodyBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyColor">Page text color</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_bodyColor" data-prop="bodyColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_bodyColor" maxlength="7" />
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">🗂 Menu / Sidebar</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_menuBg">Menu background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_menuBg" data-prop="menuBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_menuBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_menuBgOpacity">Menu bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_menuBgOpacity" data-prop="menuBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_menuBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_menuColor">Menu text color</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_menuColor" data-prop="menuColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_menuColor" maxlength="7" />
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">🔘 Buttons</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_buttonBg">Button background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_buttonBg" data-prop="buttonBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_buttonBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_buttonColor">Button text</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_buttonColor" data-prop="buttonColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_buttonColor" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_buttonBorder">Button border</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_buttonBorder" data-prop="buttonBorder" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_buttonBorder" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_buttonRadius">Button rounding (px)</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_buttonRadius" data-prop="buttonRadius" min="0" max="20" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_buttonRadius">3</span>
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">💬 Chat / Log</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_logBg">IC log background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_logBg" data-prop="logBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_logBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_logBgOpacity">IC log bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_logBgOpacity" data-prop="logBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_logBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_logColor">IC log text</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_logColor" data-prop="logColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_logColor" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_oocBg">OOC log background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_oocBg" data-prop="oocBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_oocBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_oocBgOpacity">OOC log bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_oocBgOpacity" data-prop="oocBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_oocBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_oocColor">OOC log text</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_oocColor" data-prop="oocColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_oocColor" maxlength="7" />
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">📝 Inputs</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_inputBg">Input background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_inputBg" data-prop="inputBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_inputBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_inputBgOpacity">Input bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_inputBgOpacity" data-prop="inputBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_inputBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_inputColor">Input text</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_inputColor" data-prop="inputColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_inputColor" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_inputBorder">Input border</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_inputBorder" data-prop="inputBorder" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_inputBorder" maxlength="7" />
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">🗒 Layout &amp; IC Controls</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_layoutBg">Layout panel background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_layoutBg" data-prop="layoutBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_layoutBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_layoutBgOpacity">Layout bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_layoutBgOpacity" data-prop="layoutBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_layoutBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_icControlsBg">IC controls background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_icControlsBg" data-prop="icControlsBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_icControlsBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_icControlsBgOpacity">IC controls bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_icControlsBgOpacity" data-prop="icControlsBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_icControlsBgOpacity">100</span><span>%</span>
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">📑 Tabs</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_tabBg">Tab background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_tabBg" data-prop="tabBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_tabBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_tabBgOpacity">Tab bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_tabBgOpacity" data-prop="tabBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_tabBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_tabActiveBg">Active tab background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_tabActiveBg" data-prop="tabActiveBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_tabActiveBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_tabActiveBgOpacity">Active tab bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_tabActiveBgOpacity" data-prop="tabActiveBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_tabActiveBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_tabColor">Tab text</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_tabColor" data-prop="tabColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_tabColor" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_tabActiveColor">Active tab text</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_tabActiveColor" data-prop="tabActiveColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_tabActiveColor" maxlength="7" />
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">❤ Health Bars</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_defHpColor">Defense HP</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_defHpColor" data-prop="defHpColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_defHpColor" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_proHpColor">Prosecution HP</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_proHpColor" data-prop="proHpColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_proHpColor" maxlength="7" />
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">👥 Player List</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_playerlistBg">Background</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_playerlistBg" data-prop="playerlistBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_playerlistBg" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_playerlistBgOpacity">Player list bg opacity</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_playerlistBgOpacity" data-prop="playerlistBgOpacity" min="0" max="100" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_playerlistBgOpacity">100</span><span>%</span>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_playerlistColor">Text color</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_playerlistColor" data-prop="playerlistColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_playerlistColor" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_playerlistBorder">Row divider color</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_playerlistBorder" data-prop="playerlistBorder" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_playerlistBorder" maxlength="7" />
              </div>
            </div>
          </div>
        </div>

        <!-- Background -->
        <div class="tm_panel" data-panel="background">
          <h3 class="tm_panel_title">Background Settings</h3>

          <div class="tm_group">
            <h4 class="tm_group_title">🖼 Background Image</h4>
            <div class="tm_row tm_row_vert">
              <label class="tm_label">Upload image</label>
              <input type="file" id="tm_bg_file" accept="image/*" />
              <p class="tm_hint">Supports PNG, JPG, GIF, WebP, SVG. The image is stored locally — it never leaves your browser.</p>
            </div>
            <div class="tm_row">
              <label class="tm_label">Current image</label>
              <div id="tm_bg_preview_wrap">
                <img id="tm_bg_preview" alt="Background preview" />
                <button class="tm_btn tm_btn_danger tm_btn_sm" id="tm_bg_clear_btn">Remove image</button>
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyBgSize">Image sizing</label>
              <select id="tm_bodyBgSize" data-prop="bodyBgSize" class="tm_select">
                <option value="cover">Cover (fill, may crop)</option>
                <option value="contain">Contain (fit, no crop)</option>
                <option value="tile">Tile (repeat)</option>
                <option value="auto">Natural size</option>
              </select>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyBgPosition">Image position</label>
              <select id="tm_bodyBgPosition" data-prop="bodyBgPosition" class="tm_select">
                <option value="center">Center</option>
                <option value="top center">Top center</option>
                <option value="bottom center">Bottom center</option>
                <option value="top left">Top left</option>
                <option value="top right">Top right</option>
              </select>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">👥 Player List Image</h4>
            <div class="tm_row tm_row_vert">
              <label class="tm_label">Upload image</label>
              <input type="file" id="tm_playerlist_bg_file" accept="image/*" />
              <p class="tm_hint">Optional background image for the player list. Stored locally — never leaves your browser.</p>
            </div>
            <div class="tm_row" id="tm_playerlist_bg_preview_wrap" style="display:none">
              <label class="tm_label">Current image</label>
              <div class="tm_ctrl">
                <img id="tm_playerlist_bg_preview" alt="Player list background preview" style="max-height:60px;border-radius:4px;" />
                <button class="tm_btn tm_btn_danger tm_btn_sm" id="tm_playerlist_bg_clear_btn">Remove image</button>
              </div>
            </div>
          </div>

          <div class="tm_group">
            <h4 class="tm_group_title">🎨 Page Base Colors</h4>
            <p class="tm_hint">These are the same controls as in the Colors tab — tweak them here for easier pairing with your background image.</p>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyBg2">Page background color</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_bodyBg2" data-prop="bodyBg" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_bodyBg2" maxlength="7" />
              </div>
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyColor2">Page text color</label>
              <div class="tm_ctrl">
                <input type="color" id="tm_bodyColor2" data-prop="bodyColor" class="tm_color" />
                <input type="text" class="tm_hex" data-for="tm_bodyColor2" maxlength="7" />
              </div>
            </div>
          </div>
        </div>

        <!-- Typography -->
        <div class="tm_panel" data-panel="typography">
          <h3 class="tm_panel_title">Typography Settings</h3>

          <div class="tm_group">
            <h4 class="tm_group_title">🔤 Font</h4>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyFontFamily">Font family</label>
              <select id="tm_bodyFontFamily" data-prop="bodyFontFamily" class="tm_select">
                <option value="sans-serif">Default (sans-serif)</option>
                <option value="Igiari Cyrillic, Ace Attorney, sans-serif">Igiari (Ace Attorney)</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Times New Roman, Times, serif">Times New Roman</option>
                <option value="Courier New, Courier, monospace">Courier New</option>
                <option value="monospace">Monospace</option>
                <option value="Comic Sans MS, cursive">Comic Sans</option>
                <option value="Impact, fantasy">Impact</option>
                <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                <option value="custom">Custom…</option>
              </select>
            </div>
            <div id="tm_customFont_row" style="display:none" class="tm_row">
              <label class="tm_label" for="tm_customFontInput">Custom font name</label>
              <input type="text" id="tm_customFontInput" placeholder="e.g. 'Noto Sans', sans-serif" class="tm_text_input" />
            </div>
            <div class="tm_row">
              <label class="tm_label" for="tm_bodyFontSize">Font size (px)</label>
              <div class="tm_ctrl">
                <input type="range" id="tm_bodyFontSize" data-prop="bodyFontSize" min="10" max="24" step="1" class="tm_range" />
                <span class="tm_range_val" data-for="tm_bodyFontSize">14</span>
              </div>
            </div>
          </div>

          <div id="tm_font_preview" class="tm_group">
            <h4 class="tm_group_title">👁 Preview</h4>
            <p id="tm_font_preview_text" class="tm_font_preview_text">The quick brown fox jumps over the lazy dog. 1234567890 !@#$%^&*</p>
          </div>
        </div>

        <!-- Advanced -->
        <div class="tm_panel" data-panel="advanced">
          <h3 class="tm_panel_title">Advanced CSS</h3>
          <div class="tm_group">
            <h4 class="tm_group_title">🧪 Extra CSS Rules</h4>
            <p class="tm_hint">Add any custom CSS you like. It will be appended after all other theme rules. Changes are applied live!</p>
            <textarea
              id="tm_extraCSS"
              class="tm_css_editor"
              placeholder="/* Your custom CSS here */
#client_log { border: 2px solid gold; }
.client_button:hover { opacity: 0.8; }"
              rows="18"
              spellcheck="false"
            ></textarea>
          </div>
          <div class="tm_group">
            <h4 class="tm_group_title">📄 Generated CSS Preview</h4>
            <p class="tm_hint">This is the full CSS that will be saved and exported.</p>
            <textarea id="tm_css_preview" class="tm_css_editor tm_css_readonly" rows="12" readonly spellcheck="false"></textarea>
          </div>
        </div>

      </div><!-- /tm_panels -->
    </div><!-- /tm_body -->

    <div id="tm_footer">
      <div id="tm_footer_left">
        <button class="tm_btn tm_btn_danger" id="tm_reset_btn" title="Reset all theme maker settings to defaults">🗑 Reset to Default</button>
        <button class="tm_btn tm_btn_secondary" id="tm_undo_btn" title="Undo last change" disabled>↩ Undo</button>
        <button class="tm_btn tm_btn_secondary" id="tm_randomize_btn" title="Generate a random harmonious colour scheme">🎲 Randomize</button>
      </div>
      <div id="tm_footer_right">
        <span id="tm_saved_badge" style="display:none">✅ Saved!</span>
        <button class="tm_btn tm_btn_primary" id="tm_save_btn">💾 Save Theme</button>
      </div>
    </div>

  </div><!-- /tm_modal -->
</div><!-- /tm_overlay -->
<input type="file" id="tm_import_file" accept=".css,.json" style="display:none" />
`;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
}

// ─── State ────────────────────────────────────────────────────────────────────

let currentConfig: ThemeConfig = { ...DEFAULT_CONFIG };

function getConfig(): ThemeConfig {
  return currentConfig;
}

function setConfig(config: ThemeConfig): void {
  currentConfig = config;
}

// ─── Undo History ─────────────────────────────────────────────────────────────

const MAX_HISTORY = 10;
const undoStack: ThemeConfig[] = [];
/** True while the user is still holding down / interacting — avoid flooding the stack. */
let isInteracting = false;

function pushToHistory(config: ThemeConfig): void {
  undoStack.push(JSON.parse(JSON.stringify(config)));
  if (undoStack.length > MAX_HISTORY) undoStack.shift();
  const undoBtn = document.getElementById("tm_undo_btn") as HTMLButtonElement | null;
  if (undoBtn) undoBtn.disabled = false;
}

function undoLastChange(): void {
  if (undoStack.length === 0) return;
  setConfig(undoStack.pop()!);
  syncUIFromConfig(currentConfig);
  liveUpdate();
  const undoBtn = document.getElementById("tm_undo_btn") as HTMLButtonElement | null;
  if (undoBtn) undoBtn.disabled = undoStack.length === 0;
}

function captureHistory(): void {
  if (!isInteracting) {
    pushToHistory(currentConfig);
    isInteracting = true;
  }
}

// ─── Random Palette Generator ─────────────────────────────────────────────────

/** Converts HSL (h: 0–360, s: 0–100, l: 0–100) to a #rrggbb hex string. */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const val = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(val * 255).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Generates a random but visually harmonious ThemeConfig derived from HSL math. */
function generateRandomPalette(): ThemeConfig {
  const hue = Math.floor(Math.random() * 360);
  const sat = 20 + Math.floor(Math.random() * 50); // 20–70 %
  const isDark = Math.random() < 0.65;              // 65 % dark, 35 % light
  const accentHue = (hue + 150 + Math.floor(Math.random() * 60)) % 360;
  const accentSat = 55 + Math.floor(Math.random() * 35);
  const radius = String(Math.floor(Math.random() * 10));

  if (isDark) {
    const bgL = 5 + Math.floor(Math.random() * 10);   // 5–15 %
    const textL = 80 + Math.floor(Math.random() * 15); // 80–95 %
    const clamp = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));
    return {
      ...DEFAULT_CONFIG,
      bodyBg: hslToHex(hue, Math.round(sat * 0.35), bgL),
      bodyColor: hslToHex(hue, 15, textL),
      menuBg: hslToHex(hue, Math.round(sat * 0.30), clamp(bgL + 4, 3, 25)),
      menuColor: hslToHex(hue, 10, textL),
      buttonBg: hslToHex(accentHue, accentSat, 35),
      buttonColor: hslToHex(hue, 5, 95),
      buttonBorder: hslToHex(accentHue, accentSat, 55),
      buttonRadius: radius,
      logBg: hslToHex(hue, Math.round(sat * 0.25), clamp(bgL - 2, 3, 20)),
      logColor: hslToHex(hue, 10, textL),
      oocBg: hslToHex(hue, Math.round(sat * 0.25), clamp(bgL + 3, 3, 25)),
      oocColor: hslToHex(hue, 10, clamp(textL - 5, 60, 95)),
      inputBg: hslToHex(hue, Math.round(sat * 0.30), clamp(bgL + 6, 3, 30)),
      inputColor: hslToHex(hue, 10, textL),
      inputBorder: hslToHex(hue, Math.round(sat * 0.35), clamp(bgL + 20, 10, 45)),
      layoutBg: hslToHex(hue, Math.round(sat * 0.25), bgL),
      icControlsBg: hslToHex(hue, Math.round(sat * 0.30), clamp(bgL + 3, 3, 25)),
      tabBg: hslToHex(hue, Math.round(sat * 0.30), clamp(bgL + 6, 3, 30)),
      tabActiveBg: hslToHex(hue, Math.round(sat * 0.35), clamp(bgL + 16, 10, 45)),
      tabColor: hslToHex(hue, 10, clamp(textL - 10, 60, 90)),
      tabActiveColor: hslToHex(hue, 5, textL),
      defHpColor: hslToHex((hue + 120) % 360, 65, 40),
      proHpColor: hslToHex((hue + 240) % 360, 70, 40),
      playerlistBg: hslToHex(hue, Math.round(sat * 0.30), clamp(bgL + 4, 3, 25)),
      playerlistColor: hslToHex(hue, 10, textL),
      playerlistBorder: hslToHex(hue, Math.round(sat * 0.35), clamp(bgL + 20, 10, 45)),
      extraCSS: currentConfig.extraCSS,
      bodyBgImage: currentConfig.bodyBgImage,
      playerlistBgImage: currentConfig.playerlistBgImage,
    };
  } else {
    // Light palette
    const bgL = 90 + Math.floor(Math.random() * 8);   // 90–98 %
    const textL = 5 + Math.floor(Math.random() * 15);  // 5–20 %
    const clamp = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));
    return {
      ...DEFAULT_CONFIG,
      bodyBg: hslToHex(hue, Math.round(sat * 0.20), bgL),
      bodyColor: hslToHex(hue, Math.round(sat * 0.40), textL),
      menuBg: hslToHex(hue, Math.round(sat * 0.20), clamp(bgL - 6, 70, 96)),
      menuColor: hslToHex(hue, Math.round(sat * 0.40), textL),
      buttonBg: hslToHex(accentHue, accentSat, 45),
      buttonColor: hslToHex(hue, 5, 98),
      buttonBorder: hslToHex(accentHue, accentSat, 35),
      buttonRadius: radius,
      logBg: hslToHex(hue, Math.round(sat * 0.10), clamp(bgL + 4, 92, 100)),
      logColor: hslToHex(hue, Math.round(sat * 0.40), textL),
      oocBg: hslToHex(hue, Math.round(sat * 0.15), clamp(bgL - 4, 70, 96)),
      oocColor: hslToHex(hue, Math.round(sat * 0.35), clamp(textL + 5, 5, 30)),
      inputBg: hslToHex(hue, 5, clamp(bgL + 2, 90, 100)),
      inputColor: hslToHex(hue, Math.round(sat * 0.40), textL),
      inputBorder: hslToHex(hue, Math.round(sat * 0.25), clamp(bgL - 25, 50, 80)),
      layoutBg: hslToHex(hue, Math.round(sat * 0.10), bgL),
      icControlsBg: hslToHex(hue, Math.round(sat * 0.15), clamp(bgL - 3, 70, 97)),
      tabBg: hslToHex(hue, Math.round(sat * 0.20), clamp(bgL - 10, 65, 92)),
      tabActiveBg: hslToHex(hue, Math.round(sat * 0.25), clamp(bgL - 20, 55, 85)),
      tabColor: hslToHex(hue, Math.round(sat * 0.30), clamp(textL + 15, 15, 50)),
      tabActiveColor: hslToHex(hue, Math.round(sat * 0.40), textL),
      defHpColor: hslToHex((hue + 120) % 360, 65, 40),
      proHpColor: hslToHex((hue + 240) % 360, 70, 40),
      playerlistBg: hslToHex(hue, Math.round(sat * 0.15), clamp(bgL - 5, 70, 96)),
      playerlistColor: hslToHex(hue, Math.round(sat * 0.40), textL),
      playerlistBorder: hslToHex(hue, Math.round(sat * 0.25), clamp(bgL - 25, 50, 80)),
      extraCSS: currentConfig.extraCSS,
      bodyBgImage: currentConfig.bodyBgImage,
      playerlistBgImage: currentConfig.playerlistBgImage,
    };
  }
}

// ─── UI ───────────────────────────────────────────────────────────────────────

function syncUIFromConfig(config: ThemeConfig): void {
  // Color inputs
  document.querySelectorAll<HTMLInputElement>(".tm_color[data-prop]").forEach((input) => {
    const prop = input.dataset.prop as keyof ThemeConfig;
    const val = String(config[prop] ?? "");
    if (val.startsWith("#")) input.value = val;
    // Sync linked hex text input
    const hexInput = document.querySelector<HTMLInputElement>(`.tm_hex[data-for="${input.id}"]`);
    if (hexInput) hexInput.value = val;
  });

  // Range inputs
  document.querySelectorAll<HTMLInputElement>(".tm_range[data-prop]").forEach((input) => {
    const prop = input.dataset.prop as keyof ThemeConfig;
    input.value = String(config[prop] ?? "");
    const valSpan = document.querySelector<HTMLElement>(`.tm_range_val[data-for="${input.id}"]`);
    if (valSpan) valSpan.textContent = String(config[prop] ?? "");
  });

  // Selects
  document.querySelectorAll<HTMLSelectElement>(".tm_select[data-prop]").forEach((sel) => {
    const prop = sel.dataset.prop as keyof ThemeConfig;
    const val = String(config[prop] ?? "");
    // If the value exists in options, set it; otherwise pick "custom" or first
    const match = Array.from(sel.options).find((o) => o.value === val);
    if (match) {
      sel.value = val;
    } else if (prop === "bodyFontFamily") {
      sel.value = "custom";
      const customRow = document.getElementById("tm_customFont_row");
      if (customRow) customRow.style.display = "block";
      const customInput = document.getElementById("tm_customFontInput") as HTMLInputElement | null;
      if (customInput) customInput.value = val;
    } else {
      sel.value = sel.options[0]?.value ?? "";
    }
  });

  // Extra CSS textarea
  const extraTA = document.getElementById("tm_extraCSS") as HTMLTextAreaElement | null;
  if (extraTA) extraTA.value = config.extraCSS ?? "";

  // Background preview
  updateBgPreview(config);
  updatePlayerlistBgPreview(config);

  // Font preview
  updateFontPreview(config);

  // CSS preview
  updateCSSPreview(config);
}

function updateBgPreview(config: ThemeConfig): void {
  const img = document.getElementById("tm_bg_preview") as HTMLImageElement | null;
  const wrap = document.getElementById("tm_bg_preview_wrap");
  if (!img || !wrap) return;
  if (config.bodyBgImage) {
    img.src = config.bodyBgImage;
    img.style.display = "block";
    wrap.style.display = "flex";
  } else {
    img.src = "";
    img.style.display = "none";
    wrap.style.display = "none";
  }
}

function updatePlayerlistBgPreview(config: ThemeConfig): void {
  const img = document.getElementById("tm_playerlist_bg_preview") as HTMLImageElement | null;
  const wrap = document.getElementById("tm_playerlist_bg_preview_wrap");
  if (!img || !wrap) return;
  if (config.playerlistBgImage) {
    img.src = config.playerlistBgImage;
    wrap.style.display = "flex";
  } else {
    img.src = "";
    wrap.style.display = "none";
  }
}

function updateFontPreview(config: ThemeConfig): void {
  const preview = document.getElementById("tm_font_preview_text");
  if (!preview) return;
  // The stored config always holds the actual font value; the "custom" entry only
  // exists as a UI-level sentinel in the <select>. Use the config value directly.
  const font = config.bodyFontFamily || "sans-serif";
  preview.style.fontFamily = font;
  preview.style.fontSize = config.bodyFontSize + "px";
  preview.style.color = config.bodyColor;
  preview.style.background = config.bodyBg;
}

function updateCSSPreview(config: ThemeConfig): void {
  const ta = document.getElementById("tm_css_preview") as HTMLTextAreaElement | null;
  if (!ta) return;
  ta.value = generateCSS(config);
}

function liveUpdate(): void {
  const config = getConfig();
  applyThemeMakerConfig(config);
  updateFontPreview(config);
  updateCSSPreview(config);
}

// ─── Event wiring ─────────────────────────────────────────────────────────────

function wireEvents(): void {
  // ── Reset the "interacting" flag whenever the pointer is released globally ──
  document.addEventListener("pointerup", () => { isInteracting = false; }, true);

  // Tab switching
  document.querySelectorAll<HTMLButtonElement>(".tm_tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tm_tab").forEach((t) => {
        t.classList.remove("tm_tab_active");
        t.setAttribute("aria-selected", "false");
      });
      document.querySelectorAll(".tm_panel").forEach((p) => p.classList.remove("tm_panel_active"));
      tab.classList.add("tm_tab_active");
      tab.setAttribute("aria-selected", "true");
      const panel = document.querySelector<HTMLElement>(`.tm_panel[data-panel="${tab.dataset.tab}"]`);
      if (panel) panel.classList.add("tm_panel_active");
    });
  });

  // Color inputs — capture history on pointerdown, sync hex box + update live
  document.querySelectorAll<HTMLInputElement>(".tm_color[data-prop]").forEach((input) => {
    input.addEventListener("pointerdown", captureHistory);
    input.addEventListener("input", () => {
      const prop = input.dataset.prop as keyof ThemeConfig;
      (currentConfig as any)[prop] = input.value;
      const hexInput = document.querySelector<HTMLInputElement>(`.tm_hex[data-for="${input.id}"]`);
      if (hexInput) hexInput.value = input.value;
      liveUpdate();
    });
  });

  // Hex text inputs — capture history on focus, sync color picker + update live
  document.querySelectorAll<HTMLInputElement>(".tm_hex[data-for]").forEach((hexInput) => {
    hexInput.addEventListener("focus", captureHistory);
    hexInput.addEventListener("blur", () => { isInteracting = false; });
    hexInput.addEventListener("input", () => {
      const colorId = hexInput.dataset.for!;
      const colorInput = document.getElementById(colorId) as HTMLInputElement | null;
      if (!colorInput) return;
      const val = hexInput.value;
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        colorInput.value = val;
        const prop = colorInput.dataset.prop as keyof ThemeConfig;
        (currentConfig as any)[prop] = val;
        liveUpdate();
      }
    });
  });

  // Range inputs — capture history on pointerdown
  document.querySelectorAll<HTMLInputElement>(".tm_range[data-prop]").forEach((input) => {
    input.addEventListener("pointerdown", captureHistory);
    input.addEventListener("input", () => {
      const prop = input.dataset.prop as keyof ThemeConfig;
      (currentConfig as any)[prop] = input.value;
      const valSpan = document.querySelector<HTMLElement>(`.tm_range_val[data-for="${input.id}"]`);
      if (valSpan) valSpan.textContent = input.value;
      liveUpdate();
    });
  });

  // Select dropdowns — capture history before change
  document.querySelectorAll<HTMLSelectElement>(".tm_select[data-prop]").forEach((sel) => {
    sel.addEventListener("focus", captureHistory);
    sel.addEventListener("blur", () => { isInteracting = false; });
    sel.addEventListener("change", () => {
      const prop = sel.dataset.prop as keyof ThemeConfig;
      if (prop === "bodyFontFamily") {
        const customRow = document.getElementById("tm_customFont_row");
        if (customRow) customRow.style.display = sel.value === "custom" ? "block" : "none";
        if (sel.value !== "custom") {
          (currentConfig as any)[prop] = sel.value;
        }
      } else {
        (currentConfig as any)[prop] = sel.value;
      }
      liveUpdate();
    });
  });

  // Custom font input
  const customFontInput = document.getElementById("tm_customFontInput") as HTMLInputElement | null;
  if (customFontInput) {
    customFontInput.addEventListener("focus", captureHistory);
    customFontInput.addEventListener("blur", () => { isInteracting = false; });
    customFontInput.addEventListener("input", () => {
      currentConfig.bodyFontFamily = customFontInput.value || "sans-serif";
      liveUpdate();
    });
  }

  // Extra CSS textarea — capture history on focus
  const extraTA = document.getElementById("tm_extraCSS") as HTMLTextAreaElement | null;
  if (extraTA) {
    extraTA.addEventListener("focus", captureHistory);
    extraTA.addEventListener("blur", () => { isInteracting = false; });
    extraTA.addEventListener("input", () => {
      currentConfig.extraCSS = extraTA.value;
      liveUpdate();
    });
  }

  // Background file upload
  const bgFile = document.getElementById("tm_bg_file") as HTMLInputElement | null;
  if (bgFile) {
    bgFile.addEventListener("change", () => {
      const file = bgFile.files?.[0];
      if (!file) return;
      pushToHistory(currentConfig);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        currentConfig.bodyBgImage = dataUrl;
        updateBgPreview(currentConfig);
        liveUpdate();
      };
      reader.readAsDataURL(file);
    });
  }

  // Background clear
  const bgClearBtn = document.getElementById("tm_bg_clear_btn");
  if (bgClearBtn) {
    bgClearBtn.addEventListener("click", () => {
      pushToHistory(currentConfig);
      currentConfig.bodyBgImage = "";
      const bgFile2 = document.getElementById("tm_bg_file") as HTMLInputElement | null;
      if (bgFile2) bgFile2.value = "";
      updateBgPreview(currentConfig);
      liveUpdate();
    });
  }

  // Player list image upload
  const playerlistBgFile = document.getElementById("tm_playerlist_bg_file") as HTMLInputElement | null;
  if (playerlistBgFile) {
    playerlistBgFile.addEventListener("change", () => {
      const file = playerlistBgFile.files?.[0];
      if (!file) return;
      pushToHistory(currentConfig);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        currentConfig.playerlistBgImage = dataUrl;
        updatePlayerlistBgPreview(currentConfig);
        liveUpdate();
      };
      reader.readAsDataURL(file);
    });
  }

  // Player list image clear
  const playerlistBgClearBtn = document.getElementById("tm_playerlist_bg_clear_btn");
  if (playerlistBgClearBtn) {
    playerlistBgClearBtn.addEventListener("click", () => {
      pushToHistory(currentConfig);
      currentConfig.playerlistBgImage = "";
      const plFile = document.getElementById("tm_playerlist_bg_file") as HTMLInputElement | null;
      if (plFile) plFile.value = "";
      updatePlayerlistBgPreview(currentConfig);
      liveUpdate();
    });
  }

  // Presets
  document.querySelectorAll<HTMLButtonElement>(".tm_preset_btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      pushToHistory(currentConfig);
      const presetName = btn.dataset.preset!;
      const preset = PRESETS[presetName] ?? {};
      setConfig({ ...DEFAULT_CONFIG, ...preset, extraCSS: currentConfig.extraCSS, bodyBgImage: currentConfig.bodyBgImage, playerlistBgImage: currentConfig.playerlistBgImage });
      syncUIFromConfig(currentConfig);
      liveUpdate();
    });
  });

  // Undo
  const undoBtn = document.getElementById("tm_undo_btn") as HTMLButtonElement | null;
  if (undoBtn) {
    undoBtn.addEventListener("click", () => {
      isInteracting = false;
      undoLastChange();
    });
  }

  // Randomize
  const randomizeBtn = document.getElementById("tm_randomize_btn");
  if (randomizeBtn) {
    randomizeBtn.addEventListener("click", () => {
      pushToHistory(currentConfig);
      setConfig(generateRandomPalette());
      syncUIFromConfig(currentConfig);
      liveUpdate();
    });
  }

  // Save
  const saveBtn = document.getElementById("tm_save_btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveThemeMakerConfig(currentConfig);
      // Also update the theme selector in settings
      const themeSelect = document.getElementById("client_themeselect") as HTMLSelectElement | null;
      if (themeSelect) {
        const customOpt = themeSelect.querySelector<HTMLOptionElement>('[value="custom"]');
        if (customOpt) customOpt.selected = true;
        const customCSSRow = document.getElementById("client_customcss_row");
        if (customCSSRow) customCSSRow.style.display = "none";
      }
      // Show saved badge
      const badge = document.getElementById("tm_saved_badge");
      if (badge) {
        badge.style.display = "inline";
        setTimeout(() => { badge.style.display = "none"; }, 2000);
      }
    });
  }

  // Export CSS
  const exportBtn = document.getElementById("tm_export_btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const css = generateCSS(currentConfig);
      downloadFile("lemmyao-theme.css", css, "text/css");
    });
  }

  // Export JSON
  const exportJsonBtn = document.getElementById("tm_export_json_btn");
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", () => {
      const json = JSON.stringify(currentConfig, null, 2);
      downloadFile("lemmyao-theme.json", json, "application/json");
    });
  }

  // Import
  const importBtn = document.getElementById("tm_import_btn");
  const importFile = document.getElementById("tm_import_file") as HTMLInputElement | null;
  if (importBtn && importFile) {
    importBtn.addEventListener("click", () => importFile.click());
    importFile.addEventListener("change", () => {
      const file = importFile.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (file.name.endsWith(".json")) {
          try {
            const parsed = JSON.parse(text) as Partial<ThemeConfig>;
            pushToHistory(currentConfig);
            setConfig({ ...DEFAULT_CONFIG, ...parsed });
            syncUIFromConfig(currentConfig);
            liveUpdate();
            alert("✅ Theme imported successfully!");
          } catch {
            alert("❌ Invalid JSON file. Please import a valid LemmyAO theme JSON.");
          }
        } else {
          // Raw CSS import — put it in extraCSS
          if (confirm("Import as raw CSS? It will be placed in the Extra CSS field (Advanced tab). This will override any extra CSS you had.")) {
            pushToHistory(currentConfig);
            currentConfig.extraCSS = text;
            const extraTA2 = document.getElementById("tm_extraCSS") as HTMLTextAreaElement | null;
            if (extraTA2) extraTA2.value = text;
            liveUpdate();
            alert("✅ CSS imported into Extra CSS field. Switch to the Advanced tab to view it.");
          }
        }
        importFile.value = "";
      };
      reader.readAsText(file);
    });
  }

  // Reset
  const resetBtn = document.getElementById("tm_reset_btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (!confirm("Reset ALL theme maker settings to defaults? This will remove your saved theme.")) return;
      pushToHistory(currentConfig);
      setConfig({ ...DEFAULT_CONFIG });
      saveThemeMakerConfig(currentConfig);
      syncUIFromConfig(currentConfig);
      liveUpdate();
      const badge = document.getElementById("tm_saved_badge");
      if (badge) {
        badge.style.display = "inline";
        badge.textContent = "🔄 Reset!";
        setTimeout(() => { badge.style.display = "none"; badge.textContent = "✅ Saved!"; }, 2000);
      }
    });
  }

  // Close
  const closeBtn = document.getElementById("tm_close_btn");
  const overlay = document.getElementById("tm_overlay");
  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => { overlay.style.display = "none"; });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });
  }

  // Keyboard close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const overlayEl = document.getElementById("tm_overlay");
      if (overlayEl && overlayEl.style.display !== "none") overlayEl.style.display = "none";
    }
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Opens the theme maker modal. Injects DOM on first call.
 */
export function openThemeMaker(): void {
  injectModalHTML();

  // Load saved config or defaults
  const saved = loadThemeMakerConfig();
  setConfig(saved ?? { ...DEFAULT_CONFIG });

  // Wire events only once
  const overlay = document.getElementById("tm_overlay")!;
  if (!overlay.dataset.wired) {
    wireEvents();
    overlay.dataset.wired = "1";
  }

  // Clear undo stack each time the modal opens and reset button state
  undoStack.length = 0;
  isInteracting = false;
  const undoBtnEl = document.getElementById("tm_undo_btn") as HTMLButtonElement | null;
  if (undoBtnEl) undoBtnEl.disabled = true;

  syncUIFromConfig(currentConfig);
  if (saved) {
    // Re-apply saved theme and update all previews
    liveUpdate();
  } else {
    // No saved config — only update the CSS preview without touching page styles
    updateCSSPreview(currentConfig);
  }
  overlay.style.display = "flex";

  // Trap focus inside modal
  const modal = document.getElementById("tm_modal");
  if (modal) modal.focus();
}

window.openThemeMaker = openThemeMaker;

/**
 * Restores a previously saved theme maker theme on page load.
 */
export function restoreThemeMaker(): void {
  const saved = loadThemeMakerConfig();
  if (saved && localStorage.getItem(LS_KEY_THEME) === "custom") {
    applyThemeMakerConfig(saved);
  }
}

window.restoreThemeMaker = restoreThemeMaker;

/**
 * Resets all theme maker settings (called from resetSettings).
 */
export function resetThemeMaker(): void {
  localStorage.removeItem(LS_KEY_CONFIG);
  // Only clear customCSS if it was set by the theme maker
  if (localStorage.getItem(LS_KEY_THEME) === "custom") {
    localStorage.removeItem(LS_KEY_CSS);
    localStorage.removeItem(LS_KEY_THEME);
  }
  setConfig({ ...DEFAULT_CONFIG });
  const el = document.getElementById("client_custom_style");
  if (el) el.remove();
}

window.resetThemeMaker = resetThemeMaker;
