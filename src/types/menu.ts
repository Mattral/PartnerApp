import { ReactNode } from 'react';

// MATERIAL - UI
import { ChipProps } from '@mui/material/Chip';

import { GenericCardProps } from './root';

// ==============================|| TYPES - MENU  ||============================== //

export type NavItemType = {
  breadcrumbs?: boolean;
  caption?: ReactNode | string;
  children?: NavItemType[];
  elements?: NavItemType[];
  chip?: ChipProps;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  disabled?: boolean;
  external?: boolean;
  icon?: GenericCardProps['iconPrimary'] | string;
  id?: string;
  search?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type MenuProps = {
  openedItem: string;
  openedComponent: string;
  openedHorizontalItem: string | null;

  /**
   * Indicate if dashboard layout menu open or not
   */
  isDashboardDrawerOpened: boolean;

  /**
   * Indicate if component layout menu open or not
   */
  isComponentDrawerOpened: boolean;
};
