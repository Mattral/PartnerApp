import { ReactElement } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// PROJECT IMPORTS
import AuthCard from './AuthCard';

// ASSETS
import AuthBackground from '../../../public/assets/images/auth/AuthBackground';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => (
  <Box sx={{ minHeight: '100vh' }}>
    <AuthBackground />
    <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
