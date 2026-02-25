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
import { Package, ShieldCheck, Truck } from "lucide-react"
import { PatternFormat } from "react-number-format"

const sampleSetSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  address: z.string().min(5, "Введите адрес доставки"),
  addShrimp: z.boolean().default(false),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type SampleSetValues = z.infer<typeof sampleSetSchema>

interface SampleSetModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SampleSetModal({ isOpen, onClose }: SampleSetModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<SampleSetValues>({
    resolver: zodResolver(sampleSetSchema),
    defaultValues: {
      addShrimp: false,
      agree: true
    }
  })

  const addShrimp = watch("addShrimp")
  const agree = watch("agree")

  const onSubmit = async (data: SampleSetValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "RETAIL",
          comment: `Тестовый набор (Креветки: ${data.addShrimp ? "Да" : "Нет"})`,
          total: data.addShrimp ? 1380 : 990
        })
      })
      if (res.ok) {
        alert("Заказ на тестовый набор принят! Мы свяжемся с вами в ближайшее время.")
        reset()
        onClose()
      }
    } catch (err) {
      alert("Ошибка при отправке заказа")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl md:rounded-[40px] border-none">
        <div className="bg-sky-600 p-8 text-white relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-white">
              <Package className="w-6 h-6" />
              Тестовый набор
            </DialogTitle>
            <DialogDescription className="text-sky-100">
              Попробуйте наше качество: 2 кг микса рыбы всего за 990₽
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
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
              <Input placeholder="Адрес доставки" {...register("address")} className="h-11 md:h-12 rounded-xl" />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <Checkbox 
                id="shrimp" 
                checked={addShrimp}
                onCheckedChange={(checked) => setValue("addShrimp", checked as boolean)}
              />
              <label htmlFor="shrimp" className="text-sm font-medium text-orange-900 cursor-pointer">
                Добавить креветки 0.5 кг (+390₽)
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">Итого к оплате:</span>
              <span className="text-2xl font-bold text-sky-600">{addShrimp ? 1380 : 990} ₽</span>
            </div>

            <div className="flex items-start gap-2 px-1 mb-6">
              <Checkbox
                id="sample-set-agree"
                checked={agree}
                onCheckedChange={(checked) => setValue("agree", !!checked)}
                className="mt-1"
              />
              <label htmlFor="sample-set-agree" className="text-[10px] text-slate-400 leading-tight">
                Согласен с <a href="/legal/privacy" className="underline hover:text-sky-600">политикой конфиденциальности</a> и даю согласие на <a href="/legal/consent" className="underline hover:text-sky-600">обработку персональных данных</a>
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-[10px] mb-4">{errors.agree.message}</p>}
            
            <Button type="submit" className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Заказать тестовый набор"}
            </Button>
            
            <div className="flex items-center justify-center gap-6 py-2 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Гарантия качества
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4 text-sky-500" />
                Бесплатная доставка
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
