import Image from "next/image";
import Link from "next/link";
import { SidebarHeader } from "@/components/ui/sidebar";
import type { SidebarBrand as SidebarBrandData } from "../types/navigation.types";

interface SidebarBrandProps {
  brand: SidebarBrandData;
}

export function SidebarBrand({ brand }: SidebarBrandProps) {
  const brandLabel = [brand.name, brand.subtitle]
    .filter(Boolean)
    .join(" ");

  return (
    <SidebarHeader
      className="
        h-24 shrink-0
        justify-center
        border-b border-sidebar-border
        px-3 py-3
        transition-[height,padding] duration-200
        motion-reduce:transition-none
        group-data-[collapsible=icon]:h-16
        group-data-[collapsible=icon]:px-2
        group-data-[collapsible=icon]:py-2
      "
    >
      <Link
        href="/dashboard"
        aria-label={`${brandLabel} Dashboard`}
        title={brandLabel}
        className="
          flex h-full w-full min-w-0
          items-center justify-center
          rounded-md
          outline-none
          transition-colors duration-150
          hover:bg-sidebar-accent
          focus-visible:ring-2
          focus-visible:ring-sidebar-ring
          focus-visible:ring-offset-2
          focus-visible:ring-offset-sidebar
          motion-reduce:transition-none
        "
      >
        {/* Expanded: original horizontal logo */}
        <span
          className="
            flex h-full w-full min-w-0
            items-center justify-center
            group-data-[collapsible=icon]:hidden
          "
        >
          {brand.logoUrl ? (
            <Image
              src={brand.logoUrl}
              alt=""
              width={220}
              height={72}
              priority
              sizes="220px"
              className="
                block h-auto w-auto
                max-h-16 max-w-full
                object-contain
                select-none
              "
            />
          ) : (
            <span
              className="
                truncate text-lg font-bold
                tracking-wide text-sidebar-foreground
              "
            >
              {brand.name}
            </span>
          )}
        </span>

        {/* Collapsed: gold R */}
        <span
          aria-hidden="true"
          className="
            hidden size-8 shrink-0
            items-center justify-center
            text-2xl font-bold
            leading-none tracking-tight
            text-gold
            transition-colors duration-150
            group-data-[collapsible=icon]:flex
            group-hover:text-gold-hover
            motion-reduce:transition-none
          "
        >
          R
        </span>
      </Link>
    </SidebarHeader>
  );
}