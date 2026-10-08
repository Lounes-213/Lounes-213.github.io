#!/usr/bin/env node
/**
 * audit-contrast.mjs — the design system's machine-checked contract.
 *
 * It reads src/styles/tokens.css and verifies, for both themes:
 *   1. Light/dark token *parity*   — every semantic colour exists in both.
 *   2. Fallback *equality*         — the no-JS prefers-color-scheme block is
 *                                    value-equivalent to [data-theme="dark"].
 *   3. WCAG 2.2 (1.4.3 / 1.4.11) contrast ratios for every text and UI pair
 *      the product actually renders.
 *
 * Usage: node scripts/audit-contrast.mjs [--list] [--json]
 * Exit code 1 on any violation, so `npm run audit:contrast` is CI-safe.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const TOKENS_PATH = fileURLToPath(new URL("../src/styles/tokens.css", import.meta.url));

/* ── 1. CSS → block model ────────────────────────────────────────────────── */

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

function parseBlocks(css) {
  const src = stripComments(css);
  const blocks = [];
  const stack = [];
  let buf = "";

  for (const ch of src) {
    if (ch === "{") {
      const prelude = buf.trim();
      const parent = stack[stack.length - 1];
      // Only *conditional* group rules matter for theme classification; a
      // decorative @layer wrapper must not change how a block is read.
      const conditionalParent =
        parent && parent.kind === "atrule" && /^@(media|supports|container)/i.test(parent.prelude);
      const context = parent ? [...parent.context, ...(conditionalParent ? [parent.prelude] : [])] : [];
      stack.push({
        prelude,
        kind: prelude.startsWith("@") ? "atrule" : "rule",
        decls: new Map(),
        props: new Map(),
        context,
      });
      buf = "";
    } else if (ch === "}") {
      const node = stack.pop();
      if (node && node.kind === "rule") blocks.push(node);
      buf = "";
    } else if (ch === ";") {
      const parent = stack[stack.length - 1];
      const decl = buf.trim();
      if (parent && parent.kind === "rule") {
        const idx = decl.indexOf(":");
        if (idx > 0) {
          const name = decl.slice(0, idx).trim();
          const value = decl.slice(idx + 1).trim().replace(/\s+/g, " ");
          if (name.startsWith("--")) parent.decls.set(name.replace(/^--/, ""), value);
          else parent.props.set(name, value);
        }
      }
      buf = "";
    } else {
      buf += ch;
    }
  }
  return blocks;
}

const selectorsOf = (prelude) => prelude.split(",").map((s) => s.trim().replace(/\s+/g, " "));

/* ── 2. Colour engine (hex, rgb(), color-mix(), var() + alpha compositing) ─ */

const NAMED = { transparent: { r: 0, g: 0, b: 0, a: 0 }, white: { r: 255, g: 255, b: 255, a: 1 }, black: { r: 0, g: 0, b: 0, a: 1 } };

