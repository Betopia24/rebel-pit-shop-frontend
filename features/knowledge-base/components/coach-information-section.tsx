"use client"

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react"

import Link from "next/link"

import {
  Bold,
  Check,
  ExternalLink,
  Eye,
  Heading2,
  Image as ImageIcon,
  Italic,
  List,
  Plus,
  Save,
  Sparkles,
  Trash2,
  UserRound,
  X,
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

import { CoachBiographyMarkdown } from "@/features/about/components/coach-biography-markdown"

import { COACH_INFORMATION_SOURCE } from "../data/coach-information.mock"

import type { Coach } from "@/features/about/types"

const INITIAL_COACHES: Coach[] = COACH_INFORMATION_SOURCE.map((coach) => ({
  ...coach,
  image: { ...coach.image },
  biography: [...coach.biography],
  biographyMarkdown: coach.biographyMarkdown ?? coach.biography.join("\n\n"),
  specialties: [...coach.specialties],
}))

type NewCoachForm = {
  name: string
  role: string
  imageSrc: string
  imageAlt: string
  biographyMarkdown: string
  specialties: string[]
}

const INITIAL_NEW_COACH_FORM: NewCoachForm = {
  name: "",
  role: "Boxing Coach",
  imageSrc: "",
  imageAlt: "",
  biographyMarkdown: "",
  specialties: [],
}

export function CoachInformationSection() {
  const [coaches, setCoaches] = useState<Coach[]>(INITIAL_COACHES)
  const [selectedCoachId, setSelectedCoachId] = useState(
    INITIAL_COACHES[0]?.id ?? ""
  )
  const [specialtyDraft, setSpecialtyDraft] = useState("")
  const [savedCoachId, setSavedCoachId] = useState<string | null>(null)
  const [newCoachDialogOpen, setNewCoachDialogOpen] = useState(false)
  const [newCoachForm, setNewCoachForm] = useState<NewCoachForm>(
    INITIAL_NEW_COACH_FORM
  )
  const [newCoachFileName, setNewCoachFileName] = useState<string | null>(null)
  const [selectedCoachFileName, setSelectedCoachFileName] = useState<
    string | null
  >(null)
  const biographyEditorRef = useRef<HTMLTextAreaElement>(null)

  const selectedCoach = useMemo(
    () => coaches.find((coach) => coach.id === selectedCoachId) ?? coaches[0],
    [coaches, selectedCoachId]
  )

  const updateSelectedCoach = (updates: Partial<Coach>) => {
    if (!selectedCoach) return

    setCoaches((currentCoaches) =>
      currentCoaches.map((coach) =>
        coach.id === selectedCoach.id ? { ...coach, ...updates } : coach
      )
    )
    setSavedCoachId(null)
  }

  const handleSelectedCoachImageUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file || !selectedCoach) return

    updateSelectedCoach({
      image: {
        ...selectedCoach.image,
        src: URL.createObjectURL(file),
      },
    })
    setSelectedCoachFileName(file.name)
  }

  const updateBiographyMarkdown = (value: string) => {
    updateSelectedCoach({
      biographyMarkdown: value,
      biography: value.split(/\n\s*\n/).filter(Boolean),
    })
  }

  const insertMarkdown = (
    prefix: string,
    suffix: string,
    placeholder: string
  ) => {
    if (!selectedCoach) return

    const textarea = biographyEditorRef.current
    const value =
      selectedCoach.biographyMarkdown ?? selectedCoach.biography.join("\n\n")

    if (!textarea) {
      updateBiographyMarkdown(
        `${value}${value ? "\n\n" : ""}${prefix}${placeholder}${suffix}`
      )
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.slice(start, end) || placeholder
    const nextValue = `${value.slice(0, start)}${prefix}${selectedText}${suffix}${value.slice(end)}`

    updateBiographyMarkdown(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const nextStart = start + prefix.length
      textarea.setSelectionRange(nextStart, nextStart + selectedText.length)
    })
  }

  const addSpecialty = () => {
    const value = specialtyDraft.trim()

    if (!selectedCoach || !value || selectedCoach.specialties.includes(value))
      return

    updateSelectedCoach({ specialties: [...selectedCoach.specialties, value] })
    setSpecialtyDraft("")
  }

  const removeSpecialty = (specialty: string) => {
    if (!selectedCoach) return

    updateSelectedCoach({
      specialties: selectedCoach.specialties.filter(
        (item) => item !== specialty
      ),
    })
  }

  const handleSaveDraft = () => {
    if (!selectedCoach) return

    setSavedCoachId(selectedCoach.id)
  }

  const openNewCoachDialog = () => {
    setNewCoachForm(INITIAL_NEW_COACH_FORM)
    setNewCoachFileName(null)
    setNewCoachDialogOpen(true)
  }

  const handleNewCoachImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setNewCoachFileName(file.name)
    setNewCoachForm((currentForm) => ({
      ...currentForm,
      imageSrc: URL.createObjectURL(file),
      imageAlt:
        currentForm.imageAlt ||
        `${currentForm.name || "Coach"} of Rebel Boxing Club.`,
    }))
  }

  const handleNewCoachSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = newCoachForm.name.trim()
    const role = newCoachForm.role.trim()

    if (!name || !role) return

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const nextCoach: Coach = {
      id: `coach-${slug}-${Date.now()}`,
      slug,
      name,
      role,
      image: {
        src: newCoachForm.imageSrc.trim(),
        alt: newCoachForm.imageAlt.trim() || `${name} of Rebel Boxing Club.`,
      },
      biography: [
        newCoachForm.biographyMarkdown.trim() || "Add this coach's story here.",
      ],
      biographyMarkdown:
        newCoachForm.biographyMarkdown.trim() || "Add this coach's story here.",
      specialties: newCoachForm.specialties,
      sortOrder: coaches.length + 1,
    }

    setCoaches((currentCoaches) => [...currentCoaches, nextCoach])
    setSelectedCoachId(nextCoach.id)
    setNewCoachDialogOpen(false)
    setNewCoachForm(INITIAL_NEW_COACH_FORM)
    setNewCoachFileName(null)
  }

  if (!selectedCoach) return null

  const biographyMarkdown =
    selectedCoach.biographyMarkdown ?? selectedCoach.biography.join("\n\n")

  return (
    <div className="space-y-5 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <UserRound aria-hidden="true" className="size-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Coach information
              </h2>
              <Badge
                variant="outline"
                className="border-gold/25 bg-gold/10 text-gold"
              >
                Draft content
              </Badge>
            </div>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
              Edit the coach profiles that appear in the Meet the Rebels section
              of your About page.
            </p>
          </div>
        </div>
        <Link
          href="/about#meet-the-rebels"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "gap-2 self-start"
          )}
        >
          Preview About page
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <CoachMetric
          label="Published profiles"
          value={coaches.length}
          icon={UserRound}
        />
        <CoachMetric
          label="Specialties listed"
          value={coaches.reduce(
            (total, coach) => total + coach.specialties.length,
            0
          )}
          icon={Sparkles}
        />
        <CoachMetric
          label="Biography sections"
          value={coaches.reduce(
            (total, coach) => total + coach.biography.length,
            0
          )}
          icon={Check}
        />
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)]">
        <aside className="min-w-0 rounded-xl border border-border bg-background">
          <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3.5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Team profiles
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Select a coach to edit their public content.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Add a new coach"
              onClick={openNewCoachDialog}
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </Button>
          </div>
          <div className="space-y-1.5 p-2">
            {coaches.map((coach) => (
              <button
                key={coach.id}
                type="button"
                onClick={() => {
                  setSelectedCoachId(coach.id)
                  setSavedCoachId(null)
                  setSpecialtyDraft("")
                  setSelectedCoachFileName(null)
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                  coach.id === selectedCoach.id
                    ? "border-gold/30 bg-gold/10"
                    : "border-transparent hover:border-border hover:bg-muted/40"
                )}
              >
                <Avatar className="size-9 shrink-0 border border-border">
                  <AvatarImage src={coach.image.src} alt="" />
                  <AvatarFallback className="bg-gold/10 text-[10px] font-semibold text-gold">
                    {coach.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-foreground">
                    {coach.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                    {coach.role}
                  </span>
                </span>
                {coach.id === selectedCoach.id && (
                  <span className="ml-auto size-1.5 shrink-0 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <EditorSectionHeader
              icon={UserRound}
              eyebrow="Section 01"
              title="Profile identity"
              description="The name, role, image, and public URL used on the About page."
            />
            <div className="grid items-start gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_180px]">
              <div className="grid h-fit content-start gap-4 self-start sm:grid-cols-2">
                <Field label="Display name" htmlFor="coach-display-name">
                  <Input
                    id="coach-display-name"
                    value={selectedCoach.name}
                    onChange={(event) =>
                      updateSelectedCoach({ name: event.target.value })
                    }
                  />
                </Field>
                <Field label="Role / title" htmlFor="coach-role">
                  <Input
                    id="coach-role"
                    value={selectedCoach.role}
                    onChange={(event) =>
                      updateSelectedCoach({ role: event.target.value })
                    }
                  />
                </Field>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="coach-slug">Profile slug</Label>
                    <Badge
                      variant="outline"
                      className="border-border px-1.5 py-0 text-[9px] text-muted-foreground"
                    >
                      Backend-managed
                    </Badge>
                  </div>
                  <Input
                    id="coach-slug"
                    value={selectedCoach.slug}
                    readOnly
                    className="cursor-not-allowed bg-muted/30 text-muted-foreground"
                  />
                  <p className="text-[10px] leading-4 text-muted-foreground">
                    Generated automatically when the coach profile is created.
                  </p>
                </div>
                <Field label="Sort order" htmlFor="coach-sort-order">
                  <Input
                    id="coach-sort-order"
                    type="number"
                    min={1}
                    value={selectedCoach.sortOrder}
                    onChange={(event) =>
                      updateSelectedCoach({
                        sortOrder: Number(event.target.value) || 1,
                      })
                    }
                  />
                </Field>
              </div>
              <div className="flex h-fit items-center gap-3 rounded-lg border border-border bg-card p-3 xl:flex-col xl:items-stretch">
                <Avatar className="size-16 shrink-0 rounded-lg border border-gold/25 xl:size-36 xl:self-center">
                  <AvatarImage
                    src={selectedCoach.image.src}
                    alt={selectedCoach.image.alt}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg bg-gold/10 text-lg font-semibold text-gold">
                    {selectedCoach.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 xl:mt-2">
                  <p className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                    <ImageIcon aria-hidden="true" className="size-3" />
                    Profile image
                  </p>
                  <p className="mt-1 truncate text-[10px] text-foreground">
                    {selectedCoachFileName || selectedCoach.image.src}
                  </p>
                  <label
                    htmlFor={`coach-image-upload-${selectedCoach.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "xs" }),
                      "mt-2 w-full cursor-pointer gap-1.5"
                    )}
                  >
                    <ImageIcon aria-hidden="true" className="size-3" />
                    Change image
                  </label>
                  <input
                    id={`coach-image-upload-${selectedCoach.id}`}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleSelectedCoachImageUpload}
                    className="sr-only"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 xl:col-span-2">
                <Field label="Image URL" htmlFor="coach-image-url">
                  <Input
                    id="coach-image-url"
                    value={selectedCoach.image.src}
                    onChange={(event) =>
                      updateSelectedCoach({
                        image: {
                          ...selectedCoach.image,
                          src: event.target.value,
                        },
                      })
                    }
                  />
                </Field>
                <Field
                  label="Image alt text"
                  htmlFor="coach-image-alt"
                  hint="Describe the image for accessibility and search engines."
                >
                  <Input
                    id="coach-image-alt"
                    value={selectedCoach.image.alt}
                    onChange={(event) =>
                      updateSelectedCoach({
                        image: {
                          ...selectedCoach.image,
                          alt: event.target.value,
                        },
                      })
                    }
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <EditorSectionHeader
              icon={Sparkles}
              eyebrow="Section 02"
              title="Biography"
              description="Write one rich Markdown story. Press Enter for a new line and use the toolbar for formatting."
            />
            <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.9fr)]">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                      Markdown editor
                    </span>
                    <Badge
                      variant="outline"
                      className="border-gold/25 bg-gold/5 px-1.5 py-0 text-[9px] text-gold"
                    >
                      Saved as Markdown
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <MarkdownToolButton
                      label="Bold"
                      onClick={() => insertMarkdown("**", "**", "bold text")}
                    >
                      <Bold aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                    <MarkdownToolButton
                      label="Italic"
                      onClick={() => insertMarkdown("*", "*", "italic text")}
                    >
                      <Italic aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                    <MarkdownToolButton
                      label="Heading"
                      onClick={() =>
                        insertMarkdown("## ", "", "Section heading")
                      }
                    >
                      <Heading2 aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                    <MarkdownToolButton
                      label="Bullet list"
                      onClick={() => insertMarkdown("- ", "", "List item")}
                    >
                      <List aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                  </div>
                </div>
                <Textarea
                  ref={biographyEditorRef}
                  value={biographyMarkdown}
                  onChange={(event) =>
                    updateBiographyMarkdown(event.target.value)
                  }
                  className="min-h-64 resize-y rounded-none border-0 bg-transparent text-sm leading-7 shadow-none focus-visible:ring-0"
                  placeholder="Write the coach story here...\n\nUse **bold**, *italic*, headings, or bullet lists when helpful."
                />
                <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
                  Supports **bold**, *italic*, ## headings, - lists, and normal
                  line breaks.
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border bg-background px-3 py-2">
                  <Eye aria-hidden="true" className="size-3.5 text-gold" />
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Live preview
                  </span>
                </div>
                <CoachBiographyMarkdown
                  content={biographyMarkdown}
                  className="min-h-64 p-4 text-xs leading-6 text-muted-foreground"
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <EditorSectionHeader
              icon={Sparkles}
              eyebrow="Section 03"
              title="Areas of expertise"
              description="Add the specialties that appear as chips beneath the coach biography."
            />
            <div className="space-y-4 p-4 sm:p-5">
              <div className="flex flex-wrap gap-2">
                {selectedCoach.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="outline"
                    className="gap-1.5 border-gold/25 bg-gold/5 py-1.5 pr-1.5 pl-2.5 text-[11px] text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-gold" />
                    {specialty}
                    <button
                      type="button"
                      aria-label={`Remove ${specialty}`}
                      onClick={() => removeSpecialty(specialty)}
                      className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 aria-hidden="true" className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={specialtyDraft}
                  onChange={(event) => setSpecialtyDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      addSpecialty()
                    }
                  }}
                  placeholder="Add a specialty, e.g. Boxing"
                  className="sm:max-w-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="gap-1.5"
                  onClick={addSpecialty}
                >
                  <Plus aria-hidden="true" className="size-3.5" />
                  Add specialty
                </Button>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 rounded-xl border border-gold/20 bg-gold/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">
                Ready to save {selectedCoach.name}&apos;s profile?
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                This draft follows the future coach profile API shape.
              </p>
            </div>
            <Button
              type="button"
              className="h-9 gap-2 bg-gold text-background hover:bg-gold-hover"
              onClick={handleSaveDraft}
            >
              {savedCoachId === selectedCoach.id ? (
                <Check aria-hidden="true" className="size-3.5" />
              ) : (
                <Save aria-hidden="true" className="size-3.5" />
              )}
              {savedCoachId === selectedCoach.id
                ? "Draft saved"
                : "Save profile draft"}
            </Button>
          </div>
        </main>
      </div>

      <NewCoachDialog
        open={newCoachDialogOpen}
        onOpenChange={setNewCoachDialogOpen}
        form={newCoachForm}
        onFormChange={setNewCoachForm}
        fileName={newCoachFileName}
        onImageUpload={handleNewCoachImageUpload}
        onSubmit={handleNewCoachSubmit}
      />
    </div>
  )
}

function NewCoachDialog({
  open,
  onOpenChange,
  form,
  onFormChange,
  fileName,
  onImageUpload,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: NewCoachForm
  onFormChange: (form: NewCoachForm) => void
  fileName: string | null
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const biographyEditorRef = useRef<HTMLTextAreaElement>(null)
  const [specialtyDraft, setSpecialtyDraft] = useState("")

  const insertBiographyMarkdown = (
    prefix: string,
    suffix: string,
    placeholder: string
  ) => {
    const textarea = biographyEditorRef.current
    const value = form.biographyMarkdown

    if (!textarea) {
      onFormChange({
        ...form,
        biographyMarkdown: `${value}${value ? "\n\n" : ""}${prefix}${placeholder}${suffix}`,
      })
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.slice(start, end) || placeholder
    const nextValue = `${value.slice(0, start)}${prefix}${selectedText}${suffix}${value.slice(end)}`

    onFormChange({ ...form, biographyMarkdown: nextValue })

    requestAnimationFrame(() => {
      textarea.focus()
      const nextStart = start + prefix.length
      textarea.setSelectionRange(nextStart, nextStart + selectedText.length)
    })
  }

  const addSpecialty = () => {
    const value = specialtyDraft.trim()

    if (!value || form.specialties.includes(value)) return

    onFormChange({ ...form, specialties: [...form.specialties, value] })
    setSpecialtyDraft("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-hidden max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] !max-w-4xl overflow-y-auto bg-card p-5 sm:max-h-[calc(100dvh-2rem)] sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle>Add a new coach</DialogTitle>
          <DialogDescription>
            Create the profile that will appear in the Meet the Rebels section
            of the About page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-coach-name">Display name</Label>
              <Input
                id="new-coach-name"
                value={form.name}
                onChange={(event) => {
                  const name = event.target.value
                  onFormChange({
                    ...form,
                    name,
                    imageAlt:
                      form.imageAlt ||
                      `${name || "Coach"} of Rebel Boxing Club.`,
                  })
                }}
                placeholder="e.g. Jordan Lee"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-coach-role">Role / title</Label>
              <Input
                id="new-coach-role"
                value={form.role}
                onChange={(event) =>
                  onFormChange({ ...form, role: event.target.value })
                }
                placeholder="e.g. Boxing Coach"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-coach-alt">Image alt text</Label>
              <Input
                id="new-coach-alt"
                value={form.imageAlt}
                onChange={(event) =>
                  onFormChange({ ...form, imageAlt: event.target.value })
                }
                placeholder="Coach Jordan Lee of Rebel Boxing Club"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">
                Public profile URL
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                The profile slug will be generated automatically after the coach
                is saved.
              </p>
            </div>
            <Badge
              variant="outline"
              className="shrink-0 border-gold/25 bg-gold/10 text-[10px] text-gold"
            >
              Auto-generated
            </Badge>
          </div>

          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-start gap-3 border-b border-border px-3.5 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <ImageIcon aria-hidden="true" className="size-4" />
              </span>
              <div>
                <h3 className="text-xs font-semibold text-foreground">
                  Profile image
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Upload a new image or paste a hosted URL for the public
                  profile.
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-3.5 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-center">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="new-coach-image-url">Image URL</Label>
                  <Input
                    id="new-coach-image-url"
                    value={form.imageSrc}
                    onChange={(event) =>
                      onFormChange({ ...form, imageSrc: event.target.value })
                    }
                    placeholder="https://... or /images/about-us/coach.webp"
                  />
                </div>
                <label
                  htmlFor="new-coach-image-upload"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full cursor-pointer gap-2 border-dashed"
                  )}
                >
                  <ImageIcon aria-hidden="true" className="size-3.5" />
                  Upload image
                </label>
                <input
                  id="new-coach-image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={onImageUpload}
                  className="sr-only"
                />
                <p className="text-[10px] leading-4 text-muted-foreground">
                  PNG, JPG or WEBP · Recommended 800 × 800px
                </p>
                {fileName && (
                  <p className="truncate text-[10px] font-medium text-gold">
                    {fileName}
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-gold/20 bg-card p-2">
                <div className="aspect-square overflow-hidden rounded-md border border-border bg-muted/30">
                  <Avatar className="size-full rounded-md">
                    <AvatarImage
                      src={form.imageSrc}
                      alt={form.imageAlt}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-md bg-gold/10 text-lg font-semibold text-gold">
                      {form.name.slice(0, 2).toUpperCase() || "CO"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                  Preview
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-start gap-3 border-b border-border px-3.5 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Sparkles aria-hidden="true" className="size-4" />
              </span>
              <div>
                <h3 className="text-xs font-semibold text-foreground">
                  Biography
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Write the coach story with Markdown and preview it before
                  saving.
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-3.5 xl:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.9fr)]">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-3 py-2">
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Markdown editor
                  </span>
                  <div className="flex items-center gap-1">
                    <MarkdownToolButton
                      label="Bold"
                      onClick={() =>
                        insertBiographyMarkdown("**", "**", "bold text")
                      }
                    >
                      <Bold aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                    <MarkdownToolButton
                      label="Italic"
                      onClick={() =>
                        insertBiographyMarkdown("*", "*", "italic text")
                      }
                    >
                      <Italic aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                    <MarkdownToolButton
                      label="Heading"
                      onClick={() =>
                        insertBiographyMarkdown("## ", "", "Section heading")
                      }
                    >
                      <Heading2 aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                    <MarkdownToolButton
                      label="Bullet list"
                      onClick={() =>
                        insertBiographyMarkdown("- ", "", "List item")
                      }
                    >
                      <List aria-hidden="true" className="size-3.5" />
                    </MarkdownToolButton>
                  </div>
                </div>
                <Textarea
                  ref={biographyEditorRef}
                  id="new-coach-biography"
                  value={form.biographyMarkdown}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      biographyMarkdown: event.target.value,
                    })
                  }
                  placeholder="Tell members what makes this coach unique... Use **bold** when helpful."
                  className="min-h-56 resize-y rounded-none border-0 bg-transparent text-sm leading-7 shadow-none focus-visible:ring-0"
                />
                <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
                  Supports **bold**, *italic*, headings, bullet lists, and line
                  breaks.
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border bg-background px-3 py-2">
                  <Eye aria-hidden="true" className="size-3.5 text-gold" />
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Live preview
                  </span>
                </div>
                <CoachBiographyMarkdown
                  content={form.biographyMarkdown}
                  className="min-h-56 p-4 text-xs leading-6 text-muted-foreground"
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-start gap-3 border-b border-border px-3.5 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Sparkles aria-hidden="true" className="size-4" />
              </span>
              <div>
                <h3 className="text-xs font-semibold text-foreground">
                  Areas of expertise
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Add specialties as chips so visitors can scan them quickly.
                </p>
              </div>
            </div>
            <div className="space-y-3 p-3.5">
              <div className="flex min-h-8 flex-wrap gap-2">
                {form.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="outline"
                    className="gap-1.5 border-gold/25 bg-gold/5 py-1.5 pr-1.5 pl-2.5 text-[11px] text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-gold" />
                    {specialty}
                    <button
                      type="button"
                      aria-label={`Remove ${specialty}`}
                      onClick={() =>
                        onFormChange({
                          ...form,
                          specialties: form.specialties.filter(
                            (item) => item !== specialty
                          ),
                        })
                      }
                      className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X aria-hidden="true" className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="new-coach-specialty"
                  value={specialtyDraft}
                  onChange={(event) => setSpecialtyDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      addSpecialty()
                    }
                  }}
                  placeholder="e.g. Boxing"
                  className="sm:max-w-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="gap-1.5"
                  onClick={addSpecialty}
                >
                  <Plus aria-hidden="true" className="size-3.5" />
                  Add specialty
                </Button>
              </div>
            </div>
          </section>

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
              Add coach
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function MarkdownToolButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function CoachMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: typeof UserRound
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

function EditorSectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
}: {
  icon: typeof UserRound
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-gold">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-gold uppercase">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {action}
    </div>
  )
}

function Field({
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
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint && (
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
    </div>
  )
}

export default CoachInformationSection
