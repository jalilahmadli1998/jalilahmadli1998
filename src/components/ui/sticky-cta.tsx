'use client';

import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function StickyCTA({ locale }: { locale: string }) {
  const t = useTranslations('meta');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-transform ${visible ? 'translate-y-0' : 'translate-y-24'} drop-shadow-lg`}
    >
      <Link
        href={`/${locale}/rfq`}
        className="inline-flex items-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        prefetch
      >
        {t('cta')}
      </Link>
    </div>
  );
}
