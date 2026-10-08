# Design system

The aesthetic brief is *engineering-meets-editorial*: strong typographic
hierarchy, generous whitespace, blueprint motifs, glass used sparingly, and
exactly one saturated voice. Everything is expressed as tokens in
[`src/styles/tokens.css`](../src/styles/tokens.css) and verified by
`npm run audit:contrast` — the rules below are what the tokens encode.

## 1. Colour architecture

Three layers, and a component is only ever allowed to touch the third:

```
primitives      --ink-*, --brand-*, --jade-*, --amber-*, --crimson-*
                      ↓  (theme mapping, light + dark)
semantic        --bg, --surface, --fg, --accent-solid, --border-interactive, …
                      ↓  (Tailwind bridge, Part 2)
utilities       bg-surface · text-fg-muted · border-interactive · ring-accent
```

Primitives exist so a palette change is one edit; semantic tokens exist so a
theme change is not a search-and-replace. Components that reference `--ink-600`
directly are a bug.

### Semantic families

| Purpose | Tokens |
| --- | --- |
| Page & surfaces | `--bg`, `--bg-subtle`, `--surface`, `--surface-raised`, `--surface-sunken`, `--surface-inverse`, `--fg-on-inverse` |
| Text | `--fg`, `--fg-muted`, `--fg-subtle`, `--fg-disabled` |
| Borders | `--border`, `--border-subtle`, `--border-strong` (decorative) · `--border-interactive` (controls, ≥3:1) |
| Accent | `--accent-solid`, `--accent-on-solid`, `--accent-text`, `--accent-soft`, `--accent-soft-text`, `--accent-soft-border`, `--accent-hover`, `--accent-glow`, `--accent-underline` |
| Status | `--success|warning|danger|info` × {`-solid`, `-on-solid`, `-text`, `-soft`, `-soft-text`} |
| Interaction | `--focus-ring`, `--focus-ring-offset`, `--selection-bg`, `--selection-fg` |
| Overlays | `--scrim`, `--glass-tint`, `--glass-border`, `--glass-ring`, `--glass-blur` |
| Decoration | `--grid-line`, `--grid-line-strong`, `--blueprint-stroke`, `--blueprint-fill`, `--noise-opacity` |
| Diagrams | `--diagram-node-bg`, `--diagram-node-fg`, `--diagram-edge`, `--diagram-active`, `--diagram-active-soft` |
| Media | `--media-brightness`, `--media-saturation`, `--media-frame` |
| Elevation | `--shadow-1…4`, `--shadow-inset-hairline`, `--shadow-focus` |

### Light theme — "daylight studio"

Near-white paper (`--bg` is `#fbfcfd`, not pure white, so white *cards* read as
raised), ink type at 16.8:1, and ultramarine `#3b45de` as the only saturated
voice with white text on it (6.8:1). Depth comes from soft, cool-tinted shadows
(`rgb(16 24 40 / …)`), because dark hairlines would fight the editorial calm.

### Dark theme — designed, not inverted

`#0b0f16` page, `#11161f` cards, `#171d28` raised. Three deliberate differences
from a naive inversion:

1. **The accent turns luminous.** `--accent-solid` becomes `--brand-400` with
   near-black text on it (6.2:1) instead of a darker fill with white text.
   Solid chips therefore *invert their label colour* between themes.
2. **Borders replace shadows.** Elevation is a 1 px `rgb(255 255 255 / 0.1)`
   hairline plus a very deep shadow, which reads as depth without mud.
3. **Media is dimmed** (`--media-brightness: 0.92`) so screenshots and videos do
   not glare against a dark page, and `--grid-line` drops to 7 % white.

### Rules that the audit enforces

- Every semantic token exists in **both** themes (parity), and the no-JS
  `prefers-color-scheme` block is value-identical to `[data-theme="dark"]`.
- Text pairs ≥ 4.5:1; control boundaries, focus rings and diagram strokes ≥ 3:1;
  diagram labels and chip labels are text, so they need 4.5:1.
- Decorative tokens (`--border`, `--grid-line`, `--scrim`, `--fg-disabled`) are
  reported but exempt — and are never the only way to perceive information.
- Transparency is composited before measuring, so `rgb(255 255 255 / 0.4)`
  borders are judged by what they actually look like on a card.

Practical consequences already applied: `--fg-subtle` is `#667085` (not the
lighter `#6c778c`, which fails by 0.11), `--success-solid` is `#0f7a51` (white on
`#13885a` fails by 0.03), and the light diagram edge is `--ink-450`.
`prefers-contrast: more` strengthens every boundary without touching hue.

## 2. Typography

| Role | Latin | Arabic | Notes |
| --- | --- | --- | --- |
| Display | Fraunces (variable serif) | IBM Plex Sans Arabic 600/700 | Numbers, headlines, section titles, the footer wordmark |
| Text | Instrument Sans | IBM Plex Sans Arabic 400/500 | Body, UI, labels |
| Mono | JetBrains Mono | JetBrains Mono | Code, kbd, metrics, terminal egg, blueprint annotations |

All four are self-hosted through `next/font` with `display: swap`, subset per
script, and injected as CSS variables (`--font-fraunces`, …). They are loaded on
the critical path **except** the Arabic face, which is preloaded only for `ar`.

Fluid scale (viewport 360 px → 1440 px, ratio ≈1.2 text / ≈1.25 display):

