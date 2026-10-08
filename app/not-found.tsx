import Link from "next/link"

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Home,
} from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh w-full items-center overflow-hidden bg-background px-5 py-24 text-foreground sm:px-8 md:px-10">
      {/* Ambient boxing-ring accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 size-[min(92vw,58rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
        <div className="absolute left-1/2 top-1/2 size-[min(70vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-primary/12 to-transparent" />
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.38em] text-primary sm:text-sm">
          Round not found
        </p>

        <div className="relative mx-auto mt-5 w-fit">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-3 h-5 rounded-full bg-primary/20 blur-2xl"
          />
          <p className="relative font-heading text-[clamp(7rem,28vw,15rem)] font-black leading-[0.78] tracking-[-0.08em] text-foreground/95">
            404
          </p>
        </div>

        <h1 className="mt-8 font-heading text-3xl font-black uppercase tracking-tight sm:text-5xl">
          This page missed the bell.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-text-soft sm:text-base">
          The page you are looking for has moved, been removed, or never entered
          the ring. Head back to the corner and choose your next round.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 min-[430px]:flex-row">
          <Link
            href="/"
            className="rebel-gold-surface inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-gold-hover px-6 text-[13px] font-bold uppercase tracking-[0.075em] text-background shadow-[var(--shadow-gold-sm)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[var(--shadow-gold-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Home aria-hidden="true" className="size-4" strokeWidth={2} />
            Back to home
          </Link>

          <Link
            href="/schedule"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-foreground/20 bg-foreground/5 px-6 text-[13px] font-bold uppercase tracking-[0.075em] text-foreground transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/55 hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none"
          >
            <CalendarDays
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.9}
            />
            View schedule
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </Link>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={2} />
          Return to the corner
        </Link>
      </div>
    </main>
  )
}
