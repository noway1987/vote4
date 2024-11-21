import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
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
    return new Response(JSON.stringify({ action: 'unliked' }), { status: 200 });
  }

  await prisma.like.create({ data: { username, cardId } });
  await prisma.card.update({
    where: { id: cardId },
    data: { likes: { increment: 1 } },
  });

  return new Response(JSON.stringify({ action: 'liked' }), { status: 200 });
}
