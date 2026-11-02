import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InteractiveGrid } from "@/components/animations/InteractiveGrid";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen w-full flex flex-col bg-white">
        <InteractiveGrid />
        <LenisProvider>
          <div className="relative z-10 flex-1 flex flex-col">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
