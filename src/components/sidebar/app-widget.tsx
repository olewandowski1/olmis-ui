import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import { ChevronRight, LucideIcon } from 'lucide-react';

type AppWidgetProps = {
  app: {
    name: string;
    logo: LucideIcon;
    version: string;
  };
};

export const AppWidget: React.FC<AppWidgetProps> = ({ app }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to='/home'>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <div className='flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground'>
              <app.logo className='size-4' />
            </div>
            <div className='grid flex-1 text-sm leading-tight text-left'>
              <span className='font-semibold truncate'>{app.name}</span>
              <span className='text-xs truncate'>{app.version}</span>
            </div>
            <ChevronRight className='ml-auto' />
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
