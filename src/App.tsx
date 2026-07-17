import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  MapPin,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import { ContributionTracker } from "./components/ContributionTracker";
import { ProjectVisual } from "./components/ProjectVisuals";

const projects = [
  {
    index: "01",
    title: "TrustLens",
    kicker: "MULTI-AGENT BI / GOOGLE ADK × MCP",
    copy: "An analytics agent that re-runs the actual query before a number reaches the report. Less ‘trust me’, more audit trail.",
    metrics: ["24/24 EVALS", "100% INJECTED HALLUCINATIONS CAUGHT", "32 TESTS"],
    tags: ["Python", "Google ADK", "MCP", "Gemini"],
    type: "trust" as const,
    url: "https://github.com/KapaSique/trustlens",
    accent: "lime",
    size: "wide",
  },
  {
    index: "02",
    title: "Second Look",
    kicker: "CLINICAL ML / SAFETY BY DESIGN",
    copy: "A triage safety-net built around the failure modes that accuracy hides: occult risk, missing data, calibration and fairness.",
    metrics: ["43,921 REAL ED VISITS", "90% RED-FLAG RECALL", "44 TESTS"],
    tags: ["Python", "scikit-learn", "Gradio", "NLP"],
    type: "triage" as const,
    url: "https://github.com/KapaSique/second-look-triage",
    liveUrl: "https://huggingface.co/spaces/KapaSique/second-look-triage",
    accent: "coral",
    size: "tall",
  },
  {
    index: "03",
    title: "Kaggle Dominator",
    kicker: "AGENT SKILL / COMPETITIVE ML",
    copy: "A battle constitution for Kaggle: live reconnaissance, trustworthy validation, candidate portfolios and guarded submission decisions.",
    metrics: ["6 COMPETITION MODES", "BEST_KNOWN PROTECTION", "3 GITHUB STARS"],
    tags: ["Shell", "Agents", "Kaggle", "LLM"],
    type: "dominator" as const,
    url: "https://github.com/KapaSique/kaggle-dominator",
    accent: "blue",
    size: "standard",
  },
  {
    index: "04",
    title: "Maze Crawler",
    kicker: "SIMULATION AGENT / JUMP-BFS",
    copy: "A survival-first game agent. The decisive improvement came from understanding one cooldown rule, then deleting cleverness.",
    metrics: ["ELO 1057.5", "#53 / 459", "TOP ~12%"],
    tags: ["Python", "BFS", "Game AI", "Simulation"],
    type: "maze" as const,
    url: "https://github.com/KapaSique/maze-crawler",
    accent: "amber",
    size: "standard",
  },
  {
    index: "05",
    title: "Paper Maestro",
    kicker: "RESEARCH ORCHESTRATION / ГОСТ × ВАК",
    copy: "An editorial operating system that turns an agent into a rigorous co-author, with eleven stages and measurable quality gates.",
    metrics: ["11 STAGES", "8 REFERENCE SYSTEMS", "V2.0"],
    tags: ["Agents", "Research", "ГОСТ", "Automation"],
    type: "paper" as const,
    url: "https://github.com/KapaSique/paper-maestro",
    accent: "paper",
    size: "standard",
  },
  {
    index: "06",
    title: "Checkers Solver",
    kicker: "GO ENGINE / REACT INTERFACE",
    copy: "Russian draughts as a full-stack search problem: bitboards, iterative deepening, transposition tables and a visual solution tree.",
    metrics: ["4× UINT32 STATE", "ALPHA-BETA", "ZERO BACKEND DEPS"],
    tags: ["Go", "React 19", "TypeScript", "Vite"],
    type: "checkers" as const,
    url: "https://github.com/KapaSique/checkers-solver",
    accent: "violet",
    size: "wide",
  },
];

const stack = [
  "React", "TypeScript", "Next.js", "Python", "FastAPI", "Go", "PyTorch",
  "Computer Vision", "ML Systems", "AI Agents", "MCP", "PostgreSQL", "Vercel",
];

function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return children;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.075, duration: 1.1, smoothWheel: true, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}

function WordReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="word-mask">
      <motion.span
        initial={{ y: "110%", rotate: 2 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,.12), transparent 36%)`;

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * 5);
    rotateX.set((0.5 - y) * 5);
    glareX.set(x * 100);
    glareY.set(y * 100);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={`project project--${project.accent} project--${project.size}`}
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
    >
      <motion.div className="project__glare" style={{ background: glare }} />
      <div className="project__topline">
        <span>{project.index} / SELECTED</span>
        <span>{project.kicker}</span>
      </div>
      <div className="project__visual-wrap">
        <ProjectVisual type={project.type} />
      </div>
      <div className="project__body">
        <h3>{project.title}</h3>
        <p>{project.copy}</p>
        <div className="project__metrics">
          {project.metrics.map((metric) => <span key={metric}>{metric}</span>)}
        </div>
        <div className="project__footer">
          <div className="tag-list">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="project__links">
            {"liveUrl" in project && project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">live <Sparkles size={13} /></a>
            )}
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
              source <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, reduceMotion ? 0 : 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.12]);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  useEffect(() => {
    const updateCursor = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("pointermove", updateCursor);
    return () => window.removeEventListener("pointermove", updateCursor);
  }, [cursorX, cursorY]);

  return (
    <SmoothScroll>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <motion.div className="cursor-glow" style={{ x: cursorX, y: cursorY }} />
      <div className="noise" />

      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Stelmah home">
          <span className="brand__mark">S/</span>
          <span>STELMAH<small>XR.TEM</small></span>
        </a>
        <div className="nav__coordinates">
          <MapPin size={13} /> 62.03°N · 129.73°E
        </div>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>about</a>
          <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer">github ↗</a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <main id="top">
        <section className="hero shell">
          <motion.div className="hero__backdrop" style={{ y: heroY, opacity: heroOpacity }}>
            <div className="signal-disc">
              <span>62°N</span><i /><b>YKT</b>
            </div>
          </motion.div>

          <motion.div className="hero__copy" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              className="hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              <span><i /> AVAILABLE FOR AMBITIOUS BUILDS</span>
              <span>FULL-STACK × ML/CV × AGENTS</span>
            </motion.div>
            <h1>
              <WordReveal delay={0.08}>I BUILD</WordReveal>{" "}
              <WordReveal delay={0.15}>SYSTEMS</WordReveal><br />
              <span className="hero__line-two"><WordReveal delay={0.22}>THAT</WordReveal>{" "}<em><WordReveal delay={0.29}>PROVE</WordReveal></em></span><br />
              <span className="hero__line-three"><WordReveal delay={0.36}>THEIR WORK.</WordReveal></span>
            </h1>
            <motion.div
              className="hero__intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.75 }}
            >
              <p>
                Stelmah — a full-stack & ML/CV developer from Yakutsk. I turn fuzzy ideas
                into products, agents and models with evidence attached.
              </p>
              <a href="#work">enter selected work <ArrowDown size={16} /></a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__tracker"
            initial={{ opacity: 0, y: 44, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.76, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContributionTracker />
          </motion.div>

          <div className="hero__edge-copy" aria-hidden="true">YAKUTSK / 2026 — SIGNAL 001</div>
        </section>

        <section className="ticker" aria-label="Technology stack">
          <div className="ticker__track">
            {[...stack, ...stack].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i>✳</i></span>
            ))}
          </div>
        </section>

        <section className="manifesto shell" id="about">
          <div className="section-label"><span>00</span> / OPERATING SYSTEM</div>
          <motion.div
            className="manifesto__statement"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <p className="manifesto__lead">
              I don’t really fit inside <span>“frontend”</span>, <span>“ML”</span> or <span>“agent builder”.</span>
              The interesting work happens in the seams.
            </p>
            <div className="manifesto__details">
              <p>
                My default mode is end-to-end: understand the domain, build the interface,
                wire the system, test the claim, ship the thing. If a metric can be checked —
                it should be checked.
              </p>
              <p className="mono-note">
                <b>current coordinates</b><br />
                Yakutsk / NEFU<br />
                UTC+09:00<br />
                building in public-ish
              </p>
            </div>
          </motion.div>
        </section>

        <section className="work shell" id="work">
          <div className="work__heading">
            <div className="section-label"><span>01</span> / SELECTED TRANSMISSIONS</div>
            <motion.h2
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              WORK THAT<br /><em>LEFT A TRACE.</em>
            </motion.h2>
            <p>Not everything I’ve built. The things that explain how I think.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
          </div>
        </section>

        <section className="stack-section shell">
          <div className="section-label"><span>02</span> / TOOLCHAIN, NOT IDENTITY</div>
          <div className="stack-section__grid">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              DIFFERENT<br />PROBLEM.<br /><em>RIGHT TOOL.</em>
            </motion.h2>
            <div className="stack-list">
              {stack.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.025 }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                  <MoveUpRight size={17} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact shell">
          <div className="contact__meta">
            <div className="section-label"><span>03</span> / OPEN CHANNEL</div>
            <p>Have a strange, difficult or useful thing to build?</p>
          </div>
          <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer" className="contact__cta">
            <span>LET’S MAKE<br /><em>IT REAL.</em></span>
            <i><ArrowUpRight size={32} /></i>
          </a>
          <footer>
            <span>© 2026 STELMAH / XR.TEM</span>
            <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer"><Github size={14} /> KAPASIQUE</a>
            <span>BUILT AT 62°N</span>
          </footer>
        </section>
      </main>

      <AnimatePresence>
        {menuOpen && <motion.div className="menu-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default App;
