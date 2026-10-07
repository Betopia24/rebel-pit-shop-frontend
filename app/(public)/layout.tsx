import type { ReactNode } from "react"

import { Footer } from "@/components/layout/public/footer"
import { Navbar } from "@/components/layout/public/navbar"


/* =========================================================
   TYPES
========================================================= */

type PublicLayoutProps = {
  children: ReactNode
}


/* =========================================================
   PUBLIC LAYOUT

   Applies to all routes inside:

   app/(public)/...

   Examples:
   /
   /about
   /schedule
   /classes
   /message
   /sign-waiver

   Shared public chrome belongs here:
   - Navbar
   - Footer

   IMPORTANT:
   Individual pages should render their own <main> element
   with:

   id="main-content"
========================================================= */

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <>
      {/* =====================================================
          ACCESSIBILITY — SKIP LINK

          Hidden visually until keyboard-focused.

          Every public page should have:

          <main id="main-content">
      ====================================================== */}

      <a
        href="#main-content"
        className="
          fixed
          left-4
          top-4

          z-[var(--z-accessibility)]

          -translate-y-24

          rounded-md

          border
          border-primary/70

          bg-primary

          px-4
          py-2.5

          text-sm
          font-semibold
          text-primary-foreground

          shadow-[var(--shadow-gold-sm)]

          transition-transform
          duration-200
          ease-out

          focus:translate-y-0

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background

          motion-reduce:transition-none
        "
      >
        Skip to main content
      </a>


      {/* =====================================================
          SITE HEADER

          Navbar itself will control:
          - sticky positioning
          - mobile / desktop visibility
          - navbar background
          - z-index
      ====================================================== */}

      <Navbar />


      {/* =====================================================
          PAGE CONTENT

          Do NOT wrap this in another <main>.

          Each page owns its semantic <main>.
          This prevents nested <main> elements.
      ====================================================== */}

      {children}


      {/* =====================================================
          SITE FOOTER
      ====================================================== */}

      <Footer />
    </>
  )
}
