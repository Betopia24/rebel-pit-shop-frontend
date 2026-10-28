import { useId } from "react"

import { AlertCircle, CheckCircle2, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

import type { LeadExperienceLevel } from "../../../types/lead.types"

import type { LeadQualificationDetails } from "../../../types/lead-details.types"

export interface LeadQualificationProps {
  qualification: LeadQualificationDetails
  className?: string
}

const EMPTY_VALUE = "Not provided"

function getExperienceLabel(experience: LeadExperienceLevel): string {
  switch (experience) {
    case "beginner":
      return "Beginner"

    case "intermediate":
      return "Intermediate"

    case "experienced":
      return "Experienced"

    default:
      return "Not specified"
  }
}

function getValue(value: string | null | undefined): string {
  return value?.trim() || EMPTY_VALUE
}

function getValidScore(score: number | null): number | null {
  if (score === null || !Number.isFinite(score) || score < 0 || score > 100) {
    return null
  }

  return score
}

interface QualificationRowProps {
  label: string
  value: string
}

function QualificationRow({ label, value }: QualificationRowProps) {
  const isMissing = value === EMPTY_VALUE

  return (
    <div
      className={cn(
        "grid min-w-0",
        "grid-cols-[minmax(88px,30%)_minmax(0,1fr)]",
        "items-start gap-3 py-2"
      )}
    >
      <span className="text-[11px] leading-4 text-muted-foreground">
        {label}
      </span>

      <Tooltip>
        <TooltipTrigger
          className={cn(
            "block max-w-full min-w-0",
            "rounded-sm text-left",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-ring"
          )}
        >
          <span
            className={cn(
              "block truncate",
              "text-[11px] leading-4",
              isMissing
                ? "text-muted-foreground"
                : "font-medium text-foreground"
            )}
          >
            {value}
          </span>
        </TooltipTrigger>

        <TooltipContent side="top" className="max-w-64 break-words">
          {value}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

interface QualificationScoreProps {
  score: number
  isQualified: boolean
}

function QualificationScore({ score, isQualified }: QualificationScoreProps) {
  return (
    <div className="mt-3 space-y-2 rounded-lg border border-border bg-muted/30 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Target
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          <span className="text-[11px] font-medium text-foreground">
            Qualification Score
          </span>
        </div>

        <span className="text-xs font-semibold text-foreground tabular-nums">
          {Math.round(score)}%
        </span>
      </div>

      <Progress
        value={score}
        aria-label="Lead qualification score"
        className="h-1.5"
      />

      <div className="flex items-center gap-1.5">
        {isQualified ? (
          <>
            <CheckCircle2
              aria-hidden="true"
              className="text-success size-3.5"
            />

            <span className="text-success text-[10px]">Qualified lead</span>
          </>
        ) : (
          <>
            <AlertCircle aria-hidden="true" className="text-warning size-3.5" />

            <span className="text-[10px] text-muted-foreground">
              Qualification in progress
            </span>
          </>
        )}
      </div>
    </div>
  )
}

interface MissingQualificationFieldsProps {
  fields: readonly string[]
}

function MissingQualificationFields({
  fields,
}: MissingQualificationFieldsProps) {
  const validFields = fields.filter((field) => field.trim().length > 0)

  if (validFields.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "mt-3 space-y-2 rounded-lg",
        "border-warning/20 border",
        "bg-warning/5 p-3"
      )}
    >
      <div className="flex items-center gap-1.5">
        <AlertCircle aria-hidden="true" className="text-warning size-3.5" />

        <span className="text-[11px] font-semibold text-foreground">
          Missing Information
        </span>

        <Badge
          variant="outline"
          className={cn(
            "ml-auto h-5 rounded-md",
            "border-warning/20 bg-warning/10",
            "text-warning px-1.5 text-[10px]"
          )}
        >
          {validFields.length}
        </Badge>
      </div>

      <ul className="space-y-1.5">
        {validFields.map((field, index) => (
          <li
            key={`${field}-${index}`}
            className={cn(
              "flex items-start gap-2",
              "text-[11px] leading-4",
              "text-muted-foreground"
            )}
          >
            <span
              aria-hidden="true"
              className="bg-warning mt-1.5 size-1 shrink-0 rounded-full"
            />

            <span>{field}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LeadQualification({
  qualification,
  className,
}: LeadQualificationProps) {
  const headingId = useId()

  const experience = getExperienceLabel(qualification.experienceLevel)

  const goal = getValue(qualification.goal)

  const interestedIn = getValue(qualification.interestedIn)

  const weeklyFrequency = getValue(qualification.weeklyFrequency)

  const budget = getValue(qualification.budget)

  const score = getValidScore(qualification.score)

  const hasBudget =
    qualification.budget !== null && qualification.budget.trim().length > 0

  return (
    <section aria-labelledby={headingId} className={cn("min-w-0", className)}>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-2 flex items-center justify-between gap-2">
        <h3
          id={headingId}
          className={cn(
            "text-xs font-semibold",
            "tracking-tight text-foreground"
          )}
        >
          Lead Qualification
        </h3>

        {qualification.isQualified && (
          <Badge
            variant="outline"
            className={cn(
              "h-5 gap-1 rounded-md",
              "border-success/20 bg-success/10",
              "px-1.5 text-[10px]",
              "text-success font-medium"
            )}
          >
            <CheckCircle2 aria-hidden="true" className="size-3" />
            Qualified
          </Badge>
        )}
      </div>

      {/* ======================================================
          INFORMATION
      ====================================================== */}

      <div className="divide-y divide-border/60">
        <QualificationRow label="Experience" value={experience} />

        <QualificationRow label="Goal" value={goal} />

        <QualificationRow label="Interested In" value={interestedIn} />

        <QualificationRow label="Weekly Frequency" value={weeklyFrequency} />

        {hasBudget && <QualificationRow label="Budget" value={budget} />}
      </div>

      {/* ======================================================
          QUALIFICATION SCORE
      ====================================================== */}

      {score !== null && (
        <QualificationScore
          score={score}
          isQualified={qualification.isQualified}
        />
      )}

      {/* ======================================================
          MISSING FIELDS
      ====================================================== */}

      <MissingQualificationFields fields={qualification.missingFields} />
    </section>
  )
}
