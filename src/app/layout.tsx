import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile } from "@/data/profile";
import "./globals.css";
import { appearanceBoot } from "@/components/appearance-boot";

const barlow = localFont({
  src: [{ path: "./fonts/barlow-400.ttf", weight: "400" }, { path: "./fonts/barlow-600.ttf", weight: "600" }],
  variable: "--font-barlow",
  display: "swap",
});

const condensed = localFont({
  src: "./fonts/barlow-semi-condensed-600.ttf",
  weight: "600",
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.metadataDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${condensed.variable}`}
      suppressHydrationWarning
    >
      <head><meta name="theme-color" content="#F6F6F5" suppressHydrationWarning /><script dangerouslySetInnerHTML={{ __html: appearanceBoot }} /></head>
      <body>{children}</body>
    </html>
  );
}
