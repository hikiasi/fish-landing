"use client"

import { motion } from "framer-motion"
import { Star, BadgeCheck, ExternalLink } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

const YANDEX_MAPS_URL = "https://yandex.ru/maps/org/kaliningradskaya_ryba/1234567890" // Placeholder

const REVIEWS = [
  {
    name: "Марина",
    location: "Владелец магазина",
    rating: 5,
    date: "2 недели назад",
    text: "Работаем с ребятами уже несколько месяцев. Продукция всегда отличного качества, никакой глазури. Покупатели в восторге от аргентинских креветок и чилийского лосося.",
    avatar: "/uploads/testimonial-marina.jpg",
  },
  {
    name: "Александр",
    location: "Шеф-повар ресторана",
    rating: 5,
    date: "1 месяц назад",
    text: "Для нас критически важно качество и соблюдение сроков. Поставки 3 раза в неделю позволяют всегда иметь свежий продукт. Стейки палтуса и сибас — топ!",
    avatar: "/uploads/testimonial-alexander.jpg",
  },
  {
    name: "Елена",
    location: "Кафе-кондитерская",
    rating: 5,
    date: "3 недели назад",
    text: "Берем рыбу для ланчей и завтраков. Всегда чистый вес, без льда. Очень удобно, что есть полный пакет документов Меркурий.",
    avatar: "/uploads/testimonial-elena.jpg",
  },
  {
    name: "Игорь",
    location: "Закупщик ХоРеКа",
    rating: 5,
    date: "5 дней назад",
    text: "Лучшие цены в городе на креветки Ваннамей и Лангустины. Доставка быстрая, водители вежливые. Рекомендую как надежного партнера.",
    avatar: "/uploads/testimonial-igor.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Что говорят партнеры о нашей рыбе
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
                  <a href={YANDEX_MAPS_URL} target="_blank" rel="noopener noreferrer" className="block h-full group">
                    <Card className="h-full border-slate-100 shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1 rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-12 h-12 shrink-0">
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              fill
                              className="rounded-full object-cover border-2 border-white shadow-sm"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {review.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{review.location}</div>
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

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                            <BadgeCheck className="w-4 h-4" />
                            Проверенный отзыв
                          </div>
                          <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-sky-500 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-none bg-white shadow-md hover:bg-slate-50" />
            <CarouselNext className="hidden md:flex -right-12 border-none bg-white shadow-md hover:bg-slate-50" />
          </Carousel>
        </div>

        <div className="mt-16 text-center">
          <a
            href={YANDEX_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sky-600 font-bold hover:underline gap-2"
          >
            Все 127 отзывов на Яндекс.Картах
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
