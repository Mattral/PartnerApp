// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { KyberNetwork, Story, Messages2, Calendar1, Profile2User, Bill, UserSquare, ShoppingBag } from 'iconsax-react';
import VideoCallIcon from '@mui/icons-material/VideoCall';

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
  video: VideoCallIcon,
  kanban: ShoppingBag
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.applications,
  type: 'group',
  children: [
    

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

    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      url: '/apps/chat',
      icon: icons.chat,
      breadcrumbs: false
    },

    */
    {
      id: 'Generate Legal Document',
      title: <FormattedMessage id="Generate Legal Document" />,
      type: 'item',
      url: '/apps/Documents',
      icon: icons.statistics
    },

    {
      id: 'Document Templates',
      title: <FormattedMessage id="Generate Legal Document" />,
      type: 'item',
      url: '/apps/Documents',
      icon: icons.kanban,
    },
    
    
    {
      id: 'e-commerce',
      title: <FormattedMessage id="Video Call" />,
      type: 'collapse',
      icon: icons.video,
      children: [
        {
          id: 'PersonalRoom',
          title: <FormattedMessage id="List of Advisor (API)" />,
          type: 'item',
          url: '/apps/advisorCard'
        },
        {
          id: 'Schedule',
          title: <FormattedMessage id="See Appointments" />,
          type: 'item',
          url: '/apps/listSchedules'
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
