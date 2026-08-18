export type Lang = "en" | "ru";

/** A string that exists in both languages. */
export type LS = { en: string; ru: string };

export type WorkMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "panel"; lines: string[] };

export type Work = {
  id: string;
  title: string;
  kind: LS;
  year: string;
  status: "live" | "private" | "research";
  href: string;
  hrefLabel: string;
  summary: LS;
  note: LS;
  stack: string[];
  media: WorkMedia;
};

export const identity = {
  domain: "xrtem.dev",
  name: { en: "Artem Svinoboev", ru: "Артём Свинобоев" } satisfies LS,
  email: "batteryofsprunk@gmail.com",
  telegram: { handle: "@stelmahhh", href: "https://t.me/stelmahhh" },
  github: { handle: "@KapaSique", href: "https://github.com/KapaSique" },
  kaggle: { handle: "@ssstelmah", href: "https://www.kaggle.com/ssstelmah" },
};

export const nav: { id: string; label: LS }[] = [
  { id: "work", label: { en: "Work", ru: "Работы" } },
  { id: "numbers", label: { en: "Numbers", ru: "Цифры" } },
  { id: "about", label: { en: "About", ru: "Обо мне" } },
  { id: "contact", label: { en: "Contact", ru: "Контакты" } },
];

export const hero = {
  status: {
    en: "Available for select work",
    ru: "Открыт для избранных проектов",
  } satisfies LS,
  /** Quick signal for the dark card — density where the page used to be empty. */
  stats: [
    { value: "4", label: { en: "years shipping", ru: "года в разработке" } satisfies LS },
    { value: "5", label: { en: "in production", ru: "проектов в проде" } satisfies LS },
    { value: "top 7%", label: { en: "Kaggle private LB", ru: "Kaggle private LB" } satisfies LS },
  ],
  /** Split so one word can carry the serif italic. */
  statement: {
    en: ["I build systems that", "survive", "contact with production."],
    ru: ["Я строю системы, которые", "переживают", "встречу с продакшеном."],
  },
  disciplines: {
    en: "Machine learning · Computer vision · Full-stack · Agentic engineering",
    ru: "Машинное обучение · Компьютерное зрение · Full-stack · Агентная инженерия",
  } satisfies LS,
  intro: {
    en: "Four years of shipping for the web, then deeper into ML and CV. The unfair advantage is carrying one idea the whole way — from an experiment to something a person actually uses.",
    ru: "Четыре года веба, потом глубже — в ML и CV. Преимущество в том, что я довожу одну идею до конца: от эксперимента до вещи, которой реально пользуются.",
  } satisfies LS,
  scroll: { en: "Selected work", ru: "Избранные работы" } satisfies LS,
};

