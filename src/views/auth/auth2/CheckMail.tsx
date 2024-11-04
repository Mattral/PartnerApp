'use client';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import useUser from 'hooks/useUser';
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper2 from 'sections/auth/AuthWrapper2';

// ================================|| CHECK MAIL ||================================ //

const CheckMailPage = () => {
  const user = useUser();

  return (
    <AuthWrapper2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Hi, Check Your Mail</Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
              We have sent a password recover instructions to your email.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              component={Link}
              href={user ? '/auth/login2' : '/login2'}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
};

export default CheckMailPage;
