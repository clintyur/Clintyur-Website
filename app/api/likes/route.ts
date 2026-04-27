import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { recipeId } = await req.json()
  if (!recipeId) return NextResponse.json({ error: 'recipeId required' }, { status: 400 })

  await db.like.upsert({
    where: { userId_recipeId: { userId: session.user.id, recipeId } },
    create: { userId: session.user.id, recipeId },
    update: {},
  })

  const count = await db.like.count({ where: { recipeId } })
  return NextResponse.json({ liked: true, count })
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { recipeId } = await req.json()
  if (!recipeId) return NextResponse.json({ error: 'recipeId required' }, { status: 400 })

  await db.like.deleteMany({
    where: { userId: session.user.id, recipeId },
  })

  const count = await db.like.count({ where: { recipeId } })
  return NextResponse.json({ liked: false, count })
}

export async function GET(req: Request) {
  const session = await auth()
  const { searchParams } = new URL(req.url)
  const recipeId = searchParams.get('recipeId')
  if (!recipeId) return NextResponse.json({ error: 'recipeId required' }, { status: 400 })

  const count = await db.like.count({ where: { recipeId } })
  const liked = session?.user
    ? !!(await db.like.findUnique({
        where: { userId_recipeId: { userId: session.user.id, recipeId } },
      }))
    : false

  return NextResponse.json({ count, liked })
}
