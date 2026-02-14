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
import InputMask from "react-input-mask"

const samplesSchema = z.object({
  company: z.string().min(2, "Введите название компании"),
  name: z.string().min(2, "Введите имя"),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  email: z.string().email("Введите корректный email"),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type SamplesValues = z.infer<typeof samplesSchema>

interface B2BSamplesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function B2BSamplesModal({ isOpen, onClose }: B2BSamplesModalProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<SamplesValues>({
    resolver: zodResolver(samplesSchema),
    defaultValues: { agree: true }
  })

  const agree = watch("agree")

  const onSubmit = async (data: SamplesValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "B2B", comment: "Запрос бесплатных образцов 5 кг" })
      })
      if (res.ok) {
        alert("Заявка принята! Менеджер свяжется с вами для уточнения состава тестового набора.")
        reset()
        onClose()
      }
    } catch (err) {
      alert("Ошибка при отправке")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-[40px] border-none">
        <div className="bg-sky-600 p-8 text-white relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-white">
              <Package className="w-6 h-6" />
              Бесплатные образцы
            </DialogTitle>
            <DialogDescription className="text-sky-100">
              Привезем 5 кг рыбы на пробу. Оплачивается только доставка 400₽.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <Input placeholder="Название компании / ресторана" {...register("company")} className="h-12 rounded-xl" />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}

            <Input placeholder="Ваше имя" {...register("name")} className="h-12 rounded-xl" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}

            <InputMask
              mask="+7 (999) 999-99-99"
              {...register("phone")}
            >
              {/* @ts-ignore */}
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="h-12 rounded-xl"
              />
            </InputMask>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

            <Input placeholder="Email для прайса" {...register("email")} className="h-12 rounded-xl" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2 px-1">
              <Checkbox 
                id="samples-agree"
                checked={agree}
                onCheckedChange={(checked) => setValue("agree", !!checked)}
                className="mt-1"
              />
              <label htmlFor="samples-agree" className="text-[10px] text-slate-400 leading-tight">
                Согласен с <a href="#" className="underline">политикой конфиденциальности</a> и даю согласие на <a href="#" className="underline">обработку персональных данных</a>
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-[10px]">{errors.agree.message}</p>}

            <Button type="submit" className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Получить образцы"}
            </Button>
            
            <div className="flex items-center justify-center gap-6 py-2 border-t border-slate-100 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4 text-sky-500" />
                Доставка 400₽
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Без обязательств
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
