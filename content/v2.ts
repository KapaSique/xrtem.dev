import type { LS } from "@/content/site";

/**
 * Variant 2 is a conversion funnel rather than an editorial index: promise →
 * proof → offer → work → objections → ask. The copy leads with what the
 * visitor gets, not with a name.
 */

export const v2nav: { id: string; label: LS }[] = [
  { id: "services", label: { en: "Services", ru: "Услуги" } },
  { id: "work", label: { en: "Work", ru: "Работы" } },
  { id: "proof", label: { en: "Proof", ru: "Доказательства" } },
  { id: "process", label: { en: "Process", ru: "Процесс" } },
  { id: "faq", label: { en: "FAQ", ru: "Вопросы" } },
];

export const v2hero = {
  eyebrow: {
    en: "Full-stack · ML / computer vision · Yakutsk, UTC+9",
    ru: "Full-stack · ML и компьютерное зрение · Якутск, UTC+9",
  } satisfies LS,
  /** Three parts so the middle one can carry the accent gradient. */
  headline: {
    en: ["I build products", "people open", "every single day."],
    ru: ["Собираю продукты,", "которые открывают", "каждый день."],
  },
  sub: {
    en: "Commercial storefronts, multi-tenant platforms and ML systems that report their own limits. Five of them are in production right now.",
    ru: "Коммерческие витрины, мультитенантные платформы и ML-системы, честные о границах своей точности. Пять из них прямо сейчас в проде.",
  } satisfies LS,
  primary: { en: "Discuss a project", ru: "Обсудить проект" } satisfies LS,
  secondary: { en: "See the work", ru: "Смотреть работы" } satisfies LS,
  reply: { en: "Usually replies within a day", ru: "Обычно отвечаю в течение суток" } satisfies LS,
};

export const v2trust = {
  label: { en: "In production", ru: "В проде" } satisfies LS,
  items: [
    { name: "chaseje.com", href: "https://chaseje.com" },
    { name: "petmek.app", href: "https://petmek.app" },
    { name: "profcosmetic.dev", href: "https://profcosmetic.dev" },
    { name: "saqa omuk", href: "https://saqa-omuk-react.vercel.app" },
  ],
  badge: { en: "Kaggle · top 7% private LB", ru: "Kaggle · топ 7% private LB" } satisfies LS,
};

export const v2services = {
  label: { en: "What I do", ru: "Что я делаю" } satisfies LS,
  heading: {
    en: "Three lanes, one standard of proof.",
    ru: "Три направления, один стандарт доказательства.",
  } satisfies LS,
  items: [
    {
      id: "product",
      index: "01",
      title: { en: "Product engineering", ru: "Продуктовая разработка" } satisfies LS,
      body: {
        en: "A storefront, a platform or an internal panel — carried from the first screen to a live domain with TLS, security headers and an owner who can edit it without me.",
        ru: "Витрина, платформа или внутренняя панель — от первого экрана до живого домена с TLS, security-заголовками и владельцем, который правит контент без меня.",
      } satisfies LS,
      points: {
        en: ["React · Next.js · FastAPI · PostgreSQL", "Admin panels the owner actually uses", "Deploy, domain, monitoring included"],
        ru: ["React · Next.js · FastAPI · PostgreSQL", "Админки, которыми владелец реально пользуется", "Деплой, домен и мониторинг включены"],
      },
      proof: { label: "CHASE.JE · SAQA OMUK", href: "https://chaseje.com" },
    },
    {
      id: "ml",
      index: "02",
      title: { en: "ML & computer vision", ru: "ML и компьютерное зрение" } satisfies LS,
      body: {
        en: "Models with validation you can defend: out-of-fold scoring, calibration, ablations, and an honest account of what the data cannot prove.",
        ru: "Модели с валидацией, которую можно защитить: OOF-оценка, калибровка, абляции и честный разбор того, чего данные не доказывают.",
      } satisfies LS,
      points: {
        en: ["PyTorch · scikit-learn · LightGBM · OpenCV", "Top 7–8% on public leaderboards", "Fairness and missingness audited, not assumed"],
        ru: ["PyTorch · scikit-learn · LightGBM · OpenCV", "Топ 7–8% на публичных лидербордах", "Справедливость и пропуски аудируются, а не предполагаются"],
      },
      proof: { label: "Kaggle · AUC 0.9545", href: "https://github.com/KapaSique/f1-pitstop-prediction-s6e5" },
    },
    {
      id: "agents",
      index: "03",
      title: { en: "Agentic systems", ru: "Агентные системы" } satisfies LS,
      body: {
        en: "Agents under supervision. Every figure is re-executed against the source before it reaches a report, so a hallucination is caught with a number rather than a second opinion.",
        ru: "Агенты под надзором. Каждое число заново считается по источнику, прежде чем попасть в отчёт, — галлюцинация ловится числом, а не вторым мнением.",
      } satisfies LS,
      points: {
        en: ["Google ADK · MCP · Claude Code", "Deterministic verification gates", "Audit trail on every claim"],
        ru: ["Google ADK · MCP · Claude Code", "Детерминированные ворота проверки", "След аудита у каждого утверждения"],
      },
      proof: { label: "TrustLens", href: "https://github.com/KapaSique/trustlens" },
    },
  ],
};

