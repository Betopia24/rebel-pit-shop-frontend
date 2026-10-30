import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type CoachBiographyMarkdownProps = {
  content: string
  className?: string
}

export function CoachBiographyMarkdown({
  content,
  className,
}: CoachBiographyMarkdownProps) {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)
    .filter(Boolean)

  if (blocks.length === 0) {
    return (
      <p className={cn("text-text-muted", className)}>
        No biography added yet.
      </p>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {blocks.map((block, index) => {
        const lines = block.split("\n")
        const headingMatch = lines[0]?.match(/^#{1,3}\s+(.+)$/)
        const listItems = lines
          .filter((line) => line.trim().startsWith("- "))
          .map((line) => line.trim().slice(2))

        if (headingMatch) {
          return (
            <h4
              key={`heading-${index}`}
              className="font-semibold text-foreground"
            >
              {renderInlineMarkdown(headingMatch[1])}
            </h4>
          )
        }

        if (listItems.length === lines.length && listItems.length > 0) {
          return (
            <ul key={`list-${index}`} className="list-disc space-y-1 pl-5">
              {listItems.map((item, itemIndex) => (
                <li key={`item-${index}-${itemIndex}`}>
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          )
        }

        return <p key={`paragraph-${index}`}>{renderInlineMarkdown(block)}</p>
      })}
    </div>
  )
}

function renderInlineMarkdown(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).flatMap((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={`bold-${index}`}>{token.slice(2, -2)}</strong>
    }

    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={`italic-${index}`}>{token.slice(1, -1)}</em>
    }

    return token
      .split("\n")
      .flatMap((line, lineIndex) =>
        lineIndex === 0
          ? [line]
          : [<br key={`break-${index}-${lineIndex}`} />, line]
      )
  })
}

export default CoachBiographyMarkdown
