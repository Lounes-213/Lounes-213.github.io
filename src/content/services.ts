import { parseContent, serviceSchema } from "./schema";
import { z } from "zod";

const servicesSchema = z.array(serviceSchema).min(4).max(8);

export const services = parseContent(
  servicesSchema,
  [
    {
      slug: "mobile-apps",
      icon: "mobile",
      featured: true,
      title: {
        en: "Cross-Platform Mobile App Development",
        fr: "Développement d'Applications Mobiles Cross-Platform",
        ar: "تطوير تطبيقات الموبايل متعددة المنصات",
      },
      summary: {
        en: "Production-ready mobile applications built with Flutter, Dart, and Android: clean architecture, fluid animations, offline-first syncing, and native device integrations.",
        fr: "Applications mobiles prêtes pour la production avec Flutter, Dart et Android : architecture propre, animations fluides, synchronisation hors ligne et intégrations natives.",
        ar: "تطبيقات موبايل متكاملة وعالية الأداء بـ Flutter وDart وAndroid: معمارية نظيفة، حركات سلسة، مزامنة دون إنترنت، وتكامل تام مع العتاد.",
      },
      outcome: {
        en: "A polished, responsive mobile app ready for launch on Google Play and Apple App Store.",
        fr: "Une application mobile soignée et prête pour le déploiement sur Google Play et l'App Store.",
        ar: "تطبيق موبايل متقن وجاهز للنشر المباشر على متجري Google Play وApp Store.",
      },
      deliverables: {
        en: [
          "Complete Flutter & Dart cross-platform codebase",
          "Clean Architecture with Riverpod / BLoC state management",
          "Custom UI design with dark & light theme support",
          "Offline-first local database caching (SQLite)",
          "Push notifications, camera & QR code scanning integration",
        ],
        fr: [
          "Code source multiplateforme complet en Flutter & Dart",
          "Architecture propre avec gestion d'état Riverpod / BLoC",
          "Design sur mesure avec prise en charge des modes clair et sombre",
          "Persistance locale et cache hors ligne (SQLite)",
          "Notifications push, caméra et intégration de scan QR code",
        ],
        ar: [
          "كود برمجي متكامل متعدد المنصات بـ Flutter وDart",
          "هندسة معمارية نظيفة مع إدارة الحالة بـ Riverpod أو BLoC",
          "تصميم واجهات مخصص يدعم الوضعين الفاتح والداكن",
          "تخزين محلي ومزامنة دون اتصال عبر SQLite",
          "تكامل الإشعارات، الكاميرا والمسح بالرمز الرقمي QR",
        ],
      },
      timeline: { en: "3–6 weeks", fr: "3 à 6 semaines", ar: "من 3 إلى 6 أسابيع" },
      engagement: {
        en: "Milestone-based project or contract",
        fr: "Projet par jalons ou contrat dédié",
        ar: "مشروع محدد بالمراحل أو تعاقد مخصص",
      },
    },
    {
      slug: "web-platforms",
      icon: "web",
      featured: true,
      title: {
        en: "Modern Web Platforms & Full-Stack Apps",
        fr: "Plateformes Web Modernes & Applications Full-Stack",
        ar: "منصات الويب العصرية وتطبيقات الفولستاك",
      },
      summary: {
        en: "Scalable, blazing-fast web applications built with Next.js, React, TypeScript, and modern CSS: server-side rendering, SEO-optimized, and fully responsive across mobile and desktop.",
        fr: "Applications web réactives et ultra-rapides avec Next.js, React, TypeScript et CSS moderne : rendu côté serveur, SEO optimisé et adaptation mobile parfaite.",
        ar: "منصات ويب فائقة السرعة والاستجابة بـ Next.js وReact وTypeScript: سرعة تحميل فورية، تحسين محركات البحث، وتجاوب تام على الموبايل والكمبيوتر.",
      },
      outcome: {
        en: "An accessible, high-converting web platform engineered for real business growth.",
        fr: "Une plateforme web accessible et performante conçue pour soutenir votre activité.",
        ar: "منصة ويب احترافية وسريعة مصممة لدعم نمو الأعمال وتوفير أفضل تجربة تصفح.",
      },
      deliverables: {
        en: [
          "Next.js App Router with Server Components & SSR",
          "Responsive typography & bespoke Tailwind CSS system",
          "High-performance client interactions & micro-animations",
          "SEO metadata, OpenGraph cards, and fast load speeds",
          "Automated deployment setup with Git CI/CD",
        ],
        fr: [
          "Next.js App Router avec composants serveur et SSR",
          "Typographie réactive et système Tailwind CSS sur mesure",
          "Interactions fluides et micro-animations soignées",
          "Métadonnées SEO, balises OpenGraph et temps de chargement ultra-rapides",
          "Déploiement automatisé avec pipeline Git CI/CD",
        ],
        ar: [
          "بنية Next.js App Router ومكونات العرض من الخادم SSR",
          "طباعة متجاوبة وتنسيق متقن بـ Tailwind CSS",
          "تفاعلات سريعة وحركات دقيقة مريحة للمستخدم",
          "تهيئة كاملة لمحركات البحث وبطاقات المشاركة وسرعة فائقة",
          "إعداد النشر التلقائي عبر خطوط أنابيب Git CI/CD",
        ],
      },
      timeline: { en: "2–5 weeks", fr: "2 à 5 semaines", ar: "من أسبوعين إلى 5 أسابيع" },
      engagement: {
        en: "Fixed-scope sprint or continuous development",
        fr: "Sprint à périmètre fixe ou développement continu",
        ar: "مراحل تطوير محددة أو عمل متواصل",
      },
    },
    {
      slug: "backend-apis",
      icon: "cloud",
      title: {
        en: "Backend Engineering & API Systems",
        fr: "Ingénierie Backend & Systèmes d'APIs",
        ar: "هندسة الخدمات الخلفية وبناء أنظمة الواجهات البرمجية",
      },
      summary: {
        en: "Robust backend services and RESTful APIs developed with Python (FastAPI), Node.js, and relational databases: structured data models, secure authentication, and low-latency response times.",
        fr: "Services backend robustes et APIs RESTful développées avec Python (FastAPI), Node.js et bases relationnelles : schémas structurés, authentification sécurisée et faible latence.",
        ar: "خدمات خلفية متينة وواجهات برمجية RESTful بـ Python (FastAPI) وNode.js وقواعد البيانات: مخططات دقيقة، حماية موثوقة، وأزمنة استجابة متدنية.",
      },
      outcome: {
        en: "A secure, well-documented API backend ready to power mobile clients and web dashboards.",
        fr: "Un backend d'API sécurisé et documenté, prêt à alimenter les applications mobiles et web.",
        ar: "خدمة خلفية مؤمنة وموثقة بالكامل جاهزة لربط تطبيقات الموبايل ولوحات التحكم.",
      },
      deliverables: {
        en: [
          "FastAPI / Node.js REST API with comprehensive endpoints",
          "Relational schema design (PostgreSQL / SQLite / Cloud DB)",
          "JWT authentication, role-based access & validation guards",
          "Interactive OpenAPI / Swagger documentation",
          "Logging, error handling, and production deployment",
        ],
        fr: [
          "API REST FastAPI / Node.js avec endpoints exhaustifs",
          "Conception de schémas relationnels (PostgreSQL / SQLite / Cloud DB)",
          "Authentification JWT, gestion des rôles et validation",
          "Documentation interactive OpenAPI / Swagger",
          "Journalisation, gestion des erreurs et mise en production",
        ],
        ar: [
          "واجهة برمجية كاملة بـ FastAPI أو Node.js بنقاط اتصال دقيقة",
          "تصميم مخططات قواعد البيانات (PostgreSQL / SQLite / Cloud DB)",
          "نظام مصادقة JWT وصلاحيات وصول متقدمة",
          "توثيق تفاعلي كامل عبر معايير OpenAPI وSwagger",
          "سجلات تشغيل، معالجة استباقية للأخطاء، ونشر سحابي آمن",
        ],
      },
      timeline: { en: "2–4 weeks", fr: "2 à 4 semaines", ar: "من أسبوعين إلى 4 أسابيع" },
      engagement: { en: "Architecture, development & handover", fr: "Architecture, développement & transfert", ar: "معمارية وتطوير وتسليم شامل" },
    },
    {
      slug: "bilingual-rtl",
      icon: "audit",
      title: {
        en: "Multilingual & Arabic RTL Digital Interfaces",
        fr: "Interfaces Numériques Multilingues & RTL Arabe",
        ar: "الواجهات الرقمية متعددة اللغات ودعم العربية RTL",
      },
      summary: {
        en: "Flawless Arabic, French, and English digital experiences: mirrored layouts, native typography, proper numeral formatting, and zero layout glitches.",
        fr: "Expériences numériques fluides en arabe, français et anglais : mise en page miroir, typographie native, formatage des nombres et zéro glitch visuel.",
        ar: "تجارب رقمية استثنائية بالعربية والفرنسية والإنجليزية: تخطيط متناسق، خطوط عربية أصيلة، أرقام دقيقة، ودون أي تشوه بصري.",
      },
      outcome: {
        en: "A unified application that feels natural and prestigious to Arabic and international audiences alike.",
        fr: "Une application unifiée naturelle et prestigieuse pour le public arabophone et international.",
        ar: "تطبيق موحد متكامل يشعر المستخدم العربي والعالمي بالسلاسة والاحترافية العالية.",
      },
      deliverables: {
        en: [
          "Full RTL and LTR direction alignment and CSS logical properties",
          "Arabic typography calibration (Amiri, Readex Pro, Cairo)",
          "Dynamic translation files with plurals and date localization",
          "Bilingual test audits across mobile viewports",
        ],
        fr: [
          "Alignement RTL et LTR rigoureux avec propriétés CSS logiques",
          "Calibrage typographique arabe de haute qualité",
          "Fichiers de traduction dynamiques avec gestion des pluriels et dates",
          "Audits et tests bilingues sur formats mobiles et bureau",
        ],
        ar: [
          "تنسيق متقن للاتجاهين RTL وLTR بالخصائص المنطقية الحديثة",
          "ضبط متكامل للمقاييس الطباعية والخطوط العربية",
          "ملفات ترجمة ديناميكية مع قواعد الجموع والتواريخ المحلية",
          "مراجعة شاملة واختبارات تفاعلية على شاشات الهواتف المختلفة",
        ],
      },
      timeline: { en: "1–3 weeks", fr: "1 à 3 semaines", ar: "من أسبوع إلى 3 أسابيع" },
      engagement: { en: "Audit or full implementation", fr: "Audit ou intégration complète", ar: "مراجعة فنية أو تنفيذ شامل" },
    },
    {
      slug: "data-ai-apps",
      icon: "ai",
      title: {
        en: "Applied Data Science & Machine Learning Solutions",
        fr: "Solutions de Data Science & Machine Learning Appliqué",
        ar: "حلول علم البيانات وتعلم الآلة التطبيقي",
      },
      summary: {
        en: "Transforming datasets into actionable digital tools: machine learning models with TensorFlow/Keras, OpenCV image processing, and interactive dashboards.",
        fr: "Transformation de données en outils numériques : modèles d'apprentissage avec TensorFlow/Keras, traitement d'images OpenCV et tableaux de bord interactifs.",
        ar: "تحويل البيانات إلى أدوات رقمية ذكية: نماذج تعلم الآلة بـ TensorFlow وKeras، معالجة الصور بـ OpenCV، ولوحات تحليلية تفاعلية.",
      },
      outcome: {
        en: "Empirical, data-driven software that automates analysis and surfaces valuable insights.",
        fr: "Des solutions logicielles intelligentes automatisant l'analyse et révélant des informations utiles.",
        ar: "برمجيات ذكية قائمة على البيانات تؤتمت التحليل وتبرز الرؤى الهامة بدقة عالية.",
      },
      deliverables: {
        en: [
          "Exploratory data analysis and feature engineering pipeline",
          "Machine learning model training and evaluation metrics",
          "Interactive dashboard built with Streamlit or Plotly",
          "REST endpoint integration for model inferences",
        ],
        fr: [
          "Analyse exploratoire et pipeline de traitement des données",
          "Entraînement de modèles et métriques d'évaluation rigoureuses",
          "Tableau de bord interactif conçu avec Streamlit ou Plotly",
          "Intégration d'endpoints REST pour les prédictions du modèle",
        ],
        ar: [
          "تحليل استكشافي وهندسة متقدمة لخصائص البيانات",
          "تدريب نماذج تعلم الآلة واختبار مؤشرات الدقة",
          "لوحة تحكم تفاعلية مبنية بـ Streamlit أو Plotly",
          "ربط الاستنتاجات البرمجية بواجهات برمجية REST",
        ],
      },
      timeline: { en: "2–4 weeks", fr: "2 à 4 semaines", ar: "من أسبوعين إلى 4 أسابيع" },
      engagement: { en: "Research, prototype or production model", fr: "Recherche, prototype ou modèle en production", ar: "دراسة بحثية، نموذج أولي، أو نظام مكتمل" },
    },
  ],
  "src/content/services.ts",
);

export type Services = typeof services;
