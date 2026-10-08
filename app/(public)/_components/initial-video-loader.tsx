"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function InitialVideoLoader() {
  const pathname = usePathname()

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]")

    if (!video) return

    video.pause()
    video.muted = true
    video.playsInline = true
    video.autoplay = true

    let playbackStarted = false
    let retryId: number | undefined

    const startPlayback = () => {
      if (playbackStarted || video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) return

      playbackStarted = true
      void video.play().catch(() => {
        playbackStarted = false
        retryId = window.setTimeout(startPlayback, 250)
      })
    }

    const bufferCheckId = window.setInterval(startPlayback, 100)
    video.addEventListener("loadeddata", startPlayback)
    video.addEventListener("canplay", startPlayback)
    video.addEventListener("canplaythrough", startPlayback)
    video.load()

    return () => {
      window.clearInterval(bufferCheckId)
      if (retryId) window.clearTimeout(retryId)
      video.removeEventListener("loadeddata", startPlayback)
      video.removeEventListener("canplay", startPlayback)
      video.removeEventListener("canplaythrough", startPlayback)
    }
  }, [pathname])

  return null
}
