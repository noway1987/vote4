import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { username, cardId } = await req.json();

  const existingLike = await prisma.like.findFirst({
    where: { username, cardId },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    await prisma.card.update({
      where: { id: cardId },
      data: { likes: { decrement: 1 } },
    });
    return NextResponse.json({ action: 'unliked' });
  }

  await prisma.like.create({ data: { username, cardId } });
  await prisma.card.update({
    where: { id: cardId },
    data: { likes: { increment: 1 } },
  });

  return NextResponse.json({ action: 'liked' });
}
