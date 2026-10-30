"use client"

import { useMemo, useState, type FormEvent, type ReactNode } from "react"

import Link from "next/link"

import {
  Check,
  ExternalLink,
  FileText,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

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
import { CoachBiographyMarkdown } from "@/features/about/components/coach-biography-markdown"
import { cn } from "@/lib/utils"

import {
  CLASS_INFORMATION_CATEGORY_CONFIG,
  CLASS_INFORMATION_CATEGORY_ORDER,
} from "../config/class-information.config"
import { CLASS_INFORMATION_SOURCE } from "../data/class-information.mock"

import type {
  ClassInformationCategory,
  ClassInformationItem,
} from "../types/class-information.types"

const INITIAL_ITEMS: ClassInformationItem[] = CLASS_INFORMATION_SOURCE.map(
  (item) => ({
    ...item,
    benefits: [...item.benefits],
    bestFor: [...item.bestFor],
  })
)

type NewClassInformationForm = {
  category: ClassInformationCategory
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

const INITIAL_NEW_CONTENT_FORM: NewClassInformationForm = {
  category: "group_class",
  eyebrow: "New training option",
  title: "",
  description: "",
  ctaLabel: "Learn More",
  ctaHref: "/schedule",
}

export function ClassInformationSection() {
  const [items, setItems] = useState<ClassInformationItem[]>(INITIAL_ITEMS)
  const [selectedId, setSelectedId] = useState(INITIAL_ITEMS[0]?.id ?? "")
  const [activeCategory, setActiveCategory] = useState<
    "all" | ClassInformationCategory
  >("all")
  const [search, setSearch] = useState("")
  const [tagDraft, setTagDraft] = useState({ benefits: "", bestFor: "" })
  const [savedItemId, setSavedItemId] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [newContentOpen, setNewContentOpen] = useState(false)
  const [newContentForm, setNewContentForm] = useState<NewClassInformationForm>(
    INITIAL_NEW_CONTENT_FORM
  )

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory
      const matchesSearch =
        !normalizedSearch ||
        [item.title, item.eyebrow, item.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, items, search])

  const selectedItem =
    items.find((item) => item.id === selectedId) ?? filteredItems[0] ?? items[0]

  const updateSelectedItem = (updates: Partial<ClassInformationItem>) => {
    if (!selectedItem) return

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === selectedItem.id ? { ...item, ...updates } : item
      )
    )
    setHasUnsavedChanges(true)
    setSavedItemId(null)
  }

  const selectCategory = (category: "all" | ClassInformationCategory) => {
    setActiveCategory(category)
    const nextItem = items.find(
      (item) => category === "all" || item.category === category
    )

    if (nextItem) setSelectedId(nextItem.id)
    setTagDraft({ benefits: "", bestFor: "" })
    setSavedItemId(null)
    setHasUnsavedChanges(false)
  }

  const addTag = (field: "benefits" | "bestFor") => {
    const value = tagDraft[field].trim()

    if (!selectedItem || !value || selectedItem[field].includes(value)) return

    updateSelectedItem({ [field]: [...selectedItem[field], value] })
    setTagDraft((current) => ({ ...current, [field]: "" }))
  }

  const removeTag = (field: "benefits" | "bestFor", value: string) => {
    if (!selectedItem) return

    updateSelectedItem({
      [field]: selectedItem[field].filter((item) => item !== value),
    })
  }

  const handleNewContentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = newContentForm.title.trim()

    if (!title) return

    const categoryItems = items.filter(
      (item) => item.category === newContentForm.category
    )
    const nextItem: ClassInformationItem = {
      id: `class-content-${Date.now()}`,
      category: newContentForm.category,
      number: String(categoryItems.length + 1).padStart(2, "0"),
      eyebrow: newContentForm.eyebrow.trim() || "New training option",
      title,
      description: newContentForm.description.trim(),
      benefits: [],
      bestFor: [],
      ctaLabel: newContentForm.ctaLabel.trim() || "Learn More",
      ctaHref: newContentForm.ctaHref.trim() || "/schedule",
      published: false,
    }

    setItems((currentItems) => [...currentItems, nextItem])
    setSelectedId(nextItem.id)
    setActiveCategory(nextItem.category)
    setNewContentForm(INITIAL_NEW_CONTENT_FORM)
    setNewContentOpen(false)
    setHasUnsavedChanges(true)
    setSavedItemId(null)
  }

  if (!selectedItem) return null

  const category = CLASS_INFORMATION_CATEGORY_CONFIG[selectedItem.category]

  return (
    <div className="space-y-5 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <FileText aria-hidden="true" className="size-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Class information
              </h2>
              <Badge
                variant="outline"
                className="border-gold/25 bg-gold/10 text-gold"
              >
                Draft content
              </Badge>
            </div>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
              Manage the training content, benefits, and calls to action shown
              across the Classes page.
            </p>
          </div>
        </div>
        <Link
          href="/classes"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "gap-2 self-start"
          )}
        >
          Preview Classes page
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <ClassMetric
          icon={FileText}
          label="Content items"
          value={items.length}
        />
        <ClassMetric
          icon={UsersRound}
          label="Published items"
          value={items.filter((item) => item.published).length}
        />
        <ClassMetric
          icon={Sparkles}
          label="Highlight points"
          value={items.reduce((total, item) => total + item.benefits.length, 0)}
        />
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)]">
        <aside className="min-w-0 rounded-xl border border-border bg-background">
          <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3.5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Class content library
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Select a content block to edit its public copy.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Add class content"
              onClick={() => setNewContentOpen(true)}
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </Button>
          </div>
          <div className="space-y-3 p-3">
            <div className="space-y-2">
              <Label
                htmlFor="class-information-search"
                className="text-[10px] text-muted-foreground"
              >
                Search content
              </Label>
              <Input
                id="class-information-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search classes..."
                className="h-8 text-xs"
              />
            </div>
            <div className="scrollbar-hidden flex gap-1 overflow-x-auto pb-1 lg:grid lg:overflow-visible">
              <CategoryFilter
                label="All content"
                count={items.length}
                active={activeCategory === "all"}
                onClick={() => selectCategory("all")}
              />
              {CLASS_INFORMATION_CATEGORY_ORDER.map((categoryId) => (
                <CategoryFilter
                  key={categoryId}
                  label={CLASS_INFORMATION_CATEGORY_CONFIG[categoryId].label}
                  count={
                    items.filter((item) => item.category === categoryId).length
                  }
                  active={activeCategory === categoryId}
                  onClick={() => selectCategory(categoryId)}
                />
              ))}
            </div>
            <div className="scrollbar-hidden max-h-[28rem] space-y-1 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id)
                    setSavedItemId(null)
                    setHasUnsavedChanges(false)
                    setTagDraft({ benefits: "", bestFor: "" })
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                    item.id === selectedItem.id
                      ? "border-gold/30 bg-gold/10"
                      : "border-transparent hover:border-border hover:bg-muted/40"
                  )}
                >
                  <span className="pt-0.5 text-[10px] font-semibold text-gold">
                    {item.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                      {CLASS_INFORMATION_CATEGORY_CONFIG[item.category].label}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <EditorHeader
              icon={Target}
              eyebrow={`Content ${selectedItem.number}`}
              title={selectedItem.title}
              description={category.description}
            />
            <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2">
              <ClassField label="Eyebrow" htmlFor="class-eyebrow">
                <Input
                  id="class-eyebrow"
                  value={selectedItem.eyebrow}
                  onChange={(event) =>
                    updateSelectedItem({ eyebrow: event.target.value })
                  }
                />
              </ClassField>
              <ClassField label="Title" htmlFor="class-title">
                <Input
                  id="class-title"
                  value={selectedItem.title}
                  onChange={(event) =>
                    updateSelectedItem({ title: event.target.value })
                  }
                />
              </ClassField>
              <ClassField label="CTA label" htmlFor="class-cta-label">
                <Input
                  id="class-cta-label"
                  value={selectedItem.ctaLabel}
                  onChange={(event) =>
                    updateSelectedItem({ ctaLabel: event.target.value })
                  }
                />
              </ClassField>
              <ClassField
                label="CTA link"
                htmlFor="class-cta-href"
                hint="Example: /schedule"
              >
                <Input
                  id="class-cta-href"
                  value={selectedItem.ctaHref}
                  onChange={(event) =>
                    updateSelectedItem({ ctaHref: event.target.value })
                  }
                />
              </ClassField>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <EditorHeader
              icon={FileText}
              eyebrow="Section 02"
              title="Description"
              description="Use concise Markdown copy to explain what this training option feels like."
            />
            <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.9fr)]">
              <div>
                <Textarea
                  value={selectedItem.description}
                  onChange={(event) =>
                    updateSelectedItem({ description: event.target.value })
                  }
                  className="min-h-40 resize-y text-sm leading-7"
                  placeholder="Describe this training option..."
                />
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Supports **bold**, *italic*, and normal line breaks.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border bg-background px-3 py-2">
                  <Sparkles aria-hidden="true" className="size-3.5 text-gold" />
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Live preview
                  </span>
                </div>
                <CoachBiographyMarkdown
                  content={selectedItem.description}
                  className="min-h-40 p-4 text-xs leading-6 text-muted-foreground"
                />
              </div>
            </div>
          </section>

          <TagEditor
            title="What members get"
            description="Key benefits shown as scannable highlights on the Classes page."
            values={selectedItem.benefits}
            draft={tagDraft.benefits}
            placeholder="e.g. Full-body conditioning"
            onDraftChange={(value) =>
              setTagDraft((current) => ({ ...current, benefits: value }))
            }
            onAdd={() => addTag("benefits")}
            onRemove={(value) => removeTag("benefits", value)}
          />

          <TagEditor
            title="Best for"
            description="Help visitors quickly understand who this option is a good fit for."
            values={selectedItem.bestFor}
            draft={tagDraft.bestFor}
            placeholder="e.g. Complete beginners"
            onDraftChange={(value) =>
              setTagDraft((current) => ({ ...current, bestFor: value }))
            }
            onAdd={() => addTag("bestFor")}
            onRemove={(value) => removeTag("bestFor", value)}
          />

          <div className="sticky bottom-3 z-10 flex flex-col gap-3 rounded-xl border border-gold/20 bg-gold/5 p-4 shadow-lg shadow-black/20 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">
                Ready to save {selectedItem.title}?
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {hasUnsavedChanges
                  ? "You have unsaved changes in this content block."
                  : "All changes in this content block are up to date."}
              </p>
            </div>
            <Button
              type="button"
              className="h-9 gap-2 bg-gold text-background hover:bg-gold-hover"
              onClick={() => {
                setSavedItemId(selectedItem.id)
                setHasUnsavedChanges(false)
              }}
            >
              {savedItemId === selectedItem.id ? (
                <Check aria-hidden="true" className="size-3.5" />
              ) : (
                <Save aria-hidden="true" className="size-3.5" />
              )}
              {savedItemId === selectedItem.id
                ? "Draft saved"
                : "Save content draft"}
            </Button>
          </div>
        </main>
      </div>

      <ClassContentDialog
        open={newContentOpen}
        onOpenChange={setNewContentOpen}
        form={newContentForm}
        onFormChange={setNewContentForm}
        onSubmit={handleNewContentSubmit}
      />
    </div>
  )
}

