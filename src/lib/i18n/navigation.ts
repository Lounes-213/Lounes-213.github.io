import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation. `Link` and `useRouter` keep the active locale in the
 * URL automatically, and `usePathname()` returns the path *without* the locale
 * prefix — which is what the language switcher needs to swap the segment while
 * staying on the same page and section.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
