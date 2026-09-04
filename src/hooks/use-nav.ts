'use client';

/**
 * RBAC is disabled in this deployment (no auth provider configured), so
 * navigation items are shown unfiltered. Re-enable per-item access checks
 * here once an auth provider is wired back in.
 */

import type { NavItem, NavGroup } from '@/types';

export function useFilteredNavItems(items: NavItem[]) {
  return items;
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  return groups;
}
