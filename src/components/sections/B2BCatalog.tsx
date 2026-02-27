"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Package, Truck, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { B2BSamplesModal } from "./B2BSamplesModal"

export function B2BCatalog() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?type=b2b")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <section id="b2b-catalog" className="py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Оптовый ассортимент • Цены от 1 кор.
          </h2>
          <p className="text-slate-500">
            Актуальный прайс — в PDF после запроса
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16">
          {products.length > 0 ? (
            <Accordion type="multiple" defaultValue={categories.slice(0, 1)} className="space-y-4">
              {categories.map((cat, i) => (
                <AccordionItem key={i} value={cat} className="bg-white border border-slate-100 rounded-2xl px-6 shadow-sm overflow-hidden">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-xl font-bold text-slate-900">{cat}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[600px]">
                        <thead>
                          <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                            <th className="pb-4">Наименование</th>
                            <th className="pb-4">Упаковка</th>
                            <th className="pb-4">Цена (опт)</th>
                            <th className="pb-4">Цена (от 200 кг)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {products.filter(p => p.category === cat).map((item, j) => (
                            <tr key={j} className="text-sm">
                              <td className="py-4 font-bold text-slate-800">{item.name}</td>
                              <td className="py-4 text-slate-500">{item.weight}</td>
                              <td className="py-4 text-slate-900 font-medium">{item.price}₽/кг</td>
                              <td className="py-4 text-sky-600 font-bold">{item.price200 || item.price}₽/кг</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Button variant="ghost" className="mt-4 text-sky-600 font-bold hover:bg-sky-50">
                      Ещё позиции в категории
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : !loading && (
            <div className="text-center py-12 md:py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Ассортимент временно недоступен</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-10 text-slate-400 animate-pulse">Загрузка ассортимента...</div>
          )}
        </div>

        {/* Special Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { icon: Package, title: "Мин. заказ: 1 кор.", sub: "Для бесплатной доставки" },
            { icon: Truck, title: "Доставка 0₽", sub: "По Калининграду" },
            { icon: CreditCard, title: "Отсрочка платежа", sub: "7-14 дней с первого заказа" },
            { icon: Clock, title: "Любая упаковка", sub: "Вакуум или коробки" },
          ].map((cond, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <cond.icon className="w-6 h-6 text-sky-500 shrink-0" />
              <div>
                <div className="text-sm font-bold text-slate-900 mb-1">{cond.title}</div>
                <div className="text-xs text-slate-500">{cond.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg" 
            className="bg-sky-600 hover:bg-sky-700 h-12 sm:h-14 px-10 text-lg shadow-xl shadow-sky-100 rounded-2xl"
          >
            Запросить актуальный прайс
          </Button>
          <p className="mt-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
            Получите индивидуальное коммерческое предложение
          </p>
        </div>
      </div>

      <B2BSamplesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
