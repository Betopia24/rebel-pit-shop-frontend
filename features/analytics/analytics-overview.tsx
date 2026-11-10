"use client"

import { useState } from "react"
import Link from "next/link"

import type { LucideIcon } from "lucide-react"
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarCheck2,
  CalendarDays,
  ChevronRight,
  Download,
  Dumbbell,
  Globe2,
  MessageCircle,
  Star,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { siteConfig } from "@/config/site"
import successStories from "@/data/success-stories.json"
import scheduleData from "@/data/schedule-events.json"
import {
  BOOKING_SESSION_AVAILABILITY_MOCK,
  BOOKINGS_MOCK,
} from "@/features/bookings/data/bookings.mock"
import type { BookingSource } from "@/features/bookings/types/booking.types"
import {
  DASHBOARD_PIPELINE_MOCK_BY_PERIOD,
} from "@/features/dashboard/data/dashboard-pipeline.mock"
import { DASHBOARD_PIPELINE_STAGES } from "@/features/dashboard/config/dashboard-pipeline.config"
import { DASHBOARD_INBOX_MOCK } from "@/features/dashboard/data/dashboard-inbox.mock"
import { DASHBOARD_STATS_MOCK } from "@/features/dashboard/data/dashboard-stats.mock"
import type { DashboardPipelineDatePreset } from "@/features/dashboard/types/dashboard-pipeline.types"
import { coaches } from "@/features/about/data/coaches"

import { cn } from "@/lib/utils"

type AnalyticsPeriod = Exclude<DashboardPipelineDatePreset, "custom">
type AnalyticsSelection = DashboardPipelineDatePreset

const PERIOD_OPTIONS: readonly { value: AnalyticsSelection; label: string }[] = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "last_90_days", label: "Last 90 days" },
  { value: "custom", label: "Custom range" },
]

const BOOKING_PERIOD_SUMMARY: Record<
  AnalyticsPeriod,
  { totalBookings: number; confirmationRate: number; noShowRate: number }
> = {
  last_7_days: { totalBookings: 42, confirmationRate: 76, noShowRate: 3 },
  last_30_days: { totalBookings: 186, confirmationRate: 73, noShowRate: 4 },
  last_90_days: { totalBookings: 516, confirmationRate: 75, noShowRate: 4 },
}

const MOMENTUM_DATA: Record<
  AnalyticsPeriod,
  { labels: readonly string[]; inquiries: readonly number[]; bookings: readonly number[] }
> = {
  last_7_days: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    inquiries: [8, 11, 9, 14, 12, 16, 15],
    bookings: [4, 5, 4, 7, 6, 8, 7],
  },
  last_30_days: {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    inquiries: [42, 51, 48, 57, 50],
    bookings: [21, 25, 22, 29, 26],
  },
  last_90_days: {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    inquiries: [152, 168, 181, 191],
    bookings: [74, 82, 91, 96],
  },
}

const BOOKING_SOURCE_META: readonly {
  id: BookingSource
  label: string
  color: string
}[] = [
  { id: "website", label: "Website", color: "bg-gold" },
  { id: "instagram", label: "Instagram", color: "bg-pink-400" },
  { id: "facebook", label: "Facebook", color: "bg-blue-400" },
  { id: "sms", label: "SMS", color: "bg-emerald-400" },
  { id: "manual", label: "Manual", color: "bg-muted-foreground" },
]

const SCHEDULE_CLASSES = scheduleData.schedule.days.flatMap((day) => day.classes)

