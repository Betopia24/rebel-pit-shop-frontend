import { Star } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { siteConfig } from "@/config/site"

import successStoriesData from "@/data/success-stories.json"

import { cn } from "@/lib/utils"


/* =========================================================
   TYPES
========================================================= */

type Review = {
  id: string
  title: string
  quote: string
  name: string
  memberSince: string
  dateLabel: string
  rating: number
  image?: string | null
}


type ReviewCardProps = {
  review: Review
}


type MarqueeRowProps = {
  reviews: Review[]
  reverse?: boolean
}


/* =========================================================
   DATA
========================================================= */

const reviews =
  successStoriesData.reviews as Review[]


const topRow =
  reviews.filter(
    (_, index) =>
      index % 2 === 0
  )


const bottomRow =
  reviews.filter(
    (_, index) =>
      index % 2 !== 0
  )


/* =========================================================
   SUCCESS STORIES SECTION

   Layer system:

   z-0
   └── atmospheric background

   z-10
   └── decorative accents

   z-20
   └── actual section content
========================================================= */

export function SuccessStoriesSection() {
  if (reviews.length === 0) {
    return null
  }


  const content =
    siteConfig.successStories


  return (
    <section
      aria-labelledby="success-stories-title"
      aria-describedby="success-stories-description"
      className="
        relative
        isolate

        w-full
        overflow-hidden

        bg-background

        py-16

        sm:py-20

        md:py-24

        lg:py-28

        xl:py-32
      "
    >
      {/* =====================================================
          LAYER 0 — BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_50%_0%,var(--gold-05),transparent_32%)]
        "
      />


      {/* =====================================================
          LAYER 10 — TOP ACCENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-10

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/20
          to-transparent
        "
      />


      {/* =====================================================
          LAYER 20 — HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto

          w-full
          max-w-[1600px]

          px-4

          min-[380px]:px-5

          sm:px-7

          md:px-10

          lg:px-14

          xl:px-20

          2xl:px-24
        "
      >
        <header
          className="
            mx-auto
            max-w-212.5

            text-center
          "
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-center

              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7

                bg-linear-to-r
                from-transparent
                to-primary

                sm:w-10
              "
            />


            <span
              className="
                text-[9px]
                font-bold
                uppercase

                tracking-[0.28em]

                text-primary

                sm:text-[11px]
                sm:tracking-[0.32em]
              "
            >
              {content.eyebrow}
            </span>


            <span
              aria-hidden="true"
              className="
                h-px
                w-7

                bg-linear-to-r
                from-primary
                to-transparent

                sm:w-10
              "
            />
          </div>


          {/* =================================================
              TITLE
          ================================================== */}

          <h2
            id="success-stories-title"
            className="
              mt-5

              font-heading
              font-black

              leading-[0.92]

              tracking-[-0.045em]

              text-[clamp(2.5rem,10vw,4rem)]

              sm:text-[clamp(3.3rem,7vw,5.2rem)]
            "
          >
            <span className="text-foreground">
              {content.title}
            </span>{" "}

            <span className="rebel-gold-text">
              {content.accentTitle}
            </span>
          </h2>


          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            id="success-stories-description"
            className="
              mx-auto
              mt-5

              max-w-170

              text-[13px]
              leading-6

              text-text-muted

              sm:text-[15px]
              sm:leading-7

              lg:text-base
            "
          >
            {content.description}
          </p>


          {/* =================================================
              REVIEW SUMMARY
          ================================================== */}

          <div
            className="
              mx-auto
              mt-6

              inline-flex
              max-w-full
              items-center

              gap-2

              rounded-full

              border
              border-foreground/10

              bg-surface

              px-3
              py-2

              shadow-[inset_0_1px_0_var(--white-04)]

              min-[380px]:gap-3
              min-[380px]:px-4
            "
          >
            {/* ===============================================
                STACKED AVATARS
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                flex
                -space-x-2
              "
            >
              {reviews
                .slice(0, 4)
                .map((review) => (
                  <Avatar
                    key={review.id}
                    className="
                      size-7

                      border-2
                      border-surface

                      bg-surface-card
                    "
                  >
                    {review.image && (
                      <AvatarImage
                        src={review.image}
                        alt=""
                        className="object-cover"
                      />
                    )}


                    <AvatarFallback
                      className="
                        bg-surface-card

                        text-[8px]
                        font-bold

                        text-primary
                      "
                    >
                      {getInitials(
                        review.name
                      )}
                    </AvatarFallback>
                  </Avatar>
                ))}
            </div>


            {/* ===============================================
                RATING NUMBER
            ================================================ */}

            <span
              className="
                text-sm
                font-bold

                text-foreground
              "
            >
              {
                successStoriesData
                  .summary
                  .rating
              }
            </span>


            {/* ===============================================
                RATING STARS
            ================================================ */}

            <div
              className="
                flex
                items-center

                gap-0.5
              "
              aria-label={
                `${successStoriesData.summary.rating} out of 5 stars`
              }
            >
              {Array.from({
                length: 5,
              }).map((_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="
                    size-3.5

                    fill-primary
                    text-primary
                  "
                />
              ))}
            </div>


            {/* ===============================================
                DIVIDER
            ================================================ */}

            <span
              aria-hidden="true"
              className="
                mx-0.5

                h-4
                w-px

                bg-foreground/10
              "
            />


            {/* ===============================================
                REVIEW COUNT
            ================================================ */}

            <span
              className="
                whitespace-nowrap

                text-[10px]

                text-text-muted

                min-[380px]:text-xs
              "
            >
              {
                successStoriesData
                  .summary
                  .reviewCountLabel
              }
            </span>
          </div>
        </header>
      </div>


      {/* =====================================================
          LAYER 20 — MARQUEE AREA
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mt-12

          space-y-4

          sm:mt-14
          sm:space-y-5

          lg:mt-16
          lg:space-y-6
        "
      >
        {/* ===================================================
            ROW 1
        ==================================================== */}

        <MarqueeRow
          reviews={
            topRow.length > 0
              ? topRow
              : reviews
          }
        />


        {/* ===================================================
            ROW 2
        ==================================================== */}

        <MarqueeRow
          reviews={
            bottomRow.length > 0
              ? bottomRow
              : reviews
          }
          reverse
        />
      </div>
    </section>
  )
}


