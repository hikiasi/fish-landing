"use client"

import { motion } from "framer-motion"
import { Quote, TrendingUp, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const B2B_CASES = [
  {
    type: "Ресторан японской кухни",
    name: "Ресторан, Калининград",
    problem: "Переплачивали крупным поставщикам, качество креветок скакало",
    solution: "Перешли на регулярные поставки креветок 16/20 и лосося 3 раза в неделю",
    result: "Снижение фудкоста • Стабильное качество • Рост заказов темпуры",
    quote: "Креветки пришли не варёные, как раньше, — сырые, крупные. Темпура получается хрустящей, не резиновой.",
    author: "Шеф-повар Руслан",
    image: "/uploads/case-tokyo.webp"
  },
  {
    type: "Сеть продуктовых магазинов",
    name: "Сеть из 4 магазинов",
    problem: "Списывали 15% рыбы из-за разморозки при доставке",
    solution: "Поставки 2 раза в неделю в термофургонах под каждую точку",
    result: "Списания снизились до 3% • Маржа выросла с 22% до 31%",
    quote: "Покупатели стали спрашивать: откуда такая рыба? Свежесть действительно на высоте.",
    author: "Управляющий Иван П.",
    image: "/uploads/case-semya.webp"
  }
]

export function B2BCases() {
  return (
    <section className="py-12 md:py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Наши клиенты экономят и зарабатывают больше
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {B2B_CASES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40" />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-2">{item.type}</div>
                <h3 className="text-xl font-bold mb-6">{item.name}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
                    <div className="text-sm text-slate-400"><span className="text-white font-medium">Проблема:</span> {item.problem}</div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                    <div className="text-sm text-slate-400"><span className="text-white font-medium">Решение:</span> {item.solution}</div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-sm text-emerald-400 font-bold">{item.result}</div>
                  </div>
                </div>

                <div className="relative p-6 bg-white/5 rounded-2xl border border-white/5 italic text-slate-300 text-sm">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-sky-500/20 fill-current" />
                  &quot;{item.quote}&quot;
                  <div className="mt-4 not-italic font-bold text-white text-xs">— {item.author}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
