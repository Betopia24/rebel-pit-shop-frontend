"use client"

import { useEffect, useState } from "react"
import styles from "./initial-video-loader.module.css"

const MIN_INITIAL_BUFFER_SECONDS = 2.5
const VIDEO_READY_TIMEOUT_MS = 30000

export function InitialVideoLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]")

    if (!video) {
      const noVideoId = window.setTimeout(() => setIsVisible(false), 0)
      return () => window.clearTimeout(noVideoId)
    }

    video.pause()

    let dismissed = false
    let playbackStarted = false

    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      setIsVisible(false)
    }

    const hasEnoughInitialBuffer = () => {
      if (!Number.isFinite(video.duration) || video.buffered.length === 0) {
        return false
      }

      const bufferedAhead = video.buffered.end(video.buffered.length - 1) - video.currentTime
      return bufferedAhead >= Math.min(MIN_INITIAL_BUFFER_SECONDS, video.duration)
    }

    const startPlayback = () => {
      if (playbackStarted || !hasEnoughInitialBuffer()) return

      playbackStarted = true
      void video.play().catch(() => {
        playbackStarted = false
        dismiss()
      })
    }

    const checkBuffer = () => {
      if (hasEnoughInitialBuffer()) startPlayback()
    }

    const bufferCheckId = window.setInterval(checkBuffer, 100)
    video.addEventListener("loadedmetadata", checkBuffer)
    video.addEventListener("progress", checkBuffer)
    video.addEventListener("canplay", checkBuffer)
    video.addEventListener("playing", dismiss)
    const timeoutId = window.setTimeout(() => {
      if (!playbackStarted) {
        playbackStarted = true
        void video.play().catch(() => {
          playbackStarted = false
        })
      }

      dismiss()
    }, VIDEO_READY_TIMEOUT_MS)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(bufferCheckId)
      video.removeEventListener("loadedmetadata", checkBuffer)
      video.removeEventListener("progress", checkBuffer)
      video.removeEventListener("canplay", checkBuffer)
      video.removeEventListener("playing", dismiss)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={styles.loader} role="status" aria-live="polite" aria-label="Loading Rebel Pit">
      <div className={styles.mark} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className={styles.label}>Loading the pit</p>
    </div>
  )
}
