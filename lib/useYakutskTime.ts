import { useEffect, useState } from "react";

const clock = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Asia/Yakutsk",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatYakutsk(date: Date): string {
  return clock.format(date);
}

/** Yakutsk "hh:mm", or null until mounted — the server cannot know the time. */
export function useYakutskTime(intervalMs = 15_000): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatYakutsk(new Date()));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return time;
}
