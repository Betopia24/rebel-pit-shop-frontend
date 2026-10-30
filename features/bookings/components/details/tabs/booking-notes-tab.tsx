"use client";

import { useEffect, useState } from "react";

import {
  Check,
  FileText,
  LockKeyhole,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import type {
  BookingNote,
  BookingNotesData,
} from "../../../types/booking-details.types";


export type BookingNoteVisibility =
  BookingNote["visibility"];

export interface BookingNoteInput {
  content: string;
  visibility: BookingNoteVisibility;
}

export interface BookingNotesTabProps {
    data: BookingNotesData;
    timezone: string;
    onAddNote?: (input: BookingNoteInput) => void;
    onUpdateNote?: (
        noteId: BookingNote["id"],
        input: BookingNoteInput,
    ) => void;
    onDeleteNote?: (
        noteId: BookingNote["id"],
    ) => void;
    canAddNote?: boolean;
    canCreateCustomerVisibleNotes?: boolean;
    isAddingNote?: boolean;
    updatingNoteIds?: readonly BookingNote["id"][];
    deletingNoteIds?: readonly BookingNote["id"][];
    disabled?: boolean;
    className?: string;
}

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_NOTE_LENGTH = 2000;

const DEFAULT_VISIBILITY:
  BookingNoteVisibility = "internal";

/* ============================================================
   HELPERS
============================================================ */

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

function formatDateTime(
  value: string | null | undefined,
  timezone: string,
): string {
  if (!value) return "Not available";

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return "Not available";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    }).format(date);
  } catch {
    return "Not available";
  }
}

function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  return new Intl.NumberFormat("en-US").format(
    Math.trunc(value),
  );
}

function normalizeContent(
  content: string,
): string {
  return content.trim();
}

/* ============================================================
   VISIBILITY BADGE
============================================================ */

function NoteVisibilityBadge({
  visibility,
}: {
  visibility: BookingNoteVisibility;
}) {
  const isInternal =
    visibility === "internal";

  const Icon = isInternal
    ? LockKeyhole
    : UsersRound;

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 w-fit gap-1 rounded-md",
        "px-1.5 text-[10px]",
        "font-medium shadow-none",
        isInternal
          ? "border-warning/20 bg-warning/10 text-warning"
          : "border-success/20 bg-success/10 text-success",
      )}
    >
      <Icon
        aria-hidden="true"
        className="size-3"
      />

      {isInternal
        ? "Internal"
        : "Customer Visible"}
    </Badge>
  );
}

/* ============================================================
   VISIBILITY SELECTOR
============================================================ */

