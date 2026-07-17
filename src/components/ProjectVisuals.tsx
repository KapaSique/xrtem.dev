type ProjectVisualProps = {
  type: "trust" | "triage" | "maze" | "paper" | "checkers" | "dominator";
};

const mazeCells = [
  1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0,
];

export function ProjectVisual({ type }: ProjectVisualProps) {
  if (type === "trust") {
    return (
      <div className="visual visual--trust" aria-hidden="true">
        <div className="trust-orbit trust-orbit--one" />
        <div className="trust-orbit trust-orbit--two" />
        <div className="trust-node trust-node--planner">PLAN</div>
        <div className="trust-node trust-node--analyst">QUERY</div>
        <div className="trust-node trust-node--verify">✓ VERIFY</div>
        <div className="trust-node trust-node--report">SHIP</div>
        <div className="trust-core">24/24</div>
      </div>
    );
  }

  if (type === "triage") {
    return (
      <div className="visual visual--triage" aria-hidden="true">
        <div className="ecg-line">
          <svg viewBox="0 0 600 120" preserveAspectRatio="none">
            <path d="M0 70h120l18-2 10-42 18 80 18-58 18 22h108l14-4 12-30 17 65 18-48 18 17h135" />
          </svg>
        </div>
        <div className="triage-label">RED FLAG ON</div>
        <div className="triage-score"><span>ESI</span><strong>02</strong></div>
        <div className="triage-note">vitals-independent<br />safety net</div>
      </div>
    );
  }

  if (type === "maze") {
    return (
      <div className="visual visual--maze" aria-hidden="true">
        <div className="maze-grid">
          {mazeCells.map((wall, index) => (
            <i key={index} className={wall ? "wall" : ""} />
          ))}
        </div>
        <div className="maze-runner">↑</div>
        <div className="maze-route" />
        <div className="maze-score">ELO <strong>1057</strong></div>
      </div>
    );
  }

  if (type === "paper") {
    return (
      <div className="visual visual--paper" aria-hidden="true">
        <div className="paper-sheet paper-sheet--back" />
        <div className="paper-sheet paper-sheet--front">
          <span>01 / IDEA</span><i /><i /><i className="short" />
          <span>06 / VERIFY</span><i /><i className="short" />
          <b>ГОСТ / ВАК</b>
        </div>
        <div className="paper-stamp">PROOF<br />OF WORK</div>
      </div>
    );
  }

  if (type === "checkers") {
    return (
      <div className="visual visual--checkers" aria-hidden="true">
        <div className="checker-board">
          {Array.from({ length: 32 }, (_, index) => <i key={index} />)}
          <b className="piece piece--one">K</b>
          <b className="piece piece--two" />
          <b className="piece piece--three" />
          <span className="solve-line" />
        </div>
        <div className="depth-tag">α—β / depth 18</div>
      </div>
    );
  }

  return (
    <div className="visual visual--dominator" aria-hidden="true">
      <div className="radar">
        <i /><i /><i /><i />
        <b />
      </div>
      <div className="dominator-code">
        <span>recon</span><em>→</em><span>validate</span><em>→</em><strong>BEST_KNOWN</strong>
      </div>
      <div className="dominator-badge">GM<br />MODE</div>
    </div>
  );
}
