import React from 'react';
import { LoadingIcon } from './loading-icon';
import { cn } from '@/lib/utils';

export function LoadingSpinner({ className }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <LoadingIcon className="text-primary size-10 animate-spin font-thin" />
    </div>
  );
}
