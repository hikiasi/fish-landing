"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Snowflake, Box, Timer, ChevronDown, Frown, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart, Product } from "@/context/CartContext"
import { cn } from "@/lib/utils"
import { FastOrderModal } from "./FastOrderModal"
import Image from "next/image"

const CATEGORIES = [
  "Все",
  "Филе и стейки",
  "Целая рыба",
  "Креветки и раки",
  "Кальмары и осьминоги",
  "Икра и деликатесы",
  "Готовые наборы",
]

function ExpandableDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > 80;

  return (
    <div className="text-sm text-slate-500 mb-4">
      <div className={cn(!isExpanded && isLong && "line-clamp-2")}>
        {text}
      </div>
      {isLong && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-sky-500 text-xs font-bold hover:underline mt-1"
        >
          {isExpanded ? "Свернуть" : "Читать далее"}
        </button>
      )}
    </div>
  );
}

export function RetailCatalog() {
  const [activeCategory, setActiveCategory] = useState("Все")
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [limit, setLimit] = useState(9)
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { addToCart, showFastOrderOnce } = useCart()

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products?type=retail&category=${activeCategory}&limit=${limit}`)
      const data = await res.json()
      setProducts(data.products || [])
      setTotalProducts(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [activeCategory, limit])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    if (showFastOrderOnce()) {
      setSelectedProduct(product)
      setIsModalOpen(true)
    }
  }

  return (
    <section id="retail-catalog" className="py-12 md:py-20 bg-white min-h-[600px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Каталог продукции
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setLimit(9)
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-sky-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
                aria-label={`Выбрать категорию ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {loading && products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] bg-slate-100 rounded-3xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 md:py-20 text-slate-400"
          >
            <Frown className="w-16 h-16 mb-4" />
            <p className="text-xl font-medium">К сожалению, товаров в этой категории пока нет</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full overflow-hidden border-slate-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col rounded-3xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        priority={index < 3}
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isHit && (
                          <Badge className="bg-orange-500 hover:bg-orange-600">ХИТ</Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-sky-500 hover:bg-sky-600">НОВИНКА</Badge>
                        )}
                        {product.oldPrice && (
                          <Badge className="bg-red-500 hover:bg-red-600">АКЦИЯ -{Math.round((1 - product.price / product.oldPrice) * 100)}%</Badge>
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

                      <ExpandableDescription text={product.description} />

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Snowflake className="w-3 h-3 text-sky-400" /> -30°C
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Box className="w-3 h-3 text-sky-400" /> Вакуум
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-sky-400" /> В наличии
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
                        className="w-full group hover:bg-sky-600 hover:text-white transition-all duration-300 rounded-xl"
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
        )}

        {totalProducts > products.length && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              onClick={() => setLimit(prev => prev + 12)}
              disabled={loading}
            >
              {loading ? "Загрузка..." : `Показать ещё ${Math.min(12, totalProducts - products.length)} позиций`}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      <FastOrderModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
