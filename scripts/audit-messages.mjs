#!/usr/bin/env node
/**
 * audit-messages.mjs — the guarantee that no locale renders a half-translated UI.
 *
 * TypeScript can only type the default catalogue, so a key missing from fr.json
 * or ar.json would fail at runtime, in front of a visitor. This audit makes the
 * three catalogues provably parallel before that can happen:
 *
 *   1. every locale parses and exposes the same key set;
 *   2. no message is empty or whitespace-only;
 *   3. ICU placeholders match across locales (a translated string cannot drop
 *      `{name}` and render a sentence with a hole in it);
 *   4. Arabic plural messages cover the categories Arabic actually has
 *      (zero/one/two/few/many/other) — English rules do not apply there.
 *
 * Usage: node scripts/audit-messages.mjs [--json]
 */

import { readFileSync } from "node:fs";

const locales = ["en", "fr", "ar"];
const base = new URL("../messages/", import.meta.url);

const flatten = (value, prefix = "") => {
  const out = new Map();
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) {
      for (const [nested, nestedValue] of flatten(child, path)) out.set(nested, nestedValue);
    } else {
      out.set(path, child);
    }
  }
  return out;
};

const placeholdersOf = (message) => {
  // Only argument positions count: `{name}`, `{count, plural, …}`. Text inside a
  // plural branch (`one {# year}`) is output, not a placeholder — matching it
  // would make the parity check fire on correctly translated plurals.
  const names = new Set();
  for (const match of String(message).matchAll(/\{\s*([a-zA-Z0-9_]+)\s*(?=[,}])/g)) names.add(match[1]);
  return [...names].sort();
};

const pluralCategoriesOf = (message) => {
  const categories = new Set();
  for (const match of String(message).matchAll(/\b(zero|one|two|few|many|other)\s*\{/g)) categories.add(match[1]);
  return [...categories].sort();
};

const ARABIC_CATEGORIES = ["zero", "one", "two", "few", "many", "other"];

const catalogues = new Map();
const problems = [];

for (const locale of locales) {
  const file = new URL(`${locale}.json`, base);
  try {
    catalogues.set(locale, flatten(JSON.parse(readFileSync(file, "utf8"))));
  } catch (error) {
    problems.push(`messages/${locale}.json is not valid JSON: ${error.message}`);
  }
}

const [defaultLocale, ...others] = locales;
const reference = catalogues.get(defaultLocale) ?? new Map();

if (reference.size > 0) {
  for (const locale of others) {
    const catalogue = catalogues.get(locale);
    if (!catalogue) continue;

    for (const key of reference.keys()) {
      if (!catalogue.has(key)) problems.push(`messages/${locale}.json is missing key "${key}"`);
    }
    for (const key of catalogue.keys()) {
      if (!reference.has(key)) problems.push(`messages/${locale}.json has extra key "${key}" not present in ${defaultLocale}.json`);
    }

    for (const [key, message] of catalogue) {
      const sourceMessage = reference.get(key);
      if (sourceMessage === undefined) continue;

      if (typeof message !== "string" || message.trim() === "") {
        problems.push(`messages/${locale}.json → "${key}" is empty`);
        continue;
      }

      const expected = placeholdersOf(sourceMessage);
      const actual = placeholdersOf(message);
      const missing = expected.filter((name) => !actual.includes(name));
      const extra = actual.filter((name) => !expected.includes(name));
      if (missing.length) problems.push(`messages/${locale}.json → "${key}" is missing placeholder(s): ${missing.join(", ")}`);
      if (extra.length) problems.push(`messages/${locale}.json → "${key}" uses unknown placeholder(s): ${extra.join(", ")}`);

      // Arabic plurals: an English-shaped plural renders the wrong form for
      // counts of 2, 3-10 and 11+ respectively.
      if (locale === "ar" && /\{\s*\w+\s*,\s*plural/.test(message)) {
        const categories = pluralCategoriesOf(message);
        const absent = ARABIC_CATEGORIES.filter((category) => !categories.includes(category));
        if (absent.length) {
          problems.push(`messages/ar.json → "${key}" plural is missing Arabic categories: ${absent.join(", ")}`);
        }
      }
    }
  }

  for (const [key, message] of reference) {
    if (typeof message !== "string" || message.trim() === "") problems.push(`messages/${defaultLocale}.json → "${key}" is empty`);
  }
}

const report = {
  ok: problems.length === 0,
  locales,
  keysPerLocale: Object.fromEntries([...catalogues].map(([locale, catalogue]) => [locale, catalogue.size])),
  problems,
};

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(report.ok ? 0 : 1);
}

const lines = [
  "i18n catalogue audit — key parity, placeholders, Arabic plurals",
  `  keys per locale: ${locales.map((locale) => `${locale} ${report.keysPerLocale[locale] ?? 0}`).join(" · ")}`,
];
if (problems.length) {
  lines.push("", "✗ problems:");
  for (const problem of problems) lines.push(`   - ${problem}`);
  lines.push("", "✗ catalogue is not translation-complete");
} else {
  lines.push("", `✓ ${reference.size} keys identical across ${locales.length} locales, placeholders aligned`);
}
process.stdout.write(`${lines.join("\n")}\n`);
process.exit(report.ok ? 0 : 1);
