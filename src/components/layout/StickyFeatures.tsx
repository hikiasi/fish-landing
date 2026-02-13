"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const exitFormSchema = z.object({
  phone: z.string().min(10, "Введите корректный номер телефона"),
})

type ExitFormValues = z.infer<typeof exitFormSchema>

export function StickyFeatures() {
  const { cart, totalItems, totalPrice, addToCart, decrementQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart()
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ExitFormValues>({
    resolver: zodResolver(exitFormSchema),
  })

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

  const onExitSubmit = (data: ExitFormValues) => {
    console.log("Exit Intent Lead:", data)
    alert("Промокод отправлен!")
    setShowExitPopup(false)
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
              className="w-14 h-14 bg-sky-600 text-white rounded-full shadow-2xl shadow-sky-400/50 flex items-center justify-center relative group"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-2xl font-bold flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-sky-600" />
                Ваша корзина
              </SheetTitle>
            </SheetHeader>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Корзина пуста</h3>
                <p className="text-slate-400 text-sm mb-8">Добавьте что-нибудь из каталога, чтобы начать заказ</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 leading-tight pr-6">{item.name}</h4>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">{item.weight}</div>
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-sky-600">{item.price} ₽</div>
                          <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-1">
                            <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-sky-600" onClick={() => decrementQuantity(item.id)}>
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-sky-600" onClick={() => addToCart(item)}>
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-400"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100 mt-6 pb-20">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Итого к оплате:</div>
                      <div className="text-3xl font-extrabold text-slate-900">{totalPrice.toLocaleString()} ₽</div>
                    </div>
                    {totalPrice < 2000 && (
                      <div className="text-[10px] text-orange-500 font-bold uppercase text-right">
                        До бесплатной доставки <br /> ещё {(2000 - totalPrice)} ₽
                      </div>
                    )}
                  </div>
                  <Button className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-xl shadow-xl shadow-sky-100">
                    Оформить заказ
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Telegram Button */}
        <motion.a
          href="https://t.me/fishkaliningrad"
          target="_blank"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-white text-[#229ED9] rounded-full shadow-2xl shadow-slate-200 flex items-center justify-center border border-slate-100"
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
              className="bg-white rounded-[40px] max-w-lg w-full p-10 md:p-16 relative overflow-hidden text-center"
            >
              <button 
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"
                onClick={() => setShowExitPopup(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-8">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Подождите!</h2>
                <p className="text-slate-500 mb-8">
                  Заберите скидку <span className="text-sky-600 font-bold text-lg">10%</span> на ваш первый заказ. Оставьте телефон, и мы пришлем вам промокод в Telegram или СМС.
                </p>
                
                <form onSubmit={handleSubmit(onExitSubmit)} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="+7 (___) ___-__-__" 
                      {...register("phone")}
                      className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-center text-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <Button type="submit" className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-lg font-bold rounded-2xl">
                    Получить скидку
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
