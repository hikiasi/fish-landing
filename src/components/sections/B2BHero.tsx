"use client"

import { motion } from "framer-motion"
import { TrendingDown, CalendarCheck, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PatternFormat } from "react-number-format"

const b2bHeroSchema = z.object({
  company: z.string().min(2, "Введите название компании"),
  name: z.string().min(2, "Введите имя"),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  email: z.string().email("Введите корректный email"),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type B2BHeroValues = z.infer<typeof b2bHeroSchema>

export function B2BHero() {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<B2BHeroValues>({
    resolver: zodResolver(b2bHeroSchema),
    defaultValues: { agree: true }
  })

  const agree = watch("agree")

  const onSubmit = async (data: B2BHeroValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "B2B", comment: "Запрос прайса с главного B2B экрана" })
      })
      if (res.ok) {
        alert("Запрос отправлен! Прайс будет отправлен на вашу почту в ближайшее время.")
        reset()
      }
    } catch (err) {
      alert("Ошибка при отправке")
    }
  }

  return (
    <section id="b2b-hero" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Стабильные поставки рыбы и морепродуктов для вашего бизнеса
              </h2>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                Надежные поставки рыбы в Калининграде • Лучшие цены • Отсрочка до 14 дней
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: TrendingDown, title: "Цены ниже конкурентов", desc: "Выгодные условия" },
                  { icon: CalendarCheck, title: "Поставки 3 раза в неделю", desc: "Свежесть по графику" },
                  { icon: FileText, title: "Полный пакет документов", desc: "ВЕТСД, Меркурий" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-6 border-t border-slate-100">
                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Нам доверяют:</div>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 grayscale opacity-40">
                  <div className="font-black text-xl italic">ХОРЕКА</div>
                  <div className="font-black text-xl italic">РОЗНИЦА</div>
                  <div className="font-black text-xl italic">ОПТ</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl md:rounded-[40px] p-6 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Получите актуальный прайс</h3>
              <p className="text-slate-500 mb-8">Отправим прайс и расчёт выгоды за 15 минут</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Название компании" {...register("company")} className="h-12 md:h-14 rounded-2xl border-white bg-white shadow-sm" aria-label="Название компании" />
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Как к вам обращаться?" {...register("name")} className="h-12 md:h-14 rounded-2xl border-white bg-white shadow-sm" aria-label="Ваше имя" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <PatternFormat
                      format="+7 (###) ###-##-##"
                      mask="_"
                      customInput={Input}
                      onValueChange={(values) => setValue("phone", values.formattedValue)}
                          type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="h-12 md:h-14 rounded-2xl border-white bg-white shadow-sm"
                      aria-label="Номер телефона"
                        />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Email" {...register("email")} className="h-12 md:h-14 rounded-2xl border-white bg-white shadow-sm" aria-label="Электронная почта" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="flex items-start gap-2 py-2">
                  <Checkbox
                    id="b2b-hero-agree"
                    checked={agree}
                    onCheckedChange={(checked) => setValue("agree", !!checked)}
                    className="mt-1"
                  />
                  <label htmlFor="b2b-hero-agree" className="text-[10px] text-slate-400 leading-tight">
                    Согласен с <a href="#" className="underline">политикой конфиденциальности</a> и даю согласие на <a href="#" className="underline">обработку персональных данных</a>
                  </label>
                </div>
                {errors.agree && <p className="text-red-500 text-[10px]">{errors.agree.message}</p>}

                <Button type="submit" className="w-full h-14 md:h-16 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Получить прайс и КП"}
                </Button>

                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Никакого спама. Только деловое предложение.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
