'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Tooltip } from '../ui/tooltip';

export function CompetenciesGrid() {
  const t = useTranslations('sections.competencies');
  const items = t('items', { returnObjects: true }) as Array<{
    title: string;
    description: string[];
    tooltip: string;
  }>;
  const prefersReducedMotion = useReducedMotion();
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);

  return (
    <section id="competencies" className="bg-background-light dark:bg-background-dark py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg">
            Teknik özellikleri görmek için bilgi ikonlarına odaklanın. Klavye ile gezinebilir, tooltipler ESC ile kapanır.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
              className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition focus-within:ring-2 focus-within:ring-primary hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <Tooltip
                  content={item.tooltip}
                  open={openTooltip === index}
                  onOpenChange={(open) => setOpenTooltip(open ? index : null)}
                >
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 p-1 text-slate-500 transition group-hover:scale-105 group-hover:border-primary group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={item.tooltip}
                  >
                    <InformationCircleIcon className="h-5 w-5" aria-hidden />
                  </button>
                </Tooltip>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {item.description.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
