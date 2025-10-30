import { cache } from 'react';
import type { Locale } from './locales';

export type Dictionary = typeof import('@/content/dictionaries/tr.json');

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  switch (locale) {
    case 'en':
      return (await import('@/content/dictionaries/en.json')).default;
    case 'ru':
      return (await import('@/content/dictionaries/ru.json')).default;
    default:
      return (await import('@/content/dictionaries/tr.json')).default;
  }
});