const CLASS_DEMAND = Array.from(
  SCHEDULE_CLASSES.reduce(
    (map, item) => {
      const current = map.get(item.title)

      map.set(item.title, {
        title: item.title,
        joined: (current?.joined ?? 0) + item.joined,
        sessions: (current?.sessions ?? 0) + 1,
        coach: item.coach.name,
      })

      return map
    },
    new Map<string, { title: string; joined: number; sessions: number; coach: string }>()
  ).values()
).sort((a, b) => b.joined - a.joined)

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  trend,
  tone = "gold",
}: {
  icon: LucideIcon
  label: string
  value: string
  helper: string
  trend?: string
  tone?: "gold" | "success" | "muted"
}) {
  const toneClasses = {
    gold: "bg-gold/10 text-gold",
    success: "bg-emerald-500/10 text-emerald-400",
    muted: "bg-muted text-muted-foreground",
  }

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card py-0 shadow-none transition-colors hover:border-gold/30">
      <CardContent className="flex min-h-30 flex-col p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 text-[11px] font-medium text-muted-foreground">
            {label}
          </p>
          <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
            <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </span>
        </div>
        <div className="mt-2 flex items-end gap-2">
          <p className="text-[27px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {trend && (
            <span className="mb-0.5 inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400">
              <ArrowUpRight aria-hidden="true" className="size-3" />
              {trend}
            </span>
          )}
        </div>
        <p className="mt-auto pt-3 text-[10px] leading-4 text-muted-foreground">
          {helper}
        </p>
      </CardContent>
    </Card>
  )
}

function FunnelCard({
  period,
  dateRangeLabel,
}: {
  period: AnalyticsPeriod
  dateRangeLabel?: string
}) {
  const data = DASHBOARD_PIPELINE_MOCK_BY_PERIOD[period]
  const baseline = data.stages[0]?.count ?? 1

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="border-b border-border px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm">Lead conversion funnel</CardTitle>
            <CardDescription className="mt-1 text-[11px]">
              Track the path from first inquiry to a new member.
            </CardDescription>
          </div>
          <span className="rounded-full border border-gold/20 bg-gold/5 px-2 py-1 text-[10px] font-medium text-gold">
            {dateRangeLabel ?? `${data.dateRange.startDate} – ${data.dateRange.endDate}`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 sm:p-5">
        {DASHBOARD_PIPELINE_STAGES.map((config, index) => {
          const stage = data.stages.find((item) => item.id === config.id)
          const count = stage?.count ?? 0
          const width = baseline > 0 ? Math.max((count / baseline) * 100, 4) : 4

          return (
            <div key={config.id} className="grid grid-cols-[7.5rem_minmax(0,1fr)_3.5rem] items-center gap-2 sm:grid-cols-[9rem_minmax(0,1fr)_4rem] sm:gap-3">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-foreground">{config.label}</p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  {index === 0 ? "Starting point" : `${stage?.conversionRate ?? 0}% of inquiries`}
                </p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft transition-[width] duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
              <p className="text-right text-xs font-semibold text-foreground tabular-nums">{count}</p>
            </div>
          )
        })}
        <div className="flex items-center justify-between border-t border-border pt-3 text-[10px]">
          <span className="text-muted-foreground">Inquiry → member conversion</span>
          <span className="font-semibold text-gold">
            {baseline > 0 ? Math.round(((data.stages.at(-1)?.count ?? 0) / baseline) * 1000) / 10 : 0}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function getChartPoints(values: readonly number[], width: number, height: number) {
  const paddingX = 22
  const paddingY = 18
  const max = Math.max(...values, 1)

  return values.map((value, index) => ({
    x: paddingX + (index / Math.max(values.length - 1, 1)) * (width - paddingX * 2),
    y: height - paddingY - (value / max) * (height - paddingY * 2),
  }))
}

function pointsToPath(points: readonly { x: number; y: number }[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ")
}

function MomentumCard({ period }: { period: AnalyticsPeriod }) {
  const trend = MOMENTUM_DATA[period]
  const width = 640
  const height = 220
  const inquiryPoints = getChartPoints(trend.inquiries, width, height)
  const bookingPoints = getChartPoints(trend.bookings, width, height)

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="border-b border-border px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm">Acquisition momentum</CardTitle>
            <CardDescription className="mt-1 text-[11px]">
              Inquiry volume compared with confirmed trial bookings.
            </CardDescription>
          </div>
          <TrendingUp aria-hidden="true" className="size-4 text-gold" />
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-gold" />New inquiries</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-slate-400" />Confirmed bookings</span>
        </div>
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[480px] w-full" role="img" aria-label="Inquiry and confirmed booking trend chart">
            <defs>
              <linearGradient id="analytics-inquiry-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((line) => {
              const y = 18 + (line / 3) * (height - 36)

              return <line key={line} x1="22" x2={width - 22} y1={y} y2={y} stroke="var(--border)" strokeOpacity="0.55" strokeDasharray="3 5" />
            })}
            <path d={`${pointsToPath(inquiryPoints)} L ${width - 22} ${height - 18} L 22 ${height - 18} Z`} fill="url(#analytics-inquiry-fill)" />
            <path d={pointsToPath(inquiryPoints)} fill="none" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <path d={pointsToPath(bookingPoints)} fill="none" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
            {inquiryPoints.map((point, index) => <circle key={`inquiry-${index}`} cx={point.x} cy={point.y} r="3.5" fill="var(--gold)" stroke="var(--surface-card)" strokeWidth="2" />)}
            {bookingPoints.map((point, index) => <circle key={`booking-${index}`} cx={point.x} cy={point.y} r="3" fill="var(--text-secondary)" stroke="var(--surface-card)" strokeWidth="2" />)}
            {trend.labels.map((label, index) => <text key={label} x={inquiryPoints[index]?.x ?? 0} y={height - 2} fill="var(--text-muted)" fontSize="10" textAnchor="middle">{label}</text>)}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingSourceCard() {
  const rows = BOOKING_SOURCE_META.map((source) => ({
    ...source,
    count: BOOKINGS_MOCK.filter((booking) => booking.source.channel === source.id).length,
  }))
  const total = rows.reduce((sum, row) => sum + row.count, 0)

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="px-4 py-4 sm:px-5">
        <CardTitle className="text-sm">Booking source mix</CardTitle>
        <CardDescription className="mt-1 text-[11px]">Where the current preview booking records started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-5 sm:px-5">
        <div className="flex h-3 overflow-hidden rounded-full bg-muted">
          {rows.map((row) => <div key={row.id} className={cn("h-full", row.color)} style={{ width: `${total > 0 ? (row.count / total) * 100 : 0}%` }} />)}
        </div>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", row.color)} />
              <span className="min-w-0 flex-1 text-[11px] text-muted-foreground">{row.label}</span>
              <span className="text-[11px] font-medium text-foreground tabular-nums">{row.count}</span>
              <span className="w-10 text-right text-[10px] text-muted-foreground tabular-nums">{total > 0 ? Math.round((row.count / total) * 100) : 0}%</span>
            </div>
          ))}
        </div>
        <Link href="/bookings" className="inline-flex items-center gap-1 text-[10px] font-medium text-gold transition-colors hover:text-gold-hover">
          Review bookings <ChevronRight aria-hidden="true" className="size-3" />
        </Link>
        <p className="text-[9px] leading-4 text-muted-foreground">Based on {total} local preview records; production source attribution should come from the booking API.</p>
      </CardContent>
    </Card>
  )
}

