"use client";

import { contact, identity } from "@/content/site";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="shell pt-24 pb-10 md:pt-32">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-6">
        <span className="label">
          © {year} {t(identity.name)}
        </span>
        <span className="label">{t(contact.place)}</span>
        <a href="#top" className="label link-draw hover:!text-ink transition-colors duration-300">
          {identity.domain} ↑
        </a>
      </div>
    </footer>
  );
}
