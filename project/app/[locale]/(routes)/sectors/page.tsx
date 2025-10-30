import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';

export default async function SectorsPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const sectors = dictionary.sections.sectors.items;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.sectors }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.sectors}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.sectors.subtitle}</p>
        </header>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sectors.map((sector) => (
            <article
              key={sector.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{sector.name}</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{sector.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-secondary">{sector.metrics}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
