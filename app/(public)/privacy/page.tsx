import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

const PAGE_TITLE = "Privacy Policy"
const PAGE_DESCRIPTION =
  "Learn how Rebel Boxing Club handles information submitted through its website."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      className="min-h-svh bg-background px-5 pb-20 pt-32 sm:px-8 md:px-10 md:pt-40"
    >
      <article className="mx-auto max-w-3xl text-text-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Legal
        </p>
        <h1 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-5 text-sm text-text-muted sm:text-base">
          Last updated: October 8, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 sm:text-base">
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              1. Information we collect
            </h2>
            <p className="mt-3">
              We may collect information you choose to provide, such as your name,
              email address, phone number, message, and details included in a training or
              scheduling inquiry. We may also receive technical information such as your
              browser, device, approximate location, IP address, and website activity.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              2. How we use information
            </h2>
            <p className="mt-3">
              We use information to respond to inquiries, coordinate requested services,
              operate and improve the website, protect the website and our users, and
              comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              3. Sharing information
            </h2>
            <p className="mt-3">
              We may share information with service providers that help us operate the
              website or respond to you, when required by law, or when reasonably needed
              to protect rights, safety, and security. We do not use submitted information
              for purposes unrelated to the reason it was collected without a lawful basis
              or appropriate notice.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              4. Cookies and analytics
            </h2>
            <p className="mt-3">
              The website may use essential technologies to provide core functionality and
              may use analytics or similar tools if enabled. Your browser may provide
              controls for managing cookies and related technologies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              5. Retention and security
            </h2>
            <p className="mt-3">
              We retain information only for as long as reasonably necessary for the
              purposes described in this policy, unless a longer period is required by
              law. We use reasonable safeguards, but no method of transmission or storage
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              6. Your choices
            </h2>
            <p className="mt-3">
              You may contact us to ask about information you have submitted, request a
              correction, or ask a question about how it is used. We may need to verify
              your request and may retain information when permitted or required by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              7. Children and policy changes
            </h2>
            <p className="mt-3">
              This website is not directed to children under 13. We may update this policy
              from time to time by posting a revised version on this page. The updated date
              above indicates when the policy was last changed.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              8. Contact us
            </h2>
            <p className="mt-3">
              For privacy questions or requests, contact {siteConfig.name} at{" "}
              <a className="text-primary underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
