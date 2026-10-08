import { z } from "zod";
import { locales, type Locale } from "@/lib/i18n/routing";

/**
 * Content is data, and data is validated.
 *
 * Every content file is parsed through these schemas at module load, so a typo,
 * a missing Arabic string or a malformed URL fails `npm run build` instead of
 * silently rendering a blank section. The schemas are also the single source of
 * truth for the TypeScript types the components consume.
 */

/** Wraps a value that must exist for each shipped locale. */
const perLocale = <T extends z.ZodType>(schema: T) =>
  z.object({
    en: schema,
    fr: schema,
    ar: schema,
  });

export const localizedText = perLocale(z.string().trim().min(1));
export const localizedTextList = perLocale(z.array(z.string().trim().min(1)).min(1));

export type LocalizedText = z.infer<typeof localizedText>;
export type LocalizedTextList = z.infer<typeof localizedTextList>;

/** Narrow a localized value to one locale. */
export const pick = <T>(value: Record<Locale, T>, locale: Locale): T => value[locale];

export const sectionIds = [
  "work",
  "about",
  "skills",
  "experience",
  "services",
  "process",
  "architecture",
  "notes",
  "contact",
] as const;

export const sectionId = z.enum(sectionIds);
export type SectionId = z.infer<typeof sectionId>;

export const socialIds = [
  "github",
  "linkedin",
  "email",
  "whatsapp",
  "x",
  "read-cv",
  "instagram",
  "tiktok",
  "facebook",
  "linky",
] as const;

export const socialSchema = z.object({
  id: z.enum(socialIds),
  label: z.string().trim().min(1),
  href: z.string().trim().min(1),
  handle: z.string().trim().min(1).optional(),
  primary: z.boolean().default(false),
});

export const statSchema = z.object({
  id: z.string().trim().min(1),
  value: z.number().nonnegative(),
  suffix: z.string().trim().max(3).optional(),
  label: localizedText,
  detail: localizedText.optional(),
});

export const availabilitySchema = z.object({
  status: z.enum(["open", "limited", "booked"]),
  note: localizedText.optional(),
  availableFrom: z.string().trim().min(1).optional(),
});

export const skillItemSchema = z.object({
  name: z.string().trim().min(1),
  level: z.number().int().min(1).max(5),
  years: z.number().int().min(0).max(40).optional(),
  note: localizedText.optional(),
  highlight: z.boolean().default(false),
});

export const skillCategorySchema = z.object({
  id: z.enum(["frontend", "backend", "cloud", "devops", "data-ai", "tools"]),
  label: localizedText,
  summary: localizedText,
  items: z.array(skillItemSchema).min(3),
});

export const serviceSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "service slugs are kebab-case"),
  icon: z.enum(["web", "mobile", "cloud", "realtime", "ai", "audit"]),
  title: localizedText,
  summary: localizedText,
  outcome: localizedText,
  deliverables: localizedTextList,
  timeline: localizedText,
  engagement: localizedText,
  priceFrom: localizedText.optional(),
  featured: z.boolean().default(false),
});

export const navItemSchema = z.object({
  id: sectionId,
  href: z.string().trim().startsWith("#"),
});

export type Social = z.infer<typeof socialSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Availability = z.infer<typeof availabilitySchema>;
export type SkillItem = z.infer<typeof skillItemSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type Service = z.infer<typeof serviceSchema>;
export type NavItem = z.infer<typeof navItemSchema>;

export const isLocaleKey = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Fail fast and loudly, naming the file that is wrong. */
export function parseContent<T>(schema: z.ZodType<T>, value: unknown, file: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid content in ${file}:\n${issues}`);
  }
  return result.data;
}
