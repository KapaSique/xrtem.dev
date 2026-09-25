export type Lang = "en" | "ru";

/** A string that exists in both languages. */
export type LS = { en: string; ru: string };

/** A list that exists in both languages, item for item. */
export type LL = { en: string[]; ru: string[] };

export const identity = {
  wordmark: "xrtem",
  domain: "xrtem.dev",
  name: { en: "Artem Svinoboev", ru: "Артём Свинобоев" } satisfies LS,
  email: "batteryofsprunk@gmail.com",
  telegram: { label: "Telegram", href: "https://t.me/stelmahhh" },
  github: { label: "GitHub", href: "https://github.com/KapaSique" },
};

export type SectionId = "work" | "about" | "services" | "contact";

export const sections: { id: SectionId; label: LS }[] = [
  { id: "work", label: { en: "Work", ru: "Работы" } },
  { id: "about", label: { en: "About", ru: "О себе" } },
  { id: "services", label: { en: "Services", ru: "Услуги" } },
  { id: "contact", label: { en: "Contact", ru: "Контакты" } },
];

export const ui = {
  menu: { en: "Menu", ru: "Меню" },
  close: { en: "Close", ru: "Закрыть" },
  language: { en: "Language", ru: "Язык" },
  sections: { en: "Sections", ru: "Разделы" },
  projects: { en: "Projects", ru: "Проекты" },
  writeEmail: { en: "Write an email", ru: "Написать на почту" },
  open: { en: "Open", ru: "Открыть" },
  selectedWork: { en: "Selected work", ru: "Избранные проекты" },
  menuWork: { en: "Projects", ru: "Проекты" },
  viewCase: { en: "View case", ru: "Смотреть кейс" },
} satisfies Record<string, LS>;

export const hero = {
  intro: {
    en: "Since 2022 I've been building sites and services end to end — from the first layout to an admin panel the owner actually uses.",
    ru: "С 2022 года собираю сайты и сервисы под ключ — от макета до админки, которой владелец пользуется сам.",
  } satisfies LS,
  lineOne: { en: "I build sites", ru: "Делаю сайты," } satisfies LS,
  lineTwo: { en: "people", ru: "которые" } satisfies LS,
  words: {
    en: ["open", "scroll", "buy from", "show off", "recommend"],
    ru: ["открывают", "листают", "покупают", "показывают", "советуют"],
  } satisfies LL,
  disciplines: "Fullstack · Web · Product",
  scroll: { en: "Scroll", ru: "Листайте" } satisfies LS,
  status: { en: "Taking projects this autumn", ru: "Принимаю проекты на осень" } satisfies LS,
};

/** The remaining glass still is used in the About section and Open Graph image. */
export const glass = {
  poster: { avif: "/media/glass/x-poster.avif", jpg: "/media/glass/x-poster.jpg" },
  macro: { avif: "/media/glass/x-macro.avif", jpg: "/media/glass/x-macro.jpg" },
};

export const marquee: LS[] = [
  { en: "Websites", ru: "Сайты" },
  { en: "Online stores", ru: "Интернет-магазины" },
  { en: "Platforms", ru: "Платформы" },
  { en: "Telegram bots", ru: "Telegram-боты" },
  { en: "Admin panels", ru: "Админки" },
  { en: "Integrations", ru: "Интеграции" },
];

export type WorkId = "saqaomuk" | "profcosmetic" | "chaseje";

export type Work = {
  id: WorkId;
  index: string;
  title: string;
  kind: LS;
  summary: LS;
  scope: LS[];
  year: string;
  link: { href: string; label: string };
  caseHref?: string;
  media: { src: string; alt: LS };
};

export const works: Work[] = [
  {
    id: "saqaomuk",
    index: "01",
    title: "SAQAOMUK",
    kind: { en: "Fashion · storefront", ru: "Fashion · витрина" },
    summary: {
      en: "I built the brand's online store: collections, catalogue, checkout and integrations with its back-office systems.",
      ru: "Собрал онлайн-магазин бренда: коллекции, каталог, оформление заказов и интеграции с учётными системами.",
    },
    scope: [
      { en: "Storefront", ru: "Витрина" },
      { en: "E-commerce", ru: "Интернет-магазин" },
      { en: "Integrations", ru: "Интеграции" },
    ],
    year: "2026",
    link: { href: "https://saqaomuk.com", label: "saqaomuk.com" },
    media: {
      src: "/media/saqa/boiled-cotton-shirt.webp",
      alt: { en: "SAQAOMUK boiled cotton shirt", ru: "Рубашка SAQAOMUK из варёного хлопка" },
    },
  },
  {
    id: "profcosmetic",
    index: "02",
    title: "PROFCOSMETIC",
    kind: { en: "Business system · analytics", ru: "Бизнес-система · аналитика" },
    summary: {
      en: "I designed the concept and built an internal business analytics system with deep 1C integration: sales, stock and source quality in one workspace.",
      ru: "Разработал дизайн-концепт и внутреннюю систему аналитики с глубокой интеграцией с 1С: продажи, запасы и качество данных в одном месте.",
    },
    scope: [
      { en: "Design concept", ru: "Дизайн-концепт" },
      { en: "Owner dashboard", ru: "Дашборд владельца" },
      { en: "1C integration", ru: "Интеграция 1С" },
    ],
    year: "2026",
    link: { href: "https://profcosmetic.dev", label: "profcosmetic.dev" },
    caseHref: "/work/profcosmetic",
    media: {
      src: "/media/profcosmetic/editorial-portrait.png",
      alt: { en: "Editorial beauty portrait created for Profcosmetic", ru: "Редакционный бьюти-портрет для Profcosmetic" },
    },
  },
  {
    id: "chaseje",
    index: "03",
    title: "Chase.je",
    kind: { en: "Private boutique · brand site", ru: "Частный бутик · имиджевый сайт" },
    summary: {
      en: "An atmospheric site for a private archive boutique: rare pieces, access by request and a deliberately restrained presentation.",
      ru: "Атмосферный сайт частного бутика-архива: редкие вещи, доступ по запросу и сдержанная подача.",
    },
    scope: [
      { en: "Website", ru: "Сайт" },
      { en: "Art direction", ru: "Арт-дирекшн" },
      { en: "Bilingual site", ru: "Два языка" },
    ],
    year: "2026",
    link: { href: "https://chaseje.com", label: "chaseje.com" },
    media: {
      src: "/media/chase/homepage-current.png",
      alt: { en: "Chase.je home page", ru: "Главная Chase.je" },
    },
  },
];

