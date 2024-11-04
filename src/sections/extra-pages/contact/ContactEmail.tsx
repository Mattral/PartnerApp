// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| LANDING - ContactUsPage ||============================== //

const ContactUsPage = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h2">Stay connected with us</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
              Simply submit your email, we share you the top news and updates from Law On Earth
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} justifyContent={{ md: 'end', xs: 'center' }} alignItems="center">
            <Grid item>
              <TextField id="firstNameBasic" name="firstName" placeholder="Enter your email" fullWidth />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" size="large">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ContactUsPage;
