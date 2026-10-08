
export interface LinkyProject {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  category: string;
  keywords: string[];
  images: string[];
  featured?: boolean;
}

export interface LinkyProfileData {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  location: string;
  website: string;
  country: string;
  links: Array<{
    id: string;
    title: string;
    url: string;
    icon: string;
    clicksCount?: number;
  }>;
  socialLinks: Array<{
    platform: string;
    username: string;
    url: string;
  }>;
  stores: Array<{
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    coverUrl?: string;
    totalProducts?: number;
  }>;
  portfolio: LinkyProject[];
  isLiveCloudflare: boolean;
}

const DEFAULT_LINKY_API = "https://linky-api.bensebalounes2.workers.dev";
const DEFAULT_USERNAME = "lounes_owner";

/**
 * Authentic baseline projects from Cloudflare Linky database.
 * Used for instant edge rendering and offline resilience.
 */
export const STATIC_LINKY_PROJECTS: LinkyProject[] = [
  {
    id: "d094f496-211f-47e4-8863-41adc2fbe238",
    slug: "gym-app",
    aliases: ["gym-app", "kamir-gym"],
    title: "gym app (Kamir Gym)",
    description:
      "Revolutionize Your Gym Management! 🚀💪 A fully customized Gym Management Solution built with Flutter & Firebase. Features brand customization, store integration, and secure QR membership system.",
    imageUrl:
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785368955279_portfolio_1785368953815.jpg",
    projectUrl: "https://lnkd.in/p/dd-r4dUJ",
    category: "Mobile / Fitness & QR",
    keywords: ["app", "gym", "flutter", "firebase", "qr"],
    images: [
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785368955279_portfolio_1785368953815.jpg",
    ],
    featured: true,
  },
  {
    id: "74266ede-1cca-40eb-a268-d7df6c5eea4d",
    slug: "store-link-in-bio-app",
    aliases: ["store-link-in-bio-app", "linky"],
    title: "store,link in bio app (Linky)",
    description:
      "Linky - Connecting your world is now just a tap away! 🌐🛒 A next-generation social e-commerce ecosystem designed to bridge content creators, local Algerian brands, and shoppers. Built with Flutter, Next.js, and high-performance databases.",
    imageUrl:
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369079296_portfolio_1785369078350.jpg",
    projectUrl:
      "https://www.linkedin.com/posts/lounes-benseba-a07549393_flutterdev-flutterdeveloper-mobiledev-activity-7463300023053840385-F8Fm",
    category: "Full-Stack / Flutter & Web",
    keywords: ["store", "app", "link", "flutter", "nextjs"],
    images: [
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369079296_portfolio_1785369078350.jpg",
    ],
    featured: true,
  },
  {
    id: "5a4c0b39-16c3-4d2a-968f-1fdc529c76e0",
    slug: "library-app",
    aliases: ["library-app", "digital-library"],
    title: "Library App (تطبيق مكتبة)",
    description:
      "Knowledge is now just a tap away! 📚✨ A digital gateway for educational and intellectual resources launched with a student campaign at Bab Ezzouar 3 (USTHB) in Algiers. Allows easy browsing, borrowing, and smart book exploration.",
    imageUrl:
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369413487_portfolio_1785369412296.jpg",
    projectUrl:
      "https://www.linkedin.com/posts/lounes-benseba-a07549393_as-part-of-my-software-development-projects-activity-7456969736791351296-Bq_5",
    category: "Mobile / Education",
    keywords: ["library", "app", "مكتبة", "flutter", "usthb"],
    images: [
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369413487_portfolio_1785369412296.jpg",
    ],
    featured: true,
  },
  {
    id: "dae19d57-b028-4ed5-bd0c-93e9e4ce7064",
    slug: "restaurant-discovery-app",
    aliases: ["restaurant-discovery-app", "restaurant-discovery"],
    title: "Restaurant Discovery App",
    description:
      "Excited to share a preview of a concept in Flutter. 🍽️✨ A premium QR-based restaurant ordering experience focused on elegant UI, seamless table-side ordering, and a modern digital dining journey.",
    imageUrl:
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369609541_portfolio_1785369608333.jpg",
    category: "Mobile / Hospitality & QR",
    keywords: ["restaurant", "app", "flutter", "qr"],
    images: [
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369609541_portfolio_1785369608333.jpg",
    ],
  },
  {
    id: "d1e1fc25-31d7-442e-9f1f-46cad2c12f9d",
    slug: "religious-app",
    aliases: ["religious-app", "nur-dikr"],
    title: "Religious App (تطبيق أذكار ومواقيت الصلاة)",
    description:
      "تطبيق مواقيت صلاة و اذكار. A lightweight Islamic utilities app featuring daily morning/evening adhkar, accurate prayer times calculations, and reminders tailored for Algerian users.",
    imageUrl:
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369907718_portfolio_1785369906525.jpg",
    category: "Mobile / Utility",
    keywords: ["الاسلام", "مواقيت صلاة", "اذكار", "app", "flutter"],
    images: [
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369907718_portfolio_1785369906525.jpg",
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369914221_portfolio_1785369913453.jpg",
      "https://linky-api.bensebalounes2.workers.dev/api/images/portfolio/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785369919445_portfolio_1785369918573.jpg",
    ],
  },
];

