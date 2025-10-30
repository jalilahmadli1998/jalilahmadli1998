'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ProcessStepper() {
  const t = useTranslations('sections.process');
  const steps = t('steps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    deliverable: string;
  }>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="process" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              <div className="mt-4 rounded-xl bg-secondary/10 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold">{t('deliverableLabel')}:</span> {step.deliverable}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
