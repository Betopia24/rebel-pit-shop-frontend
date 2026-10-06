import { Star } from "lucide-react"

import successStoriesData from "@/data/success-stories.json"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

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
   MAIN SECTION
========================================================= */

export function SuccessStoriesSection() {
  if (reviews.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="success-stories-title"
      className="
        relative
        isolate
        w-full
        overflow-hidden

        bg-[#080808]

        py-16

        sm:py-20

        md:py-24

        lg:py-28

        xl:py-32
      "
    >
      {/* =====================================================
          CLEAN BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-20

          bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.045),transparent_32%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          -z-10

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/20
          to-transparent
        "
      />


      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
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
          {/* Eyebrow */}

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
              Rebels&apos; Success Stories
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


          {/* Title */}

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
            <span className="text-white">
              Stories from
            </span>{" "}

            <span
              className="
                bg-linear-to-r
                from-[#F7D96A]
                via-primary
                to-[#B68A1E]

                bg-clip-text
                text-transparent
              "
            >
              Our Members
            </span>
          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-5

              max-w-170

              text-[13px]
              leading-6
              text-zinc-500

              sm:text-[15px]
              sm:leading-7

              lg:text-base
            "
          >
            Real people. Real progress.
            Discover how our members have
            built confidence, strength,
            and a healthier, happier life
            at Rebel Boxing Club.
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
              border-white/10

              bg-[#101010]

              px-3
              py-2

              shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]

              min-[380px]:gap-3
              min-[380px]:px-4
            "
          >
            {/* stacked avatars */}

            <div
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
                      border-[#101010]

                      bg-[#181818]
                    "
                  >
                    {review.image && (
                      <AvatarImage
                        src={review.image}
                        alt={review.name}
                        className="object-cover"
                      />
                    )}

                    <AvatarFallback
                      className="
                        bg-[#181818]

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


            {/* rating */}

            <span
              className="
                text-sm
                font-bold
                text-white
              "
            >
              {
                successStoriesData
                  .summary
                  .rating
              }
            </span>


            <div
              className="
                flex
                items-center
                gap-0.5
              "
              aria-label={`${successStoriesData.summary.rating} out of 5 stars`}
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


            <span
              aria-hidden="true"
              className="
                mx-0.5

                h-4
                w-px

                bg-white/10
              "
            />


            <span
              className="
                whitespace-nowrap

                text-[10px]
                text-zinc-500

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
          MARQUEE AREA
      ====================================================== */}

      <div
        className="
          mt-12

          space-y-4

          sm:mt-14
          sm:space-y-5

          lg:mt-16
          lg:space-y-6
        "
      >
        {/* Row 1 */}

        <MarqueeRow
          reviews={
            topRow.length > 0
              ? topRow
              : reviews
          }
        />


        {/* Row 2 */}

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
      {/* Left fade */}

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
          from-[#080808]
          via-[#080808]/85
          to-transparent

          sm:w-16

          lg:w-24
        "
      />


      {/* Right fade */}

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
          from-[#080808]
          via-[#080808]/85
          to-transparent

          sm:w-16

          lg:w-24
        "
      />


      {/* Moving track */}

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
        {/* Original set */}

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


        {/* Duplicate set for seamless loop */}

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

        flex
        h-55
        w-72.5
        shrink-0
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-white/10

        bg-[#101010]

        p-5

        shadow-[0_14px_40px_rgba(0,0,0,0.16)]

        transition-[transform,border-color,background-color,box-shadow]
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-primary/35
        hover:bg-[#12110D]
        hover:shadow-[0_18px_48px_rgba(0,0,0,0.26)]

        motion-reduce:transform-none

        min-[380px]:w-77.5

        sm:h-57.5
        sm:w-85
        sm:p-6

        lg:h-60
        lg:w-95
      "
    >
      {/* subtle hover glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-10

          opacity-0

          bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.065),transparent_42%)]

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
          flex
          shrink-0
          items-start
          justify-between

          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-0.5
          "
          aria-label={`${review.rating} out of 5 stars`}
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
                index <
                  review.rating
                  ? `
                      fill-primary
                      text-primary
                    `
                  : `
                      text-white/10
                    `
              )}
            />
          ))}
        </div>


        <span
          className="
            shrink-0

            text-[9px]
            font-medium
            text-zinc-600

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
          mt-3

          truncate

          text-[14px]
          font-bold
          text-white

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
          mt-2

          line-clamp-3

          text-[12px]
          leading-5
          text-zinc-400

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

            bg-[#181818]

            sm:size-10
          "
        >
          {review.image && (
            <AvatarImage
              src={review.image}
              alt={review.name}
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
              text-zinc-100

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
              text-zinc-600

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