function ClassDemandCard() {
  const rows = CLASS_DEMAND.slice(0, 5)
  const maxJoined = Math.max(...rows.map((row) => row.joined), 1)

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="px-4 py-4 sm:px-5">
        <CardTitle className="text-sm">Public schedule demand</CardTitle>
        <CardDescription className="mt-1 text-[11px]">Most joined class formats from the landing page schedule.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-5 sm:px-5">
        {rows.map((row, index) => (
          <div key={row.title} className="grid grid-cols-[1.1rem_minmax(0,1fr)_2.5rem] items-center gap-2">
            <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[11px] font-medium text-foreground">{row.title}</p>
                <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">{row.joined} joined</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gold/80" style={{ width: `${(row.joined / maxJoined) * 100}%` }} />
              </div>
            </div>
            <span className="text-right text-[9px] text-muted-foreground">{row.sessions}x</span>
          </div>
        ))}
        <Link href="/schedule" className="inline-flex items-center gap-1 pt-1 text-[10px] font-medium text-gold transition-colors hover:text-gold-hover">
          Open weekly schedule <ChevronRight aria-hidden="true" className="size-3" />
        </Link>
      </CardContent>
    </Card>
  )
}

function LandingSnapshotCard() {
  const snapshot = [
    { icon: Dumbbell, label: "Training options", value: String(siteConfig.trainingOptions.cards.length), href: "/classes" },
    { icon: UsersRound, label: "Coaches featured", value: String(coaches.length), href: "/about" },
    { icon: CalendarDays, label: "Class days", value: String(scheduleData.schedule.days.length), href: "/schedule" },
    { icon: Globe2, label: "Upcoming events", value: String(scheduleData.events.length), href: "/message" },
  ]

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="px-4 py-4 sm:px-5">
        <CardTitle className="text-sm">Landing page snapshot</CardTitle>
        <CardDescription className="mt-1 text-[11px]">Public content currently available to prospects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-5 sm:px-5">
        {snapshot.map(({ icon: Icon, label, value, href }) => (
          <Link key={label} href={href} className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/25 px-3 py-2.5 transition-colors hover:border-gold/30 hover:bg-gold/5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold"><Icon aria-hidden="true" className="size-3.5" /></span>
            <span className="min-w-0 flex-1 text-[11px] text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">{value}</span>
            <ChevronRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
          </Link>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Star aria-hidden="true" className="size-3.5 fill-gold text-gold" />
            <span className="font-semibold text-foreground">{successStories.summary.rating}</span>
            <span>{successStories.summary.reviewCountLabel}</span>
          </div>
          <Link href="/" className="text-[10px] font-medium text-gold hover:text-gold-hover">View site</Link>
        </div>
      </CardContent>
    </Card>
  )
}

function OperationsCard({ period }: { period: AnalyticsPeriod }) {
  const pipeline = DASHBOARD_PIPELINE_MOCK_BY_PERIOD[period]
  const confirmed = pipeline.stages.find((stage) => stage.id === "booking_confirmed")?.count ?? 0
  const attended = pipeline.stages.find((stage) => stage.id === "trial_attended")?.count ?? 0
  const attendanceRate = confirmed > 0 ? Math.round((attended / confirmed) * 100) : 0
  const availability = Object.values(BOOKING_SESSION_AVAILABILITY_MOCK)
  const totalCapacity = availability.reduce((sum, session) => sum + session.capacity, 0)
  const totalBooked = availability.reduce((sum, session) => sum + session.booked, 0)
  const occupancyRate = totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0
  const waitlisted = availability.reduce((sum, session) => sum + session.waitlisted, 0)
  const bookingSummary = BOOKING_PERIOD_SUMMARY[period]

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="px-4 py-4 sm:px-5">
        <CardTitle className="text-sm">Attendance & operations</CardTitle>
        <CardDescription className="mt-1 text-[11px]">The numbers that help the team fill classes and protect capacity.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 px-4 pb-5 sm:grid-cols-2 sm:px-5">
        <OperationsMetric label="Trial attendance" value={`${attendanceRate}%`} helper={`${attended} attended of ${confirmed} confirmed`} tone="gold" />
        <OperationsMetric label="Class occupancy" value={`${occupancyRate}%`} helper="Across scheduled session capacity" tone="success" />
        <OperationsMetric label="No-show rate" value={`${bookingSummary.noShowRate}%`} helper="Keep reminders active for upcoming sessions" tone="muted" />
        <OperationsMetric label="Waitlisted spots" value={String(waitlisted)} helper="Customers waiting across preview sessions" tone="gold" />
      </CardContent>
    </Card>
  )
}

function OperationsMetric({
  label,
  value,
  helper,
  tone,
}: {
  label: string
  value: string
  helper: string
  tone: "gold" | "success" | "muted"
}) {
  const toneClasses = {
    gold: "border-gold/20 bg-gold/5 text-gold",
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    muted: "border-border/70 bg-background/25 text-foreground",
  }

  return (
    <div className={cn("rounded-lg border px-3 py-3", toneClasses[tone])}>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold leading-none tabular-nums">{value}</p>
      <p className="mt-2 text-[10px] leading-4 text-muted-foreground">{helper}</p>
    </div>
  )
}

function CoachPerformanceCard() {
  const rows = Array.from(
    SCHEDULE_CLASSES.reduce(
      (map, item) => {
        const current = map.get(item.coach.name)

        map.set(item.coach.name, {
          name: item.coach.name,
          joined: (current?.joined ?? 0) + item.joined,
          sessions: (current?.sessions ?? 0) + 1,
        })

        return map
      },
      new Map<string, { name: string; joined: number; sessions: number }>()
    ).values()
  ).sort((a, b) => b.joined - a.joined).slice(0, 5)
  const maxJoined = Math.max(...rows.map((row) => row.joined), 1)

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="px-4 py-4 sm:px-5">
        <CardTitle className="text-sm">Coach performance</CardTitle>
        <CardDescription className="mt-1 text-[11px]">Public schedule demand grouped by the coach leading each class.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-5 sm:px-5">
        {rows.map((row, index) => (
          <div key={row.name} className="grid grid-cols-[1rem_minmax(0,1fr)_3rem] items-center gap-2">
            <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">{index + 1}</span>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[11px] font-medium text-foreground">{row.name}</p>
                <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">{row.joined} joined</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gold/80" style={{ width: `${(row.joined / maxJoined) * 100}%` }} />
              </div>
            </div>
            <span className="text-right text-[9px] text-muted-foreground">{row.sessions} sessions</span>
          </div>
        ))}
        <Link href="/team" className="inline-flex items-center gap-1 pt-1 text-[10px] font-medium text-gold transition-colors hover:text-gold-hover">
          View team <ChevronRight aria-hidden="true" className="size-3" />
        </Link>
      </CardContent>
    </Card>
  )
}

