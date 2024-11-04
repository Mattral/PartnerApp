import { useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';

// PROJECT IMPORTS
import DrawerContent from './DrawerContent';
import MainCard from 'components/MainCard';

import { DRAWER_WIDTH } from 'config';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// ASSETS
import { SearchNormal1 } from 'iconsax-react';

// ==============================|| DRAWER ||============================== //

const Drawer = () => {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const open = menuMaster.isComponentDrawerOpened;

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [searchValue, setSearchValue] = useState();

  const handleSearchValue = (event: any) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchValue(search);
  };

  return (
    <MuiDrawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        position: { xs: 'fixed', md: 'sticky' },
        top: { xs: 0, md: 84, xl: 90 },
        height: { xs: 'auto', md: 'calc(100vh - 140px)', xl: 'calc(100vh - 148px)' },
        zIndex: { xs: open ? 1200 : -1, md: 0 },
        '& .MuiDrawer-paper': {
          borderRadius: matchDownMd ? 0 : 1.5,
          position: 'relative',
          border: 'none'
        }
      }}
      variant={matchDownMd ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={() => handlerComponentDrawer(false)}
    >
      <MainCard sx={{ height: '100%', borderRadius: matchDownMd ? 0 : 1.5, overflow: 'hidden' }} content={false}>
        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TextField
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: <SearchNormal1 />,
              placeholder: 'Search Components',
              type: 'search'
            }}
            onChange={handleSearchValue}
          />
        </Box>
        <DrawerContent searchValue={searchValue} />
      </MainCard>
    </MuiDrawer>
  );
};

export default Drawer;
