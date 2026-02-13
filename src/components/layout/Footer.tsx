"use client"

import { Ship, Send, ExternalLink, MapPin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer id="footer" className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white">
                <Ship className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-slate-900">Калининградская рыба</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Калининградский рыбоперерабатывающий завод. Прямые поставки свежемороженой продукции с 2018 года.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white transition-all">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white transition-all">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Покупателям</h4>
            <ul className="space-y-4">
              {["Каталог продукции", "Доставка и оплата", "Гарантии и возврат", "Оптовые поставки", "Сертификаты", "Вакансии"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">{item}</a>
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
                  <a href="tel:+74012000000" className="text-sm font-bold text-slate-900">+7 (4012) XX-XX-XX</a>
                  <div className="text-[10px] text-slate-400 uppercase">Ежедневно 8:00 - 20:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-500 mt-1" />
                <div className="text-sm text-slate-500">г. Калининград, ул. Портовая, 28</div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-500 mt-1" />
                <a href="mailto:info@fishkaliningrad.ru" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">info@fishkaliningrad.ru</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Информация</h4>
            <div className="text-[10px] text-slate-400 space-y-2 mb-6 uppercase tracking-tighter">
              <div>ООО «Рыбный завод»</div>
              <div>ИНН: ХХХХХХХХХХХХ</div>
              <div>ОГРН: ХХХХХХХХХХХХХХ</div>
            </div>
            <ul className="space-y-4">
              {["Политика конфиденциальности", "Пользовательское соглашение", "Договор оферты"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-xs text-slate-400 hover:text-sky-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-400">
            © 2018-{new Date().getFullYear()} Калининградская рыба. Все права защищены.
          </div>
          <div className="flex items-center gap-4 opacity-30 grayscale">
            {/* Payment Icons Placeholder */}
            <div className="w-8 h-5 bg-slate-400 rounded-sm" />
            <div className="w-8 h-5 bg-slate-400 rounded-sm" />
            <div className="w-8 h-5 bg-slate-400 rounded-sm" />
            <div className="w-8 h-5 bg-slate-400 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  )
}
