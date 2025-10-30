import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';

export default async function FacilityPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const machines = dictionary.sections.facility.machines;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.facility }]} />
        <header className="mt-6 max-w-4xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.facility}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.facility.description}</p>
        </header>
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300">{dictionary.sections.facility.columns.machine}</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300">{dictionary.sections.facility.columns.envelope}</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300">{dictionary.sections.facility.columns.precision}</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300">{dictionary.sections.facility.columns.count}</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300">{dictionary.sections.facility.columns.note}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {machines.map((machine) => (
                  <tr key={machine.machine} className="hover:bg-primary/5">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{machine.machine}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{machine.envelope}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 tabular-nums">{machine.precision}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 tabular-nums">{machine.count}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{machine.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