function ClassContentDialog({
  open,
  onOpenChange,
  form,
  onFormChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: NewClassInformationForm
  onFormChange: (form: NewClassInformationForm) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-hidden max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-xl overflow-y-auto bg-card sm:max-h-[calc(100dvh-2rem)]">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle>Add class content</DialogTitle>
          <DialogDescription>
            Add a new training option to the Classes content library. You can
            add benefits and best-for points after creating it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 pt-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <ClassField label="Content category" htmlFor="new-class-category">
              <select
                id="new-class-category"
                value={form.category}
                onChange={(event) =>
                  onFormChange({
                    ...form,
                    category: event.target.value as ClassInformationCategory,
                  })
                }
                className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
              >
                {CLASS_INFORMATION_CATEGORY_ORDER.map((categoryId) => (
                  <option key={categoryId} value={categoryId}>
                    {CLASS_INFORMATION_CATEGORY_CONFIG[categoryId].label}
                  </option>
                ))}
              </select>
            </ClassField>
            <ClassField label="Eyebrow" htmlFor="new-class-eyebrow">
              <Input
                id="new-class-eyebrow"
                value={form.eyebrow}
                onChange={(event) =>
                  onFormChange({ ...form, eyebrow: event.target.value })
                }
                placeholder="e.g. Strength training"
              />
            </ClassField>
          </div>
          <ClassField label="Title" htmlFor="new-class-title">
            <Input
              id="new-class-title"
              value={form.title}
              onChange={(event) =>
                onFormChange({ ...form, title: event.target.value })
              }
              placeholder="e.g. Youth Boxing"
              required
            />
          </ClassField>
          <ClassField label="Description" htmlFor="new-class-description">
            <Textarea
              id="new-class-description"
              value={form.description}
              onChange={(event) =>
                onFormChange({ ...form, description: event.target.value })
              }
              placeholder="Describe what this option offers..."
              className="min-h-28 resize-y text-sm leading-6"
            />
          </ClassField>
          <div className="grid gap-4 sm:grid-cols-2">
            <ClassField label="CTA label" htmlFor="new-class-cta-label">
              <Input
                id="new-class-cta-label"
                value={form.ctaLabel}
                onChange={(event) =>
                  onFormChange({ ...form, ctaLabel: event.target.value })
                }
                placeholder="Learn More"
              />
            </ClassField>
            <ClassField label="CTA link" htmlFor="new-class-cta-href">
              <Input
                id="new-class-cta-href"
                value={form.ctaHref}
                onChange={(event) =>
                  onFormChange({ ...form, ctaHref: event.target.value })
                }
                placeholder="/schedule"
              />
            </ClassField>
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
              <Plus aria-hidden="true" className="size-3.5" />
              Add content
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ClassMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
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

function CategoryFilter({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-left text-[11px] font-medium transition-colors",
        active
          ? "bg-gold/10 text-gold"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      {label}
      <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
        {count}
      </span>
    </button>
  )
}

function EditorHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border px-4 py-3.5 sm:px-5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-gold">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-gold uppercase">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function ClassField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint && (
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
    </div>
  )
}

function TagEditor({
  title,
  description,
  values,
  draft,
  placeholder,
  onDraftChange,
  onAdd,
  onRemove,
}: {
  title: string
  description: string
  values: string[]
  draft: string
  placeholder: string
  onDraftChange: (value: string) => void
  onAdd: () => void
  onRemove: (value: string) => void
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-start gap-3 border-b border-border px-4 py-3.5 sm:px-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <Sparkles aria-hidden="true" className="size-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex min-h-8 flex-wrap gap-2">
          {values.map((value) => (
            <Badge
              key={value}
              variant="outline"
              className="gap-1.5 border-gold/25 bg-gold/5 py-1.5 pr-1.5 pl-2.5 text-[11px] text-foreground"
            >
              <span className="size-1.5 rounded-full bg-gold" />
              {value}
              <button
                type="button"
                aria-label={`Remove ${value}`}
                onClick={() => onRemove(value)}
                className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 aria-hidden="true" className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                onAdd()
              }
            }}
            placeholder={placeholder}
            className="sm:max-w-sm"
          />
          <Button
            type="button"
            variant="outline"
            className="gap-1.5"
            onClick={onAdd}
          >
            <Plus aria-hidden="true" className="size-3.5" />
            Add point
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ClassInformationSection
