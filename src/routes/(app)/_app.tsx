import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_app')({
  component: ProtectedLayout,
});

/**
 * @name ProtectedLayout
 * @description
 * Layout for protected routes. It wraps the content with the sidebar provider.
 */
function ProtectedLayout() {
  return <Outlet />;
}
