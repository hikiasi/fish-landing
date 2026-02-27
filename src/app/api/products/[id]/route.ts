import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import fs from "fs/promises"
import path from "path"

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
  } catch {
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
      const oldProduct = await prisma.b2BProduct.findUnique({ where: { id } });
      if (oldProduct && oldProduct.image && oldProduct.image !== data.image && oldProduct.image.startsWith('/uploads/')) {
        const oldFilePath = path.join(process.cwd(), "public", oldProduct.image);
        await fs.unlink(oldFilePath).catch(() => {});
      }

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
      const oldProduct = await prisma.product.findUnique({ where: { id } });
      if (oldProduct && oldProduct.image && oldProduct.image !== data.image && oldProduct.image.startsWith('/uploads/')) {
        const oldFilePath = path.join(process.cwd(), "public", oldProduct.image);
        await fs.unlink(oldFilePath).catch(() => {});
      }

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
  } catch {
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
    let product;
    if (type === "b2b") {
      product = await prisma.b2BProduct.findUnique({ where: { id } });
      if (product?.image && product.image.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), "public", product.image);
        await fs.unlink(filePath).catch(() => {});
      }
      await prisma.b2BProduct.delete({
        where: { id },
      })
    } else {
      product = await prisma.product.findUnique({ where: { id } });
      if (product?.image && product.image.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), "public", product.image);
        await fs.unlink(filePath).catch(() => {});
      }
      await prisma.product.delete({
        where: { id },
      })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
