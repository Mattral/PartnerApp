// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { Book, PasswordCheck, Next, RowVertical, CpuCharge, TableDocument, Subtitle } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  formsTable: Book,
  validation: PasswordCheck,
  wizard: Next,
  layout: RowVertical,
  plugins: CpuCharge,
  reactTables: TableDocument,
  muiTables: Subtitle
};

// ==============================|| MENU ITEMS - FORMS & TABLES ||============================== //

const formsTables: NavItemType = {
  id: 'group-forms-tables',
  title: <FormattedMessage id="forms-demo" />,
  icon: icons.formsTable,
  type: 'group',
  children: [
    {
      id: 'validation',
      title: <FormattedMessage id="forms-validate-example" />,
      type: 'item',
      url: '/forms/validation',
      icon: icons.validation
    },
    {
      id: 'wizard',
      title: <FormattedMessage id="demo-payment-form" />,
      type: 'item',
      url: '/forms/wizard',
      icon: icons.wizard
    }
     
    

  ]
};

export default formsTables;
