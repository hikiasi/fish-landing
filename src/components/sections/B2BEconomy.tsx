"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"

export function B2BEconomy() {
  const [volume, setVolume] = useState(300)

  const savingsPerKg = 150 // average savings per kg
  const monthlySavings = volume * savingsPerKg
  const yearlySavings = monthlySavings * 12

  return (
    <section className="py-12 md:py-24 bg-white" id="economy-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Сколько вы переплачиваете посредникам?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Сравните условия работы с розничными магазинами и наши оптовые цены
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12 md:mb-24">
          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Продукция</th>
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Магазин (розница)</th>
                  <th className="p-6 text-sm font-bold text-sky-600 uppercase tracking-wider">Наш опт</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { label: "Лосось стейк", dist: "2100₽/кг", ours: "1640₽/кг", highlight: true },
                  { label: "Филе форели", dist: "2200₽/кг", ours: "1750₽/кг", highlight: true },
                  { label: "Лангустины L2", dist: "1400₽/кг", ours: "1020₽/кг", highlight: true },
                  { label: "Креветки 80/100", dist: "1200₽/кг", ours: "870₽/кг", highlight: true },
                  { label: "Мидии мясо", dist: "750₽/кг", ours: "490₽/кг", highlight: true },
                  { label: "Доставка", dist: "Платная", ours: "Бесплатно от 1 кор." },
                  { label: "Документы", dist: "Чеки", ours: "Полный пакет Меркурий" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 text-sm font-medium text-slate-600">{row.label}</td>
                    <td className="p-5 text-sm text-slate-400 flex items-center gap-2">
                      <X className="w-3 h-3 text-red-300" /> {row.dist}
                    </td>
                    <td className={`p-5 text-sm font-bold ${row.highlight ? 'text-sky-600' : 'text-slate-900'} flex items-center gap-2`}>
                      <Check className="w-4 h-4 text-sky-500" /> {row.ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Savings Calculator */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-slate-900/20">
            <h3 className="text-2xl font-bold mb-8">Калькулятор экономии</h3>
            
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 text-sm">Ваша средняя закупка в месяц:</span>
                <span className="text-2xl font-bold text-sky-400">{volume} кг</span>
              </div>
              <input 
                type="range" 
                min="10"
                max="2000" 
                step="10"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 uppercase tracking-widest mt-4">
                <span>10 кг</span>
                <span>2000 кг</span>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Ваша экономия в месяц:</div>
                <div className="text-3xl font-bold text-white tabular-nums">
                  {monthlySavings.toLocaleString()} ₽
                </div>
              </div>
              <div className="p-6 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                <div className="text-sky-400 text-xs uppercase tracking-widest mb-1">Годовая выгода:</div>
                <div className="text-4xl font-extrabold text-sky-400 tabular-nums">
                  {yearlySavings.toLocaleString()} ₽
                </div>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full h-12 sm:h-14 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              Перейти в каталог
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
