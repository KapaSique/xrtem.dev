import { useEffect, useState } from "react";
import {
  fallbackContributions,
  GITHUB_ACTIVITY_URL,
  type Contribution,
} from "../data/github";

type GitHubResponse = {
  contributions?: Contribution[];
};

export type GitHubContributionState = {
  contributions: Contribution[];
  source: "live" | "snapshot";
};

export function useGitHubContributions(): GitHubContributionState {
  const [state, setState] = useState<GitHubContributionState>({
    contributions: fallbackContributions,
    source: "snapshot",
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(GITHUB_ACTIVITY_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("GitHub activity unavailable");
        }
        return response.json() as Promise<GitHubResponse>;
      })
      .then((data) => {
        if (data.contributions?.length) {
          setState({
            contributions: data.contributions,
            source: "live",
          });
        }
      })
      .catch(() => {
        // The verified snapshot intentionally remains visible offline.
      });

    return () => controller.abort();
  }, []);

  return state;
}
