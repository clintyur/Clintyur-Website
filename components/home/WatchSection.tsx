'use client'

import React, { useState, useEffect } from 'react'

const CLINT_CHANNEL_ID = "UCk87vy9lWNcu-vng4vF2WQA"
const FALLBACK_VIDEOS = [
  { id: "fb1", title: "Latest from @ClintYur", date: "Watch on YouTube", videoId: null, thumb: null, link: "https://youtube.com/@ClintYur" },
  { id: "fb2", title: "Latest from @ClintYur", date: "Watch on YouTube", videoId: null, thumb: null, link: "https://youtube.com/@ClintYur" },
  { id: "fb3", title: "Latest from @ClintYur", date: "Watch on YouTube", videoId: null, thumb: null, link: "https://youtube.com/@ClintYur" },
  { id: "fb4", title: "Latest from @ClintYur", date: "Watch on YouTube", videoId: null, thumb: null, link: "https://youtube.com/@ClintYur" },
]

function fmtDate(s: string) {
  try {
    const d = new Date(s)
    const now = Date.now()
    const diff = (now - d.getTime()) / 1000
    if (diff < 60 * 60 * 24 * 2) return "1 day ago"
    if (diff < 60 * 60 * 24 * 14) return Math.round(diff / 86400) + " days ago"
    if (diff < 60 * 60 * 24 * 60) return Math.round(diff / (86400 * 7)) + " weeks ago"
    if (diff < 60 * 60 * 24 * 365) return Math.round(diff / (86400 * 30)) + " months ago"
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  } catch (e) { return "" }
}

// YouTube Play Icon SVG
const PlayIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <path d="M0 0v20l18-10L0 0z" fill="currentColor"/>
  </svg>
)

export function WatchSection() {
  const [active, setActive] = React.useState<any>(null)
  const [videos, setVideos] = React.useState(FALLBACK_VIDEOS)
  const [status, setStatus] = React.useState("loading")

  const open = (v: any) => {
    if (v.videoId) setActive(v)
    else if (v.link) window.open(v.link, "_blank", "noopener,noreferrer")
  }
  const close = () => setActive(null)

  React.useEffect(() => {
    let cancelled = false
    const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${CLINT_CHANNEL_ID}`
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`
    fetch(url)
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data) => {
        if (cancelled) return
        if (!data || !data.items || !data.items.length) { setStatus("fallback"); return }
        const items = data.items.slice(0, 4).map((it: any, i: number) => {
          const m = (it.link || "").match(/[?&]v=([\w-]{11})/)
          const vid = m ? m[1] : null
          return {
            id: vid || ("rss" + i),
            title: it.title || "Untitled",
            date: fmtDate(it.pubDate),
            videoId: vid,
            thumb: vid ? `https://i.ytimg.com/vi/${vid}/hqdefault.jpg` : (it.thumbnail || null),
            link: it.link || null,
          }
        })
        setVideos(items)
        setStatus("live")
      })
      .catch(() => { if (!cancelled) setStatus("fallback") })
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <section className="container section watch">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot"></span>On YouTube</div>
            <h2 className="section-title">Watch.</h2>
          </div>
          <p className="section-lede">
            Long-form cooking, travel, and the occasional chaos. New videos most weeks at{" "}
            <a href="https://youtube.com/@ClintYur" target="_blank" rel="noreferrer" style={{ borderBottom: "1px solid currentColor" }}>
              @ClintYur
            </a>
            .
          </p>
        </div>

        <div className="watch-grid">
          {videos.map((v: any, i: number) => (
            <button key={v.id} className="watch" onClick={() => open(v)}>
              <div className="watch-thumb" style={{ background: "var(--ink)" }}>
                {v.thumb ? (
                  <img src={v.thumb} alt={v.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "var(--cream)", opacity: 0.5, fontFamily: "var(--display)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase" }}>
                    {status === "loading" ? "Loading…" : "@ClintYur"}
                  </div>
                )}
                <span className="watch-play">
                  <PlayIcon />
                </span>
              </div>
              <div className="watch-meta">
                <span className="watch-num">№ 0{i + 1}</span>
                <span className="watch-date">{v.date}</span>
              </div>
              <h3 className="watch-title">{v.title}</h3>
            </button>
          ))}
        </div>

        <div className="watch-footer">
          <a href="https://youtube.com/@ClintYur" target="_blank" rel="noreferrer" className="btn ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor"/>
            </svg>
            Subscribe on YouTube
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="arrow">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Video Modal */}
      <div className={"modal-bg" + (active ? " open" : "")} onClick={close}>
        {active && (
          <div className="modal video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={close}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="video-player">
              {active.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={active.title}
                  frameBorder="0"
                />
              ) : (
                <div className="video-fallback">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor"/>
                  </svg>
                  <a href={active.link || "https://youtube.com/@ClintYur"} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: 16 }}>
                    Watch on YouTube
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="arrow">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
            <div className="video-info">
              <div className="eyebrow"><span className="dot"></span>{active.date}</div>
              <h2 className="watch-title" style={{ fontSize: 28, marginTop: 12, lineHeight: 1.15 }}>{active.title}</h2>
              <a href={active.link || "https://youtube.com/@ClintYur"} target="_blank" rel="noreferrer" className="link-arrow" style={{ marginTop: 16, display: "inline-flex" }}>
                Open on YouTube
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="arrow">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
