'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export function Certifications() {
  const t = useTranslations('sections.certifications');
  const items = t('items', { returnObjects: true }) as Array<{ name: string; file: string }>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="quality" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{t('description')}</p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Audit KPI</h3>
              <dl className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between"><dt>PPM</dt><dd className="font-semibold tabular-nums">58</dd></div>
                <div className="flex items-center justify-between"><dt>OTD</dt><dd className="font-semibold tabular-nums">99.7%</dd></div>
                <div className="flex items-center justify-between"><dt>CAPA</dt><dd className="font-semibold tabular-nums"><span aria-hidden>≤</span>48 saat</dd></div>
              </dl>
            </div>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.file}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:bg-slate-900"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PDF · 1.2MB</p>
                </div>
                <DocumentArrowDownIcon className="h-6 w-6 text-primary" aria-hidden />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
