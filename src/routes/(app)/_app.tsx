import { NotificationButton } from '@/components/notification-button';
import { AppSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Typography } from '@/components/ui/typography';
import { createFileRoute, Outlet } from '@tanstack/react-router';
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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear border-b group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-2'>
          <SidebarTrigger />

          <div className='flex gap-4 ml-auto'>
            <NotificationButton />
            <Button className='ml-auto' size='sm'>
              <LogOut />
              <Typography.Small> {t('logout')} </Typography.Small>
            </Button>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
