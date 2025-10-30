import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n/locales';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { IntlProvider } from '@/components/providers/intl-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StickyCTA } from '@/components/ui/sticky-cta';
import Script from 'next/script';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const brand = dictionary.meta.brand.replace('{{MARKA_ADI}}', 'AEM Precision');
  const slogan = dictionary.meta.slogan.replace('{{SLOGAN}}', 'Veriyle doğrulanan üretim');

  return {
    title: `${brand} | ${slogan}`,
    description: dictionary.meta.description,
    alternates: {
      canonical: `https://www.example.com/${params.locale}`,
      languages: Object.fromEntries(locales.map((loc) => [loc, `https://www.example.com/${loc}`]))
    },
    openGraph: {
      locale: params.locale === 'tr' ? 'tr_TR' : params.locale === 'en' ? 'en_US' : 'ru_RU',
      url: `https://www.example.com/${params.locale}`
    }
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale);

  const brand = dictionary.meta.brand.replace('{{MARKA_ADI}}', 'AEM Precision');
  const slogan = dictionary.meta.slogan.replace('{{SLOGAN}}', 'Veriyle doğrulanan üretim');

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="alternate" hrefLang="x-default" href="https://www.example.com" />
        {locales.map((loc) => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`https://www.example.com/${loc}`} />
        ))}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: brand,
              slogan,
              url: 'https://www.example.com',
              logo: 'https://www.example.com/logo.png',
              sameAs: ['https://www.linkedin.com/company/example'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'AOSB 10044 Sok. No:12',
                addressLocality: 'İzmir',
                addressCountry: 'TR'
              }
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <IntlProvider messages={dictionary} locale={locale}>
            <AnalyticsProvider />
            <Header locale={locale} brand={brand} slogan={slogan} />
            <main>{children}</main>
            <Footer locale={locale} />
            <StickyCTA locale={locale} />
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