export const works: Work[] = [
  {
    id: "chaseje",
    title: "CHASE.JE",
    kind: { en: "Commercial", ru: "Коммерция" },
    year: "2026",
    status: "live",
    href: "https://chaseje.com",
    hrefLabel: "chaseje.com",
    summary: {
      en: "A private archive boutique in Moscow — dark, bilingual, invitation only. No prices, no cart. Behind the storefront sits a serverless CMS so the owner edits the catalogue and the copy without touching code.",
      ru: "Частный архивный бутик в Москве — тёмный, двуязычный, по приглашению. Без цен и корзины. За витриной — serverless-CMS: владелец правит каталог и тексты, не касаясь кода.",
    },
    note: {
      en: "Ships as pure HTML, CSS and JS with no build step. Strict CSP, HMAC-signed admin sessions, and a public site that falls back to baked-in defaults rather than ever going blank.",
      ru: "Чистые HTML, CSS и JS без сборки. Строгий CSP, HMAC-подписанные админ-сессии и фолбэк на вшитые дефолты — сайт не белеет, даже если API лёг.",
    },
    stack: ["Vanilla JS", "Vercel Functions", "Vercel Blob", "PWA", "i18n"],
    media: { kind: "image", src: "/media/chase/boutique.jpg", alt: "CHASE.JE home screen" },
  },
  {
    id: "saqa",
    title: "SAQA OMUK",
    kind: { en: "Commercial", ru: "Коммерция" },
    year: "2026",
    status: "live",
    href: "https://saqa-omuk-react.vercel.app",
    hrefLabel: "saqa-omuk-react.vercel.app",
    summary: {
      en: "A Yakut fashion label moved off Tilda onto its own React storefront — the visual language, the catalogue and every original image carried over intact.",
      ru: "Якутский fashion-бренд переехал с Tilda на собственную React-витрину — визуальный язык, каталог и все исходные фотографии перенесены без потерь.",
    },
    note: {
      en: "74 products, 313 localised images, URLs compatible with the old site. A closed admin encrypts the whole editor document before it touches storage, and drafts never reach the public API.",
      ru: "74 товара, 313 локализованных изображений, URL совместимы со старым сайтом. Закрытая админка шифрует документ редактора до записи в хранилище, черновики не попадают в публичный API.",
    },
    stack: ["React 19", "Vite 6", "Vercel Blob", "SMS auth"],
    media: { kind: "image", src: "/media/saqa/storefront.jpg", alt: "SAQA OMUK storefront" },
  },
  {
    id: "petmek",
    title: "PETMEK",
    kind: { en: "Platform", ru: "Платформа" },
    year: "2026",
    status: "live",
    href: "https://petmek.app",
    hrefLabel: "petmek.app",
    summary: {
      en: "A multi-tenant Telegram loyalty platform: customer sign-up, AI-analysed reviews, a bonus ledger, segmented campaigns and weekly reports for the owner.",
      ru: "Мультитенантная платформа лояльности в Telegram: регистрация клиентов, AI-анализ отзывов, бонусный ledger, сегментные рассылки и недельные отчёты владельцу.",
    },
    note: {
      en: "One API serves every tenant's bot plus an over-tenant admin panel. Background work runs on arq; migrations, tests and lint are gates rather than suggestions.",
      ru: "Один API обслуживает ботов всех арендаторов и над-тенантную панель. Фоновые задачи на arq; миграции, тесты и линт — обязательные ворота, а не пожелание.",
    },
    stack: ["FastAPI", "PostgreSQL", "Redis", "arq", "Next.js", "Railway"],
    media: { kind: "image", src: "/media/petmek/report.png", alt: "Petmek weekly owner report" },
  },
  {
    id: "profcosmetic",
    title: "CONTROL TOWER",
    kind: { en: "Analytics", ru: "Аналитика" },
    year: "2026",
    status: "private",
    href: "https://profcosmetic.dev",
    hrefLabel: "profcosmetic.dev",
    summary: {
      en: "1C to an owner's dashboard along one hardened path: a 1C extension, a sync service, generation-based PostgreSQL snapshots, and a Next.js analytics surface.",
      ru: "От 1С до дашборда владельца по одному защищённому маршруту: расширение 1С, сервис синхронизации, поколенческие снимки в PostgreSQL и аналитика на Next.js.",
    },
    note: {
      en: "Eighteen datasets, each with an explicit state — ready, capped, empty, stale, missing or error. A missing generation is never rendered as a financial zero, and the last complete generation stays readable while a new sync fails.",
      ru: "Восемнадцать наборов данных, у каждого явное состояние: ready, capped, empty, stale, missing, error. Отсутствие поколения никогда не показывается как финансовый ноль, а последнее полное поколение остаётся доступным, пока новая синхронизация падает.",
    },
    stack: ["1C extension", "Railway", "PostgreSQL 18", "Next.js 16", "Recharts"],
    media: {
      kind: "panel",
      lines: [
        "1C / IIS / Cloudflare Tunnel",
        "Railway sync service",
        "PostgreSQL 18 · complete generations",
        "protected owner analytics API",
        "Next.js server components",
        "profcosmetic.dev · basic auth",
      ],
    },
  },
  {
    id: "trustlens",
    title: "TRUSTLENS",
    kind: { en: "Agents", ru: "Агенты" },
    year: "2026",
    status: "research",
    href: "https://github.com/KapaSique/trustlens",
    hrefLabel: "github.com/KapaSique/trustlens",
    summary: {
      en: "A four-agent BI pipeline where an independent verifier re-executes every query and compares the result to the claim — so a hallucinated figure is caught with a number, not a second opinion.",
      ru: "Четырёхагентный BI-конвейер, где независимый верификатор заново выполняет каждый запрос и сравнивает результат с утверждением — галлюцинация ловится числом, а не вторым мнением.",
    },
    note: {
      en: "Planner, Analyst, Verifier, Reporter. The report is written from verified figures only; anything that fails the check never reaches the page.",
      ru: "Planner, Analyst, Verifier, Reporter. Отчёт собирается только из проверенных чисел; всё, что не прошло сверку, до страницы не доходит.",
    },
    stack: ["Google ADK", "MCP", "Gemini", "Python 3.12"],
    media: { kind: "image", src: "/media/experiments/trustlens.jpg", alt: "TrustLens verifier pipeline" },
  },
];

