'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function SectorsGrid() {
  const t = useTranslations('sections.sectors');
  const items = t('items', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    metrics: string;
  }>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="sectors" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((sector, index) => (
            <motion.article
              key={sector.name}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{sector.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{sector.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">{sector.metrics}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
