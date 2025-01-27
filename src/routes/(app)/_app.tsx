import { AppSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Bell, LogOut } from 'lucide-react';

export const Route = createFileRoute('/(app)/_app')({
  component: ProtectedLayout,
});

/**
 * @name ProtectedLayout
 * @description
 * Layout for protected routes. It wraps the content with the sidebar provider.
 */
function ProtectedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear border-b group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-2'>
          <SidebarTrigger />

          <div className='flex gap-2 ml-auto'>
            <Button size='icon' variant='outline'>
              <Bell />
            </Button>
            <Button className='ml-auto' size='sm'>
              <LogOut />
              <p> Logout </p>
            </Button>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
