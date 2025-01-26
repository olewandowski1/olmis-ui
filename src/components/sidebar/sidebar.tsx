import { AppWidget } from '@/components/sidebar/app-widget';
import { MainRoutes } from '@/components/sidebar/main-routes';
import { MenuRoutes } from '@/components/sidebar/menu-routes';
import { UserWidget } from '@/components/sidebar/user-widget';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Boxes, Home, LogIn, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SAMPLE_DATA = {
  app: {
    name: '@Template',
    logo: Boxes,
    version: '0.1.0',
  },
  user: {
    name: 'John Doe',
    email: 'john@doe.com',
    avatar: undefined,
  },
  mainRoutes: [
    {
      key: 'home',
      href: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      key: 'login',
      href: '/login',
      icon: LogIn,
      isActive: true,
    },
  ],
  menuRoutes: [
    {
      key: 'administration',
      icon: Terminal,
      items: [
        {
          key: 'tasks',
          href: '/tasks',
          isActive: true,
        },
        {
          key: 'notFound',
          href: '/not-found',
          isActive: true,
        },
      ],
    },
  ],
};

export const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  const { t } = useTranslation('AppSidebar');

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <AppWidget app={SAMPLE_DATA.app} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <MainRoutes mainRoutes={SAMPLE_DATA.mainRoutes} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t('menu')}</SidebarGroupLabel>
          <MenuRoutes menuRoutes={SAMPLE_DATA.menuRoutes} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserWidget user={SAMPLE_DATA.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
