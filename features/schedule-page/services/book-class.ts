import type {
  ScheduleBookingInput,
} from "../types"

export async function bookScheduleClass(
  input: ScheduleBookingInput
) {
  const response =
    await fetch(
      "/api/schedule/book",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          input
        ),
      }
    )

  if (!response.ok) {
    throw new Error(
      "Unable to complete booking."
    )
  }

  return response.json()
}