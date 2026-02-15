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
    a: "Смотрите на дату заморозки на упаковке (не дату фасовки!). У нас от вылова до заморозки 2 часа, дата всегда на вакуумной упаковке. Ещё признаки: рыба не слиплась в комок (значит не размораживалась), нет жёлтого налёта на жире, глаза прозрачные у целой рыбы.",
  },
  {
    q: "Сколько рыба хранится в морозилке?",
    a: "При -18°C (стандартная морозилка): жирная рыба (сёмга, скумбрия) — 3 месяца, белая рыба — 6 месяцев, креветки — 4 месяца. Дата на упаковке показывает срок годности. У нас рыба всегда свежее 2 недель от заморозки.",
  },
  {
    q: "Можно ли заказать нарезку стейками?",
    a: "Да, бесплатно! В комментарии к заказу напишите нужную толщину (рекомендуем 2-3 см для жарки). Порционируем и вакуумируем отдельно — удобно размораживать по 1 стейку.",
  },
  {
    q: "Чем ваши креветки отличаются от магазинных?",
    a: "Без глазури (лёд до 40% веса в супермаркетах, у нас 0%). Не варёные — варим только атлантические, остальные сырые (полезнее, вкуснее). Размер по международной классификации: 16/20 = 16-20 штук креветок на 1 кг.",
  },
  {
    q: "Есть ли рыба для суши/строганины?",
    a: "Нет, продаём только для термообработки. Для сырого употребления нужна паразитологическая экспертиза и спецусловия заморозки -40°C на 7 дней. Мы морозим на -30°C до 3 дней. Всегда готовьте рыбу!",
  },
  {
    q: "Вы сами ловите или перепродаёте?",
    a: "Собственный флот РК-ХХХХ (2 судна) + долгосрочные контракты с норвежскими и чилийскими фермами. Камчатские крабы и креветки — через партнёров на Дальнем Востоке.",
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
            <Button variant="outline" className="rounded-full px-6 border-slate-200">
              <Phone className="w-4 h-4 mr-2" />
              Позвонить нам
            </Button>
            <Button variant="outline" className="rounded-full px-6 border-slate-200">
              <Send className="w-4 h-4 mr-2 text-sky-500" />
              Написать в Telegram
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
