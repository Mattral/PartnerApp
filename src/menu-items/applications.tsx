// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { KyberNetwork, Story, Messages2, Calendar1, Profile2User, Bill, UserSquare, ShoppingBag } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  customer: Profile2User,
  invoice: Bill,
  statistics: Story,
  profile: UserSquare,
  ecommerce: ShoppingBag
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.applications,
  type: 'group',
  children: [
    
    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      url: '/apps/chat',
      icon: icons.chat,
      breadcrumbs: false
    },
    {
      id: 'calendar',
      title: <FormattedMessage id="calendar" />,
      type: 'item',
      url: '/apps/calendar',
      icon: icons.calendar
    },
    /*
    {
      id: 'kanban',
      title: <FormattedMessage id="kanban" />,
      type: 'item',
      icon: icons.kanban,
      url: '/apps/kanban/board',
      breadcrumbs: false
    },

    */
    {
      id: 'Generate Legal Document',
      title: <FormattedMessage id="Generate Legal Document" />,
      type: 'item',
      url: '/forms/DocGen',
      icon: icons.statistics
    },

    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        {
          id: 'customer-list',
          title: <FormattedMessage id="list" />,
          type: 'item',
          url: '/apps/customer/customer-list'
        },
        {
          id: 'customer-card',
          title: <FormattedMessage id="cards" />,
          type: 'item',
          url: '/apps/customer/customer-card'
        }
      ]
    },

    
    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'collapse',
      icon: icons.profile,
      children: [
        {
          id: 'user-profile',
          title: <FormattedMessage id="user-profile" />,
          type: 'item',
          url: '/apps/profiles/user/personal',
          breadcrumbs: false
        },
        {
          id: 'account-profile',
          title: <FormattedMessage id="account-profile" />,
          type: 'item',
          url: '/apps/profiles/account/basic',
          breadcrumbs: false
        }
      ]
    },
    
    {
      id: 'e-commerce',
      title: <FormattedMessage id="Video Call" />,
      type: 'collapse',
      icon: icons.ecommerce,
      children: [
        {
          id: 'PersonalRoom',
          title: <FormattedMessage id="List of Advisor (API)" />,
          type: 'item',
          url: '/apps/advisorCard'
        },
        {
          id: 'MeetingRoom',
          title: <FormattedMessage id="Meeting Room" />,
          type: 'item',
          url: '/session',///apps/e-commerce/MeetingRoom
          breadcrumbs: false
        },
        {
          id: 'Preview',
          title: <FormattedMessage id="Preview Room" />,
          type: 'item',
          url: '/pages/room',///apps/e-commerce/MeetingRoom
          breadcrumbs: false
        },
        {
          id: 'Schedule',
          title: <FormattedMessage id="Schedule" />,
          type: 'item',
          url: '/apps/e-commerce/Schedule'
        },
        /*
        {
          id: 'Recordings',
          title: <FormattedMessage id="Session Room" />,
          type: 'item',
          url: '/apps/e-commerce/product-list'
        },
        {
          id: 'add-new-schedule',
          title: <FormattedMessage id="Zoom Room" />,
          type: 'item',
          url: '/apps/e-commerce/checkout'
        },
        */
      ]
    }

  ]
};

export default applications;
