import { NavGroup } from '@/types';

/**
 * Navigation configuration for the annuity user portal.
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'My Annuity',
        url: '/dashboard/annuity',
        icon: 'piggyBank',
        isActive: false,
        shortcut: ['a', 'n'],
        items: []
      }
    ]
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'profile',
        shortcut: ['m', 'm'],
        items: []
      },
      {
        title: 'Notifications',
        url: '/dashboard/notifications',
        icon: 'notification',
        shortcut: ['n', 'n'],
        items: []
      }
    ]
  }
];
