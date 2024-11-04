'use client';

// NEXT
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';

// ASSETS
import { Facebook, Google, Notification } from 'iconsax-react';
import AuthBackground from '../../../public/assets/images/auth/AuthBackground';
const coming1 = '/assets/images/maintenance/img-soon-1-1.png';
const coming2 = '/assets/images/maintenance/img-soon-1-2.png';

// ==============================|| COMING SOON ||============================== //

function ComingSoonPage() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AuthBackground />
      <Container fixed>
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
          <Grid item md={6}>
            <Box sx={{ width: { xs: 380, md: 570 }, margin: '0 auto' }}>
              <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                  <Stack spacing={3}>
                    <Typography variant="h4">Coming Soon</Typography>
                    <Typography variant="h2">
                      <Box sx={{ color: theme.palette.primary.main, display: 'inline-block' }}>Able Pro</Box> - The Bootstrap Admin Template
                    </Typography>
                    <Typography color="textSecondary">
                      Presenting law On Earth.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ width: { xs: 320, md: 380 } }}>
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <TextField fullWidth placeholder="Email Address" />
                      <Button variant="contained" sx={{ width: { xs: '100%', md: '50%' } }} startIcon={<Notification variant="Bold" />}>
                        Notify Me
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton shape="rounded" color="secondary">
                        <Facebook variant="Bulk" size={20} />
                      </IconButton>
                      <IconButton shape="rounded" color="secondary">
                        <Google variant="Bulk" size={20} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: { xs: 360, sm: 'auto' } }}>
              <Image
                src={coming1}
                alt="coming soon 1"
                width={matchDownSM ? 360 : 490}
                height={matchDownSM ? 310 : 420}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
              <Image
                src={coming2}
                alt="coming soon 1"
                width={matchDownSM ? 360 : 490}
                height={matchDownSM ? 310 : 420}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ComingSoonPage;
