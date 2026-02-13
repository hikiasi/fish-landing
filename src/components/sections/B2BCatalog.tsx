"use client"

import { useState } from "react"
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

const B2B_PRODUCTS = [
  {
    category: "Филе и стейки рыб",
    items: [
      { name: "Стейк сёмги с/м 2-3 см", pack: "10 кг коробка", price1: "690₽", price2: "650₽" },
      { name: "Филе трески б/к с/м", pack: "5 кг блок", price1: "480₽", price2: "440₽" },
      { name: "Стейк палтуса с/м", pack: "10 кг", price1: "920₽", price2: "870₽" },
      { name: "Филе хека с/м", pack: "5 кг", price1: "310₽", price2: "290₽" },
      { name: "Стейк тунца с/м", pack: "5 кг", price1: "1150₽", price2: "1090₽" },
    ]
  },
  {
    category: "Креветки и раки",
    items: [
      { name: "Креветка королевская в/м 16/20", pack: "2 кг блок", price1: "1190₽", price2: "1140₽" },
      { name: "Креветка тигровая в/м 13/15", pack: "2 кг", price1: "1450₽", price2: "1390₽" },
      { name: "Креветка северная в/м 90/120", pack: "1 кг", price1: "680₽", price2: "640₽" },
      { name: "Лангустины L1", pack: "2 кг", price1: "2100₽", price2: "1990₽" },
    ]
  },
  {
    category: "Мидии, гребешки, кальмары",
    items: [
      { name: "Кальмар тушка очищенная", pack: "10 кг", price1: "420₽", price2: "390₽" },
      { name: "Мидии в створках", pack: "5 кг", price1: "550₽", price2: "520₽" },
      { name: "Гребешок морской", pack: "1 кг", price1: "1850₽", price2: "1790₽" },
    ]
  }
]

export function B2BCatalog() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="b2b-catalog" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Оптовый ассортимент • Цены от 50 кг
          </h2>
          <p className="text-slate-500">
            Полный прайс на 127 позиций — в PDF после запроса
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16">
          <Accordion type="multiple" defaultValue={["item-0"]} className="space-y-4">
            {B2B_PRODUCTS.map((cat, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-slate-100 rounded-2xl px-6 shadow-sm overflow-hidden">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-xl font-bold text-slate-900">{cat.category}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="pb-4">Наименование</th>
                          <th className="pb-4">Упаковка</th>
                          <th className="pb-4">Цена (50-200 кг)</th>
                          <th className="pb-4">Цена (200+ кг)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {cat.items.map((item, j) => (
                          <tr key={j} className="text-sm">
                            <td className="py-4 font-bold text-slate-800">{item.name}</td>
                            <td className="py-4 text-slate-500">{item.pack}</td>
                            <td className="py-4 text-slate-900 font-medium">{item.price1}/кг</td>
                            <td className="py-4 text-sky-600 font-bold">{item.price2}/кг</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button variant="ghost" className="mt-4 text-sky-600 font-bold hover:bg-sky-50">
                    Ещё 23 позиции в категории
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Special Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { icon: Package, title: "Мин. заказ: 50 кг", sub: "Разные позиции в заказе" },
            { icon: Truck, title: "Бесплатная доставка", sub: "При заказе от 100 кг" },
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
            className="bg-sky-600 hover:bg-sky-700 h-14 px-10 text-lg shadow-xl shadow-sky-100"
          >
            Запросить полный прайс + образцы
          </Button>
          <p className="mt-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
            Привезем 5 кг рыбы на пробу бесплатно
          </p>
        </div>
      </div>

      <B2BSamplesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
