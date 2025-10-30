'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function FacilityTable() {
  const t = useTranslations('sections.facility');
  const machines = t('machines', { returnObjects: true }) as Array<{
    machine: string;
    envelope: string;
    precision: string;
    count: number;
    note: string;
  }>;
  const columns = t('columns', { returnObjects: true }) as Record<string, string>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="facility" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{t('description')}</p>
          </div>
          <div className="rounded-2xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">
            24/7 enerji izleme · <span className="tabular-nums">ISO 50001</span> geçiş planı
          </div>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">{columns['machine']}</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">{columns['envelope']}</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">{columns['precision']}</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">{columns['count']}</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">{columns['note']}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {machines.map((machine, index) => (
                  <motion.tr
                    key={machine.machine}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="hover:bg-primary/5 focus-within:bg-primary/10"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{machine.machine}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{machine.envelope}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 tabular-nums">{machine.precision}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 tabular-nums">{machine.count}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{machine.note}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
