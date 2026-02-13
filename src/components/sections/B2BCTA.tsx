"use client"

import { motion } from "framer-motion"
import { Check, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const b2bCTASchema = z.object({
  company: z.string().min(2, "Введите название компании"),
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  category: z.string().min(1, "Выберите категорию"),
})

type B2BCTAValues = z.infer<typeof b2bCTASchema>

export function B2BCTA() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<B2BCTAValues>({
    resolver: zodResolver(b2bCTASchema),
  })

  const onSubmit = (data: B2BCTAValues) => {
    console.log("B2B Secondary Lead:", data)
    alert("Заявка принята! Мы свяжемся с вами в ближайшее время.")
    reset()
  }

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left: Info */}
            <div className="lg:col-span-3 p-8 md:p-16 lg:p-20 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl -mr-32 -mt-32 rounded-full" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
                  Начните экономить <br />
                  <span className="text-sky-400">уже со следующей поставки</span>
                </h2>
                
                <ul className="space-y-6 mb-12">
                  {[
                    "Цены на 25-40% ниже дистрибьюторов",
                    "Бесплатные образцы 5 кг для тестирования",
                    "Отсрочка 7-14 дней с первого заказа",
                    "Замена брака за 2 часа, без вопросов",
                    "Персональный менеджер и прямой номер",
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-lg text-slate-300">{text}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-slate-500 text-sm">
                  Оставьте заявку — перезвоним за 10 минут и рассчитаем вашу выгоду
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2 p-8 md:p-16 lg:p-12 flex flex-col justify-center">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">О компании</label>
                  <Input placeholder="Название компании / ресторана" {...register("company")} className="h-14 rounded-xl bg-slate-50 border-slate-100" />
                  {errors.company && <p className="text-red-500 text-[10px] ml-1">{errors.company.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Контактное лицо</label>
                  <Input placeholder="Как к вам обращаться?" {...register("name")} className="h-14 rounded-xl bg-slate-50 border-slate-100" />
                  {errors.name && <p className="text-red-500 text-[10px] ml-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" {...register("phone")} className="h-14 rounded-xl bg-slate-50 border-slate-100" />
                  {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone.message}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Интересует</label>
                  <select {...register("category")} className="w-full h-14 rounded-xl bg-slate-50 border border-slate-100 px-4 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500">
                    <option value="">Выберите категорию</option>
                    <option value="horeca">Для ресторана / кафе</option>
                    <option value="retail">Для магазина / сети</option>
                    <option value="event">Разовая закупка для мероприятия</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-[10px] ml-1">{errors.category.message}</p>}
                </div>

                <Button type="submit" className="w-full h-16 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-xl mt-4 shadow-xl shadow-sky-100">
                  <Send className="w-4 h-4 mr-2" />
                  Отправить заявку
                </Button>

                <div className="text-center mt-6">
                  <p className="text-slate-400 text-xs mb-4 uppercase tracking-widest">Или звоните:</p>
                  <a href="tel:+74012000000" className="text-2xl font-bold text-slate-900 hover:text-sky-600 transition-colors">
                    +7 (4012) XX-XX-XX
                  </a>
                  <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                    Никакого спама. Позвоним один раз, обсудим детали. Не подошли условия — больше не побеспокоим.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
