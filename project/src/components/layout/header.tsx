'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, GlobeAltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames } from '@/lib/i18n/locales';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

interface HeaderProps {
  locale: string;
  brand: string;
  slogan: string;
}

const menuSections = [
  {
    key: 'services',
    links: [
      { href: 'services', descriptionKey: 'sections.competencies.title' },
      { href: 'quality', descriptionKey: 'sections.certifications.title' },
      { href: 'process', descriptionKey: 'sections.process.title' }
    ]
  },
  {
    key: 'sectors',
    links: [
      { href: 'sectors', descriptionKey: 'sections.sectors.title' },
      { href: 'projects', descriptionKey: 'sections.projects.title' },
      { href: 'facility', descriptionKey: 'sections.facility.title' }
    ]
  }
];

export function Header({ locale, brand, slogan }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchLocale = (targetLocale: string) => {
    const segments = pathname?.split('/') ?? [];
    segments[1] = targetLocale;
    return segments.join('/') || `/${targetLocale}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={`${brand} ${slogan}`} prefetch>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">GE</span>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold tracking-wide uppercase text-primary">{brand}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{slogan}</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6" aria-label={t('navigation.home')}>
          {['services', 'sectors', 'projects', 'facility', 'quality', 'process', 'blog', 'careers', 'rfq', 'contact'].map((key) => (
            <Link
              key={key}
              href={`/${locale}/${key === 'services' ? 'services' : key}`}
              className="text-sm font-medium text-slate-600 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              prefetch
            >
              {t(`navigation.${key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center rounded-full border border-slate-200 dark:border-slate-700 px-2 py-1" role="group" aria-label={t('navigation.rfq')}>
            {locales.map((loc) => (
              <Link
                key={loc}
                href={switchLocale(loc)}
                className={clsx('px-2 py-1 text-xs font-medium rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2', {
                  'bg-primary text-white': loc === locale,
                  'text-slate-600 hover:text-primary dark:text-slate-300': loc !== locale
                })}
              >
                <span className="sr-only">{localeNames[loc]}</span>
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={theme === 'dark' ? 'Use light mode' : 'Use dark mode'}
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" aria-hidden /> : <MoonIcon className="h-5 w-5" aria-hidden />}
          </button>
          <Link
            href={`/${locale}/rfq`}
            className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            prefetch
          >
            {t('meta.cta')}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-primary lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Bars3Icon className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-background-light dark:bg-background-dark px-6 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-primary">{brand}</span>
              <button type="button" className="rounded-full p-2 text-slate-600" onClick={() => setOpen(false)} aria-label="Close menu">
                <XMarkIcon className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <nav className="mt-6 space-y-6">
              {menuSections.map((section) => (
                <div key={section.key}>
                  <div className="text-xs uppercase tracking-wide text-slate-500 flex items-center gap-2">
                    <GlobeAltIcon className="h-4 w-4" aria-hidden />
                    {t(`navigation.${section.key}`)}
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${locale}/${link.href}`}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
                        onClick={() => setOpen(false)}
                        prefetch
                      >
                        <div>{t(`navigation.${link.href}` as const)}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t(link.descriptionKey)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={switchLocale(loc)}
                    className={clsx('flex-1 rounded-full border px-4 py-2 text-center text-sm font-semibold', {
                      'bg-primary text-white border-primary': loc === locale,
                      'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200': loc !== locale
                    })}
                    onClick={() => setOpen(false)}
                  >
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
