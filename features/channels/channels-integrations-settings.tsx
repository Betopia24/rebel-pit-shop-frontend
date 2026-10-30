"use client"

import { useMemo, useState } from "react"

import type { LucideIcon } from "lucide-react"
import {
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Globe2,
  MessageCircle,
  Phone,
  RefreshCw,
  Save,
  Settings2,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { cn } from "@/lib/utils"

type ChannelId = "facebook" | "instagram" | "whatsapp" | "website"

interface ChannelDefinition {
  id: ChannelId
  name: string
  description: string
  account: string
  accountMeta: string
  icon: LucideIcon
  iconClassName: string
  iconBackgroundClassName: string
  defaultConnected: boolean
}

const CHANNELS: readonly ChannelDefinition[] = [
  {
    id: "facebook",
    name: "Facebook Messenger",
    description:
      "Connect your Facebook Page to chat with customers, answer questions and handle bookings.",
    account: "Rebel Boxing Club",
    accountMeta: "Page ID: 123456789012345",
    icon: MessageCircle,
    iconClassName: "text-white",
    iconBackgroundClassName: "bg-[#1877f2]",
    defaultConnected: true,
  },
  {
    id: "instagram",
    name: "Instagram DM",
    description:
      "Connect your Instagram Business account to chat with customers and handle bookings.",
    account: "@rebelboxingclub",
    accountMeta: "Business account",
    icon: Camera,
    iconClassName: "text-white",
    iconBackgroundClassName:
      "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    defaultConnected: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description:
      "Connect your WhatsApp Business API to chat with customers and handle bookings.",
    account: "WhatsApp Business",
    accountMeta: "Business phone number",
    icon: Phone,
    iconClassName: "text-white",
    iconBackgroundClassName: "bg-[#25d366]",
    defaultConnected: false,
  },
  {
    id: "website",
    name: "Website Chat",
    description:
      "Enable the chat widget on your website to chat with visitors and capture leads.",
    account: "rebelboxing.com",
    accountMeta: "Website chat widget",
    icon: Globe2,
    iconClassName: "text-white",
    iconBackgroundClassName: "bg-[#1677ff]",
    defaultConnected: true,
  },
] as const

const DEFAULT_WELCOME_MESSAGE =
  "Hi! 👋 Welcome to Rebel Boxing Club!\nI’m here to help you with class information, membership options, and bookings. How can I help you today?"

function getInitialConnectionState(): Record<ChannelId, boolean> {
  return CHANNELS.reduce(
    (state, channel) => {
      state[channel.id] = channel.defaultConnected
      return state
    },
    {} as Record<ChannelId, boolean>
  )
}

function getInitialToggleState(): Record<ChannelId, boolean> {
  return CHANNELS.reduce(
    (state, channel) => {
      state[channel.id] = channel.defaultConnected
      return state
    },
    {} as Record<ChannelId, boolean>
  )
}

function ChannelIcon({ channel }: { channel: ChannelDefinition }) {
  const Icon = channel.icon

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl",
        channel.iconBackgroundClassName,
        channel.iconClassName
      )}
    >
      <Icon className="size-5" strokeWidth={2} />
    </span>
  )
}

function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-medium",
        connected ? "text-emerald-400" : "text-muted-foreground"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          connected ? "bg-emerald-400" : "bg-muted-foreground/60"
        )}
      />
      {connected ? "Connected" : "Not Connected"}
    </span>
  )
}

