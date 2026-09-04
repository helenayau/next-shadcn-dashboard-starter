'use client';

import { Icons } from '@/components/icons';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size='lg' className='cursor-default hover:bg-transparent'>
          <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg'>
            <Icons.galleryVerticalEnd className='size-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>Shadcn Dashboard</span>
            <span className='text-muted-foreground truncate text-xs'>Demo Workspace</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
