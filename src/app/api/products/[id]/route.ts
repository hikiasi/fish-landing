import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")

  try {
    if (type === "b2b") {
      const product = await prisma.b2BProduct.findUnique({
        where: { id },
      })
      return NextResponse.json(product)
    } else {
      const product = await prisma.product.findUnique({
        where: { id },
      })
      return NextResponse.json(product)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await req.json()
    const { type, ...data } = body

    if (type === "b2b") {
      const product = await prisma.b2BProduct.update({
        where: { id },
        data: {
          name: data.name,
          price: parseFloat(data.price),
          price200: data.price200 ? parseFloat(data.price200) : null,
          oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
          weight: data.weight,
          category: data.category,
          description: data.description,
          image: data.image,
          isHit: !!data.isHit,
          isNew: !!data.isNew,
        }
      })
      return NextResponse.json(product)
    } else {
      const product = await prisma.product.update({
        where: { id },
        data: {
          name: data.name,
          price: parseFloat(data.price),
          oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
          weight: data.weight,
          category: data.category,
          description: data.description,
          image: data.image,
          isHit: !!data.isHit,
          isNew: !!data.isNew,
        }
      })
      return NextResponse.json(product)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")

  try {
    if (type === "b2b") {
      await prisma.b2BProduct.delete({
        where: { id },
      })
    } else {
      await prisma.product.delete({
        where: { id },
      })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
