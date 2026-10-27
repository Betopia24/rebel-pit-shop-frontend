import Image from "next/image"
import Link from "next/link"
import { SidebarHeader } from "@/components/ui/sidebar"
import type { SidebarBrand as SidebarBrandData } from "../types/navigation.types"

interface SidebarBrandProps {
  brand: SidebarBrandData
}

export function SidebarBrand({ brand }: SidebarBrandProps) {
  const brandLabel = [brand.name, brand.subtitle].filter(Boolean).join(" ")

  return (
    <SidebarHeader className="h-24 shrink-0 justify-center border-b border-sidebar-border px-3 py-3 transition-[height,padding] duration-200 group-data-[collapsible=icon]:h-16 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2 motion-reduce:transition-none">
      <Link
        href="/dashboard"
        aria-label={`${brandLabel} Dashboard`}
        title={brandLabel}
        className="flex h-full w-full min-w-0 items-center justify-center rounded-md transition-colors duration-150 outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar motion-reduce:transition-none"
      >
        {/* Expanded: original horizontal logo */}
        <span className="flex h-full w-full min-w-0 items-center justify-center group-data-[collapsible=icon]:hidden">
          {brand.logoUrl ? (
            <Image
              src={brand.logoUrl}
              alt=""
              width={220}
              height={72}
              priority
              sizes="220px"
              style={{
                width: "auto",
                height: "auto",
              }}
              className="block h-auto max-h-16 w-auto max-w-full object-contain select-none"
            />
          ) : (
            <span className="truncate text-lg font-bold tracking-wide text-sidebar-foreground">
              {brand.name}
            </span>
          )}
        </span>

        {/* Collapsed: gold R */}
        <span
          aria-hidden="true"
          className="hidden size-8 shrink-0 items-center justify-center text-2xl leading-none font-bold tracking-tight text-gold transition-colors duration-150 group-hover:text-gold-hover group-data-[collapsible=icon]:flex motion-reduce:transition-none"
        >
          R
        </span>
      </Link>
    </SidebarHeader>
  )
}
