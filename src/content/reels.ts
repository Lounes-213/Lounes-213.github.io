import { z } from "zod";
import { localizedText, parseContent } from "./schema";

export const reelProjectSchema = z.object({
  id: z.string().trim().min(1),
  title: localizedText,
  category: localizedText,
  description: localizedText,
  languages: z.array(z.string().trim().min(1)),
  tags: z.array(z.string().trim().min(1)),
  videoSrc: z.string().trim().min(1),
  posterSrc: z.string().trim().min(1),
  instagramUrl: z.string().url(),
  featured: z.boolean().default(false),
});

export type ReelProject = z.infer<typeof reelProjectSchema>;

const reelsSchema = z.array(reelProjectSchema).min(1);

export const reels = parseContent(
  reelsSchema,
  [
    {
      id: "reel-1",
      title: {
        en: "Maktabat Al-I'tissam",
        fr: "Bibliothèque El-I'tissam",
        ar: "مكتبة الإعتصام",
      },
      category: {
        en: "Mobile App · Education & Books",
        fr: "Application Mobile · Éducation & Lecture",
        ar: "تطبيق موبايل · تعليم وقراءة",
      },
      description: {
        en: "A digital gateway and educational reading platform featuring fluid book browsing and offline access.",
        fr: "Portail numérique et plateforme de lecture éducative moderne avec consultation hors ligne et animations fluides.",
        ar: "بوابة رقمية ومنصة قراءة تعليمية حديثة مع دعم التصفح بدون إنترنت وانسيابية عالية.",
      },
      languages: ["Flutter", "Dart"],
      tags: ["Mobile", "E-Learning", "UI/UX", "Offline-First"],
      videoSrc: "/videos/reels/reel-1.mp4",
      posterSrc: "/videos/reels/reel-1.jpg",
      instagramUrl: "https://www.instagram.com/reel/DYKh5Sqsq-D/",
      featured: true,
    },
    {
      id: "reel-2",
      title: {
        en: "Golden Goal",
        fr: "Golden Goal",
        ar: "غولدن غول (Golden Goal)",
      },
      category: {
        en: "Mobile App · Sports & Football",
        fr: "Application Mobile · Football & Sport",
        ar: "تطبيق موبايل · رياضة وكرة قدم",
      },
      description: {
        en: "Full-featured football match tracker and live scores management app with sleek dark-mode design.",
        fr: "Application mobile de suivi de matchs et scores en temps réel avec interface sombre dynamique.",
        ar: "تطبيق موبايل لمتابعة المباريات، النتائج الحية وإدارة البطولات الرياضية بواجهة عصرية.",
      },
      languages: ["Flutter", "Dart"],
      tags: ["Mobile", "Sports Tech", "Live Scores", "Dark Theme"],
      videoSrc: "/videos/reels/reel-2.mp4",
      posterSrc: "/videos/reels/reel-2.jpg",
      instagramUrl: "https://www.instagram.com/reel/DdZVdfpg3A3/",
      featured: true,
    },
    {
      id: "reel-3",
      title: {
        en: "Kamir Gym",
        fr: "Kamir Gym Club",
        ar: "كامير جيم (Kamir Gym)",
      },
      category: {
        en: "Mobile App · Fitness & Wellness",
        fr: "Application Mobile · Salle de Sport & Fitness",
        ar: "تطبيق موبايل · نادي لياقة بدنية",
      },
      description: {
        en: "Premium fitness companion app with workout schedules, membership passes and custom club branding.",
        fr: "Application mobile pour salle de sport premium : gestion des abonnements, planning et séances.",
        ar: "تطبيق متطور لنادي رياضي فاخر لإدارة الاشتراكات، جداول التمارين والحجوزات الرياضية.",
      },
      languages: ["Flutter", "Dart"],
      tags: ["Mobile", "Fitness", "Memberships", "Custom Brand"],
      videoSrc: "/videos/reels/reel-3.mp4",
      posterSrc: "/videos/reels/reel-3.jpg",
      instagramUrl: "https://www.instagram.com/reel/DalqMdjAV1V/",
      featured: false,
    },
    {
      id: "reel-4",
      title: {
        en: "CUBE 3 App (Bab Ezzouar)",
        fr: "Application CUBE 3 (Bab Ezzouar 3)",
        ar: "تطبيق CUBE 3 (إقامة باب الزوار 3)",
      },
      category: {
        en: "Smart Campus & Student Life",
        fr: "Smart Campus & Vie Étudiante",
        ar: "تطبيق الحرم والحي الجامعي",
      },
      description: {
        en: "Smart campus living app for Bab Ezzouar 3 university residence with automated authentication.",
        fr: "Application intelligente de gestion et de vie pour les résidents du campus universitaire Bab Ezzouar 3.",
        ar: "تطبيق ذكي لإدارة الحياة الطلابية والخدمات بالإقامة الجامعية باب الزوار 3 مع تحقق آلي.",
      },
      languages: ["Flutter", "Dart"],
      tags: ["Mobile", "Smart Campus", "Student Portal", "Auth"],
      videoSrc: "/videos/reels/reel-4.mp4",
      posterSrc: "/videos/reels/reel-4.jpg",
      instagramUrl: "https://www.instagram.com/reel/DdwbGVtABHQ/",
      featured: true,
    },
    {
      id: "reel-5",
      title: {
        en: "Ascent Club (نادي رفعة)",
        fr: "Ascent Club (نادي رفعة)",
        ar: "نادي رفعة العلمي والثقافي",
      },
      category: {
        en: "Web Platform · Club & Community",
        fr: "Plateforme Web · Club Scientifique & Culturel",
        ar: "منصة ويب · نادي علمي وثقافي",
      },
      description: {
        en: "Dynamic digital hub for club activities, educational workshops, conferences and member onboarding.",
        fr: "Plateforme communautaire moderne pour la promotion d'ateliers, conférences et inscriptions au club.",
        ar: "منصة رقمية حديثة للأنشطة والورش العلمية والثقافية والمحاضرات وانضمام الأعضاء.",
      },
      languages: ["Next.js", "TypeScript", "Tailwind CSS"],
      tags: ["Web", "Community", "Workshops", "Responsive"],
      videoSrc: "/videos/reels/reel-5.mp4",
      posterSrc: "/videos/reels/reel-5.jpg",
      instagramUrl: "https://www.instagram.com/reel/Dd7Ygdmg2MG/",
      featured: true,
    },
    {
      id: "reel-6",
      title: {
        en: "Interactive Portfolio Showcase",
        fr: "Portfolio Interactif",
        ar: "معرض البورتفوليو التفاعلي",
      },
      category: {
        en: "Web Platform · Creative Engineering",
        fr: "Plateforme Web · Ingénierie Créative",
        ar: "منصة ويب · هندسة برمجية إبداعية",
      },
      description: {
        en: "High-performance bilingual engineer portfolio with smooth animations, dark mode and edge rendering.",
        fr: "Portfolio web bilingue haute performance avec animations soignées, mode sombre et rendu rapide.",
        ar: "بورتفوليو مهندس عالي الأداء مع حركة انسيابية، وضع داكن وواجهة مستخدم متقدمة.",
      },
      languages: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      tags: ["Web", "Portfolio", "Motion", "Edge"],
      videoSrc: "/videos/reels/reel-6.mp4",
      posterSrc: "/videos/reels/reel-6.jpg",
      instagramUrl: "https://www.instagram.com/reel/DeQIoWBM4Da/",
      featured: false,
    },
    {
      id: "reel-7",
      title: {
        en: "Volagro DZ",
        fr: "Volagro DZ",
        ar: "فولاقرو الجزائر (Volagro DZ)",
      },
      category: {
        en: "Corporate Web Platform · Agribusiness",
        fr: "Plateforme Web Entreprise · Agroalimentaire",
        ar: "منصة ويب مؤسساتية · الصناعات الغذائية",
      },
      description: {
        en: "Modern digital platform designed to optimize production and showcase animal feed & livestock solutions.",
        fr: "Plateforme d'entreprise vitrine dédiée aux filières animales et nutrition en Algérie avec devis en ligne.",
        ar: "منصة ويب لشركة متخصصة في التغذية وتربية الحيوانات في الجزائر مع طلب عروض أسعار.",
      },
      languages: ["Next.js", "TypeScript", "Tailwind CSS"],
      tags: ["Web", "Enterprise", "Agribusiness", "Quotation"],
      videoSrc: "/videos/reels/reel-7.mp4",
      posterSrc: "/videos/reels/reel-7.jpg",
      instagramUrl: "https://www.instagram.com/reel/DeShTg0gDNx/",
      featured: false,
    },
  ],
  "src/content/reels.ts",
);