function NoteVisibilitySelect({
  value,
  onChange,
  allowCustomerVisible,
  disabled,
}: {
  value: BookingNoteVisibility;
  onChange: (
    next: BookingNoteVisibility,
  ) => void;
  allowCustomerVisible: boolean;
  disabled: boolean;
}) {
  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(next) => {
        if (
          next === "internal" ||
          (next === "customer_visible" &&
            allowCustomerVisible)
        ) {
          onChange(next);
        }
      }}
    >
      <SelectTrigger
        aria-label="Note visibility"
        size="sm"
        className={cn(
          "h-8 w-auto min-w-32",
          "border-border bg-background",
          "text-[11px]",
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="start">
        <SelectItem value="internal">
          Internal Note
        </SelectItem>

        {allowCustomerVisible && (
          <SelectItem value="customer_visible">
            Customer Visible
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

/* ============================================================
   ADD NOTE COMPOSER
============================================================ */

interface AddNoteComposerProps {
  onAddNote: (
    input: BookingNoteInput,
  ) => void;

  allowCustomerVisible: boolean;

  isSubmitting: boolean;

  disabled: boolean;
}

function AddNoteComposer({
  onAddNote,
  allowCustomerVisible,
  isSubmitting,
  disabled,
}: AddNoteComposerProps) {
  const [expanded, setExpanded] =
    useState(false);

  const [content, setContent] =
    useState("");

  const [visibility, setVisibility] =
    useState<BookingNoteVisibility>(
      DEFAULT_VISIBILITY,
    );

  const normalizedContent =
    normalizeContent(content);

  const canSubmit =
    normalizedContent.length > 0 &&
    normalizedContent.length <=
      MAX_NOTE_LENGTH &&
    !disabled &&
    !isSubmitting;

  const handleCancel = () => {
    if (isSubmitting) return;

    setExpanded(false);
    setContent("");
    setVisibility(DEFAULT_VISIBILITY);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    onAddNote({
      content: normalizedContent,
      visibility,
    });

  };

  return (
    <div
      className={cn(
        "rounded-lg border border-border",
        "bg-card",
      )}
    >
      {!expanded ? (
        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={() => setExpanded(true)}
          className={cn(
            "h-10 w-full justify-start",
            "gap-2 rounded-lg px-3",
            "text-[11px] font-medium",
            "text-muted-foreground",
            "hover:text-foreground",
          )}
        >
          <Plus
            aria-hidden="true"
            className="size-3.5"
          />

          Add a note...
        </Button>
      ) : (
        <div className="space-y-3 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-[11px] font-semibold text-foreground">
              New Note
            </h4>

            <NoteVisibilitySelect
              value={visibility}
              onChange={setVisibility}
              allowCustomerVisible={
                allowCustomerVisible
              }
              disabled={
                disabled || isSubmitting
              }
            />
          </div>

          <Textarea
            aria-label="New booking note"
            placeholder="Write a booking note..."
            value={content}
            maxLength={MAX_NOTE_LENGTH}
            disabled={disabled || isSubmitting}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            className={cn(
              "min-h-25 resize-y",
              "rounded-md border-border",
              "bg-background",
              "text-[11px] leading-relaxed",
            )}
          />

          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {content.length}/{MAX_NOTE_LENGTH}
            </span>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSubmitting}
                onClick={handleCancel}
                className="h-7 text-[11px]"
              >
                Cancel
              </Button>

              <Button
                type="button"
                size="sm"
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="h-7 gap-1.5 text-[11px]"
              >
                <Check className="size-3.5" />

                {isSubmitting
                  ? "Saving..."
                  : "Add Note"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   EDIT NOTE COMPOSER
============================================================ */

interface EditNoteComposerProps {
  note: BookingNote;

  onSave: (
    input: BookingNoteInput,
  ) => void;

  onCancel: () => void;

  allowCustomerVisible: boolean;

  isSubmitting: boolean;

  disabled: boolean;
}

function EditNoteComposer({
  note,
  onSave,
  onCancel,
  allowCustomerVisible,
  isSubmitting,
  disabled,
}: EditNoteComposerProps) {
  const [content, setContent] =
    useState(note.content);

  const [visibility, setVisibility] =
    useState<BookingNoteVisibility>(
      note.visibility,
    );

  const normalizedContent =
    normalizeContent(content);

  const hasChanges =
    normalizedContent !== note.content.trim() ||
    visibility !== note.visibility;

  const canSave =
    hasChanges &&
    normalizedContent.length > 0 &&
    normalizedContent.length <=
      MAX_NOTE_LENGTH &&
    !disabled &&
    !isSubmitting;

  return (
    <div className="space-y-3">
      <NoteVisibilitySelect
        value={visibility}
        onChange={setVisibility}
        allowCustomerVisible={
          allowCustomerVisible ||
          note.visibility ===
            "customer_visible"
        }
        disabled={disabled || isSubmitting}
      />

      <Textarea
        aria-label="Edit booking note"
        value={content}
        maxLength={MAX_NOTE_LENGTH}
        disabled={disabled || isSubmitting}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        className={cn(
          "min-h-25 resize-y",
          "rounded-md border-border",
          "bg-background text-[11px]",
          "leading-relaxed",
        )}
      />

      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {content.length}/{MAX_NOTE_LENGTH}
        </span>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isSubmitting}
            onClick={onCancel}
            className="h-7 gap-1 text-[11px]"
          >
            <X className="size-3" />
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={!canSave}
            onClick={() => {
              onSave({
                content: normalizedContent,
                visibility,
              });
            }}
            className="h-7 gap-1 text-[11px]"
          >
            <Check className="size-3" />

            {isSubmitting
              ? "Saving..."
              : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NOTE CARD
============================================================ */

interface NoteCardProps {
  note: BookingNote;

  timezone: string;

  onUpdateNote?: BookingNotesTabProps["onUpdateNote"];

  onDeleteNote?: BookingNotesTabProps["onDeleteNote"];

  allowCustomerVisible: boolean;

  isUpdating: boolean;

  isDeleting: boolean;

  disabled: boolean;
}

function NoteCard({
  note,
  timezone,
  onUpdateNote,
  onDeleteNote,
  allowCustomerVisible,
  isUpdating,
  isDeleting,
  disabled,
}: NoteCardProps) {
  const [editing, setEditing] =
    useState(false);

  const authorName =
    note.author.name.trim() ||
    "Unknown Author";

  const createdAt = formatDateTime(
    note.createdAt,
    timezone,
  );

  const updatedAt = note.updatedAt
    ? formatDateTime(
        note.updatedAt,
        timezone,
      )
    : null;

  const canEdit =
    note.canEdit &&
    Boolean(onUpdateNote) &&
    !disabled &&
    !isDeleting;

  const canDelete =
    note.canDelete &&
    Boolean(onDeleteNote) &&
    !disabled &&
    !isUpdating &&
    !isDeleting;

  return (
    <article
      className={cn(
        "min-w-0 rounded-lg",
        "border border-border bg-card",
        "p-3",
      )}
    >
      {/* ======================================================
          NOTE HEADER
      ====================================================== */}

      <div className="flex items-start gap-2.5">
        <Avatar className="size-8 shrink-0">
          {note.author.avatarUrl && (
            <AvatarImage
              src={note.author.avatarUrl}
              alt={authorName}
            />
          )}

          <AvatarFallback className="bg-muted text-[10px] font-semibold text-foreground">
            {getInitials(authorName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-foreground">
              {authorName}
            </span>

            <NoteVisibilityBadge
              visibility={note.visibility}
            />
          </div>

          <p className="text-[10px] text-muted-foreground">
            {createdAt}

            {updatedAt &&
              ` · Edited ${updatedAt}`}
          </p>
        </div>

        {/* Note actions */}
        {(canEdit || canDelete) && !editing && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={
                    disabled ||
                    isUpdating ||
                    isDeleting
                  }
                  aria-label={`Actions for note by ${authorName}`}
                  className="size-7 shrink-0 text-muted-foreground"
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="min-w-35"
            >
              {canEdit && (
                <DropdownMenuItem
                  onClick={() => {
                    setEditing(true);
                  }}
                  className="gap-2 text-xs"
                >
                  <Pencil className="size-3.5" />
                  Edit Note
                </DropdownMenuItem>
              )}

              {canEdit && canDelete && (
                <DropdownMenuSeparator />
              )}

              {canDelete && (
                <DropdownMenuItem
                  onClick={() => {
                    onDeleteNote?.(note.id);
                  }}
                  className="gap-2 text-xs text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  Delete Note
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* ======================================================
          NOTE CONTENT
      ====================================================== */}

      <div className="mt-3">
        {editing ? (
          <EditNoteComposer
            key={note.id}
            note={note}
            allowCustomerVisible={
              allowCustomerVisible
            }
            isSubmitting={isUpdating}
            disabled={disabled}
            onCancel={() => {
              setEditing(false);
            }}
            onSave={(input) => {
              onUpdateNote?.(
                note.id,
                input,
              );
            }}
          />
        ) : (
          <p className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-foreground">
            {note.content}
          </p>
        )}
      </div>

      {isDeleting && (
        <p
          role="status"
          className="mt-2 text-[10px] text-muted-foreground"
        >
          Deleting note...
        </p>
      )}
    </article>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function NotesEmptyState({
  hasUnloadedNotes,
}: {
  hasUnloadedNotes: boolean;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-40 flex-col",
        "items-center justify-center",
        "gap-2 rounded-lg",
        "border border-dashed border-border",
        "bg-muted/15 px-5 py-6",
        "text-center",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <FileText className="size-4 text-muted-foreground" />
      </div>

      <h4 className="text-[11px] font-semibold text-foreground">
        {hasUnloadedNotes
          ? "Note details unavailable"
          : "No booking notes yet"}
      </h4>

      <p className="max-w-64 text-[10px] leading-relaxed text-muted-foreground">
        {hasUnloadedNotes
          ? "This booking has notes, but their full records have not been loaded."
          : "Add a note to keep important booking information organized."}
      </p>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingNotesTab({
  data,
  timezone,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  canAddNote = false,
  canCreateCustomerVisibleNotes = false,
  isAddingNote = false,
  updatingNoteIds = [],
  deletingNoteIds = [],
  disabled = false,
  className,
}: BookingNotesTabProps) {
  const updatingSet = new Set(
    updatingNoteIds,
  );

  const deletingSet = new Set(
    deletingNoteIds,
  );

  const notes = [...data.items].sort(
    (a, b) =>
      Date.parse(b.createdAt) -
      Date.parse(a.createdAt),
  );

  const missingCount = Math.max(
    0,
    data.totalCount - notes.length,
  );

  const canCreate =
    canAddNote &&
    Boolean(onAddNote) &&
    !disabled;

  return (
    <div
      className={cn(
        "min-w-0 space-y-4 pb-4",
        className,
      )}
    >
      {/* ======================================================
          NOTES HEADER
      ====================================================== */}

      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <FileText
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          Booking Notes
        </h3>

        <Badge
          variant="outline"
          className={cn(
            "h-5 rounded-md",
            "border-border bg-muted/30",
            "px-1.5 text-[10px]",
            "font-medium text-muted-foreground",
          )}
        >
          {formatCount(data.totalCount)}
        </Badge>
      </div>

      {/* ======================================================
          ADD NOTE
      ====================================================== */}

      {canCreate && onAddNote && (
        <AddNoteComposer
          onAddNote={onAddNote}
          allowCustomerVisible={
            canCreateCustomerVisibleNotes
          }
          isSubmitting={isAddingNote}
          disabled={disabled}
        />
      )}

      {/* ======================================================
          NOTES LIST
      ====================================================== */}

      {notes.length === 0 ? (
        <NotesEmptyState
          hasUnloadedNotes={
            data.totalCount > 0
          }
        />
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              timezone={timezone}
              onUpdateNote={onUpdateNote}
              onDeleteNote={onDeleteNote}
              allowCustomerVisible={
                canCreateCustomerVisibleNotes
              }
              isUpdating={updatingSet.has(
                note.id,
              )}
              isDeleting={deletingSet.has(
                note.id,
              )}
              disabled={disabled}
            />
          ))}

          {missingCount > 0 && (
            <p
              role="status"
              className="rounded-md border border-dashed border-border px-3 py-2.5 text-center text-[10px] text-muted-foreground"
            >
              {formatCount(missingCount)} additional{" "}
              {missingCount === 1
                ? "note is"
                : "notes are"}{" "}
              not loaded.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingNotesTab;