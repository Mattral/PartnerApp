'use client';

// NEXT
import Link from 'next/link';
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import { APP_DEFAULT_PATH } from 'config';

// ASSETS
const construction = '/assets/images/maintenance/img-construction-2.svg';

// ==============================|| UNDER CONSTRUCTION ||============================== //

function UnderConstructionPage() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', py: 2 }}>
      <Grid item xs={12}>
        <Image
          src={construction}
          alt="under construction"
          width={matchDownSM ? 350 : 396}
          height={matchDownSM ? 325 : 370}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography align="center" variant="h1">
            Under Construction
          </Typography>
          <Typography color="textSecondary" align="center" sx={{ width: '85%' }}>
            Hey! Please check out this site later. We are doing some maintenance on it right now.
          </Typography>
          <Button component={Link} href={APP_DEFAULT_PATH} variant="contained">
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default UnderConstructionPage;
