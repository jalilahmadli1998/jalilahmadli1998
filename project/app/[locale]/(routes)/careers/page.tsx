import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';

export default async function CareersPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const positions = dictionary.sections.careers.positions;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.careers }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.careers}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.careers.description}</p>
        </header>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {positions.map((position) => (
            <article
              key={position.id}
              id={position.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{position.title}</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {position.location} · {position.type}
              </p>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{position.summary}</p>
              <a
                href={`mailto:talent@aemprecision.com?subject=${encodeURIComponent(position.title)}`}
                className="mt-6 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Başvur
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
