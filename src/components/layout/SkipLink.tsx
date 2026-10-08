import { getTranslations } from "next-intl/server";

/**
 * First focusable element on every page. It stays visually hidden until it is
 * focused, then appears over the header — the standard way to let keyboard users
 * bypass the navigation, and the only piece of "skip navigation" a single-page
 * layout needs.
 */
export async function SkipLink() {
  const t = await getTranslations("a11y");

  return (
    <a
      href="#main"
      className="glass-panel sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:start-3 focus-visible:z-toast focus-visible:px-4 focus-visible:py-2 focus-visible:text-body"
    >
      {t("skipToContent")}
    </a>
  );
}