| Token | Range | Used for |
| --- | --- | --- |
| `--step--2` | 11.1 → 11.6 px | Legal, overline decoration |
| `--step--1` | 13.3 → 14.2 px | Meta, eyebrows, captions, table footnotes |
| `--step-0` | 16 → 17 px | Body copy (never smaller on mobile) |
| `--step-1` | 19.2 → 20.7 px | Lead paragraphs, card titles |
| `--step-2` | 23 → 25.3 px | Section intros, sub-headings |
| `--step-3` | 27.6 → 31.2 px | `h3` — service and project titles |
| `--step-4` | 33.2 → 39 px | `h2` — section headings |
| `--step-5` | 39.8 → 48.8 px | Oversized `h2` on wide screens |
| `--step-6` | 47.8 → 61 px | Hero headline |
| `--step-7` | 57.3 → 76.3 px | Hero headline, display size |
| `--step-8` | 68.8 → 119 px | Pull quotes, big numbers |
| `--step-9` | 82.6 → 166 px | Footer wordmark / 404 / terminal |

Leading and tracking are paired with the step, not chosen per component:
`--leading-display: 1.02` + `--tracking-display: -0.03em` for display sizes,
`--leading-body: 1.65` for copy, `--tracking-eyebrow: 0.14em` for uppercase
labels. Arabic overrides all four (`1.28 / 0.02 / 1.9 / 0.06`) via `:lang(ar)`
because zero tracking is required for correct glyph joining and the script needs
more leading at the same optical size.

Numeric alignment uses `--numeric-tabular` (`"tnum" 1`) for metrics, progress
values and timelines, so count-ups do not jitter.

## 3. Space, radius, elevation

- **Space**: 4 px base (`--space-1…32`) for component internals; fluid rhythm
  tokens for layout — `--space-gutter` (20 → 40 px), `--space-section`
  (72 → 144 px), `--space-stack-*` for vertical rhythm between blocks. Sections
  use `--space-section`, never a hand-picked `py-20`.
- **Containers**: `--w-prose` 66ch (readable text), `--w-content` 72rem
  (default grid), `--w-wide` 84rem (case studies, diagrams), `--w-ultra` 96rem
  (ultra-wide, where grids gain a column instead of stretching).
- **Radius**: `2xs 4 · xs 6 · sm 10 · md 14 · lg 20 · xl 28 · 2xl 36 · pill`.
  Semantically: `--radius-control` (buttons, inputs), `--radius-card` (surfaces),
  `--radius-panel` (dialogs, assistant). Cards use `lg`, never `full` — pills
  are reserved for badges, chips and the availability dot.
- **Elevation**: `--shadow-1` resting cards, `--shadow-2` hover, `--shadow-3`
  popovers/palette, `--shadow-4` modals; `--shadow-focus` composes the ring.
  Glass (`--glass-tint` + `--glass-blur` + `--glass-ring`) is limited to the
  sticky header, command palette and assistant panel — three surfaces, so it
  stays a signature rather than a texture.

## 4. Motion vocabulary

| Intent | Token | Value |
| --- | --- | --- |
| Micro feedback (hover, press) | `--dur-1` / `--dur-2` | 90 / 160 ms, `--ease-standard` |
| State change (tabs, accordion) | `--dur-3` | 240 ms, `--ease-swift` |
| Reveal in viewport | `--dur-4` | 380 ms, `--ease-out-expo` |
| Overlay / panel | `--dur-5` | 600 ms, `--ease-out-expo` |
| Scroll storytelling beat | `--dur-6` / `--dur-scene` | 900 / 1200 ms |
| Emphasis (badge, magnetic release) | — | `--ease-overshoot` |
| Sequence between siblings | `--stagger-1|2|3` | 45 / 80 / 120 ms |
| Travel distance | `--distance-xs…lg` | 4 / 8 / 16 / 32 px |
| Parallax ceiling | `--parallax-max` | 0.18 of viewport |

Rules: distance and duration scale together (never 400 ms over 4 px); a single
screen has one dominant `--ease-out-expo` reveal and at most one overshoot; the
headline blur reveal uses `--blur-reveal` and is disabled below tier `full`; no
animation may move a layout box (transform/opacity, or measured
`grid-template-rows`).

## 5. Component state matrix (shared contract)

Every interactive primitive implements the same six states, and the tokens for
them already exist:

| State | Contract |
| --- | --- |
| Rest | `--surface`/`--accent-solid`, text at `--fg` or `--accent-on-solid` |
| Hover | `--shadow-2` (cards) or `--accent-hover` fill (buttons); ≥ `--dur-2` |
| Focus-visible | `outline: var(--focus-width) solid var(--focus-ring)` at `--focus-offset`, never removed, never on `:focus` alone |
| Active/pressed | 0.98 scale via `--distance-xs`, no shadow change |
| Disabled | `--fg-disabled`, `aria-disabled`, no pointer events but still focusable when it explains why |
| Loading | inline skeleton or spinner in place of the label, `aria-busy`, layout unchanged |

Touch targets: minimum `--target-min` (44 px) for anything tappable, with
`--tap-target` (48 px) on the mobile bottom nav. Text inputs are ≥16 px to avoid
iOS zoom on focus.

## 6. RTL checklist

1. Logical properties only; grep for `margin-left|padding-right|text-align: left`
   must return nothing outside LTR islands.
2. Icons and arrows that encode direction are mirrored (`--dir-sign`), but
   logos, charts and progress *values* are not.
3. Motion mirrors: a slide-in from the reading start edge in LTR enters from the
   inline-start edge in RTL, driven by `--dir-sign`, not by a JS branch.
4. Latin islands (`code`, `kbd`, URLs, version strings, stack names) carry
   `dir="ltr"` + `unicode-bidi: isolate`.
5. Arabic-Indic numerals are opt-in through the formatting layer, never by
   transforming text in CSS or by hand-written digits.
6. Timelines, steppers and carousels flip their axis; shadows and radii do not
   (they are physical, not directional).
7. Visual snapshots exist for every section in `ar` at both themes, and the
   "no horizontal scroll" assertion runs at 320 px wide.
