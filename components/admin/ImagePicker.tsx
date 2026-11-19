'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Two ways to set a photo: upload a new one, or pick one already on the site.
 * Upload needs blob storage configured; when it isn't, the API says so plainly
 * and the existing-photo grid still works.
 */
export function ImagePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (src: string) => void
}) {
  const [images, setImages] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open || images.length) return
    fetch('/api/admin/images')
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .catch(() => setImages([]))
  }, [open, images.length])

  async function upload(file: File) {
    setBusy(true)
    setError(null)
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body })
      const data = await res.json().catch(() => null)
      if (!res.ok) { setError(data?.error ?? 'Upload failed.'); return }
      onChange(data.url)
    } catch {
      setError('Upload failed.')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="admin-imagepicker">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="admin-imagepicker-preview" />
      ) : (
        <div className="admin-imagepicker-empty">No photo yet</div>
      )}

      <div className="admin-imagepicker-controls">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="admin-file"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) upload(f)
          }}
        />
        <button type="button" className="admin-btn-ghost" onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide photos on the site' : 'Or pick one already on the site'}
        </button>
        {value && (
          <button type="button" className="admin-btn-danger-ghost" onClick={() => onChange('')}>
            Clear
          </button>
        )}
      </div>

      <input
        className="admin-input"
        value={value}
        placeholder="/images/recipe-something.jpg"
        onChange={(e) => onChange(e.target.value)}
      />

      {busy && <p className="admin-hint">Uploading…</p>}
      {error && <p className="admin-error" role="alert">{error}</p>}

      {open && (
        <div className="admin-imagegrid">
          {images.length === 0 && <p className="admin-hint">No photos found.</p>}
          {images.map((src) => (
            <button
              key={src}
              type="button"
              className={`admin-imagegrid-item${src === value ? ' is-selected' : ''}`}
              onClick={() => { onChange(src); setOpen(false) }}
              title={src}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
