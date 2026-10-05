import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
  variant?: "header" | "footer"
  className?: string
  priority?: boolean
}

const logos = {
  header: {
    src: "/images/branding/rebel-boxing-logo.webp",
    width: 140,
    height: 52,
  },
  footer: {
    src: "/images/branding/rebel-boxing-logo-white.webp",
    width: 180,
    height: 70,
  },
} as const

export function Logo({
  variant = "header",
  className,
  priority = false,
}: LogoProps) {
  const logo = logos[variant]

  return (
    <Link
      href="/"
      aria-label="Rebel Boxing Club home"
      className="inline-flex shrink-0"
    >
      <Image
        src={logo.src}
        alt="Rebel Boxing Club"
        width={logo.width}
        height={logo.height}
        priority={priority}
        className={cn("h-auto w-auto object-contain", className)}
      />
    </Link>
  )
}