function parseColor(input) {
  if (!input) return null;
  const value = input.trim().toLowerCase();
  if (value === "transparent") return { ...NAMED.transparent };
  if (NAMED[value]) return { ...NAMED[value] };

  const hex = /^#([0-9a-f]{3,8})$/.exec(value);
  if (hex) {
    const h = hex[1];
    const expand = h.length <= 4 ? h.split("").map((c) => c + c).join("") : h;
    const r = parseInt(expand.slice(0, 2), 16);
    const g = parseInt(expand.slice(2, 4), 16);
    const b = parseInt(expand.slice(4, 6), 16);
    const a = expand.length === 8 ? parseInt(expand.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }

  const rgb = /^rgba?\(([^)]+)\)$/.exec(value);
  if (rgb) {
    const body = rgb[1].replace(/\//g, " ").replace(/,/g, " ").trim();
    const parts = body.split(/\s+/);
    if (parts.length < 3) return null;
    const channel = (raw) => (raw.endsWith("%") ? Math.round((parseFloat(raw) / 100) * 255) : parseFloat(raw));
    const alpha = parts[3] === undefined ? 1 : parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    return { r: channel(parts[0]), g: channel(parts[1]), b: channel(parts[2]), a: alpha };
  }

  return null;
}

/** Split on a delimiter that is not nested inside parentheses. */
function splitTopLevel(input, delimiter) {
  const out = [];
  let depth = 0;
  let current = "";
  for (const ch of input) {
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (ch === delimiter && depth === 0) {
      out.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  out.push(current);
  return out;
}

function splitVarArgs(inner) {
  const parts = splitTopLevel(inner, ",");
  const name = parts[0].trim();
  const fallback = parts.length > 1 ? parts.slice(1).join(",").trim() : null;
  return { name, fallback };
}

/** Resolve var() chains against a theme map. */
function resolveToken(name, theme, seen = new Set()) {
  const key = name.replace(/^--/, "");
  if (seen.has(key)) return null;
  seen.add(key);
  const raw = theme.get(key);
  if (raw === undefined) return null;
  const varMatch = /^var\(\s*([^)]*)\)$/.exec(raw.trim());
  if (varMatch) {
    const { name: ref, fallback } = splitVarArgs(varMatch[1]);
    const resolved = resolveToken(ref.trim(), theme, seen);
    if (resolved !== null) return resolved;
    return fallback ?? null;
  }
  return raw;
}

/** Resolve a full CSS value that may contain var() references anywhere. */
function resolveValue(value, theme) {
  if (typeof value !== "string") return null;
  return value.replace(/var\(\s*([^)]*)\)/g, (whole, inner) => {
    const { name, fallback } = splitVarArgs(inner);
    return resolveToken(name.trim(), theme) ?? fallback ?? whole;
  });
}

function composite(foreground, backdrop) {
  const a = foreground.a;
  return {
    r: foreground.r * a + backdrop.r * (1 - a),
    g: foreground.g * a + backdrop.g * (1 - a),
    b: foreground.b * a + backdrop.b * (1 - a),
    a: 1,
  };
}

/** Resolve a colour token to an opaque sRGB triple over a given backdrop. */
function resolveColor(token, theme, backdrop = null) {
  const raw = resolveValue(resolveToken(token, theme), theme);
  if (raw === null) return { error: `unresolved token --${token}` };
  return resolveColorValue(raw, theme, backdrop);
}

function resolveColorValue(raw, theme, backdrop = null) {
  const value = raw.trim();

  if (/^color-mix\(/i.test(value)) {
    const inner = value.slice(value.indexOf("(") + 1, value.lastIndexOf(")"));
    const parts = splitTopLevel(inner, ",").map((p) => p.trim());
    if (parts.length < 3 || !/^in\s+srgb$/i.test(parts[0])) {
      return { error: `unsupported color-mix: ${value}` };
    }
    const layer = (part, defaultWeight) => {
      const bits = splitTopLevel(part, " ").filter(Boolean);
      const weight = bits.length > 1 && bits[bits.length - 1].endsWith("%") ? parseFloat(bits[bits.length - 1]) / 100 : defaultWeight;
      return { color: resolveColorValue(bits[0], theme, backdrop), weight };
    };
    const first = layer(parts[1], null);
    const second = layer(parts[2], null);
    const w1 = first.weight ?? (second.weight === null ? 0.5 : 1 - second.weight);
    const w2 = second.weight ?? 1 - w1;
    const total = w1 + w2;
    if (first.color.error) return first.color;
    if (second.color.error) return second.color;
    const a = first.color.a * w1 + second.color.a * w2;
    if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
    const premultiplied = (channel) => first.color[channel] * first.color.a * w1 + second.color[channel] * second.color.a * w2;
    const mixed = {
      r: premultiplied("r") / (a * total),
      g: premultiplied("g") / (a * total),
      b: premultiplied("b") / (a * total),
      a: a / total,
    };
    return mixed.a < 1 && backdrop ? composite(mixed, backdrop) : mixed;
  }

  const parsed = parseColor(value);
  if (!parsed) return { error: `unparsable colour: ${value}` };
  if (parsed.a < 1 && backdrop) return composite(parsed, backdrop);
  return parsed;
}

/* ── 3. Contrast maths (WCAG 2.x relative luminance) ─────────────────────── */

const channelLuminance = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const luminance = (c) => 0.2126 * channelLuminance(c.r) + 0.7152 * channelLuminance(c.g) + 0.0722 * channelLuminance(c.b);

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const fmt = (c) => `rgb(${Math.round(c.r)} ${Math.round(c.g)} ${Math.round(c.b)})`;

/* ── 4. The contract: every pair the product actually paints ─────────────── */

const TEXT = 4.5; // WCAG 1.4.3 normal text (and 1.4.6 for the bold-but-small cases)
const UI = 3; // WCAG 1.4.11 non-text contrast / large text

const REQUIRED = [
  // Body copy on each surface it can land on
  ["text", "Primary text on page", "fg", "bg", TEXT],
  ["text", "Primary text on card", "fg", "surface", TEXT],
  ["text", "Primary text on raised card", "fg", "surface-raised", TEXT],
  ["text", "Primary text on sunken panel", "fg", "surface-sunken", TEXT],
  ["text", "Secondary text on page", "fg-muted", "bg", TEXT],
  ["text", "Secondary text on card", "fg-muted", "surface", TEXT],
  ["text", "Tertiary text on page", "fg-subtle", "bg", TEXT],
  ["text", "Tertiary text on card", "fg-subtle", "surface", TEXT],
  ["text", "Inverted text on inverse panel", "fg-on-inverse", "surface-inverse", TEXT],

  // Accent family
  ["accent", "Accent text on page", "accent-text", "bg", TEXT],
  ["accent", "Accent text on card", "accent-text", "surface", TEXT],
  ["accent", "Label on accent chip", "accent-soft-text", "accent-soft", TEXT],
  ["accent", "Label on accent solid", "accent-on-solid", "accent-solid", TEXT],
  ["accent", "Accent solid against page (button edge)", "accent-solid", "bg", UI],
  ["accent", "Accent solid against card", "accent-solid", "surface", UI],

  // Status families
  ["status", "Success text on page", "success-text", "bg", TEXT],
  ["status", "Success chip label", "success-soft-text", "success-soft", TEXT],
  ["status", "Success solid + label", "success-on-solid", "success-solid", TEXT],
  ["status", "Warning text on page", "warning-text", "bg", TEXT],
  ["status", "Warning chip label", "warning-soft-text", "warning-soft", TEXT],
  ["status", "Warning solid + label", "warning-on-solid", "warning-solid", TEXT],
  ["status", "Danger text on page", "danger-text", "bg", TEXT],
  ["status", "Danger chip label", "danger-soft-text", "danger-soft", TEXT],
  ["status", "Danger solid + label", "danger-on-solid", "danger-solid", TEXT],
  ["status", "Info text on page", "info-text", "bg", TEXT],
  ["status", "Info chip label", "info-soft-text", "info-soft", TEXT],
  ["status", "Info solid + label", "info-on-solid", "info-solid", TEXT],

  // Interaction: focus ring, selection, boundaries
  ["interaction", "Focus ring on page", "focus-ring", "bg", UI],
  ["interaction", "Focus ring on card", "focus-ring", "surface", UI],
  ["interaction", "Selected text on highlight", "selection-fg", "selection-bg", TEXT],
  ["interaction", "Interactive boundary on page (inputs, outline buttons)", "border-interactive", "bg", UI],
  ["interaction", "Interactive boundary on card", "border-interactive", "surface", UI],
  ["interaction", "Interactive boundary on raised card", "border-interactive", "surface-raised", UI],

  // Diagrams — a diagram label is text, an edge is a non-text graphic
  ["diagram", "Diagram node label", "diagram-node-fg", "diagram-node-bg", TEXT],
  ["diagram", "Diagram edge on page", "diagram-edge", "bg", UI],
  ["diagram", "Active diagram accent on page", "diagram-active", "bg", UI],
  ["diagram", "Active label on node", "diagram-active", "diagram-node-bg", UI],
];

/** Reported for information only — decoration is exempt from 1.4.11. */
const INFORMATIONAL = [
  ["Hairline on page", "border", "bg"],
  ["Prominent hairline on page", "border-strong", "bg"],
  ["Prominent hairline on card", "border-strong", "surface"],
  ["Subtle hairline on page", "border-subtle", "bg"],
  ["Blueprint grid on page", "grid-line", "bg"],
  ["Disabled text on page", "fg-disabled", "bg"],
  ["Media frame on page", "media-frame", "bg"],
  ["Scrim over page", "scrim", "bg"],
];

/* ── 5. Theme assembly ───────────────────────────────────────────────────── */

const mergeMaps = (maps) => {
  const out = new Map();
  for (const map of maps) for (const [k, v] of map) out.set(k, v);
  return out;
};

function buildThemes(css) {
  const blocks = parseBlocks(css);
  const ctx = (block) => block.context.join(" && ");
  const hasSelector = (block, needle) => selectorsOf(block.prelude).some((s) => s.includes(needle));

  const rootBlocks = blocks.filter((b) => b.context.length === 0 && selectorsOf(b.prelude).includes(":root"));
  const lightBlock = rootBlocks.find((b) => (b.props.get("color-scheme") ?? "").includes("light"));
  const darkBlocks = blocks.filter((b) => b.context.length === 0 && hasSelector(b, '[data-theme="dark"]'));
  const fallbackBlocks = blocks.filter(
    (b) => /prefers-color-scheme:\s*dark/.test(ctx(b)) && hasSelector(b, ':root:not([data-theme="light"])'),
  );
  const fallbackSet = new Set(fallbackBlocks);
  const conditional = blocks.filter(
    (b) => b.context.length > 0 && !fallbackSet.has(b),
  );

  const base = mergeMaps(rootBlocks.map((b) => b.decls));
  const lightTheme = lightBlock ? lightBlock.decls : new Map();
  const darkTheme = mergeMaps(darkBlocks.map((b) => b.decls));
  const darkFallback = mergeMaps(fallbackBlocks.map((b) => b.decls));

  return {
    themes: {
      light: base,
      dark: mergeMaps([base, darkTheme]),
    },
    lightTheme,
    darkTheme,
    darkFallback,
    conditionalBlocks: conditional.length,
  };
}

/* ── 6. Checks ───────────────────────────────────────────────────────────── */

function auditTheme(name, theme) {
  const rows = [];
  const failures = [];

  for (const [category, label, fgToken, bgToken, min] of REQUIRED) {
    const bg = resolveColor(bgToken, theme, null);
    if (bg.error) {
      failures.push({ category, label, error: bg.error });
      continue;
    }
    const fg = resolveColor(fgToken, theme, bg);
    if (fg.error) {
      failures.push({ category, label, error: fg.error });
      continue;
    }
    const value = ratio(fg, bg);
    const row = { category, label, ratio: value, min, pass: value >= min - 0.005, fg: fmt(fg), bg: fmt(bg) };
    rows.push(row);
    if (!row.pass) failures.push(row);
  }

  const notes = INFORMATIONAL.map(([label, fgToken, bgToken]) => {
    const bg = resolveColor(bgToken, theme, null);
    const fg = bg.error ? bg : resolveColor(fgToken, theme, bg);
    return { label, ratio: fg.error ? null : ratio(fg, bg), note: fg.error ?? null };
  });

  return { name, rows, failures, notes };
}

function parityReport(light, dark) {
  const missingInDark = [...light.keys()].filter((k) => !dark.has(k));
  const missingInLight = [...dark.keys()].filter((k) => !light.has(k));
  return { missingInDark, missingInLight };
}

function fallbackReport(darkTheme, darkFallback) {
  const drifted = [];
  for (const [name, value] of darkTheme) {
    if (!darkFallback.has(name)) {
      drifted.push({ name, explicit: value, fallback: "<missing>" });
      continue;
    }
    if (darkFallback.get(name) !== value) {
      drifted.push({ name, explicit: value, fallback: darkFallback.get(name) });
    }
  }
  for (const [name, value] of darkFallback) {
    if (!darkTheme.has(name)) drifted.push({ name, explicit: "<missing>", fallback: value });
  }
  return drifted;
}

/* ── 7. Report ───────────────────────────────────────────────────────────── */

const MARK = { pass: "\u2713", fail: "\u2717", info: "\u00b7" };

function printReport(report, { list }) {
  const { parity, drifted, themes, conditionalBlocks, tokenCounts } = report;
  const lines = [];

  lines.push("Design-token contrast audit \u2014 WCAG 2.2 AA");
  lines.push(`Source: ${report.source.replace(process.cwd(), ".")}`);
  lines.push("");

  lines.push("1. Theme parity & fallback equality");
  const parityOk = parity.missingInDark.length === 0 && parity.missingInLight.length === 0;
  lines.push(
    `   ${parityOk ? MARK.pass : MARK.fail} semantic tokens per theme: light ${tokenCounts.light}, dark ${tokenCounts.dark}`,
  );
  if (!parityOk) {
    if (parity.missingInDark.length) lines.push(`      missing in dark: ${parity.missingInDark.join(", ")}`);
    if (parity.missingInLight.length) lines.push(`      missing in light: ${parity.missingInLight.join(", ")}`);
  }
  lines.push(
    `   ${drifted.length === 0 ? MARK.pass : MARK.fail} no-JS dark fallback matches [data-theme="dark"]` +
      (drifted.length ? ` (${drifted.length} drifted)` : ""),
  );
  for (const d of drifted.slice(0, 8)) {
    lines.push(`      --${d.name}: explicit=${d.explicit} fallback=${d.fallback}`);
  }
  lines.push(`   ${MARK.info} ${conditionalBlocks} conditional override block(s) (contrast/transparency) not audited`);
  lines.push("");

  for (const theme of themes) {
    const errors = theme.failures.filter((f) => f.error);
    lines.push(
      `2. ${theme.name === "light" ? "Light" : "Dark"} theme — ${theme.rows.length}/${REQUIRED.length} pairs resolved` +
        (errors.length ? `, ${errors.length} unresolved` : ""),
    );
    for (const err of errors) {
      lines.push(`     ${MARK.fail} ${err.label}: ${err.error}`);
    }
    let category = "";
    for (const row of theme.rows) {
      if (row.category !== category) {
        category = row.category;
        lines.push(`   ${category}`);
      }
      const value = row.ratio.toFixed(2);
      lines.push(
        `     ${row.pass ? MARK.pass : MARK.fail} ${row.label.padEnd(42)} ${value.padStart(6)}:1  (min ${row.min})` +
          (row.pass ? "" : `   fg ${row.fg} / bg ${row.bg}`),
      );
    }
    lines.push("   informational (decorative, exempt):");
    for (const note of theme.notes) {
      const value = note.ratio === null ? "n/a" : `${note.ratio.toFixed(2)}:1`;
      lines.push(`     ${MARK.info} ${note.label.padEnd(42)} ${value.padStart(6)}`);
    }
    lines.push("");
  }

  if (list) {
    lines.push("3. Colour tokens (composited over the page background)");
    for (const [themeName, theme] of Object.entries(report.themeMaps)) {
      lines.push(`   ${themeName}`);
      const backdrop = resolveColor("bg", theme, null);
      const names = [...theme.keys()].filter((n) =>
        /^(bg|surface|fg|border|accent|success|warning|danger|info|focus|selection|scrim|glass|grid|blueprint|diagram|media|shadow|scrollbar)/.test(
          n,
        ),
      );
      for (const n of names.sort()) {
        const resolved = resolveColor(n, theme, backdrop);
        lines.push(`     ${`--${n}`.padEnd(28)} ${resolved.error ?? fmt(resolved)}`);
      }
    }
    lines.push("");
  }

  const totalFailures = themes.reduce((sum, t) => sum + t.failures.length, 0);
  const checks = themes.reduce((sum, t) => sum + t.rows.length, 0);
  const ok = totalFailures === 0 && parityOk && drifted.length === 0;
  lines.push(`${ok ? MARK.pass : MARK.fail} ${checks} contrast pairs checked, ${totalFailures} failing, ${checks - totalFailures} passing`);
  if (!ok) lines.push("   Fix the tokens in src/styles/tokens.css \u2014 never lower a requirement.");

  return { text: lines.join("\n"), ok, totalFailures, checks };
}

/* ── 8. Entry point ──────────────────────────────────────────────────────── */

function main() {
  const args = process.argv.slice(2);
  const css = readFileSync(TOKENS_PATH, "utf8");
  const built = buildThemes(css);

  const themes = [auditTheme("light", built.themes.light), auditTheme("dark", built.themes.dark)];
  const parity = parityReport(built.lightTheme, built.darkTheme);
  const drifted = fallbackReport(built.darkTheme, built.darkFallback);

  const report = {
    source: TOKENS_PATH,
    themes,
    parity,
    drifted,
    conditionalBlocks: built.conditionalBlocks,
    tokenCounts: { light: built.lightTheme.size, dark: built.darkTheme.size },
    themeMaps: { light: built.themes.light, dark: built.themes.dark },
  };

  if (args.includes("--json")) {
    const { themeMaps, ...serialisable } = report;
    const ok =
      themes.every((t) => t.failures.length === 0) &&
      parity.missingInDark.length === 0 &&
      parity.missingInLight.length === 0 &&
      drifted.length === 0;
    process.stdout.write(`${JSON.stringify({ ok, ...serialisable }, null, 2)}\n`);
    process.exit(ok ? 0 : 1);
  }

  const { text, ok } = printReport(report, { list: args.includes("--list") });
  process.stdout.write(`${text}\n`);
  process.exit(ok ? 0 : 1);
}

main();
