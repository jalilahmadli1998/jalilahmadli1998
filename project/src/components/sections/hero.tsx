'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const meta = useTranslations('meta');
  const nav = useTranslations('navigation');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background-dark text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1581092795360-9449033d6d87?auto=format&fit=crop&w=1600&q=80"
          alt="Üretim hattı"
          fill
          className="object-cover object-center opacity-60"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto grid gap-10 px-4 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider uppercase">
              {t('socialProof')}
            </p>
            <motion.h1
              initial={prefersReducedMotion ? undefined : { y: 20, opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl font-heading font-bold leading-tight tracking-tight lg:text-5xl"
            >
              {t('headline')}
            </motion.h1>
            <motion.p
              initial={prefersReducedMotion ? undefined : { y: 20, opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
              className="mt-6 text-lg text-slate-200"
            >
              {t('subheadline')}
            </motion.p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {t('kpi', { returnObjects: true }).map((item: { label: string; value: string }) => (
                <motion.div
                  key={item.label}
                  initial={prefersReducedMotion ? undefined : { y: 30, opacity: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg"
                >
                  <dt className="text-sm text-slate-300">{item.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums">{item.value}</dd>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/rfq`}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                prefetch
              >
                {meta('cta')}
              </Link>
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                prefetch
              >
                {nav('projects')}
              </Link>
            </div>
          </div>
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative rounded-3xl border border-white/20 bg-white/5 p-8"
          >
            <div className="grid gap-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-secondary">KPI</p>
                <p className="mt-2 text-3xl font-semibold text-white">G2.5 @ 3000 rpm</p>
                <p className="text-sm text-slate-200">Dinamik balans doğrulandı.</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-secondary">Ra</p>
                <p className="mt-2 text-3xl font-semibold text-white">0.2 μm</p>
                <p className="text-sm text-slate-200">Parlatma sonrası ölçüm.</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-secondary">Teslim</p>
                <p className="mt-2 text-3xl font-semibold text-white">18 gün</p>
                <p className="text-sm text-slate-200">Seri üretim ilk lot.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
