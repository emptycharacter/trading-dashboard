import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { symbol, entryPrice, exitPrice, strategy, notes } = await req.json();
  const profitLoss = exitPrice ? exitPrice - entryPrice : null;

  const trade = await prisma.trade.create({
    data: {
      userId: session.user.email,
      symbol,
      entryPrice,
      exitPrice,
      profitLoss,
      strategy,
      notes,
    },
  });

  return NextResponse.json(trade);
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const trades = await prisma.trade.findMany({
    where: { userId: session.user.email },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(trades);
}