export const STATIC_LINKY_PROFILE: LinkyProfileData = {
  id: "5d6128f0-866f-480f-88b8-c6ea3041ffd6",
  name: "Lounès Benseba",
  username: "lounes_owner",
  bio: "Software Engineer · Mobile & Full-Stack Developer",
  avatarUrl:
    "https://linky-api.bensebalounes2.workers.dev/api/images/profile/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785171279791_profile_1785171272617.jpg",
  location: "Algiers, Algeria",
  website: "https://linky-to.pages.dev/@lounes_owner",
  country: "Algeria",
  links: [
    {
      id: "0852af50-4011-4425-bb19-04a166225a4e",
      title: "Lstore",
      url: "https://linky-to.pages.dev/@lounes_owner/s/lstore",
      icon: "link",
      clicksCount: 3,
    },
  ],
  socialLinks: [
    { platform: "linkedin", username: "bensebalounes", url: "https://linkedin.com/in/bensebalounes" },
    { platform: "instagram", username: "lounes.7i", url: "https://instagram.com/lounes.7i" },
    { platform: "tiktok", username: "lounes.7i", url: "https://tiktok.com/@lounes.7i" },
    { platform: "facebook", username: "lounes.7i", url: "https://facebook.com/lounes.7i" },
  ],
  stores: [
    {
      id: "0d7e889c-60d2-422a-9778-e799fe5d7328",
      name: "Lstore",
      slug: "lstore-0d7e88",
      logoUrl:
        "https://linky-api.bensebalounes2.workers.dev/api/images/stores/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785370575576_logo_1785370572733.jpg",
      totalProducts: 3,
    },
  ],
  portfolio: STATIC_LINKY_PROJECTS,
  isLiveCloudflare: false,
};

/**
 * Fetches user portfolio data directly from Cloudflare Linky Worker API.
 * Uses Next.js caching with 30-minute ISR revalidation.
 */
export async function fetchLinkyData(username = DEFAULT_USERNAME): Promise<LinkyProfileData> {
  const apiUrl = process.env.LINKY_API_URL || DEFAULT_LINKY_API;

  try {
    const res = await fetch(`${apiUrl}/api/public/${username}`, {
      next: { revalidate: 1800, tags: ["linky-profile"] },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.warn(`[Linky] API returned status ${res.status}, using static fallback`);
      return { ...STATIC_LINKY_PROFILE, isLiveCloudflare: false };
    }

    const data = await res.json();

    interface RawLinkyProject {
      id?: string | number;
      title?: string;
      description?: string;
      image_url?: string;
      project_url?: string;
      category?: string;
      keywords?: string;
      images?: string[];
    }

    const rawPortfolio = Array.isArray(data.portfolio) ? (data.portfolio as RawLinkyProject[]) : [];
    const portfolio: LinkyProject[] = rawPortfolio.map((p) => {
      const titleStr = String(p.title || "");
      const generatedSlug = (titleStr || `project-${p.id || "item"}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        id: String(p.id ?? crypto.randomUUID()),
        slug: generatedSlug || `project-${p.id ?? "item"}`,
        title: titleStr,
        description: String(p.description || ""),
        imageUrl: String(p.image_url || ""),
        projectUrl: p.project_url ? String(p.project_url) : undefined,
        category: String(p.category || "App"),
        keywords: typeof p.keywords === "string" ? p.keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : [],
        images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image_url ? [p.image_url] : []),
        featured: titleStr.toLowerCase().includes("gym") || titleStr.toLowerCase().includes("store") || titleStr.toLowerCase().includes("link"),
      };
    });

    return {
      id: String(data.id || STATIC_LINKY_PROFILE.id),
      name: String(data.name || STATIC_LINKY_PROFILE.name),
      username: String(data.username || username),
      bio: String(data.bio || STATIC_LINKY_PROFILE.bio),
      avatarUrl: String(data.avatar_url || STATIC_LINKY_PROFILE.avatarUrl),
      location: String(data.location || STATIC_LINKY_PROFILE.location),
      website: String(data.website || STATIC_LINKY_PROFILE.website),
      country: String(data.country || STATIC_LINKY_PROFILE.country),
      links: Array.isArray(data.links) ? data.links : STATIC_LINKY_PROFILE.links,
      socialLinks: Array.isArray(data.social_links) ? data.social_links : STATIC_LINKY_PROFILE.socialLinks,
      stores: Array.isArray(data.stores) ? data.stores : STATIC_LINKY_PROFILE.stores,
      portfolio: portfolio.length > 0 ? portfolio : STATIC_LINKY_PROJECTS,
      isLiveCloudflare: true,
    };
  } catch (error) {
    console.warn("[Linky] Error fetching remote profile, using static fallback:", error);
    return { ...STATIC_LINKY_PROFILE, isLiveCloudflare: false };
  }
}

/**
 * Returns all possible slugs (including aliases) for Next.js static page generation.
 */
export function getAllProjectSlugs(): string[] {
  const slugs = new Set<string>();
  for (const p of STATIC_LINKY_PROJECTS) {
    if (p.slug) slugs.add(p.slug);
    if (p.aliases) {
      for (const a of p.aliases) slugs.add(a);
    }
  }
  return Array.from(slugs);
}

/**
 * Finds a project by slug, alias, or ID.
 */
export function getProjectBySlug(slug: string): LinkyProject | undefined {
  return STATIC_LINKY_PROJECTS.find(
    (p) => p.slug === slug || (p.aliases && p.aliases.includes(slug)) || p.id === slug
  );
}
