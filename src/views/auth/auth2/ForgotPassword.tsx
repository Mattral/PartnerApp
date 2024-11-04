'use client';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import AuthWrapper2 from 'sections/auth/AuthWrapper2';
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword';
import useUser from 'hooks/useUser';

// ================================|| FORGOT PASSWORD ||================================ //

const ForgotPasswordPage = () => {
  const user = useUser();

  return (
    <AuthWrapper2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Forgot Password</Typography>
            <Typography
              component={Link}
              href={user ? '/auth/login2' : '/login2'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Back to Login
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
};

export default ForgotPasswordPage;
