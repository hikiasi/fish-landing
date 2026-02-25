'use client';

import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden group">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors" />

        <div className="relative flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-0 right-0 text-slate-400 hover:text-white transition-colors"
              aria-label="Закрыть уведомление о куки"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-sm leading-relaxed text-slate-300 mb-4">
              Сайт использует файлы cookie и сервис Яндекс.Метрика. Данные не передаются третьим лицам. Подробнее в{' '}
              <a href="/legal/cookies" className="text-blue-400 hover:underline">политике использования cookie</a>.
              Продолжая пользоваться сайтом, вы соглашаетесь с этим.
            </p>

            <Button
              onClick={acceptCookies}
              className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold h-12 rounded-xl"
            >
              Хорошо, продолжаю
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
