'use client'

import { useState } from 'react'
import Image from 'next/image'

export const LOGO_SRC = '/images/logo-yurr.png'

interface LogoProps {
  /** Rendered height in px. Width scales automatically. */
  height?: number
  /**
   * Render the drawn brand mark instead of the type wordmark.
   *
   * The artwork is a detailed, low-contrast pencil drawing: below roughly
   * 200px tall the smoke lettering and the joint both turn to mush, so the
   * nav, footer and sign-in deliberately use the wordmark. Pass this only
   * where the mark has real room.
   */
  image?: boolean
  className?: string
  priority?: boolean
}

export function Logo({ height = 36, image = false, className = '', priority = false }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (image && !failed) {
    return (
      <Image
        src={LOGO_SRC}
        alt="yurr cooked"
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

  return (
    <span className={`logo-wordmark ${className}`.trim()} style={{ fontSize: height * 0.75 }}>
      yurr cooked<span className="mark"></span>
    </span>
  )
}
