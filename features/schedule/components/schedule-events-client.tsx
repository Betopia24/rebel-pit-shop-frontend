"use client"

import { useMemo, useState } from "react"

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
  initialDay: ScheduleDayId
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
  initialDay,
}: ScheduleEventsClientProps) {
  const [activeDay, setActiveDay] =
    useState<ScheduleDayId>(initialDay)

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
        {/* ===================================================
            CSS BACKGROUND
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-30

            bg-[radial-gradient(circle_at_5%_35%,rgba(212,175,55,0.055),transparent_25%),radial-gradient(circle_at_95%_75%,rgba(212,175,55,0.045),transparent_24%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-30

            hidden
            opacity-20

            bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)]
            bg-size-[80px_80px]

            md:block
          "
        />

        {/* ===================================================
            CONTAINER
        ==================================================== */}

        <div
          className="
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
              max-w-[900px]
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
                  <span className="text-white">
                    Schedule
                  </span>

                  <span className="text-primary">
                    {" "}&{" "}
                  </span>

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
                    Upcoming Events
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">
                    Class
                  </span>{" "}

                  <span className="text-primary">
                    Schedule
                  </span>
                </>
              )}
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-[700px]

                px-1

                text-[13px]
                leading-6
                text-zinc-500

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
              onDayChange={setActiveDay}
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
        border-white/10

        bg-[#090A0A]

        py-0

        shadow-[0_28px_90px_rgba(0,0,0,0.30)]

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
          -z-10

          size-80

          rounded-full

          bg-primary/3

          blur-3xl
        "
      />

      <CardHeader
        className="
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

                text-white

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
                text-zinc-500

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
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]

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
              !grid
              !h-auto
              !w-full
              !grid-cols-7

              gap-0.5

              rounded-2xl

              border
              border-white/8

              bg-[#0D0D0D]

              p-1.5

              shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]

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

                      !flex
                      !h-10
                      !w-full
                      !min-w-0

                      !items-center
                      !justify-center

                      overflow-hidden

                      rounded-[10px]

                      border
                      border-transparent

                      !px-0
                      !py-0

                      text-center
                      text-[9px]
                      font-semibold
                      leading-none

                      text-zinc-400

                      shadow-none

                      transition-[background-color,border-color,color,box-shadow]
                      duration-300
                      ease-out

                      hover:border-white/8
                      hover:bg-white/4
                      hover:text-white

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
                        !border-primary/25
                        !bg-primary/7
                        !text-primary

                        shadow-[inset_0_0_0_1px_rgba(212,175,55,0.025)]
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

                        shadow-[0_0_9px_rgba(212,175,55,0.45)]

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
        border-white/8

        bg-[#101010]

        transition-[transform,border-color,background-color,box-shadow]
        duration-300
        ease-out

        hover:border-primary/30
        hover:bg-[#12110D]

        sm:hover:-translate-y-0.5
        sm:hover:shadow-[0_14px_40px_rgba(0,0,0,0.28)]

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
          -z-10

          opacity-0

          bg-[linear-gradient(100deg,rgba(212,175,55,0.065),transparent_48%)]

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
            border-white/8

            pb-4
          "
        >
          <div>
            <p
              className="
                text-base
                font-black
                text-white

                min-[380px]:text-[17px]
              "
            >
              {classItem.startTime}
            </p>

            <p
              className="
                mt-1
                text-[11px]
                text-zinc-600
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
              text-white

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
              text-zinc-500

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
            border-white/8

            pr-5
          "
        >
          <p
            className="
              text-[16px]
              font-bold
              text-white
            "
          >
            {classItem.startTime}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-zinc-600
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
              text-white

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

              max-w-[680px]

              text-[12px]
              leading-5
              text-zinc-500

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
            border-white/8

            pr-5
          "
        >
          <p
            className="
              text-[16px]
              font-bold
              text-white
            "
          >
            {classItem.startTime}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-zinc-600
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
              text-white

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

              max-w-[460px]

              text-[13px]
              leading-5
              text-zinc-500
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

        hover:bg-white/4

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#101010]

        motion-reduce:transform-none
      "
    >
      <Avatar
        className="
          size-9
          shrink-0

          border
          border-primary/25

          bg-[#181818]

          transition-[border-color,box-shadow,transform]
          duration-300

          group-hover/coach:scale-105
          group-hover/coach:border-primary/65
          group-hover/coach:shadow-[0_0_20px_rgba(212,175,55,0.15)]

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
            bg-[#181818]

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
            text-zinc-600

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

            max-w-[125px]
            truncate

            text-[11px]
            font-semibold
            text-zinc-200

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
        text-zinc-500

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
        border-emerald-500/35
        bg-emerald-500/8
        text-emerald-300
      `

    case "Intermediate":
      return `
        border-amber-500/40
        bg-amber-500/8
        text-amber-300
      `

    case "Advanced":
      return `
        border-red-500/40
        bg-red-500/8
        text-red-300
      `

    case "Youth":
      return `
        border-sky-500/35
        bg-sky-500/8
        text-sky-300
      `

    case "Members Only":
      return `
        border-violet-500/35
        bg-violet-500/8
        text-violet-300
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
        border-white/10

        bg-[#090A0A]

        py-0

        shadow-[0_28px_90px_rgba(0,0,0,0.30)]

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

                text-white

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

                max-w-[520px]

                text-[12px]
                leading-5
                text-zinc-500

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
              hover:text-black

              sm:size-10
              sm:hover:scale-105

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black

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
        border-white/8

        bg-[#101010]

        p-4

        transition-[border-color,background-color,transform,box-shadow]
        duration-300

        hover:border-primary/30
        hover:bg-[#12110D]

        sm:p-5
        sm:hover:-translate-y-0.5
        sm:hover:shadow-[0_14px_40px_rgba(0,0,0,0.26)]

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
          -z-10

          opacity-0

          bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.07),transparent_45%)]

          transition-opacity
          duration-300

          group-hover/event:opacity-100
        "
      />

      <div
        className="
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

            h-[68px]
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
            min-[430px]:w-[72px]
            min-[430px]:flex-col
            min-[430px]:justify-center
            min-[430px]:px-0

            md:h-[102px]
            md:w-[78px]

            2xl:h-24
            2xl:w-[74px]
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
              text-white

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
              text-zinc-600

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
              text-white

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

              max-w-[620px]

              text-[12px]
              leading-5
              text-zinc-500

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
              text-zinc-500

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

              hover:text-[#F5D568]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-4
              focus-visible:ring-offset-black
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
          border-white/10

          bg-[#090909]

          p-0

          text-white

          shadow-[0_40px_120px_rgba(0,0,0,0.72)]

          [scrollbar-width:thin]
          [scrollbar-color:rgba(212,175,55,0.32)_transparent]

          sm:w-[calc(100%-48px)]
          sm:max-w-[1020px]

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

                  min-h-[300px]

                  overflow-hidden

                  border-b
                  border-white/10

                  bg-[#101010]

                  sm:min-h-[340px]

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
                        from-black
                        via-black/10
                        to-black/5

                        lg:bg-linear-to-r
                        lg:from-transparent
                        lg:via-transparent
                        lg:to-black/30
                      "
                    />
                  </>
                ) : (
                  <div
                    className="
                      flex
                      min-h-[300px]
                      size-full
                      items-center
                      justify-center

                      sm:min-h-[340px]

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

                      text-white

                      sm:text-4xl
                    "
                  >
                    Coach {coach.name}
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-[520px]

                      text-[12px]
                      leading-5
                      text-zinc-300

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

                  [scrollbar-width:thin]
                  [scrollbar-color:rgba(212,175,55,0.25)_transparent]
                "
              >
                <div className="max-w-[620px]">
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

                        text-white
                      "
                    >
                      Coach {coach.name}
                    </h3>

                    <p
                      className="
                        mt-3

                        max-w-[540px]

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
                          text-zinc-500

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
                            text-zinc-500

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
                                border-white/7

                                bg-white/2

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
                                  text-zinc-300

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
                        text-zinc-500

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
                              text-zinc-400

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
                      border-white/8

                      pb-1
                      pt-6
                    "
                  >
                    <p
                      className="
                        max-w-[520px]

                        text-[11px]
                        leading-5
                        text-zinc-500

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
                          text-black

                          shadow-[0_10px_30px_rgba(212,175,55,0.15)]

                          transition-[transform,box-shadow,filter]
                          duration-300

                          hover:-translate-y-0.5
                          hover:bg-primary
                          hover:brightness-105
                          hover:shadow-[0_16px_40px_rgba(212,175,55,0.22)]

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
        border-white/10

        bg-white/2

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
          text-zinc-200
        "
      >
        No classes scheduled
      </p>

      <p
        className="
          mt-1

          max-w-[260px]

          text-xs
          leading-5
          text-zinc-600
        "
      >
        Choose another day to find an
        available training session.
      </p>
    </div>
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