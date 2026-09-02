import {
  Globe,
  TrendingUp,
  Users,
  Upload,
  Compass,
  BookOpen,
  Link2,
  Calendar,
  Scale,
  Sprout,
  Eye,
  GraduationCap,
  Coins,
  Zap,
  Heart,
  Building2,
  Megaphone,
  Home,
  Stethoscope,
} from "lucide-react";
import {
  Eyebrow,
  GoldButton,
  ImageBand,
  ImageSlot,
  OutlineButton,
  Reveal,
  Section,
  VideoBackdrop,
  GlassPanel,
  CountUp,
} from "./primitives";
import { JoinForm } from "./JoinForm";
import { MarketsMap } from "./MarketsMap";
import { media } from "@/lib/media";

const ICON = { size: 24, strokeWidth: 1.4 } as const;

/* ============ 6.1 Hero ============ */

const stats = [
  { label: "Members", value: "400+" },
  { label: "Countries", value: "11" },
  { label: "Chapters", value: "3" },
  { label: "Founded", value: "Lagos, 2023" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[min(860px,100svh)] overflow-hidden bg-ink pt-[calc(60px+var(--kbx-section))] min-[900px]:pt-[calc(72px+var(--kbx-section))]"
    >
      <img
        src="/media/kbx-hero-band.jpg"
        alt=""
        aria-hidden="true"
        width={1920}
        height={823}
        className="kbx-hero-background absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="kbx-wrap relative pb-[var(--kbx-section)]">
        <div className="kbx-hero-item" style={{ animationDelay: "0ms" }}>
          <Eyebrow tone="dark">Kingdom Business Connections · Est. 2023</Eyebrow>
        </div>
        <h1
          className="kbx-h1 kbx-hero-item mt-8 max-w-[20ch] text-white"
          style={{ animationDelay: "60ms" }}
        >
          A global kingdom network in the marketplace.
        </h1>
        <p
          className="kbx-lede kbx-hero-item mt-8 max-w-[52ch] text-white-82"
          style={{ animationDelay: "120ms" }}
        >
          KBX connects Christian business professionals and entrepreneurs across continents — to
          disciple the marketplace, fund kingdom work, and build enterprises that hold their
          integrity under pressure.
        </p>
        <div
          className="kbx-hero-item mt-12 flex flex-wrap gap-4"
          style={{ animationDelay: "180ms" }}
        >
          <GoldButton href="#join">Apply for membership</GoldButton>
          <OutlineButton href="#story" className="text-white">
            Read our story
          </OutlineButton>
        </div>

        <div
          className="kbx-hero-item mt-20 grid grid-cols-2 border-t border-white-18 pt-10 min-[900px]:grid-cols-4"
          style={{ animationDelay: "240ms" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-0 py-3 min-[900px]:px-8 ${i > 0 ? "min-[900px]:border-l min-[900px]:border-white-18" : ""} ${i === 0 ? "min-[900px]:pl-0" : ""}`}
            >
              <p className="kbx-micro text-white-56">{stat.label}</p>
              <p className="font-display mt-3 text-[1.4rem] text-white">
                <CountUp value={stat.value} />
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* ============ 6.2 Mission ============ */

const missionClauses = [
  {
    index: "A",
    title: "A global network",
    body: "Not a local club. KBX is built to hold members in Lagos, London and Dubai to the same standard and the same table.",
  },
  {
    index: "B",
    title: "Of kingdom-minded professionals",
    body: "Membership assumes faith is not a private matter left at the office door — it is the operating principle of the business.",
  },
  {
    index: "C",
    title: "Connected for real work",
    body: "Introductions exist to move something: capital, counsel, a hire, a contract, a correction.",
  },
  {
    index: "D",
    title: "Accountable to one another",
    body: "Connection without accountability becomes networking. Members are known, reviewed and answerable.",
  },
  {
    index: "E",
    title: "Serving the marketplace",
    body: "The marketplace is the mission field. Discipleship happens in boardrooms, warehouses and workshops.",
  },
  {
    index: "F",
    title: "For kingdom return",
    body: "Profit is not the terminus. Enterprise funds evangelism, relief and the building of local churches.",
  },
];

export function Mission() {
  return (
    <Section id="mission" className="relative bg-ink-2">
      <VideoBackdrop src={media.missionVideo} poster={media.missionPoster} />
      <div className="relative">
        <Reveal>
          <Eyebrow tone="dark">01 — Mission</Eyebrow>
          <h2 className="kbx-h2 mt-8 max-w-[34ch] text-white">
            A global network of kingdom-minded professionals, connected and accountable, serving
            the marketplace for kingdom return.
          </h2>
          <p className="kbx-lede mt-8 max-w-[60ch] text-white-82">
            Every part of the mission statement carries its own work. This is how we read it.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-white-18 min-[900px]:grid-cols-2 min-[1240px]:grid-cols-3">
          {missionClauses.map((clause, i) => (
            <Reveal key={clause.index} delay={Math.min(i, 3) * 50}>
              <GlassPanel className="h-full p-9">
                <p className="kbx-micro text-gold">{clause.index}</p>
                <h3 className="kbx-h3-sm mt-5 text-white">{clause.title}</h3>
                <p className="mt-4 text-white-56">{clause.body}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============ 6.3 Vision ============ */

const bodiesOfWork = [
  {
    Icon: Users,
    title: "Connecting believers",
    body: "Chapters, forums and member introductions that place trusted professionals within reach of one another.",
  },
  {
    Icon: BookOpen,
    title: "Discipling the marketplace",
    body: "Teaching, scripture study and mentorship aimed squarely at the decisions business people actually face.",
  },
  {
    Icon: Upload,
    title: "Funding kingdom initiatives",
    body: "Member giving directed to Bible distribution, church building, evangelism and relief — recorded against its cause.",
  },
  {
    Icon: Globe,
    title: "Building platforms",
    body: "Tools, directories and applications that make the network usable rather than ceremonial.",
  },
];

export function Vision() {
  return (
    <Section id="vision" className="bg-paper">
      <Reveal>
        <Eyebrow>02 — Vision</Eyebrow>
        <h2 className="kbx-h2 mt-8 max-w-[28ch]">Four bodies of work.</h2>
        <p className="kbx-lede mt-8 max-w-[60ch] text-slate">
          The vision divides cleanly into four commitments. Each is resourced, each is measured, and
          none is decorative.
        </p>
      </Reveal>

      <div className="kbx-grid-hairline mt-16 grid-cols-1 min-[900px]:grid-cols-2">
        {bodiesOfWork.map((item, i) => (
          <Reveal
            key={item.title}
            delay={Math.min(i, 3) * 50}
            className="group bg-paper-2 p-9 transition-colors duration-[200ms] ease-out hover:bg-paper"
          >
            <item.Icon {...ICON} aria-hidden="true" className="text-ink" />
            <h3 className="kbx-h3-sm mt-6">{item.title}</h3>
            <p className="mt-4 text-slate">{item.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 min-[900px]:grid-cols-2">
        <Reveal>
          <ImageBand
            src={media.vision1}
            alt="Two KBX members talking after a session"
            ratio="4:3"
            width={800}
            height={600}
          />
        </Reveal>
        <Reveal delay={80}>
          <figure>
            <ImageBand
              src={media.vision2}
              alt="Hands open in prayer at a KBX meeting"
              ratio="4:3"
              width={800}
              height={600}
            />
            <figcaption className="kbx-micro mt-4 text-gold-deep">
              Prayer opens every meeting
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============ 6.4 Story ============ */

const timeline = [
  {
    date: "Jan — May 2023",
    title: "First conversations, Lagos",
    body: "A handful of founders and executives begin meeting to ask what a serious faith-led business network would require.",
  },
  {
    date: "Jun 2023",
    title: "KBX Lagos, first meeting",
    body: "The first formal gathering sets the shape of membership: reviewed, accountable, and organised around real work.",
  },
  {
    date: "2024",
    title: "Industry subgroups form",
    body: "Eight industry groups begin meeting separately so counsel is specific rather than general.",
  },
  {
    date: "2025",
    title: "Giving record published",
    body: "Every gift is noted against its cause on a transparent record shared with members.",
  },
  {
    date: "2026",
    title: "Next markets named",
    body: "China, Japan and Dubai are named as the next chapters, with member leads appointed in each.",
  },
];

export function Story() {
  return (
    <Section id="story" className="bg-paper">
      <Reveal>
        <Eyebrow>03 — Story</Eyebrow>
        <h2 className="kbx-h2 mt-8 max-w-[28ch]">How KBX came to be.</h2>
      </Reveal>

      <div className="mt-16 grid gap-16 min-[900px]:grid-cols-[1fr_360px] min-[900px]:gap-20">
        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[3px] w-px bg-hairline"
          />
          {timeline.map((node, i) => (
            <Reveal as="li" key={node.date} delay={Math.min(i, 3) * 50} className="relative pb-12 pl-10">
              <span
                aria-hidden="true"
                className="absolute top-[7px] left-0 h-[7px] w-[7px] bg-gold"
              />
              <p className="kbx-micro text-gold-deep">{node.date}</p>
              <h3 className="kbx-h3-sm mt-4">{node.title}</h3>
              <p className="mt-3 max-w-[52ch] text-slate">{node.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className="grid grid-cols-1 gap-6 min-[600px]:grid-cols-3 min-[900px]:grid-cols-1">
          <Reveal>
            <ImageBand
              src={media.story1}
              alt="A KBX member at work"
              ratio="4:5"
              width={600}
              height={750}
            />
          </Reveal>
          <Reveal delay={60}>
            <ImageBand
              src={media.story2}
              alt="The tenth KBX meeting"
              ratio="4:5"
              width={600}
              height={750}
            />
          </Reveal>
          <Reveal delay={120}>
            <ImageBand
              src={media.story3}
              alt="KBX Lagos first meeting"
              ratio="4:5"
              width={600}
              height={750}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ============ 6.5 Values ============ */

const values = [
  { Icon: Scale, title: "Honesty & integrity", body: "The books, the claims and the conduct all agree." },
  { Icon: Sprout, title: "Humility", body: "Repentant hearts, corrected quickly and without spectacle." },
  { Icon: Eye, title: "Discernment", body: "Protection of members, capital and reputation before opportunity." },
  { Icon: GraduationCap, title: "Servant leadership", body: "Knowledge held in trust for the people it can serve." },
  { Icon: BookOpen, title: "Continuous learning", body: "Competence is a stewardship, not a fixed possession." },
  { Icon: Coins, title: "Abundance mindset", body: "Referrals given freely; scarcity thinking declined." },
  { Icon: Zap, title: "Action & excellence", body: "Commitments delivered on time and to a standard." },
  { Icon: Compass, title: "Alignment & intimacy", body: "Business decisions tested against a life with God." },
];

export function Values() {
  return (
    <Section id="values" className="bg-white">
      <Reveal>
        <Eyebrow>04 — Values</Eyebrow>
        <h2 className="kbx-h2 mt-8 max-w-[28ch]">Eight values we are held to.</h2>
        <p className="kbx-lede mt-8 max-w-[60ch] text-slate">
          These are the terms of membership rather than a wall poster. Members are reviewed against
          them.
        </p>
      </Reveal>

      <div className="kbx-grid-hairline mt-16 grid-cols-1 min-[900px]:grid-cols-2 min-[1240px]:grid-cols-4">
        {values.map((value, i) => (
          <Reveal
            key={value.title}
            delay={Math.min(i, 3) * 50}
            className="group bg-white p-8 transition-colors duration-[200ms] ease-out hover:bg-paper"
          >
            <value.Icon {...ICON} aria-hidden="true" className="text-ink" />
            <h3 className="kbx-h3-sm mt-6">{value.title}</h3>
            <p className="mt-3 text-slate">{value.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <ImageBand
          src={media.valuesBand}
          alt="KBX members eating together around a table"
          ratio="21:9"
          width={1920}
          height={823}
        />
      </Reveal>
    </Section>
  );
}

/* ============ 6.6 Markets (teal) ============ */

const markets = [
  { label: "Active chapter", title: "Lagos, Nigeria", body: "The founding chapter. Monthly gatherings, eight industry subgroups, member-led mentoring." },
  { label: "Named next", title: "Dubai, UAE", body: "A trade and capital corridor for members expanding beyond West Africa." },
  { label: "Named next", title: "China", body: "Manufacturing and sourcing relationships held to the same accountability standard." },
  { label: "Named next", title: "Japan", body: "A long-horizon market for members in technology and precision industry." },
];

export function Markets() {
  return (
    <Section id="markets" className="relative bg-teal">
      <Reveal>
        <Eyebrow tone="dark">05 — Markets</Eyebrow>
        <h2 className="kbx-h2 mt-8 max-w-[28ch] text-white">Global reach, named plainly.</h2>
        <p className="kbx-lede mt-8 max-w-[60ch] text-white-82">
          KBX grows by chapter, not by announcement. A market is listed here only once a member is
          accountable for it.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <MarketsMap />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-6 min-[900px]:grid-cols-2 min-[1240px]:grid-cols-4">
        {markets.map((market, i) => (
          <Reveal key={market.title} delay={Math.min(i, 3) * 50}>
            <GlassPanel className="h-full p-8">
              <p className="kbx-micro text-gold">{market.label}</p>
              <h3 className="kbx-h3-sm mt-5 text-white">{market.title}</h3>
              <p className="mt-4 text-white-82">{market.body}</p>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============ 6.7 Giving (rust) ============ */

const causes = [
  { Icon: BookOpen, title: "Bible distribution", body: "Scripture placed in schools, prisons and rural congregations." },
  { Icon: Building2, title: "Church building", body: "Construction and repair for congregations without capital access." },
  { Icon: Megaphone, title: "Evangelism programmes", body: "Field teams, training and materials across member markets." },
  { Icon: Home, title: "Homeless ministry", body: "Food banks and shelter partnerships in chapter cities." },
  { Icon: Stethoscope, title: "Hospital outreach", body: "Bills, supplies and visitation for patients without cover." },
];

const ledger = [
  { cause: "Bible distribution", period: "Q1 2026", amount: "₦ 6,400,000" },
  { cause: "Church building — Ogun", period: "Q1 2026", amount: "₦ 11,250,000" },
  { cause: "Evangelism programmes", period: "Q4 2025", amount: "₦ 3,800,000" },
  { cause: "Food bank, Lagos Island", period: "Q4 2025", amount: "₦ 2,150,000" },
];

export function Giving() {
  return (
    <Section id="giving" className="relative bg-rust">
      <Reveal>
        <Eyebrow tone="dark">06 — Giving</Eyebrow>
        <h2 className="kbx-h2 mt-8 max-w-[28ch] text-white">
          Every gift noted against its cause.
        </h2>
        <p className="kbx-lede mt-8 max-w-[60ch] text-white-82">
          Giving through KBX is recorded on a transparent record. Members can see what was given,
          when, and what it paid for.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-6 min-[900px]:grid-cols-2 min-[1240px]:grid-cols-4">
        {causes.map((cause, i) => (
          <Reveal key={cause.title} delay={Math.min(i, 3) * 50}>
            <GlassPanel className="h-full p-8">
              <cause.Icon {...ICON} aria-hidden="true" className="text-white" />
              <h3 className="kbx-h3-sm mt-6 text-white">{cause.title}</h3>
              <p className="mt-4 text-white-82">{cause.body}</p>
            </GlassPanel>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <GlassPanel className="p-8">
          <p className="kbx-micro text-gold">Transparency record · extract</p>
          <table className="mt-8 w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.18]">
                <th className="kbx-micro pb-3 font-medium text-white-56">Cause</th>
                <th className="kbx-micro pb-3 font-medium text-white-56">Period</th>
                <th className="kbx-micro pb-3 text-right font-medium text-white-56">Applied</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((row) => (
                <tr key={row.cause} className="border-b border-white/[0.18]">
                  <td className="py-4 text-white">{row.cause}</td>
                  <td className="kbx-micro py-4 text-white-56">{row.period}</td>
                  <td className="py-4 text-right font-mono text-[0.9rem] text-white">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>
      </Reveal>

      <Reveal className="mt-16">
        <ImageBand
          src={media.givingBand}
          alt="A KBX-funded outreach food distribution"
          ratio="21:9"
          width={1920}
          height={823}
        />
      </Reveal>
    </Section>
  );
}

/* ============ 6.8 Goals ============ */

const pillars = [
  { Icon: Scale, title: "Character", body: "Members are formed before they are promoted. Conduct is the first credential." },
  { Icon: TrendingUp, title: "Capacity", body: "Skills, systems and counsel that let a business carry more weight without breaking." },
  { Icon: Users, title: "Community", body: "Chapters and subgroups where a member is known well enough to be corrected." },
  { Icon: Coins, title: "Capital", body: "Access to funding, partnership and markets on terms that hold their integrity." },
];

const industries = [
  "Financial services",
  "Technology",
  "Real estate & construction",
  "Energy",
  "Healthcare",
  "Trade & logistics",
  "Agriculture",
  "Professional services",
];

export function Goals() {
  return (
    <Section id="goals" className="bg-paper">
      <Reveal>
        <Eyebrow>07 — Goals</Eyebrow>
        <h2 className="kbx-h2 mt-8 max-w-[28ch]">Mapping our mission.</h2>
        <p className="kbx-lede mt-8 max-w-[60ch] text-slate">
          Four pillars carry the work: character, capacity, community, capital. Everything KBX runs
          maps back to one of them.
        </p>
      </Reveal>

      <div className="kbx-grid-hairline mt-16 grid-cols-1 min-[900px]:grid-cols-2 min-[1240px]:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal
            key={pillar.title}
            delay={Math.min(i, 3) * 50}
            className="group bg-paper-2 p-8 transition-colors duration-[200ms] ease-out hover:bg-white"
          >
            <pillar.Icon {...ICON} aria-hidden="true" className="text-ink" />
            <h3 className="kbx-h3-sm mt-6">{pillar.title}</h3>
            <p className="mt-3 text-slate">{pillar.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 border-t border-hairline pt-8">
        <p className="kbx-micro text-slate-2">Eight industry subgroups</p>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {industries.map((industry) => (
            <li key={industry} className="kbx-micro flex items-center gap-2 text-slate">
              <Link2 size={14} strokeWidth={1.4} aria-hidden="true" className="text-gold-deep" />
              {industry}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

/* ============ 6.9 Join ============ */

const steps = [
  { n: "01", label: "Application", body: "You tell us who you are and what you build." },
  { n: "02", label: "Review", body: "The membership team reads every application by hand." },
  { n: "03", label: "Member conversation", body: "A call with an existing member, both ways." },
  { n: "04", label: "Decision", body: "A clear yes or no, with the reason given." },
];

export function Join() {
  return (
    <Section id="join" className="bg-paper">
      <div className="grid grid-cols-1 gap-16 min-[900px]:grid-cols-2 min-[900px]:gap-20">
        <Reveal>
          <Eyebrow>08 — Join</Eyebrow>
          <h2 className="kbx-h2 mt-8 max-w-[24ch]">Membership is an application.</h2>
          <p className="kbx-lede mt-8 max-w-[52ch] text-slate">
            Joining is reviewed, not instant. The network is only as trustworthy as the people
            inside it, so every application is read by a person.
          </p>

          <ol className="mt-12">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-6 border-t border-hairline py-5">
                <span className="kbx-micro pt-1 text-gold-deep">{step.n}</span>
                <span>
                  <span className="kbx-h3-sm block">{step.label}</span>
                  <span className="mt-2 block text-slate">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex items-center gap-4">
            <Calendar size={24} strokeWidth={1.4} aria-hidden="true" className="text-ink" />
            <p className="text-slate">Applications are reviewed in the first week of each month.</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <JoinForm />
        </Reveal>
      </div>
    </Section>
  );
}

export { Heart };
