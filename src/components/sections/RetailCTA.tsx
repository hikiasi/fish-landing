"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Truck, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PatternFormat } from "react-number-format"

const ctaSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type CTAValues = z.infer<typeof ctaSchema>

export function RetailCTA() {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<CTAValues>({
    resolver: zodResolver(ctaSchema),
    defaultValues: { agree: true }
  })

  const agree = watch("agree")

  const onSubmit = async (data: CTAValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "B2B", comment: "Заявка на спецпредложение для первого оптового заказа" })
      })
      if (res.ok) {
        alert("Заявка отправлена! Мы свяжемся с вами для обсуждения спецпредложения.")
        reset()
      }
    } catch (err) {
      alert("Ошибка при отправке")
    }
  }

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-sky-600 to-sky-400 rounded-3xl md:rounded-[40px] p-6 md:p-16 overflow-hidden text-center text-white shadow-2xl shadow-sky-200"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6">
              Закажите пробную партию — получите <span className="text-orange-400">спецусловия</span> на первый заказ
            </h2>
            <p className="text-sky-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium opacity-90">
              Только для новых бизнес-партнеров • Бесплатная доставка от 1 коробки
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-grow">
                  <Input 
                    placeholder="Ваше имя"
                    {...register("name")}
                    className="h-14 md:h-16 rounded-2xl bg-white/20 border-white/30 text-white placeholder:text-sky-100 focus:bg-white focus:text-slate-900 transition-all text-lg px-6"
                  />
                  {errors.name && <p className="text-orange-300 text-xs mt-2 text-left px-2">{errors.name.message}</p>}
                </div>
                <div className="flex-grow">
                  <PatternFormat
                    format="+7 (###) ###-##-##"
                    mask="_"
                    customInput={Input}
                    onValueChange={(values) => setValue("phone", values.formattedValue)}
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="h-14 md:h-16 rounded-2xl bg-white/20 border-white/30 text-white placeholder:text-sky-100 focus:bg-white focus:text-slate-900 transition-all text-lg px-6"
                  />
                  {errors.phone && <p className="text-orange-300 text-xs mt-2 text-left px-2">{errors.phone.message}</p>}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 md:h-16 px-10 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-lg font-bold shadow-xl shadow-orange-900/20 whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Получить спецусловия"}
                </Button>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-start justify-center gap-2 max-w-md">
                  <Checkbox
                    id="cta-agree"
                    checked={agree}
                    onCheckedChange={(checked) => setValue("agree", !!checked)}
                    className="mt-1 border-white/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <label htmlFor="cta-agree" className="text-[10px] text-sky-100 leading-tight text-left">
                    Согласен с <a href="/legal/privacy" className="underline hover:text-white">политикой конфиденциальности</a> и даю согласие на <a href="/legal/consent" className="underline hover:text-white">обработку персональных данных</a>
                  </label>
                </div>
                {errors.agree && <p className="text-orange-300 text-[10px]">{errors.agree.message}</p>}

                <div className="flex flex-wrap justify-center gap-8 mt-4 text-[10px] font-bold uppercase tracking-widest text-sky-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Доставка от 1 коробки
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Полный пакет документов
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Оплата при получении
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
