// MATERIAL UI
import Stack from '@mui/material/Stack';

// PROJECT IMPORT
import CircularWithPath from './@extended/progress/CircularWithPath';

// ==============================|| LOADER - CIRCULAR ||============================== //

const CircularLoader = () => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <CircularWithPath />
    </Stack>
  );
};

export default CircularLoader;
