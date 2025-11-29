import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import NotFoundPage from './components/not-found'
import { RootProviders } from './integrations/providers'
import { getContext } from './integrations/tanstack-query/root-provider'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
	const rqContext = getContext()

	const router = createRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: 'intent',
		defaultNotFoundComponent: NotFoundPage,
		Wrap: (props: { children: React.ReactNode }) => {
			return <RootProviders>{props.children}</RootProviders>
		},
	})

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	})

	return router
}
