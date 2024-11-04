// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';

// ==============================|| LANDING - ContactUsPage ||============================== //

const ContactUsPage = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12} md={8}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h2">Stay connected with us</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Simply submit your email, we share you the top news related to LAW on Earth updates, roadmap, and news.
                </Typography>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
        <Grid item xs={12} md={4}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="end" alignItems="center">
              <Grid item>
                <TextField id="firstNameBasic" name="firstName" placeholder="Enter your email" fullWidth />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large">
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ContactUsPage;
