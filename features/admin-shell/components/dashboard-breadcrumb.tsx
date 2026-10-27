"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { sidebarNavigation } from "../config/navigation.config";

import type {
  SidebarNavGroup,
} from "../types/navigation.types";

interface DashboardBreadcrumbProps {
  currentPageLabel?: string;
}

interface BreadcrumbEntry {
  label: string;
  href: string;
}

const navigationGroups: readonly SidebarNavGroup[] =
  sidebarNavigation;

const navigationRoutes = navigationGroups
  .flatMap((group) => group.items)
  .map((item) => ({
    href: normalizePath(item.href),
    label: item.title,
  }))
  .sort((a, b) => b.href.length - a.href.length);

  function normalizePath(path: string): string {
  if (path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "") || "/";
}

function formatSegment(segment: string): string {
  let decoded = segment;

  try {
    decoded = decodeURIComponent(segment);
  } catch {
    // Keep the original segment if it is malformed.
  }

  const isNumericId = /^\d+$/.test(decoded);

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      decoded,
    );

  if (isNumericId || isUuid) {
    return "Details";
  }

  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildBreadcrumbs(
  pathname: string,
  currentPageLabel?: string,
): BreadcrumbEntry[] {
  const currentPath = normalizePath(pathname);

  const dashboard: BreadcrumbEntry = {
    label: "Dashboard",
    href: "/dashboard",
  };

  if (
    currentPath === "/" ||
    currentPath === "/dashboard"
  ) {
    return [dashboard];
  }

  const matchedRoute = navigationRoutes.find(
    (route) =>
      currentPath === route.href ||
      currentPath.startsWith(`${route.href}/`),
  );

  const entries: BreadcrumbEntry[] = [dashboard];

  if (
    matchedRoute &&
    matchedRoute.href !== "/dashboard"
  ) {
    entries.push({
      label: matchedRoute.label,
      href: matchedRoute.href,
    });
  }

  const remainingPath = matchedRoute
    ? currentPath.slice(matchedRoute.href.length)
    : currentPath;

  const segments = remainingPath
    .split("/")
    .filter(Boolean);

  let parentPath = matchedRoute?.href ?? "";

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;

    parentPath = `${parentPath}/${segment}`.replace(
      /\/+/g,
      "/",
    );

    entries.push({
      label:
        isLast && currentPageLabel
          ? currentPageLabel
          : formatSegment(segment),
      href: parentPath,
    });
  });

  return entries;
}

export function DashboardBreadcrumb({
  currentPageLabel,
}: DashboardBreadcrumbProps) {
  const pathname = usePathname();

  const items = buildBreadcrumbs(
    pathname,
    currentPageLabel,
  );

  return (
    <Breadcrumb className="min-w-0">
      <BreadcrumbList
        className="
          flex-nowrap
          gap-1.5
          text-xs
          sm:gap-2
          sm:text-sm
        "
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <Fragment key={item.href}>
              {!isFirst && (
                <BreadcrumbSeparator
                  className="hidden sm:block"
                />
              )}

              <BreadcrumbItem
                className={
                  isLast
                    ? "min-w-0"
                    : "hidden sm:flex"
                }
              >
                {isLast ? (
                  <BreadcrumbPage
                    title={item.label}
                    className="
                      max-w-45
                      truncate
                      font-medium
                      text-foreground
                      sm:max-w-80
                    "
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={
                      <Link href={item.href} />
                    }
                    className="
                      max-w-40
                      truncate
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                      focus-visible:rounded-sm
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                      motion-reduce:transition-none
                    "
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}