// PROJECT IMPORTS
import applications from './applications';

import pages from './pages';

// TYPES
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [applications, pages]
};

export default menuItems;
