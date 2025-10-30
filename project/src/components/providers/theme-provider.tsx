'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren, useEffect } from 'react';

export function ThemeProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        document.documentElement.setAttribute('data-prefers-reduced-motion', 'reduce');
      }
    }
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
