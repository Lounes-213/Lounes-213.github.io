#!/usr/bin/env node
/**
 * audit-theme-bridge.mjs — keeps the Tailwind v4 bridge honest.
 *
 * Why this exists: the design system defines tokens as plain CSS custom
 * properties, and `@theme inline` exposes them to Tailwind. Two failure modes
 * are invisible until something looks broken at runtime:
 *
 *   1. A bridged name that the token layer never defines. Tailwind emits the
 *      theme declaration `--x: var(--x)` in the `theme` layer, nothing overrides
 *      it, and every utility using it resolves to a guaranteed-invalid value.
 *   2. A layer order where `theme` outranks `tokens`, which silently hands
 *      collisions with Tailwind's own defaults (radius, shadow, font, ease) to
 *      the framework instead of our scale.
 *
 * It compiles the real src/app/globals.css through the real Tailwind pipeline,
 * so a passing run also proves the stylesheet parses.
 *
 * Usage: node scripts/audit-theme-bridge.mjs [--json]
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const GLOBALS = fileURLToPath(new URL("../src/app/globals.css", import.meta.url));
const TOKENS = fileURLToPath(new URL("../src/styles/tokens.css", import.meta.url));

/** Utilities every section depends on; if one disappears the UI breaks loudly. */
const REQUIRED_UTILITIES = [
  "bg-bg",
  "bg-surface",
  "bg-accent",
  "text-fg",
  "text-fg-muted",
  "text-accent-text",
  "border-border",
  "border-border-interactive",
  "rounded-card",
  "rounded-control",
  "rounded-panel",
  "shadow-1",
  "shadow-3",
  "shadow-focus",
  "font-display",
  "font-mono",
  "text-meta",
  "text-body",
  "text-lead",
  "text-h2",
  "text-display",
  "p-section",
  "gap-stack-md",
  "max-w-content",
  "ease-out-expo",
  "dur-3",
  "glass",
  "glass-panel",
  "panel",
  "panel-raised",
  "well",
  "blueprint",
  "blueprint-focus",
  "container-page",
  "container-wide-page",
  "ltr-island",
  "tabular",
  "eyebrow",
  "link-quiet",
  "no-scrollbar",
  "z-header",
  "z-tabbar",
  "z-palette",
  "z-assistant",
];

const collectDeclarations = (css) => {
  const names = new Set();
  for (const match of css.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) names.add(match[1]);
  return names;
};

function themeEntries(globals) {
  const entries = [];
  const blocks = [...globals.matchAll(/@theme(\s+inline)?\s*\{([\s\S]*?)\n\}/g)];
  for (const block of blocks) {
    for (const decl of block[2].matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)) {
      entries.push({ name: decl[1], value: decl[2].trim(), inline: Boolean(block[1]) });
    }
  }
  return entries;
}

async function main() {
  const globals = readFileSync(GLOBALS, "utf8");
  const tokens = readFileSync(TOKENS, "utf8");
  const json = process.argv.includes("--json");

  const tokenNames = collectDeclarations(tokens);
  const entries = themeEntries(globals);

  const problems = [];
  const resolved = [];
  const forwarded = [];

  for (const entry of entries) {
    const referenced = [...entry.value.matchAll(/var\((--[a-zA-Z0-9-]+)(?:\s*,[^)]*)?\)/g)].map((m) => m[1]);
    // A same-named reference (`--x: var(--x)`) only resolves if the token layer
    // defines `--x` and outranks the theme layer.
    if (referenced.includes(entry.name)) {
      if (!tokenNames.has(entry.name)) {
        problems.push(
          `bridged token ${entry.name} is never defined in tokens.css — Tailwind will emit a self-referential declaration`,
        );
      } else {
        forwarded.push(entry.name);
      }
    }
    for (const ref of referenced) {
      if (!tokenNames.has(ref)) problems.push(`${entry.name} references ${ref}, which tokens.css never defines`);
    }
    resolved.push(entry.name);
  }

  /* Layer order: tokens must outrank theme, or Tailwind's own defaults win. */
  const layerStatement = /@layer\s+([^;]+);/.exec(globals)?.[1]?.split(",").map((s) => s.trim()) ?? [];
  const themeIndex = layerStatement.indexOf("theme");
  const tokensIndex = layerStatement.indexOf("tokens");
  if (themeIndex === -1 || tokensIndex === -1) {
    problems.push(`layer statement is missing "theme" or "tokens": found [${layerStatement.join(", ")}]`);
  } else if (tokensIndex < themeIndex) {
    problems.push(`"tokens" is declared before "theme" — Tailwind defaults would override the design system`);
  }

  if (/@import\s+["']tailwindcss["']/.test(globals) === false) {
    problems.push("globals.css does not import tailwindcss");
  }

  /* Compile with the probe candidates appended, so required utilities exist. */
  const probe = `${globals}\n@source inline("${REQUIRED_UTILITIES.join(" ")}");\n`;
  let css = "";
  try {
    css = (await postcss([tailwind()]).process(probe, { from: GLOBALS })).css;
  } catch (error) {
    problems.push(`Tailwind failed to compile globals.css: ${error.message}`);
  }

  const missingUtilities = REQUIRED_UTILITIES.filter((name) => !new RegExp(`\\.${name.replace(/[/.]/g, "\\$&")}\\s*[,{]`).test(css));
  for (const name of missingUtilities) problems.push(`required utility .${name} was not generated`);

  /* The emitted CSS must still carry our values (proves the layer order works). */
  const valueChecks = [
    ["--radius-xs: 6px", css.includes("--radius-xs: 6px")],
    ["--radius-lg: 20px", css.includes("--radius-lg: 20px")],
    ["--step-0 fluid clamp", /--step-0:\s*clamp\(/.test(css)],
    ["light --bg", /--bg:\s*#?[0-9a-fA-F]|--bg:\s*var\(--ink-25\)/.test(css)],
    ["dark fallback media query", css.includes("prefers-color-scheme: dark")],
  ];
  for (const [label, ok] of valueChecks) if (!ok) problems.push(`emitted CSS is missing ${label}`);

  const report = {
    ok: problems.length === 0,
    themeEntries: entries.length,
    sameNameForwarded: forwarded.length,
    utilitiesChecked: REQUIRED_UTILITIES.length,
    missingUtilities,
    layerOrder: layerStatement.join(" → "),
    compiledBytes: css.length,
    problems,
  };

  if (json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    process.exit(report.ok ? 0 : 1);
  }

  const lines = [
    "Theme bridge audit — Tailwind v4 ↔ design tokens",
    `  compiled globals.css: ${report.compiledBytes} bytes`,
    `  @theme entries: ${report.themeEntries} (${report.sameNameForwarded} same-name forwards)`,
    `  layer order: ${report.layerOrder}`,
    `  required utilities: ${report.utilitiesChecked - missingUtilities.length}/${report.utilitiesChecked} generated`,
  ];
  if (problems.length) {
    lines.push("", "✗ problems:");
    for (const problem of problems) lines.push(`   - ${problem}`);
    lines.push("", "✗ theme bridge is broken");
  } else {
    lines.push("", "✓ bridge integrity and utility generation verified");
  }
  process.stdout.write(`${lines.join("\n")}\n`);
  process.exit(report.ok ? 0 : 1);
}

main().catch((error) => {
  process.stderr.write(`audit-theme-bridge failed: ${error?.stack ?? error}\n`);
  process.exit(1);
});
