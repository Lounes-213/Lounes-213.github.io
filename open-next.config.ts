import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

/**
 * OpenNext adapter configuration.
 *
 * What this file controls
 * -----------------------
 * `next build` produces a Node.js server; the OpenNext adapter re-targets it at
 * the workerd runtime. This is where the *runtime* caching strategy is declared:
 *
 *   incrementalCache — where ISR/route cache bodies live.
 *   tagCache         — where `revalidateTag` bookkeeping lives (enables
 *                      on-demand revalidation, e.g. publishing a new note).
 *   queue            — how revalidation work is scheduled. `"direct"` performs
 *                      it inline in the request (no Durable Object, no extra
 *                      queue product) which is the right trade-off for a
 *                      portfolio: few routes, tiny bodies, no thundering herd.
 *
 * The defaults are intentionally conservative — with no overrides OpenNext
 * serves the prerendered HTML only, so wiring KV + D1 below is what turns on
 * incremental static regeneration for the case studies and notes routes.
 *
 * The overrides below read their bindings by the names OpenNext expects:
 *   NEXT_INC_CACHE_KV  (KV namespace)   — incremental cache bodies
 *   NEXT_TAG_CACHE_D1  (D1 database)    — revalidation tags
 * Both are declared in wrangler.jsonc; `NEXT_INC_CACHE_KV_PREFIX` may be set as
 * a var to namespace entries when several apps share one namespace.
 */
export default defineCloudflareConfig({
  // KV-backed incremental cache, wrapped in a per-data-centre Cache API layer
  // so repeat hits in the same region skip the KV round trip entirely.
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: "long-lived" }),
  // Tag cache in D1: `revalidateTag` survives across isolates and regions.
  tagCache: d1NextTagCache,
  // Inline revalidation — no queue infrastructure to operate.
  queue: "direct",
  // Serve matching cache entries straight from the cache during routing,
  // skipping the RSC render pass. Not compatible with PPR, which we do not use.
  enableCacheInterception: true,
});
