// MATERIAL - UI
import Box from '@mui/material/Box';

// PROJECT IMPORTS
import SimpleBar from 'components/third-party/SimpleBar';
import Navigation from './Navigation';

// ==============================|| DRWAER - CONTENT ||============================== //

const DrawerContent = ({ searchValue }: { searchValue?: string }) => (
  <SimpleBar
    sx={{
      height: { xs: 'calc(100vh - 70px)', md: 'calc(100% - 70px)' },
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Box sx={{ p: 3, pt: 1.5 }}>
      <Navigation searchValue={searchValue} />
    </Box>
  </SimpleBar>
);

export default DrawerContent;
