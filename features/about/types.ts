
/* =========================================================
   ABOUT — COACH DATA MODEL

   Shared contract for:
   - Local static data
   - Future backend API
   - Meet the Rebels UI
   - Future coach detail pages
========================================================= */

export type CoachImage = {
  src: string
  alt: string
}

export type Coach = {
  id: string
  slug: string

  name: string
  role: string

  image: CoachImage

  biography: string[]
  specialties: string[]

  sortOrder: number
}
