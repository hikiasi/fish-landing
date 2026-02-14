import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await req.json()
    const { status } = body

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
