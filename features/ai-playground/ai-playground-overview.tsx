"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import type { LucideIcon } from "lucide-react"
import {
  BookOpenCheck,
  Bot,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Link2,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  UserRoundCheck,
  UsersRound,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

type ScenarioId = "free_trial" | "membership" | "booking" | "human_handoff"
type MessageRole = "user" | "assistant"

interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

interface EvaluationState {
  intent: string
  intentScore: number
  leadScore: string
  bookingReadiness: string
  handoff: string
  quality: number
  safety: "Passed" | "Review"
}

interface ScenarioDefinition {
  id: ScenarioId
  label: string
  description: string
  prompt: string
  icon: LucideIcon
  evaluation: EvaluationState
}

const SCENARIOS: readonly ScenarioDefinition[] = [
  {
    id: "free_trial",
    label: "First class inquiry",
    description: "Test a new prospect asking about the first class.",
    prompt: "I've never boxed before. Can I try a class?",
    icon: Sparkles,
    evaluation: {
      intent: "Free trial inquiry",
      intentScore: 96,
      leadScore: "High intent",
      bookingReadiness: "Ready to qualify",
      handoff: "Not needed",
      quality: 94,
      safety: "Passed",
    },
  },
  {
    id: "membership",
    label: "Membership question",
    description: "Check how the assistant handles pricing questions.",
    prompt: "What membership options do you have?",
    icon: Target,
    evaluation: {
      intent: "Membership information",
      intentScore: 91,
      leadScore: "Warm",
      bookingReadiness: "Needs follow-up",
      handoff: "Not needed",
      quality: 90,
      safety: "Passed",
    },
  },
  {
    id: "booking",
    label: "Booking request",
    description: "Test class availability and booking handoff language.",
    prompt: "Can you help me book Beginner Boxing this week?",
    icon: CalendarCheck2,
    evaluation: {
      intent: "Booking request",
      intentScore: 98,
      leadScore: "High intent",
      bookingReadiness: "Ready to book",
      handoff: "Booking flow",
      quality: 96,
      safety: "Passed",
    },
  },
  {
    id: "human_handoff",
    label: "Human handoff",
    description: "Check when a conversation should reach the team.",
    prompt: "I need to speak with a coach about an injury before I train.",
    icon: UsersRound,
    evaluation: {
      intent: "Coach support request",
      intentScore: 94,
      leadScore: "Needs review",
      bookingReadiness: "Pause booking",
      handoff: "Recommended",
      quality: 88,
      safety: "Review",
    },
  },
] as const

const PERSONAS = [
  { value: "new_prospect", label: "New prospect" },
  { value: "returning_member", label: "Returning member" },
  { value: "parent", label: "Parent / guardian" },
] as const

const KNOWLEDGE_SOURCES = [
  { label: "Class information", status: "Synced" },
  { label: "Weekly schedule", status: "Synced" },
  { label: "Coach information", status: "Synced" },
] as const

function createMessages(scenario: ScenarioDefinition): ChatMessage[] {
  return [
    {
      id: `${scenario.id}-user`,
      role: "user",
      content: scenario.prompt,
      timestamp: "10:42 AM",
    },
    {
      id: `${scenario.id}-assistant`,
      role: "assistant",
      content: getScenarioResponse(scenario.id),
      timestamp: "10:42 AM",
    },
  ]
}

function getScenarioResponse(scenarioId: ScenarioId): string {
  switch (scenarioId) {
    case "membership":
      return "Absolutely. We offer group boxing classes, personal training, and fitness-focused sessions for all levels. I can help you find the right option or connect you with the team for current membership pricing."
    case "booking":
      return "I can help with that. Beginner Boxing is designed for new and returning athletes. Let me check the next available class and reserve a spot for you."
    case "human_handoff":
      return "Thanks for letting me know. Because this involves an injury, I’ll connect you with a Rebel coach before suggesting a class or booking."
    case "free_trial":
    default:
      return "Absolutely. No experience is needed—our coaches welcome all levels. Your first class is on us, and I can help find a Beginner Boxing session that fits your schedule."
  }
}

function getResponseForPrompt(prompt: string): {
  content: string
  evaluation: EvaluationState
} {
  const normalized = prompt.toLowerCase()

  if (normalized.includes("injury") || normalized.includes("coach") || normalized.includes("human")) {
    return {
      content: "I want to make sure you get the right guidance. I’m flagging this for a Rebel coach so they can help before we recommend a class.",
      evaluation: SCENARIOS[3].evaluation,
    }
  }

  if (normalized.includes("book") || normalized.includes("schedule") || normalized.includes("available")) {
    return {
      content: "I can help you find an opening. Beginner Boxing and Fitness Boxing are great starting points. Would you like the next available class or a personal training option?",
      evaluation: SCENARIOS[2].evaluation,
    }
  }

  if (normalized.includes("price") || normalized.includes("membership") || normalized.includes("cost")) {
    return {
      content: "We have group classes and one-on-one training options for different goals. I can share the best-fit path and connect you with the team for current membership pricing.",
      evaluation: SCENARIOS[1].evaluation,
    }
  }

  return {
    content: "Welcome to Rebel Boxing Club. All levels are welcome, and your first class is on us. Tell me what you want to improve and I’ll point you toward the right training option.",
    evaluation: SCENARIOS[0].evaluation,
  }
}

function ScenarioButton({
  scenario,
  active,
  onClick,
}: {
  scenario: ScenarioDefinition
  active: boolean
  onClick: () => void
}) {
  const Icon = scenario.icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors",
        active
          ? "border-gold/60 bg-gold/10 text-foreground"
          : "border-border/70 bg-background/20 text-muted-foreground hover:border-border hover:bg-muted/30 hover:text-foreground"
      )}
    >
      <span className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg", active ? "bg-gold/15 text-gold" : "bg-muted text-muted-foreground")}>
        <Icon aria-hidden="true" className="size-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium">{scenario.label}</span>
        <span className="mt-0.5 block text-[9px] leading-3.5 text-current/60">{scenario.description}</span>
      </span>
    </button>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("flex gap-2.5", isAssistant ? "items-start" : "items-start justify-end")}>
      {isAssistant && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <Bot aria-hidden="true" className="size-3.5" />
        </span>
      )}
      <div className={cn("max-w-[84%]", isAssistant ? "order-2" : "order-1")}>
        <div className={cn("rounded-xl px-3.5 py-3 text-xs leading-5", isAssistant ? "rounded-tl-sm border border-border/70 bg-card text-foreground" : "rounded-tr-sm bg-gold text-background")}>
          {message.content}
        </div>
        <p className={cn("mt-1 text-[9px] text-muted-foreground", !isAssistant && "text-right")}>{isAssistant ? "Rebel AI · test mode" : "You"} · {message.timestamp}</p>
      </div>
      {!isAssistant && (
        <span className="order-2 flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <UserRound aria-hidden="true" className="size-3.5" />
        </span>
      )}
    </div>
  )
}

