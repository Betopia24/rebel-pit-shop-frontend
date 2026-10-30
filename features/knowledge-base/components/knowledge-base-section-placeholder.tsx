import { ArrowRight, Construction } from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import type { KnowledgeBaseTabDefinition } from "../config/knowledge-base-tabs.config"

export function KnowledgeBaseSectionPlaceholder({
  tab,
}: {
  tab: KnowledgeBaseTabDefinition
}) {
  const Icon = tab.icon

  return (
    <section
      aria-labelledby="knowledge-base-section-title"
      className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center sm:min-h-80"
    >
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl",
          "border border-gold/20 bg-gold/10 text-gold"
        )}
      >
        <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />
      </div>

      <div className="mt-5 max-w-md">
        <div className="flex items-center justify-center gap-2">
          <h2
            id="knowledge-base-section-title"
            className="text-base font-semibold text-foreground"
          >
            {tab.label}
          </h2>
          <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            Coming next
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {tab.description}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
        <Construction aria-hidden="true" className="size-3.5 text-gold" />
        This section is ready for its content design.
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled
        className="mt-4 gap-1.5 text-[11px]"
      >
        Configure section
        <ArrowRight aria-hidden="true" className="size-3.5" />
      </Button>
    </section>
  )
}

export default KnowledgeBaseSectionPlaceholder
