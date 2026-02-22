"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ship, Thermometer, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SampleSetModal } from "./SampleSetModal"

const FEATURES = [
  {
    icon: Ship,
    title: "Собственный флот",
    text: "Вылавливаем в Баренцевом море, замораживаем прямо на борту за 2 часа. Не храним месяцами на складах",
    comparison: "Рыба в магазинах размораживается 3-5 раз при транспортировке",
  },
  {
    icon: Thermometer,
    title: "Шоковая заморозка -30°C",
    text: "Кристаллы льда не разрывают волокна. Сохраняем структуру, сок, омега-3",
    comparison: "В супермаркетах -18°C медленная заморозка = каша после разморозки",
  },
  {
    icon: Shield,
    title: "Без глазури и химии",
    text: "Продаём вес рыбы, не вес льда. Без фосфатов для накачки водой",
    comparison: "50% веса магазинной рыбы — это лёд и добавки",
  },
  {
    icon: Truck,
    title: "От завода к вам за 24 часа",
    text: "Минус 3-4 посредника. Цена на 30% ниже при лучшем качестве",
    comparison: "Магазинная рыба проходит 5 этапов перепродажи",
  },
]

export function WhyUs() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="retail-why-us" className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Почему наша рыба свежее магазинной?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                {feature.text}
              </p>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-xs text-slate-400 italic">
                  {feature.comparison}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg" 
            className="bg-sky-600 hover:bg-sky-700 text-white px-10 h-12 sm:h-14 rounded-full text-lg shadow-lg shadow-sky-200"
          >
            Попробовать — набор 2 кг за 990₽
          </Button>
          <p className="mt-4 text-sm text-slate-400 font-medium uppercase tracking-widest">
            Тестовый набор для новых клиентов
          </p>
        </motion.div>
      </div>

      <SampleSetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
