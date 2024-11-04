'use client';

import { ReactElement } from 'react';

// NEXT
import Image from 'next/image';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// PROJECT IMPORTS
import AuthCard from './AuthCard';

// ASSETS
const AuthSideImg = '/assets/images/auth/img-auth-sideimg.jpg';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper2 = ({ children }: Props) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid
              item
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: '30%',
                height: '100vh',
                position: 'relative',
                '& img': { position: 'relative !important' }
              }}
            >
              <Image alt="Authimg" src={AuthSideImg} fill sizes="100vw" />
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <AuthCard border={false}>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper2;
