/**
 * probe-theme.mjs — verifies how the Tailwind v4 token bridge resolves before we
 * rely on it for every component. Answers three questions empirically:
 *   1. Does `@theme inline` avoid emitting the theme variable (no self-reference)?
 *   2. Do utilities generated from inline entries reference the design token?
 *   3. Does the layer order let our token values win over Tailwind's defaults?
 *
 * Run: node scripts/probe-theme.mjs
 */
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const probe = `
@layer theme, tokens, base, components, utilities;
@import "tailwindcss";

@layer tokens {
  :root {
    --radius-xs: 6px;
    --radius-card: 20px;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --font-display: "Probe Serif", serif;
    --shadow-1: 0 1px 2px rgb(16 24 40 / 0.06);
    --bg: #fbfcfd;
  }
}

@theme inline {
  --color-bg: var(--bg);
  --radius-xs: var(--radius-xs);
  --radius-card: var(--radius-card);
  --font-display: var(--font-display);
  --shadow-1: var(--shadow-1);
  --ease-out-expo: var(--ease-out-expo);
}

@source inline("rounded-xs rounded-card shadow-1 ease-out-expo font-display bg-bg");
`;

const result = await postcss([tailwind()]).process(probe, { from: "probe.css" });
const css = result.css;

const find = (needle) => {
  const index = css.indexOf(needle);
  return index === -1 ? null : css.slice(index, css.indexOf("}", index) + 1).trim();
};

const report = {
  inlineThemeEmitsVariable: /--radius-xs:\s*6px/.test(css),
  selfReferencePresent: /--radius-xs:\s*var\(--radius-xs\)/.test(css),
  utilities: {
    "rounded-xs": find(".rounded-xs"),
    "rounded-card": find(".rounded-card"),
    "shadow-1": find(".shadow-1"),
    "ease-out-expo": find(".ease-out-expo"),
    "font-display": find(".font-display"),
    "bg-bg": find(".bg-bg"),
  },
  tokenValueSurvives: /--radius-xs:\s*6px/.test(css),
  tailwindDefaultRadiusStillPresent: /--radius-xs:\s*0\.125rem/.test(css),
};

console.log(JSON.stringify(report, null, 2));
