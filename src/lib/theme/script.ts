/**
 * Theme contract.
 *
 * `data-theme` on <html> holds the *resolved* theme (light | dark) — it is what
 * CSS reads. `data-theme-mode` holds the *preference* (system | light | dark) —
 * it is what the UI reflects. Keeping them separate is what lets "follow the
 * system" stay live without fighting an explicit choice.
 */
export const THEME_STORAGE_KEY = "portfolio.theme";
export const NUMERALS_STORAGE_KEY = "portfolio.numerals";

export const THEME_MODES = ["system", "light", "dark"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];
export type ResolvedTheme = "light" | "dark";
export type Numerals = "latn" | "arab";

export const DEFAULT_THEME_MODE: ThemeMode = "light";
export const DEFAULT_NUMERALS: Numerals = "latn";

export const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === "string" && (THEME_MODES as readonly string[]).includes(value);

export const isNumerals = (value: unknown): value is Numerals => value === "latn" || value === "arab";

/**
 * Blocking script injected into <head> before any markup is parsed.
 * Defaults to "light" theme unless explicitly set to "dark" in localStorage.
 */
export const themeInitScript = `(function(){try{
var d=document.documentElement;
var mode="light";
try{var stored=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(stored==="light"||stored==="dark"||stored==="system"){mode=stored}}catch(e){}
var resolved=mode==="system"?(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):mode;
d.setAttribute("data-theme",resolved);
d.setAttribute("data-theme-mode",mode);
var numerals="latn";
try{var n=localStorage.getItem(${JSON.stringify(NUMERALS_STORAGE_KEY)});if(n==="arab"){numerals="arab"}}catch(e){}
d.setAttribute("data-numerals",numerals);
d.setAttribute("data-js","on");
}catch(e){}})();`;
