// Import necessary dependencies
import { useState } from 'react';
import { Tooltip,IconButton, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Import icons for fullscreen
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

// Your other imports remain the same
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader';

import Search from './Search';
import Profile from './Profile';
import Localization from './Localization';
import Notification from './Notification';
import MobileSection from './MobileSection';
import MegaMenuSection from './MegaMenuSection';
import { MenuOrientation } from 'types/config';

const HeaderContent = () => {
  const { i18n, menuOrientation } = useConfig();
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // State for managing fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}

      {/* Add the fullscreen toggle button with icons and shadow */}
      <Box sx={{ mx: 2 }}>
      <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
        <IconButton
          onClick={toggleFullscreen}
          color="inherit"
          sx={{
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)', // Subtle shadow
            borderRadius: '50%', // Ensure shadow follows a circular shape
            backgroundColor: 'rgba(202, 195, 195, 0.5)', // Optional background for more visibility
            '&:hover': {
              backgroundColor: 'rgb(197, 190, 190)', // Slightly stronger hover effect
            },
          }}
        >
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        </Tooltip>
      </Box>

      {!downLG && <MegaMenuSection />}
      {!downLG && <Localization />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
          
      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;



//<Message /> in line 44