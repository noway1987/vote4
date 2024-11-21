import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const cards = await prisma.card.findMany({ orderBy: { likes: 'desc' } });
  return NextResponse.json(cards);
}

export async function POST(req: NextRequest) {
  const { name, price, image, link } = await req.json();
  const newCard = await prisma.card.create({
    data: { name, price, image, link },
  });
  return NextResponse.json(newCard, { status: 201 });
}
