"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

import {
  ArrowLeft,
  CalendarDays,
  MessageSquareText,
  Sparkles,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

import { getLeadChannelConfig } from "../../config/lead-channels.config"
import { getLeadStageLabel } from "../../config/lead-stages.config"
import { getLeadTemperatureConfig } from "../../config/lead-temperature.config"
import { getLeadMockById, LEADS_MOCK } from "../../data/leads.mock"
import { getLeadDetailsMockById } from "../../data/lead-details.mock"

import { LeadDetailsTab } from "./tabs/details-tab"
import { LeadAIInsightsTab } from "./tabs/ai-insights-tab"
import { LeadConversationsTab } from "./tabs/conversations-tab"
import { LeadBookingsTab } from "./tabs/bookings-tab"

const BUSINESS_TIMEZONE = "America/Chicago"

const LEAD_PAGE_TABS = [
  { value: "details", label: "Details", icon: UserRound },
  { value: "ai_insights", label: "AI Insights", icon: Sparkles },
  { value: "conversations", label: "Conversations", icon: MessageSquareText },
  { value: "bookings", label: "Bookings", icon: CalendarDays },
] as const

type LeadPageTab = (typeof LEAD_PAGE_TABS)[number]["value"]

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
}

function formatDate(value: string | null): string {
  if (!value) return "Not available"

  const date = new Date(value)

  if (!Number.isFinite(date.getTime())) return "Not available"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: BUSINESS_TIMEZONE,
  }).format(date)
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-[10px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="truncate text-xs font-semibold text-foreground">{value}</p>
    </div>
  )
}

