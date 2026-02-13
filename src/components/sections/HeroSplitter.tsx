"use client"

import { motion } from "framer-motion"
import { Home, Building2, Ship, Thermometer, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSplitterProps {
  onSelectRetail: () => void
  onSelectB2B: () => void
}

export function HeroSplitter({ onSelectRetail, onSelectB2B }: HeroSplitterProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 overflow-hidden px-4 py-12">
      {/* Background patterns could go here */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-400 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="flex items-center gap-2 text-2xl font-bold text-sky-600 mb-2">
            <Ship className="w-8 h-8" />
            <span>Калининградская рыба</span>
          </div>
          <div className="text-sm uppercase tracking-widest text-slate-500 font-medium">
            Прямые поставки
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-center text-slate-900 mb-4 leading-tight"
        >
          СВЕЖЕМОРОЖЕНАЯ РЫБА <br />
          <span className="text-sky-600">ИЗ КАЛИНИНГРАДА</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-600 mb-12 font-medium"
        >
          Завод → Ваш стол
        </motion.p>

        {/* Choice Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
          {/* Retail Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all cursor-pointer"
            onClick={onSelectRetail}
          >
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Home className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Для себя и семьи</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              От 1 кг • Доставка на дом • Готовые наборы
            </p>
            <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-6">
              Выбрать рыбу
            </Button>
          </motion.div>

          {/* Business Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all cursor-pointer"
            onClick={onSelectB2B}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Для бизнеса</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              От 50 кг • Оптовые цены • Договор поставки
            </p>
            <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6 border-none">
              Получить прайс
            </Button>
          </motion.div>
        </div>

        {/* Mini USPs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Ship className="w-5 h-5 text-sky-500" />
            <span>Собственный флот</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Thermometer className="w-5 h-5 text-sky-500" />
            <span>-30°C шоковая заморозка</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Shield className="w-5 h-5 text-sky-500" />
            <span>2 часа от вылова до камеры</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
