"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { identity } from "@/content/site";
import { v2nav, v2hero } from "@/content/v2";

/**
 * The header is a floating glass capsule rather than a bar pinned to
 * the edge — it has to read as an object sitting above the page, which
 * a full-width strip never does. It holds exactly two things: the
 * wordmark and the control that opens everything else.
 */
export function Nav() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-5">
        <div className="shell">
          <div className="glass r-pill flex items-center justify-between gap-4 py-2 pl-5 pr-2">
            <a
              href="#top"
              className="grotesk text-[0.95rem] font-medium text-graphite-900"
            >
              xrtem<span className="text-graphite-400">.dev</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${identity.email}`}
                className="glass-dark r-pill press hidden px-4 py-2.5 text-[0.8125rem] text-silver-50 sm:inline-flex"
              >
                {t(v2hero.primary)}
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="press relative grid h-10 w-10 place-items-center rounded-full border border-graphite-900/12 bg-raise/60 text-graphite-900 transition-colors duration-300 hover:bg-raise/85"
              >
                <span className="relative block h-[9px] w-[15px]">
                  <span
                    className={`absolute left-0 block h-[1.5px] w-[15px] rounded-full bg-graphite-900 transition-all duration-400 ${
                      open ? "top-1 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-[1.5px] w-[15px] rounded-full bg-graphite-900 transition-all duration-400 ${
                      open ? "top-1 -rotate-45" : "top-2"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------- the index */}
      <div
        className={`fixed inset-0 z-40 transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-silver-100/75 backdrop-blur-3xl"
          onClick={() => setOpen(false)}
        />

        <div className="shell relative flex h-full flex-col justify-center px-3 pt-24 pb-6 md:px-5">
          <nav className="glass r-panel flex flex-col p-3 md:p-4">
            {v2nav.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                className={`group flex items-center gap-5 rounded-3xl px-4 py-[clamp(0.55rem,1.5vw,1rem)] transition-all duration-700 hover:bg-raise/60 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <span className="label w-6 shrink-0 text-graphite-300 transition-colors duration-300 group-hover:text-graphite-900">
                  0{i + 1}
                </span>
                <span className="display text-[clamp(1.75rem,5.5vw,3.5rem)] text-graphite-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {t(item.label)}
                </span>
                <span className="ml-auto -translate-x-3 text-graphite-400 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </a>
            ))}
          </nav>

          <div
            style={{ transitionDelay: open ? "440ms" : "0ms" }}
            className={`glass r-tile mt-3 flex flex-wrap items-center justify-between gap-5 p-5 transition-all duration-700 md:mt-4 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${identity.email}`}
                className="link-draw text-graphite-900"
                onClick={() => setOpen(false)}
              >
                {identity.email}
              </a>
              <div className="flex flex-wrap gap-4">
                {[identity.telegram, identity.github, identity.kaggle].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label text-graphite-400 transition-colors duration-300 hover:text-graphite-900"
                  >
                    {link.handle}
                  </a>
                ))}
              </div>
            </div>

            {/* Language as an iOS segmented control. */}
            <div className="flex items-center gap-1 rounded-full bg-graphite-900/8 p-1">
              {(["en", "ru"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`label rounded-full px-3.5 py-2 transition-all duration-400 ${
                    lang === code
                      ? "bg-silver-50 text-graphite-900 shadow-[0_1px_3px_-1px_rgba(20,24,34,0.14)]"
                      : "text-graphite-400 hover:text-graphite-600"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * The footer is the wordmark cut out of brushed chrome, with the
 * practical links held in one glass strip above it.
 */
export function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative overflow-hidden pt-20">
      <div className="shell">
        <div className="glass r-panel flex flex-wrap items-center justify-between gap-5 p-6 md:p-7">
          <a
            href={`mailto:${identity.email}`}
            className="link-draw text-graphite-900"
          >
            {identity.email}
          </a>

          <div className="flex flex-wrap items-center gap-4">
            {[identity.telegram, identity.github, identity.kaggle].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="label rounded-full bg-raise/50 px-3.5 py-2 text-graphite-600 transition-colors duration-300 hover:bg-raise/90 hover:text-graphite-900"
              >
                {link.handle}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-6">
          <span className="label text-graphite-400">
            © {new Date().getFullYear()} {t(identity.name)}
          </span>
          <span className="label text-graphite-300">
            {t({ en: "Yakutsk · UTC+9", ru: "Якутск · UTC+9" })}
          </span>
        </div>
      </div>

      <div className="pointer-events-none select-none px-[clamp(1rem,3vw,2rem)]">
        <div
          className="chrome-text grotesk text-center text-[clamp(4rem,19vw,15rem)] leading-[1]"
          style={{ marginBottom: "-0.2em" }}
          aria-hidden
        >
          xrtem.dev
        </div>
      </div>
    </footer>
  );
}
