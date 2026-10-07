"use client"

import * as React from "react"

import {
  ArrowRight,
  ChevronDown,
  Send,
} from "lucide-react"

/* =========================================================
   CONTACT MESSAGE FORM

   API-ready frontend boundary.

   Current:
   - Full form UI
   - Client-side submission state
   - POSTs JSON to /api/contact

   Future:
   - Implement /api/contact
   OR
   - Change CONTACT_ENDPOINT to your backend endpoint.

   No visual component rewrite will be required.
========================================================= */

const CONTACT_ENDPOINT =
  "/api/contact"

const interestOptions = [
  {
    value: "",
    label: "I'm Interested In...",
  },
  {
    value: "boxing-classes",
    label: "Boxing Fitness Classes",
  },
  {
    value: "kickboxing",
    label: "Kickboxing",
  },
  {
    value: "personal-training",
    label: "Personal Training",
  },
  {
    value: "group-training",
    label: "Private / Group Training",
  },
  {
    value: "nutrition",
    label: "Nutrition Coaching",
  },
  {
    value: "membership",
    label: "General Membership",
  },
  {
    value: "other",
    label: "Something Else",
  },
] as const

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"

export function ContactMessageForm() {
  const [
    status,
    setStatus,
  ] =
    React.useState<SubmitStatus>(
      "idle"
    )

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const form =
      event.currentTarget

    const formData =
      new FormData(form)

    const payload = {
      firstName:
        formData.get("firstName"),
      lastName:
        formData.get("lastName"),
      email:
        formData.get("email"),
      phone:
        formData.get("phone"),
      interest:
        formData.get("interest"),
      message:
        formData.get("message"),
    }

    setStatus("submitting")

    try {
      const response =
        await fetch(
          CONTACT_ENDPOINT,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        )

      if (!response.ok) {
        throw new Error(
          "Contact request failed."
        )
      }

      form.reset()

      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const isSubmitting =
    status === "submitting"

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* =====================================================
          NAME
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1

          gap-4

          sm:grid-cols-2
        "
      >
        <FormField
          id="firstName"
          name="firstName"
          label="First Name"
          autoComplete="given-name"
          required
        />

        <FormField
          id="lastName"
          name="lastName"
          label="Last Name"
          autoComplete="family-name"
          required
        />
      </div>

      {/* =====================================================
          EMAIL + PHONE
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1

          gap-4

          sm:grid-cols-2
        "
      >
        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          required
        />

        <FormField
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          autoComplete="tel"
        />
      </div>

      {/* =====================================================
          INTEREST
      ====================================================== */}

      <div>
        <label
          htmlFor="interest"
          className="
            mb-2
            block

            text-[10px]
            font-bold
            uppercase

            tracking-[0.16em]

            text-text-secondary
          "
        >
          I&apos;m Interested In
        </label>

        <div className="relative">
          <select
            id="interest"
            name="interest"
            defaultValue=""
            required
            className="
              min-h-12
              w-full

              appearance-none

              rounded-md

              border
              border-foreground/15

              bg-surface

              px-4
              pr-12

              text-sm
              text-foreground

              outline-none

              transition-[border-color,box-shadow,background-color]
              duration-200

              hover:border-foreground/25

              focus:border-primary/60
              focus:bg-surface-card
              focus:ring-2
              focus:ring-primary/15
            "
          >
            {interestOptions.map(
              (option) => (
                <option
                  key={
                    option.value ||
                    "placeholder"
                  }
                  value={option.value}
                  disabled={
                    option.value === ""
                  }
                >
                  {option.label}
                </option>
              )
            )}
          </select>

          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.6}
            className="
              pointer-events-none

              absolute
              right-4
              top-1/2

              size-4

              -translate-y-1/2

              text-primary
            "
          />
        </div>
      </div>

      {/* =====================================================
          MESSAGE
      ====================================================== */}

      <div>
        <label
          htmlFor="message"
          className="
            mb-2
            block

            text-[10px]
            font-bold
            uppercase

            tracking-[0.16em]

            text-text-secondary
          "
        >
          Your Message
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help..."
          className="
            min-h-34
            w-full
            resize-y

            rounded-md

            border
            border-foreground/15

            bg-surface

            px-4
            py-3.5

            text-sm
            leading-6

            text-foreground

            outline-none

            placeholder:text-text-muted

            transition-[border-color,box-shadow,background-color]
            duration-200

            hover:border-foreground/25

            focus:border-primary/60
            focus:bg-surface-card
            focus:ring-2
            focus:ring-primary/15
          "
        />
      </div>

      {/* =====================================================
          STATUS
      ====================================================== */}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="min-h-5"
      >
        {status === "success" && (
          <p
            role="status"
            className="
              text-xs
              font-medium

              text-primary
            "
          >
            Your message has been sent.
            We&apos;ll be in touch soon.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="
              text-xs
              font-medium

              text-destructive
            "
          >
            We couldn&apos;t send your
            message right now. Please
            call or email the gym instead.
          </p>
        )}
      </div>

      {/* =====================================================
          SUBMIT
      ====================================================== */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          group

          relative

          inline-flex
          min-h-12.5
          w-full

          items-center
          justify-center
          gap-4

          overflow-hidden

          rounded-md

          border
          border-primary/70

          bg-primary

          px-6

          text-[11px]
          font-bold
          uppercase

          tracking-[0.08em]

          text-primary-foreground

          shadow-(--shadow-gold-sm)

          transition-[background-color,box-shadow,opacity]
          duration-300

          hover:bg-gold-hover
          hover:shadow-(--shadow-gold-md)

          disabled:pointer-events-none
          disabled:opacity-60

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background

          motion-reduce:transition-none

          sm:text-xs
        "
      >
        <Send
          aria-hidden="true"
          strokeWidth={1.8}
          className="size-4"
        />

        <span>
          {isSubmitting
            ? "Sending..."
            : "Send Message"}
        </span>

        <ArrowRight
          aria-hidden="true"
          className="
            size-4

            transition-transform
            duration-300

            group-hover:translate-x-1

            motion-reduce:transform-none
          "
        />
      </button>

      {/* PRIVACY NOTE */}

      <p
        className="
          text-center

          text-[10px]
          leading-5

          text-text-muted
        "
      >
        By submitting this form, you&apos;re
        asking Rebel Boxing Club to contact
        you about your request.
      </p>
    </form>
  )
}

/* =========================================================
   INPUT FIELD
========================================================= */

type FormFieldProps = {
  id: string
  name: string
  label: string

  type?:
    | "text"
    | "email"
    | "tel"

  autoComplete?: string
  required?: boolean
}

function FormField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block

          text-[10px]
          font-bold
          uppercase

          tracking-[0.16em]

          text-text-secondary
        "
      >
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="text-primary"
          >
            {" "}
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="
          min-h-12
          w-full

          rounded-md

          border
          border-foreground/15

          bg-surface

          px-4

          text-sm

          text-foreground

          outline-none

          transition-[border-color,box-shadow,background-color]
          duration-200

          hover:border-foreground/25

          focus:border-primary/60
          focus:bg-surface-card
          focus:ring-2
          focus:ring-primary/15
        "
      />
    </div>
  )
}