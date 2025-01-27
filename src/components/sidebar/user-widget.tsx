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
  useSidebar,
} from '@/components/ui/sidebar';
import {
  ChevronsUpDown,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SAMPLE_USER = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  avatar: undefined,
};

export const UserWidget = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'app.UserWidget' });
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center justify-center cursor-pointer'
            >
              <Avatar className='rounded-lg size-9'>
                <AvatarImage src={SAMPLE_USER.avatar} alt={SAMPLE_USER.name} />
                <AvatarFallback className='rounded-lg'>
                  <UserRound size={20} strokeWidth={2} aria-hidden='true' />
                </AvatarFallback>
              </Avatar>
              {isExpanded && (
                <>
                  <div className='grid flex-1 text-sm leading-tight text-left'>
                    <span className='font-semibold truncate'>
                      {SAMPLE_USER.name}
                    </span>
                    <span className='text-xs truncate'>
                      {SAMPLE_USER.email}
                    </span>
                  </div>
                  <ChevronsUpDown className='ml-auto size-4' />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='flex items-start gap-2'>
              <Avatar className='rounded-lg size-9'>
                <AvatarImage src={SAMPLE_USER.avatar} alt={SAMPLE_USER.name} />
                <AvatarFallback className='rounded-lg'>
                  <UserRound size={20} strokeWidth={2} aria-hidden='true' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col min-w-0'>
                <span className='text-sm font-medium truncate text-foreground'>
                  {SAMPLE_USER.name}
                </span>
                <span className='text-xs font-normal truncate text-muted-foreground'>
                  {SAMPLE_USER.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ShieldCheck size={16} strokeWidth={2} aria-hidden='true' />
                <span>{t('roles')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={16} strokeWidth={2} aria-hidden='true' />
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
                <ModeToggle className='size-8' />
              </div>
              <div className='px-2 py-1.5 text-sm flex justify-between'>
                <span>{t('language')}</span>
                <LanguagePicker className='h-7' />
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut size={16} strokeWidth={2} aria-hidden='true' />
              <span>{t('logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
