import { z } from "zod";
import {
  availabilitySchema,
  localizedText,
  localizedTextList,
  parseContent,
  socialSchema,
  statSchema,
} from "./schema";

/** ⚠ PLACEHOLDER CONTENT — replace with your own data. */

const profileSchema = z.object({
  name: z.string().trim().min(1),
  initials: z.string().trim().min(1).max(3),
  role: localizedText,
  tagline: localizedText,
  valueProp: localizedText,
  location: localizedText,
  email: z.string().email(),
  availability: availabilitySchema,
  bio: localizedTextList,
  stats: z.array(statSchema).min(3).max(4),
  spokenLanguages: z.array(
    z.object({
      name: localizedText,
      level: localizedText,
      tag: z.string().trim().min(2).max(3),
    }),
  ),
  socials: z.array(socialSchema).min(3),
  portrait: z.object({
    alt: localizedText,
    /** Drop a file in /public/images and set the path here. */
    image: z.string().trim().optional(),
  }),
});

export const profile = parseContent(
  profileSchema,
  {
    name: "Lounès Benseba",
    initials: "LB",
    role: {
      en: "Software Engineer · Mobile & Full-Stack Developer",
      fr: "Ingénieur Logiciel · Développeur Mobile & Full-Stack",
      ar: "مهندس برمجيات · مطور تطبيقات الموبايل وفولستاك",
    },
    tagline: {
      en: "I build high-performance mobile applications & modern web platforms with clean architecture.",
      fr: "Je conçois des applications mobiles performantes et des plateformes web modernes avec une architecture propre.",
      ar: "أبني تطبيقات موبايل رائدة ومنصات ويب عصرية بأداء عالٍ وهندسة برمجية متقنة.",
    },
    valueProp: {
      en: "Computer Science graduate & Master's in Bioinformatics from USTHB. Specialized in Flutter, Android, full-stack web platforms, and intelligent data-driven solutions.",
      fr: "Diplômé en informatique et étudiant en Master Bioinformatique à l'USTHB. Spécialisé en Flutter, Android, web full-stack et solutions logicielles intelligentes.",
      ar: "خريج إعلام آلي وطالب ماستر في المعلوماتية الحيوية بجامعة USTHB. متخصص في تطبيقات Flutter، أندرويد، ومنصات الويب المتكاملة والحلول الذكية.",
    },
    location: {
      en: "Tizi Ouzou & Algiers, Algeria",
      fr: "Tizi Ouzou & Alger, Algérie",
      ar: "تيزي وزو والجزائر العاصمة، الجزائر",
    },
    email: "bensebalounes7@gmail.com",
    availability: {
      status: "open",
      note: {
        en: "Available for high-impact mobile and full-stack software projects.",
        fr: "Disponible pour projets mobiles et full-stack à fort impact.",
        ar: "متاح للمشاريع البرمجية في تطبيقات الموبايل والويب المتكامل.",
      },
    },
    bio: {
      en: [
        "I'm a Software Engineer and Mobile & Full-Stack Developer based in Algeria, holding a Bachelor's Degree in Computer Science and pursuing a Master's in Bioinformatics at the University of Science and Technology Houari Boumediene (USTHB).",
        "My expertise combines mobile engineering (Flutter, Dart, Android, Java) with modern web platforms (Next.js, React, HTML/CSS/JavaScript, TypeScript, Tailwind CSS) and backend services (Node.js, Python, FastAPI, Firebase, PostgreSQL, SQLite).",
        "I have designed and delivered real-world applications across Algeria including Kamir Gym (fitness & QR check-in platform), Linky (bio-link & social e-commerce), Restaurant Discovery (QR ordering solution), Nur-Dikr (Islamic utility app), and the Digital University Library application.",
      ],
      fr: [
        "Je suis ingénieur logiciel et développeur Mobile & Full-Stack basé en Algérie, titulaire d'une Licence en Informatique et préparant un Master en Bioinformatique à l'Université des Sciences et de la Technologie Houari Boumediene (USTHB).",
        "Mon savoir-faire allie le développement mobile (Flutter, Dart, Android, Java) au web moderne (Next.js, React, HTML/CSS/JavaScript, TypeScript, Tailwind CSS) et aux services backend (Node.js, Python, FastAPI, Firebase, PostgreSQL, SQLite).",
        "J'ai conçu et livré plusieurs applications réelles en Algérie dont Kamir Gym (gestion de salle avec QR code), Linky (e-commerce & link-in-bio), Restaurant Discovery (commande interactive par QR), Nur-Dikr (application islamique) et la Bibliothèque Numérique universitaire.",
      ],
      ar: [
        "أنا مهندس برمجيات ومطور تطبيقات موبايل وفولستاك مقيم بالجزائر، حاصل على شهادة الليسانس في الإعلام الآلي وأتابع دراستي في ماستر المعلوماتية الحيوية بجامعة هواري بومدين للعلوم والتكنولوجيا (USTHB).",
        "تجمع خبرتي بين هندسة تطبيقات الموبايل (Flutter, Dart, Android, Java) وتطوير الويب الحديث (Next.js, React, HTML/CSS/JS, TypeScript, Tailwind CSS) والخدمات الخلفية (Node.js, Python, FastAPI, Firebase, PostgreSQL, SQLite).",
        "طورت ونشرت عدة تطبيقات حية منها Kamir Gym (إدارة القاعات الرياضية بالرمز التفاعلي QR)، Linky (منظومة التجارة ورابط البيو)، تطبيق استكشاف المطاعم والطلب بالرمز الرقمي، Nur-Dikr (تطبيق الأذكار ومواقيت الصلاة)، وتطبيق المكتبة الرقمية الجامعية.",
      ],
    },
    stats: [
      {
        id: "projects",
        value: 5,
        suffix: "+",
        label: { en: "Shipped applications", fr: "Applications livrées", ar: "تطبيقات منجزة" },
      },
      {
        id: "education",
        value: 7,
        suffix: " EQF",
        label: {
          en: "Licence Info & Master Bioinfo",
          fr: "Licence Informatique & Master",
          ar: "ليسانس إعلام آلي وماستر",
        },
        detail: {
          en: "USTHB University, Algiers",
          fr: "Université USTHB, Alger",
          ar: "جامعة هواري بومدين، الجزائر",
        },
      },
      {
        id: "experience",
        value: 2,
        suffix: "+",
        label: { en: "Years freelance engineering", fr: "Ans d'expérience pratique", ar: "سنوات خبرة برمجية" },
      },
      {
        id: "architecture",
        value: 100,
        suffix: "%",
        label: { en: "Clean Architecture & UI/UX", fr: "Clean Architecture & UI/UX", ar: "هندسة معمارية نظيفة" },
      },
    ],
    spokenLanguages: [
      { tag: "AR", name: { en: "Arabic", fr: "Arabe", ar: "العربية" }, level: { en: "Native", fr: "Langue maternelle", ar: "لغة أم" } },
      { tag: "FR", name: { en: "French", fr: "Français", ar: "الفرنسية" }, level: { en: "B2 · Fluent", fr: "B2 · Courant", ar: "B2 · بطلاقة" } },
      { tag: "EN", name: { en: "English", fr: "Anglais", ar: "الإنجليزية" }, level: { en: "B2 · Professional", fr: "B2 · Professionnel", ar: "B2 · مستوى مهني" } },
    ],
    socials: [
      { id: "email", label: "Email", href: "mailto:bensebalounes7@gmail.com", handle: "bensebalounes7@gmail.com", primary: true },
      { id: "github", label: "GitHub", href: "https://github.com/Lounes-213", handle: "Lounes-213" },
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/bensebalounes", handle: "in/bensebalounes" },
      { id: "instagram", label: "Instagram", href: "https://instagram.com/lounes.7i", handle: "@lounes.7i" },
      { id: "tiktok", label: "TikTok", href: "https://tiktok.com/@lounes.7i", handle: "@lounes.7i" },
      { id: "facebook", label: "Facebook", href: "https://facebook.com/lounes.7i", handle: "lounes.7i" },
    ],
    portrait: {
      alt: {
        en: "Portrait of Lounès Benseba",
        fr: "Portrait de Lounès Benseba",
        ar: "صورة لونيس بن سباع",
      },
      image: "https://linky-api.bensebalounes2.workers.dev/api/images/profile/5d6128f0-866f-480f-88b8-c6ea3041ffd6/1785171279791_profile_1785171272617.jpg",
    },
  },
  "src/content/profile.ts",
);

export type Profile = typeof profile;
