import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- Scroll reveal ---------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <As
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`kbx-reveal ${shown ? "kbx-reveal-in" : ""} ${className}`}
    >
      {children}
    </As>
  );
}

/* ---------- Eyebrow ---------- */

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`kbx-eyebrow ${tone === "dark" ? "text-gold" : "text-gold-deep"} ${className}`}
    >
      {children}
    </p>
  );
}

/* ---------- Buttons ---------- */

const buttonBase =
  "inline-flex items-center justify-center px-7 py-[14px] text-[0.95rem] font-medium tracking-[0.02em] rounded-[2px] transition-[background-color,transform,border-color] duration-[160ms] ease-out";

export function GoldButton({
  href,
  children,
  onClick,
  type = "button",
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const cls = `${buttonBase} bg-gold text-ink hover:bg-gold-deep hover:-translate-y-px active:translate-y-0 ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function InkButton({
  children,
  type = "submit",
  className = "",
}: {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`${buttonBase} bg-ink text-white hover:bg-ink-2 hover:-translate-y-px active:translate-y-0 ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${buttonBase} border border-current/40 bg-transparent hover:border-current ${className}`}
    >
      {children}
    </a>
  );
}

/* ---------- Image slot ---------- */

export function ImageSlot({
  ratio,
  caption,
  className = "",
}: {
  ratio: "16:9" | "1:1" | "4:5";
  caption: string;
  className?: string;
}) {
  const aspect =
    ratio === "16:9" ? "aspect-[16/9]" : ratio === "1:1" ? "aspect-square" : "aspect-[4/5]";
  return (
    <div
      className={`kbx-image-slot ${aspect} flex flex-col items-center justify-center gap-2 px-6 text-center ${className}`}
    >
      <span className="kbx-micro text-slate-2">Image slot · {ratio}</span>
      <span className="kbx-micro text-slate-2">{caption}</span>
    </div>
  );
}

/* ---------- Section shell ---------- */

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`kbx-section scroll-mt-[72px] ${className}`}>
      <div className="kbx-wrap">{children}</div>
    </section>
  );
}

/* ---------- Image band (real photography, square corners) ---------- */

export function ImageBand({
  src,
  alt,
  ratio = "16:9",
  className = "",
  priority = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  ratio?: "16:9" | "21:9" | "4:5" | "4:3";
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const aspect =
    ratio === "16:9"
      ? "aspect-[16/9]"
      : ratio === "21:9"
        ? "aspect-[21/9]"
        : ratio === "4:3"
          ? "aspect-[4/3]"
          : "aspect-[4/5]";
  return (
    <div className={`kbx-band ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width ?? 1920}
        height={height ?? 1024}
        {...(priority ? {} : { loading: "lazy" as const })}
        className="kbx-band-img"
      />
    </div>
  );
}

/* ---------- Video backdrop ---------- */

export function VideoBackdrop({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {reduceMotion ? (
        <img src={poster} alt="" className="h-full w-full object-cover opacity-50" />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="h-full w-full object-cover opacity-50"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-2/80 via-ink-2/70 to-ink-2/90" />
    </div>
  );
}

/* ---------- Glass panel ---------- */

export function GlassPanel({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={`${tone === "dark" ? "kbx-glass kbx-glass-hover" : "kbx-glass-light"} ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Count up ---------- */

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = /^(\D*)(\d[\d,]*)(.*)$/.exec(value);
  const target = match ? Number(match[2]!.replace(/,/g, "")) : null;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(target === null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          setShown(true);
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reduce) {
            setN(target);
            return;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 1100, 1);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  if (target === null) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match?.[1]}
      {shown ? n.toLocaleString() : 0}
      {match?.[3]}
    </span>
  );
}