export const v2work = {
  label: { en: "Selected work", ru: "Избранные работы" } satisfies LS,
  heading: {
    en: "Five things I built.",
    ru: "Пять вещей, которые я построил.",
  } satisfies LS,
};

export const v2process = {
  label: { en: "How it goes", ru: "Как это идёт" } satisfies LS,
  heading: {
    en: "You always know where the project stands.",
    ru: "Вы всегда знаете, где сейчас проект.",
  } satisfies LS,
  steps: [
    {
      n: "01",
      title: { en: "Frame", ru: "Рамка" } satisfies LS,
      body: {
        en: "We turn the ambiguous ask into system boundaries, constraints and the failure modes worth guarding against.",
        ru: "Превращаем размытый запрос в границы системы, ограничения и отказы, от которых стоит защищаться.",
      } satisfies LS,
    },
    {
      n: "02",
      title: { en: "Design", ru: "Проект" } satisfies LS,
      body: {
        en: "Architecture, data contracts and the validation plan — agreed before a line of production code exists.",
        ru: "Архитектура, контракты данных и план валидации — согласованы до первой строки продового кода.",
      } satisfies LS,
    },
    {
      n: "03",
      title: { en: "Prove", ru: "Доказательство" } satisfies LS,
      body: {
        en: "Tests, cross-validation, ablations and instrumentation. Numbers you can reproduce, not numbers I report.",
        ru: "Тесты, кросс-валидация, абляции и инструментирование. Числа, которые вы воспроизведёте, а не которые я назову.",
      } satisfies LS,
    },
    {
      n: "04",
      title: { en: "Ship", ru: "Отгрузка" } satisfies LS,
      body: {
        en: "Deploy, monitor, document, hand over. You get a system you can operate, not one that needs me on call.",
        ru: "Деплой, мониторинг, документация, передача. Вы получаете систему, которой управляете сами, а не ту, что требует меня на связи.",
      } satisfies LS,
    },
  ],
};

export const v2faq = {
  label: { en: "Before you write", ru: "Перед тем как написать" } satisfies LS,
  heading: { en: "The usual questions.", ru: "Обычные вопросы." } satisfies LS,
  items: [
    {
      q: { en: "Can you work on a private codebase?", ru: "Можно работать в закрытом репозитории?" } satisfies LS,
      a: {
        en: "Yes — most of what I ship lives in private repositories and private organisations. Several projects on this page are closed source; only their public surface is shown here.",
        ru: "Да — большая часть того, что я отгружаю, живёт в приватных репозиториях и закрытых организациях. Несколько проектов на этой странице закрыты, здесь показана только их публичная часть.",
      } satisfies LS,
    },
    {
      q: { en: "What if the model doesn't hit the accuracy you need?", ru: "А если модель не даст нужной точности?" } satisfies LS,
      a: {
        en: "You find out early, from validation rather than from production. I design the evidence before the model: if the ceiling is lower than the target, that shows up in the ablations and we decide what to do about it while it is still cheap.",
        ru: "Вы узнаете об этом рано — из валидации, а не из прода. Доказательства проектируются раньше модели: если потолок ниже цели, это видно в абляциях, и решение принимается, пока оно ещё дешёвое.",
      } satisfies LS,
    },
    {
      q: { en: "Do you use AI to write the code?", ru: "Вы пишете код с помощью ИИ?" } satisfies LS,
      a: {
        en: "For exploration and implementation, yes. For the acceptance decision, no. I verify the code, the measurements and the production behaviour before my name goes on the result.",
        ru: "Для разведки и реализации — да. Для решения о приёмке — нет. Я проверяю код, измерения и поведение в проде, прежде чем поставить своё имя.",
      } satisfies LS,
    },
    {
      q: { en: "What do you need from me to start?", ru: "Что нужно от меня, чтобы начать?" } satisfies LS,
      a: {
        en: "The problem in your own words, whatever data or access already exists, and the one outcome that would make the project a success. Timeline and terms we agree on that basis.",
        ru: "Задача вашими словами, те данные или доступы, что уже есть, и один результат, при котором проект считается успешным. Сроки и условия согласуем уже на этой основе.",
      } satisfies LS,
    },
  ],
};

export const v2cta = {
  heading: {
    en: "Tell me what you're building.",
    ru: "Расскажите, что вы строите.",
  } satisfies LS,
  sub: {
    en: "One message with the problem is enough to start. If it isn't something I should take on, I'll say so and point you somewhere better.",
    ru: "Достаточно одного сообщения с задачей. Если это не моё — скажу прямо и подскажу, куда лучше обратиться.",
  } satisfies LS,
  primary: { en: "Write by email", ru: "Написать на почту" } satisfies LS,
  secondary: { en: "Message on Telegram", ru: "Написать в Telegram" } satisfies LS,
};
