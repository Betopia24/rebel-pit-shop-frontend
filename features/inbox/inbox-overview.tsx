"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import type { LucideIcon } from "lucide-react"
import {
  Bot,
  CalendarCheck2,
  CheckCheck,
  ChevronRight,
  CircleCheck,
  Globe2,
  Inbox,
  Search,
  Send,
  Smartphone,
  Sparkles,
  Tag,
  UserPlus,
  UserRound,
  UserRoundCheck,
} from "lucide-react"

import type { IconType } from "react-icons"
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  DASHBOARD_INBOX_CONVERSATIONS_MOCK,
} from "@/features/dashboard/data/dashboard-inbox.mock"
import type {
  DashboardInboxChannel,
  DashboardInboxConversation,
  DashboardInboxConversationStatus,
} from "@/features/dashboard/types/dashboard-inbox.types"

import { cn } from "@/lib/utils"

type ReplyMode = "ai" | "human"
type InboxFilter = "all" | "needs_reply"

interface InboxMessage {
  id: string
  role: "customer" | "ai" | "human"
  body: string
  timestamp: string
}

interface ChannelMeta {
  label: string
  icon: LucideIcon | IconType
  iconClassName: string
  backgroundClassName: string
}

const CHANNEL_META: Record<DashboardInboxChannel, ChannelMeta> = {
  messenger: {
    label: "Messenger",
    icon: FaFacebookMessenger,
    iconClassName: "text-white",
    backgroundClassName: "bg-[#1677f2]",
  },
  instagram: {
    label: "Instagram",
    icon: FaInstagram,
    iconClassName: "text-white",
    backgroundClassName: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  },
  website: {
    label: "Website",
    icon: Globe2,
    iconClassName: "text-white",
    backgroundClassName: "bg-[#1677ff]",
  },
  sms: {
    label: "SMS",
    icon: Smartphone,
    iconClassName: "text-white",
    backgroundClassName: "bg-emerald-500",
  },
}

const STATUS_LABELS: Record<DashboardInboxConversationStatus, string> = {
  open: "Open",
  waiting: "Waiting",
  escalated: "Escalated",
  closed: "Resolved",
}

const INITIAL_THREADS: Record<string, InboxMessage[]> = {
  conversation_sarah_001: [
    {
      id: "sarah-1",
      role: "customer",
      body: "I've never boxed before. Can I join?",
      timestamp: "9:58 AM",
    },
    {
      id: "sarah-2",
      role: "ai",
      body: "Absolutely! No experience is needed at Rebel. Our coaches welcome all levels, and your first class is on us. I can help you find a Beginner Boxing session that fits your schedule.",
      timestamp: "9:59 AM",
    },
  ],
  conversation_james_002: [
    {
      id: "james-1",
      role: "customer",
      body: "What are your membership prices?",
      timestamp: "9:48 AM",
    },
    {
      id: "james-2",
      role: "ai",
      body: "We have group classes and one-on-one training options for different goals. I can connect you with the team for current membership pricing and help find the right fit.",
      timestamp: "9:49 AM",
    },
  ],
  conversation_alex_003: [
    {
      id: "alex-1",
      role: "customer",
      body: "Do you offer personal training sessions?",
      timestamp: "9:32 AM",
    },
    {
      id: "alex-2",
      role: "ai",
      body: "Yes, we offer one-on-one personal training tailored to your goals. Would you like me to share the next available session or have a coach follow up?",
      timestamp: "9:33 AM",
    },
  ],
  conversation_maria_004: [
    {
      id: "maria-1",
      role: "customer",
      body: "Can I bring my 14 year old son?",
      timestamp: "9:00 AM",
    },
    {
      id: "maria-2",
      role: "ai",
      body: "I want to make sure you get the right information for youth training. I’m flagging this for the Rebel team so a coach can confirm the best option.",
      timestamp: "9:01 AM",
    },
    {
      id: "maria-3",
      role: "human",
      body: "Hi Maria, I’m reviewing this now and will have a coach confirm the youth class details for you.",
      timestamp: "9:04 AM",
    },
  ],
}

