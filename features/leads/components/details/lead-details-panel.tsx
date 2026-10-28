"use client"

import { useState } from "react"

import {
  CalendarDays,
  MessageSquareText,
  Sparkles,
  UserRound,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

import { getLeadChannelConfig } from "../../config/lead-channels.config"

import { getLeadTemperatureConfig } from "../../config/lead-temperature.config"

import type { Lead, LeadId } from "../../types/lead.types"

export type LeadDetailsTab =
  "details" | "ai_insights" | "conversations" | "bookings"

export interface LeadDetailsPanelProps {
  lead: Lead | null
  selectedLeadId?: LeadId | null
  open: boolean
  onClose: () => void
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  detailsContent?: React.ReactNode
  aiInsightsContent?: React.ReactNode
  conversationsContent?: React.ReactNode
  bookingsContent?: React.ReactNode
  className?: string
}

const LEAD_DETAILS_TABS = [
  {
    id: "details",
    label: "Details",
    shortLabel: "Details",
    icon: UserRound,
  },
  {
    id: "ai_insights",
    label: "AI Insights",
    shortLabel: "AI Insights",
    icon: Sparkles,
  },
  {
    id: "conversations",
    label: "Conversations",
    shortLabel: "Chats",
    icon: MessageSquareText,
  },
  {
    id: "bookings",
    label: "Bookings",
    shortLabel: "Bookings",
    icon: CalendarDays,
  },
] as const satisfies readonly {
  id: LeadDetailsTab
  label: string
  shortLabel: string
  icon: typeof UserRound
}[]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return "?"
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

interface LeadPanelHeaderProps {
  lead: Lead | null
  isLoading: boolean
  onClose?: () => void
  showCloseButton?: boolean
}

function LeadPanelHeader({
  lead,
  isLoading,
  onClose,
  showCloseButton = false,
}: LeadPanelHeaderProps) {
  if (isLoading || !lead) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    )
  }

  const channel = getLeadChannelConfig(lead.channel)

  const temperature = getLeadTemperatureConfig(lead.temperature)

  const ChannelIcon = channel.icon
  const TemperatureIcon = temperature.icon

  return (
    <div className="flex min-w-0 items-start gap-3">
      <Avatar className="size-10 shrink-0">
        {lead.customer.avatarUrl && (
          <AvatarImage src={lead.customer.avatarUrl} alt={lead.customer.name} />
        )}

        <AvatarFallback className="bg-muted text-xs font-semibold">
          {getInitials(lead.customer.name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1.5">
        <h2 className="truncate text-sm font-semibold text-foreground">
          {lead.customer.name}
        </h2>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge
            variant="outline"
            className={cn(
              "h-5 gap-1 rounded-md px-1.5",
              "text-[10px] font-medium",
              channel.badgeClassName
            )}
          >
            <ChannelIcon aria-hidden="true" className="size-3" />
            {channel.shortLabel}
          </Badge>

          <Badge
            variant="outline"
            className={cn(
              "h-5 gap-1 rounded-md px-1.5",
              "text-[10px] font-medium",
              temperature.badgeClassName
            )}
          >
            <TemperatureIcon aria-hidden="true" className="size-3" />
            {temperature.label}
          </Badge>
        </div>
      </div>

      {showCloseButton && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close lead details"
          className="size-8 shrink-0 text-muted-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      )}
    </div>
  )
}

interface TabPlaceholderProps {
  title: string
  description: string
}

function TabPlaceholder({ title, description }: TabPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col",
        "items-center justify-center gap-2",
        "rounded-lg border border-dashed border-border",
        "px-4 py-8 text-center"
      )}
    >
      <p className="text-xs font-semibold text-foreground">{title}</p>

      <p className="max-w-56 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

interface LeadPanelBodyProps {
  lead: Lead | null
  isLoading: boolean
  error?: string | null
  onRetry?: () => void
  detailsContent?: React.ReactNode
  aiInsightsContent?: React.ReactNode
  conversationsContent?: React.ReactNode
  bookingsContent?: React.ReactNode
}

function LeadPanelBody({
  lead,
  isLoading,
  error,
  onRetry,
  detailsContent,
  aiInsightsContent,
  conversationsContent,
  bookingsContent,
}: LeadPanelBodyProps) {
  const [activeTab, setActiveTab] = useState<LeadDetailsTab>("details")

  if (error && !isLoading) {
    return (
      <div role="alert" className="space-y-3 p-4 text-center">
        <p className="text-sm font-medium text-destructive">
          Unable to load lead details
        </p>

        <p className="text-xs text-muted-foreground">{error}</p>

        {onRetry && (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-5 p-4">
        <Skeleton className="h-9 w-full" />

        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        ))}
      </div>
    )
  }

  if (!lead) {
    return null
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value as LeadDetailsTab)
      }}
      className="flex min-h-0 flex-1 flex-col gap-0"
    >
      <div className="shrink-0 border-b border-border px-3">
        <TabsList
          variant="line"
          className="flex! h-11! w-full! min-w-0 flex-nowrap justify-stretch gap-0 bg-transparent p-0"
        >
          {LEAD_DETAILS_TABS.map((tab) => {
            const Icon = tab.icon

            const count =
              tab.id === "conversations"
                ? lead.conversationCount
                : tab.id === "bookings"
                  ? lead.bookingCount
                  : null

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "h-11! min-w-0 flex-1 gap-1 rounded-none",
                  "px-1 text-[10px]",
                  "font-medium"
                )}
              >
                <Icon aria-hidden="true" className="size-3.5" />

                <span className="hidden truncate min-[560px]:inline">
                  {tab.label}
                </span>
                <span className="truncate min-[560px]:hidden">
                  {tab.shortLabel}
                </span>

                {count !== null && (
                  <span className="shrink-0 tabular-nums">({count})</span>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <TabsContent value="details" className="m-0 p-4">
          {detailsContent ?? (
            <TabPlaceholder
              title="Lead Details"
              description="Customer information, qualification, booking interest, and follow-up will appear here."
            />
          )}
        </TabsContent>

        <TabsContent value="ai_insights" className="m-0 p-4">
          {aiInsightsContent ?? (
            <TabPlaceholder
              title="AI Insights"
              description="AI-generated lead analysis and recommendations will appear here."
            />
          )}
        </TabsContent>

        <TabsContent value="conversations" className="m-0 p-4">
          {conversationsContent ?? (
            <TabPlaceholder
              title="Conversations"
              description="Linked customer conversations will appear here."
            />
          )}
        </TabsContent>

        <TabsContent value="bookings" className="m-0 p-4">
          {bookingsContent ?? (
            <TabPlaceholder
              title="Bookings"
              description="Associated trial and training bookings will appear here."
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  )
}

export function LeadDetailsPanel({
  lead,
  open,
  onClose,
  isLoading = false,
  error = null,
  onRetry,
  detailsContent,
  aiInsightsContent,
  conversationsContent,
  bookingsContent,
  className,
}: LeadDetailsPanelProps) {
  if (!open) {
    return null
  }

  const sharedBody = {
    lead,
    isLoading,
    error,
    onRetry,
    detailsContent,
    aiInsightsContent,
    conversationsContent,
    bookingsContent,
  }

  return (
    <>
      {/* ======================================================
          DESKTOP INLINE PANEL
      ====================================================== */}

      <aside
        aria-label="Selected lead details"
        className={cn(
          "hidden min-h-0 w-[390px] shrink-0",
          "lg:w-[min(390px,34vw)]! xl:w-[420px]! 2xl:w-[440px]!",
          "flex-col overflow-hidden",
          "border-l border-border bg-card",
          "lg:flex",
          className
        )}
      >
        <div className="shrink-0 border-b border-border p-4">
          <LeadPanelHeader
            lead={lead}
            isLoading={isLoading}
            onClose={onClose}
            showCloseButton
          />
        </div>

        <LeadPanelBody key={lead?.id ?? "loading"} {...sharedBody} />
      </aside>

      {/* ======================================================
          MOBILE / TABLET SHEET
      ====================================================== */}

      <div className="lg:hidden">
        <Sheet
          open={open}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              onClose()
            }
          }}
        >
          <SheetContent
            side="right"
            className="flex w-full! max-w-full! flex-col gap-0 p-0 sm:max-w-[min(440px,calc(100vw-1rem))]!"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Lead Details</SheetTitle>

              <SheetDescription>
                View customer qualification, AI insights, conversations, and
                bookings.
              </SheetDescription>
            </SheetHeader>

            <div className="shrink-0 border-b border-border p-4 pr-12">
              <LeadPanelHeader lead={lead} isLoading={isLoading} />
            </div>

            <LeadPanelBody key={lead?.id ?? "loading"} {...sharedBody} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
