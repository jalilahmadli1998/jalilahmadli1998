import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <span className="text-lg font-semibold text-primary">{t('meta.brand')}</span>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('meta.slogan')}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t('navigation.services')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href={`/${locale}/services`} prefetch>
                  {t('sections.competencies.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/quality`} prefetch>
                  {t('sections.certifications.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/process`} prefetch>
                  {t('sections.process.title')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t('navigation.sectors')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href={`/${locale}/sectors`} prefetch>
                  {t('navigation.sectors')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} prefetch>
                  {t('navigation.projects')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/facility`} prefetch>
                  {t('navigation.facility')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t('navigation.contact')}</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {t('sections.contact.description')}
            </p>
            <Link
              href={`/${locale}/rfq`}
              className="mt-4 inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-slate-900"
              prefetch
            >
              {t('meta.cta')}
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} prefetch>
              {t('footer.privacy')}
            </Link>
            <Link href={`/${locale}/terms`} prefetch>
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
