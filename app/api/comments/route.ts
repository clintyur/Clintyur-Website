import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const commentSchema = z.object({
  recipeId: z.string(),
  body: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional(),
  parentId: z.string().optional(),
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const recipeId = searchParams.get('recipeId')
  if (!recipeId) return NextResponse.json({ error: 'recipeId required' }, { status: 400 })

  const comments = await db.comment.findMany({
    where: { recipeId, parentId: null },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, name: true, image: true } },
      replies: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    take: 50,
  })

  return NextResponse.json(comments)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'You must be signed in to comment' }, { status: 401 })
  }
  const userId = session.user.id

  const body = await req.json()
  const parsed = commentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const comment = await db.comment.create({
    data: {
      ...parsed.data,
      userId,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  })

  return NextResponse.json(comment, { status: 201 })
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const comment = await db.comment.findUnique({ where: { id } })
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Only author or admin can delete
  const isAdmin = (session.user as { role?: string }).role === 'ADMIN'
  if (comment.userId !== session.user.id && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await db.comment.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
