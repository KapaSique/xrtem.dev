import { ContributionTape } from "./ContributionTape";

export function ContactScene() {
  return (
    <section
      className="contact-scene"
      data-scene="contact"
      aria-labelledby="contact-title"
    >
      <span>05 / YAKUTSK — 62.03°N</span>
      <h2 id="contact-title">
        LET&apos;S BUILD
        <br />
        SOMETHING
        <br />
        <em>THAT WORKS.</em>
      </h2>
      <p>
        Products, systems, ML/CV, and motion — designed as one working
        thing.
      </p>
      <div className="contact-scene__links">
        <a
          href="https://github.com/KapaSique"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB ↗
        </a>
        <a href="#top">BACK TO INDEX ↑</a>
      </div>
      <ContributionTape compact />
    </section>
  );
}