/* =========================================================
   MARQUEE ROW
========================================================= */

function MarqueeRow({
  reviews,
  reverse = false,
}: MarqueeRowProps) {
  return (
    <div
      className="
        rebel-review-row

        relative

        w-full
        overflow-hidden
      "
    >
      {/* =====================================================
          LEFT FADE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-0
          z-20

          w-8

          bg-linear-to-r
          from-background
          via-background/85
          to-transparent

          sm:w-16

          lg:w-24
        "
      />


      {/* =====================================================
          RIGHT FADE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-0
          z-20

          w-8

          bg-linear-to-l
          from-background
          via-background/85
          to-transparent

          sm:w-16

          lg:w-24
        "
      />


      {/* =====================================================
          MOVING TRACK
      ====================================================== */}

      <div
        className={cn(
          `
            rebel-review-track

            flex
            w-max
            items-stretch

            will-change-transform
          `,
          reverse
            ? "rebel-review-track-reverse"
            : "rebel-review-track-forward"
        )}
      >
        {/* ===================================================
            ORIGINAL SET
        ==================================================== */}

        <div
          className="
            rebel-review-set

            flex
            shrink-0
            items-stretch

            gap-3
            pr-3

            sm:gap-4
            sm:pr-4

            lg:gap-5
            lg:pr-5
          "
        >
          {reviews.map((review) => (
            <ReviewCard
              key={`original-${review.id}`}
              review={review}
            />
          ))}
        </div>


        {/* ===================================================
            DUPLICATE SET

            aria-hidden prevents screen readers from
            reading the same testimonial twice.
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            rebel-review-set

            flex
            shrink-0
            items-stretch

            gap-3
            pr-3

            sm:gap-4
            sm:pr-4

            lg:gap-5
            lg:pr-5
          "
        >
          {reviews.map((review) => (
            <ReviewCard
              key={`duplicate-${review.id}`}
              review={review}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


/* =========================================================
   REVIEW CARD
========================================================= */

function ReviewCard({
  review,
}: ReviewCardProps) {
  const initials =
    getInitials(review.name)


  return (
    <article
      className="
        group/review

        relative
        isolate

        flex

        h-55
        w-72.5

        shrink-0
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-foreground/10

        bg-surface

        p-5

        shadow-(--shadow-card-soft)

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-primary/35
        hover:shadow-(--shadow-card-soft-hover)

        motion-reduce:transform-none
        motion-reduce:transition-none

        min-[380px]:w-77.5

        sm:h-57.5
        sm:w-85
        sm:p-6

        lg:h-60
        lg:w-95
      "
    >
      {/* =====================================================
          LAYER 0 — GOLD HOVER GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          opacity-0

          bg-[radial-gradient(circle_at_0%_0%,var(--gold-08),transparent_42%)]

          transition-opacity
          duration-300

          group-hover/review:opacity-100
        "
      />


      {/* =====================================================
          TOP
      ====================================================== */}

      <div
        className="
          relative
          z-10

          flex
          shrink-0
          items-start
          justify-between

          gap-3
        "
      >
        {/* Rating */}

        <div
          className="
            flex
            items-center

            gap-0.5
          "
          aria-label={
            `${review.rating} out of 5 stars`
          }
        >
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className={cn(
                `
                  size-3.5

                  sm:size-4
                `,
                index < review.rating
                  ? `
                      fill-primary
                      text-primary
                    `
                  : `
                      text-foreground/10
                    `
              )}
            />
          ))}
        </div>


        {/* Date */}

        <span
          className="
            shrink-0

            text-[9px]
            font-medium

            text-text-faint

            sm:text-[10px]
          "
        >
          {review.dateLabel}
        </span>
      </div>


      {/* =====================================================
          TITLE
      ====================================================== */}

      <h3
        className="
          relative
          z-10

          mt-3

          truncate

          text-[14px]
          font-bold

          text-foreground

          transition-colors
          duration-300

          group-hover/review:text-primary

          sm:text-[15px]
        "
      >
        {review.title}
      </h3>


      {/* =====================================================
          QUOTE
      ====================================================== */}

      <p
        className="
          relative
          z-10

          mt-2

          line-clamp-3

          text-[12px]
          leading-5

          text-text-secondary

          sm:text-[13px]
          sm:leading-5.5

          lg:line-clamp-4
        "
      >
        “{review.quote}”
      </p>


      {/* =====================================================
          MEMBER
      ====================================================== */}

      <footer
        className="
          relative
          z-10

          mt-auto

          flex
          min-w-0
          items-center

          gap-3

          pt-4
        "
      >
        <Avatar
          className="
            size-9
            shrink-0

            border
            border-primary/25

            bg-surface-card

            sm:size-10
          "
        >
          {review.image && (
            <AvatarImage
              src={review.image}
              alt={`${review.name} profile`}
              className="object-cover"
            />
          )}


          <AvatarFallback
            className="
              bg-primary/5

              text-[9px]
              font-bold

              text-primary

              sm:text-[10px]
            "
          >
            {initials}
          </AvatarFallback>
        </Avatar>


        <div className="min-w-0">
          <p
            className="
              truncate

              text-[12px]
              font-semibold

              text-text-strong

              sm:text-[13px]
            "
          >
            {review.name}
          </p>


          <p
            className="
              mt-0.5

              truncate

              text-[9px]

              text-text-faint

              sm:text-[10px]
            "
          >
            Member since{" "}
            {review.memberSince}
          </p>
        </div>
      </footer>
    </article>
  )
}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(
  name: string
) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}