function EvaluationRow({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon
  label: string
  value: string
  tone?: "default" | "success" | "warning"
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-background/25 px-3 py-2.5">
      <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", tone === "success" ? "bg-emerald-500/10 text-emerald-400" : tone === "warning" ? "bg-amber-500/10 text-amber-300" : "bg-gold/10 text-gold")}>
        <Icon aria-hidden="true" className="size-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] text-muted-foreground">{label}</span>
        <span className="mt-0.5 block truncate text-[11px] font-medium text-foreground">{value}</span>
      </span>
    </div>
  )
}

function ConfidenceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-[10px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground tabular-nums">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-gold" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function AiPlaygroundOverview() {
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>("free_trial")
  const [persona, setPersona] = useState("new_prospect")
  const [messages, setMessages] = useState<ChatMessage[]>(() => createMessages(SCENARIOS[0]))
  const [draft, setDraft] = useState("")
  const [evaluation, setEvaluation] = useState<EvaluationState>(SCENARIOS[0].evaluation)
  const [feedback, setFeedback] = useState<string | null>(null)

  const activeScenario = useMemo(
    () => SCENARIOS.find((scenario) => scenario.id === activeScenarioId) ?? SCENARIOS[0],
    [activeScenarioId]
  )

  const selectScenario = (scenario: ScenarioDefinition) => {
    setActiveScenarioId(scenario.id)
    setMessages(createMessages(scenario))
    setEvaluation(scenario.evaluation)
    setDraft("")
    setFeedback(null)
  }

  const runPrompt = () => {
    const prompt = draft.trim()

    if (!prompt) return

    const response = getResponseForPrompt(prompt)
    const timestamp = "10:43 AM"

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", content: prompt, timestamp },
      { id: `assistant-${Date.now()}`, role: "assistant", content: response.content, timestamp },
    ])
    setEvaluation(response.evaluation)
    setDraft("")
    setFeedback("Response generated in private test mode.")
  }

  const resetConversation = () => {
    setMessages(createMessages(activeScenario))
    setEvaluation(activeScenario.evaluation)
    setDraft("")
    setFeedback(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <ShieldCheck aria-hidden="true" className="size-4.5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Private test mode</p>
            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">Messages stay inside this playground. Nothing is sent to customers or connected channels.</p>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit shrink-0 text-[10px]">Not live</Badge>
      </div>

      {feedback && (
        <div role="status" className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-[11px] text-emerald-300">
          <CheckCircle2 aria-hidden="true" className="size-3.5" />
          {feedback}
        </div>
      )}

      <div className="grid min-w-0 gap-5 xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
        <aside className="h-fit space-y-4 rounded-xl border border-border bg-card p-3.5 xl:sticky xl:top-20">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck aria-hidden="true" className="size-4 text-gold" />
              <h2 className="text-sm font-semibold text-foreground">Test setup</h2>
            </div>
            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">Choose a persona and run a realistic customer scenario.</p>
          </div>

          <label className="block space-y-1.5">
            <span className="block text-[10px] font-medium text-foreground">Test persona</span>
            <Select value={persona} onValueChange={(value) => value && setPersona(value)}>
              <SelectTrigger className="w-full text-[11px]"><SelectValue>{PERSONAS.find((item) => item.value === persona)?.label}</SelectValue></SelectTrigger>
              <SelectContent>{PERSONAS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
          </label>

          <div className="space-y-2">
            <p className="text-[10px] font-medium text-foreground">Test scenarios</p>
            {SCENARIOS.map((scenario) => <ScenarioButton key={scenario.id} scenario={scenario} active={scenario.id === activeScenarioId} onClick={() => selectScenario(scenario)} />)}
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium text-foreground">Knowledge sources</p>
              <span className="text-[9px] text-emerald-400">All synced</span>
            </div>
            <div className="mt-2 space-y-2">
              {KNOWLEDGE_SOURCES.map((source) => (
                <div key={source.label} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <BookOpenCheck aria-hidden="true" className="size-3.5 text-gold" />
                  <span className="min-w-0 flex-1 truncate">{source.label}</span>
                  <Check aria-hidden="true" className="size-3 text-emerald-400" />
                </div>
              ))}
            </div>
            <Link href="/knowledge-base" className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-gold hover:text-gold-hover">
              Manage Knowledge Base <ChevronRight aria-hidden="true" className="size-3" />
            </Link>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold"><Bot aria-hidden="true" className="size-4" /></span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-foreground">Preview conversation</h2>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Rebel AI · {PERSONAS.find((item) => item.value === persona)?.label}</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" className="h-7 gap-1.5 text-[10px] text-muted-foreground" onClick={resetConversation}>
              <RotateCcw aria-hidden="true" className="size-3.5" />
              Reset chat
            </Button>
          </div>

          <div className="flex min-h-[27rem] flex-1 flex-col gap-4 overflow-y-auto bg-background/25 p-4 sm:p-5">
            <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-center text-[9px] text-muted-foreground">
              <Zap aria-hidden="true" className="size-3 text-gold" />
              This is a safe simulation using your current AI setup.
            </div>
            <div className="mt-auto space-y-4">
              {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
            </div>
          </div>

          <div className="border-t border-border p-3.5 sm:p-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background/40 p-1.5 focus-within:border-gold/50">
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    runPrompt()
                  }
                }}
                placeholder="Type a customer message to test the assistant..."
                className="h-8 border-0 bg-transparent text-xs shadow-none focus-visible:ring-0"
                aria-label="Test customer message"
              />
              <Button type="button" size="icon-sm" className="size-7 shrink-0 bg-gold text-background hover:bg-gold-hover" onClick={runPrompt} disabled={!draft.trim()} aria-label="Send test message">
                <Send aria-hidden="true" className="size-3.5" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[9px] text-muted-foreground">Press Enter to send · Responses are simulated in demo mode</p>
          </div>
        </main>

        <aside className="h-fit space-y-4 rounded-xl border border-border bg-card p-3.5 xl:sticky xl:top-20">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardCheck aria-hidden="true" className="size-4 text-gold" />
                <h2 className="text-sm font-semibold text-foreground">Response evaluation</h2>
              </div>
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">What the test detected from the latest response.</p>
            </div>
            <span className="text-lg font-semibold text-gold tabular-nums">{evaluation.quality}</span>
          </div>

          <div className="space-y-2.5 border-t border-border pt-3">
            <ConfidenceBar label="Intent confidence" value={evaluation.intentScore} />
            <ConfidenceBar label="Response quality" value={evaluation.quality} />
          </div>

          <div className="space-y-2">
            <EvaluationRow icon={Target} label="Detected intent" value={evaluation.intent} />
            <EvaluationRow icon={UserRoundCheck} label="Lead qualification" value={evaluation.leadScore} tone={evaluation.leadScore === "Needs review" ? "warning" : "success"} />
            <EvaluationRow icon={CalendarCheck2} label="Booking readiness" value={evaluation.bookingReadiness} />
            <EvaluationRow icon={UsersRound} label="Human handoff" value={evaluation.handoff} tone={evaluation.handoff === "Recommended" ? "warning" : "default"} />
          </div>

          <div className={cn("flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[10px]", evaluation.safety === "Passed" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300" : "border-amber-500/20 bg-amber-500/5 text-amber-200")}>
            {evaluation.safety === "Passed" ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : <CircleAlert aria-hidden="true" className="size-3.5" />}
            Safety check: {evaluation.safety}
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-[10px] font-medium text-foreground">Suggested next step</p>
            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{evaluation.handoff === "Recommended" ? "Review the handoff wording before enabling this flow on a live channel." : "Try another scenario to check the assistant across the full customer journey."}</p>
          </div>

          <div className="space-y-2 border-t border-border pt-3">
            <Link href="/ai-center" className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-[10px] text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground">
              Open AI Center <ChevronRight aria-hidden="true" className="size-3.5" />
            </Link>
            <Link href="/channels-integrations" className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-[10px] text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground">
              Review live channels <Link2 aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AiPlaygroundOverview
