"use client"

import { motion } from "framer-motion"
import { Phone, Send } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const FAQS = [
  {
    q: "Как понять, что рыба действительно свежая?",
    a: "Смотрите на дату заморозки на упаковке (не дату фасовки!). Мы поставляем продукцию напрямую от проверенных поставщиков и производителей, что гарантирует соблюдение температурного режима. Признаки свежести: рыба не слиплась в комок (значит не размораживалась), нет жёлтого налёта на жире, глаза прозрачные у целой рыбы.",
  },
  {
    q: "Работаете ли вы с НДС и по договору?",
    a: "Да, мы работаем с юридическими лицами и индивидуальными предпринимателями. Заключаем договор поставки, предоставляем полный пакет закрывающих документов, работаем через систему 'Меркурий' и ЭДО.",
  },
  {
    q: "Каков минимальный объем заказа для бесплатной доставки?",
    a: "Бесплатная доставка по Калининграду осуществляется при заказе от 1 коробки (в зависимости от позиции это 5-18 кг). Также возможен самовывоз любого объема с нашего склада на Правой набережной 2.",
  },
  {
    q: "Чем ваши креветки отличаются от магазинных?",
    a: "Минимальный процент глазури (согласно ГОСТ). Мы предлагаем продукцию в заводской упаковке, что гарантирует отсутствие повторной заморозки. Размер по международной классификации соответствует заявленному (например, 16/20 штук на кг).",
  },
  {
    q: "Есть ли рыба для суши/строганины?",
    a: "Нет, мы специализируемся на продукции для термообработки. Для употребления в сыром виде требуются специфические условия глубокой заморозки и дополнительные исследования. Мы рекомендуем подвергать всю нашу продукцию термической обработке.",
  },
  {
    q: "Как часто происходят поставки?",
    a: "Обновление ассортимента происходит 3 раза в неделю. Это позволяет нам поддерживать постоянное наличие ходовых позиций и гарантировать свежесть продукции на складе.",
  },
]

export function FAQ() {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Отвечаем на частые вопросы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-100 px-4 last:border-none">
                <AccordionTrigger className="text-left font-bold text-slate-800 hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-6">Не нашли ответ?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="rounded-full px-6 border-slate-200" asChild>
              <a href="tel:+79114864797">
                <Phone className="w-4 h-4 mr-2" />
                Позвонить нам
              </a>
            </Button>
            <Button variant="outline" className="rounded-full px-6 border-slate-200" asChild>
              <a href="https://t.me/fishkaliningrad" target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4 mr-2 text-sky-500" />
                Написать в Telegram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
