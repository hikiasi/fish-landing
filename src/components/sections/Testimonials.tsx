"use client"

import { motion } from "framer-motion"
import { Star, BadgeCheck } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const REVIEWS = [
  {
    name: "Марина",
    location: "Сельма",
    rating: 5,
    date: "2 недели назад",
    text: "Заказала стейки палтуса и креветки. Палтус оказался без единой косточки, сочный невероятно. Креветки крупнее, чем в Виктории за те же деньги. Теперь только у вас!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Александр",
    location: "Центр",
    rating: 5,
    date: "1 месяц назад",
    text: "Сёмга отличная, жирная, как и обещали. Доставка быстрая, привезли через 4 часа после заказа. Вакуумная упаковка качественная, удобно хранить.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Елена",
    location: "Гурьевск",
    rating: 4,
    date: "3 недели назад",
    text: "Креветки просто бомба! Огромные, льда вообще нет. Одну звезду сняла за то, что курьер опоздал на 15 минут, но качество рыбы всё перекрывает.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Игорь",
    location: "Чкаловск",
    rating: 5,
    date: "5 дней назад",
    text: "Попробовал набор Семейный ужин. Очень выгодно получается. Треска шикарная, после разморозки не разваливается, плотная. Рекомендую!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Что говорят калининградцы о нашей рыбе
          </h2>
          <p className="text-slate-500 font-medium">
            127 отзывов • Средняя оценка 4.8/5
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {REVIEWS.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-slate-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {review.name}, {review.location}
                          </div>
                          <div className="flex text-orange-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3 h-3 fill-current",
                                  i >= review.rating && "text-slate-200"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-400 mb-3">{review.date}</div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                        &quot;{review.text}&quot;
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                        <BadgeCheck className="w-4 h-4" />
                        Проверенная покупка
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-none bg-white shadow-md hover:bg-slate-50" />
            <CarouselNext className="hidden md:flex -right-12 border-none bg-white shadow-md hover:bg-slate-50" />
          </Carousel>
        </div>

        <div className="mt-16 text-center">
          <button className="text-sky-600 font-bold hover:underline">
            Все 127 отзывов
          </button>
        </div>
      </div>
    </section>
  )
}
