import { NavGroup } from '@/types';

/**
 * Navigation configuration for the annuity user portal.
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 */
export const navGroups: NavGroup[] = [
  {
    label: '',
    items: [
      {
        title: 'My Annuity',
        url: '/',
        icon: 'piggyBank',
        isActive: false,
        shortcut: ['a', 'n'],
        items: []
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: 'profile',
        shortcut: ['m', 'm'],
        items: []
      },
      {
        title: 'Notifications',
        url: '/notifications',
        icon: 'notification',
        shortcut: ['n', 'n'],
        items: []
      }
    ]
  }
];
