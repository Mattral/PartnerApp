// NEXT
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
const cardBack = '/assets/images/widget/img-dropbox-bg.svg';
const WelcomeImage = '/assets/images/analytics/welcome-banner.png';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| ANALYTICS - WELCOME ||============================== //

const WelcomeBanner = () => {
  const theme = useTheme();

  return (
    <MainCard
      border={false}
      sx={{
        color: 'common.white',
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.400' : 'primary.darker',
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
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3 }}>
            <Typography variant="h2" color={theme.palette.background.paper}>
              Explore Redesigned Able Pro
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper}>
              The Brand new User Interface with power of Material-UI Components. Explore the Endless possibilities with Able Pro.
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                href="#"
                sx={{
                  color: 'background.paper',
                  borderColor: theme.palette.background.paper,
                  zIndex: 2,
                  '&:hover': { color: 'background.paper', borderColor: theme.palette.background.paper, bgcolor: 'primary.main' }
                }}
                target="_blank"
              >
                Exclusive on Themeforest
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 }, zIndex: 2 }} justifyContent="center" alignItems="flex-end">
            <Image src={WelcomeImage} alt="Welcome" width={200} height={200} />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default WelcomeBanner;
