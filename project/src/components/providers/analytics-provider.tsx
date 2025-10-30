'use client';

import { useEffect } from 'react';

export function AnalyticsProvider() {
  useEffect(() => {
    const handler = (event: Event) => {
      if (event instanceof CustomEvent) {
        console.debug('Analytics event', event.detail);
      }
    };
    window.addEventListener('analytics', handler as EventListener);
    return () => window.removeEventListener('analytics', handler as EventListener);
  }, []);

  return null;
}
