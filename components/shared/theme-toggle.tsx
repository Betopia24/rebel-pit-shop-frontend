"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
}

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "h-8.5 w-18.5 rounded-full bg-[#0E3043]",
          className
        )}
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative block h-8.5 w-18.5 shrink-0",
        "overflow-hidden rounded-full",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/60",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "shadow-[0_6px_12px_rgba(0,0,0,0.22)]",
        className
      )}
    >
      {/* NIGHT SCENE */}
      <svg
        viewBox="0 0 240 110"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full",
          "transition-opacity duration-500 ease-in-out",
          isDark ? "opacity-100" : "opacity-0"
        )}
      >
        <rect
          width="240"
          height="110"
          rx="55"
          fill="#0E3043"
        />

        {/* stars */}
        <g fill="#FFFFFF">
          <circle cx="112" cy="18" r="2.2" />
          <circle cx="139" cy="25" r="1.8" />
          <circle cx="169" cy="17" r="2" />
          <circle cx="195" cy="27" r="1.8" />
          <circle cx="215" cy="51" r="2" />
          <circle cx="127" cy="51" r="1.7" />
          <circle cx="154" cy="61" r="2" />
          <circle cx="189" cy="68" r="1.7" />
          <circle cx="219" cy="77" r="2" />
          <circle cx="104" cy="38" r="1.4" />
        </g>

        {/* moon */}
        <circle
          cx="188"
          cy="39"
          r="26"
          fill="#FFFFFF"
        />

        <circle
          cx="176"
          cy="28"
          r="26"
          fill="#0E3043"
        />

        {/* night mountains - back */}
        <path
          d="
            M56 110
            L92 73
            L116 90
            L145 60
            L179 88
            L206 73
            L240 86
            L240 110
            Z
          "
          fill="#6D8A9A"
        />

        {/* night mountains - front */}
        <path
          d="
            M47 110
            L83 85
            L107 105
            L128 89
            L159 110
            L192 91
            L212 101
            L240 88
            L240 110
            Z
          "
          fill="#466981"
        />

        <path
          d="
            M85 110
            L105 98
            L122 110
            Z

            M163 110
            L187 99
            L203 110
            Z
          "
          fill="#243F52"
        />
      </svg>

      {/* DAY SCENE */}
      <svg
        viewBox="0 0 240 110"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full",
          "transition-opacity duration-500 ease-in-out",
          isDark ? "opacity-0" : "opacity-100"
        )}
      >
        <rect
          width="240"
          height="110"
          rx="55"
          fill="#FFEB8A"
        />

        {/* sun glow */}
        <circle
          cx="55"
          cy="42"
          r="38"
          fill="#FFF3B7"
          opacity="0.42"
        />

        <circle
          cx="55"
          cy="42"
          r="31"
          fill="#FFF6C9"
          opacity="0.65"
        />

        <circle
          cx="55"
          cy="42"
          r="23"
          fill="#FFFFFF"
        />

        {/* day mountains - back */}
        <path
          d="
            M0 110
            L36 74
            L57 90
            L89 58
            L121 88
            L151 68
            L190 105
            L240 90
            L240 110
            Z
          "
          fill="#F9C341"
        />

        {/* day mountains - front */}
        <path
          d="
            M0 110
            L30 89
            L52 105
            L75 88
            L104 110
            L132 95
            L160 110
            L195 99
            L218 110
            L240 96
            L240 110
            Z
          "
          fill="#EAA625"
        />
      </svg>

      {/* WHITE SLIDING THUMB */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0.75 top-0.75",
          "size-7 rounded-full bg-white",
          "shadow-[0_2px_5px_rgba(0,0,0,0.10)]",
          "transform-gpu",
          "transition-transform duration-500",
          "ease-in-out",
          "will-change-transform",
          isDark
            ? "translate-x-0"
            : "translate-x-10"
        )}
      />
    </button>
  )
}