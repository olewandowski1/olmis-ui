import { RootLayout } from '@/components/root-layout';
import { IS_AUTHENTICATED, SHOW_DEVTOOLS } from '@/lib/mock-data';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const PUBLIC_PAGES = ['/login'];

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ location }) => {
    if (!PUBLIC_PAGES.includes(location.pathname) && !IS_AUTHENTICATED) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to='/'>Start Over</Link>
      </div>
    );
  },
});

/**
 * @name RootComponent
 *
 * @description
 * This is the root component of the application. It is the parent of all other components.
 */
function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
      {SHOW_DEVTOOLS && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-right' />
          <TanStackRouterDevtools position='bottom-left' />
        </>
      )}
    </RootLayout>
  );
}
