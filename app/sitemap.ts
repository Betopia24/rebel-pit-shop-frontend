import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/seo"

const routes = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/classes",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/schedule",
    priority: 0.9,
    changeFrequency: "daily" as const,
  },
  {
    path: "/about",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/message",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: [
      absoluteUrl(
        route.path === "/"
          ? siteConfig.seo.openGraphImage
          : route.path === "/classes"
            ? "/images/classes/classes-header.jpg"
            : route.path === "/schedule"
              ? "/images/schedule/schedule-header.jpg"
              : route.path === "/about"
                ? "/images/about-us/about-header.jpg"
                : "/images/contact/contact-header.jpg"
      ),
    ],
  }))
}
