"use client"

import { useMemo, useState, useSyncExternalStore } from "react"

import Link from "next/link"

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Dumbbell,
  MapPin,
  Medal,
  UsersRound,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import type {
  CoachProfile,
  ScheduleClass,
  ScheduleDay,
  ScheduleDayId,
  ScheduleEventsData,
  ScheduleLevel,
  UpcomingEvent,
} from "@/features/schedule/types"

import { cn } from "@/lib/utils"


/* =========================================================
   TYPES
========================================================= */

type ScheduleEventsClientProps = {
  data: ScheduleEventsData
}

type ScheduleCardProps = {
  data: ScheduleEventsData
  activeDay: ScheduleDayId
  selectedDay?: ScheduleDay
  onDayChange: (day: ScheduleDayId) => void
  onCoachSelect: (coachId: string) => void
}

type ScheduleDayGroupProps = {
  day: ScheduleDay
  onCoachSelect: (coachId: string) => void
}

type ScheduleClassRowProps = {
  classItem: ScheduleClass
  onCoachSelect: (coachId: string) => void
}

type CoachDisplayProps = {
  classItem: ScheduleClass
  onSelect: (coachId: string) => void
}

type JoinedCountProps = {
  joined: number
}

type LevelBadgeProps = {
  level: ScheduleLevel
}

type UpcomingEventsCardProps = {
  events: UpcomingEvent[]
  timeZone: string
}

type EventCardProps = {
  event: UpcomingEvent
  timeZone: string
}

type CoachProfileDialogProps = {
  coach: CoachProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}


/* =========================================================
   MAIN
========================================================= */

export function ScheduleEventsClient({
  data,
}: ScheduleEventsClientProps) {
  const fallbackDay =
    data.schedule.days[0]?.id ?? "mon"

  const currentDay = useSyncExternalStore(
    subscribeToScheduleClock,
    () =>
      getCurrentScheduleDay(
        data.timeZone,
        data.schedule.days
      ) ?? fallbackDay,
    () => fallbackDay
  )

  const [selectedDayOverride, setSelectedDayOverride] =
    useState<ScheduleDayId | null>(null)

  const activeDay =
    selectedDayOverride ?? currentDay

  const [selectedCoachId, setSelectedCoachId] =
    useState<string | null>(null)

  const hasEvents = data.events.length > 0

  const selectedDay = useMemo(() => {
    return (
      data.schedule.days.find(
        (day) => day.id === activeDay
      ) ?? data.schedule.days[0]
    )
  }, [activeDay, data.schedule.days])

  const selectedCoach = useMemo(() => {
    if (!selectedCoachId) return null

    return (
      data.coaches.find(
        (coach) => coach.id === selectedCoachId
      ) ?? null
    )
  }, [data.coaches, selectedCoachId])

  return (
    <>
      <section
        id="schedule-events"
        aria-labelledby="schedule-events-heading"
        aria-describedby="schedule-events-description"
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
        {/* ===================================================
            CSS BACKGROUND
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0

            bg-[radial-gradient(circle_at_5%_35%,var(--gold-06),transparent_25%),radial-gradient(circle_at_95%_75%,var(--gold-05),transparent_24%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0

            hidden
            opacity-20

            bg-[linear-gradient(var(--white-02)_1px,transparent_1px),linear-gradient(90deg,var(--white-02)_1px,transparent_1px)]
            bg-size-[80px_80px]

            md:block
          "
        />

        {/* ===================================================
            CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            z-20

            mx-auto
            w-full
            min-w-0
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
          {/* =================================================
              SECTION HEADER
          ================================================== */}

          <header
            className="
              mx-auto
              w-full
              max-w-225
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
                  w-6
                  bg-linear-to-r
                  from-transparent
                  to-primary
                  sm:w-9
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.27em]
                  text-primary

                  min-[380px]:text-[10px]
                  sm:text-[11px]
                  sm:tracking-[0.32em]
                "
              >
                Rebel Boxing Club
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-6
                  bg-linear-to-r
                  from-primary
                  to-transparent
                  sm:w-9
                "
              />
            </div>

            <h2
              id="schedule-events-heading"
              className="
                mx-auto
                mt-4
                max-w-full

                font-heading
                font-black
                uppercase

                leading-[0.91]
                tracking-[-0.045em]

                text-[clamp(2.15rem,11vw,3.3rem)]

                min-[430px]:text-[clamp(2.65rem,9vw,4rem)]

                sm:mt-5
                sm:text-[clamp(3.3rem,7vw,5rem)]

                lg:text-[clamp(4rem,5.3vw,5.4rem)]
              "
            >
              {hasEvents ? (
                <>
                  <span className="text-foreground">
                    Schedule
                  </span>

                  <span className="text-primary">
                    {" "}&{" "}
                  </span>

                  <span
                    className="
                      bg-linear-to-r
                      from-gold-soft
                      via-primary
                      to-gold-deep

                      bg-clip-text
                      text-transparent
                    "
                  >
                    Upcoming Events
                  </span>
                </>
              ) : (
                <>
                  <span className="text-foreground">
                    Class
                  </span>{" "}

                  <span className="text-primary">
                    Schedule
                  </span>
                </>
              )}
            </h2>

            <p
              id="schedule-events-description"
              className="
                mx-auto
                mt-4
                max-w-175

                px-1

                text-[13px]
                leading-6
                text-text-muted

                sm:mt-5
                sm:text-[15px]
                sm:leading-7

                lg:text-[17px]
                lg:leading-8
              "
            >
              {hasEvents
                ? "Train with purpose. Find the right class for your goals and stay connected with what’s happening at Rebel Boxing Club."
                : "Find the right training session for your goals and build a stronger version of yourself at Rebel Boxing Club."}
            </p>
          </header>

          {/* =================================================
              MAIN CONTENT

              < 1536px:
              Schedule
              Events

              >= 1536px:
              Schedule | Events
          ================================================== */}

          <div
            className={cn(
              `
                mt-10

                grid
                w-full
                min-w-0
                items-start

                gap-5

                sm:mt-12
                lg:mt-14
                xl:mt-16

                2xl:gap-6
              `,
              hasEvents
                ? `
                    grid-cols-1

                    2xl:grid-cols-[minmax(0,1.7fr)_minmax(420px,0.85fr)]
                  `
                : "grid-cols-1"
            )}
          >
            <ScheduleCard
              data={data}
              activeDay={activeDay}
              selectedDay={selectedDay}
              onDayChange={setSelectedDayOverride}
              onCoachSelect={setSelectedCoachId}
            />

            {hasEvents && (
              <UpcomingEventsCard
                events={data.events}
                timeZone={data.timeZone}
              />
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          COACH MODAL
      ====================================================== */}

      <CoachProfileDialog
        coach={selectedCoach}
        open={selectedCoach !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCoachId(null)
          }
        }}
      />
    </>
  )
}


