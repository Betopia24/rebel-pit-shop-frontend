import type {
  Metadata,
  Viewport,
} from "next"

import { Inter } from "next/font/google"
import { siteConfig } from "@/config/site"
import "./globals.css"
import { InitialVideoLoader } from "./(public)/_components/initial-video-loader"


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})


export const metadata: Metadata = {
  metadataBase: new URL(
    siteConfig.url
  ),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description:
    siteConfig.description,

  applicationName:
    siteConfig.name,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator:
    siteConfig.name,

  publisher:
    siteConfig.name,

  category:
    "Sports & Fitness",

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    title: siteConfig.name,
    description:
      siteConfig.description,
    images: [
      {
        url: siteConfig.seo.openGraphImage,
        width: 1672,
        height: 941,
        alt: siteConfig.seo.openGraphImageAlt,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
      siteConfig.description,
    images: [
      siteConfig.seo.openGraphImage,
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview":
        "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: [
    {
      media:
        "(prefers-color-scheme: dark)",
      color: "#080808",
    },
    {
      media:
        "(prefers-color-scheme: light)",
      color: "#080808",
    },
  ],
}


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
        <InitialVideoLoader />
        {children}
      </body>
    </html>
  )
}
