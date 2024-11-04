// MATERIAL - UI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// ASSETS
import { Lock1 } from 'iconsax-react';

// ===========================|| STATISTICS - PERMISSION BLOCK ||=========================== //

const PermissionBlock = () => {
  return (
    <MainCard sx={{ bgcolor: 'primary.lighter' }}>
      <Stack spacing={1.5} alignItems="center">
        <Avatar type="filled" variant="rounded">
          <Lock1 />
        </Avatar>
        <Stack alignItems="center" spacing={0.5}>
          <Typography variant="h5">Unlock All Features</Typography>
          <Typography>Unlock All Features</Typography>
        </Stack>
        <Button fullWidth variant="contained">
          Upgrade to premium
        </Button>
      </Stack>
    </MainCard>
  );
};

export default PermissionBlock;
