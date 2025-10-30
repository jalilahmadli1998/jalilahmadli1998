'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ProjectsShowcase() {
  const t = useTranslations('sections.projects');
  const items = t('items', { returnObjects: true }) as Array<{
    name: string;
    problem: string;
    approach: string;
    result: string;
    metrics: string;
    image: string;
  }>;
  const labels = t('labels', { returnObjects: true }) as Record<string, string>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.name}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm uppercase tracking-wide text-secondary">{item.metrics}</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">{labels['problem']}:</span> {item.problem}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">{labels['approach']}:</span> {item.approach}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">{labels['result']}:</span> {item.result}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
