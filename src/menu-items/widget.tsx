// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { Story, Fatrows, PresentionChart } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  widgets: Story,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const widget: NavItemType = {
  id: 'group-widget',
  title: <FormattedMessage id="widgets" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'Cart Items',
      title: <FormattedMessage id="Cart Items" />,
      type: 'item',
      url: '/apps/e-commerce/checkout',
      icon: icons.chart
    },
    {
      id: 'data',
      title: <FormattedMessage id="Probono Data" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.data
    },
    {
      id: 'Doc Gen Demo',
      title: <FormattedMessage id="Generate Legal Document" />,
      type: 'item',
      url: '/forms/DocGen',
      icon: icons.statistics
    }
  ]
};

export default widget;
