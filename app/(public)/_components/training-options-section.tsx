import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  Crown,
  Dumbbell,
  Flame,
  UserRound,
  UsersRound,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"


/* =========================================================
   ICON MAPS
========================================================= */

const benefitIcons = {
  personalized: UserRound,
  coaches: Dumbbell,
  community: UsersRound,
} as const


const trainingCardIcons = {
  "personal-training": UserRound,
  "boxing-fitness": Dumbbell,
  "discover-workout": Flame,
} as const


/* =========================================================
   TYPES
========================================================= */

type TrainingCardProps = {
  card: (typeof siteConfig.trainingOptions.cards)[number]
}


/* =========================================================
   TRAINING OPTIONS SECTION
========================================================= */

export function TrainingOptionsSection() {
  const training = siteConfig.trainingOptions

  return (
    <section
      id="training-options"
      aria-labelledby="training-options-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#080808]

        py-20

        sm:py-24

        lg:py-28

        xl:py-32
      "
    >
      {/* =====================================================
          SECTION BACKGROUND
          CSS ONLY — NO BACKGROUND IMAGE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[radial-gradient(circle_at_8%_78%,rgba(212,175,55,0.07),transparent_26%),radial-gradient(circle_at_94%_18%,rgba(212,175,55,0.055),transparent_24%)]
        "
      />

      {/* Subtle grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-30

          opacity-25

          bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]

          bg-size-[72px_72px]
        "
      />

      {/* Left decorative ring */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-28
          top-[50%]
          -z-20

          size-64

          rounded-full

          border
          border-primary/12
        "
      />

      {/* Right decorative ring */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-24
          bottom-20
          -z-20

          size-72

          rounded-full

          border
          border-primary/10
        "
      />


      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]

          px-5

          sm:px-7

          md:px-10

          lg:px-14

          xl:px-20

          2xl:px-24
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            grid
            gap-10

            lg:grid-cols-[minmax(0,1.15fr)_minmax(440px,0.85fr)]
            lg:items-end
            lg:gap-16
          "
        >
          {/* Left */}

          <div className="max-w-190">
            {/* Eyebrow */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-0.5
                  w-8
                  bg-primary
                "
              />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.32em]
                  text-primary

                  sm:text-xs
                "
              >
                {training.eyebrow}
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-12

                  bg-linear-to-r
                  from-primary
                  to-transparent
                "
              />
            </div>


            {/* Heading */}

            <h2
              id="training-options-heading"
              className="
                font-heading
                font-black
                uppercase

                leading-[0.9]
                tracking-[-0.045em]

                text-white

                text-[clamp(2.8rem,12vw,4.5rem)]

                sm:text-[clamp(3.5rem,8vw,5.4rem)]

                lg:text-[clamp(4.2rem,6vw,6rem)]
              "
            >
              {training.title}{" "}

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
                {training.accentTitle}
              </span>
            </h2>


            {/* Description */}

            <p
              className="
                mt-5

                max-w-172.5

                text-sm
                leading-7
                text-zinc-400

                sm:text-base

                lg:text-[17px]
                lg:leading-8
              "
            >
              {training.description}
            </p>
          </div>


          {/* =================================================
              BENEFITS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-3

              border-y
              border-white/10

              py-6

              lg:border-y-0
              lg:py-0
            "
          >
            {training.benefits.map((benefit, index) => {
              const Icon =
                benefitIcons[
                  benefit.id as keyof typeof benefitIcons
                ]

              return (
                <div
                  key={benefit.id}
                  className={cn(
                    `
                      group/benefit

                      flex
                      min-w-0
                      flex-col
                      items-center

                      px-2

                      text-center

                      sm:px-5
                    `,
                    index !== 0 &&
                      "border-l border-white/10"
                  )}
                >
                  <div
                    className="
                      flex
                      size-12
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-primary/30

                      bg-primary/5

                      text-primary

                      transition-[transform,border-color,background-color,box-shadow]
                      duration-300
                      ease-out

                      group-hover/benefit:-translate-y-1
                      group-hover/benefit:border-primary/65
                      group-hover/benefit:bg-primary/10
                      group-hover/benefit:shadow-[0_0_24px_rgba(212,175,55,0.12)]

                      motion-reduce:transform-none
                      motion-reduce:transition-none

                      sm:size-14
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.7}
                      className="
                        size-5

                        transition-transform
                        duration-300

                        group-hover/benefit:scale-110

                        motion-reduce:transform-none
                        motion-reduce:transition-none

                        sm:size-6
                      "
                    />
                  </div>

                  <span
                    className="
                      mt-3

                      text-[11px]
                      font-medium
                      leading-4
                      text-zinc-300

                      transition-colors
                      duration-300

                      group-hover/benefit:text-white

                      sm:text-sm
                      sm:leading-5
                    "
                  >
                    {benefit.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>


        {/* ===================================================
            CARDS GRID
        ==================================================== */}

        <div
          className="
            mt-12

            grid
            items-stretch
            gap-4

            sm:gap-5

            lg:mt-16
            lg:grid-cols-2

            xl:gap-6
          "
        >
          {training.cards.map((card) => (
            <TrainingCard
              key={card.id}
              card={card}
            />
          ))}


          {/* =================================================
              SPECIAL OFFER
          ================================================== */}

          <article
            className="
              group/offer

              relative
              isolate

              flex
              min-h-105
              flex-col

              overflow-hidden

              rounded-2xl

              border
              border-primary/40

              bg-[#0D0D0D]

              p-6

              shadow-[0_24px_70px_rgba(0,0,0,0.30)]

              transition-[transform,border-color,box-shadow]
              duration-500
              ease-out

              hover:-translate-y-1.5
              hover:border-primary/75
              hover:shadow-[0_32px_90px_rgba(0,0,0,0.42),0_0_38px_rgba(212,175,55,0.08)]

              motion-reduce:transform-none
              motion-reduce:transition-none

              sm:min-h-110
              sm:p-7

              xl:p-8
            "
          >
            {/* Gold atmosphere */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                -z-30

                bg-[radial-gradient(circle_at_100%_0%,rgba(212,175,55,0.17),transparent_42%),linear-gradient(135deg,rgba(212,175,55,0.04),transparent_44%)]

                opacity-80

                transition-opacity
                duration-500

                group-hover/offer:opacity-100
              "
            />


            {/* Moving glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                -right-20
                -top-20
                -z-20

                size-64

                rounded-full

                bg-primary/10

                blur-3xl

                opacity-20

                transition-[transform,opacity]
                duration-700
                ease-out

                group-hover/offer:-translate-x-8
                group-hover/offer:translate-y-8
                group-hover/offer:opacity-60

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />


            {/* Decorative circles */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                -right-24
                top-8
                -z-10

                size-64

                rounded-full

                border
                border-primary/22

                transition-transform
                duration-700

                group-hover/offer:scale-110

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                -right-10
                top-28
                -z-10

                size-44

                rounded-full

                border
                border-primary/10

                transition-transform
                duration-700

                group-hover/offer:scale-105

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />


            {/* Top hover line */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-0
                top-0

                h-px
                w-0

                bg-linear-to-r
                from-primary
                via-primary/70
                to-transparent

                transition-[width]
                duration-700

                group-hover/offer:w-[70%]

                motion-reduce:transition-none
              "
            />


            {/* Offer content */}

            <div
              className="
                relative
                z-10

                flex
                h-full
                flex-1
                flex-col

                transition-transform
                duration-500

                group-hover/offer:-translate-y-1

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              {/* Fixed meta position */}

              <div
                className="
                  flex
                  min-h-11
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    size-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-primary/35

                    bg-primary/6

                    text-primary

                    transition-[transform,border-color,background-color,box-shadow]
                    duration-300

                    group-hover/offer:scale-105
                    group-hover/offer:border-primary/75
                    group-hover/offer:bg-primary/12
                    group-hover/offer:shadow-[0_0_24px_rgba(212,175,55,0.14)]

                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                >
                  <Crown
                    aria-hidden="true"
                    strokeWidth={1.7}
                    className="
                      size-4.5

                      transition-transform
                      duration-300

                      group-hover/offer:scale-110

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  />
                </div>

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-primary

                    transition-colors
                    duration-300

                    group-hover/offer:text-[#F5D568]

                    sm:text-[11px]
                  "
                >
                  {training.offer.eyebrow}
                </span>
              </div>


              {/* Heading */}

              <h3
                className="
                  mt-7

                  max-w-105

                  font-heading
                  text-[clamp(2.2rem,7vw,3.4rem)]
                  font-black

                  leading-[0.98]
                  tracking-[-0.04em]

                  text-white

                  transition-transform
                  duration-300

                  group-hover/offer:translate-x-1

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                {training.offer.title}

                <span
                  className="
                    mt-1
                    block

                    bg-linear-to-r
                    from-[#F6D469]
                    via-primary
                    to-[#B78A22]

                    bg-clip-text
                    text-transparent
                  "
                >
                  {training.offer.accentTitle}
                </span>
              </h3>


              {/* Description */}

              <p
                className="
                  mt-5

                  max-w-100

                  text-sm
                  leading-7
                  text-zinc-400

                  transition-colors
                  duration-300

                  group-hover/offer:text-zinc-300

                  sm:text-base
                "
              >
                {training.offer.description}
              </p>


              {/* CTA always bottom */}

              <div className="mt-auto pt-8">
                <Link
                  href={training.offer.href}
                  className="
                    group/button

                    inline-flex
                    min-h-13
                    w-full
                    items-center
                    justify-between

                    rounded-xl

                    border
                    border-[#F0CB4A]

                    bg-linear-to-r
                    from-[#F8D65D]
                    via-primary
                    to-[#C99620]

                    px-5

                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.055em]
                    text-black

                    shadow-[0_12px_32px_rgba(212,175,55,0.16)]

                    transition-[transform,box-shadow,filter]
                    duration-300

                    hover:-translate-y-0.5
                    hover:brightness-105
                    hover:shadow-[0_18px_48px_rgba(212,175,55,0.27)]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black

                    motion-reduce:transform-none
                    motion-reduce:transition-none

                    sm:px-6
                    sm:text-[13px]
                  "
                >
                  <span>
                    {training.offer.label}
                  </span>

                  <span
                    className="
                      flex
                      size-8
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      bg-black

                      text-primary

                      transition-transform
                      duration-300

                      group-hover/button:translate-x-1

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  >
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="
                        size-4

                        transition-transform
                        duration-300

                        group-hover/button:translate-x-0.5

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                    />
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}


/* =========================================================
   TRAINING CARD
========================================================= */

function TrainingCard({
  card,
}: TrainingCardProps) {
  const Icon =
    trainingCardIcons[
      card.id as keyof typeof trainingCardIcons
    ]

  return (
    <article
      className="
        group/card

        relative
        isolate

        min-h-105

        overflow-hidden

        rounded-2xl

        border
        border-white/12

        bg-[#0D0D0D]

        shadow-[0_24px_70px_rgba(0,0,0,0.30)]

        transition-[transform,border-color,box-shadow]
        duration-500
        ease-out

        hover:-translate-y-1.5
        hover:border-primary/55
        hover:shadow-[0_32px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(212,175,55,0.08),0_0_35px_rgba(212,175,55,0.06)]

        motion-reduce:transform-none
        motion-reduce:transition-none

        sm:min-h-110
      "
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="
          (max-width: 1023px) 100vw,
          50vw
        "
        className="
          -z-40

          object-cover

          transition-[transform,filter]
          duration-700
          ease-out

          group-hover/card:scale-[1.045]
          group-hover/card:brightness-105
          group-hover/card:saturate-[1.04]

          motion-reduce:transform-none
          motion-reduce:transition-none
        "
      />


      {/* =====================================================
          BASE DARK LAYER
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-30

          bg-black/16

          transition-colors
          duration-500

          group-hover/card:bg-black/10
        "
      />


      {/* =====================================================
          CONTENT SAFE GRADIENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-20

          bg-[linear-gradient(90deg,rgba(5,5,5,0.98)_0%,rgba(5,5,5,0.94)_24%,rgba(5,5,5,0.77)_42%,rgba(5,5,5,0.34)_61%,rgba(5,5,5,0.05)_82%,rgba(5,5,5,0)_100%)]

          transition-opacity
          duration-500

          group-hover/card:opacity-95
        "
      />


      {/* Bottom fade */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          -z-20

          h-2/3

          bg-linear-to-t
          from-black/72
          via-black/22
          to-transparent
        "
      />


      {/* Gold ambient hover */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-10

          opacity-0

          bg-[radial-gradient(circle_at_14%_82%,rgba(212,175,55,0.14),transparent_30%)]

          transition-opacity
          duration-500

          group-hover/card:opacity-100
        "
      />


      {/* =====================================================
          CINEMATIC LIGHT SWEEP
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[45%]
          top-0
          z-10

          h-full
          w-[22%]

          -skew-x-12

          bg-linear-to-r
          from-transparent
          via-white/7
          to-transparent

          opacity-0

          transition-[transform,opacity]
          duration-700
          ease-out

          group-hover/card:translate-x-[700%]
          group-hover/card:opacity-100

          motion-reduce:hidden
        "
      />


      {/* Left gold edge */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-0
          z-20

          w-px

          bg-linear-to-b
          from-primary
          via-primary/35
          to-transparent

          transition-[width]
          duration-500

          group-hover/card:w-0.5
        "
      />


      {/* Top hover line */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-0
          top-0
          z-20

          h-px
          w-0

          bg-linear-to-r
          from-primary
          via-primary/60
          to-transparent

          transition-[width]
          duration-700

          group-hover/card:w-[62%]

          motion-reduce:transition-none
        "
      />


      {/* =====================================================
          NUMBER — FIXED POSITION
      ====================================================== */}

      <div
        className="
          absolute
          left-5
          top-5
          z-30

          flex
          items-center
          gap-3

          sm:left-7
          sm:top-6

          xl:left-8
        "
      >
        <span
          className="
            text-sm
            font-semibold
            text-primary

            transition-colors
            duration-300

            group-hover/card:text-[#F5D568]

            sm:text-base
          "
        >
          {card.number}
        </span>

        <span
          aria-hidden="true"
          className="
            h-px
            w-8

            bg-primary/70

            transition-[width,background-color]
            duration-500

            group-hover/card:w-12
            group-hover/card:bg-primary

            motion-reduce:transition-none
          "
        />
      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20

          flex
          min-h-105
          max-w-102.5
          flex-col

          px-5
          pb-6
          pt-18

          transition-transform
          duration-500
          ease-out

          group-hover/card:-translate-y-1

          motion-reduce:transform-none
          motion-reduce:transition-none

          sm:min-h-110
          sm:px-7
          sm:pb-7
          sm:pt-20

          xl:max-w-107.5
          xl:px-8
          xl:pb-8
        "
      >
        {/* =================================================
            ICON — SAME POSITION ON EVERY CARD
        ================================================== */}

        <div
          className="
            flex
            min-h-10
            items-center
          "
        >
          <div
            className="
              flex
              size-10
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-primary/45

              bg-black/45

              text-primary

              backdrop-blur-md

              transition-[transform,background-color,border-color,box-shadow]
              duration-300

              group-hover/card:scale-105
              group-hover/card:border-primary/80
              group-hover/card:bg-primary/12
              group-hover/card:shadow-[0_0_24px_rgba(212,175,55,0.15)]

              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.8}
              className="
                size-4.5

                transition-transform
                duration-300

                group-hover/card:scale-110

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          </div>
        </div>


        {/* =================================================
            EYEBROW
        ================================================== */}

        <span
          className="
            mt-3

            text-[10px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-primary

            transition-colors
            duration-300

            group-hover/card:text-[#F5D568]

            sm:text-[11px]
          "
        >
          {card.eyebrow}
        </span>


        {/* =================================================
            TITLE
        ================================================== */}

        <h3
          className="
            mt-2

            max-w-95

            font-heading
            text-[clamp(1.8rem,5vw,2.55rem)]
            font-black

            leading-[1.02]
            tracking-[-0.035em]

            text-white

            drop-shadow-[0_3px_12px_rgba(0,0,0,0.4)]

            transition-transform
            duration-300

            group-hover/card:translate-x-1

            motion-reduce:transform-none
            motion-reduce:transition-none
          "
        >
          {card.title}
        </h3>


        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-4

            max-w-95

            text-sm
            leading-6.5
            text-zinc-300

            transition-colors
            duration-300

            group-hover/card:text-zinc-200

            sm:text-[15px]
            sm:leading-7
          "
        >
          {card.description}
        </p>


        {/* =================================================
            CTA — ALWAYS BOTTOM
        ================================================== */}

        <div className="mt-auto pt-6">
          <Link
            href={card.href}
            className="
              group/link

              inline-flex
              w-fit
              items-center
              gap-3

              rounded-sm

              text-sm
              font-semibold
              text-primary

              transition-colors
              duration-200

              hover:text-[#F5D568]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-4
              focus-visible:ring-offset-black
            "
          >
            <span
              className="
                relative

                after:absolute
                after:-bottom-1
                after:left-0

                after:h-px
                after:w-0

                after:bg-primary

                after:transition-[width]
                after:duration-300

                group-hover/link:after:w-full
              "
            >
              Learn More
            </span>

            <span
              className="
                flex
                size-8
                shrink-0
                items-center
                justify-center

                rounded-full

                border
                border-primary/45

                bg-black/20

                transition-[background-color,border-color,transform,box-shadow,color]
                duration-300

                group-hover/link:translate-x-1
                group-hover/link:border-primary
                group-hover/link:bg-primary
                group-hover/link:text-black
                group-hover/link:shadow-[0_0_18px_rgba(212,175,55,0.20)]

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.8}
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover/link:translate-x-0.5

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              />
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}