'use client'

import { useState } from 'react'
import Image from 'next/image'

export const LOGO_SRC = '/images/logo-yurr.png'

interface LogoProps {
  /** Rendered height in px. Width scales automatically. */
  height?: number
  className?: string
  priority?: boolean
}

/**
 * Brand mark. The artwork is pencil on white paper, so it is composited with
 * mix-blend-mode: multiply — the paper drops out against the cream background
 * and only the drawn marks show, without needing the file masked.
 *
 * Falls back to the original type wordmark if the asset is missing, so the
 * site never renders a broken image.
 */
export function Logo({ height = 36, className = '', priority = false }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`logo-wordmark ${className}`.trim()}>
        yur cooked<span className="mark"></span>
      </span>
    )
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="yur cooked"
      width={height}
      height={height}
      priority={priority}
      onError={() => setFailed(true)}
      className={`brand-logo ${className}`.trim()}
      style={{ height, width: 'auto' }}
      sizes={`${height * 2}px`}
    />
  )
}
