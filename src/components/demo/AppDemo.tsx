"use client";

import { getApp } from "@/lib/apps";
import { CrumbleDemo } from "./CrumbleDemo";
import { MousseDemo } from "./MousseDemo";
import { PacmenuDemo } from "./PacmenuDemo";
import { SoundwichDemo } from "./SoundwichDemo";

const DEMOS: Record<string, typeof SoundwichDemo> = {
  soundwich: SoundwichDemo,
  crumble: CrumbleDemo,
  "pac-men-u": PacmenuDemo,
  mousse: MousseDemo,
};

export function AppDemo({ slug }: { slug: string }) {
  const app = getApp(slug);
  const Demo = DEMOS[slug];
  if (!app || !Demo) return null;
  return <Demo app={app} />;
}
