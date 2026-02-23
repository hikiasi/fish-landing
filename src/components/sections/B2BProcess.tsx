"use client"

import { motion } from "framer-motion"
import { Handshake, ClipboardCheck, Repeat, ShieldCheck } from "lucide-react"

const B2B_STEPS = [
  {
    icon: Handshake,
    title: "Знакомство (День 1)",
    details: [
      "Отправляем актуальный прайс",
      "Подбираем ассортимент под ваше меню",
      "Обсуждаем график и объёмы"
    ],
    benefit: "Понимание качества и цен"
  },
  {
    icon: ClipboardCheck,
    title: "Первая поставка (День 2-3)",
    details: [
      "Заказ от 1 коробки (5-18 кг)",
      "Полный пакет документов (ВЕТСД)",
      "Доставка в утреннее окно"
    ],
    benefit: "Проверка логистики и сервиса"
  },
  {
    icon: Repeat,
    title: "Долгосрочная работа",
    details: [
      "Подписываем договор поставки",
      "Открываем отсрочку до 14 дней",
      "Персональный менеджер 24/7"
    ],
    benefit: "Стабильность вашего бизнеса"
  }
]

export function B2BProcess() {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            От заявки до поставки — 3 простых шага
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          {B2B_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-sky-600 mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">{step.title}</h3>
              <ul className="space-y-4 mb-8">
                {step.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-slate-100 mt-auto">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Результат:</div>
                <div className="text-sm font-bold text-slate-900">{step.benefit}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-6 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-6"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-sm text-sky-900 leading-relaxed">
            <span className="font-bold">Никаких долгосрочных обязательств.</span> Работаем без минимального срока контракта. Не подошли — расстаёмся без штрафов после любой поставки.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