const AI_SUGGESTIONS: Record<string, string> = {
  conversation_sarah_001:
    "Absolutely! No experience is needed. Your first class is on us, and I can help you find a Beginner Boxing session that fits your schedule.",
  conversation_james_002:
    "We offer group classes and personal training for different goals. I can connect you with the team for current membership pricing.",
  conversation_alex_003:
    "Yes, we offer one-on-one personal training tailored to your goals. Would you like the next available session or a coach follow-up?",
  conversation_maria_004:
    "I’m connecting you with a Rebel coach so we can confirm the best youth training option for your son.",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function ChannelIcon({ channel, size = "default" }: { channel: DashboardInboxChannel; size?: "xs" | "sm" | "default" }) {
  const meta = CHANNEL_META[channel]
  const Icon = meta.icon

  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-md", size === "xs" ? "size-4" : size === "sm" ? "size-6" : "size-8", meta.backgroundClassName, meta.iconClassName)}>
      <Icon aria-hidden="true" className={size === "xs" ? "size-2.5" : size === "sm" ? "size-3.5" : "size-4"} />
    </span>
  )
}

function StatusBadge({ status }: { status: DashboardInboxConversationStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-[9px] font-medium", status === "escalated" ? "text-amber-300" : status === "closed" ? "text-muted-foreground" : status === "waiting" ? "text-blue-300" : "text-emerald-400")}>
      <span className={cn("size-1.5 rounded-full", status === "escalated" ? "bg-amber-300" : status === "closed" ? "bg-muted-foreground" : status === "waiting" ? "bg-blue-300" : "bg-emerald-400")} />
      {STATUS_LABELS[status]}
    </span>
  )
}

function ConversationRow({
  conversation,
  selected,
  onClick,
}: {
  conversation: DashboardInboxConversation
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex w-full items-start gap-2.5 border-b border-border/70 px-3.5 py-3 text-left transition-colors", selected ? "bg-gold/10" : "hover:bg-muted/30")}
    >
      <div className="relative shrink-0">
        <Avatar className="size-9 rounded-lg">
          <AvatarFallback className="rounded-lg bg-muted text-[10px] font-semibold text-foreground">{getInitials(conversation.customer.name)}</AvatarFallback>
        </Avatar>
        <span className="absolute -right-0.5 -bottom-0.5 rounded-md border-2 border-card">
          <ChannelIcon channel={conversation.channel} size="xs" />
        </span>
      </div>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-foreground">{conversation.customer.name}</span>
          <span className="shrink-0 text-[9px] text-muted-foreground">{conversation.lastMessage.sentAt.slice(11, 16)}</span>
        </span>
        <span className="mt-1 block truncate text-[10px] text-muted-foreground">{conversation.lastMessage.preview}</span>
        <span className="mt-1.5 flex items-center justify-between gap-2">
          <StatusBadge status={conversation.status} />
          {conversation.unreadCount > 0 && <span className="flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-background">{conversation.unreadCount}</span>}
        </span>
      </span>
    </button>
  )
}

function MessageBubble({ message }: { message: InboxMessage }) {
  const isCustomer = message.role === "customer"
  const isAI = message.role === "ai"

  return (
    <div className={cn("flex gap-2.5", isCustomer ? "justify-start" : "justify-end")}>
      {isCustomer && <Avatar className="mt-1 size-7 rounded-lg"><AvatarFallback className="rounded-lg bg-muted text-[9px] font-semibold">SM</AvatarFallback></Avatar>}
      <div className={cn("max-w-[78%]", isCustomer ? "order-2" : "order-1")}>
        <div className={cn("rounded-xl px-3.5 py-3 text-xs leading-5", isCustomer ? "rounded-tl-sm border border-border bg-card text-foreground" : isAI ? "rounded-tr-sm border border-gold/20 bg-gold/5 text-foreground" : "rounded-tr-sm bg-gold text-background")}>
          {message.body}
        </div>
        <div className={cn("mt-1 flex items-center gap-1.5 text-[9px] text-muted-foreground", isCustomer ? "justify-start" : "justify-end")}>
          {!isCustomer && (isAI ? <Bot aria-hidden="true" className="size-3 text-gold" /> : <UserRound aria-hidden="true" className="size-3 text-gold" />)}
          {isCustomer ? "Customer" : isAI ? "AI assistant" : "You"} · {message.timestamp}
        </div>
      </div>
    </div>
  )
}

