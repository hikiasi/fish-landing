"use client"

import { Ship, Send, ExternalLink, MapPin, Mail, Phone, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer id="footer" className="bg-white pt-12 md:pt-20 pb-10 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-100">
                <Ship className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-slate-900">Океаника</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Поставки свежемороженой рыбы и морепродуктов высокого качества в Калининграде и области.
            </p>
            <div className="flex gap-4">
              <a href="https://vk.com/fishkaliningrad" target="_blank" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-600 hover:text-white transition-all" aria-label="ВКонтакте">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://t.me/fishkaliningrad" target="_blank" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-600 hover:text-white transition-all" aria-label="Telegram">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Навигация</h4>
            <ul className="space-y-4">
              {[
                { name: "Каталог продукции", href: "/#catalog-section" },
                { name: "Доставка и оплата", href: "/#economy-section" },
                { name: "Гарантии и сервис", href: "/#footer" },
                { name: "Оптовые поставки", href: "/#b2b-section" },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-sm text-slate-500 hover:text-sky-600 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-500 mt-1" />
                <div>
                  <a href="tel:+79114864797" className="text-sm font-bold text-slate-900 hover:text-sky-600">+7 (911) 486-47-97</a>
                  <div className="text-[10px] text-slate-400 uppercase">Ежедневно 8:00 - 20:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-500 mt-1" />
                <div className="text-sm text-slate-500">г. Калининград, Правая набережная 2</div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-500 mt-1" />
                <a href="mailto:timlistroy@inbox.ru" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">timlistroy@inbox.ru</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Информация</h4>
            <div className="text-[10px] text-slate-400 space-y-2 mb-6 uppercase tracking-tighter">
              <div>ИП Иргашева М.Н.</div>
              <div>ИНН: 390400499460</div>
              <div>ОГРНИП: 324390000018143</div>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/legal/privacy" className="text-[10px] text-slate-400 hover:text-sky-600 transition-colors">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="/legal/offer" className="text-[10px] text-slate-400 hover:text-sky-600 transition-colors">Публичная оферта</a>
              </li>
              <li>
                <a href="/legal/consent" className="text-[10px] text-slate-400 hover:text-sky-600 transition-colors">Согласие на обработку данных</a>
              </li>
              <li>
                <a href="/legal/cookies" className="text-[10px] text-slate-400 hover:text-sky-600 transition-colors">Использование файлов cookie</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Океаника. Все права защищены.
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            Нам доверяют более 5000 клиентов
          </div>
        </div>
      </div>
    </footer>
  )
}
