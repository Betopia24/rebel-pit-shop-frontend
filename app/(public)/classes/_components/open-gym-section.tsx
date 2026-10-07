import {
  Activity,
  Ban,
  Crosshair,
  Dumbbell,
  Footprints,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react"

/* =========================================================
   TYPES
========================================================= */

type GymZone = {
  number: string
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
}

/* =========================================================
   DATA
========================================================= */

const specialtyBagZone: GymZone = {
  number: "02",

  eyebrow: "More Ways To Work",

  title: "Specialty Bags",

  description:
    "Add variety to your striking, movement, and conditioning with different bag styles around the training floor.",

  icon: Crosshair,
}

const turfZone: GymZone = {
  number: "03",

  eyebrow: "Movement Space",

  title: "Turf",

  description:
    "Use open training space for movement work, conditioning, athletic drills, and your own training combinations.",

  icon: Footprints,
}

const weightsZone: GymZone = {
  number: "04",

  eyebrow: "Strength Work",

  title: "Weights",

  description:
    "Build strength and complement your boxing or kickboxing work with resistance and strength training.",

  icon: Dumbbell,
}

const cardioZone: GymZone = {
  number: "05",

  eyebrow: "Conditioning",

  title: "Cardio Equipment",

  description:
    "Add warm-up work, conditioning, or extra training around the session you have planned for yourself.",

  icon: Activity,
}

/* =========================================================
   SECTION
========================================================= */

export function OpenGymSection() {
  return (
    <section
      id="open-gym"
      aria-labelledby="open-gym-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/8

        bg-background
        text-foreground

        py-14
        sm:py-16
        lg:py-18
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_50%_0%,var(--gold-05),transparent_30%),radial-gradient(circle_at_100%_100%,var(--gold-04),transparent_26%)]
        "
      />

      {/* BACKGROUND WORD */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-4
          top-6
          z-0

          hidden

          font-heading
          text-[9rem]
          font-black
          uppercase

          leading-none
          tracking-tighter

          text-foreground/2

          xl:block
        "
      >
        OPEN
      </span>

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-375

          px-5
          sm:px-7
          md:px-10
          lg:px-14
          xl:px-20
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mx-auto
            max-w-205

            text-center
          "
        >
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
                w-8
                bg-primary
              "
            />

            <span
              className="
                text-[9px]
                font-black
                uppercase

                tracking-[0.22em]

                text-primary

                sm:text-[10px]
              "
            >
              Open Gym
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-primary
              "
            />
          </div>

          <h2
            id="open-gym-heading"
            className="
              mt-5

              font-heading
              text-[clamp(3rem,7vw,5.2rem)]
              font-black
              uppercase

              leading-[0.88]
              tracking-tighter
            "
          >
            Your Workout.
            <span
              className="
                block
                rebel-gold-text
              "
            >
              Your Pace.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-155

              text-[13px]
              leading-6.5

              text-text-secondary

              sm:text-sm
              lg:text-[15px]
            "
          >
            Open Gym gives you access to Rebel&apos;s training
            space and equipment so you can build your own
            workout, focus on what you need, and train
            independently.
          </p>
        </div>

        {/* ===================================================
            INDEPENDENT TRAINING LABEL
        ==================================================== */}

        <div
          className="
            mx-auto
            mt-7

            flex
            max-w-170

            items-center
            justify-center

            gap-3

            border-y
            border-foreground/10

            py-3.5
          "
        >
          <UserRound
            aria-hidden={true}
            strokeWidth={1.6}
            className="
              size-4
              shrink-0

              text-primary
            "
          />

          <p
            className="
              text-center

              text-[9px]
              font-black
              uppercase

              tracking-[0.12em]

              text-foreground
            "
          >
            Self-Directed Training
            <span className="mx-2 text-primary">
              /
            </span>
            Build The Session You Want
          </p>
        </div>

        {/* ===================================================
            TRAINING FLOOR GRID
        ==================================================== */}

        <div
          className="
            mt-8

            grid
            grid-cols-1

            gap-4

            lg:grid-cols-12
            lg:gap-5
          "
        >
          {/* =================================================
              01 — HEAVY BAGS
          ================================================== */}

          <article
            className="
              group
              relative
              isolate
              overflow-hidden

              min-h-76

              rounded-xl

              border
              border-primary/28

              bg-surface-dark

              p-6

              shadow-(--shadow-card-soft)

              sm:p-7

              lg:col-span-7
              lg:min-h-82
            "
          >
            {/* GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-0

                bg-[radial-gradient(circle_at_100%_0%,var(--gold-12),transparent_48%)]
              "
            />

            {/* NUMBER */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                -right-1
                -top-5
                z-0

                font-heading
                text-[8.5rem]
                font-black

                leading-none
                tracking-tighter

                text-foreground/3

                sm:text-[10rem]
              "
            >
              01
            </span>

            <div
              className="
                relative
                z-10

                flex
                h-full
                flex-col
              "
            >
              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between

                  gap-4
                "
              >
                <span
                  className="
                    flex
                    size-11

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-primary/40

                    bg-primary/7

                    text-primary
                  "
                >
                  <Target
                    aria-hidden={true}
                    strokeWidth={1.55}
                    className="size-5"
                  />
                </span>

                <span
                  className="
                    font-heading
                    text-[10px]
                    font-black

                    text-primary
                  "
                >
                  01
                </span>
              </div>

              {/* CONTENT */}

              <div className="mt-6">
                <p
                  className="
                    text-[8px]
                    font-black
                    uppercase

                    tracking-[0.17em]

                    text-primary
                  "
                >
                  Main Training Zone
                </p>

                <h3
                  className="
                    mt-2.5

                    font-heading
                    text-[clamp(2.7rem,5vw,4.3rem)]
                    font-black
                    uppercase

                    leading-[0.88]
                    tracking-tighter
                  "
                >
                  Heavy
                  <span
                    className="
                      block
                      rebel-gold-text
                    "
                  >
                    Bags.
                  </span>
                </h3>

                <p
                  className="
                    mt-4

                    max-w-120

                    text-xs
                    leading-6

                    text-text-secondary

                    sm:text-[13px]
                  "
                >
                  Work your own rounds, practice combinations,
                  sharpen technique, or use bag work for
                  conditioning without following a class format.
                </p>
              </div>

              {/* BOTTOM */}

              <div
                className="
                  mt-auto

                  pt-7
                "
              >
                <div
                  className="
                    border-t
                    border-foreground/10

                    pt-4
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-black
                      uppercase

                      tracking-[0.14em]

                      text-text-muted
                    "
                  >
                    Work Technique · Rounds · Conditioning
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* =================================================
              RIGHT ZONES
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-4

              sm:grid-cols-2

              lg:col-span-5
              lg:grid-cols-1
              lg:gap-5
            "
          >
            <SideZoneCard zone={specialtyBagZone} />

            <SideZoneCard zone={turfZone} />
          </div>

          {/* =================================================
              BOTTOM — WEIGHTS + CARDIO
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-4

              sm:grid-cols-2
              sm:gap-5

              lg:col-span-12
            "
          >
            <WideZoneCard zone={weightsZone} />

            <WideZoneCard zone={cardioZone} />
          </div>
        </div>

        {/* ===================================================
            OPEN GYM MEMBERSHIP NOTE
        ==================================================== */}

        <div
          className="
            relative
            isolate

            mt-5
            overflow-hidden

            rounded-xl

            border
            border-primary/28

            bg-primary/5

            px-5
            py-5

            sm:px-6
            lg:px-7
          "
        >
          {/* GOLD LINE */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-y-0
              left-0
              z-0

              w-0.5

              bg-primary
            "
          />

          {/* GLOW */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0
              z-0

              bg-[linear-gradient(90deg,var(--gold-07),transparent_48%)]
            "
          />

          <div
            className="
              relative
              z-10

              grid
              grid-cols-[40px_minmax(0,1fr)]

              gap-4

              sm:grid-cols-[44px_minmax(0,1fr)_auto]
              sm:items-center
              sm:gap-5
            "
          >
            {/* ICON */}

            <span
              className="
                flex
                size-10

                items-center
                justify-center

                rounded-full

                border
                border-primary/40

                bg-background

                text-primary
              "
            >
              <Ban
                aria-hidden={true}
                strokeWidth={1.7}
                className="size-4"
              />
            </span>

            {/* CONTENT */}

            <div>
              <p
                className="
                  text-[8px]
                  font-black
                  uppercase

                  tracking-[0.17em]

                  text-primary
                "
              >
                Important To Know
              </p>

              <h3
                className="
                  mt-1.5

                  font-heading
                  text-xl
                  font-black
                  uppercase

                  leading-none
                  tracking-tight

                  text-foreground

                  sm:text-2xl
                "
              >
                Group Classes Are Not Included.
              </h3>

              <p
                className="
                  mt-2

                  max-w-170

                  text-[11px]
                  leading-5

                  text-text-secondary

                  sm:text-xs
                "
              >
                Open Gym is a self-directed training option.
                An Open Gym-only membership does not include
                Rebel&apos;s coach-led group classes.
              </p>
            </div>

            {/* LABEL */}

            <div
              className="
                col-start-2

                sm:col-start-auto
              "
            >
              <span
                className="
                  inline-flex

                  rounded-full

                  border
                  border-primary/25

                  px-3
                  py-1.5

                  text-[8px]
                  font-black
                  uppercase

                  tracking-[0.12em]

                  text-text-muted
                "
              >
                Independent Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   SIDE ZONE CARD
========================================================= */

type ZoneCardProps = {
  zone: GymZone
}

function SideZoneCard({
  zone,
}: ZoneCardProps) {
  const Icon = zone.icon

  return (
    <article
      className="
        group
        relative
        isolate
        overflow-hidden

        min-h-38

        rounded-xl

        border
        border-foreground/10

        bg-surface-dark

        p-5

        transition-[background-color,border-color,box-shadow]
        duration-250

        hover:border-primary/30
        hover:bg-surface
        hover:shadow-(--shadow-card-soft)

        sm:p-6

        lg:min-h-0
      "
    >
      {/* NUMBER */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-4
          top-3

          font-heading
          text-5xl
          font-black

          leading-none

          text-foreground/4
        "
      >
        {zone.number}
      </span>

      {/* GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_0%,var(--gold-07),transparent_45%)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div
        className="
          relative
          z-10

          grid
          grid-cols-[42px_minmax(0,1fr)]

          gap-4
        "
      >
        {/* ICON */}

        <span
          className="
            flex
            size-10

            items-center
            justify-center

            rounded-xl

            border
            border-primary/30

            bg-primary/5

            text-primary

            transition-[background-color,border-color,color]
            duration-250

            group-hover:border-primary
            group-hover:bg-primary
            group-hover:text-primary-foreground
          "
        >
          <Icon
            aria-hidden={true}
            strokeWidth={1.55}
            className="size-4.5"
          />
        </span>

        {/* CONTENT */}

        <div>
          <p
            className="
              text-[8px]
              font-black
              uppercase

              tracking-[0.15em]

              text-primary
            "
          >
            {zone.eyebrow}
          </p>

          <h3
            className="
              mt-1.5

              font-heading
              text-xl
              font-black
              uppercase

              leading-none
              tracking-tight

              text-foreground

              sm:text-2xl
            "
          >
            {zone.title}
          </h3>

          <p
            className="
              mt-2.5

              max-w-110

              text-[11px]
              leading-5

              text-text-secondary

              sm:text-xs
            "
          >
            {zone.description}
          </p>
        </div>
      </div>
    </article>
  )
}

/* =========================================================
   WIDE ZONE CARD
========================================================= */

function WideZoneCard({
  zone,
}: ZoneCardProps) {
  const Icon = zone.icon

  return (
    <article
      className="
        group
        relative
        isolate
        overflow-hidden

        rounded-xl

        border
        border-foreground/10

        bg-surface-dark

        p-5

        transition-[background-color,border-color,box-shadow]
        duration-250

        hover:border-primary/30
        hover:bg-surface
        hover:shadow-(--shadow-card-soft)

        sm:p-6
      "
    >
      {/* GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_50%,var(--gold-07),transparent_48%)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* NUMBER */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-5
          top-3
          z-0

          font-heading
          text-6xl
          font-black

          leading-none

          text-foreground/3
        "
      >
        {zone.number}
      </span>

      <div
        className="
          relative
          z-10

          grid
          grid-cols-[44px_minmax(0,1fr)]

          gap-4

          sm:grid-cols-[48px_minmax(0,1fr)]
          sm:items-start
          sm:gap-5
        "
      >
        {/* ICON */}

        <span
          className="
            flex
            size-11

            items-center
            justify-center

            rounded-xl

            border
            border-primary/30

            bg-primary/5

            text-primary

            transition-[background-color,border-color,color]
            duration-250

            group-hover:border-primary
            group-hover:bg-primary
            group-hover:text-primary-foreground
          "
        >
          <Icon
            aria-hidden={true}
            strokeWidth={1.55}
            className="size-4.5"
          />
        </span>

        {/* CONTENT */}

        <div>
          <div
            className="
              flex
              items-center

              gap-2.5
            "
          >
            <span
              className="
                font-heading
                text-[9px]
                font-black

                text-primary
              "
            >
              {zone.number}
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-4

                bg-primary/35
              "
            />

            <p
              className="
                text-[8px]
                font-black
                uppercase

                tracking-[0.15em]

                text-primary
              "
            >
              {zone.eyebrow}
            </p>
          </div>

          <h3
            className="
              mt-2

              font-heading
              text-xl
              font-black
              uppercase

              leading-none
              tracking-tight

              text-foreground

              sm:text-2xl
            "
          >
            {zone.title}
          </h3>

          <p
            className="
              mt-2.5

              max-w-130

              text-[11px]
              leading-5

              text-text-secondary

              sm:text-xs
            "
          >
            {zone.description}
          </p>
        </div>
      </div>
    </article>
  )
}