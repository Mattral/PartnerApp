'use client';

// NEXT
import Link from 'next/link';
import Image from 'next/image';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import useUser from 'hooks/useUser';
import Logo from 'components/logo';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin1 from 'sections/auth/auth-forms/AuthLogin1';

// ASSETS
const imgFacebook = '/assets/images/auth/facebook.svg';
const imgTwitter = '/assets/images/auth/twitter.svg';
const imgGoogle = '/assets/images/auth/google.svg';

// ================================|| LOGIN ||================================ //

const LoginPage = () => {
  const user = useUser();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgFacebook} alt="Facebook" width={16} height={16} />
                  <Typography>Sign In with Facebook</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgTwitter} alt="Twitter" width={16} height={16} />
                  <Typography>Sign In with Twitter</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgGoogle} alt="Google" width={16} height={16} />
                  <Typography>Sign In with Google</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              href={user ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin1 forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default LoginPage;