/** A small private platform preview used in the About sentence. */
export const controlTower = {
  label: { en: "Control Tower dashboard preview", ru: "Control Tower: превью дашборда" } satisfies LS,
  revenue: { en: "Revenue · 30 days", ru: "Выручка · 30 дней" } satisfies LS,
  sync: "sync ok",
  tiles: [
    { label: { en: "Datasets", ru: "Датасеты" }, value: { en: "18", ru: "18" } },
    { label: { en: "Source", ru: "Источник" }, value: { en: "1C", ru: "1С" } },
    { label: { en: "Status", ru: "Статус" }, value: { en: "ready", ru: "ready" } },
  ] satisfies { label: LS; value: LS }[],
};

export const about = {
  label: { en: "(About)", ru: "(О себе)" } satisfies LS,
  /** The sentence around its two inline pictures; the last part shimmers. */
  parts: {
    en: [
      "I'm Artem, a full-stack developer from Yakutsk. I build storefronts",
      "for brands and platforms",
      "for businesses, and take them all the way to a domain, an admin panel and",
      "real users.",
    ],
    ru: [
      "Я Артём — fullstack-разработчик из Якутска. Делаю витрины",
      "для брендов, платформы",
      "для бизнеса и довожу их до домена, админки и",
      "реальных пользователей.",
    ],
  } satisfies LL,
  macroAlt: { en: "The glass x, close up", ru: "Стеклянный x крупным планом" } satisfies LS,
  macroCaption: { en: "(x · glass · LuxCore)", ru: "(x · стекло · LuxCore)" } satisfies LS,
  stats: [
    { value: 5, label: { en: "projects in production", ru: "проектов в продакшене" } },
    { value: 4, label: { en: "years of shipping", ru: "года в разработке" } },
    { value: 74, label: { en: "products in one storefront", ru: "товара в одной витрине" } },
    { value: 1, label: { en: "person for the whole cycle", ru: "человек на весь цикл" } },
  ] satisfies { value: number; label: LS }[],
};

export const services = {
  label: { en: "(Services)", ru: "(Услуги)" } satisfies LS,
  headingLead: { en: "What I", ru: "Что я" } satisfies LS,
  headingAccent: { en: "do", ru: "делаю" } satisfies LS,
  items: [
    {
      index: "01",
      title: { en: "Websites & landing pages", ru: "Сайты и лендинги" },
      text: {
        en: "For companies, brands and launches. Animation, a CMS, SEO and speed out of the box.",
        ru: "Для компаний, брендов и запусков. Анимации, CMS, SEO и скорость из коробки.",
      },
    },
    {
      index: "02",
      title: { en: "Online stores", ru: "Интернет-магазины" },
      text: {
        en: "Catalogue, cart, payments and an admin panel the owner really uses.",
        ru: "Каталог, корзина, оплата и админка, которой владелец правда пользуется.",
      },
    },
    {
      index: "03",
      title: { en: "Platforms & dashboards", ru: "Платформы и кабинеты" },
      text: {
        en: "Roles, multi-tenancy, reports. FastAPI, PostgreSQL, Next.js.",
        ru: "Роли, мультитенантность, отчёты. FastAPI, PostgreSQL, Next.js.",
      },
    },
    {
      index: "04",
      title: { en: "Telegram bots & Mini Apps", ru: "Telegram-боты и Mini Apps" },
      text: {
        en: "Loyalty, bookings, broadcasts — wired to your site and CRM.",
        ru: "Лояльность, запись, рассылки — связанные с вашим сайтом и CRM.",
      },
    },
    {
      index: "05",
      title: { en: "Integrations", ru: "Интеграции" },
      text: {
        en: "1C, CRM, acquiring, analytics. Data moves on its own, with no manual exports.",
        ru: "1С, CRM, эквайринг, аналитика. Данные ходят сами, без ручной выгрузки.",
      },
    },
  ] satisfies { index: string; title: LS; text: LS }[],
};

export const contact = {
  label: { en: "(Contact)", ru: "(Контакты)" } satisfies LS,
  lineOne: { en: "Got a project?", ru: "Есть проект?" } satisfies LS,
  lineTwo: { en: "Let's talk.", ru: "Поговорим." } satisfies LS,
  copyright: "© 2026 xrtem",
  city: { en: "Yakutsk", ru: "Якутск" } satisfies LS,
  top: { en: "Back to top", ru: "Наверх" } satisfies LS,
};
