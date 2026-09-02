import { Linkedin, Instagram, Facebook } from "lucide-react";
import { media } from "@/lib/media";

const links = [
  { label: "Mission", href: "#mission" },
  { label: "Vision", href: "#vision" },
  { label: "Story", href: "#story" },
  { label: "Values", href: "#values" },
  { label: "Markets", href: "#markets" },
  { label: "Giving", href: "#giving" },
  { label: "Goals", href: "#goals" },
  { label: "Join", href: "#join" },
];

const socials = [
  { label: "KBX on LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com" },
  { label: "KBX on Instagram", Icon: Instagram, href: "https://www.instagram.com" },
  { label: "KBX on Facebook", Icon: Facebook, href: "https://www.facebook.com" },
];

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="h-px w-full bg-white-18" />
      <div className="kbx-wrap py-24">
        <div className="flex flex-col gap-16 min-[900px]:flex-row min-[900px]:justify-between">
          <div className="max-w-sm">
            <img src={media.logoMark} alt="KBX" width={128} height={42} className="h-[42px] w-auto object-contain" />
            <p className="mt-7 text-[1.05rem] leading-7 text-white-56">
              A global network of Christian business professionals and entrepreneurs, founded in
              Lagos.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
              className="text-[0.98rem] text-white-56 transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <p className="kbx-micro text-white-56">Follow</p>
            <div className="mt-4 flex gap-5">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors duration-150 hover:text-gold"
                >
                  <Icon size={27} strokeWidth={1.4} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="kbx-micro mt-16 text-white-56">
          © {new Date().getFullYear()} Kingdom Business Connections. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
