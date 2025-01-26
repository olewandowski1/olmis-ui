'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type MenuRoutesProps = {
  menuRoutes: {
    key: string;
    icon?: React.FC;
    items: {
      key: string;
      href: string;
      isActive: boolean;
    }[];
  }[];
};

export const MenuRoutes: React.FC<MenuRoutesProps> = ({ menuRoutes }) => {
  const { t } = useTranslation('routes');

  return (
    <SidebarMenu>
      {menuRoutes.map((route) => {
        return (
          <Collapsible
            key={route.key}
            // defaultOpen={route.items.some((item) =>
            //   pathname.includes(item.key)
            // )}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={t(route.key)}>
                  {route.icon ? <route.icon /> : <Ellipsis />}
                  <span>{t(route.key)}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {route.items.map((item) => (
                    <SidebarMenuSubItem key={item.key}>
                      <SidebarMenuSubButton
                        asChild
                        // isActive={pathname.includes(item.href)}
                      >
                        <Link to={`/${item.href}`}>{t(item.key)}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </SidebarMenu>
  );
};
