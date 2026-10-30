"use client"

import { useMemo, useState, type FormEvent } from "react"

import Link from "next/link"

import {
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  HelpCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  UsersRound,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import {
  SCHEDULE_KNOWLEDGE_DAYS,
  SCHEDULE_KNOWLEDGE_LEVELS,
} from "../config/schedule-knowledge.config"
import {
  SCHEDULE_KNOWLEDGE_FAQS,
  SCHEDULE_KNOWLEDGE_SOURCE,
} from "../data/schedule-knowledge-base.mock"

import type {
  ScheduleKnowledgeClassForm,
  ScheduleKnowledgeFaq,
  ScheduleKnowledgeItem,
} from "../types/schedule-knowledge.types"

const FIELD_CLASS_NAME =
  "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"

const INITIAL_FORM: ScheduleKnowledgeClassForm = {
  dayId: "mon",
  title: "",
  description: "",
  startTime: "09:00 AM",
  endTime: "10:00 AM",
  level: "All Levels",
  coachId: "",
}

export function ScheduleKnowledgeSection() {
  const [classes, setClasses] = useState<ScheduleKnowledgeItem[]>(() =>
    SCHEDULE_KNOWLEDGE_SOURCE.schedule.days.flatMap((day) =>
      day.classes.map((classItem) => ({
        ...classItem,
        dayId: day.id,
        dayLabel: day.label,
      }))
    )
  )
  const [faqs, setFaqs] = useState<ScheduleKnowledgeFaq[]>(() => [
    ...SCHEDULE_KNOWLEDGE_FAQS,
  ])
  const [activeDay, setActiveDay] = useState<
    "all" | ScheduleKnowledgeItem["dayId"]
  >("all")
  const [search, setSearch] = useState("")
  const [classDialogOpen, setClassDialogOpen] = useState(false)
  const [faqDialogOpen, setFaqDialogOpen] = useState(false)
  const [editingClassId, setEditingClassId] = useState<string | null>(null)
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null)
  const [classForm, setClassForm] =
    useState<ScheduleKnowledgeClassForm>(INITIAL_FORM)
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" })

  const filteredClasses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return classes
      .filter(
        (classItem) => activeDay === "all" || classItem.dayId === activeDay
      )
      .filter((classItem) => {
        if (!normalizedSearch) return true

        return [classItem.title, classItem.description, classItem.coach.name]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      })
      .sort((a, b) => {
        const dayDifference =
          SCHEDULE_KNOWLEDGE_DAYS.findIndex((day) => day.id === a.dayId) -
          SCHEDULE_KNOWLEDGE_DAYS.findIndex((day) => day.id === b.dayId)

        return dayDifference || a.startTime.localeCompare(b.startTime)
      })
  }, [activeDay, classes, search])

  const groupedClasses = useMemo(() => {
    return SCHEDULE_KNOWLEDGE_DAYS.map((day) => ({
      ...day,
      classes: filteredClasses.filter(
        (classItem) => classItem.dayId === day.id
      ),
    })).filter((day) => day.classes.length > 0)
  }, [filteredClasses])

  const openNewClassDialog = () => {
    setEditingClassId(null)
    setClassForm({
      ...INITIAL_FORM,
      dayId: activeDay === "all" ? "mon" : activeDay,
    })
    setClassDialogOpen(true)
  }

  const openEditClassDialog = (classItem: ScheduleKnowledgeItem) => {
    setEditingClassId(classItem.id)
    setClassForm({
      dayId: classItem.dayId,
      title: classItem.title,
      description: classItem.description,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      level: classItem.level,
      coachId: classItem.coach.id,
    })
    setClassDialogOpen(true)
  }

  const handleClassSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const selectedDay = SCHEDULE_KNOWLEDGE_DAYS.find(
      (day) => day.id === classForm.dayId
    )
    const selectedCoach = SCHEDULE_KNOWLEDGE_SOURCE.coaches.find(
      (coach) => coach.id === classForm.coachId
    )

    if (!selectedDay || !classForm.title.trim() || !selectedCoach) return

    const nextClass: ScheduleKnowledgeItem = {
      id: editingClassId ?? `knowledge-class-${Date.now()}`,
      title: classForm.title.trim(),
      description: classForm.description.trim(),
      startTime: classForm.startTime,
      endTime: classForm.endTime,
      level: classForm.level,
      joined: editingClassId
        ? (classes.find((classItem) => classItem.id === editingClassId)
            ?.joined ?? 0)
        : 0,
      coach: {
        id: selectedCoach.id,
        name: selectedCoach.name,
        avatar: selectedCoach.avatar,
      },
      dayId: selectedDay.id,
      dayLabel: selectedDay.label,
    }

    setClasses((currentClasses) =>
      editingClassId
        ? currentClasses.map((classItem) =>
            classItem.id === editingClassId ? nextClass : classItem
          )
        : [...currentClasses, nextClass]
    )
    setClassDialogOpen(false)
    setClassForm(INITIAL_FORM)
    setEditingClassId(null)
  }

  const openNewFaqDialog = () => {
    setEditingFaqId(null)
    setFaqForm({ question: "", answer: "" })
    setFaqDialogOpen(true)
  }

  const openEditFaqDialog = (faq: ScheduleKnowledgeFaq) => {
    setEditingFaqId(faq.id)
    setFaqForm({ question: faq.question, answer: faq.answer })
    setFaqDialogOpen(true)
  }

  const handleFaqSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!faqForm.question.trim() || !faqForm.answer.trim()) return

    const nextFaq: ScheduleKnowledgeFaq = {
      id: editingFaqId ?? `schedule-faq-${Date.now()}`,
      question: faqForm.question.trim(),
      answer: faqForm.answer.trim(),
      published: true,
    }

    setFaqs((currentFaqs) =>
      editingFaqId
        ? currentFaqs.map((faq) => (faq.id === editingFaqId ? nextFaq : faq))
        : [...currentFaqs, nextFaq]
    )
    setFaqDialogOpen(false)
    setFaqForm({ question: "", answer: "" })
    setEditingFaqId(null)
  }

  return (
    <div className="space-y-6 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <CalendarDays aria-hidden="true" className="size-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Schedule knowledge
              </h2>
              <Badge
                variant="outline"
                className="border-gold/25 bg-gold/10 text-gold"
              >
                Draft data
              </Badge>
            </div>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
              Manage the weekly classes and answers visitors see before booking
              on your website.
            </p>
          </div>
        </div>
        <Link
          href="/schedule"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "gap-2 self-start"
          )}
        >
          Preview schedule
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <ScheduleMetric
          icon={CalendarDays}
          label="Weekly classes"
          value={classes.length}
        />
        <ScheduleMetric
          icon={UsersRound}
          label="Coaches assigned"
          value={new Set(classes.map((classItem) => classItem.coach.id)).size}
        />
        <ScheduleMetric
          icon={HelpCircle}
          label="Published FAQs"
          value={faqs.filter((faq) => faq.published).length}
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                Weekly class schedule
              </h3>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {classes.length} sessions
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Keep class times, coaches, and member-facing descriptions up to
              date.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            className="h-8 gap-1.5 bg-gold text-background hover:bg-gold-hover"
            onClick={openNewClassDialog}
          >
            <Plus aria-hidden="true" className="size-3.5" />
            Add class
          </Button>
        </div>

        <div className="space-y-4 border-b border-border px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search classes or coaches"
                className="h-8 pl-8 text-xs"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Changes are staged here and ready for the schedule API connection.
            </p>
          </div>

          <div className="scrollbar-hidden flex min-w-0 gap-1 overflow-x-auto border-b border-border/70">
            <button
              type="button"
              onClick={() => setActiveDay("all")}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-[11px] font-medium transition-colors",
                activeDay === "all"
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              All days
            </button>
            {SCHEDULE_KNOWLEDGE_DAYS.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveDay(day.id)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-2 text-[11px] font-medium transition-colors",
                  activeDay === day.id
                    ? "bg-gold/10 text-gold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {groupedClasses.length > 0 ? (
            groupedClasses.map((day) => (
              <div key={day.id} className="px-4 py-4 sm:px-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-gold" />
                    <h4 className="text-xs font-semibold text-foreground">
                      {day.label}
                    </h4>
                    <span className="text-[10px] text-muted-foreground">
                      {day.classes.length} classes
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDay(day.id)
                      openNewClassDialog()
                    }}
                    className="text-[11px] font-medium text-gold hover:text-gold-hover"
                  >
                    Add to day
                  </button>
                </div>

                <div className="space-y-2">
                  {day.classes.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="group grid gap-3 rounded-lg border border-border bg-card px-3 py-3 transition-colors hover:border-gold/30 sm:grid-cols-[minmax(100px,0.32fr)_minmax(0,1fr)_minmax(150px,0.65fr)_auto] sm:items-center"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <Clock3
                          aria-hidden="true"
                          className="size-3.5 text-gold"
                        />
                        <span>{classItem.startTime}</span>
                        <span className="font-normal text-muted-foreground">
                          – {classItem.endTime}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">
                          {classItem.title}
                        </p>
                        <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                          {classItem.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={classItem.coach.avatar} alt="" />
                          <AvatarFallback className="bg-gold/10 text-[9px] text-gold">
                            {classItem.coach.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium text-foreground">
                            {classItem.coach.name}
                          </p>
                          <Badge
                            variant="outline"
                            className="mt-0.5 border-border px-1.5 py-0 text-[9px] text-muted-foreground"
                          >
                            {classItem.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1 border-t border-border pt-2 sm:border-0 sm:pt-0">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${classItem.title}`}
                          onClick={() => openEditClassDialog(classItem)}
                        >
                          <Pencil aria-hidden="true" className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${classItem.title}`}
                          onClick={() =>
                            setClasses((current) =>
                              current.filter((item) => item.id !== classItem.id)
                            )
                          }
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 aria-hidden="true" className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-12 text-center">
              <CalendarDays
                aria-hidden="true"
                className="mx-auto size-6 text-muted-foreground"
              />
              <p className="mt-3 text-sm font-medium text-foreground">
                No classes found
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try another day or add a new class to the schedule.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
              <HelpCircle aria-hidden="true" className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Schedule FAQs
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Answer common questions before someone books a class.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={openNewFaqDialog}
          >
            <Plus aria-hidden="true" className="size-3.5" />
            Add FAQ
          </Button>
        </div>

        <div className="divide-y divide-border">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xs font-semibold text-foreground">
                    {faq.question}
                  </h4>
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-1.5 py-0 text-[9px]",
                      faq.published
                        ? "border-success/30 bg-success/10 text-success"
                        : "text-muted-foreground"
                    )}
                  >
                    {faq.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="mt-1.5 max-w-3xl text-xs leading-5 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Edit ${faq.question}`}
                  onClick={() => openEditFaqDialog(faq)}
                >
                  <Pencil aria-hidden="true" className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${faq.question}`}
                  onClick={() =>
                    setFaqs((current) =>
                      current.filter((item) => item.id !== faq.id)
                    )
                  }
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClassDialog
        open={classDialogOpen}
        onOpenChange={setClassDialogOpen}
        editing={editingClassId !== null}
        form={classForm}
        onFormChange={setClassForm}
        onSubmit={handleClassSubmit}
      />

      <FaqDialog
        open={faqDialogOpen}
        onOpenChange={setFaqDialogOpen}
        editing={editingFaqId !== null}
        form={faqForm}
        onFormChange={setFaqForm}
        onSubmit={handleFaqSubmit}
      />
    </div>
  )
}

function ScheduleMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: number
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3.5 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <Icon aria-hidden="true" className="size-3.5 text-gold" />
      </div>
      <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  )
}

function ClassDialog({
  open,
  onOpenChange,
  editing,
  form,
  onFormChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing: boolean
  form: ScheduleKnowledgeClassForm
  onFormChange: (form: ScheduleKnowledgeClassForm) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-2xl overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit schedule class" : "Add a schedule class"}
          </DialogTitle>
          <DialogDescription>
            These details will appear on the public schedule and booking
            experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="knowledge-class-title">Class name</Label>
              <Input
                id="knowledge-class-title"
                value={form.title}
                onChange={(event) =>
                  onFormChange({ ...form, title: event.target.value })
                }
                placeholder="e.g. Boxing Fundamentals"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="knowledge-class-day">Day</Label>
              <select
                id="knowledge-class-day"
                value={form.dayId}
                onChange={(event) =>
                  onFormChange({
                    ...form,
                    dayId: event.target
                      .value as ScheduleKnowledgeClassForm["dayId"],
                  })
                }
                className={FIELD_CLASS_NAME}
              >
                {SCHEDULE_KNOWLEDGE_DAYS.map((day) => (
                  <option key={day.id} value={day.id}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="knowledge-class-coach">Coach</Label>
              <select
                id="knowledge-class-coach"
                value={form.coachId}
                onChange={(event) =>
                  onFormChange({ ...form, coachId: event.target.value })
                }
                className={FIELD_CLASS_NAME}
                required
              >
                <option value="">Select a coach</option>
                {SCHEDULE_KNOWLEDGE_SOURCE.coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="knowledge-class-start">Start time</Label>
              <Input
                id="knowledge-class-start"
                value={form.startTime}
                onChange={(event) =>
                  onFormChange({ ...form, startTime: event.target.value })
                }
                placeholder="09:00 AM"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="knowledge-class-end">End time</Label>
              <Input
                id="knowledge-class-end"
                value={form.endTime}
                onChange={(event) =>
                  onFormChange({ ...form, endTime: event.target.value })
                }
                placeholder="10:00 AM"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="knowledge-class-level">Experience level</Label>
              <select
                id="knowledge-class-level"
                value={form.level}
                onChange={(event) =>
                  onFormChange({
                    ...form,
                    level: event.target
                      .value as ScheduleKnowledgeClassForm["level"],
                  })
                }
                className={FIELD_CLASS_NAME}
              >
                {SCHEDULE_KNOWLEDGE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="knowledge-class-description">Description</Label>
              <Textarea
                id="knowledge-class-description"
                value={form.description}
                onChange={(event) =>
                  onFormChange({ ...form, description: event.target.value })
                }
                placeholder="Tell visitors what this class is about..."
                className="min-h-24 resize-y text-sm"
              />
            </div>
          </div>
          <DialogFooter className="-mx-4 -mb-4 rounded-b-xl border-t border-border bg-muted/20 px-4 py-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-gold text-background hover:bg-gold-hover"
            >
              <Check aria-hidden="true" className="size-3.5" />
              {editing ? "Save changes" : "Add class"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function FaqDialog({
  open,
  onOpenChange,
  editing,
  form,
  onFormChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing: boolean
  form: { question: string; answer: string }
  onFormChange: (form: { question: string; answer: string }) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit schedule FAQ" : "Add a schedule FAQ"}
          </DialogTitle>
          <DialogDescription>
            Write a clear answer that helps visitors decide whether a class is
            right for them.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-faq-question">Question</Label>
            <Input
              id="schedule-faq-question"
              value={form.question}
              onChange={(event) =>
                onFormChange({ ...form, question: event.target.value })
              }
              placeholder="e.g. Do I need boxing experience?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-faq-answer">Answer</Label>
            <Textarea
              id="schedule-faq-answer"
              value={form.answer}
              onChange={(event) =>
                onFormChange({ ...form, answer: event.target.value })
              }
              placeholder="Write the answer visitors should see..."
              className="min-h-32 resize-y text-sm"
              required
            />
          </div>
          <DialogFooter className="-mx-4 -mb-4 rounded-b-xl border-t border-border bg-muted/20 px-4 py-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-gold text-background hover:bg-gold-hover"
            >
              <Check aria-hidden="true" className="size-3.5" />
              {editing ? "Save changes" : "Publish FAQ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleKnowledgeSection
