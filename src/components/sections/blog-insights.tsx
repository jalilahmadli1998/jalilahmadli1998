'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export function BlogInsights({ locale }: { locale: string }) {
  const t = useTranslations('sections.blog');
  const items = t('items', { returnObjects: true }) as Array<{
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    slug: string;
  }>;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="insights" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            prefetch
          >
            {t('cta')}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">{post.readingTime}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{post.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(locale)}</time>
                <Link href={`/${locale}/blog/${post.slug}`} className="font-semibold text-primary" prefetch>
                  {t('read')}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