function LeadSnapshot({
  lead,
  details,
}: {
  lead: NonNullable<ReturnType<typeof getLeadMockById>>
  details: NonNullable<ReturnType<typeof getLeadDetailsMockById>>
}) {
  const nextAction =
    details.details.aiSummary?.recommendedNextAction ??
    "Review the lead and follow up with the next best action."

  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-border bg-muted/10 p-4">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles aria-hidden="true" className="size-4 text-gold" />
          <h2 className="text-sm font-semibold text-foreground">
            Lead snapshot
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
            <span className="text-xs text-muted-foreground">Stage</span>
            <span className="text-right text-xs font-semibold text-foreground">
              {getLeadStageLabel(lead.stage)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
            <span className="text-xs text-muted-foreground">Temperature</span>
            <span className="text-xs font-semibold text-foreground">
              {getLeadTemperatureConfig(lead.temperature).label}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
            <span className="text-xs text-muted-foreground">
              Assigned coach
            </span>
            <span className="text-xs font-semibold text-foreground">
              {lead.assignedCoach?.name ?? "Unassigned"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">Created</span>
            <span className="text-xs font-semibold text-foreground">
              {formatDate(lead.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gold-10/40 rounded-xl border border-gold/20 p-4">
        <p className="text-[10px] font-semibold tracking-[0.08em] text-gold uppercase">
          Recommended next action
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {nextAction}
        </p>
      </div>
    </aside>
  )
}

export function LeadDetailsPage() {
  const params = useParams<{ leadSlug?: string }>()
  const [activeTab, setActiveTab] = useState<LeadPageTab>("details")

  const lead = useMemo(() => {
    const rawSlug = params?.leadSlug
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug

    if (!slug) return null

    return (
      getLeadMockById(slug) ??
      LEADS_MOCK.find((item) => slugify(item.customer.name) === slug) ??
      null
    )
  }, [params])

  const details = useMemo(
    () => (lead ? getLeadDetailsMockById(lead.id) : null),
    [lead]
  )

  if (!lead || !details) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Lead not found
          </p>
          <p className="text-xs text-muted-foreground">
            This lead is not available in the current demo dataset.
          </p>
          <Link
            href="/leads-prospect"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Back to leads
          </Link>
        </div>
      </div>
    )
  }

  const channel = getLeadChannelConfig(lead.channel)
  const temperature = getLeadTemperatureConfig(lead.temperature)
  const ChannelIcon = channel.icon
  const TemperatureIcon = temperature.icon

  return (
    <div className="min-w-0 space-y-5">
      <Link
        href="/leads-prospect"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2 h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Back to Leads & Prospects
      </Link>

      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Avatar size="lg" className="size-12 shrink-0">
              {lead.customer.avatarUrl && (
                <AvatarImage
                  src={lead.customer.avatarUrl}
                  alt={lead.customer.name}
                />
              )}
              <AvatarFallback className="bg-gold-10 text-sm font-semibold text-gold">
                {getInitials(lead.customer.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Lead profile</p>
                <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {lead.customer.name}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="outline"
                  className={cn(
                    "h-6 gap-1.5 rounded-md px-2 text-[10px]",
                    channel.badgeClassName
                  )}
                >
                  <ChannelIcon aria-hidden="true" className="size-3" />
                  {channel.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "h-6 gap-1.5 rounded-md px-2 text-[10px]",
                    temperature.badgeClassName
                  )}
                >
                  <TemperatureIcon aria-hidden="true" className="size-3" />
                  {temperature.label}
                </Badge>
                <Badge
                  variant="outline"
                  className="h-6 rounded-md border-border px-2 text-[10px] text-muted-foreground"
                >
                  {getLeadStageLabel(lead.stage)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href="/inbox"
              className={buttonVariants({
                size: "sm",
                className: "bg-gold text-black hover:bg-gold/90",
              })}
            >
              <MessageSquareText aria-hidden="true" className="size-3.5" />
              Message
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
          <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
            <SummaryItem label="Stage" value={getLeadStageLabel(lead.stage)} />
          </div>
          <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
            <SummaryItem label="Temperature" value={temperature.label} />
          </div>
          <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
            <SummaryItem
              label="Conversations"
              value={String(lead.conversationCount)}
            />
          </div>
          <div className="border-b border-border p-4 sm:border-b-0">
            <SummaryItem label="Bookings" value={String(lead.bookingCount)} />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Tabs
          value={activeTab}
          onValueChange={(nextValue) => setActiveTab(nextValue as LeadPageTab)}
          className="flex min-w-0 flex-col gap-0"
        >
          <div className="scrollbar-hidden overflow-x-auto overflow-y-hidden border-b border-border px-3">
            <TabsList className="flex h-12 w-max min-w-full items-stretch justify-start gap-1 rounded-none bg-card p-0">
              {LEAD_PAGE_TABS.map((tab) => {
                const Icon = tab.icon

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "relative flex h-12 min-w-fit flex-none shrink-0 items-center justify-center gap-1.5 rounded-none px-3 text-[11px] font-medium whitespace-nowrap text-muted-foreground",
                      "border-b-2 border-transparent bg-transparent shadow-none transition-colors hover:text-foreground",
                      "data-[active]:border-transparent data-[active]:border-b-gold data-[active]:bg-transparent data-[active]:text-gold",
                      "data-[state=active]:border-transparent data-[state=active]:border-b-gold data-[state=active]:bg-transparent data-[state=active]:text-gold",
                      "after:bottom-0"
                    )}
                  >
                    <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                    {tab.label}
                    {tab.value === "conversations" && (
                      <span className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground tabular-nums">
                        {lead.conversationCount}
                      </span>
                    )}
                    {tab.value === "bookings" && (
                      <span className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground tabular-nums">
                        {lead.bookingCount}
                      </span>
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          <div className="p-4 sm:p-6">
            <TabsContent value="details" className="m-0 outline-none">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
                <div className="min-w-0">
                  <LeadDetailsTab
                    lead={details.lead}
                    details={details.details}
                    timezone={details.timezone || BUSINESS_TIMEZONE}
                  />
                </div>
                <LeadSnapshot lead={lead} details={details} />
              </div>
            </TabsContent>

            <TabsContent value="ai_insights" className="m-0 outline-none">
              <LeadAIInsightsTab data={details.aiInsights} />
            </TabsContent>

            <TabsContent value="conversations" className="m-0 outline-none">
              <LeadConversationsTab
                data={details.conversations}
                timezone={details.timezone || BUSINESS_TIMEZONE}
              />
            </TabsContent>

            <TabsContent value="bookings" className="m-0 outline-none">
              <LeadBookingsTab
                data={details.bookings}
                timezone={details.timezone || BUSINESS_TIMEZONE}
              />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  )
}

export default LeadDetailsPage
