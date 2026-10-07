
import { coaches } from "@/features/about/data/coaches"

import type { Coach } from "@/features/about/types"


/* =========================================================
   COACH DATA SERVICE

   Single data-access boundary for About Us coaches.

   Current:
   Local static data.

   Future:
   Backend / CMS / REST API / database.

   The MeetTheRebelsSection component does not need
   to know where the data came from.
========================================================= */

export async function getCoaches(): Promise<Coach[]> {
  return [...coaches].sort(
    (first, second) =>
      first.sortOrder - second.sortOrder
  )
}
