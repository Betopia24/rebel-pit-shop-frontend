import type {
  Metadata,
  Viewport,
} from "next"

import { Inter } from "next/font/google"

import { siteConfig } from "@/config/site"

import "./globals.css"


/* =========================================================
   FONT

   Variable is consumed from globals.css:
   --font-inter
========================================================= */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})


/* =========================================================
   ROOT METADATA

   This is the global SEO foundation.

   Individual pages should provide their own:
   - title
   - description
   - canonical
   - page-specific Open Graph metadata
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,

  category: "Sports & Fitness",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },


  /* =======================================================
     DEFAULT OPEN GRAPH

     Page-level metadata can override title/description/url.
  ======================================================= */

  openGraph: {
    type: "website",

    siteName: siteConfig.name,

    locale: "en_US",

    title: siteConfig.name,

    description:
      siteConfig.description,
  },


  /* =======================================================
     TWITTER / SOCIAL PREVIEW
  ======================================================= */

  twitter: {
    card: "summary_large_image",

    title: siteConfig.name,

    description:
      siteConfig.description,
  },


  /* =======================================================
     SEARCH ENGINE DIRECTIVES

     robots.ts will later provide crawler-level rules.
  ======================================================= */

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },
}


/* =========================================================
   VIEWPORT

   Kept separate because Next.js recommends the
   dedicated Viewport export.
========================================================= */

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  viewportFit: "cover",

  themeColor: [
    {
      media:
        "(prefers-color-scheme: dark)",

      color:
        "#080808",
    },
    {
      media:
        "(prefers-color-scheme: light)",

      color:
        "#080808",
    },
  ],
}


/* =========================================================
   ROOT LAYOUT

   Do NOT add Navbar / Footer here.

   Reason:
   RootLayout wraps every future route, including:
   - public pages
   - admin
   - dashboard
   - auth
   - API-adjacent UI routes

   Public chrome belongs in:
   app/(public)/layout.tsx
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`
          ${inter.variable}

          min-h-dvh

          bg-background
          text-foreground
        `}
      >
        {children}
      </body>
    </html>
  )
}