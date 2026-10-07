import {
  ScheduleExplorer,
} from "@/features/schedule-page/components/schedule-explorer"

import {
  getScheduleWeek,
} from "@/features/schedule-page/services/get-schedule"

export async function ScheduleMainSection() {
  const schedule =
    await getScheduleWeek()

  return (
    <section
      id="schedule-main"
      aria-labelledby="schedule-main-heading"
      className="
        relative
        isolate

        scroll-mt-24

        overflow-hidden

        bg-background
        text-foreground
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(ellipse_at_50%_0%,var(--gold-04),transparent_45%)]
        "
      />

      <div
        className="
          relative
          z-10
        "
      >
        <ScheduleExplorer
          initialWeek={
            schedule
          }
        />
      </div>
    </section>
  )
}