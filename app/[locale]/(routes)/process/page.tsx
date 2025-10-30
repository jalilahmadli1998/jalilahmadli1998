import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';

export default async function ProcessPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const steps = dictionary.sections.process.steps;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.process }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.process}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.process.subtitle}</p>
        </header>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{step.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-secondary">Teslimat: {step.deliverable}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
