'use client';

// NEXT
import Link from 'next/link';
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import { APP_DEFAULT_PATH } from 'config';

// ASSETS
const construction = '/assets/images/maintenance/img-cunstruct-1.svg';
const constructionBg = '/assets/images/maintenance/img-cunstruct-1-bg.png';
const constructionbottom = '/assets/images/maintenance/img-cunstruct-1-bottom.svg';

// ==============================|| UNDER CONSTRUCTION ||============================== //

function UnderConstructionPage() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${constructionBg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
      <Container fixed sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{
            py: 2,
            backgroundImage: `url(${constructionbottom})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom'
          }}
        >
          <Grid item md={6}>
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
          <Grid item md={6}>
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
        </Grid>
      </Container>
    </Box>
  );
}

export default UnderConstructionPage;
