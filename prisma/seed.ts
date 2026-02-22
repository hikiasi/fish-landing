import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  })

  // Retail Products
  const products = [
    {
      name: "Стейк сёмги потрошёной с/м",
      price: 1290,
      oldPrice: 1450,
      weight: "1 кг ± 50 г",
      category: "Филе и стейки",
      description: "Норвегия • Жирность 12% • Без костей",
      image: "/uploads/steyk_semgi.webp",
      isHit: true,
      isNew: false,
    },
    {
      name: "Филе трески б/к с/м",
      price: 580,
      weight: "1 кг ± 50 г",
      category: "Филе и стейки",
      description: "Баренцево море • Траловый лов • Шоковая заморозка",
      image: "/uploads/treska.webp",
      isHit: false,
      isNew: false,
    },
    {
      name: "Креветки королевские 16/20",
      price: 1190,
      oldPrice: 1390,
      weight: "1 кг",
      category: "Креветки и раки",
      description: "Без глазури • Дикий вылов • Крупные",
      image: "/uploads/krevetki.webp",
      isHit: true,
      isNew: false,
    },
    {
      name: "Кальмар тушка очищенная",
      price: 450,
      weight: "1 кг",
      category: "Кальмары и осьминоги",
      description: "Дальний Восток • Без химии • Идеально для салата",
      image: "/uploads/kalmar.webp",
      isHit: false,
      isNew: false,
    },
    {
      name: "Палтус стейк с/м",
      price: 980,
      weight: "1 кг",
      category: "Филе и стейки",
      description: "Мурманск • Белое мясо • Нежное и сочное",
      image: "/uploads/paltus.webp",
      isHit: false,
      isNew: true,
    },
    {
      name: "Набор 'Семейный ужин'",
      price: 990,
      oldPrice: 1200,
      weight: "2 кг микс",
      category: "Готовые наборы",
      description: "Треска, кальмар, окунь • Выгодное предложение",
      image: "/uploads/semeyn.webp",
      isHit: true,
      isNew: false,
    },
    {
      name: "Икра горбуши 2025",
      price: 4500,
      weight: "500 г",
      category: "Икра и деликатесы",
      description: "Камчатка • Слабосоленая • Без консервантов",
      image: "/uploads/ikra_gorbushi.webp",
      isHit: true,
      isNew: true,
    },
    {
      name: "Дорадо целая потрошеная",
      price: 750,
      weight: "~400-600 г/шт",
      category: "Целая рыба",
      description: "Турция • Охлажденная на льду • Для запекания",
      image: "/uploads/dorado.webp",
      isHit: false,
      isNew: false,
    },
    {
      name: "Сибас целая рыба",
      price: 780,
      weight: "~400-600 г/шт",
      category: "Целая рыба",
      description: "Турция • Нежное белое мясо • Минимально костей",
      image: "/uploads/sibas.webp",
      isHit: false,
      isNew: false,
    },
    {
      name: "Мидии в створках",
      price: 650,
      weight: "1 кг",
      category: "Креветки и раки",
      description: "Чили • Крупные • В собственном соку",
      image: "/uploads/midii_v_stvorkax.webp",
      isHit: false,
      isNew: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    })
  }

  // B2B Products
  const b2bProducts = [
    {
      name: "Стейк сёмги с/м 2-3 см",
      price: 690, // price for 50-200kg
      price200: 650, // price for 200kg+
      weight: "10 кг коробка",
      category: "Филе и стейки рыб",
      description: "Оптом для ресторанов",
      image: "/uploads/salmon-steak.jpg",
    },
    {
      name: "Филе трески б/к с/м",
      price: 480,
      price200: 440,
      weight: "5 кг блок",
      category: "Филе и стейки рыб",
      description: "Шоковая заморозка на борту",
      image: "/uploads/cod-fillet.jpg",
    },
    {
      name: "Креветка королевская в/м 16/20",
      price: 1190,
      price200: 1140,
      weight: "2 кг блок",
      category: "Креветки и раки",
      description: "Без глазури",
      image: "/uploads/shrimp.jpg",
    },
  ]

  for (const product of b2bProducts) {
    await prisma.b2BProduct.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    })
  }

  console.log("Seed completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
