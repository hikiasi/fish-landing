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
import { FileText, Award, ShieldCheck } from "lucide-react"

const b2bSamplesSchema = z.object({
  company: z.string().min(2, "Введите название компании"),
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email"),
  requestSamples: z.boolean().default(false),
})

type B2BSamplesValues = z.infer<typeof b2bSamplesSchema>

interface B2BSamplesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function B2BSamplesModal({ isOpen, onClose }: B2BSamplesModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<B2BSamplesValues>({
    resolver: zodResolver(b2bSamplesSchema),
    defaultValues: {
      requestSamples: true
    }
  })

  const requestSamples = watch("requestSamples")

  const onSubmit = (data: B2BSamplesValues) => {
    console.log("B2B Samples Request:", data)
    alert("Запрос отправлен! Мы свяжемся с вами для уточнения состава образцов.")
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none">
        <div className="bg-slate-900 p-8 text-white relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-white">
              <FileText className="w-6 h-6 text-sky-400" />
              Оптовый прайс и образцы
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Отправим полный каталог (127 позиций) и обсудим доставку тестовой партии.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div>
              <Input placeholder="Название компании / ресторана" {...register("company")} className="h-12 rounded-xl" />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
            </div>
            <div>
              <Input placeholder="Ваше имя" {...register("name")} className="h-12 rounded-xl" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input placeholder="Телефон" {...register("phone")} className="h-12 rounded-xl" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Input placeholder="Email" {...register("email")} className="h-12 rounded-xl" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-sky-50 rounded-2xl border border-sky-100">
              <Checkbox 
                id="samples" 
                checked={requestSamples}
                onCheckedChange={(checked) => setValue("requestSamples", checked as boolean)}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="samples" className="text-sm font-bold text-sky-900 cursor-pointer">
                  Хочу получить тестовые образцы 5 кг
                </label>
                <p className="text-[10px] text-sky-700">
                  Бесплатно, оплачивается только доставка курьером (400₽)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button type="submit" className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-xl shadow-xl shadow-sky-100">
              Получить прайс-лист
            </Button>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                Все сертификаты
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                <Award className="w-3 h-3 text-sky-500" />
                Прямой контракт
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
