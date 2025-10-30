'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

export function ContactDetails() {
  const t = useTranslations('sections.contact');
  const offices = t('offices', { returnObjects: true }) as Array<{
    name: string;
    address: string;
    hours: string;
    phone: string;
  }>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">{t('description')}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{t('notice')}</div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {offices.map((office, index) => (
            <motion.article
              key={office.name}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{office.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{office.address}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{office.hours}</p>
              <a
                href={`tel:${office.phone.replace(/\s+/g, '')}`}
                className="mt-4 inline-flex text-sm font-semibold text-primary"
              >
                {office.phone}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