export const numbers = {
  heading: { en: "Numbers you can check", ru: "Цифры, которые можно проверить" } satisfies LS,
  caption: {
    en: "Every figure below is reproducible from a public repository.",
    ru: "Каждое число ниже воспроизводится из публичного репозитория.",
  } satisfies LS,
  items: [
    {
      value: "0.9545",
      unit: "AUC",
      label: { en: "F1 pit-stop prediction", ru: "Предсказание пит-стопов Формулы-1" } satisfies LS,
      rank: { en: "private LB, top ~7%", ru: "private LB, топ ~7%" } satisfies LS,
      href: "https://github.com/KapaSique/f1-pitstop-prediction-s6e5",
    },
    {
      value: "0.9711",
      unit: "BAL. ACC",
      label: { en: "Stellar classification", ru: "Классификация звёздных объектов" } satisfies LS,
      rank: { en: "private LB, top ~8%", ru: "private LB, топ ~8%" } satisfies LS,
      href: "https://github.com/KapaSique/stellar-class-prediction-s6e6",
    },
    {
      value: "1057",
      unit: "ELO",
      label: { en: "Maze-crawler simulation agent", ru: "Симуляционный агент maze-crawler" } satisfies LS,
      rank: { en: "#53 of 459", ru: "#53 из 459" } satisfies LS,
      href: "https://github.com/KapaSique/maze-crawler",
    },
    {
      value: "49.68%",
      unit: "TOP-1",
      label: { en: "ResNet18 on CIFAR-100", ru: "ResNet18 на CIFAR-100" } satisfies LS,
      rank: {
        en: "zero gradient computations",
        ru: "без единого вычисления градиента",
      } satisfies LS,
      href: "https://github.com/KapaSique/SMILES-2026",
    },
  ],
};

export const about = {
  heading: { en: "How I work", ru: "Как я работаю" } satisfies LS,
  body: [
    {
      en: "I take an ambiguous problem, turn it into system boundaries, build the critical path, and design the evidence that proves it works. Then I trace the failures — across data, models, APIs and runtime — until I can explain the trade-offs and reproduce the result.",
      ru: "Я беру неоднозначную задачу, превращаю её в границы системы, строю критический путь и проектирую доказательства того, что он работает. Потом трассирую отказы — по данным, моделям, API и рантайму, — пока не смогу объяснить компромиссы и воспроизвести результат.",
    },
    {
      en: "AI tools accelerate exploration. They do not own the acceptance decision: I verify the code, the measurements and the production behaviour before my name goes on the result.",
      ru: "AI-инструменты ускоряют разведку. Но решение о приёмке принимают не они: я проверяю код, измерения и поведение в проде, прежде чем поставить своё имя.",
    },
  ] satisfies LS[],
  place: {
    en: "Computer engineering at NEFU. The long game is graduate study in AI in southern China.",
    ru: "Инженер-программист, СВФУ. Дальняя цель — магистратура по AI на юге Китая.",
  } satisfies LS,
  toolchain: [
    "Python",
    "PyTorch",
    "scikit-learn",
    "LightGBM",
    "XGBoost",
    "OpenCV",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "FastAPI",
    "Go",
    "Docker",
    "PostgreSQL",
    "Vercel",
    "Claude Code",
    "MCP",
    "Google ADK",
  ],
  alsoHeading: { en: "Also", ru: "Ещё" } satisfies LS,
  also: [
    {
      title: "kaggle-dominator",
      href: "https://github.com/KapaSique/kaggle-dominator",
      note: {
        en: "An open Claude Code skill for evidence-driven Kaggle work",
        ru: "Открытый скилл Claude Code для Kaggle на доказательствах",
      } satisfies LS,
    },
    {
      title: "attention-guard",
      href: "https://github.com/KapaSique/PaperCV",
      note: {
        en: "Real-time attention and gaze monitoring · MediaPipe, FastAPI, React",
        ru: "Мониторинг внимания и взгляда в реальном времени · MediaPipe, FastAPI, React",
      } satisfies LS,
    },
    {
      title: "leto14",
      href: "https://leto14-redesign.vercel.app",
      note: {
        en: "An unofficial React redesign concept for a Yakutsk clinic",
        ru: "Неофициальный React-редизайн витрины якутской клиники",
      } satisfies LS,
    },
    {
      title: "checkers-solver",
      href: "https://github.com/KapaSique/checkers-solver",
      note: {
        en: "Russian checkers engine in Go with a React interface",
        ru: "Движок русских шашек на Go с интерфейсом на React",
      } satisfies LS,
    },
  ],
};

export const contact = {
  heading: { en: "Let's talk", ru: "Давайте поговорим" } satisfies LS,
  line: {
    en: "Open to product work, research collaborations and graduate-programme conversations.",
    ru: "Открыт к продуктовой работе, исследовательским коллаборациям и разговорам о магистратуре.",
  } satisfies LS,
  place: { en: "Yakutsk · UTC+9", ru: "Якутск · UTC+9" } satisfies LS,
};

export const ui = {
  live: { en: "Live", ru: "В проде" } satisfies LS,
  private: { en: "Private", ru: "Закрытый доступ" } satisfies LS,
  research: { en: "Research", ru: "Исследование" } satisfies LS,
  contributions: {
    en: "commits in the last year",
    ru: "контрибуций за последний год",
  } satisfies LS,
};
