"use client"

import { useEffect, useState } from "react"
import styles from "./initial-video-loader.module.css"

const VIDEO_READY_TIMEOUT_MS = 7000

export function InitialVideoLoader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]")

    if (!video) {
      return
    }

    let dismissed = false
    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      setIsVisible(false)
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      dismiss()
      return
    }

    const showLoaderId = window.setTimeout(() => setIsVisible(true), 0)
    video.addEventListener("loadeddata", dismiss, { once: true })
    video.addEventListener("canplay", dismiss, { once: true })
    const timeoutId = window.setTimeout(dismiss, VIDEO_READY_TIMEOUT_MS)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearTimeout(showLoaderId)
      video.removeEventListener("loadeddata", dismiss)
      video.removeEventListener("canplay", dismiss)
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
