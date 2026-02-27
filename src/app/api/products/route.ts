import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type") // 'retail' or 'b2b'
  const category = searchParams.get("category")
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined

  try {
    if (type === "b2b") {
      const products = await prisma.b2BProduct.findMany({
        where: category && category !== "Все" ? { category } : {},
      })
      return NextResponse.json(products)
    } else {
      const where: any = {}
      if (category && category !== "Все") {
        where.category = category
      }

      const products = await prisma.product.findMany({
        where,
        take: limit,
        orderBy: { createdAt: "desc" },
      })

      const totalCount = await prisma.product.count({ where })

      return NextResponse.json({
        products,
        total: totalCount
      })
    }
  } catch (error) {
    console.error("Products GET error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")
  const ids = searchParams.get("ids")?.split(",")

  if (!ids || ids.length === 0) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 })
  }

  try {
    if (type === "b2b") {
      await prisma.b2BProduct.deleteMany({
        where: { id: { in: ids } }
      })
    } else {
      await prisma.product.deleteMany({
        where: { id: { in: ids } }
      })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Products bulk DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, ...data } = body

    if (type === "b2b") {
      const product = await prisma.b2BProduct.create({
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
      const product = await prisma.product.create({
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
    console.error("Products POST error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
