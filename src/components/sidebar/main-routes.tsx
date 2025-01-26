'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

type MainRoutesProps = {
  mainRoutes: {
    key: string;
    href: string;
    icon: React.FC;
    isActive: boolean;
  }[];
};

export const MainRoutes: React.FC<MainRoutesProps> = ({ mainRoutes }) => {
  const { t } = useTranslation('routes');

  return (
    <SidebarMenu>
      {mainRoutes.map((route) => (
        <SidebarMenuItem key={route.key}>
          <SidebarMenuButton
            asChild
            // className={cn('', {
            //   'bg-sidebar-accent': pathname === route.href,
            // })}
          >
            <Link to={route.href}>
              <route.icon />
              <span>{t(route.key)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
