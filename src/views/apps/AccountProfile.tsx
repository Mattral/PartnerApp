'use client';

import { useEffect } from 'react';

// NEXT
import { useRouter, usePathname } from 'next/navigation';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import TabProfile from 'sections/apps/profiles/account/TabProfile';
import TabPersonal from 'sections/apps/profiles/account/TabPersonal';
import TabAccount from 'sections/apps/profiles/account/TabAccount';
import TabPassword from 'sections/apps/profiles/account/TabPassword';
import TabRole from 'sections/apps/profiles/account/TabRole';
import TabSettings from 'sections/apps/profiles/account/TabSettings';

import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// ASSETS
import { DocumentText, Lock, Profile, Profile2User, Setting3, TableDocument } from 'iconsax-react';

type Props = {
  tab: string;
};

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = ({ tab }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { menuMaster } = useGetMenuMaster();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.replace(`/apps/profiles/account/${newValue}`);
  };

  let breadcrumbTitle = '';
  let breadcrumbHeading = '';

  switch (tab) {
    case 'personal':
      breadcrumbTitle = 'Personal';
      breadcrumbHeading = 'Personal';
      break;
    case 'my-account':
      breadcrumbTitle = 'My Account';
      breadcrumbHeading = 'My Account';
      break;
    case 'password':
      breadcrumbTitle = 'Change Password';
      breadcrumbHeading = 'Change Password';
      break;
    case 'role':
      breadcrumbTitle = 'Role';
      breadcrumbHeading = 'Accountant';
      break;
    case 'settings':
      breadcrumbTitle = 'Settings';
      breadcrumbHeading = 'Account Settings';
      break;
    case 'basic':
    default:
      breadcrumbTitle = 'Basic';
      breadcrumbHeading = 'Basic Account';
  }

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Account Profile', to: '/apps/profiles/account/basic' },
    { title: breadcrumbTitle }
  ];
  if (tab === 'basic') {
    breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Account Profile' }];
  }

  useEffect(() => {
    if (menuMaster.openedItem !== 'account-profile') handlerActiveItem('account-profile');
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <MainCard border={false}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Profile" icon={<Profile />} value="basic" iconPosition="start" />
            <Tab label="Personal" icon={<DocumentText />} value="personal" iconPosition="start" />
            <Tab label="My Account" icon={<TableDocument />} value="my-account" iconPosition="start" />
            <Tab label="Change Password" icon={<Lock />} value="password" iconPosition="start" />
            <Tab label="Role" icon={<Profile2User />} value="role" iconPosition="start" />
            <Tab label="Settings" icon={<Setting3 />} value="settings" iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          {tab === 'basic' && <TabProfile />}
          {tab === 'personal' && <TabPersonal />}
          {tab === 'my-account' && <TabAccount />}
          {tab === 'password' && <TabPassword />}
          {tab === 'role' && <TabRole />}
          {tab === 'settings' && <TabSettings />}
        </Box>
      </MainCard>
    </>
  );
};

export default AccountProfile;
