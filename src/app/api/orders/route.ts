import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendTelegramNotification } from "@/lib/telegram"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, name, phone, email, address, comment, cart, total } = body

    // Save to DB
    const order = await prisma.order.create({
      data: {
        type: type || "RETAIL",
        name,
        phone,
        email,
        address,
        comment,
        products: cart ? JSON.stringify(cart) : null,
        total: total ? parseFloat(total) : null,
      }
    })

    // Prepare Telegram message
    const emoji = type === "B2B" ? "🏢" : "🏠"
    const title = type === "B2B" ? "НОВАЯ ОПТОВАЯ ЗАЯВКА" : "НОВЫЙ РОЗНИЧНЫЙ ЗАКАЗ"

    let message = `<b>${emoji} ${title}</b>\n\n`
    message += `<b>Имя:</b> ${name}\n`
    message += `<b>Телефон:</b> ${phone}\n`
    if (email) message += `<b>Email:</b> ${email}\n`
    if (address) message += `<b>Адрес:</b> ${address}\n`
    if (comment) message += `<b>Комментарий:</b> ${comment}\n`
    if (total) message += `<b>Сумма:</b> ${total} ₽\n`

    if (cart && cart.length > 0) {
      message += `\n<b>Товары:</b>\n`
      cart.forEach((item: {name: string, quantity: number}) => {
        message += `- ${item.name} (${item.quantity} шт.)\n`
      })
    }

    await sendTelegramNotification(message)

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error("Order POST error:", error)
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
  }
}

export async function GET() {
  // Only for admin
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(orders)
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
