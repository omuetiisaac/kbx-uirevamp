import { useState } from "react";

import { Button } from "@/components/ui/button";

const chapters = [
  {
    city: "Lagos",
    country: "Nigeria",
    status: "Active today",
    x: 50.768,
    y: 45.126,
  },
  {
    city: "Beijing",
    country: "China",
    status: "Next market",
    x: 74.478,
    y: 24.086,
  },
  {
    city: "Tokyo",
    country: "Japan",
    status: "Next market",
    x: 79.876,
    y: 26.745,
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    status: "Next market",
    x: 62.217,
    y: 33.362,
  },
] as const;

export function MarketsMap() {
  const [selectedCity, setSelectedCity] = useState("Lagos");
  const selected = chapters.find((chapter) => chapter.city === selectedCity) ?? chapters[0];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white-82">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-gold" /> Active today
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-white-56" /> Next markets
        </span>
      </div>

      <div className="relative overflow-hidden border border-white-18 bg-ink p-2">
        <div className="relative aspect-[1000/420] min-w-0">
          <img
            src="/media/kbx-world-map.svg"
            alt="World map showing KBX active and next markets"
            width={1000}
            height={420}
            loading="lazy"
            className="block h-full w-full object-contain"
          />
          {chapters.map((chapter, index) => {
            const active = chapter.city === "Lagos";
            return (
              <Button
                key={chapter.city}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`${chapter.city}, ${chapter.country} — ${chapter.status}`}
                aria-pressed={selectedCity === chapter.city}
                onClick={() => setSelectedCity(chapter.city)}
                className={`kbx-map-marker absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 p-0 hover:bg-transparent ${active ? "is-active" : ""}`}
                style={{ left: `${chapter.x}%`, top: `${chapter.y}%`, animationDelay: `${index * 100}ms` }}
              >
                <span className={`block h-2.5 w-2.5 ${active ? "bg-gold" : "bg-white-56"}`} />
              </Button>
            );
          })}
        </div>

        <div className="absolute bottom-3 left-3 border border-white-18 bg-ink px-4 py-3" aria-live="polite">
          <p className="font-display text-sm text-white sm:text-base">{selected.city}, {selected.country}</p>
          <p className={`kbx-micro mt-1 ${selected.city === "Lagos" ? "text-gold" : "text-white-56"}`}>
            {selected.status}
          </p>
        </div>
      </div>
    </div>
  );
}