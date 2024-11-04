'use client';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// ASSETS
import { Cloud } from 'iconsax-react';
const cardBack = '/assets/images/widget/img-dropbox-bg.svg';

// TYPES
import { ThemeMode } from 'types/config';

// ===========================|| STATISTICS - DROPBOX ||=========================== //

const DropboxStorage = () => {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        color: 'common.white',
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.800',
        '&:after': {
          content: '""',
          backgroundImage: `url(${cardBack})`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.5,
          backgroundPosition: 'bottom right',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat'
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Dropbox Storage</Typography>
            <Typography variant="h4">150GB</Typography>
          </Stack>
          <Avatar color="secondary" variant="rounded" sx={{ mt: 0.75, bgcolor: 'secondary.dark' }}>
            <Cloud color={theme.palette.secondary.light} />
          </Avatar>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={0.75}>
            <Typography variant="caption">1,342GB of 150GB Users</Typography>
            <Box sx={{ display: 'flex' }}>
              <LinearProgress variant="determinate" value={100} color="error" sx={{ width: '15%' }} />
              <LinearProgress variant="determinate" value={100} color="warning" sx={{ width: '18%', right: 2 }} />
              <LinearProgress variant="determinate" value={100} color="secondary" sx={{ width: '20%', right: 4 }} />
              <LinearProgress variant="determinate" value={100} color="success" sx={{ width: '28%', right: 8 }} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DropboxStorage;
