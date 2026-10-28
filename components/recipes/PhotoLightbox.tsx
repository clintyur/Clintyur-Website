'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface PhotoLightboxProps {
  src: string
  alt: string
}

/**
 * Expand control on the recipe hero. The hero crops the photo and lays a scrim
 * over the lower third for the title, so this opens the full frame with
 * nothing on top of it.
 */
export function PhotoLightbox({ src, alt }: PhotoLightboxProps) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)

    // Stop the page scrolling behind the overlay, without the layout shifting
    // as the scrollbar disappears.
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      openerRef.current?.focus()
    }
  }, [open, close])

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className="hero-expand"
        onClick={() => setOpen(true)}
        aria-label="View the full photo"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 1H1v5M10 15h5v-5M1 10v5h5M15 6V1h-5"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Full photo</span>
      </button>

      {open && (
        <div
          className="photo-lightbox open"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
        >
          <button ref={closeRef} type="button" className="photo-lightbox-close" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="photo-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
