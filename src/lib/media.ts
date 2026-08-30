import heroBand from "@/assets/kbx-hero-band.jpg.asset.json";
import vision1 from "@/assets/kbx-vision-1.jpg.asset.json";
import vision2 from "@/assets/kbx-vision-2.jpg.asset.json";
import story1 from "@/assets/kbx-story-1.jpg.asset.json";
import story2 from "@/assets/kbx-story-2.jpg.asset.json";
import story3 from "@/assets/kbx-story-3.jpg.asset.json";
import valuesBand from "@/assets/kbx-values-band.jpg.asset.json";
import givingBand from "@/assets/kbx-giving-band.jpg.asset.json";
import missionVideo from "@/assets/kbx-mission.mp4.asset.json";
import missionPoster from "@/assets/kbx-mission-poster.jpg.asset.json";
import logoMark from "@/assets/kbx-logo-mark.png.asset.json";

export const media = {
  heroBand: heroBand.url,
  vision1: vision1.url,
  vision2: vision2.url,
  story1: story1.url,
  story2: story2.url,
  story3: story3.url,
  valuesBand: valuesBand.url,
  givingBand: givingBand.url,
  missionVideo: missionVideo.url,
  missionPoster: missionPoster.url,
  logoMark: logoMark.url,
} as const;
