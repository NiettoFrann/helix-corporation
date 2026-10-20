import { MotionConfig } from "motion/react";

import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { NetworkMap } from "@/components/sections/NetworkMap";

export const HelixApp = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        <main className="flex-1">
          <Hero />
          <NetworkMap />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};
