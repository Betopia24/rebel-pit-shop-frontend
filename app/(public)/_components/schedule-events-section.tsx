import scheduleEventsJson from "@/data/schedule-events.json"

import { ScheduleEventsClient } from "@/features/schedule/components/schedule-events-client"

import type { ScheduleEventsData } from "@/features/schedule/types"


/* =========================================================
   SCHEDULE EVENTS SECTION

   Responsibilities:
   - Load schedule data
   - Keep homepage/server rendering lightweight
   - Pass schedule data to the interactive client component

   IMPORTANT:
   Current weekday selection is intentionally NOT calculated
   here.

   Reason:
   This component can be statically rendered by Next.js.
   Using `new Date()` here could make the initially selected
   day reflect build/render time instead of the visitor's
   actual current day.

   The client component will determine the current weekday
   using the schedule's configured timezone.
========================================================= */

export function ScheduleEventsSection() {
  /* =======================================================
     DATA SOURCE

     Current:
     Static JSON mock data.

     Future API example:

     const response = await fetch(
       `${process.env.API_URL}/schedule`,
       {
         next: {
           revalidate: 300,
         },
       }
     )

     const data: ScheduleEventsData =
       await response.json()
  ======================================================= */

  const data =
    scheduleEventsJson as ScheduleEventsData


  /* =======================================================
     RENDER

     Semantic <section>, heading hierarchy, visual design,
     tabs and interactions are owned by ScheduleEventsClient.
  ======================================================= */

  return (
    <ScheduleEventsClient
      data={data}
    />
  )
}