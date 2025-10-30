import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';

export default async function QualityPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const certifications = dictionary.sections.certifications.items;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.quality }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.quality}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.certifications.description}</p>
        </header>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {certifications.map((certification) => (
            <a
              key={certification.name}
              href={certification.file}
              className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{certification.name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">PDF · 1.2MB</p>
              </div>
              <span className="text-sm font-semibold text-primary">İndir</span>
            </a>
          ))}
        </div>
        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Süreç Kontrolleri</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            SPC, MSA, 8D, PPAP ve APQP süreçleri dijital izlenebilirlik ile yönetilir. Balans raporları ISO 1940-1 formatında sunulur.
          </p>
        </section>
      </div>
    </div>
  );
}