export function InboxOverview() {
  const [conversations, setConversations] = useState<DashboardInboxConversation[]>(() => [...DASHBOARD_INBOX_CONVERSATIONS_MOCK])
  const [selectedId, setSelectedId] = useState<string>(DASHBOARD_INBOX_CONVERSATIONS_MOCK[0]?.id ?? "")
  const [filter, setFilter] = useState<InboxFilter>("all")
  const [channelFilter, setChannelFilter] = useState<DashboardInboxChannel | "all">("all")
  const [search, setSearch] = useState("")
  const [replyMode, setReplyMode] = useState<ReplyMode>("ai")
  const [draft, setDraft] = useState("")
  const [threads, setThreads] = useState<Record<string, InboxMessage[]>>(INITIAL_THREADS)
  const [feedback, setFeedback] = useState<string | null>(null)

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase()

    return conversations.filter((conversation) => {
      const matchesSearch = !query || conversation.customer.name.toLowerCase().includes(query) || conversation.lastMessage.preview?.toLowerCase().includes(query)
      const matchesFilter = filter === "all" || (filter === "needs_reply" && (conversation.status === "waiting" || conversation.status === "escalated"))
      const matchesChannel = channelFilter === "all" || conversation.channel === channelFilter

      return matchesSearch && matchesFilter && matchesChannel
    })
  }, [channelFilter, conversations, filter, search])

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? filteredConversations[0] ?? conversations[0]
  const selectedMessages = selectedConversation ? threads[selectedConversation.id] ?? [] : []
  const selectedSuggestion = selectedConversation ? AI_SUGGESTIONS[selectedConversation.id] ?? "Thanks for reaching out to Rebel Boxing Club. How can our team help you today?" : ""

  const selectConversation = (conversation: DashboardInboxConversation) => {
    setSelectedId(conversation.id)
    setDraft("")
    setFeedback(null)
    setConversations((current) => current.map((item) => item.id === conversation.id ? { ...item, unreadCount: 0 } : item))
  }

  const draftAIReply = () => {
    setReplyMode("ai")
    setDraft(selectedSuggestion)
    setFeedback("AI reply drafted. Review it before sending.")
  }

  const sendReply = () => {
    const message = draft.trim()

    if (!message || !selectedConversation) return

    const now = new Date()
    const timestamp = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    const nextMessage: InboxMessage = {
      id: `${replyMode}-${Date.now()}`,
      role: replyMode,
      body: message,
      timestamp,
    }

    setThreads((current) => ({
      ...current,
      [selectedConversation.id]: [...(current[selectedConversation.id] ?? []), nextMessage],
    }))
    setConversations((current) => current.map((conversation) => conversation.id === selectedConversation.id ? { ...conversation, status: "open", lastMessage: { ...conversation.lastMessage, preview: message, sender: replyMode === "ai" ? "ai" : "agent", sentAt: now.toISOString() } } : conversation))
    setDraft("")
    setFeedback(`${replyMode === "ai" ? "AI" : "Your"} reply sent in demo mode.`)
  }

  const markResolved = () => {
    if (!selectedConversation) return

    setConversations((current) => current.map((conversation) => conversation.id === selectedConversation.id ? { ...conversation, status: "closed" } : conversation))
    setFeedback("Conversation marked as resolved in demo mode.")
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="grid min-h-0 flex-1 xl:grid-cols-[18rem_minmax(0,1fr)_16rem]">
        <aside className="flex min-h-0 flex-col border-b border-border xl:border-r xl:border-b-0">
          <div className="space-y-3 border-b border-border p-3.5">
            <div className="relative">
              <Search aria-hidden="true" className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search conversations..." className="h-8 pl-8 text-[11px]" aria-label="Search conversations" />
            </div>
            <div className="flex gap-1 rounded-lg bg-background/50 p-1">
              {(["all", "needs_reply"] as const).map((item) => (
                <button key={item} type="button" onClick={() => setFilter(item)} className={cn("flex-1 rounded-md px-2 py-1.5 text-[9px] font-medium transition-colors", filter === item ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {item === "all" ? "All" : "Needs reply"}
                </button>
              ))}
            </div>
            <div className="flex w-full items-center justify-between gap-2 overflow-x-auto scrollbar-hidden">
              {(Object.keys(CHANNEL_META) as DashboardInboxChannel[]).map((channel) => <button key={channel} type="button" onClick={() => setChannelFilter(channelFilter === channel ? "all" : channel)} className={cn("rounded-lg border p-0.5", channelFilter === channel ? "border-gold/60" : "border-transparent")} aria-label={`Filter ${CHANNEL_META[channel].label}`}><ChannelIcon channel={channel} size="sm" /></button>)}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center gap-2 px-5 text-center"><Inbox aria-hidden="true" className="size-5 text-muted-foreground" /><p className="text-xs font-medium text-foreground">No conversations found</p><p className="text-[10px] text-muted-foreground">Try another search or filter.</p></div>
            ) : filteredConversations.map((conversation) => <ConversationRow key={conversation.id} conversation={conversation} selected={conversation.id === selectedConversation?.id} onClick={() => selectConversation(conversation)} />)}
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-col border-b border-border xl:border-r xl:border-b-0">
          {selectedConversation ? (
            <>
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-9 rounded-lg"><AvatarFallback className="rounded-lg bg-muted text-xs font-semibold">{getInitials(selectedConversation.customer.name)}</AvatarFallback></Avatar>
                  <div className="min-w-0"><div className="flex items-center gap-2"><h3 className="truncate text-sm font-semibold text-foreground">{selectedConversation.customer.name}</h3><StatusBadge status={selectedConversation.status} /></div><p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground"><ChannelIcon channel={selectedConversation.channel} size="sm" /> {CHANNEL_META[selectedConversation.channel].label} · customer</p></div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button type="button" variant="outline" size="sm" className="h-7 gap-1.5 text-[10px]" onClick={markResolved}><CircleCheck aria-hidden="true" className="size-3.5" /> Resolve</Button>
                </div>
              </div>
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-background/20 px-4 py-5 sm:px-6">
                <div className="mx-auto mb-5 flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-[9px] text-muted-foreground"><ChannelIcon channel={selectedConversation.channel} size="sm" /> Conversation from {CHANNEL_META[selectedConversation.channel].label}</div>
                <div className="mt-auto space-y-4">{selectedMessages.map((message) => <MessageBubble key={message.id} message={message} />)}</div>
              </div>
              <div className="shrink-0 border-t border-border p-3.5 sm:p-4">
                <div className="mb-2 flex items-center justify-between gap-2"><div className="flex items-center gap-1 rounded-lg bg-background/60 p-1"><button type="button" onClick={() => setReplyMode("ai")} className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-medium", replyMode === "ai" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground")}><Bot className="size-3" /> AI reply</button><button type="button" onClick={() => setReplyMode("human")} className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-medium", replyMode === "human" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}><UserRound className="size-3" /> Human reply</button></div><button type="button" onClick={draftAIReply} className="inline-flex items-center gap-1 text-[10px] font-medium text-gold hover:text-gold-hover"><Sparkles className="size-3.5" /> Generate AI reply</button></div>
                <div className="flex items-end gap-2 rounded-lg border border-border bg-background/40 p-1.5 focus-within:border-gold/50"><Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={replyMode === "ai" ? "Review or generate an AI reply..." : "Write a reply as a team member..."} className="min-h-9 resize-none border-0 bg-transparent px-2 py-1.5 text-xs shadow-none focus-visible:ring-0" aria-label="Reply composer" /><Button type="button" size="icon-sm" className="size-7 shrink-0 bg-gold text-background hover:bg-gold-hover" onClick={sendReply} disabled={!draft.trim()} aria-label="Send reply"><Send aria-hidden="true" className="size-3.5" /></Button></div>
                <div className="mt-2 flex items-center justify-between gap-2 text-[9px] text-muted-foreground"><span>{replyMode === "ai" ? "AI draft will be labeled as AI in the conversation." : "Your reply will be sent as a human team member."}</span><span className="inline-flex items-center gap-1"><CheckCheck className="size-3 text-emerald-400" /> Demo mode</span></div>
                {feedback && <p className="mt-2 text-[10px] text-gold" role="status">{feedback}</p>}
              </div>
            </>
          ) : <div className="flex flex-1 items-center justify-center text-xs text-muted-foreground">Select a conversation to start.</div>}
        </main>

        <aside className="min-h-0 overflow-y-auto p-3.5 sm:p-4">
          {selectedConversation ? <div className="space-y-4">
            <div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-foreground">Contact details</h2></div>
            <div className="flex flex-col items-center rounded-xl border border-border bg-background/25 p-4 text-center"><Avatar className="size-14 rounded-xl"><AvatarFallback className="rounded-xl bg-gold/10 text-lg font-semibold text-gold">{getInitials(selectedConversation.customer.name)}</AvatarFallback></Avatar><p className="mt-2 text-sm font-semibold text-foreground">{selectedConversation.customer.name}</p><p className="mt-1 text-[10px] text-muted-foreground">Prospect · {CHANNEL_META[selectedConversation.channel].label}</p><div className="mt-3 flex flex-wrap justify-center gap-1.5"><Badge variant="secondary" className="text-[9px]"><Tag className="mr-1 size-3" /> New lead</Badge>{selectedConversation.requiresHumanAttention && <Badge variant="outline" className="border-amber-500/30 text-[9px] text-amber-300">Needs attention</Badge>}</div></div>
            <div className="space-y-2 border-t border-border pt-4"><p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Quick actions</p><Link href="/leads-prospect" className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[10px] text-muted-foreground hover:border-gold/40 hover:text-foreground"><span className="inline-flex items-center gap-2"><UserRoundCheck className="size-3.5 text-gold" /> View lead profile</span><ChevronRight className="size-3.5" /></Link><Link href="/bookings" className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[10px] text-muted-foreground hover:border-gold/40 hover:text-foreground"><span className="inline-flex items-center gap-2"><CalendarCheck2 className="size-3.5 text-gold" /> Create booking</span><ChevronRight className="size-3.5" /></Link><button type="button" onClick={() => setFeedback("Conversation assigned to you in demo mode.")} className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[10px] text-muted-foreground hover:border-gold/40 hover:text-foreground"><span className="inline-flex items-center gap-2"><UserPlus className="size-3.5 text-gold" /> Assign to me</span><ChevronRight className="size-3.5" /></button></div>
            <div className="space-y-2 border-t border-border pt-4"><div className="flex items-center gap-2"><Sparkles className="size-3.5 text-gold" /><p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">AI summary</p></div><p className="rounded-lg border border-gold/20 bg-gold/5 p-3 text-[10px] leading-4 text-muted-foreground">{selectedConversation.id === "conversation_maria_004" ? "Parent is asking about youth participation. Human review is recommended before sharing a booking option." : "Prospect is asking about training. The assistant can answer from the Knowledge Base and offer a next step."}</p></div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-[10px] text-emerald-300"><Bot className="size-3.5" /> AI suggestions are enabled</div>
          </div> : <div className="flex h-full items-center justify-center text-center text-xs text-muted-foreground">Contact details will appear here.</div>}
        </aside>
      </div>
    </div>
  )
}

export default InboxOverview
