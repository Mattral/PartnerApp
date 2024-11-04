'use client';

// NEXT
import Link from 'next/link';
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import { APP_DEFAULT_PATH } from '../config';

// ASSETS
const error500 = '/assets/images/maintenance/img-error-500.svg';

// ==============================|| ERROR 500 ||============================== //

function Error500() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }} spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ width: downSM ? 240 : 325 }}>
          <Image
            src={error500}
            alt="mantis"
            width={downSM ? 350 : 396}
            height={downSM ? 325 : 370}
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack justifyContent="center" alignItems="center">
          <Typography align="center" variant={downSM ? 'h2' : 'h1'}>
            Internal Server Error
          </Typography>
          <Typography color="textSecondary" variant="body2" align="center" sx={{ width: { xs: '73%', sm: '70%' }, mt: 1 }}>
            Server error 500. we fixing the problem. please try again at a later stage.
          </Typography>
          <Button component={Link} href={APP_DEFAULT_PATH} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Error500;
