import type React from "react";
import "./globals.css";
import "./custom-styles.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeTrack - Track Your Favorite Anime Series",
  description: "Keep track of your favorite anime shows and get notified when they finish airing.",
  icons: {
    icon: "/favicon.ico", // Standard favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.jpeg", // For Apple devices
  },
  openGraph: {
    title: "AnimeTrack - Track Your Favorite Anime Series",
    description: "Effortlessly track your anime watchlist and get updates when they finish airing.",
    url: "https://anime-tracka.vercel.app",
    siteName: "AnimeTrack",
    images: [
      {
        url: "/meta-image.jpeg", // Make sure this image exists in `public/`
        width: 1200,
        height: 630,
        alt: "AnimeTrack Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeTrack - Track Your Favorite Anime Series",
    description: "Effortlessly track your anime watchlist and get updates when they finish airing.",
    images: ["/meta-image.jpeg"],
  },
  other: {
    "google-site-verification": "t7eJ29ybqdoAWz2BAvwL4IoV5JgLBZqB164lqSzJuc4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={outfit.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
