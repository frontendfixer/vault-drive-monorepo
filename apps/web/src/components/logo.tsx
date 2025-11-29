import { Link } from '@tanstack/react-router'
import { useTheme } from '@/integrations/providers/themes/theme-provider'
import { cn } from '@/lib/utils.ts';

export function Logo({
	imageSize = 32,
	orientation = 'horizontal',
	className,
}: {
	imageSize?: number
	orientation?: 'horizontal' | 'vertical'
	className?: string
}) {
	const { theme } = useTheme()
	return (
		<Link
			to="/"
			className={cn(
				'border-border bg-accent text-accent-foreground flex items-center gap-2 overflow-hidden rounded-4xl border p-1 pr-2.5',
				orientation === 'horizontal' ? 'flex-row' : 'flex-col',
				className,
			)}
		>
			<img
				src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'}
				alt="vault drive"
				className="rounded-full"
				width={imageSize}
				height={imageSize}
			/>
			<h5 className="scroll-m-20 text-base font-semibold tracking-tight">
				Vault Drive
			</h5>
		</Link>
	)
}
