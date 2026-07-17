import { experiments, type ExperimentProject } from "../data/projects";

function ExperimentVisual({ project }: { project: ExperimentProject }) {
  if (project.media) {
    return (
      <img
        src={project.media.src}
        alt={project.media.alt}
        width={project.media.width}
        height={project.media.height}
        loading="lazy"
      />
    );
  }

  if (project.slug === "checkers") {
    return (
      <div className="experiment-schematic experiment-schematic--checkers" aria-hidden="true">
        <div>
          {Array.from({ length: 32 }, (_, index) => (
            <i key={index} />
          ))}
          <b className="experiment-piece experiment-piece--one">K</b>
          <b className="experiment-piece experiment-piece--two" />
          <span />
        </div>
        <em>α—β / DEPTH 18</em>
      </div>
    );
  }

  return (
    <div className="experiment-schematic experiment-schematic--maze" aria-hidden="true">
      <div>
        {Array.from({ length: 72 }, (_, index) => (
          <i key={index} data-open={(index * 7) % 11 < 5} />
        ))}
        <b>↑</b>
        <span />
      </div>
      <em>JUMP-BFS / SURVIVE FIRST</em>
    </div>
  );
}

export function ExperimentReel() {
  return (
    <section
      className="experiment-reel"
      data-scene="experiments"
      aria-labelledby="experiments-title"
    >
      <header className="experiment-reel__header">
        <span>04 / SELECTED EXPERIMENTS</span>
        <h2 id="experiments-title">
          SMALLER SYSTEMS,
          <br />
          SAME OBSESSION.
        </h2>
      </header>

      <div className="experiment-reel__viewport">
        <div className="experiment-reel__track" data-experiment-track>
          {experiments.map((project, index) => (
            <article
              className={`experiment-card experiment-card--${project.slug}`}
              key={project.slug}
            >
              <div className="experiment-card__index">
                {String(index + 1).padStart(2, "0")} / {project.category}
              </div>
              <div className="experiment-card__visual">
                <ExperimentVisual project={project} />
              </div>
              <div className="experiment-card__body">
                <h3>{project.title}</h3>
                <p>{project.statement}</p>
                <strong>{project.proof}</strong>
                <div>
                  {"liveUrl" in project && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LIVE ↗
                    </a>
                  )}
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    SOURCE ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
