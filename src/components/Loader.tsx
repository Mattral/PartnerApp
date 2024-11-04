// MATERIAL - UI
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// ==============================|| Loader ||============================== //

const Loader = () => (
  <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2001, width: '100%' }}>
    <LinearProgress color="primary" sx={{ height: 4 }} />
  </Box>
);

export default Loader;
