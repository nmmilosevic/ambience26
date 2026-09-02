import type { Metadata } from "next";
import { Epilogue, Tenor_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { Providers } from "@/components/Providers";
import { site, siteMeta } from "@/content/site";
import "./globals.css";

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: `%s | ${site.fullName}`,
  },
  description: siteMeta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tenor.variable} ${epilogue.variable}`}>
      <body className="min-h-[100dvh] bg-bg font-body text-ink antialiased">
        <Providers>{children}</Providers>
        <SiteFooter />
      </body>
    </html>
  );
}
