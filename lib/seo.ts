import { siteConfig } from "@/config/site"

export const siteOrigin = new URL(
  "/",
  siteConfig.url
).toString().replace(/\/$/, "")

export function absoluteUrl(
  path: string
): string {
  return new URL(
    path,
    `${siteOrigin}/`
  ).toString()
}

export function serializeJsonLd(
  value: unknown
): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}

export function createOrganizationSchema(
  imagePath: string = siteConfig.seo.openGraphImage
) {
  return {
    "@type": "HealthClub",
    "@id": `${siteOrigin}#organization`,
    name: siteConfig.business.name,
    url: siteOrigin,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: absoluteUrl(imagePath),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.street,
      addressLocality: siteConfig.business.address.city,
      addressRegion: siteConfig.business.address.region,
      postalCode: siteConfig.business.address.postalCode,
      addressCountry: siteConfig.business.address.country,
    },
    openingHoursSpecification:
      siteConfig.hours.map((schedule) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schedule.dayOfWeek.map(
          (day) => `https://schema.org/${day}`
        ),
        opens: schedule.opens,
        closes: schedule.closes,
      })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  }
}

export function createWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteOrigin}#website`,
    name: siteConfig.name,
    url: siteOrigin,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@id": `${siteOrigin}#organization`,
    },
  }
}

export function createBreadcrumbSchema(
  items: ReadonlyArray<{
    name: string
    path: string
  }>,
  pagePath: string
) {
  const pageUrl = absoluteUrl(pagePath)

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
