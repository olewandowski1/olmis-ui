import { NotificationButton } from '@/components/notification-button';
import { AppSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Typography } from '@/components/ui/typography';
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/(app)/_app')({
  component: ProtectedLayout,
});

/**
 * @name ProtectedLayout
 * @description
 * Layout for protected routes. It wraps the content with the sidebar provider.
 */
function ProtectedLayout() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'app.ProtectedLayout',
  });

  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 p-2 bg-sidebar'>
          <SidebarTrigger />

          <Separator orientation='vertical' className='h-4' />

          <div className='flex gap-4 ml-auto'>
            <NotificationButton />
            <Button className='ml-auto' size='sm' onClick={handleLogout}>
              <LogOut />
              <Typography.Small> {t('logout')} </Typography.Small>
            </Button>
          </div>
        </header>
        <Separator />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
