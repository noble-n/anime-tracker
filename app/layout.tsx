import type React from "react"
import "./globals.css"
import "./custom-styles.css"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AnimeTrack - Track Your Favorite Anime Series",
  description: "Keep track of your favorite anime shows and get notified when they finish airing",
  icons: "/favicon.ico",
  other: {
    "google-site-verification": "t7eJ29ybqdoAWz2BAvwL4IoV5JgLBZqB164lqSzJuc4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
         {children}
         <Toaster />
         <Analytics />
        </body>
    </html>
  )
}

