import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GoldButton } from "./primitives";
import { media } from "@/lib/media";

const links = [
  { label: "Mission", href: "#mission" },
  { label: "Story", href: "#story" },
  { label: "Values", href: "#values" },
  { label: "Markets", href: "#markets" },
  { label: "Giving", href: "#giving" },
  { label: "Join", href: "#join" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[60px] transition-[box-shadow,background-color] duration-150 ease-out min-[900px]:h-[72px]"
      style={{
        backgroundColor: scrolled ? "#0E1622" : "rgba(14,22,34,0.92)",
        boxShadow: scrolled ? "var(--kbx-shadow-soft)" : "none",
        backdropFilter: "saturate(140%) blur(6px)",
      }}
    >
      <div className="kbx-wrap flex h-full items-center justify-between">
        <a href="#top" className="flex items-center gap-4">
          <img
            src={media.logoMark}
            alt="KBX"
            width={96}
            height={32}
            className="h-[28px] w-auto object-contain min-[900px]:h-[32px]"
          />
          <span className="kbx-micro hidden text-white-56 min-[900px]:inline">
            Kingdom Business Connections
          </span>
        </a>

        <nav className="hidden items-center gap-8 min-[900px]:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[0.9rem] text-white-56 transition-colors duration-150 ease-out hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
          <GoldButton href="#join">Apply to join</GoldButton>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center text-white min-[900px]:hidden"
        >
          <Menu size={24} strokeWidth={1.4} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-ink transition-transform duration-[260ms] min-[900px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
        aria-hidden={!open}
      >
        <div className="kbx-wrap flex h-[60px] items-center justify-between">
          <img src={media.logoMark} alt="KBX" width={80} height={28} className="h-[26px] w-auto object-contain" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-white"
          >
            <X size={24} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>
        <nav className="kbx-wrap mt-10 flex flex-col gap-7" aria-label="Mobile">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-[1.4rem] text-white transition-opacity duration-200"
              style={{
                fontWeight: 400,
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(12px)",
                transition: `opacity 240ms cubic-bezier(0.4,0,0.2,1) ${i * 40}ms, transform 240ms cubic-bezier(0.4,0,0.2,1) ${i * 40}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <GoldButton href="#join" className="mt-4 w-full">
            Apply to join
          </GoldButton>
        </nav>
      </div>
    </header>
  );
}
