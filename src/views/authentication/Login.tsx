import Link from 'next/link';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

// PROJECT IMPORTS
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ // 

const Login = () => {
  const envVars = JSON.stringify(process.env, null, 2);
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} href={'/register'} variant="body1" sx={{ textDecoration: 'none' }} color="primary" passHref>
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>

        {/* New Card with Development and Testing Credentials */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                For Development and Testing Purpose!
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>Client</strong><br />
                Email: <code>minhtetmyet2630@gmail.com</code><br />
                Password: <code>aAertyuiop@1</code><br />
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                <strong>Advisor</strong><br />
                Email: <code>mattralminn@gmail.com</code><br />
                Password: <code>1234ABB!123a</code><br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* New Card to Display Environment Variables */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Environment Variables from Next:
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>Company Code:</strong> {process.env.NEXT_PUBLIC_COMPANY_CODE}<br />
                <strong>API Base URL:</strong> <code>{process.env.NEXT_PUBLIC_API_BASE_URL}</code><br />
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Environment Variables from ECS:
                <br/> according to Stack Overflow
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>Env Variables:</strong><br />
                <code>{envVars}</code><br />
              </Typography>
            </CardContent>
          </Card>          
        </Grid>



      </Grid>
    </AuthWrapper>
  );
};

export default Login;