/* =========================================================
   SCHEDULE CARD
========================================================= */

function ScheduleCard({
  data,
  activeDay,
  selectedDay,
  onDayChange,
  onCoachSelect,
}: ScheduleCardProps) {
  return (
    <Card
      className="
        relative

        w-full
        min-w-0
        overflow-hidden

        rounded-[22px]

        border
        border-foreground/10

        bg-surface-dark

        py-0

        shadow-(--shadow-card)

        sm:rounded-3xl
      "
    >
      {/* Top accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-8
          top-0

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/35
          to-transparent

          sm:inset-x-16
        "
      />

      {/* Ambient gold */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-32
          -top-32
          z-0

          size-80

          rounded-full

          bg-primary/3

          blur-3xl
        "
      />

      <CardHeader
        className="
          relative
          z-20

          min-w-0

          px-4
          pb-0
          pt-5

          min-[380px]:px-5
          min-[380px]:pt-6

          sm:px-7
          sm:pt-7

          lg:px-8
          lg:pt-8

          xl:px-9
          xl:pt-9
        "
      >
        {/* ===================================================
            HEADING
        ==================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-col

            gap-5

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <div
              className="
                flex
                items-center
                gap-2.5
                sm:gap-3
              "
            >
              <div
                className="
                  flex
                  size-8
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg

                  border
                  border-primary/25

                  bg-primary/6

                  text-primary

                  sm:size-9
                  sm:rounded-xl
                "
              >
                <CalendarDays
                  aria-hidden="true"
                  className="
                    size-3.5
                    sm:size-4
                  "
                />
              </div>

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.23em]
                  text-primary

                  min-[380px]:text-[10px]

                  sm:text-[11px]
                  sm:tracking-[0.28em]
                "
              >
                {data.schedule.eyebrow}
              </span>
            </div>

            <h3
              className="
                mt-4

                font-heading
                text-[28px]
                font-black

                leading-none
                tracking-[-0.04em]

                text-foreground

                min-[380px]:text-[30px]

                sm:text-4xl
                lg:text-[40px]
                xl:text-[42px]
              "
            >
              {data.schedule.title}
            </h3>

            <p
              className="
                mt-2
                max-w-xl

                text-[12px]
                leading-5
                text-text-muted

                min-[380px]:text-[13px]

                sm:text-[15px]
                sm:leading-6
              "
            >
              {data.schedule.description}
            </p>
          </div>

          <Link
            href="/schedule"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              `
                hidden
                shrink-0

                rounded-full

                border-primary/25

                bg-primary/3

                px-5

                text-xs
                font-semibold
                text-primary

                transition-[transform,background-color,border-color,box-shadow]
                duration-300

                hover:-translate-y-0.5
                hover:border-primary/60
                hover:bg-primary/8
                hover:text-primary
                hover:shadow-(--shadow-card-soft)

                focus-visible:ring-primary

                motion-reduce:transform-none

                sm:inline-flex
              `
            )}
          >
            Full Schedule

            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* ===================================================
            WEEKDAY TABS

            Always 7 equal columns.
            No horizontal-scroll alignment issue.
        ==================================================== */}

        <Tabs
          value={activeDay}
          onValueChange={(value) =>
            onDayChange(
              value as ScheduleDayId
            )
          }
          className="
            mt-5
            w-full
            min-w-0
          "
        >
          <TabsList
            className="
              grid!
              h-auto!
              w-full!
              grid-cols-7!

              gap-0.5

              rounded-2xl

              border
              border-foreground/8

              bg-surface

              p-1.5

              shadow-[inset_0_1px_0_var(--white-02)]

              sm:gap-1
            "
          >
            {data.schedule.days.map((day) => {
              const isActive =
                day.id === activeDay

              return (
                <TabsTrigger
                  key={day.id}
                  value={day.id}
                  className={cn(
                    `
                      relative

                      flex!
                      h-10!
                      w-full!
                      min-w-0!

                      items-center!
                      justify-center!

                      overflow-hidden

                      rounded-[10px]

                      border
                      border-transparent

                      px-0!
                      py-0!

                      text-center
                      text-[9px]
                      font-semibold
                      leading-none

                      text-text-secondary

                      shadow-none

                      transition-[background-color,border-color,color,box-shadow]
                      duration-300
                      ease-out

                      hover:border-foreground/8
                      hover:bg-foreground/4
                      hover:text-foreground

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                      focus-visible:ring-inset

                      data-[state=active]:shadow-none

                      min-[380px]:text-[10px]

                      sm:h-11
                      sm:text-xs

                      md:text-sm
                    `,
                    isActive &&
                      `
                        border-primary/25!
                        bg-primary/7!
                        text-primary!

                        shadow-[inset_0_0_0_1px_var(--gold-04)]
                      `
                  )}
                >
                  {/* Label stays mathematically centered */}

                  <span
                    className="
                      absolute
                      inset-0

                      flex
                      items-center
                      justify-center

                      text-center
                      leading-none
                    "
                  >
                    {day.label}
                  </span>

                  {/* Active underline */}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-1/2

                        h-0.5
                        w-6

                        -translate-x-1/2

                        rounded-full
                        bg-primary

                        shadow-(--shadow-gold-xs)

                        sm:w-7
                      "
                    />
                  )}

                  {/* Very subtle active top light */}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        inset-x-3
                        top-0

                        h-px

                        bg-linear-to-r
                        from-transparent
                        via-primary/35
                        to-transparent
                      "
                    />
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </CardHeader>

      {/* =====================================================
          SCHEDULE CONTENT
      ====================================================== */}

      <CardContent
        className="
          relative
          z-20

          min-w-0

          px-4
          pb-5
          pt-3

          min-[380px]:px-5

          sm:px-7
          sm:pb-7
          sm:pt-4

          lg:px-8
          lg:pb-8

          xl:px-9
          xl:pb-9
        "
      >
        {selectedDay ? (
          <ScheduleDayGroup
            day={selectedDay}
            onCoachSelect={onCoachSelect}
          />
        ) : (
          <ScheduleEmptyState />
        )}

        {/* Mobile CTA */}

        <Link
          href="/schedule"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            `
              mt-5

              flex
              w-full

              rounded-xl

              border-primary/25

              bg-primary/5

              text-xs
              font-semibold
              text-primary

              hover:border-primary/50
              hover:bg-primary/10
              hover:text-primary

              sm:hidden
            `
          )}
        >
          View Full Schedule

          <ArrowRight className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  )
}


/* =========================================================
   DAY
========================================================= */

function ScheduleDayGroup({
  day,
  onCoachSelect,
}: ScheduleDayGroupProps) {
  if (day.classes.length === 0) {
    return <ScheduleEmptyState />
  }

  return (
    <div className="space-y-3">
      {day.classes.map((classItem) => (
        <ScheduleClassRow
          key={classItem.id}
          classItem={classItem}
          onCoachSelect={onCoachSelect}
        />
      ))}
    </div>
  )
}


/* =========================================================
   CLASS ROW
========================================================= */

function ScheduleClassRow({
  classItem,
  onCoachSelect,
}: ScheduleClassRowProps) {
  return (
    <article
      className="
        group/class

        relative
        isolate

        w-full
        min-w-0
        overflow-hidden

        rounded-2xl

        border
        border-foreground/8

        bg-surface

        transition-[transform,border-color,background-color,box-shadow]
        duration-300
        ease-out

        hover:border-primary/30
        hover:bg-surface-card-hover

        sm:hover:-translate-y-0.5
        sm:hover:shadow-(--shadow-card-soft)

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      {/* Hover gold wash */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          opacity-0

          bg-[linear-gradient(100deg,var(--gold-06),transparent_48%)]

          transition-opacity
          duration-300

          group-hover/class:opacity-100
        "
      />

      {/* Left accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-4
          left-0

          w-0.5

          rounded-full

          bg-primary

          opacity-0

          transition-opacity
          duration-300

          group-hover/class:opacity-100
        "
      />

      {/* =====================================================
          MOBILE
          < 768
      ====================================================== */}

      <div
        className="
          relative
          z-20

          p-4

          min-[380px]:p-5

          md:hidden
        "
      >
        <div
          className="
            flex
            items-start
            justify-between

            gap-3

            border-b
            border-foreground/8

            pb-4
          "
        >
          <div>
            <p
              className="
                text-base
                font-black
                text-foreground

                min-[380px]:text-[17px]
              "
            >
              {classItem.startTime}
            </p>

            <p
              className="
                mt-1
                text-[11px]
                text-text-faint
              "
            >
              {classItem.endTime}
            </p>
          </div>

          <LevelBadge
            level={classItem.level}
          />
        </div>

        <div className="pt-4">
          <h4
            className="
              text-[15px]
              font-bold
              text-foreground

              transition-colors
              duration-300

              group-hover/class:text-primary

              min-[380px]:text-base
            "
          >
            {classItem.title}
          </h4>

          <p
            className="
              mt-1.5

              text-[12px]
              leading-5
              text-text-muted

              min-[380px]:text-[13px]
            "
          >
            {classItem.description}
          </p>
        </div>

        <div
          className="
            mt-5

            flex
            min-w-0
            items-center
            justify-between

            gap-3
          "
        >
          <CoachDisplay
            classItem={classItem}
            onSelect={onCoachSelect}
          />

          <JoinedCount
            joined={classItem.joined}
          />
        </div>
      </div>

      {/* =====================================================
          TABLET / SMALL LAPTOP
          768 – 1279
      ====================================================== */}

      <div
        className="
          relative
          z-20

          hidden

          min-w-0

          p-5

          md:grid
          md:grid-cols-[110px_minmax(0,1fr)]
          md:gap-x-5
          md:gap-y-4

          xl:hidden
        "
      >
        {/* Time */}

        <div
          className="
            row-span-2

            border-r
            border-foreground/8

            pr-5
          "
        >
          <p
            className="
              text-[16px]
              font-bold
              text-foreground
            "
          >
            {classItem.startTime}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-text-faint
            "
          >
            {classItem.endTime}
          </p>
        </div>

        {/* Class */}

        <div className="min-w-0">
          <h4
            className="
              text-[15px]
              font-bold
              text-foreground

              transition-colors
              duration-300

              group-hover/class:text-primary

              lg:text-base
            "
          >
            {classItem.title}
          </h4>

          <p
            className="
              mt-1

              max-w-170

              text-[12px]
              leading-5
              text-text-muted

              lg:text-[13px]
            "
          >
            {classItem.description}
          </p>
        </div>

        {/* Meta */}

        <div
          className="
            flex
            min-w-0
            flex-wrap
            items-center

            gap-x-5
            gap-y-3
          "
        >
          <CoachDisplay
            classItem={classItem}
            onSelect={onCoachSelect}
          />

          <LevelBadge
            level={classItem.level}
          />

          <JoinedCount
            joined={classItem.joined}
          />
        </div>
      </div>

      {/* =====================================================
          FULL HORIZONTAL ROW
          1280+
      ====================================================== */}

      <div
        className="
          relative
          z-20

          hidden

          min-w-0

          xl:grid
          xl:grid-cols-[110px_minmax(210px,1fr)_160px_110px_100px]
          xl:items-center
          xl:gap-5
          xl:p-5

          2xl:grid-cols-[110px_minmax(220px,1fr)_165px_110px_100px]
        "
      >
        {/* Time */}

        <div
          className="
            border-r
            border-foreground/8

            pr-5
          "
        >
          <p
            className="
              text-[16px]
              font-bold
              text-foreground
            "
          >
            {classItem.startTime}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-text-faint
            "
          >
            {classItem.endTime}
          </p>
        </div>

        {/* Class */}

        <div className="min-w-0">
          <h4
            className="
              truncate

              text-[15px]
              font-bold
              text-foreground

              transition-colors
              duration-300

              group-hover/class:text-primary
            "
          >
            {classItem.title}
          </h4>

          <p
            className="
              mt-1

              line-clamp-2

              max-w-115

              text-[13px]
              leading-5
              text-text-muted
            "
          >
            {classItem.description}
          </p>
        </div>

        {/* Coach */}

        <CoachDisplay
          classItem={classItem}
          onSelect={onCoachSelect}
        />

        {/* Level */}

        <LevelBadge
          level={classItem.level}
        />

        {/* Joined */}

        <JoinedCount
          joined={classItem.joined}
        />
      </div>
    </article>
  )
}


/* =========================================================
   CLICKABLE COACH
========================================================= */

function CoachDisplay({
  classItem,
  onSelect,
}: CoachDisplayProps) {
  const initials =
    classItem.coach.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <button
      type="button"
      aria-label={`View Coach ${classItem.coach.name} profile`}
      onClick={() =>
        onSelect(
          classItem.coach.id
        )
      }
      className="
        group/coach

        -m-1

        flex
        min-w-0
        items-center

        gap-2.5

        rounded-xl

        p-1

        text-left

        transition-[background-color,transform]
        duration-300

        hover:bg-foreground/4

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-surface

        motion-reduce:transform-none
      "
    >
      <Avatar
        className="
          size-9
          shrink-0

          border
          border-primary/25

          bg-surface-card

          transition-[border-color,box-shadow,transform]
          duration-300

          group-hover/coach:scale-105
          group-hover/coach:border-primary/65
          group-hover/coach:shadow-(--shadow-gold-xs)

          sm:size-10

          motion-reduce:transform-none
        "
      >
        {classItem.coach.avatar && (
          <AvatarImage
            src={classItem.coach.avatar}
            alt={`Coach ${classItem.coach.name}`}
            className="object-cover"
          />
        )}

        <AvatarFallback
          className="
            bg-surface-card

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
        <span
          className="
            block

            text-[7px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-text-faint

            transition-colors
            duration-300

            group-hover/coach:text-primary/70

            sm:text-[8px]
          "
        >
          Coach
        </span>

        <span
          className="
            block

            max-w-31.25
            truncate

            text-[11px]
            font-semibold
            text-text-soft

            transition-colors
            duration-300

            group-hover/coach:text-primary

            sm:text-xs
          "
        >
          {classItem.coach.name}
        </span>
      </div>
    </button>
  )
}


/* =========================================================
   JOINED
========================================================= */

function JoinedCount({
  joined,
}: JoinedCountProps) {
  return (
    <div
      className="
        flex
        shrink-0
        items-center
        gap-1.5

        text-[10px]
        text-text-muted

        sm:text-xs
      "
    >
      <UsersRound
        aria-hidden="true"
        className="
          size-3.5
          shrink-0
          text-primary

          sm:size-4
        "
      />

      <span className="whitespace-nowrap">
        {joined} joined
      </span>
    </div>
  )
}


/* =========================================================
   LEVEL BADGE
========================================================= */

function LevelBadge({
  level,
}: LevelBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        `
          h-6
          shrink-0

          rounded-full

          px-2.5

          text-[8px]
          font-semibold

          whitespace-nowrap

          sm:h-7
          sm:px-3
          sm:text-[9px]
        `,
        getLevelClassName(level)
      )}
    >
      {level}
    </Badge>
  )
}


