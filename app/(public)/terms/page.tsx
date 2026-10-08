import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

const PAGE_TITLE = "Terms & Conditions"
const PAGE_DESCRIPTION =
  "Read the terms that apply to use of the Rebel Boxing Club website and related training inquiries."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
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
              1. Agreement to these terms
            </h2>
            <p className="mt-3">
              These Terms & Conditions govern your use of the {siteConfig.name} website.
              By using this website, you agree to these terms. If you do not agree,
              please do not use the website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              2. Website information
            </h2>
            <p className="mt-3">
              We aim to keep website information accurate and current, but schedules,
              programs, pricing, availability, and other details may change. Information
              on this website does not replace a direct confirmation from the club.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              3. Training and safety
            </h2>
            <p className="mt-3">
              Boxing and fitness activities involve physical exertion and inherent risks.
              Follow coach instructions, use equipment responsibly, and tell a qualified
              professional about any health limitations before participating. A waiver,
              health screening, membership agreement, or additional rules may apply to
              in-person training.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              4. Acceptable use
            </h2>
            <p className="mt-3">
              You agree not to misuse the website, interfere with its operation, attempt
              unauthorized access, submit unlawful or harmful material, or use website
              content to violate another person&apos;s rights.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              5. Intellectual property
            </h2>
            <p className="mt-3">
              The website, branding, text, graphics, images, video, and other content are
              owned by or licensed to {siteConfig.name}. You may view the website for
              personal, non-commercial use, but you may not reproduce, modify, distribute,
              or commercially exploit its content without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              6. Third-party links
            </h2>
            <p className="mt-3">
              The website may link to third-party websites or services. We are not
              responsible for third-party content, availability, privacy practices, or
              terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              7. Disclaimers and liability
            </h2>
            <p className="mt-3">
              To the extent permitted by law, the website is provided on an “as is” and
              “as available” basis. We do not guarantee that the website will always be
              uninterrupted, error-free, or complete. Nothing in these terms excludes
              liability that cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">
              8. Changes and contact
            </h2>
            <p className="mt-3">
              We may update these terms from time to time by posting a revised version on
              this page. Questions about these terms can be sent to{" "}
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
