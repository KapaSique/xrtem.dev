export function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <a className="portfolio-header__brand" href="#top">
        KAPASIQUE
      </a>
      <nav aria-label="Primary navigation">
        <a href="#top">INDEX</a>
        <a href="#work">WORK</a>
        <a
          href="https://github.com/KapaSique"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB ↗
        </a>
      </nav>
    </header>
  );
}
