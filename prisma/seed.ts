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

  // Clear existing products to ensure clean state
  await prisma.product.deleteMany({})
  await prisma.b2BProduct.deleteMany({})

  const productData = [
    {
      name: "Лосось Атлантический. Стейк 'M'",
      price: 1640,
      weight: "Коробка 5кг",
      category: "Филе и стейки",
      description: "Стейк мороженный глазированный. Размер 'М' обеспечивает оптимальное время приготовления и идеальную подачу. Страна: Чили.",
      image: "/uploads/steyk_semgi.webp",
      isHit: true,
    },
    {
      name: "Форель радужная. Стейк 'L'",
      price: 1640,
      weight: "Коробка 5кг",
      category: "Филе и стейки",
      description: "Стейк радужной форели мороженный глазированный. Размер 'L' (крупный). Страна: Турция.",
      image: "/uploads/steyk_foreli.webp",
      isHit: true,
    },
    {
      name: "Филе лосося на шкуре 3-4lb",
      price: 1970,
      weight: "Пласт (~1.5-2кг)",
      category: "Филе и стейки",
      description: "Премиальное филе лосося на шкуре. Размер 3-4lb (фунта). Идеально для засолки и запекания. Страна: Чили.",
      image: "/uploads/paltus.webp",
    },
    {
      name: "Филе форели Трим В (1250+)",
      price: 1750,
      weight: "Пласт 1.25кг+",
      category: "Филе и стейки",
      description: "Филе форели премиальной очистки Trim B (без костей и плавников). Навеска каждого филе 1250г+. Страна: Китай.",
      image: "/uploads/treska.webp",
    },
    {
      name: "Лосось потрошенный с головой",
      price: 1350,
      weight: "Рыба 4-5кг",
      category: "Целая рыба",
      description: "Лосось атлантический потрошенный с головой, сухая индивидуальная заморозка (IQF). Премиум качество. Страна: Чили.",
      image: "/uploads/semeyn.webp",
    },
    {
      name: "Форель радужная без головы",
      price: 1480,
      weight: "Рыба 3.6-4.5кг",
      category: "Целая рыба",
      description: "Форель радужная потрошенная без головы, свежемороженая. Крупная навеска. Страна: Турция.",
      image: "/uploads/dorado.webp",
    },
    {
      name: "Сибас непотрошенный с головой",
      price: 1160,
      weight: "400-600г",
      category: "Целая рыба",
      description: "Сибас (лаврак) цельный, замороженный. Традиционный деликатес средиземноморской кухни. Страна: Турция.",
      image: "/uploads/sibas.webp",
    },
    {
      name: "Дорадо непотрошенный с головой",
      price: 1120,
      weight: "400-600г",
      category: "Целая рыба",
      description: "Дорадо (морской карась) цельный, замороженный. Нежное белое мясо с минимальным количеством костей. Страна: Турция.",
      image: "/uploads/dorado.webp",
    },
    {
      name: "Креветки северные 80/100",
      price: 870,
      weight: "Коробка 5кг",
      category: "Креветки и раки",
      description: "Дикие северные креветки, неразделанные, варено-мороженые. Размер 80/100 штук в килограмме. Страна: Китай.",
      image: "/uploads/krevetki.webp",
      isHit: true,
    },
    {
      name: "Лангустины L2 (с головой)",
      price: 1020,
      weight: "Коробка 12кг",
      category: "Креветки и раки",
      description: "Красные аргентинские креветки (лангустины) с головой в панцире. Размер L2 (21-30 шт/кг). Страна: Аргентина.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 31/40 (Индия)",
      price: 1140,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Очищенная креветка без пищевого тракта, варено-мороженая. Размер 31/40 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 41/50 (Вьетнам)",
      price: 1070,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Очищенная креветка без пищевого тракта, варено-мороженая. Размер 41/50 шт/фунт. Страна: Вьетнам.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 21/25 (Индия) с/м",
      price: 1320,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Очищенная креветка без пищевого тракта, свежемороженая. Крупный размер 21/25 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 26/30 (Индия)",
      price: 1280,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Очищенная креветка без пищевого тракта. Размер 26/30 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 31/40 (Индия) с/м",
      price: 1160,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Очищенная креветка без пищевого тракта, свежемороженая. Размер 31/40 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 41/50 (Индия) с/м",
      price: 1210,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Очищенная креветка без пищевого тракта, свежемороженая. Размер 41/50 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 16/20 (Эквадор)",
      price: 1270,
      weight: "Коробка 18кг",
      category: "Креветки и раки",
      description: "Креветка без головы в панцире, свежемороженая. Очень крупный размер 16/20 шт/фунт. Упаковка 10*1.8кг. Страна: Эквадор.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 41/50 на хвосте",
      price: 1080,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Креветка очищенная на хвосте (PND TO), свежемороженая. Размер 41/50 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Креветка Ваннамей 21/25 в панцире",
      price: 1040,
      weight: "Коробка 10кг",
      category: "Креветки и раки",
      description: "Креветка без головы в панцире. Размер 21/25 шт/фунт. Страна: Индия.",
      image: "/uploads/krevetki.webp",
    },
    {
      name: "Мясо мидий 100/200",
      price: 490,
      weight: "Коробка 10кг",
      category: "Морепродукты",
      description: "Очищенное мясо мидий, варено-мороженое. Размер 100-200 штук на фунт. Страна: Китай.",
      image: "/uploads/midii_v_stvorkax.webp",
    },
  ]

  for (const product of productData) {
    await prisma.product.create({
      data: {
        ...product,
        oldPrice: Math.round(product.price * 1.15), // Optional: add fake old price
      }
    })

    await prisma.b2BProduct.create({
      data: {
        ...product,
        price: product.price,
        price200: Math.round(product.price * 0.95), // wholesale discount for large volume
      }
    })
  }

  console.log("Seed completed successfully with 20 products")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
