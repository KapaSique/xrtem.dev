import { commercialProjects } from "../data/projects";

const steps = [
  ["01", "CUSTOMER REVIEW", "A real customer leaves feedback."],
  [
    "02",
    "AI ANALYSIS",
    "The product extracts topic, sentiment, and risk.",
  ],
  [
    "03",
    "OWNER ACTION",
    "The cabinet turns the signal into a response.",
  ],
  [
    "04",
    "WEEKLY REPORT",
    "Recurring patterns become a readable operating brief.",
  ],
] as const;

export function PetmekScene() {
  const project = commercialProjects[1];

  return (
    <section
      className="project-scene petmek-scene"
      data-scene="petmek"
      aria-labelledby="petmek-title"
    >
      <header className="project-scene__header">
        <span>03 / COMMERCIAL SYSTEM</span>
        <h2 id="petmek-title">{project.title}</h2>
        <p className="project-scene__statement">{project.statement}</p>
        <p className="project-scene__description">{project.description}</p>
      </header>

      <ol className="petmek-pipeline">
        {steps.map(([number, title, copy], index) => (
          <li key={title} data-petmek-step>
            <div className="petmek-pipeline__copy">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <div className="petmek-pipeline__image">
              <img
                src={project.media[index].src}
                alt={project.media[index].alt}
                width={project.media[index].width}
                height={project.media[index].height}
                loading="lazy"
              />
            </div>
          </li>
        ))}
        <i
          className="petmek-pipeline__marker"
          data-petmek-marker
          aria-hidden="true"
        />
      </ol>

      <ul className="project-facts" aria-label="Petmek product facts">
        {project.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>

      <a
        className="project-scene__cta"
        href={project.publicUrl}
        target="_blank"
        rel="noreferrer"
      >
        {project.cta} ↗
      </a>
    </section>
  );
}
