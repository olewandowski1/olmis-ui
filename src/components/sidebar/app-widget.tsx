import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import { Boxes, ChevronRight } from 'lucide-react';

export const AppWidget = () => {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to='/home'>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <Boxes className='size-4 shrink-0' />
            {isExpanded && (
              <>
                <div className='grid flex-1 text-sm leading-tight text-left'>
                  <span className='font-semibold truncate'> OpenLMIS </span>
                  <span className='text-xs truncate'>
                    Signed as: __administrator__
                  </span>
                </div>
                <ChevronRight className='ml-auto' />
              </>
            )}
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
