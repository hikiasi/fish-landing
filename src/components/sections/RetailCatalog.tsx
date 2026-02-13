"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Snowflake, Box, Timer, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart, Product } from "@/context/CartContext"
import { cn } from "@/lib/utils"
import { FastOrderModal } from "./FastOrderModal"

const CATEGORIES = [
  "Все",
  "Филе и стейки",
  "Целая рыба",
  "Креветки и раки",
  "Кальмары и осьминоги",
  "Икра и деликатесы",
  "Готовые наборы",
]

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Стейк сёмги потрошёной с/м",
    price: 1290,
    oldPrice: 1450,
    image: "https://images.unsplash.com/photo-1594002494803-44f39c3b0268?q=80&w=800&auto=format&fit=crop",
    weight: "1 кг ± 50 г",
    category: "Филе и стейки",
    description: "Норвегия • Жирность 12% • Без костей",
    isHit: true,
    discount: "-11%",
  },
  {
    id: "2",
    name: "Филе трески б/к с/м",
    price: 580,
    image: "https://images.unsplash.com/photo-1534604973900-c41ab4c94fbb?q=80&w=800&auto=format&fit=crop",
    weight: "1 кг ± 50 г",
    category: "Филе и стейки",
    description: "Баренцево море • Траловый лов • Шоковая заморозка",
  },
  {
    id: "3",
    name: "Креветки королевские 16/20",
    price: 1190,
    oldPrice: 1390,
    image: "https://images.unsplash.com/photo-1551068590-761a1468d6f1?q=80&w=800&auto=format&fit=crop",
    weight: "1 кг",
    category: "Креветки и раки",
    description: "Без глазури • Дикий вылов • Крупные",
    isHit: true,
    discount: "-15%",
  },
  {
    id: "4",
    name: "Кальмар тушка очищенная",
    price: 450,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    weight: "1 кг",
    category: "Кальмары и осьминоги",
    description: "Дальний Восток • Без химии • Идеально для салата",
  },
  {
    id: "5",
    name: "Палтус стейк с/м",
    price: 980,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    weight: "1 кг",
    category: "Филе и стейки",
    description: "Мурманск • Белое мясо • Нежное и сочное",
    isNew: true,
  },
  {
    id: "6",
    name: "Набор 'Семейный ужин'",
    price: 990,
    oldPrice: 1200,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
    weight: "2 кг микс",
    category: "Готовые наборы",
    description: "Треска, кальмар, окунь • Выгодное предложение",
    isHit: true,
    discount: "-17%",
  },
]

export function RetailCatalog() {
  const [activeCategory, setActiveCategory] = useState("Все")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { addToCart } = useCart()

  const filteredProducts = activeCategory === "Все" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section id="retail-catalog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Рыба и морепродукты с доставкой в Калининграде
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-sky-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full overflow-hidden border-slate-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isHit && (
                        <Badge className="bg-orange-500 hover:bg-orange-600">ХИТ</Badge>
                      )}
                      {product.isNew && (
                        <Badge className="bg-sky-500 hover:bg-sky-600">НОВИНКА</Badge>
                      )}
                      {product.discount && (
                        <Badge className="bg-red-500 hover:bg-red-600">АКЦИЯ {product.discount}</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-5 flex-grow">
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <div className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {product.description}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Snowflake className="w-3 h-3 text-sky-400" /> -30°C
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Box className="w-3 h-3 text-sky-400" /> Вакуум
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Timer className="w-3 h-3 text-sky-400" /> 2 часа
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Вес: {product.weight}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-sky-600">{product.price} ₽</span>
                          {product.oldPrice && (
                            <span className="text-sm text-slate-400 line-through decoration-red-400">{product.oldPrice} ₽</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-5 pt-0">
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      variant="secondary" 
                      className="w-full group hover:bg-sky-600 hover:text-white transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Показать ещё 12 позиций
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <FastOrderModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
