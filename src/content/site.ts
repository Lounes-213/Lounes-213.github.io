import { z } from "zod";
import { navItemSchema, parseContent } from "./schema";

export const siteSchema = z.object({
  url: z.string().url(),
  timeZone: z.string().trim().min(1),
  availabilitySource: z.enum(["config", "github"]),
  navigation: z.array(navItemSchema).min(4).max(9),
  builtWith: z.array(z.string().trim().min(1)).min(3),
  analytics: z.object({ enabled: z.boolean(), token: z.string().trim().optional() }),
});

export const site = parseContent(
  siteSchema,
  {
    url: "https://benseba-portfolio.bensebalounes2.workers.dev",
    timeZone: "Africa/Algiers",
    availabilitySource: "config",
    navigation: [
      { id: "work", href: "#work" },
      { id: "about", href: "#about" },
      { id: "skills", href: "#skills" },
      { id: "contact", href: "#contact" },
    ],
    builtWith: [
      "Next.js",
      "Flutter",
      "Python",
      "FastAPI",
      "Tailwind CSS",
      "TypeScript",
    ],
    analytics: { enabled: false },
  },
  "src/content/site.ts",
);

export type Site = typeof site;
