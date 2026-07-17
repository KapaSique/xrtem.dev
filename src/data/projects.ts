export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CommercialProject = {
  slug: "chase" | "petmek";
  title: string;
  label: string;
  statement: string;
  description: string;
  publicUrl: string;
  cta: string;
  facts: readonly string[];
  media: readonly ProjectMedia[];
};

export type ExperimentProject = {
  slug: "trustlens" | "second-look" | "checkers" | "maze";
  title: string;
  category: string;
  statement: string;
  proof: string;
  sourceUrl: string;
  liveUrl?: string;
  media?: ProjectMedia;
};

export const commercialProjects = [
  {
    slug: "chase",
    title: "CHASE.JE",
    label: "PRIVATE ARCHIVE / MOSCOW",
    statement: "A closed archive of what the market does not have.",
    description:
      "A bilingual private-boutique PWA with a curated catalog and a protected serverless content workflow.",
    publicUrl: "https://chaseje.com",
    cta: "ENTER CHASE.JE",
    facts: ["BILINGUAL PWA", "PRIVATE CATALOG", "SERVERLESS CMS"],
    media: [
      {
        src: "/media/chase/archive-room.jpg",
        alt: "Dark CHASE.JE archive boutique interior",
        width: 1200,
        height: 630,
      },
      {
        src: "/media/chase/boutique.webp",
        alt: "Curated CHASE.JE boutique selection",
        width: 760,
        height: 930,
      },
      {
        src: "/media/chase/jewelry.webp",
        alt: "CHASE.JE archive jewelry editorial",
        width: 760,
        height: 941,
      },
      {
        src: "/media/chase/women.webp",
        alt: "CHASE.JE womenswear editorial",
        width: 760,
        height: 1008,
      },
    ],
  },
  {
    slug: "petmek",
    title: "PETMEK",
    label: "LOYALTY OPERATING SYSTEM",
    statement: "Customer feedback becomes an owner action.",
    description:
      "A multi-tenant loyalty product with an owner cabinet, AI-assisted review analysis, campaigns, and weekly reports.",
    publicUrl: "https://petmek.app",
    cta: "OPEN PETMEK",
    facts: ["MULTI-TENANT", "AI REVIEW ANALYSIS", "OWNER REPORTS"],
    media: [
      {
        src: "/media/petmek/overview.png",
        alt: "Petmek owner overview with business health metrics",
        width: 1200,
        height: 804,
      },
      {
        src: "/media/petmek/reviews.png",
        alt: "Petmek review analysis and owner recommendations",
        width: 1200,
        height: 804,
      },
      {
        src: "/media/petmek/report.png",
        alt: "Petmek generated weekly business report",
        width: 1200,
        height: 804,
      },
      {
        src: "/media/petmek/wizard.png",
        alt: "Petmek business onboarding wizard",
        width: 1200,
        height: 804,
      },
    ],
  },
] as const satisfies readonly CommercialProject[];

export const experiments = [
  {
    slug: "trustlens",
    title: "TrustLens",
    category: "VERIFIABLE ANALYTICS AGENT",
    statement: "Re-runs the actual query before a number reaches the report.",
    proof: "24/24 EVALS",
    sourceUrl: "https://github.com/KapaSique/trustlens",
    media: {
      src: "/media/experiments/trustlens.webp",
      alt: "TrustLens multi-agent verification system",
      width: 1200,
      height: 300,
    },
  },
  {
    slug: "second-look",
    title: "Second Look",
    category: "CLINICAL ML SAFETY NET",
    statement: "Built around the failure modes that accuracy hides.",
    proof: "90% RED-FLAG RECALL",
    sourceUrl: "https://github.com/KapaSique/second-look-triage",
    liveUrl: "https://huggingface.co/spaces/KapaSique/second-look-triage",
    media: {
      src: "/media/experiments/second-look.webp",
      alt: "Second Look clinical triage safety system",
      width: 1280,
      height: 360,
    },
  },
  {
    slug: "checkers",
    title: "Checkers Solver",
    category: "GO SEARCH ENGINE",
    statement: "Russian draughts as a full-stack search problem.",
    proof: "ALPHA-BETA / BITBOARDS",
    sourceUrl: "https://github.com/KapaSique/checkers-solver",
  },
  {
    slug: "maze",
    title: "Maze Crawler",
    category: "SIMULATION AGENT",
    statement: "A survival-first agent improved by deleting cleverness.",
    proof: "ELO 1057.5 / TOP 12%",
    sourceUrl: "https://github.com/KapaSique/maze-crawler",
  },
] as const satisfies readonly ExperimentProject[];
