'use client';

import { LanguagePicker } from '@/components/language-picker';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { User } from '@/lib/types';
import {
  ChevronsUpDown,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

type UserWidgetProps = {
  user: User;
};

export const UserWidget: React.FC<UserWidgetProps> = ({ user }) => {
  const { t } = useTranslation('UserWidget');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='w-8 h-8 rounded-lg'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='rounded-lg'>
                  <UserRound
                    size={16}
                    strokeWidth={2}
                    className='opacity-60'
                    aria-hidden='true'
                  />
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-sm leading-tight text-left'>
                <span className='font-semibold truncate'>{user.name}</span>
                <span className='text-xs truncate'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='flex items-start gap-2'>
              <Avatar className='w-8 h-8 rounded-lg'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='rounded-lg'>
                  <UserRound
                    size={16}
                    strokeWidth={2}
                    className='opacity-60'
                    aria-hidden='true'
                  />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col min-w-0'>
                <span className='text-sm font-medium truncate text-foreground'>
                  {user.name}
                </span>
                <span className='text-xs font-normal truncate text-muted-foreground'>
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ShieldCheck
                  size={16}
                  strokeWidth={2}
                  className='opacity-60'
                  aria-hidden='true'
                />
                <span>{t('roles')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings
                  size={16}
                  strokeWidth={2}
                  className='opacity-60'
                  aria-hidden='true'
                />
                <span>{t('settings')}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <span>{t('preferences')}</span>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <div className='px-2 py-1.5 text-sm flex justify-between'>
                <span>{t('theme')}</span>
                <ModeToggle />
              </div>
              <div className='px-2 py-1.5 text-sm flex justify-between'>
                <span>{t('language')}</span>
                <LanguagePicker />
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut
                size={16}
                strokeWidth={2}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>{t('logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
