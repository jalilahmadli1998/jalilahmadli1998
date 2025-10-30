import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const competencies = dictionary.sections.competencies.items;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.services }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.services}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.competencies.subtitle}</p>
        </header>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {competencies.map((competency) => (
            <article
              key={competency.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{competency.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {competency.description.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs uppercase tracking-wide text-secondary">{competency.tooltip}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
