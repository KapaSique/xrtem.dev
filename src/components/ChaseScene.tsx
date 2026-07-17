import { commercialProjects } from "../data/projects";

export function ChaseScene() {
  const project = commercialProjects[0];

  return (
    <section
      className="project-scene chase-scene"
      id="work"
      data-scene="chase"
      aria-labelledby="chase-title"
    >
      <header className="project-scene__header">
        <span>02 / COMMERCIAL SYSTEM</span>
        <h2 id="chase-title">{project.title}</h2>
        <p className="project-scene__statement">{project.statement}</p>
        <p className="project-scene__description">{project.description}</p>
      </header>

      <ol className="chase-contact-sheet">
        {project.media.map((media, index) => (
          <li key={media.src} data-chase-frame>
            <span>FRAME {String(index + 1).padStart(2, "0")}</span>
            <div data-chase-mask>
              <img
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                loading={index ? "lazy" : "eager"}
              />
            </div>
          </li>
        ))}
      </ol>

      <ul className="project-facts" aria-label="CHASE.JE product facts">
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
