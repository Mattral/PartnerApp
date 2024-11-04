// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// ==============================|| PRODUCT DETAILS - FEATURES ||============================== //

function ProductFeatures() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography color="textSecondary">Country :</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>UK</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Domain :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>Legal / Insurance</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Ideal For :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>Finance</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Expertise :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography noWrap>HR | IR | Health | Property</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Certifications :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography noWrap>MSc | Bsc | Diploma</Typography>
      </Grid>
      
    </Grid>
  );
}

export default ProductFeatures;
