import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';
import Image from 'next/image';

export default async function ProjectsPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const projects = dictionary.sections.projects.items;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.projects }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.projects}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.projects.subtitle}</p>
        </header>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.name}</h2>
                  <p className="text-xs uppercase tracking-wide text-secondary">{project.metrics}</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">Problem:</span> {project.problem}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Yaklaşım:</span> {project.approach}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Sonuç:</span> {project.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
