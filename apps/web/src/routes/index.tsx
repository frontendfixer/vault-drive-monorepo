
import { createFileRoute } from '@tanstack/react-router'
import { HoverPrefetchLink } from '@/components/hover-prefetch-link'
import { Button } from '@/components/ui/button.tsx';

export const Route = createFileRoute('/')({ component: App })

function App() {
	const authUser = null
	const cta_link = {
		title: authUser ? 'Goto Home' : 'Get Started',
		link: authUser ? '/home' : '/login',
	}

	return (
		<main className="from-bg-primary/20 via-bg-primary/60 to-bg-primary/90 flex min-h-screen items-center justify-center bg-linear-to-br px-4">
			<div className="flex flex-col items-center justify-center text-center">
				{/* Logo/Badge */}
				<div className="bg-background/10 text-primary mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
					<div className="bg-success h-2 w-2 rounded-full"></div>
					<span>Secure Cloud Storage</span>
				</div>

				{/* Main Title */}
				<h1 className="text-primary mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
					Vault Drive | S3 File Manager
				</h1>

				{/* Subtitle/Description */}
				<p className="text-muted-foreground/80 mb-10 max-w-xl leading-relaxed md:text-xl">
					A secure, S3-backed file manager for your private cloud.
				</p>

				{/* CTA Button */}
				<HoverPrefetchLink href={cta_link.link}>
					<Button size="lg" variant={authUser ? 'default' : 'outline'}>
						{cta_link.title}
					</Button>
				</HoverPrefetchLink>

				{/* Decorative element */}
				<div className="mt-20 w-full border-0 border-t pt-8">
					<p className="text-muted-foreground/60 text-sm">
						Enterprise-grade security. Zero-knowledge architecture.
					</p>
				</div>
			</div>
		</main>
	)
}