function ConversationHealthCard() {
  const totalConversations = DASHBOARD_STATS_MOCK.find((stat) => stat.id === "total_conversations")?.value ?? 0
  const humanHandoffs = DASHBOARD_STATS_MOCK.find((stat) => stat.id === "human_handoffs")?.value ?? 0
  const needsAttention = DASHBOARD_INBOX_MOCK.conversations.filter((conversation) => conversation.requiresHumanAttention).length
  const openConversations = DASHBOARD_INBOX_MOCK.conversations.filter((conversation) => conversation.status === "open" || conversation.status === "waiting").length

  return (
    <Card className="min-w-0 rounded-xl border-border bg-card shadow-none">
      <CardHeader className="px-4 py-4 sm:px-5">
        <CardTitle className="text-sm">Conversation health</CardTitle>
        <CardDescription className="mt-1 text-[11px]">A quick view of inbox demand and human attention.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-5 sm:px-5">
        <ConversationMetric label="Total conversations" value={String(totalConversations)} helper="Across connected channels" />
        <ConversationMetric label="Open or waiting" value={String(openConversations)} helper="Current inbox preview" />
        <ConversationMetric label="Human handoffs" value={String(humanHandoffs)} helper={`${needsAttention} currently needs attention`} tone="success" />
        <Link href="/inbox" className="inline-flex items-center gap-1 pt-1 text-[10px] font-medium text-gold transition-colors hover:text-gold-hover">
          Open inbox <ChevronRight aria-hidden="true" className="size-3" />
        </Link>
      </CardContent>
    </Card>
  )
}