function getLevelClassName(
  level: ScheduleLevel
) {
  switch (level) {
    case "Beginner":
      return `
        border-chart-2/35
        bg-chart-2/8
        text-chart-2
      `

    case "Intermediate":
      return `
        border-chart-1/40
        bg-chart-1/8
        text-chart-1
      `

    case "Advanced":
      return `
        border-destructive/40
        bg-destructive/8
        text-destructive
      `

    case "Youth":
      return `
        border-chart-4/35
        bg-chart-4/8
        text-chart-4
      `

    case "Members Only":
      return `
        border-chart-3/35
        bg-chart-3/8
        text-chart-3
      `

    default:
      return `
        border-primary/35
        bg-primary/6
        text-primary
      `
  }
}


/* =========================================================
   UPCOMING EVENTS
========================================================= */

function UpcomingEventsCard({
  events,
  timeZone,
}: UpcomingEventsCardProps) {
  return (
    <Card
      className="
        relative

        w-full
        min-w-0
        overflow-hidden

        rounded-[22px]

        border
        border-foreground/10

        bg-surface-dark

        py-0

        shadow-(--shadow-card)

        sm:rounded-3xl
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-8
          top-0

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/30
          to-transparent
        "
      />

      <CardHeader
        className="
          relative
          z-20

          px-4
          pb-0
          pt-5

          min-[380px]:px-5
          min-[380px]:pt-6

          sm:px-7
          sm:pt-7

          lg:px-8
          lg:pt-8

          2xl:pt-9
        "
      >
        <div
          className="
            flex
            items-start
            justify-between

            gap-4
          "
        >
          <div className="min-w-0">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-primary

                sm:text-[11px]
              "
            >
              Special Events
            </span>

            <h3
              className="
                mt-3

                font-heading
                text-[28px]
                font-black

                leading-[0.95]
                tracking-[-0.04em]

                text-foreground

                sm:text-4xl
                lg:text-[40px]
                2xl:text-[38px]
              "
            >
              Upcoming Events
            </h3>

            <p
              className="
                mt-2

                max-w-130

                text-[12px]
                leading-5
                text-text-muted

                sm:text-sm
                sm:leading-6
              "
            >
              Workshops, sparring nights and
              community events.
            </p>
          </div>

          <Link
            href="/schedule"
            aria-label="View all upcoming events"
            className="
              group

              flex
              size-9
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-primary/30

              text-primary

              transition-[background-color,border-color,color,transform]
              duration-300

              hover:border-primary
              hover:bg-primary
              hover:text-primary-foreground

              sm:size-10
              sm:hover:scale-105

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background

              motion-reduce:transform-none
            "
          >
            <ArrowRight
              aria-hidden="true"
              className="
                size-4

                transition-transform
                duration-300

                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </CardHeader>

      <CardContent
        className="
          relative
          z-20

          px-4
          pb-5
          pt-5

          min-[380px]:px-5

          sm:px-7
          sm:pb-7
          sm:pt-6

          lg:px-8
          lg:pb-8
        "
      >
        <div className="space-y-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              timeZone={timeZone}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({
  event,
  timeZone,
}: EventCardProps) {
  const date =
    getEventDate(
      event.date,
      timeZone
    )

  return (
    <article
      className="
        group/event

        relative
        isolate

        w-full
        min-w-0
        overflow-hidden

        rounded-2xl

        border
        border-foreground/8

        bg-surface

        p-4

        transition-[border-color,background-color,transform,box-shadow]
        duration-300

        hover:border-primary/30
        hover:bg-surface-card-hover

        sm:p-5
        sm:hover:-translate-y-0.5
        sm:hover:shadow-(--shadow-card-soft)

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          opacity-0

          bg-[radial-gradient(circle_at_0%_0%,var(--gold-08),transparent_45%)]

          transition-opacity
          duration-300

          group-hover/event:opacity-100
        "
      />

      <div
        className="
          relative
          z-20

          flex
          min-w-0
          flex-col
          gap-4

          min-[430px]:grid
          min-[430px]:grid-cols-[72px_minmax(0,1fr)]

          md:grid-cols-[78px_minmax(0,1fr)]

          2xl:grid-cols-[74px_minmax(0,1fr)]
        "
      >
        {/* Date */}

        <div
          className="
            flex

            h-17
            w-full

            shrink-0

            items-center
            justify-between

            rounded-xl

            border
            border-primary/18

            bg-primary/5

            px-4

            min-[430px]:h-24
            min-[430px]:w-18
            min-[430px]:flex-col
            min-[430px]:justify-center
            min-[430px]:px-0

            md:h-25.5
            md:w-19.5

            2xl:h-24
            2xl:w-18.5
          "
        >
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-primary
            "
          >
            {date.month}
          </span>

          <span
            className="
              text-[24px]
              font-black
              leading-none
              text-foreground

              min-[430px]:mt-1
              min-[430px]:text-[28px]
            "
          >
            {date.day}
          </span>

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-text-faint

              min-[430px]:mt-2
            "
          >
            {date.weekday}
          </span>
        </div>

        {/* Details */}

        <div className="min-w-0">
          <Badge
            variant="outline"
            className="
              h-6

              rounded-full

              border-primary/30
              bg-primary/5

              px-2.5

              text-[8px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-primary
            "
          >
            {event.category}
          </Badge>

          <h4
            className="
              mt-3

              text-[15px]
              font-bold
              text-foreground

              transition-colors
              duration-300

              group-hover/event:text-primary

              sm:text-base
            "
          >
            {event.title}
          </h4>

          <p
            className="
              mt-1.5

              max-w-155

              text-[12px]
              leading-5
              text-text-muted

              sm:text-[13px]
            "
          >
            {event.description}
          </p>

          <div
            className="
              mt-4

              flex
              flex-col

              gap-2

              text-[10px]
              text-text-muted

              min-[430px]:flex-row
              min-[430px]:flex-wrap
              min-[430px]:gap-x-4
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1.5
              "
            >
              <Clock3
                aria-hidden="true"
                className="
                  size-3.5
                  shrink-0
                  text-primary
                "
              />

              {event.startTime}
              {" – "}
              {event.endTime}
            </span>

            <span
              className="
                inline-flex
                min-w-0
                items-center
                gap-1.5
              "
            >
              <MapPin
                aria-hidden="true"
                className="
                  size-3.5
                  shrink-0
                  text-primary
                "
              />

              <span className="truncate">
                {event.location}
              </span>
            </span>
          </div>

          <Link
            href={event.href}
            className="
              group/link

              mt-5

              inline-flex
              items-center
              gap-2

              text-xs
              font-semibold
              text-primary

              transition-colors
              duration-200

              hover:text-gold-soft

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-4
              focus-visible:ring-offset-background
            "
          >
            {event.ctaLabel}

            <ArrowRight
              aria-hidden="true"
              className="
                size-3.5

                transition-transform
                duration-300

                group-hover/link:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </article>
  )
}


/* =========================================================
   COACH PROFILE DIALOG
========================================================= */

function CoachProfileDialog({
  coach,
  open,
  onOpenChange,
}: CoachProfileDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          max-h-[92dvh]

          w-[calc(100%-24px)]
          max-w-none

          overflow-y-auto
          overflow-x-hidden

          border
          border-foreground/10

          bg-surface-dark

          p-0

          text-foreground

          shadow-[0_40px_120px_var(--overlay-black-75)]

          scrollbar-thin
          [scrollbar-color:var(--gold-30)_transparent]

          sm:w-[calc(100%-48px)]
          sm:max-w-255

          lg:overflow-hidden
        "
      >
        {coach && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>
                Coach {coach.name}
              </DialogTitle>

              <DialogDescription>
                {coach.role}
              </DialogDescription>
            </DialogHeader>

            <div
              className="
                grid

                lg:h-[min(760px,86dvh)]
                lg:grid-cols-[380px_minmax(0,1fr)]
              "
            >
              {/* =============================================
                  IMAGE PANEL
              ============================================== */}

              <div
                className="
                  relative

                  min-h-75

                  overflow-hidden

                  border-b
                  border-foreground/10

                  bg-surface

                  sm:min-h-85

                  lg:h-full
                  lg:min-h-0
                  lg:border-b-0
                  lg:border-r
                "
              >
                {coach.avatar ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coach.avatar}
                      alt={`Coach ${coach.name}`}
                      loading="lazy"
                      decoding="async"
                      className="
                        absolute
                        inset-0

                        size-full

                        object-cover
                        object-top
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        bg-linear-to-t
                        from-background
                        via-background/10
                        to-background/5

                        lg:bg-linear-to-r
                        lg:from-transparent
                        lg:via-transparent
                        lg:to-background/30
                      "
                    />
                  </>
                ) : (
                  <div
                    className="
                      flex
                      min-h-75
                      size-full
                      items-center
                      justify-center

                      sm:min-h-85

                      lg:min-h-0
                    "
                  >
                    <span
                      className="
                        text-8xl
                        font-black
                        text-primary/15
                      "
                    >
                      {coach.name[0]}
                    </span>
                  </div>
                )}

                {/* Mobile identity */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0

                    p-5

                    min-[380px]:p-6

                    lg:hidden
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.28em]
                      text-primary

                      sm:text-[10px]
                    "
                  >
                    Meet the Rebels
                  </span>

                  <h3
                    className="
                      mt-2

                      font-heading
                      text-[32px]
                      font-black

                      leading-none
                      tracking-[-0.04em]

                      text-foreground

                      sm:text-4xl
                    "
                  >
                    Coach {coach.name}
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-130

                      text-[12px]
                      leading-5
                      text-text-soft

                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    {coach.role}
                  </p>
                </div>
              </div>

              {/* =============================================
                  DETAILS PANEL
              ============================================== */}

              <div
                className="
                  min-w-0

                  p-5

                  sm:p-7

                  lg:h-full
                  lg:overflow-y-auto
                  lg:p-9

                  scrollbar-thin
                  [scrollbar-color:var(--gold-25)_transparent]
                "
              >
                <div className="max-w-155">
                  {/* Desktop identity */}

                  <div className="hidden lg:block">
                    <div
                      className="
                        flex
                        items-center
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
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.3em]
                          text-primary
                        "
                      >
                        Meet the Rebels
                      </span>
                    </div>

                    <h3
                      className="
                        mt-5

                        font-heading
                        text-[44px]
                        font-black

                        leading-[0.96]
                        tracking-[-0.045em]

                        text-foreground
                      "
                    >
                      Coach {coach.name}
                    </h3>

                    <p
                      className="
                        mt-3

                        max-w-135

                        text-[15px]
                        font-medium
                        leading-6
                        text-primary
                      "
                    >
                      {coach.role}
                    </p>
                  </div>

                  {/* =========================================
                      SPECIALTIES
                  ========================================== */}

                  <section className="mt-1 lg:mt-8">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Dumbbell
                        aria-hidden="true"
                        className="
                          size-4
                          text-primary
                        "
                      />

                      <h4
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          text-text-muted

                          sm:text-[10px]
                        "
                      >
                        Specialties
                      </h4>
                    </div>

                    <div
                      className="
                        mt-3

                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {coach.specialties.map(
                        (specialty) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className="
                              rounded-full

                              border-primary/25

                              bg-primary/5

                              px-3
                              py-1.5

                              text-[9px]
                              font-semibold
                              text-primary

                              sm:text-[10px]
                            "
                          >
                            {specialty}
                          </Badge>
                        )
                      )}
                    </div>
                  </section>

                  {/* =========================================
                      CREDENTIALS
                  ========================================== */}

                  {coach.credentials.length > 0 && (
                    <section className="mt-7">
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <Medal
                          aria-hidden="true"
                          className="
                            size-4
                            text-primary
                          "
                        />

                        <h4
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.22em]
                            text-text-muted

                            sm:text-[10px]
                          "
                        >
                          Background & Credentials
                        </h4>
                      </div>

                      <div
                        className="
                          mt-3
                          grid
                          gap-2
                        "
                      >
                        {coach.credentials.map(
                          (credential) => (
                            <div
                              key={credential}
                              className="
                                flex
                                items-start
                                gap-2.5

                                rounded-xl

                                border
                                border-foreground/7

                                bg-foreground/2

                                px-3.5
                                py-3
                              "
                            >
                              <CheckCircle2
                                aria-hidden="true"
                                className="
                                  mt-0.5

                                  size-3.5
                                  shrink-0

                                  text-primary
                                "
                              />

                              <span
                                className="
                                  text-[11px]
                                  leading-5
                                  text-text-soft

                                  sm:text-[12px]
                                "
                              >
                                {credential}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  )}

                  {/* =========================================
                      BIO
                  ========================================== */}

                  <section className="mt-7">
                    <h4
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.22em]
                        text-text-muted

                        sm:text-[10px]
                      "
                    >
                      About Coach {coach.name}
                    </h4>

                    <div
                      className="
                        mt-4
                        space-y-4
                      "
                    >
                      {coach.bio.map(
                        (paragraph, index) => (
                          <p
                            key={`${coach.id}-${index}`}
                            className="
                              text-[12px]
                              leading-6
                              text-text-secondary

                              sm:text-sm
                              sm:leading-7
                            "
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>
                  </section>

                  {/* =========================================
                      CTA
                  ========================================== */}

                  <div
                    className="
                      mt-8

                      border-t
                      border-foreground/8

                      pb-1
                      pt-6
                    "
                  >
                    <p
                      className="
                        max-w-130

                        text-[11px]
                        leading-5
                        text-text-muted

                        sm:text-xs
                      "
                    >
                      Interested in private or group
                      training? Get in contact with
                      Rebel Boxing Club for training
                      information.
                    </p>

                    <Link
                      href="/message"
                      className={cn(
                        buttonVariants(),
                        `
                          mt-4

                          min-h-11

                          rounded-xl

                          bg-primary

                          px-5

                          text-xs
                          font-bold
                          uppercase
                          tracking-[0.06em]
                          text-primary-foreground

                          shadow-(--shadow-gold-sm)

                          transition-[transform,box-shadow,filter]
                          duration-300

                          hover:-translate-y-0.5
                          hover:bg-primary
                          hover:brightness-105
                          hover:shadow-(--shadow-gold-md)

                          motion-reduce:transform-none
                        `
                      )}
                    >
                      Contact Us

                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}


/* =========================================================
   EMPTY STATE
========================================================= */

function ScheduleEmptyState() {
  return (
    <div
      className="
        flex
        min-h-44
        flex-col
        items-center
        justify-center

        rounded-2xl

        border
        border-dashed
        border-foreground/10

        bg-foreground/2

        px-5

        text-center

        sm:min-h-48
      "
    >
      <div
        className="
          flex
          size-10
          items-center
          justify-center

          rounded-full

          border
          border-primary/25

          bg-primary/5
        "
      >
        <CalendarDays
          aria-hidden="true"
          className="
            size-4
            text-primary
          "
        />
      </div>

      <p
        className="
          mt-4

          text-sm
          font-semibold
          text-text-soft
        "
      >
        No classes scheduled
      </p>

      <p
        className="
          mt-1

          max-w-65

          text-xs
          leading-5
          text-text-faint
        "
      >
        Choose another day to find an
        available training session.
      </p>
    </div>
  )
}


/* =========================================================
   SCHEDULE CLOCK SUBSCRIPTION

   useSyncExternalStore lets us read browser time without
   calling setState synchronously inside an effect.

   - Server snapshot stays deterministic for hydration.
   - Browser snapshot uses the schedule timezone.
   - The store checks once per minute and whenever the tab
     becomes visible again, so the selected day can roll over
     correctly at midnight.
========================================================= */

function subscribeToScheduleClock(
  onStoreChange: () => void
) {
  const intervalId = window.setInterval(
    onStoreChange,
    60_000
  )

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      onStoreChange()
    }
  }

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  )

  return () => {
    window.clearInterval(intervalId)

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    )
  }
}


