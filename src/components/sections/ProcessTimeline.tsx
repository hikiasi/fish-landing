"use client"

import { motion } from "framer-motion"
import { MousePointerClick, Phone, Package, Home } from "lucide-react"

const STEPS = [
  {
    icon: MousePointerClick,
    time: "1 минута",
    title: "Выбираете на сайте",
    text: "Или звоните +7 (4012) XX-XX-XX — подберём под ваши предпочтения",
  },
  {
    icon: Phone,
    time: "15 минут",
    title: "Подтверждаем заказ",
    text: "Уточняем время доставки. Нарежем стейками бесплатно, если нужно",
  },
  {
    icon: Package,
    time: "3-6 часов",
    title: "Комплектуем и упаковываем",
    text: "Вакуумируем порционно. Везём в термосумках -25°C",
  },
  {
    icon: Home,
    time: "До вашей двери",
    title: "Доставляем и принимаете",
    text: "Не понравится — вернём деньги сразу, без вопросов",
  },
]

export function ProcessTimeline() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Как получить рыбу с корабля на ваш стол
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white border border-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 shadow-sm uppercase tracking-tighter">
                    {step.time}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
