import scheduleEventsJson from "@/data/schedule-events.json"

import { ScheduleEventsClient } from "@/features/schedule/components/schedule-events-client"

import type {
  ScheduleDayId,
  ScheduleEventsData,
} from "@/features/schedule/types"


function getCurrentScheduleDay(
  timeZone: string
): ScheduleDayId {
  const weekday = new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "short",
      timeZone,
    }
  )
    .format(new Date())
    .toLowerCase()

  return weekday.slice(0, 3) as ScheduleDayId
}


export async function ScheduleEventsSection() {
  /*
   * For now:
   * JSON mock data
   *
   * Later:
   *
   * const response = await fetch(
   *   `${process.env.API_URL}/schedule`,
   *   { next: { revalidate: 300 } }
   * )
   *
   * const data: ScheduleEventsData =
   *   await response.json()
   */

  const data =
    scheduleEventsJson as ScheduleEventsData

  const initialDay =
    getCurrentScheduleDay(data.timeZone)

  return (
    <ScheduleEventsClient
      data={data}
      initialDay={initialDay}
    />
  )
}