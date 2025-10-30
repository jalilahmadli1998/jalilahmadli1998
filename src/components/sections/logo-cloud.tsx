'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function LogoCloud() {
  const t = useTranslations('sections.clients');
  const logos = t('logos', { returnObjects: true }) as string[];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-background-light py-16 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-secondary">{t('title')}</p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold tracking-wide text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