/* =========================================================
   CURRENT SCHEDULE DAY

   Runs in the browser after hydration so the selected tab
   reflects the real current weekday in the schedule's
   configured timezone, not the build-time weekday.
========================================================= */

function getCurrentScheduleDay(
  timeZone: string,
  days: ScheduleDay[]
): ScheduleDayId | null {
  const weekday = new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "short",
      timeZone,
    }
  )
    .format(new Date())
    .toLowerCase()
    .slice(0, 3)

  return (
    days.find(
      (day) => day.id === weekday
    )?.id ?? null
  )
}


/* =========================================================
   EVENT DATE HELPER
========================================================= */

function getEventDate(
  dateString: string,
  timeZone: string
) {
  const date =
    new Date(
      `${dateString}T12:00:00Z`
    )

  const month =
    new Intl.DateTimeFormat(
      "en-US",
      {
        month: "short",
        timeZone,
      }
    )
      .format(date)
      .toUpperCase()

  const day =
    new Intl.DateTimeFormat(
      "en-US",
      {
        day: "2-digit",
        timeZone,
      }
    ).format(date)

  const weekday =
    new Intl.DateTimeFormat(
      "en-US",
      {
        weekday: "short",
        timeZone,
      }
    )
      .format(date)
      .toUpperCase()

  return {
    month,
    day,
    weekday,
  }
}