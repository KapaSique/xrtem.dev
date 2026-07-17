import { commercialProjects } from "../data/projects";
import { ContributionTape } from "./ContributionTape";

export function CollisionHero() {
  const [chase, petmek] = commercialProjects;

  return (
    <section
      className="collision-hero"
      id="top"
      data-scene="hero"
      aria-labelledby="hero-title"
    >
      <div className="collision-hero__meta">
        <span>KAPASIQUE / YAKUTSK</span>
        <span>PRODUCTS, SYSTEMS, MOTION</span>
      </div>

      <h1
        id="hero-title"
        className="collision-title"
        aria-label="Artem Stelmah"
      >
        {["ARTEM", "STELMAH"].map((line) => (
          <span className="collision-title__line" key={line}>
            {[0, 1, 2].map((strip) => (
              <span
                key={strip}
                data-hero-strip
                data-strip-index={strip}
                aria-hidden={strip > 0}
              >
                {line}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <a
        className="collision-window collision-window--chase"
        data-hero-chase
        href={chase.publicUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${chase.title}`}
      >
        <img
          src={chase.media[0].src}
          alt={chase.media[0].alt}
          width={chase.media[0].width}
          height={chase.media[0].height}
          fetchPriority="high"
        />
        <span>01 / {chase.title}</span>
      </a>

      <a
        className="collision-window collision-window--petmek"
        data-hero-petmek
        href={petmek.publicUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${petmek.title}`}
      >
        <img
          src={petmek.media[0].src}
          alt={petmek.media[0].alt}
          width={petmek.media[0].width}
          height={petmek.media[0].height}
          fetchPriority="high"
        />
        <span>02 / {petmek.title}</span>
      </a>

      <div className="collision-hero__tape">
        <ContributionTape />
      </div>

      <a className="collision-hero__exit" data-hero-exit href="#work">
        ENTER WORK ↓
      </a>
    </section>
  );
}
