import { FormattedMessage } from 'react-intl';
import { Home3, HomeTrendUp, Box1, Airplane, Profile2User, Story } from 'iconsax-react';
import { NavItemType } from 'types/menu';
//import { useGetMenu } from 'api/menu';

const icons = {
  dashboard: HomeTrendUp,
  components: Box1,
  customer: Profile2User,
  loading: Home3,
  statistics: Story,
  landing: Airplane
};

const MenuFromAPI : NavItemType = {
  id: 'group-dashboard-loading',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.loading,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.dashboard,
    },
    {
      id: 'customer',
      title: <FormattedMessage id="Users" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        {
          id: 'customer-list',
          title: <FormattedMessage id="Dummy List" />,
          type: 'item',
          url: '/apps/customer/customer-list'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="Advisors" />,
          type: 'item',
          url: '/apps/customer/advisor-list'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="Client" />,
          type: 'item',
          url: '/apps/customer/client-list'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="Managers" />,
          type: 'item',
          url: '/apps/customer/manager-list'
        }
      ]
    },
    {
      id: 'customer',
      title: <FormattedMessage id="Verification of Identiy" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        {
          id: 'customer-list',
          title: <FormattedMessage id="Verify as Client" />,
          type: 'item',
          url: '/forms/VOI/Client'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="Verify as Advisor" />,
          type: 'item',
          url: '/forms/VOI/Advisor'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="Client VOI list" />,
          type: 'item',
          url: '/apps/VOI/client-list'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="Advisor VOI list" />,
          type: 'item',
          url: '/apps/VOI/advisor-list'
        },
        {
          id: 'rt-empty',
          title: <FormattedMessage id="empty" />,
          type: 'item',
          url: '/tables/react-table/empty'
        },
        {
          id: 'rt-empty',
          title: <FormattedMessage id="list the docs" />,
          type: 'item',
          url: '/forms/VOI/list-client-doc'
        }
      ]
    }
  ]
};
export default MenuFromAPI 


// test

/* Old version uses api
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home3, HomeTrendUp, Box1, Airplane } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

import { useGetMenu } from 'api/menu';

const icons = {
  dashboard: HomeTrendUp,
  components: Box1,
  loading: Home3,
  landing: Airplane
};

const loadingMenu: NavItemType = {
  id: 'group-dashboard-loading',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.loading,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.dashboard,
    },
    {
      id: 'landing',
      title: <FormattedMessage id="landing" />,
      type: 'item',
      icon: icons.landing,
      url: '/landing'
    }
  ]
};

// ==============================|| MENU ITEMS - API ||============================== //

export const MenuFromAPI = () => {
  const { menu, menuLoading } = useGetMenu();

  if (menuLoading) return loadingMenu;

  const subChildrenList = (children: NavItemType[]) => {
    return children?.map((subList: NavItemType) => {
      return fillItem(subList);
    });
  };

  const itemList = (subList: NavItemType) => {
    let list = fillItem(subList);

    // if collapsible item, we need to feel its children as well
    if (subList.type === 'collapse') {
      list.children = subChildrenList(subList.children!);
    }
    return list;
  };

  const childrenList: NavItemType[] | undefined = menu?.children?.map((subList: NavItemType) => {
    return itemList(subList);
  });

  let menuList = fillItem(menu, childrenList);
  return menuList;
};

function fillItem(item: NavItemType, children?: NavItemType[] | undefined) {
  return {
    ...item,
    title: <FormattedMessage id={`${item?.title}`} />,
    // @ts-ignore
    icon: icons[item?.icon],
    ...(children && { children })
  };
}
*/