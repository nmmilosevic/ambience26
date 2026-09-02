"use client";

import { SiteLoader } from "./SiteLoader";
import { PageTransition } from "./PageTransition";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <SiteLoader />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
