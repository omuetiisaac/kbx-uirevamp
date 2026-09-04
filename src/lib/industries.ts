import {
  Building2,
  Coins,
  Compass,
  Heart,
  Leaf,
  Laptop,
  ShoppingBag,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  slug: string;
  title: string;
  shortTitle: string;
  Icon: LucideIcon;
  summary: string;
  detail: string;
  focus: string[];
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    title: "Financial services",
    shortTitle: "Financial services",
    Icon: Coins,
    summary: "Stewarding capital with clarity, courage and care for people.",
    detail: "The financial services subgroup helps members think beyond transactions: building trustworthy institutions, sharing counsel and directing capital toward work that lasts.",
    focus: ["Responsible capital", "Risk and governance", "Kingdom-minded investment"],
  },
  {
    slug: "technology",
    title: "Technology",
    shortTitle: "Technology",
    Icon: Laptop,
    summary: "Building useful systems that serve people before they scale.",
    detail: "Technology members bring product, engineering and operating experience to one another, with an emphasis on useful platforms and humane growth.",
    focus: ["Product and engineering", "Responsible growth", "Digital platforms"],
  },
  {
    slug: "real-estate-construction",
    title: "Real estate & construction",
    shortTitle: "Real estate",
    Icon: Building2,
    summary: "Creating places that strengthen neighbourhoods and communities.",
    detail: "This subgroup connects people working across property, design and construction to share practical wisdom, improve standards and build with long-term responsibility.",
    focus: ["Built environment", "Project delivery", "Community development"],
  },
  {
    slug: "energy",
    title: "Energy",
    shortTitle: "Energy",
    Icon: Leaf,
    summary: "Supporting the infrastructure that keeps homes, businesses and cities moving.",
    detail: "Energy members explore reliable, responsible ways to power enterprise and opportunity across the markets where KBX is growing.",
    focus: ["Reliable infrastructure", "Energy access", "Long-horizon stewardship"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortTitle: "Healthcare",
    Icon: Stethoscope,
    summary: "Pairing professional excellence with a deep regard for every person.",
    detail: "Healthcare members share insight across clinical practice, operations and service design while keeping dignity and access at the centre of the work.",
    focus: ["Patient dignity", "Care delivery", "Health systems"],
  },
  {
    slug: "trade-logistics",
    title: "Trade & logistics",
    shortTitle: "Trade & logistics",
    Icon: ShoppingBag,
    summary: "Moving goods, opportunity and trusted relationships across borders.",
    detail: "The trade and logistics subgroup helps members navigate sourcing, distribution and cross-border relationships with precision and accountability.",
    focus: ["Cross-border trade", "Supply chains", "Trusted relationships"],
  },
  {
    slug: "agriculture",
    title: "Agriculture",
    shortTitle: "Agriculture",
    Icon: Leaf,
    summary: "Growing food systems that honour land, labour and the future.",
    detail: "Agriculture members connect across production, processing and distribution to strengthen food systems and share practical market knowledge.",
    focus: ["Food systems", "Production and processing", "Regenerative practice"],
  },
  {
    slug: "professional-services",
    title: "Professional services",
    shortTitle: "Professional services",
    Icon: Compass,
    summary: "Making expertise available where decisions carry real weight.",
    detail: "Consultants, lawyers, accountants, advisers and other specialists bring disciplined counsel to the network and help members move from intention to execution.",
    focus: ["Trusted counsel", "Business operations", "Execution"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export const industryIcon = Heart;