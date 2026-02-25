"use client"

import { motion } from "framer-motion"
import { Check, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PatternFormat } from "react-number-format"

const b2bCtaSchema = z.object({
  company: z.string().min(2, "Введите название компании"),
  name: z.string().min(2, "Введите имя"),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  email: z.string().email("Введите корректный email"),
  interest: z.string().min(1, "Выберите интерес"),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type B2BCtaValues = z.infer<typeof b2bCtaSchema>

export function B2BCTA() {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<B2BCtaValues>({
    resolver: zodResolver(b2bCtaSchema),
    defaultValues: { agree: true, interest: "Поставками для ресторана/кафе" }
  })

  const agree = watch("agree")

  const onSubmit = async (data: B2BCtaValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "B2B", comment: `Финальный CTA: Интерес - ${data.interest}` })
      })
      if (res.ok) {
        alert("Заявка отправлена! Менеджер свяжется с вами в ближайшее время.")
        reset()
      }
    } catch (err) {
      alert("Ошибка при отправке")
    }
  }

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-slate-900 rounded-3xl md:rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          {/* Left Side */}
          <div className="lg:w-3/5 p-6 md:p-16 text-white bg-gradient-to-br from-slate-900 to-slate-800">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
              Начните экономить уже со следующей поставки
            </h2>
            <div className="space-y-6 mb-12">
              {[
                "Цены ниже, чем у конкурентов",
                "Выгодные условия сотрудничества",
                "Отсрочка 7-14 дней с первого заказа",
                "Замена брака за 2 часа, без вопросов",
                "Персональный менеджер и прямой номер",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sky-400 font-bold text-xl">
              Оставьте заявку — перезвоним за 10 минут и рассчитаем вашу выгоду
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-2/5 p-6 md:p-12 bg-slate-50">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Заявка на сотрудничество</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Компания / ресторан" {...register("company")} className="h-12 md:h-14 rounded-2xl border-slate-200 bg-white" aria-label="Компания или ресторан" />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}

              <Input placeholder="Контактное лицо" {...register("name")} className="h-12 md:h-14 rounded-2xl border-slate-200 bg-white" aria-label="Контактное лицо" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}

              <PatternFormat
                format="+7 (###) ###-##-##"
                mask="_"
                customInput={Input}
                onValueChange={(values) => setValue("phone", values.formattedValue)}
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="h-12 md:h-14 rounded-2xl border-slate-200 bg-white"
                aria-label="Номер телефона"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

              <Input placeholder="Email" {...register("email")} className="h-12 md:h-14 rounded-2xl border-slate-200 bg-white" aria-label="Электронная почта" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

              <label htmlFor="cta-interest" className="sr-only">Цель обращения</label>
              <select
                id="cta-interest"
                {...register("interest")}
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                <option>Поставками для ресторана/кафе</option>
                <option>Поставками для магазина/сети</option>
                <option>Разовой закупкой для мероприятия</option>
                <option>Консультацией по ассортименту</option>
              </select>

              <div className="flex items-start gap-2 py-2">
                <Checkbox
                  id="b2b-cta-agree"
                  checked={agree}
                  onCheckedChange={(checked) => setValue("agree", !!checked)}
                  className="mt-1"
                />
                <label htmlFor="b2b-cta-agree" className="text-[10px] text-slate-400 leading-tight">
                  Согласен с <a href="/legal/privacy" className="underline hover:text-sky-600">политикой конфиденциальности</a> и даю согласие на <a href="/legal/consent" className="underline hover:text-sky-600">обработку персональных данных</a>
                </label>
              </div>
              {errors.agree && <p className="text-red-500 text-[10px]">{errors.agree.message}</p>}

              <Button type="submit" className="w-full h-16 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>

              <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
                <a href="tel:+79114864797" className="flex items-center gap-3 text-slate-600 font-bold hover:text-sky-600 transition-colors">
                  <Phone className="w-5 h-5 text-sky-500" />
                  +7 (911) 486-47-97
                </a>
                <a href="mailto:timlistroy@inbox.ru" className="flex items-center gap-3 text-slate-600 font-bold hover:text-sky-600 transition-colors">
                  <Mail className="w-5 h-5 text-sky-500" />
                  timlistroy@inbox.ru
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
