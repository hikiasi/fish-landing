"use client"

import { motion } from "framer-motion"
import { FileCheck, Award, Clipboard, Building, Download } from "lucide-react"

const DOCS = [
  {
    icon: FileCheck,
    title: "Ветеринарное свидетельство (ВЕТСД)",
    desc: "На каждую партию • Форма № 2 • Для Россельхознадзора"
  },
  {
    icon: Award,
    title: "Декларация ЕАЭС",
    desc: "Соответствие ТР ЕАЭС 040/2016 • Обязательна для оборота"
  },
  {
    icon: Clipboard,
    title: "Протоколы испытаний",
    desc: "Лаборатория Роспотребнадзора • Радионуклиды, паразиты, химия"
  },
  {
    icon: Building,
    title: "Наши реквизиты и лицензии",
    desc: "ИП Иргашева М.Н. • ИНН, ОГРНИП • Выписка из ЕГРИП"
  }
]

export function B2BDocuments() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Полный пакет документов для проверяющих органов
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {DOCS.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <doc.icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">{doc.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                {doc.desc}
              </p>
              {/* <button
                className="mt-auto flex items-center gap-2 text-[10px] font-bold text-sky-600 uppercase tracking-widest hover:underline"
                aria-label={`Скачать пример ${doc.title}`}
              >
                <Download className="w-3 h-3" />
                Пример PDF
              </button> */}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-8 text-center text-white max-w-4xl mx-auto"
        >
          <p className="text-slate-400 text-sm mb-4 italic">
            К каждой поставке прикладываем: ВЕТСД, товарная накладная ТОРГ-12, счёт-фактура (для плательщиков НДС).
          </p>
          <div className="h-px bg-white/10 w-24 mx-auto mb-6" />
          <h4 className="text-xl font-bold">
            Работаем по <span className="text-sky-400">44-ФЗ и 223-ФЗ</span> (госзакупки)
          </h4>
          <p className="text-slate-500 text-sm mt-2">
            Участвуем в тендерах, предоставляем необходимые документы для площадок.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
