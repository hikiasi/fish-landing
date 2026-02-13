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
import { Product } from "@/context/CartContext"
import { ShoppingCart, ShieldCheck, Clock } from "lucide-react"

const fastOrderSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  address: z.string().min(5, "Введите адрес доставки"),
  comment: z.string().optional(),
})

type FastOrderValues = z.infer<typeof fastOrderSchema>

interface FastOrderModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function FastOrderModal({ product, isOpen, onClose }: FastOrderModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FastOrderValues>({
    resolver: zodResolver(fastOrderSchema),
  })

  const onSubmit = (data: FastOrderValues) => {
    console.log("Fast Order:", { product, ...data })
    alert("Заказ принят! Мы перезвоним вам в течение 15 минут.")
    reset()
    onClose()
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none">
        <div className="bg-sky-600 p-8 text-white relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-white">
              <ShoppingCart className="w-6 h-6" />
              Быстрый заказ
            </DialogTitle>
            <DialogDescription className="text-sky-100">
              Оформите заказ за 30 секунд. Мы перезвоним для подтверждения.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{product.name}</h4>
              <div className="text-sky-600 font-bold mt-1">{product.price} ₽</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Input placeholder="Как к вам обращаться?" {...register("name")} className="h-12 rounded-xl" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Input placeholder="+7 (___) ___-__-__" {...register("phone")} className="h-12 rounded-xl" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Input placeholder="Адрес доставки в Калининграде" {...register("address")} className="h-12 rounded-xl" />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <Input placeholder="Пожелания ко времени доставки" {...register("comment")} className="h-12 rounded-xl" />
            </div>
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-xl shadow-xl shadow-sky-100">
              Заказать
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
