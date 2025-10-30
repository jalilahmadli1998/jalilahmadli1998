'use client';

import { PropsWithChildren, useId } from 'react';

interface TooltipProps {
  content: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({ children, content, open, onOpenChange }: PropsWithChildren<TooltipProps>) {
  const id = useId();

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => onOpenChange?.(true)}
      onMouseLeave={() => onOpenChange?.(false)}
      onFocus={() => onOpenChange?.(true)}
      onBlur={() => onOpenChange?.(false)}
    >
      {children}
      {open ? (
        <div
          role="tooltip"
          id={id}
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}
