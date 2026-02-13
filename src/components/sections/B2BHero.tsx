"use client"

import { motion } from "framer-motion"
import { TrendingDown, CalendarCheck, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const b2bHeroSchema = z.object({
  company: z.string().min(2, "Введите название компании"),
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email"),
  volume: z.string().min(1, "Выберите объем закупки"),
})

type B2BHeroValues = z.infer<typeof b2bHeroSchema>

export function B2BHero() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<B2BHeroValues>({
    resolver: zodResolver(b2bHeroSchema),
  })

  const onSubmit = (data: B2BHeroValues) => {
    console.log("B2B Lead:", data)
    alert("Заявка отправлена! Мы свяжемся с вами в течение 15 минут.")
    reset()
  }

  return (
    <section id="b2b-hero" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
              B2B / HoReCa Поставки
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Стабильные поставки рыбы <br />
              <span className="text-sky-400">для вашего бизнеса</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
              Прямой контракт с заводом в Калининграде • Цены от производителя • Отсрочка платежа до 14 дней
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: TrendingDown, title: "Цена на 25-40% ниже", sub: "Минус посредники" },
                { icon: CalendarCheck, title: "3 раза в неделю", sub: "Доставка по графику" },
                { icon: FileText, title: "Полный пакет док-тов", sub: "ВЕТСД, декларации" },
              ].map((usp, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-sky-400">
                    <usp.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{usp.title}</div>
                    <div className="text-xs text-slate-500">{usp.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-sm italic">
              Нам доверяют: 
              <span className="font-bold text-slate-400 not-italic">Ресторан «Маяк», Отель «Балтика», Сеть «СемьЯ»</span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-md p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-2 text-center">Запросить оптовый прайс</h2>
              <p className="text-slate-400 text-center mb-8 text-sm">Получите актуальные цены и расчёт выгоды за 15 минут</p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Название компании" {...register("company")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-slate-500 focus:bg-white/10" />
                    {errors.company && <p className="text-red-500 text-[10px] mt-1">{errors.company.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Ваше имя" {...register("name")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-slate-500 focus:bg-white/10" />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
                  </div>
                </div>
                <div>
                  <Input placeholder="Ваш телефон" {...register("phone")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-slate-500 focus:bg-white/10" />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input placeholder="Email для отправки прайса" {...register("email")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-slate-500 focus:bg-white/10" />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <select {...register("volume")} className="w-full bg-white/5 border-white/10 h-12 rounded-md px-3 text-sm text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all">
                    <option value="" className="bg-slate-900">Средний объём закупки в месяц</option>
                    <option value="50-100" className="bg-slate-900">50-100 кг</option>
                    <option value="100-300" className="bg-slate-900">100-300 кг</option>
                    <option value="300-500" className="bg-slate-900">300-500 кг</option>
                    <option value="500+" className="bg-slate-900">500+ кг</option>
                  </select>
                  {errors.volume && <p className="text-red-500 text-[10px] mt-1">{errors.volume.message}</p>}
                </div>

                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 h-14 text-lg font-bold shadow-lg shadow-sky-500/20">
                  <Send className="w-4 h-4 mr-2" />
                  Получить КП и прайс-лист
                </Button>
                <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest mt-4">
                  Гарантируем отсутствие спама
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
