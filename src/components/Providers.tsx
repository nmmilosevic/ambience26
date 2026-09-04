"use client";

import { SiteLoader } from "./SiteLoader";
import { PageTransition } from "./PageTransition";
import { MotionReadyProvider } from "./MotionReady";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionReadyProvider>
      <SiteLoader />
      <PageTransition>{children}</PageTransition>
    </MotionReadyProvider>
  );
}
