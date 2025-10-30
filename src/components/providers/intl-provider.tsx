'use client';

import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';

interface IntlProviderProps {
  messages: Record<string, unknown>;
  locale: string;
}

export function IntlProvider({ children, messages, locale }: PropsWithChildren<IntlProviderProps>) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="Europe/Istanbul">
      {children}
    </NextIntlClientProvider>
  );
}
