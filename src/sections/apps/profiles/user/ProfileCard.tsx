// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ProfileRadialChart from './ProfileRadialChart';

// ASSETS
import BackLeft from '../../../../../public/assets/images/profile/UserProfileBackLeft';
import BackRight from '../../../../../public/assets/images/profile/UserProfileBackRight';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| USER PROFILE - TOP CARD ||============================== //

interface Props {
  focusInput: () => void;
}

const ProfileCard = ({ focusInput }: Props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MainCard
      border={false}
      content={false}
      sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.700' : 'primary.lighter', position: 'relative' }}
    >
      <Box sx={{ position: 'absolute', bottom: '-7px', left: 0, zIndex: 1 }}>
        <BackLeft />
      </Box>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ position: 'relative', zIndex: 5 }}>
        <Grid item>
          <Stack direction="row" spacing={matchDownSM ? 1 : 2} alignItems="center">
            <Box sx={{ ml: { xs: 0, sm: 1 } }}>
              <ProfileRadialChart />
            </Box>
            <Stack spacing={0.75}>
              <Typography variant="h5">Edit Your Profile</Typography>
              <Typography variant="body2" color="secondary">
                Complete your profile to unlock all features
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sx={{ mx: matchDownSM ? 2 : 3, my: matchDownSM ? 1 : 0, mb: matchDownSM ? 2 : 0 }} xs={matchDownSM ? 12 : 'auto'}>
          <Button variant="contained" fullWidth={matchDownSM} component={Link} href="/apps/profiles/user/personal" onClick={focusInput}>
            Edit Your Profile
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
        <BackRight />
      </Box>
    </MainCard>
  );
};

export default ProfileCard;
