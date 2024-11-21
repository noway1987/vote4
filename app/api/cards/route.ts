import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const cards = await prisma.card.findMany({ orderBy: { likes: 'desc' } });
  return new Response(JSON.stringify(cards), { status: 200 });
}

export async function POST(req: Request) {
  const { name, price, image, link } = await req.json();
  const newCard = await prisma.card.create({
    data: { name, price, image, link },
  });
  return new Response(JSON.stringify(newCard), { status: 201 });
}
