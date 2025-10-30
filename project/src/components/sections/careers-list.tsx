'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export function CareersList({ locale }: { locale: string }) {
  const t = useTranslations('sections.careers');
  const positions = t('positions', { returnObjects: true }) as Array<{
    title: string;
    location: string;
    type: string;
    summary: string;
    id: string;
  }>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="careers" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">{t('description')}</p>
          </div>
          <Link
            href={`/${locale}/careers`}
            className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            prefetch
          >
            {t('cta')}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {positions.map((role, index) => (
            <motion.article
              key={role.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{role.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {role.location} · {role.type}
                </p>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{role.summary}</p>
              </div>
              <Link
                href={`/${locale}/careers#${role.id}`}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                prefetch
              >
                {t('apply')}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
