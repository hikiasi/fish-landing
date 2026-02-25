"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Award, Truck, Clock, Snowflake, MapPin, Store, CreditCard, Banknote, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GuaranteesDelivery() {
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
            Гарантируем качество и удобство
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Guarantees */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Наши гарантии</h3>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 p-6 rounded-2xl border border-slate-100 bg-slate-50/50"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-600 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Вернём деньги за 5 минут</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">
                  Если рыба оказалась не свежей, не та, что на фото, или просто не понравилась — курьер заберёт и вернёт оплату наличными сразу
                </p>
                <button className="text-sky-600 text-xs font-bold hover:underline">Условия возврата</button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-6 p-6 rounded-2xl border border-slate-100 bg-slate-50/50"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-600 shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Сертификаты на каждую партию</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">
                  Ветеринарные свидетельства, декларации ЕАЭС. Храним при -25°C по ГОСТу
                </p>
                <button className="text-sky-600 text-xs font-bold hover:underline">Посмотреть документы</button>
              </div>
            </motion.div>

            <div className="pt-8">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-center lg:text-left">Способы оплаты</h4>
              <div className="flex flex-col gap-4">
                {[
                  { icon: CreditCard, label: "Картой курьеру", desc: "Все терминалы оплаты" },
                  { icon: Banknote, label: "Наличными", desc: "Сдача с любой купюры" },
                  { icon: Smartphone, label: "СБП перевод", desc: "По QR-коду или номеру" },
                ].map((method, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-sky-50 transition-colors">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-500 shrink-0 group-hover:scale-110 transition-transform">
                      <method.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg mb-0.5">{method.label}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">{method.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Delivery */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Доставка и самовывоз</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Truck, title: "Бесплатно от 1 кор.", sub: "Доставка по Калининграду" },
                { icon: Clock, title: "График поставок", sub: "3 раза в неделю" },
                { icon: Snowflake, title: "Соблюдение режима", sub: "Хранение и перевозка при -25°C" },
                { icon: Store, title: "Самовывоз по предварительному звонку", sub: "Правая Набережная, 2" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <item.icon className="w-6 h-6 text-sky-500 mb-3" />
                  <div className="font-bold text-slate-900 text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Map Widget */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-slate-100">
              <iframe
                src="https://yandex.ru/map-widget/v1/org/kaliningradryba_sklady/1058977656/?from=mapframe&ll=20.487685%2C54.706642&z=14"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="relative z-10"
                title="Расположение склада Океаника на Яндекс.Картах"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <MapPin className="w-8 h-8 text-sky-400" />
                  <span className="text-xs text-slate-400 font-medium">Загрузка карты...</span>
                </div>
              </div>
            </div>

            {/*
            <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 py-7 text-lg shadow-xl shadow-sky-100 rounded-2xl">
              Оформить заказ с доставкой
            </Button>
            */}
          </div>
        </div>
      </div>
    </section>
  )
}
