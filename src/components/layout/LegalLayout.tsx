import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

export default function LegalLayout({ title, children, lastUpdated }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Назад на главную
          </Link>

          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm border border-slate-100">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h1>
            {lastUpdated && (
              <p className="text-slate-400 text-sm mb-8 italic">Последнее обновление: {lastUpdated}</p>
            )}

            <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
