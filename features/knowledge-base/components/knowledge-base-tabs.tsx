"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

import { KNOWLEDGE_BASE_TABS } from "../config/knowledge-base-tabs.config"

import type { KnowledgeBaseTab } from "../types/knowledge-base.types"

interface KnowledgeBaseTabsProps {
  value: KnowledgeBaseTab
  onChange: (value: KnowledgeBaseTab) => void
}

export function KnowledgeBaseTabs({ value, onChange }: KnowledgeBaseTabsProps) {
  return (
    <nav
      aria-label="Knowledge base sections"
      className="w-full min-w-0 border-b border-border/80"
    >
      <Tabs
        value={value}
        onValueChange={(nextValue) => {
          const nextTab = KNOWLEDGE_BASE_TABS.find(
            (tab) => tab.id === nextValue
          )

          if (nextTab && nextTab.id !== value) {
            onChange(nextTab.id)
          }
        }}
        className="w-full min-w-0"
      >
        <div className="scrollbar-hidden w-full overflow-x-auto overflow-y-hidden overscroll-x-contain">
          <TabsList
            variant="line"
            className="inline-flex h-auto w-max min-w-full items-stretch justify-start gap-0 rounded-none bg-transparent p-0 shadow-none"
          >
            {KNOWLEDGE_BASE_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = tab.id === value

              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  aria-label={tab.label}
                  style={
                    isActive ? { backgroundColor: "var(--gold-10)" } : undefined
                  }
                  className={cn(
                    "relative inline-flex h-10 flex-none shrink-0 items-center justify-center gap-1.5",
                    "rounded-none border-0 border-b-2 border-transparent bg-transparent px-2.5 py-2 sm:px-3",
                    "text-[11px] font-medium whitespace-nowrap text-muted-foreground shadow-none",
                    "transition-colors hover:bg-muted/30 hover:text-foreground",
                    "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
                    "data-[active]:border-gold data-[active]:text-gold data-[active]:shadow-none data-[active]:ring-1 data-[active]:ring-gold/20",
                    "data-[state=active]:border-gold data-[state=active]:text-gold data-[state=active]:shadow-none data-[state=active]:ring-1 data-[state=active]:ring-gold/20",
                    isActive &&
                      "rounded-md border-gold/30 text-gold shadow-none ring-1 ring-gold/20"
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.8}
                  />
                  {tab.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
      </Tabs>
    </nav>
  )
}

export default KnowledgeBaseTabs
