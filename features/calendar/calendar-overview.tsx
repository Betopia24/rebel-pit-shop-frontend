"use client"

import { useMemo, useState } from "react"

import type { LucideIcon } from "lucide-react"
import {
  CalendarDays,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  PanelRight,
  UsersRound,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import type { SidebarUserRole } from "@/features/admin-shell/types/navigation.types"

import { cn } from "@/lib/utils"

type CalendarView = "month" | "week" | "day"

type CalendarEvent = {
  id: string
  date: string
  title: string
  startTime: string
  endTime: string
  coachId: string
  type: "class" | "personal" | "event"
  location: string
  attendees: number
  capacity: number
  accentClassName: string
  dotClassName: string
}

type Coach = {
  id: string
  name: string
  initials: string
  colorClassName: string
  dotClassName: string
}

const BASE_DATE = "2024-04-22"

const COACHES: Coach[] = [
  { id: "coach-nichole", name: "Nichole", initials: "NI", colorClassName: "bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "coach-nhut", name: "Nhut", initials: "NH", colorClassName: "bg-sky-500/10 text-sky-300", dotClassName: "bg-sky-400" },
  { id: "coach-cory", name: "Cory", initials: "CO", colorClassName: "bg-orange-500/10 text-orange-300", dotClassName: "bg-orange-400" },
  { id: "coach-john", name: "John", initials: "JO", colorClassName: "bg-violet-500/10 text-violet-300", dotClassName: "bg-violet-400" },
  { id: "coach-kelsey", name: "Kelsey", initials: "KE", colorClassName: "bg-emerald-500/10 text-emerald-300", dotClassName: "bg-emerald-400" },
  { id: "coach-moses", name: "Moses", initials: "MO", colorClassName: "bg-rose-500/10 text-rose-300", dotClassName: "bg-rose-400" },
  { id: "coach-devin", name: "Devin", initials: "DE", colorClassName: "bg-cyan-500/10 text-cyan-300", dotClassName: "bg-cyan-400" },
]

const COACH_BY_ID = Object.fromEntries(COACHES.map((coach) => [coach.id, coach])) as Record<string, Coach>

const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "event-01", date: "2024-04-01", title: "Boxing Fundamentals", startTime: "09:00", endTime: "10:00", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 8, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-02", date: "2024-04-02", title: "Kickboxing", startTime: "08:00", endTime: "09:00", coachId: "coach-john", type: "class", location: "Main studio", attendees: 6, capacity: 12, accentClassName: "border-violet-400/40 bg-violet-400/10 text-violet-200", dotClassName: "bg-violet-400" },
  { id: "event-03", date: "2024-04-02", title: "Personal Training", startTime: "16:00", endTime: "17:00", coachId: "coach-kelsey", type: "personal", location: "Private room", attendees: 1, capacity: 1, accentClassName: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200", dotClassName: "bg-emerald-400" },
  { id: "event-04", date: "2024-04-03", title: "Conditioning", startTime: "10:00", endTime: "11:00", coachId: "coach-kelsey", type: "class", location: "Main studio", attendees: 9, capacity: 12, accentClassName: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200", dotClassName: "bg-emerald-400" },
  { id: "event-05", date: "2024-04-03", title: "Strength & Boxing", startTime: "18:00", endTime: "19:00", coachId: "coach-moses", type: "class", location: "Main studio", attendees: 5, capacity: 12, accentClassName: "border-rose-400/40 bg-rose-400/10 text-rose-200", dotClassName: "bg-rose-400" },
  { id: "event-06", date: "2024-04-04", title: "Boxing Fitness", startTime: "08:00", endTime: "09:00", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 7, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-07", date: "2024-04-05", title: "Kickboxing", startTime: "18:00", endTime: "19:00", coachId: "coach-devin", type: "class", location: "Main studio", attendees: 9, capacity: 12, accentClassName: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200", dotClassName: "bg-cyan-400" },
  { id: "event-08", date: "2024-04-06", title: "Open Gym", startTime: "10:00", endTime: "12:00", coachId: "studio", type: "event", location: "Whole gym", attendees: 14, capacity: 20, accentClassName: "border-slate-400/40 bg-slate-400/10 text-slate-200", dotClassName: "bg-slate-300" },
  { id: "event-09", date: "2024-04-08", title: "Beginner Boxing", startTime: "09:00", endTime: "10:00", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 10, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-10", date: "2024-04-09", title: "Kickboxing", startTime: "08:00", endTime: "09:00", coachId: "coach-john", type: "class", location: "Main studio", attendees: 6, capacity: 12, accentClassName: "border-violet-400/40 bg-violet-400/10 text-violet-200", dotClassName: "bg-violet-400" },
  { id: "event-11", date: "2024-04-10", title: "Conditioning", startTime: "10:00", endTime: "11:00", coachId: "coach-kelsey", type: "class", location: "Main studio", attendees: 9, capacity: 12, accentClassName: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200", dotClassName: "bg-emerald-400" },
  { id: "event-12", date: "2024-04-10", title: "Personal Training", startTime: "17:00", endTime: "18:00", coachId: "coach-devin", type: "personal", location: "Private room", attendees: 1, capacity: 1, accentClassName: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200", dotClassName: "bg-cyan-400" },
  { id: "event-13", date: "2024-04-11", title: "Boxing Fundamentals", startTime: "08:00", endTime: "09:00", coachId: "coach-nhut", type: "class", location: "Main studio", attendees: 8, capacity: 12, accentClassName: "border-sky-400/40 bg-sky-400/10 text-sky-200", dotClassName: "bg-sky-400" },
  { id: "event-14", date: "2024-04-12", title: "Strength & Boxing", startTime: "18:00", endTime: "19:00", coachId: "coach-moses", type: "class", location: "Main studio", attendees: 5, capacity: 12, accentClassName: "border-rose-400/40 bg-rose-400/10 text-rose-200", dotClassName: "bg-rose-400" },
  { id: "event-15", date: "2024-04-13", title: "Saturday Sparring", startTime: "11:00", endTime: "13:00", coachId: "coach-nhut", type: "event", location: "Main studio", attendees: 16, capacity: 20, accentClassName: "border-sky-400/40 bg-sky-400/10 text-sky-200", dotClassName: "bg-sky-400" },
  { id: "event-16", date: "2024-04-15", title: "Boxing Fitness", startTime: "09:00", endTime: "10:00", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 8, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-17", date: "2024-04-16", title: "Kickboxing", startTime: "08:00", endTime: "09:00", coachId: "coach-john", type: "class", location: "Main studio", attendees: 7, capacity: 12, accentClassName: "border-violet-400/40 bg-violet-400/10 text-violet-200", dotClassName: "bg-violet-400" },
  { id: "event-18", date: "2024-04-17", title: "Conditioning", startTime: "10:00", endTime: "11:00", coachId: "coach-kelsey", type: "class", location: "Main studio", attendees: 9, capacity: 12, accentClassName: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200", dotClassName: "bg-emerald-400" },
  { id: "event-19", date: "2024-04-17", title: "Open Gym", startTime: "18:00", endTime: "20:00", coachId: "studio", type: "event", location: "Whole gym", attendees: 12, capacity: 20, accentClassName: "border-slate-400/40 bg-slate-400/10 text-slate-200", dotClassName: "bg-slate-300" },
  { id: "event-20", date: "2024-04-18", title: "Boxing Fundamentals", startTime: "08:00", endTime: "09:00", coachId: "coach-nhut", type: "class", location: "Main studio", attendees: 6, capacity: 12, accentClassName: "border-sky-400/40 bg-sky-400/10 text-sky-200", dotClassName: "bg-sky-400" },
  { id: "event-21", date: "2024-04-19", title: "Personal Training", startTime: "16:00", endTime: "17:00", coachId: "coach-devin", type: "personal", location: "Private room", attendees: 1, capacity: 1, accentClassName: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200", dotClassName: "bg-cyan-400" },
  { id: "event-22", date: "2024-04-20", title: "Community Boxing", startTime: "10:00", endTime: "12:00", coachId: "coach-moses", type: "event", location: "Main studio", attendees: 18, capacity: 20, accentClassName: "border-rose-400/40 bg-rose-400/10 text-rose-200", dotClassName: "bg-rose-400" },
  { id: "event-23", date: "2024-04-22", title: "Boxing Fundamentals", startTime: "09:00", endTime: "10:00", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 8, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-24", date: "2024-04-22", title: "Personal Training", startTime: "11:00", endTime: "12:00", coachId: "coach-john", type: "personal", location: "Private room", attendees: 1, capacity: 1, accentClassName: "border-violet-400/40 bg-violet-400/10 text-violet-200", dotClassName: "bg-violet-400" },
  { id: "event-25", date: "2024-04-22", title: "Skills & Combinations", startTime: "13:00", endTime: "14:00", coachId: "coach-nhut", type: "class", location: "Main studio", attendees: 7, capacity: 12, accentClassName: "border-sky-400/40 bg-sky-400/10 text-sky-200", dotClassName: "bg-sky-400" },
  { id: "event-26", date: "2024-04-22", title: "Beginner Boxing", startTime: "17:30", endTime: "18:30", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 10, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-27", date: "2024-04-23", title: "Beginner Boxing", startTime: "09:00", endTime: "10:00", coachId: "coach-nichole", type: "class", location: "Main studio", attendees: 8, capacity: 12, accentClassName: "border-gold/40 bg-gold/10 text-gold", dotClassName: "bg-gold" },
  { id: "event-28", date: "2024-04-23", title: "Personal Training", startTime: "16:00", endTime: "17:00", coachId: "coach-cory", type: "personal", location: "Private room", attendees: 1, capacity: 1, accentClassName: "border-orange-400/40 bg-orange-400/10 text-orange-200", dotClassName: "bg-orange-400" },
  { id: "event-29", date: "2024-04-24", title: "Boxing Fundamentals", startTime: "10:00", endTime: "11:00", coachId: "coach-nhut", type: "class", location: "Main studio", attendees: 6, capacity: 12, accentClassName: "border-sky-400/40 bg-sky-400/10 text-sky-200", dotClassName: "bg-sky-400" },
  { id: "event-30", date: "2024-04-25", title: "Skills & Combinations", startTime: "17:30", endTime: "18:30", coachId: "coach-nhut", type: "class", location: "Main studio", attendees: 7, capacity: 12, accentClassName: "border-sky-400/40 bg-sky-400/10 text-sky-200", dotClassName: "bg-sky-400" },
  { id: "event-31", date: "2024-04-26", title: "Personal Training", startTime: "11:00", endTime: "12:00", coachId: "coach-john", type: "personal", location: "Private room", attendees: 1, capacity: 1, accentClassName: "border-violet-400/40 bg-violet-400/10 text-violet-200", dotClassName: "bg-violet-400" },
]

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const HOURS = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

function parseDate(value: string): Date {
  return new Date(`${value}T12:00:00.000Z`)
}

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function addDays(value: string, amount: number): string {
  const date = parseDate(value)
  date.setUTCDate(date.getUTCDate() + amount)
  return toIso(date)
}

function addMonths(value: string, amount: number): string {
  const date = parseDate(value)
  date.setUTCMonth(date.getUTCMonth() + amount, 1)
  return toIso(date)
}

function getMonthGrid(value: string): string[] {
  const date = parseDate(value)
  const first = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 12))
  const offset = first.getUTCDay()
  const start = new Date(first)
  start.setUTCDate(start.getUTCDate() - offset)

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(start)
    current.setUTCDate(start.getUTCDate() + index)
    return toIso(current)
  })
}

function getWeekStart(value: string): string {
  const date = parseDate(value)
  date.setUTCDate(date.getUTCDate() - date.getUTCDay())
  return toIso(date)
}

function formatMonth(value: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(parseDate(value))
}

function formatDate(value: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(parseDate(value))
}

function formatTime(value: string): string {
  const [hourValue, minute] = value.split(":")
  const hour = Number(hourValue)
  return `${hour % 12 || 12}:${minute} ${hour >= 12 ? "PM" : "AM"}`
}

function getCoachName(coachId: string): string {
  return COACH_BY_ID[coachId]?.name ?? "Studio"
}

function CalendarEventCard({ event, compact = false, onClick }: { event: CalendarEvent; compact?: boolean; onClick: () => void }) {
  const eventSurface = event.coachId === "coach-nichole"
    ? "border-gold/35 bg-gold/[0.06] text-gold"
    : "border-border/80 bg-card/70 text-text-soft"

  return (
    <button type="button" onClick={onClick} className={cn("w-full border-l-2 text-left transition hover:border-gold/50 hover:bg-gold/[0.08]", compact ? "truncate rounded px-1.5 py-1 text-[9px] leading-3" : "rounded-md px-2 py-1.5 text-[10px] leading-4", eventSurface)}>
      <span className="flex items-center gap-1.5 truncate font-medium"><span className={cn("size-1.5 shrink-0 rounded-full", event.dotClassName)} />{event.title}</span>
      {!compact && <span className="mt-0.5 block truncate text-[9px] opacity-75">{formatTime(event.startTime)} · {getCoachName(event.coachId)}</span>}
    </button>
  )
}

function CalendarMonthView({ date, events, onEventClick }: { date: string; events: CalendarEvent[]; onEventClick: (event: CalendarEvent) => void }) {
  const days = getMonthGrid(date)
  const month = parseDate(date).getUTCMonth()

  return (
    <div className="min-w-[720px] overflow-hidden rounded-lg border border-border bg-background/20">
      <div className="grid grid-cols-7 border-b border-border bg-card/80">
        {WEEKDAYS.map((weekday) => <div key={weekday} className="px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{weekday}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayDate = parseDate(day)
          const dayEvents = events.filter((event) => event.date === day)
          const isCurrentMonth = dayDate.getUTCMonth() === month
          const isToday = day === BASE_DATE

          return (
            <div key={day} className={cn("min-h-[72px] border-b border-r border-border/70 p-1.5", !isCurrentMonth && "bg-muted/10", isToday && "bg-gold/[0.04]")}>
              <div className="mb-1 flex items-center justify-between px-0.5">
                <span className={cn("flex size-5 items-center justify-center rounded-full text-[10px]", isToday ? "bg-gold font-semibold text-background" : isCurrentMonth ? "text-foreground" : "text-muted-foreground/40")}>{dayDate.getUTCDate()}</span>
                {dayEvents.length > 0 && <span className="text-[8px] text-muted-foreground">{dayEvents.length}</span>}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => <CalendarEventCard key={event.id} event={event} compact onClick={() => onEventClick(event)} />)}
                {dayEvents.length > 3 && <button type="button" onClick={() => onEventClick(dayEvents[3])} className="px-1.5 text-[9px] text-gold hover:underline">+{dayEvents.length - 3} more</button>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CalendarWeekView({ date, events, onEventClick }: { date: string; events: CalendarEvent[]; onEventClick: (event: CalendarEvent) => void }) {
  const weekStart = getWeekStart(date)
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))

  return (
    <div className="min-w-[820px] overflow-hidden rounded-lg border border-border bg-background/20">
      <div className="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] border-b border-border bg-card/80">
        <div />
        {days.map((day) => <div key={day} className={cn("border-l border-border/70 px-2 py-2 text-center", day === BASE_DATE && "bg-gold/[0.04]")}><p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{formatDate(day, { weekday: "short" })}</p><span className={cn("mx-auto mt-1 flex size-6 items-center justify-center rounded-full text-[11px]", day === BASE_DATE ? "bg-gold font-semibold text-background" : "text-foreground")}>{parseDate(day).getUTCDate()}</span></div>)}
      </div>
      <div className="max-h-[calc(100vh-22rem)] overflow-y-auto scrollbar-thin [scrollbar-color:var(--gold-30)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gold/30 [&::-webkit-scrollbar-track]:bg-transparent">
        {HOURS.map((hour) => <div key={hour} className="grid min-h-[56px] grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] border-b border-border/60"><div className="px-2 pt-1 text-right text-[8px] text-muted-foreground">{formatTime(hour)}</div>{days.map((day) => <div key={`${day}-${hour}`} className="border-l border-border/60 p-1">{events.filter((event) => event.date === day && event.startTime === hour).map((event) => <CalendarEventCard key={event.id} event={event} onClick={() => onEventClick(event)} />)}</div>)}</div>)}
      </div>
    </div>
  )
}

function CalendarDayView({ date, events, onEventClick }: { date: string; events: CalendarEvent[]; onEventClick: (event: CalendarEvent) => void }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background/20">
      <div className="border-b border-border bg-card/80 px-4 py-3"><p className="text-xs font-semibold text-foreground">{formatDate(date, { weekday: "long", month: "long", day: "numeric" })}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{events.length} scheduled {events.length === 1 ? "event" : "events"}</p></div>
      <div className="max-h-[calc(100vh-22rem)] overflow-y-auto scrollbar-thin [scrollbar-color:var(--gold-30)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gold/30 [&::-webkit-scrollbar-track]:bg-transparent">
        {HOURS.map((hour) => <div key={hour} className="grid min-h-[60px] grid-cols-[4.5rem_minmax(0,1fr)] border-b border-border/60"><div className="px-3 pt-2 text-right text-[9px] text-muted-foreground">{formatTime(hour)}</div><div className="border-l border-border/60 p-1.5">{events.filter((event) => event.startTime === hour).map((event) => <CalendarEventCard key={event.id} event={event} onClick={() => onEventClick(event)} />)}</div></div>)}
      </div>
    </div>
  )
}

function ViewIcon({ view }: { view: CalendarView }): LucideIcon {
  return view === "month" ? CalendarDays : view === "week" ? UsersRound : Clock3
}

export function CalendarOverview({ viewerRole, viewerId }: { viewerRole: SidebarUserRole; viewerId: string }) {
  const isCoach = viewerRole === "coach"
  const coachId = isCoach ? viewerId : null
  const [view, setView] = useState<CalendarView>("month")
  const [displayDate, setDisplayDate] = useState(BASE_DATE)
  const [selectedCoachIds, setSelectedCoachIds] = useState<string[]>(() => isCoach && coachId ? [coachId] : COACHES.map((coach) => coach.id))
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const allCalendarsSelected = selectedCoachIds.length === COACHES.length
  const visibleEvents = useMemo(() => CALENDAR_EVENTS.filter((event) => event.coachId === "studio" ? allCalendarsSelected : selectedCoachIds.includes(event.coachId)), [allCalendarsSelected, selectedCoachIds])
  const displayedEvents = useMemo(() => visibleEvents.filter((event) => event.date === displayDate), [displayDate, visibleEvents])

  function toggleAllCalendars() {
    if (isCoach) return
    setSelectedCoachIds(allCalendarsSelected ? [] : COACHES.map((coach) => coach.id))
  }

  function toggleCoach(coach: Coach) {
    if (isCoach) return
    setSelectedCoachIds((current) => current.includes(coach.id) ? current.filter((id) => id !== coach.id) : [...current, coach.id])
  }

  function navigate(amount: number) {
    setDisplayDate(view === "month" ? addMonths(displayDate, amount) : addDays(displayDate, amount * (view === "week" ? 7 : 1)))
    setSelectedEvent(null)
  }

  function goToday() {
    setDisplayDate(BASE_DATE)
    setSelectedEvent(null)
  }

  const title = view === "month" ? formatMonth(displayDate) : view === "week" ? `${formatDate(getWeekStart(displayDate), { month: "short", day: "numeric" })} – ${formatDate(addDays(getWeekStart(displayDate), 6), { month: "short", day: "numeric", year: "numeric" })}` : formatDate(displayDate, { weekday: "long", month: "short", day: "numeric" })

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-border p-3.5 lg:w-56 lg:border-r lg:border-b-0 lg:p-4">
          <div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Calendars</p><Filter className="size-3.5 text-muted-foreground" /></div>
          <button type="button" disabled={isCoach} onClick={toggleAllCalendars} className={cn("mt-3 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors", allCalendarsSelected ? "bg-gold/10 text-foreground" : "text-muted-foreground hover:bg-muted/30", isCoach && "cursor-default opacity-80")}><span className={cn("flex size-4 items-center justify-center rounded border", allCalendarsSelected ? "border-gold bg-gold text-background" : "border-muted-foreground/40")}>{allCalendarsSelected && <span className="text-[10px]">✓</span>}</span><span className="flex-1">All calendars</span><span className="text-[9px] text-muted-foreground">{CALENDAR_EVENTS.length}</span></button>
          <div className="mt-3 space-y-1.5">
            {COACHES.map((coach) => <button key={coach.id} type="button" disabled={isCoach} onClick={() => toggleCoach(coach)} className={cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors", selectedCoachIds.includes(coach.id) ? "text-foreground" : "text-muted-foreground/50", isCoach && coach.id !== coachId && "opacity-40", isCoach && "cursor-default")}><span className={cn("flex size-4 items-center justify-center rounded border", selectedCoachIds.includes(coach.id) ? "border-transparent" : "border-muted-foreground/30")}><span className={cn("size-2 rounded-full", selectedCoachIds.includes(coach.id) ? coach.dotClassName : "bg-transparent")} /></span><span className={cn("flex size-6 items-center justify-center rounded-md text-[9px] font-semibold", coach.colorClassName)}>{coach.initials}</span><span className="flex-1">{coach.name}</span></button>)}
          </div>
          <div className="mt-5 rounded-lg border border-border bg-background/25 p-3"><div className="flex items-center gap-2"><PanelRight className="size-3.5 text-gold" /><p className="text-[10px] font-medium text-foreground">Availability</p></div><p className="mt-1.5 text-[10px] leading-4 text-muted-foreground">Open slots and class capacity are shown on each event.</p></div>
          {selectedEvent && <div className="mt-4 rounded-lg border border-gold/20 bg-gold/[0.04] p-3"><div className="flex items-start justify-between gap-2"><p className="text-[10px] font-semibold text-foreground">Selected event</p><button type="button" onClick={() => setSelectedEvent(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close event details"><X className="size-3.5" /></button></div><p className="mt-2 text-xs font-medium text-foreground">{selectedEvent.title}</p><p className="mt-1 text-[10px] text-muted-foreground">{formatTime(selectedEvent.startTime)} – {formatTime(selectedEvent.endTime)}</p><p className="mt-1 text-[10px] text-muted-foreground">{getCoachName(selectedEvent.coachId)} · {selectedEvent.location}</p><div className="mt-2 flex items-center justify-between text-[10px]"><span className="text-muted-foreground">Attendance</span><span className="font-medium text-foreground">{selectedEvent.attendees}/{selectedEvent.capacity}</span></div></div>}
        </aside>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5"><div className="flex items-center gap-2"><Button type="button" variant="outline" size="sm" onClick={goToday} className="h-7 text-[10px]">Today</Button><div className="flex items-center"><Button type="button" variant="ghost" size="icon-sm" onClick={() => navigate(-1)} aria-label="Previous date" className="size-7 text-muted-foreground"><ChevronLeft className="size-4" /></Button><Button type="button" variant="ghost" size="icon-sm" onClick={() => navigate(1)} aria-label="Next date" className="size-7 text-muted-foreground"><ChevronRight className="size-4" /></Button></div><h3 className="ml-1 text-sm font-semibold text-foreground">{title}</h3></div><div className="flex items-center gap-2"><div className="flex rounded-lg border border-border bg-background/40 p-0.5">{(["month", "week", "day"] as const).map((option) => { const Icon = ViewIcon({ view: option }); return <button key={option} type="button" onClick={() => setView(option)} className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-medium capitalize", view === option ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground")}><Icon className="size-3" />{option}</button> })}</div><Button type="button" size="sm" onClick={() => setFeedback("New calendar event flow is ready for backend connection.")} className="h-7 gap-1.5 bg-gold text-[10px] text-background hover:bg-gold-hover"><CalendarPlus className="size-3.5" /> New event</Button></div></div>
          {feedback && <div className="flex shrink-0 items-center justify-between border-b border-gold/20 bg-gold/[0.04] px-4 py-2 text-[10px] text-gold"><span>{feedback}</span><button type="button" onClick={() => setFeedback(null)} aria-label="Dismiss message"><X className="size-3.5" /></button></div>}
          <div className="scrollbar-hidden min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-3.5 sm:p-4">{view === "month" ? <CalendarMonthView date={displayDate} events={visibleEvents} onEventClick={setSelectedEvent} /> : view === "week" ? <CalendarWeekView date={displayDate} events={visibleEvents} onEventClick={setSelectedEvent} /> : <CalendarDayView date={displayDate} events={displayedEvents} onEventClick={setSelectedEvent} />}</div>
        </section>
      </div>
    </div>
  )
}

export default CalendarOverview
