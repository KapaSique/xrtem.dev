import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { ArrowUpRight, Github } from "lucide-react";
import {
  fallbackContributions,
  githubSnapshot,
  type Contribution,
} from "../data/github";

type GitHubResponse = {
  total?: Record<string, number>;
  contributions?: Contribution[];
};

const API_URL =
  "https://github-contributions-api.jogruber.de/v4/KapaSique?y=last";

export function ContributionTracker() {
  const [contributions, setContributions] = useState(fallbackContributions);
  const [live, setLive] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub activity unavailable");
        return response.json() as Promise<GitHubResponse>;
      })
      .then((data) => {
        if (data.contributions?.length) {
          setContributions(data.contributions);
          setLive(true);
        }
      })
      .catch(() => {
        // The embedded verified snapshot keeps the hero useful offline.
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (calendarRef.current) {
        calendarRef.current.scrollLeft = calendarRef.current.scrollWidth;
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [contributions]);

  const total = useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const activeDays = useMemo(
    () => contributions.filter((day) => day.count > 0).length,
    [contributions],
  );

  return (
    <section className="tracker" aria-label="KapaSique GitHub activity">
      <div className="tracker__head">
        <div className="tracker__identity">
          <span className="tracker__icon"><Github size={16} /></span>
          <div>
            <p className="eyebrow">github / live signal</p>
            <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer">
              @{githubSnapshot.login} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <span className={`live-pill ${live ? "is-live" : ""}`}>
          <i /> {live ? "live" : `snapshot · ${githubSnapshot.capturedAt}`}
        </span>
      </div>

      <div className="tracker__stats">
        <div>
          <strong>{total.toLocaleString("en-US")}</strong>
          <span>contributions / year</span>
        </div>
        <div>
          <strong>{activeDays}</strong>
          <span>active days</span>
        </div>
        <div>
          <strong>{githubSnapshot.publicRepos}</strong>
          <span>public repos</span>
        </div>
      </div>

      <div className="tracker__calendar" data-lenis-prevent ref={calendarRef}>
        <ActivityCalendar
          data={contributions}
          blockSize={11}
          blockMargin={3}
          blockRadius={2}
          colorScheme="dark"
          fontSize={11}
          maxLevel={4}
          theme={{
            dark: ["#171a16", "#35451f", "#627f26", "#9bc52f", "#c9ff3d"],
          }}
          labels={{
            totalCount: "{{count}} commits in the last year",
            legend: { less: "quiet", more: "loud" },
          }}
          showWeekdayLabels={false}
          tooltips={{
            activity: {
              text: (activity: Contribution) => `${activity.count} commits · ${activity.date}`,
              placement: "top",
              hoverRestMs: 80,
            },
          }}
        />
      </div>
    </section>
  );
}
