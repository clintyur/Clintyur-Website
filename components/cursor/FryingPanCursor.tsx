'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Vec2 { x: number; y: number }

export function FryingPanCursor() {
  const panRef      = useRef<HTMLDivElement>(null)
  const eggGroupRef = useRef<SVGGElement>(null)  // The yolk group we translate inside the SVG

  // Physics state — stored in refs to avoid re-renders
  const pos          = useRef<Vec2>({ x: -100, y: -100 })
  const velocity     = useRef<Vec2>({ x: 0, y: 0 })
  const eggOffset    = useRef<Vec2>({ x: 0, y: 0 })
  const eggVelocity  = useRef<Vec2>({ x: 0, y: 0 })
  const rafId        = useRef<number>(0)
  const lastPos      = useRef<Vec2>({ x: 0, y: 0 })

  const animate = useCallback(() => {
    const pan      = panRef.current
    const eggGroup = eggGroupRef.current
    if (!pan || !eggGroup) return

    const k = 0.18  // spring stiffness
    const d = 0.72  // damping

    eggVelocity.current.x += velocity.current.x * 0.18
    eggVelocity.current.y += velocity.current.y * 0.18

    eggVelocity.current.x -= eggOffset.current.x * k
    eggVelocity.current.y -= eggOffset.current.y * k

    eggVelocity.current.x *= d
    eggVelocity.current.y *= d

    eggOffset.current.x += eggVelocity.current.x
    eggOffset.current.y += eggVelocity.current.y

    const maxDisplace = 5
    eggOffset.current.x = Math.max(-maxDisplace, Math.min(maxDisplace, eggOffset.current.x))
    eggOffset.current.y = Math.max(-maxDisplace, Math.min(maxDisplace, eggOffset.current.y))

    pan.style.transform = `translate3d(${pos.current.x - 20}px, ${pos.current.y - 20}px, 0)`
    eggGroup.setAttribute('transform', `translate(${eggOffset.current.x} ${eggOffset.current.y})`)

    velocity.current.x *= 0.6
    velocity.current.y *= 0.6

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.innerWidth < 1024) return

    const onMove = (e: MouseEvent) => {
      velocity.current.x = e.clientX - lastPos.current.x
      velocity.current.y = e.clientY - lastPos.current.y
      lastPos.current = { x: e.clientX, y: e.clientY }
      pos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  return (
    <div
      ref={panRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block will-change-transform"
      style={{ width: 40, height: 40 }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handle */}
        <rect x="24" y="18" width="14" height="4" rx="2" fill="#374151" stroke="#1f2937" strokeWidth="0.5" />
        {/* Pan outer */}
        <ellipse cx="17" cy="20" rx="15" ry="14" fill="#4b5563" stroke="#1f2937" strokeWidth="0.5" />
        {/* Pan rim */}
        <ellipse cx="17" cy="20" rx="13" ry="12" fill="#374151" />
        {/* Pan interior */}
        <ellipse cx="17" cy="20" rx="11" ry="10" fill="#1c1917" />
        {/* Egg white */}
        <ellipse cx="16" cy="20" rx="6" ry="5" fill="#fffbeb" />
        {/* Egg yolk group — animated via transform attribute */}
        <g ref={eggGroupRef}>
          <circle cx="16" cy="20" r="3" fill="#fbbf24" />
          <circle cx="15" cy="19" r="1" fill="#fef3c7" opacity="0.7" />
        </g>
      </svg>
    </div>
  )
}
