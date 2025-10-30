import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';
import { ContactDetails } from '@/components/sections/contact-details';

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.contact }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.contact}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.contact.description}</p>
        </header>
      </div>
      <ContactDetails />
    </div>
  );
}
