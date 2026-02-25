"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Product } from "@/context/CartContext"
import { ShoppingCart, ShieldCheck, Clock } from "lucide-react"
import { PatternFormat } from "react-number-format"
import Image from "next/image"

const fastOrderSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  address: z.string().min(5, "Введите адрес доставки"),
  comment: z.string().optional(),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type FastOrderValues = z.infer<typeof fastOrderSchema>

interface FastOrderModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function FastOrderModal({ product, isOpen, onClose }: FastOrderModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<FastOrderValues>({
    resolver: zodResolver(fastOrderSchema),
    defaultValues: { agree: true }
  })

  const agree = watch("agree")

  const onSubmit = async (data: FastOrderValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "RETAIL",
          cart: product ? [{ name: product.name, quantity: 1 }] : [],
          total: product?.price
        })
      })
      if (res.ok) {
        alert("Заказ принят! Мы перезвоним вам в течение 15 минут.")
        reset()
        onClose()
      }
    } catch (err) {
      alert("Ошибка при отправке заказа")
    }
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl sm:rounded-3xl md:rounded-[40px] border-none [&>button]:text-white">
        <div className="bg-sky-600 p-6 sm:p-8 text-white relative">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
              <ShoppingCart className="w-6 h-6" />
              Быстрый заказ
            </DialogTitle>
            <DialogDescription className="text-sky-100 text-sm sm:text-base">
              Оформите заказ за 30 секунд. Мы перезвоним для подтверждения.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-4 sm:space-y-6 bg-white">
          <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
            <div className="relative w-16 h-16 shrink-0">
              <Image src={product.image} alt={product.name} fill className="rounded-lg object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{product.name}</h4>
              <div className="text-sky-600 font-bold mt-1">{product.price} ₽</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Input placeholder="Как к вам обращаться?" {...register("name")} className="h-11 md:h-12 rounded-xl" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <PatternFormat
                  format="+7 (###) ###-##-##"
                  mask="_"
                  customInput={Input}
                  onValueChange={(values) => setValue("phone", values.formattedValue)}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="h-11 md:h-12 rounded-xl"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Input placeholder="Адрес доставки в Калининграде" {...register("address")} className="h-11 md:h-12 rounded-xl" />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <Input placeholder="Пожелания ко времени доставки" {...register("comment")} className="h-11 md:h-12 rounded-xl" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2 px-1">
              <Checkbox
                id="agree"
                checked={agree}
                onCheckedChange={(checked) => setValue("agree", !!checked)}
                className="mt-1"
              />
              <label htmlFor="agree" className="text-[10px] text-slate-400 leading-tight">
                Согласен с <a href="/legal/privacy" className="underline hover:text-sky-600">политикой конфиденциальности</a> и даю согласие на <a href="/legal/consent" className="underline hover:text-sky-600">обработку персональных данных</a>
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-[10px]">{errors.agree.message}</p>}

            <Button
              type="submit"
              className="w-full h-12 sm:h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Заказать"}
            </Button>
            
            <div className="flex items-center justify-center gap-6 py-2 border-t border-slate-100 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Без предоплаты
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-sky-500" />
                Доставка сегодня
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