export function ChannelsIntegrationsSettings() {
  const [selectedChannelId, setSelectedChannelId] =
    useState<ChannelId>("facebook")
  const [connections, setConnections] = useState(getInitialConnectionState)
  const [aiReplies, setAiReplies] = useState(getInitialToggleState)
  const [bookingOptions, setBookingOptions] = useState(getInitialToggleState)
  const [welcomeMessages, setWelcomeMessages] = useState<
    Record<ChannelId, string>
  >(() =>
    CHANNELS.reduce(
      (messages, channel) => {
        messages[channel.id] = DEFAULT_WELCOME_MESSAGE
        return messages
      },
      {} as Record<ChannelId, string>
    )
  )
  const [feedback, setFeedback] = useState<string | null>(null)

  const selectedChannel = useMemo(
    () =>
      CHANNELS.find((channel) => channel.id === selectedChannelId) ??
      CHANNELS[0],
    [selectedChannelId]
  )
  const selectedConnected = connections[selectedChannel.id]

  const selectChannel = (channelId: ChannelId) => {
    setSelectedChannelId(channelId)
    setFeedback(null)
  }

  const connectChannel = (channelId: ChannelId) => {
    const channel = CHANNELS.find((item) => item.id === channelId)

    setConnections((current) => ({ ...current, [channelId]: true }))
    setFeedback(`${channel?.name ?? "Channel"} connected in demo mode.`)
    setSelectedChannelId(channelId)
  }

  const saveChanges = () => {
    setFeedback(`${selectedChannel.name} settings saved in demo mode.`)
  }

  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.82fr)]">
      <section aria-labelledby="messaging-channels-heading" className="min-w-0">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2
              id="messaging-channels-heading"
              className="text-sm font-semibold text-foreground"
            >
              Messaging Channels
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Choose a channel to review its connection and automation settings.
            </p>
          </div>
          <Badge variant="secondary" className="hidden shrink-0 sm:inline-flex">
            {CHANNELS.filter((channel) => connections[channel.id]).length}/
            {CHANNELS.length} connected
          </Badge>
        </div>

        <div className="space-y-3">
          {CHANNELS.map((channel) => {
            const connected = connections[channel.id]
            const selected = selectedChannelId === channel.id

            return (
              <div
                key={channel.id}
                className={cn(
                  "flex min-w-0 flex-wrap items-center gap-3 rounded-lg border p-3 transition-colors sm:flex-nowrap sm:p-3.5",
                  selected
                    ? "border-gold/70 bg-gold/5 shadow-[0_0_0_1px_rgba(214,175,55,0.12)]"
                    : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
                )}
              >
                <button
                  type="button"
                  onClick={() => selectChannel(channel.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                >
                  <ChannelIcon channel={channel} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-foreground">
                      {channel.name}
                    </span>
                    <span className="mt-1 block max-w-xl text-[11px] leading-4 text-muted-foreground">
                      {channel.description}
                    </span>
                  </span>
                </button>

                <div className="flex min-w-32 flex-col gap-1 sm:w-36 sm:shrink-0">
                  <ConnectionStatus connected={connected} />
                  <span className="truncate text-[10px] text-muted-foreground">
                    {connected ? channel.account : "Connect to start chatting"}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:w-28 sm:justify-end">
                  {connected ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selectChannel(channel.id)}
                      className="h-8 gap-1.5 px-2.5 text-[10px]"
                    >
                      <Settings2 aria-hidden="true" className="size-3.5" />
                      Settings
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => connectChannel(channel.id)}
                      className="h-8 bg-gold px-3 text-[10px] text-background hover:bg-gold-hover"
                    >
                      Connect
                    </Button>
                  )}

                  <button
                    type="button"
                    onClick={() => selectChannel(channel.id)}
                    aria-label={`Open ${channel.name} settings`}
                    className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
                  >
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section
        aria-labelledby="channel-settings-heading"
        className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <ChannelIcon channel={selectedChannel} />
            <div className="min-w-0">
              <h2
                id="channel-settings-heading"
                className="truncate text-sm font-semibold text-foreground"
              >
                {selectedChannel.name}
              </h2>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Manage your channel connection and settings.
              </p>
            </div>
          </div>
          <ConnectionStatus connected={selectedConnected} />
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          <div className="rounded-lg border border-border bg-background/40 p-3.5">
            {selectedConnected ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                      RB
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {selectedChannel.account}
                      </p>
                      <p className="mt-1 truncate text-[10px] text-muted-foreground">
                        {selectedChannel.accountMeta}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFeedback(
                        `${selectedChannel.name} reconnected in demo mode.`
                      )
                    }}
                    className="h-8 shrink-0 gap-1.5 text-[10px]"
                  >
                    <RefreshCw aria-hidden="true" className="size-3.5" />
                    Reconnect
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <CheckCircle2 aria-hidden="true" className="size-3.5" />
                  Connected successfully
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Last synced: Oct 27, 2026 at 10:24 AM
                </p>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    This channel is not connected
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Connect it to let your team and AI assistant manage
                    conversations.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => connectChannel(selectedChannel.id)}
                  className="h-8 bg-gold text-[10px] text-background hover:bg-gold-hover"
                >
                  Connect channel
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-3 border-t border-border pt-5">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles aria-hidden="true" className="size-4 text-gold" />
                <h3 className="text-sm font-semibold text-foreground">
                  AI & Auto Replies
                </h3>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Let AI handle common questions and booking requests from this
                channel.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-background/30 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">
                    Enable AI Responses
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Let AI respond to customer messages.
                  </p>
                </div>
                <Switch
                  size="sm"
                  checked={selectedConnected && aiReplies[selectedChannel.id]}
                  onCheckedChange={(checked) => {
                    setAiReplies((current) => ({
                      ...current,
                      [selectedChannel.id]: checked,
                    }))
                  }}
                  disabled={!selectedConnected}
                  aria-label="Enable AI responses"
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-background/30 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">
                    Show Booking Options
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Allow AI to show available classes and booking links.
                  </p>
                </div>
                <Switch
                  size="sm"
                  checked={
                    selectedConnected && bookingOptions[selectedChannel.id]
                  }
                  onCheckedChange={(checked) => {
                    setBookingOptions((current) => ({
                      ...current,
                      [selectedChannel.id]: checked,
                    }))
                  }}
                  disabled={!selectedConnected}
                  aria-label="Show booking options"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Welcome Message{" "}
                  <span className="font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  This message will be sent to new conversations.
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {welcomeMessages[selectedChannel.id].length}/500
              </span>
            </div>

            <Textarea
              value={welcomeMessages[selectedChannel.id]}
              onChange={(event) => {
                setWelcomeMessages((current) => ({
                  ...current,
                  [selectedChannel.id]: event.target.value,
                }))
              }}
              maxLength={500}
              disabled={!selectedConnected}
              className="min-h-28 resize-y bg-background/40 text-xs leading-5"
              aria-label={`${selectedChannel.name} welcome message`}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              {feedback ? (
                <p
                  role="status"
                  className="flex items-center gap-1.5 text-[10px] text-emerald-400"
                >
                  <Check aria-hidden="true" className="size-3.5" />
                  {feedback}
                </p>
              ) : (
                <span />
              )}
              <Button
                type="button"
                onClick={saveChanges}
                disabled={!selectedConnected}
                className="h-9 gap-1.5 bg-gold px-4 text-[11px] text-background hover:bg-gold-hover"
              >
                <Save aria-hidden="true" className="size-3.5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChannelsIntegrationsSettings
