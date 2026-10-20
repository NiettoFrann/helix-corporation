import { MotionConfig } from "motion/react";

import { Hero } from "@/components/sections/Hero";

export const HelixApp = () => {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-dvh bg-background text-foreground">
        <Hero />
      </main>
    </MotionConfig>
  );
};
