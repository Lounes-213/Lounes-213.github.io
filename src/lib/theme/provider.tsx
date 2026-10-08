"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_NUMERALS,
  DEFAULT_THEME_MODE,
  NUMERALS_STORAGE_KEY,
  THEME_STORAGE_KEY,
  isNumerals,
  isThemeMode,
  type Numerals,
  type ResolvedTheme,
  type ThemeMode,
} from "./script";
import { applyThemeChange, type TransitionOrigin } from "./transitions";

/** Layout effects warn during SSR; the provider is server-rendered too. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type ThemeContextValue = {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  numerals: Numerals;
  setMode: (mode: ThemeMode, origin?: TransitionOrigin) => void;
  toggle: (origin?: TransitionOrigin) => void;
  setNumerals: (numerals: Numerals) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * The provider *adopts* the state the pre-paint script already applied instead of
 * recomputing it, so the first client render matches the DOM exactly.
 *
 * Rule for consumers: theme state may not influence server-rendered markup.
 * Icons and other theme-dependent visuals switch through CSS attribute selectors
 * (`[data-theme="dark"] &`), which work before hydration and cannot mismatch.
 */
/* Storage readers — the same fallbacks the pre-paint script uses, so an
   adopted state and a stored preference can never disagree. */
const readStoredMode = (): ThemeMode => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
};

const readStoredNumerals = (): Numerals => {
  try {
    const stored = window.localStorage.getItem(NUMERALS_STORAGE_KEY);
    return isNumerals(stored) ? stored : DEFAULT_NUMERALS;
  } catch {
    return DEFAULT_NUMERALS;
  }
};

function readDomState(): { mode: ThemeMode; resolved: ResolvedTheme; numerals: Numerals } {
  if (typeof document === "undefined") {
    return { mode: DEFAULT_THEME_MODE, resolved: "light", numerals: DEFAULT_NUMERALS };
  }
  const root = document.documentElement;
  const modeAttr = root.getAttribute("data-theme-mode");
  const themeAttr = root.getAttribute("data-theme");
  const numeralsAttr = root.getAttribute("data-numerals");

  // Attributes are the primary source; storage is the fallback for when they
  // are missing (a hydration repair can drop them before this runs).
  const mode = isThemeMode(modeAttr) ? modeAttr : readStoredMode();
  const resolved: ResolvedTheme =
    themeAttr === "dark" || themeAttr === "light"
      ? themeAttr
      : mode !== "system"
        ? mode
        : typeof window !== "undefined" && window.matchMedia(DARK_QUERY).matches
          ? "dark"
          : "light";
  return {
    mode,
    resolved,
    numerals: isNumerals(numeralsAttr) ? numeralsAttr : readStoredNumerals(),
  };
}

const resolveFor = (mode: ThemeMode): ResolvedTheme => {
  if (mode !== "system") return mode;
  if (typeof window === "undefined") return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(readDomState);
  const pathname = usePathname();

  /*
   * Repair pass: applying a new server payload can leave React having patched
   * only `lang`/`dir` while the theme attributes were dropped from <html>.
   * Re-stating the resolved preference after every navigation (and on mount)
   * keeps CSS, the controls and storage in agreement — run as a layout effect
   * so it lands before the repaired page paints.
   */
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", state.resolved);
    root.setAttribute("data-theme-mode", state.mode);
    root.setAttribute("data-numerals", state.numerals);
    root.setAttribute("data-js", "on");
  }, [pathname, state.resolved, state.mode, state.numerals]);

  /* System preference changes while in "system" mode follow live. */
  useEffect(() => {
    if (state.mode !== "system") return;
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      const resolved = media.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", resolved);
      setState((prev) => ({ ...prev, resolved }));
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [state.mode]);

  /* Another tab changing the theme is reflected here too. */
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== NUMERALS_STORAGE_KEY) return;
      const next = readDomState();
      const resolved = resolveFor(next.mode);
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.setAttribute("data-theme-mode", next.mode);
      document.documentElement.setAttribute("data-numerals", next.numerals);
      setState({ mode: next.mode, resolved, numerals: next.numerals });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setMode = useCallback((mode: ThemeMode, origin: TransitionOrigin = null) => {
    const resolved = resolveFor(mode);
    applyThemeChange(() => {
      const root = document.documentElement;
      root.setAttribute("data-theme", resolved);
      root.setAttribute("data-theme-mode", mode);
    }, origin);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      /* storage unavailable (private mode): the session still works */
    }
    setState((prev) => ({ ...prev, mode, resolved }));
  }, []);

  const setNumerals = useCallback((numerals: Numerals) => {
    applyThemeChange(() => {
      document.documentElement.setAttribute("data-numerals", numerals);
    });
    try {
      window.localStorage.setItem(NUMERALS_STORAGE_KEY, numerals);
    } catch {
      /* ignore */
    }
    setState((prev) => ({ ...prev, numerals }));
  }, []);

  const toggle = useCallback(
    (origin: TransitionOrigin = null) => {
      setMode(state.resolved === "dark" ? "light" : "dark", origin);
    },
    [setMode, state.resolved],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ ...state, setMode, toggle, setNumerals }),
    [state, setMode, toggle, setNumerals],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}

/**
 * True only after hydration. Use it to defer anything whose markup would differ
 * between the server render and the visitor's stored preferences.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Numerals preference, safe for SSR: Latin digits until mounted. */
export function useNumerals(): Numerals {
  const { numerals } = useTheme();
  const mounted = useMounted();
  return mounted ? numerals : DEFAULT_NUMERALS;
}
