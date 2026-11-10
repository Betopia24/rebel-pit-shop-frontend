"use client"

import { useState, type FormEvent } from "react"

import Image from "next/image"
import Link from "next/link"

import {
  ChevronRight,
  Send,
  Sparkles,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "assistant" | "visitor"
  text: string
}

const QUICK_PROMPTS = [
  "I’m new to boxing",
  "What classes do you offer?",
  "How do I book a first visit?",
]

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hey! I’m the Rebel assistant. I can help you find the right class, understand how training works, or get your first visit started.",
  },
]

function getAssistantReply(message: string): string {
  const normalized = message.toLowerCase()

  if (normalized.includes("new") || normalized.includes("beginner") || normalized.includes("first")) {
    return "No experience is needed at Rebel. We’ll help you start at the right pace, and your first visit is a great way to meet the coaches and see the gym."
  }

  if (normalized.includes("class") || normalized.includes("training")) {
    return "We offer group boxing, kickboxing, conditioning, personal training, and open gym time. You can explore the options and find what fits your goals."
  }

  if (normalized.includes("book") || normalized.includes("visit") || normalized.includes("schedule")) {
    return "I can point you to the schedule so you can see the upcoming sessions. Pick a time that works and the team can help with the next step."
  }

  return "Thanks for reaching out! Tell me whether you’re looking for group classes, personal training, or help planning your first visit."
}

export function FloatingChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)

  function sendMessage(value = input) {
    const text = value.trim()

    if (!text) return

    setMessages((current) => [
      ...current,
      { id: `visitor-${Date.now()}`, role: "visitor", text },
      { id: `assistant-${Date.now() + 1}`, role: "assistant", text: getAssistantReply(text) },
    ])
    setInput("")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="fixed right-4 bottom-4 z-[var(--z-floating)] sm:right-6 sm:bottom-6">
      {open && (
        <section
          role="dialog"
          aria-label="Rebel Boxing assistant"
          className="mb-3 flex h-[min(35rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-[#11110f]/95 shadow-[0_24px_80px_rgb(0_0_0/0.48),0_0_0_1px_rgb(212_175_55/0.08)] backdrop-blur-2xl"
        >
          <div className="relative shrink-0 overflow-hidden border-b border-foreground/10 px-4 py-4">
            <div aria-hidden="true" className="pointer-events-none absolute -top-12 -right-8 size-28 rounded-full bg-gold/10 blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-background shadow-[var(--shadow-gold-xs)]"><Image src="/images/branding/rebel-boxing-logo.webp" alt="" width={40} height={40} className="size-8 object-contain" /></span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">Rebel Assistant</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-text-secondary"><span className="size-1.5 rounded-full bg-emerald-400" /> Usually replies instantly</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-foreground/8 hover:text-foreground"><X className="size-4" /></button>
            </div>
          </div>

          <div className="scrollbar-hidden flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted"><Sparkles className="size-3 text-gold" /> Quick help</div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1.5 text-left text-[10px] text-gold transition-colors hover:border-gold/45 hover:bg-gold/10">{prompt}</button>)}
            </div>
            <div className="space-y-3 pt-1">
              {messages.map((message) => <div key={message.id} className={cn("flex gap-2.5", message.role === "visitor" ? "justify-end" : "justify-start")}>
                {message.role === "assistant" && <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-background"><Image src="/images/branding/rebel-boxing-logo.webp" alt="" width={24} height={24} className="size-5 object-contain" /></span>}
                <div className={cn("max-w-[85%] rounded-2xl px-3 py-2.5 text-[11px] leading-5", message.role === "visitor" ? "rounded-br-md bg-gold text-background" : "rounded-bl-md border border-foreground/10 bg-foreground/[0.05] text-text-soft")}>{message.text}</div>
              </div>)}
            </div>
          </div>

          <div className="shrink-0 border-t border-foreground/10 p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background/45 p-1.5 focus-within:border-gold/50">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Rebel..." aria-label="Chat message" className="min-w-0 flex-1 bg-transparent px-2 text-xs text-foreground outline-none placeholder:text-text-muted" />
              <button type="submit" disabled={!input.trim()} aria-label="Send message" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold text-background transition-colors hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-40"><Send className="size-3.5" /></button>
            </form>
            <p className="mt-2 text-center text-[9px] text-text-muted">AI guidance for general questions · <Link href="/message" className="text-gold hover:underline">Talk to the team</Link></p>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Close Rebel assistant" : "Open Rebel assistant"} className={cn("group ml-auto flex items-center gap-2 rounded-full border border-gold/70 bg-gold px-3.5 py-3 text-background shadow-[var(--shadow-gold-md)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[var(--shadow-gold-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background", open && "bg-gold-hover")}>
        <span className="relative flex size-7 items-center justify-center rounded-full bg-background/12"><Image src="/images/branding/rebel-boxing-logo.webp" alt="" width={28} height={28} className="size-6 object-contain" /><span aria-hidden="true" className="absolute -top-1 -right-1 size-3.5 rounded-full border border-gold bg-emerald-400" /></span>
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.08em] sm:inline">{open ? "Close" : "Chat with us"}</span>
        <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} />
      </button>
    </div>
  )
}
