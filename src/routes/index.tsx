import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/kbx/Nav";
import { Footer } from "@/components/kbx/Footer";
import {
  Hero,
  Mission,
  Vision,
  Story,
  Values,
  Markets,
  Giving,
  Goals,
  Join,
} from "@/components/kbx/sections";

const title = "KBX — Kingdom Business Connections";
const description =
  "KBX is a faith-led global network of business leaders building character, capacity, community and capital across chapters worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Vision />
        <Story />
        <Values />
        <Markets />
        <Giving />
        <Goals />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
