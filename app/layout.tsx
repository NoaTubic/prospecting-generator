import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PitchForge - AI Prospecting Message Generator",
  description:
    "Generate personalized cold emails, LinkedIn DMs, and Twitter messages with AI. 3 strategic angles per prospect. Free outreach tool.",
  openGraph: {
    title: "PitchForge - AI Prospecting Message Generator",
    description:
      "Free AI-powered outreach message generator for B2B sales.",
    url: "https://prospecting-gen.vercel.app",
    siteName: "PitchForge",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
