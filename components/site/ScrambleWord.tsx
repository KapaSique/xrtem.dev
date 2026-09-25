"use client";

import { useEffect, useState } from "react";

export const SCRAMBLE_STEPS = 16;
const CYRILLIC = "абвгдежзиклмнопрстуфхцчшщэюя#%&*+=/<>";
const LATIN = "abcdefghijklmnopqrstuvwxyz#%&*+=/<>";

/** One frame of the scramble: the first letters are real, the rest noise. */
export function scrambleFrame(target: string, step: number, rand: () => number = Math.random): string {
  const pool = /[а-яё]/i.test(target) ? CYRILLIC : LATIN;
  const revealed = Math.floor(target.length * (step / SCRAMBLE_STEPS));
  let out = "";
  for (let k = 0; k < target.length; k++) {
    const char = target[k];
    out += k < revealed || char === " " ? char : pool[Math.floor(rand() * pool.length)];
  }
  return out;
}

type ScrambleWordProps = {
  words: string[];
  interval?: number;
  tick?: number;
};

/** Cycles through `words`, decoding each new one out of glyph noise. */
export function ScrambleWord({ words, interval = 2800, tick = 42 }: ScrambleWordProps) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    setText(words[0]);
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let decode = 0;
    const cycle = window.setInterval(() => {
      index = (index + 1) % words.length;
      const target = words[index];
      let step = 0;
      window.clearInterval(decode);
      decode = window.setInterval(() => {
        step += 1;
        if (step >= SCRAMBLE_STEPS) {
          window.clearInterval(decode);
          setText(target);
          return;
        }
        setText(scrambleFrame(target, step));
      }, tick);
    }, interval);
    return () => {
      window.clearInterval(cycle);
      window.clearInterval(decode);
    };
  }, [words, interval, tick]);

  return <span className="whitespace-nowrap">{text}</span>;
}