function ConversationMetric({
  label,
  value,
  helper,
  tone = "default",
}: {
  label: string
  value: string
  helper: string
  tone?: "default" | "success"
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/25 px-3 py-2.5">
      <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", tone === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-gold/10 text-gold")}>
        <MessageCircle aria-hidden="true" className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-semibold leading-none text-foreground tabular-nums">{value}</p>
      </div>
      <p className="max-w-28 text-right text-[9px] leading-3.5 text-muted-foreground">{helper}</p>
    </div>
  )
}

export function AnalyticsOverview() {
  const [selection, setSelection] = useState<AnalyticsSelection>("last_30_days")
  const [customRange, setCustomRange] = useState({
    from: DASHBOARD_PIPELINE_MOCK_BY_PERIOD.last_30_days.dateRange.startDate,
    to: DASHBOARD_PIPELINE_MOCK_BY_PERIOD.last_30_days.dateRange.endDate,
  })
  const [feedback, setFeedback] = useState<string | null>(null)
  const period: AnalyticsPeriod = selection === "custom" ? "last_30_days" : selection
  const pipeline = DASHBOARD_PIPELINE_MOCK_BY_PERIOD[period]
  const bookingSummary = BOOKING_PERIOD_SUMMARY[period]
  const dateRangeLabel = selection === "custom" ? `${customRange.from} – ${customRange.to}` : undefined
  const newInquiries = pipeline.stages[0]?.count ?? 0
  const trialRequests = pipeline.stages.find((stage) => stage.id === "trial_requested")?.count ?? 0
  const confirmedBookings = pipeline.stages.find((stage) => stage.id === "booking_confirmed")?.count ?? 0
  const convertedMembers = pipeline.stages.at(-1)?.count ?? 0
  const attendanceRate = confirmedBookings > 0 ? Math.round((((pipeline.stages.find((stage) => stage.id === "trial_attended")?.count ?? 0) / confirmedBookings) * 100)) : 0

  return (
    <div className="space-y-5">
      {feedback && (
        <div role="status" className="flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-xs text-foreground">
          <Activity aria-hidden="true" className="size-3.5 text-gold" />
          {feedback}
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold"><BarChart3 aria-hidden="true" className="size-4.5" /></span>
          <div>
            <p className="text-sm font-semibold text-foreground">Performance overview</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">A joined view of acquisition, bookings, and public demand.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selection} onValueChange={(value) => value && setSelection(value as AnalyticsSelection)}>
            <SelectTrigger className="h-8 w-35 text-[11px]">
              <SelectValue>
                {PERIOD_OPTIONS.find((option) => option.value === selection)?.label ?? "Select range"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>{PERIOD_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
          </Select>
          <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5 text-[11px]" onClick={() => setFeedback("Report export is ready for backend integration.")}>
            <Download aria-hidden="true" className="size-3.5" />
            Export report
          </Button>
        </div>
      </div>

      {selection === "custom" && (
        <div className="flex flex-col gap-3 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-xs font-medium text-foreground">Custom reporting range</p>
            <p className="mt-1 text-[10px] text-muted-foreground">The current demo dataset uses the 30-day sample while a live reporting API is connected.</p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[9px] uppercase tracking-wide text-muted-foreground">From</span>
              <Input type="date" value={customRange.from} onChange={(event) => setCustomRange((current) => ({ ...current, from: event.target.value }))} className="h-8 text-[11px]" />
            </label>
            <label className="space-y-1">
              <span className="block text-[9px] uppercase tracking-wide text-muted-foreground">To</span>
              <Input type="date" value={customRange.to} onChange={(event) => setCustomRange((current) => ({ ...current, to: event.target.value }))} className="h-8 text-[11px]" />
            </label>
          </div>
        </div>
      )}

      <section aria-label="Analytics key metrics" className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={MessageCircle} label="New inquiries" value={String(newInquiries)} helper="Top of the lead funnel" trend="26%" />
        <MetricCard icon={CalendarCheck2} label="Trial requests" value={String(trialRequests)} helper="Prospects asking to train" trend="23%" />
        <MetricCard icon={CalendarDays} label="Total bookings" value={String(bookingSummary.totalBookings)} helper={`${bookingSummary.confirmationRate}% confirmation rate`} tone="success" />
        <MetricCard icon={UserRoundCheck} label="Members converted" value={String(convertedMembers)} helper={`${attendanceRate}% of confirmed trials attended`} tone="muted" />
      </section>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <FunnelCard period={period} dateRangeLabel={dateRangeLabel} />
        <MomentumCard period={period} />
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <BookingSourceCard />
        <ClassDemandCard />
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <OperationsCard period={period} />
        <ConversationHealthCard />
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <CoachPerformanceCard />
        <LandingSnapshotCard />
      </div>
    </div>
  )
}

export default AnalyticsOverview
