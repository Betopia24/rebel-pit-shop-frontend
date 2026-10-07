"use client"

import { useEffect } from "react"

const MIN_INITIAL_BUFFER_SECONDS = 3

export function InitialVideoLoader() {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]")

    if (!video) return

    video.pause()

    let playbackStarted = false

    const hasEnoughInitialBuffer = () => {
      if (video.buffered.length === 0) return false

      const bufferedEnd = video.buffered.end(video.buffered.length - 1)
      return bufferedEnd - video.currentTime >= MIN_INITIAL_BUFFER_SECONDS
    }

    const startPlayback = () => {
      if (playbackStarted || !hasEnoughInitialBuffer()) return

      playbackStarted = true
      void video.play().catch(() => {
        playbackStarted = false
      })
    }

    const checkBuffer = () => {
      if (hasEnoughInitialBuffer()) startPlayback()
    }

    const bufferCheckId = window.setInterval(checkBuffer, 100)
    video.addEventListener("loadeddata", checkBuffer)
    video.addEventListener("progress", checkBuffer)
    video.addEventListener("canplay", checkBuffer)

    return () => {
      window.clearInterval(bufferCheckId)
      video.removeEventListener("loadeddata", checkBuffer)
      video.removeEventListener("progress", checkBuffer)
      video.removeEventListener("canplay", checkBuffer)
    }
  }, [])

  return null
}
