
import { LoaderCircle  } from 'lucide-react'
import type {LucideProps} from 'lucide-react';
import { cn } from '@/lib/utils.ts';

export function LoadingIcon({ className, ...props }: LucideProps) {
	return (
		<LoaderCircle className={cn('size-4 animate-spin', className)} {...props} />
	)
}
