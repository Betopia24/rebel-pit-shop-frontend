"use client"

import { useEffect, useState } from "react"
import styles from "./initial-video-loader.module.css"

export function InitialVideoLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]")

    if (!video) {
      const noVideoId = window.setTimeout(() => setIsVisible(false), 0)
      return () => window.clearTimeout(noVideoId)
    }

    video.pause()

    const sourceUrl = video.currentSrc || video.querySelector("source")?.src || video.src
    const controller = new AbortController()
    let objectUrl: string | null = null
    let cancelled = false

    const onPlaying = () => {
      if (!cancelled) setIsVisible(false)
    }

    video.addEventListener("playing", onPlaying, { once: true })

    const downloadAndPlay = async () => {
      if (!sourceUrl) {
        setIsVisible(false)
        return
      }

      try {
        const response = await fetch(sourceUrl, {
          cache: "force-cache",
          signal: controller.signal,
        })

        if (!response.ok) throw new Error(`Video request failed with ${response.status}`)

        const chunks: ArrayBuffer[] = []

        if (response.body) {
          const reader = response.body.getReader()

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (value) {
              const chunk = new ArrayBuffer(value.byteLength)
              new Uint8Array(chunk).set(value)
              chunks.push(chunk)
            }
          }
        } else {
          chunks.push(await response.arrayBuffer())
        }

        if (cancelled) return

        objectUrl = URL.createObjectURL(
          new Blob(chunks, {
            type: response.headers.get("content-type") || "video/mp4",
          }),
        )
        video.src = objectUrl
        video.load()
        await video.play()
      } catch {
        if (cancelled) return

        // Keep the original source as a last-resort fallback if the full download fails.
        video.preload = "auto"
        video.load()
        void video.play().catch(() => setIsVisible(false))
      }
    }

    void downloadAndPlay()

    return () => {
      cancelled = true
      controller.abort()
      video.removeEventListener("playing", onPlaying)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
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
