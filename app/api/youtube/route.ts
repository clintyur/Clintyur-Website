import { NextResponse } from 'next/server'

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? 'UCk87vy9lWNcu-vng4vF2WQA'
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

// YouTube's feed has no CORS headers, which is why this was going through a
// third-party proxy. That proxy now returns 403, so the section fell back to
// empty placeholders. Fetching server-side removes the dependency entirely.
export const revalidate = 3600

export interface YouTubeVideo {
  id: string
  title: string
  published: string
  thumb: string
  link: string
}

function decode(s: string): string {
  return s
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function parse(xml: string, limit: number): YouTubeVideo[] {
  const out: YouTubeVideo[] = []
  for (const entry of xml.split('<entry>').slice(1)) {
    const id = entry.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1]
    if (!id) continue
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? 'Untitled'
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? ''
    out.push({
      id,
      title: decode(title).trim(),
      published,
      // maxres isn't guaranteed to exist; hqdefault always does.
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      link: `https://www.youtube.com/watch?v=${id}`,
    })
    if (out.length >= limit) break
  }
  return out
}

export async function GET(req: Request) {
  const limit = Math.min(Number(new URL(req.url).searchParams.get('limit')) || 4, 15)
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } })
    if (!res.ok) {
      console.error('YouTube feed returned', res.status)
      return NextResponse.json({ videos: [], error: 'feed unavailable' }, { status: 502 })
    }
    return NextResponse.json({ videos: parse(await res.text(), limit) })
  } catch (err) {
    console.error('YouTube feed fetch failed:', err)
    return NextResponse.json({ videos: [], error: 'feed unavailable' }, { status: 502 })
  }
}
