import { useMemo } from "react";
import { githubSnapshot } from "../data/github";
import { useGitHubContributions } from "../hooks/useGitHubContributions";
import {
  buildContributionWeeks,
  summarizeContributions,
} from "../lib/contributions";

type ContributionTapeProps = {
  compact?: boolean;
};

export function ContributionTape({
  compact = false,
}: ContributionTapeProps) {
  const { contributions, source } = useGitHubContributions();
  const weeks = useMemo(
    () => buildContributionWeeks(contributions).slice(-52),
    [contributions],
  );
  const summary = useMemo(
    () => summarizeContributions(contributions),
    [contributions],
  );

  return (
    <section
      className={`contribution-tape${compact ? " is-compact" : ""}`}
      aria-label="KapaSique GitHub activity"
    >
      <header className="contribution-tape__meta">
        <a
          href="https://github.com/KapaSique"
          target="_blank"
          rel="noreferrer"
        >
          @{githubSnapshot.login} ↗
        </a>
        <span>{summary.total.toLocaleString("en-US")} contributions</span>
        <span>{summary.activeDays} active days</span>
        <span>
          {source === "live"
            ? "live"
            : `snapshot · ${githubSnapshot.capturedAt}`}
        </span>
      </header>

      <ol
        className="contribution-tape__weeks"
        aria-label="Last 52 weeks"
      >
        {weeks.map((week) => (
          <li
            key={week.key}
            className="contribution-tape__week"
            aria-label={`${week.total} contributions during week of ${week.key}`}
          >
            {week.days.map((day) => (
              <i
                key={day.date}
                data-level={day.level}
                title={`${day.count} contributions · ${day.date}`}
              />
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
