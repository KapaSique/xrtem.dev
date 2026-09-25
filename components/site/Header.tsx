"use client";

import { useCallback, useRef, useState } from "react";
import { identity, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { useYakutskTime } from "@/lib/useYakutskTime";
import { MailIcon } from "./icons";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const { t } = useLang();
  const time = useYakutskTime();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Back to the button without scrolling: a section link may be mid-jump.
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <header className="relative z-20 flex h-[60px] items-center justify-between px-4 md:h-[72px] md:px-6">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="h-[30px] rounded-full bg-chip px-4 text-[14px] transition-colors hover:bg-white/20"
      >
        {t(ui.menu)}
      </button>
      <a href="#top" className="absolute left-1/2 -translate-x-1/2 text-[25px] font-medium tracking-[-0.045em]">
        {identity.wordmark}
      </a>
      <div className="flex items-center gap-3.5 text-[14px]">
        <span className="tabular-nums">YKS {time ?? "--:--"}</span>
        <a
          href={`mailto:${identity.email}`}
          aria-label={t(ui.writeEmail)}
          className="flex size-[34px] items-center justify-center rounded-full bg-chip transition-colors hover:bg-white/20"
        >
          <MailIcon />
        </a>
      </div>
      <MenuOverlay open={open} onClose={close} />
    </header>
  );
}
