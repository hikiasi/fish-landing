"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const retailCTASchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
})

type RetailCTAValues = z.infer<typeof retailCTASchema>

export function RetailCTA() {
  const [timeLeft, setTimeLeft] = useState(85512) // seconds
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RetailCTAValues>({
    resolver: zodResolver(retailCTASchema),
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const onSubmit = (data: RetailCTAValues) => {
    console.log("Retail Lead:", data)
    alert("Промокод отправлен! Мы перезвоним вам в течение 3 минут.")
    reset()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-sky-600 to-sky-400 rounded-3xl p-8 md:p-16 text-white text-center shadow-2xl shadow-sky-200"
        >
          {/* Abstract background ice elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/20 blur-3xl -ml-32 -mb-32 rounded-full" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Закажите сейчас — получите <br className="hidden md:block" />
              скидку <span className="text-orange-300">15%</span> на первый заказ
            </h2>
            <p className="text-lg md:text-xl text-sky-50 mb-8 font-medium">
              Только для новых клиентов • Промокод: <span className="bg-white/20 px-3 py-1 rounded-lg border border-white/30 ml-1">ПЕРВЫЙ15</span>
            </p>

            <div className="flex flex-col items-center mb-12">
              <div className="text-sm uppercase tracking-widest text-sky-100 mb-3 opacity-80">Акция действует ещё:</div>
              <div className="text-4xl md:text-5xl font-mono font-bold tracking-tighter tabular-nums bg-sky-700/30 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-left">
                  <Input 
                    placeholder="Как к вам обращаться?" 
                    {...register("name")}
                    className="h-14 bg-white/10 border-white/20 text-white placeholder:text-sky-100/50 rounded-xl px-6 focus:bg-white/20 transition-all"
                  />
                  {errors.name && <p className="text-orange-200 text-[10px] mt-1 ml-2">{errors.name.message}</p>}
                </div>
                <div className="text-left">
                  <Input 
                    placeholder="+7 (___) ___-__-__" 
                    {...register("phone")}
                    className="h-14 bg-white/10 border-white/20 text-white placeholder:text-sky-100/50 rounded-xl px-6 focus:bg-white/20 transition-all"
                  />
                  {errors.phone && <p className="text-orange-200 text-[10px] mt-1 ml-2">{errors.phone.message}</p>}
                </div>
                <Button type="submit" className="h-14 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-900/20">
                  Получить скидку 15%
                </Button>
              </form>

              <div className="flex flex-wrap justify-center gap-6 md:gap-8 opacity-80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <Check className="w-4 h-4" /> Доставим сегодня
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <Check className="w-4 h-4" /> Вернём деньги за 5 минут
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <Check className="w-4 h-4" /> Без предоплаты
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sky-100 mb-4 italic">Или просто позвоните нам:</p>
              <a href="tel:+74012000000" className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold hover:text-orange-300 transition-colors">
                <Phone className="w-6 h-6 md:w-8 h-8" />
                +7 (4012) XX-XX-XX
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
