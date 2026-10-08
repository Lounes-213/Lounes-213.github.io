import { parseContent, skillCategorySchema } from "./schema";
import { z } from "zod";

const skillsSchema = z.array(skillCategorySchema).length(6);

export const skills = parseContent(
  skillsSchema,
  [
    {
      id: "frontend",
      label: { en: "Mobile & Frontend", fr: "Mobile & Frontend", ar: "تطبيقات الموبايل والواجهات" },
      summary: {
        en: "Cross-platform mobile applications and modern web interfaces built with Flutter, Next.js, Dart, and clean architectural principles.",
        fr: "Applications mobiles multiplateformes et interfaces web modernes conçues avec Flutter, Next.js, Dart et une architecture propre.",
        ar: "تطبيقات موبايل متعددة المنصات وواجهات ويب عصرية مبنية بـ Flutter وNext.js وDart بهندسة برمجية نظيفة.",
      },
      items: [
        {
          name: "Flutter & Dart",
          level: 5,
          years: 3,
          highlight: true,
          note: {
            en: "Cross-platform iOS & Android, Riverpod, BLoC, offline-first syncing.",
            fr: "Multiplateforme iOS & Android, Riverpod, BLoC, synchronisation hors ligne.",
            ar: "تطوير شامل لـ iOS وAndroid، إدارة الحالة بـ BLoC وRiverpod، والعمل دون إنترنت.",
          },
        },
        {
          name: "Next.js & React",
          level: 5,
          years: 3,
          highlight: true,
          note: {
            en: "App Router, SSR, Server Components, and responsive web apps.",
            fr: "App Router, SSR, Server Components et applications web réactives.",
            ar: "تطبيقات الويب السريعة، العرض من الخادم SSR، ومكونات React الحديثة.",
          },
        },
        {
          name: "Android SDK & Platform Tools",
          level: 4,
          years: 2,
          highlight: true,
          note: {
            en: "Native Android development, parcel delivery logistics app, Jetpack components.",
            fr: "Développement Android natif, application logistique, composants Jetpack.",
            ar: "تطوير أندرويد الأصيل، تطبيقات الخدمات والتوصيل، ومكتبات Jetpack الحديثة.",
          },
        },
        {
          name: "HTML5, CSS3 & JavaScript",
          level: 5,
          years: 4,
          note: {
            en: "Semantic HTML, modern CSS layouts, Flexbox/Grid, and dynamic JS.",
            fr: "HTML sémantique, CSS moderne, Flexbox/Grid et JavaScript dynamique.",
            ar: "بناء صفحات الويب الدلالية، تنسيقات CSS المتقدمة، وجافاسكريبت التفاعلي.",
          },
        },
        {
          name: "TypeScript",
          level: 4,
          years: 3,
          note: {
            en: "Strict type safety, generic interfaces, and scalable contracts.",
            fr: "Typage strict, interfaces génériques et architectures robustes.",
            ar: "كتابة أكواد آمنة بأنواع بيانات دقيقة وموثوقية عالية.",
          },
        },
        {
          name: "Tailwind CSS",
          level: 5,
          years: 3,
          note: {
            en: "Custom design systems, responsive utilities, and fluid animations.",
            fr: "Systèmes de design sur mesure, utilitaires réactifs et micro-animations.",
            ar: "أنظمة تصميم مخصصة، واجهات متجاوبة، وحركات تفاعلية سلسة.",
          },
        },
      ],
    },
    {
      id: "backend",
      label: { en: "Backend & APIs", fr: "Backend & APIs", ar: "الخلفية البرمجية والواجهات البرمجية" },
      summary: {
        en: "High-performance RESTful APIs, microservices, and asynchronous services engineered for stability and low latency.",
        fr: "APIs RESTful performantes, microservices et architectures asynchrones conçus pour la stabilité et la faible latence.",
        ar: "واجهات برمجية RESTful وخدمات خلفية عالية الأداء والاستقرار مع استجابة فائقة السرعة.",
      },
      items: [
        {
          name: "Python & FastAPI",
          level: 5,
          years: 3,
          highlight: true,
          note: {
            en: "High-throughput asynchronous APIs, Pydantic validation, and OpenAPI documentation.",
            fr: "APIs asynchrones rapides, validation Pydantic et documentation OpenAPI.",
            ar: "واجهات برمجية غير متزامنة، التحقق التلقائي بـ Pydantic وتوثيق OpenAPI.",
          },
        },
        {
          name: "Node.js & Express",
          level: 4,
          years: 3,
          highlight: true,
          note: {
            en: "Scalable backend routes, token-based authentication (JWT), and middleware.",
            fr: "Routage backend évolutif, authentification JWT et intergiciels.",
            ar: "خوادم خلفية مرنة، مصادقة آمنة بـ JWT، وإدارة متقدمة للطلبات.",
          },
        },
        {
          name: "Java",
          level: 4,
          years: 3,
          note: {
            en: "Object-oriented design, algorithm implementation, and academic systems at USTHB.",
            fr: "Programmation orientée objet, algorithmique avancée et projets USTHB.",
            ar: "البرمجة كائنية التوجه، الخوارزميات المتقدمة، ومشاريع أكاديمية بجامعة USTHB.",
          },
        },
        {
          name: "REST APIs & JSON Contracts",
          level: 5,
          years: 4,
          note: {
            en: "Contract-first architecture, clean payloads, and robust error handling.",
            fr: "Architecture axée sur les contrats, charges utiles propres et gestion d'erreurs.",
            ar: "تصميم واجهات برمجية نظيفة بمعايير دقيقة ومعالجة شاملة للأخطاء.",
          },
        },
        {
          name: "Clean Architecture & Design Patterns",
          level: 5,
          years: 3,
          note: {
            en: "Separation of concerns, repository pattern, testable domain models.",
            fr: "Séparation des responsabilités, patron repository, modèles testables.",
            ar: "فصل المهام بطبقات نظيفة، نمط المستودع، ونماذج قابلة للاختبار.",
          },
        },
      ],
    },
    {
      id: "cloud",
      label: { en: "Cloud & Databases", fr: "Cloud & Bases de Données", ar: "السحابة وقواعد البيانات" },
      summary: {
        en: "Relational and document databases, distributed storage, and serverless cloud deployment pipelines.",
        fr: "Bases de données relationnelles et documentaires, stockage distribué et déploiements cloud serverless.",
        ar: "قواعد البيانات العلائقية والمستندية، التخزين السحابي الموزع، والنشر السحابي الفوري.",
      },
      items: [
        {
          name: "Cloud Databases & Services",
          level: 5,
          years: 3,
          highlight: true,
          note: {
            en: "Managed database provisioning, edge persistence, and secure connection pooling.",
            fr: "Bases de données managées, persistance en périphérie et haute disponibilité.",
            ar: "قواعد بيانات سحابية مدارة، استمرارية البيانات، وحصانة أمنية عالية.",
          },
        },
        {
          name: "PostgreSQL",
          level: 4,
          years: 3,
          highlight: true,
          note: {
            en: "Complex relational queries, indexing, foreign keys, and migration scripts.",
            fr: "Requêtes relationnelles complexes, indexation et scripts de migration.",
            ar: "استعلامات علائقية متقدمة، فهرسة سريعة، وإدارة مخططات البيانات.",
          },
        },
        {
          name: "SQLite & Local Persistence",
          level: 5,
          years: 4,
          note: {
            en: "Embedded client-side caching, offline-first mobile sync, relational schema.",
            fr: "Cache local embarqué, synchronisation mobile hors ligne, schémas relationnels.",
            ar: "تخزين محلي مدمج في الهاتف، مزامنة بدون اتصال، وهيكلة علائقية سريعة.",
          },
        },
        {
          name: "Firebase (Firestore & Auth)",
          level: 5,
          years: 3,
          note: {
            en: "Real-time subscriptions, secure rule configurations, and media storage.",
            fr: "Synchronisation en temps réel, règles de sécurité et stockage média.",
            ar: "تحديثات لحظية، حماية وقواعد أمنية متينة، وتخزين ملفات وسائط.",
          },
        },
        {
          name: "Cloud Hosting & Deployments",
          level: 5,
          years: 3,
          note: {
            en: "Automated Git deployments, custom domains, HTTPS, and edge CDN distribution.",
            fr: "Déploiements Git automatisés, domaines personnalisés et distribution CDN.",
            ar: "نشر مؤتمت عبر Git، ربط النطاقات، وشهادات HTTPS، وتوزيع CDN عالمي.",
          },
        },
      ],
    },
    {
      id: "data-ai",
      label: { en: "Data Science & AI", fr: "Data Science & IA", ar: "علم البيانات والذكاء الاصطناعي" },
      summary: {
        en: "Practical machine learning models, computer vision pipelines, bioinformatics analytics, and interactive data visualization.",
        fr: "Modèles d'apprentissage automatique, vision par ordinateur, analyse bioinformatique et visualisations de données.",
        ar: "نماذج تعلم الآلي التطبيقية، الرؤية الحاسوبية، تحليلات المعلوماتية الحيوية، وتمثيل البيانات التفاعلي.",
      },
      items: [
        {
          name: "TensorFlow & Keras",
          level: 4,
          years: 2,
          highlight: true,
          note: {
            en: "Neural network architectures, classification pipelines, model training and tuning.",
            fr: "Réseaux de neurones, pipelines de classification, entraînement de modèles.",
            ar: "شبكات عصبية اصطناعية، تدريب النماذج، وتصنيف الأنماط والبيانات.",
          },
        },
        {
          name: "OpenCV (Computer Vision)",
          level: 4,
          years: 2,
          highlight: true,
          note: {
            en: "Image pre-processing, object detection, feature extraction, and camera filtering.",
            fr: "Prétraitement d'images, détection d'objets et extraction de caractéristiques.",
            ar: "معالجة الصور الرقمية، استخراج الخصائص، والتعرف على العناصر والأشكال.",
          },
        },
        {
          name: "Pandas & NumPy",
          level: 5,
          years: 3,
          note: {
            en: "Data cleansing, transformation, numerical array computations, and statistical modeling.",
            fr: "Nettoyage de données, manipulation tabulaire et modélisation statistique.",
            ar: "تنظيف وهندسة البيانات، معالجة المصفوفات الرياضية، والتحليل الإحصائي.",
          },
        },
        {
          name: "Plotly, Seaborn & Matplotlib",
          level: 4,
          years: 2,
          note: {
            en: "Interactive analytics dashboards, scientific charts, and exploratory graphics.",
            fr: "Tableaux de bord interactifs, graphiques exploratoires et scientifiques.",
            ar: "لوحات بيانات بيانية تفاعلية ورسومات استكشافية متقدمة.",
          },
        },
        {
          name: "Streamlit",
          level: 4,
          years: 2,
          note: {
            en: "Rapid prototyping of interactive AI web demonstrators and data apps.",
            fr: "Prototypage rapide d'applications web d'IA et de démonstrateurs de données.",
            ar: "بناء تطبيقات وتجارب تفاعلية سريعة لعرض نماذج الذكاء الاصطناعي.",
          },
        },
        {
          name: "R & Bioinformatics Tools",
          level: 4,
          years: 2,
          note: {
            en: "Statistical analysis, biological sequence analysis, and bioinformatics databases at USTHB.",
            fr: "Analyse statistique, analyse de séquences et bases de données biologiques à l'USTHB.",
            ar: "التحليل الإحصائي بلغة R، دراسة التسلسلات الحيوية، وقواعد بيانات البيومعلوماتية.",
          },
        },
      ],
    },
    {
      id: "devops",
      label: { en: "DevOps & Engineering", fr: "DevOps & Ingénierie", ar: "التشغيل وهندسة الأنظمة" },
      summary: {
        en: "Repeatable builds, containerization, automated testing workflows, and reliable delivery practices.",
        fr: "Builds reproductibles, conteneurisation, tests automatisés et pratiques de livraison fiables.",
        ar: "بيئات بناء موثوقة، هندسة الحاويات، أتمتة الاختبارات وممارسات التسليم المستمر.",
      },
      items: [
        {
          name: "Git & GitHub",
          level: 5,
          years: 4,
          highlight: true,
          note: {
            en: "Branching strategies, collaborative workflows, PR reviews, version control.",
            fr: "Stratégies de branches, revues de code et contrôle de version rigoureux.",
            ar: "إدارة الفروع، المراجعات البرمجية، والتحكم الاحترافي بنسخ الكود.",
          },
        },
        {
          name: "Docker & Containerization",
          level: 4,
          years: 2,
          highlight: true,
          note: {
            en: "Dockerfile creation, container isolation, environment consistency.",
            fr: "Création de Dockerfile, isolation de conteneurs, environnements cohérents.",
            ar: "إنشاء ملفات Dockerfile، عزل التطبيقات، وتطابق بيئات التطوير والتشغيل.",
          },
        },
        {
          name: "CI/CD & GitHub Actions",
          level: 4,
          years: 2,
          note: {
            en: "Automated build checks, linting, tests, and preview releases.",
            fr: "Vérifications de build automatisées, linters et déploiements continus.",
            ar: "أتمتة الفحص البرمجي والاختبارات والنشر التلقائي للنسخ.",
          },
        },
        {
          name: "Linux & Bash Scripting",
          level: 4,
          years: 3,
          note: {
            en: "Command line proficiency, server administration, automated shell tasks.",
            fr: "Maîtrise du terminal, administration serveur et scripts d'automatisation.",
            ar: "التعامل المتقدم مع أنظمة لينكس، أوامر الطرفية، وسكربتات الأتمتة.",
          },
        },
      ],
    },
    {
      id: "tools",
      label: { en: "Design & Tools", fr: "Design & Outils", ar: "التصميم والأدوات" },
      summary: {
        en: "Modern developer tooling, accessible UI/UX prototyping, mobile emulators, and API debugging.",
        fr: "Outils de développement modernes, prototypage UI/UX accessible et débogage d'APIs.",
        ar: "أدوات التطوير الحديثة، النماذج التفاعلية لتجربة المستخدم، واختبار الواجهات البرمجية.",
      },
      items: [
        {
          name: "Figma (UI/UX Prototyping)",
          level: 4,
          years: 3,
          highlight: true,
          note: {
            en: "Component libraries, accessible wireframes, micro-interaction mockups.",
            fr: "Bibliothèques de composants, maquettage interactif et accessibilité.",
            ar: "مكتبات المكونات، نماذج الواجهات التفاعلية، ومراعاة سهولة الاستخدام.",
          },
        },
        {
          name: "Android Studio & Flutter DevTools",
          level: 5,
          years: 3,
          highlight: true,
          note: {
            en: "Profiling, memory leak detection, widget inspection, and release signing.",
            fr: "Profilage, analyse mémoire, inspection de widgets et signature de releases.",
            ar: "تحليل الأداء والذاكرة، فحص المكونات، وبناء الحزم للإنتاج.",
          },
        },
        {
          name: "Postman & API Testing",
          level: 5,
          years: 3,
          note: {
            en: "Endpoint debugging, environment variables, authentication flow verification.",
            fr: "Débogage d'endpoints, variables d'environnement et tests d'auth.",
            ar: "فحص المسارات البرمجية، متغيرات البيئة، واختبار مسارات المصادقة.",
          },
        },
        {
          name: "VS Code & JetBrains IDEs",
          level: 5,
          years: 4,
          note: {
            en: "Custom extensions, shortcuts, debugging sessions, and productivity setup.",
            fr: "Extensions sur mesure, raccourcis et sessions de débogage avancées.",
            ar: "بيئات العمل المتطورة، اختصارات الإنتاجية، وجلسات التنقيح الدقيقة.",
          },
        },
      ],
    },
  ],
  "src/content/skills.ts",
);

export type Skills = typeof skills;
