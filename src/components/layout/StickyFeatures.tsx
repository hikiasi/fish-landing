"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CheckoutModal } from "@/components/sections/CheckoutModal"
import { PatternFormat } from "react-number-format"
import Image from "next/image"

const exitFormSchema = z.object({
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length === 11;
  }, "Введите полный номер телефона"),
  agree: z.boolean().refine(val => val === true, "Необходимо согласие")
})

type ExitFormValues = z.infer<typeof exitFormSchema>

export function StickyFeatures() {
  const { cart, totalItems, totalPrice, addToCart, decrementQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart()
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ExitFormValues>({
    resolver: zodResolver(exitFormSchema),
    defaultValues: { agree: true }
  })

  const agree = watch("agree")

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        setShowExitPopup(true)
        setHasShownExitPopup(true)
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasShownExitPopup])

  const onExitSubmit = async (data: ExitFormValues) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Посетитель сайта (купон)",
          phone: data.phone,
          type: "RETAIL",
          comment: "Заявка на купон 10% из Exit Popup"
        })
      })
      if (res.ok) {
        alert("Промокод отправлен!")
        setShowExitPopup(false)
      }
    } catch (err) {
      alert("Ошибка при отправке")
    }
  }

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Cart Trigger */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <motion.button
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-12 md:h-14 bg-sky-600 text-white rounded-full shadow-2xl shadow-sky-400/50 flex items-center justify-center relative group"
              aria-label="Открыть корзину"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md p-0 overflow-hidden flex flex-col">
            <SheetHeader className="p-8 border-b border-slate-100 bg-white">
              <SheetTitle className="text-2xl font-bold flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-sky-600" />
                Ваша корзина
              </SheetTitle>
            </SheetHeader>

            <div className="flex-grow overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Корзина пуста</h3>
                  <p className="text-slate-400 text-sm">Добавьте что-нибудь из каталога, чтобы начать заказ</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 leading-tight pr-6">{item.name}</h4>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">{item.weight}</div>
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-sky-600">{item.price} ₽</div>
                          <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-1">
                            <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-sky-600" onClick={() => decrementQuantity(item.id)} aria-label="Уменьшить количество">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-sky-600" onClick={() => addToCart(item)} aria-label="Увеличить количество">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-400"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Удалить из корзины"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-white">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Итого к оплате:</div>
                    <div className="text-3xl font-extrabold text-slate-900">{totalPrice.toLocaleString()} ₽</div>
                  </div>
                </div>
                <Button
                  className="w-full h-12 md:h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Оформить заказ
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          type="CART"
        />

        {/* Telegram Button */}
        <motion.a
          href="https://t.me/fishkaliningrad"
          target="_blank"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-12 md:h-14 bg-white text-[#229ED9] rounded-full shadow-2xl shadow-slate-200 flex items-center justify-center border border-slate-100"
          aria-label="Написать в Telegram"
        >
          <Send className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl md:rounded-[40px] max-w-lg w-full p-6 md:p-16 relative overflow-hidden text-center"
            >
              <button 
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"
                onClick={() => setShowExitPopup(false)}
                aria-label="Закрыть"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-8">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Подождите!</h2>
                <p className="text-slate-500 mb-8">
                  Заберите скидку <span className="text-sky-600 font-bold text-lg">10%</span> на ваш первый заказ. Оставьте телефон, и мы пришлем вам промокод.
                </p>
                
                <form onSubmit={handleSubmit(onExitSubmit)} className="space-y-4">
                  <div>
                    <PatternFormat
                      format="+7 (###) ###-##-##"
                      mask="_"
                      onValueChange={(values) => setValue("phone", values.formattedValue)}
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full h-12 md:h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-center text-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="flex items-start gap-2 px-1 py-2">
                    <Checkbox
                      id="exit-agree"
                      checked={agree}
                      onCheckedChange={(checked) => setValue("agree", !!checked)}
                      className="mt-1"
                    />
                    <label htmlFor="exit-agree" className="text-[10px] text-slate-400 leading-tight text-left">
                      Согласен с <a href="/legal/privacy" className="underline hover:text-sky-600">политикой конфиденциальности</a> и даю согласие на <a href="/legal/consent" className="underline hover:text-sky-600">обработку персональных данных</a>
                    </label>
                  </div>
                  {errors.agree && <p className="text-red-500 text-[10px]">{errors.agree.message}</p>}

                  <Button type="submit" className="w-full h-12 md:h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl shadow-xl shadow-sky-100 transition-all" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Получить скидку"}
                  </Button>
                </form>

                <p className="mt-8 text-[10px] text-slate-300 uppercase tracking-widest leading-relaxed">
                  Акция действует до конца сегодняшнего дня
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
