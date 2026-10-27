import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children?: ReactNode;
    className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section
      aria-label={`${title} page header`}
      className={cn(
        "flex w-full min-w-0 flex-col gap-4",
        className,
      )}
    >
      <div
        className="
          flex min-w-0 flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:gap-6
        "
      >
        {/* Page title and description */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <h1
            className="
              text-xl font-semibold
              tracking-tight
              text-foreground
              sm:text-2xl
            "
          >
            {title}
          </h1>

          {description && (
            <p
              className="
                max-w-3xl
                text-sm leading-relaxed
                text-muted-foreground
              "
            >
              {description}
            </p>
          )}
        </div>

        {/* Optional page actions */}
        {actions && (
          <div
            className="
              flex w-full shrink-0
              flex-wrap items-center
              gap-2
              sm:w-auto
              sm:justify-end
            "
          >
            {actions}
          </div>
        )}
      </div>

      {/* Optional tabs or additional controls */}
      {children && (
        <div className="min-w-0">
          {children}
        </div>
      )}
    </section>
  );
}