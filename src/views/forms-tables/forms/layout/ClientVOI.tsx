'use client';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DropzonePage from 'views/forms-tables/forms/plugins/ProfileUpload';

// PROJECT IMPORTS
import { HEADER_HEIGHT } from 'config';
import MainCard from 'components/MainCard';

// ASSETS
import { Personalcard } from 'iconsax-react';

// ==============================|| LAYOUTS - STICKY ACTION BAR ||============================== //

function StickyActionBarPage() {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard content={false} sx={{ overflow: 'visible' }}>
          <CardActions
            sx={{
              position: 'sticky',
              top: HEADER_HEIGHT,
              bgcolor: theme.palette.background.default,
              zIndex: 1,
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
              <Typography variant="h5" sx={{ m: 0, pl: 1.5 }}>
                Verification of Identity:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ px: 1.5, py: 0.75 }}>
                <Button color="error" size="small">
                  Cancel
                </Button>
                <Button variant="contained" size="small">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </CardActions>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <Avatar variant="rounded" color="inherit" sx={{ bgcolor: theme.palette.secondary.main, ml: 'auto' }}>
                      <Personalcard />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <Typography variant="h3" sx={{ mb: 0 }}>
                      Personal Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      These information are required to verify you as our legitimate client.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4} />
                  <Grid item xs={12} sm={9} lg={6}>
                    <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                      A. Personal Info:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Name :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter full name" />
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Email :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter email" />
                    <FormHelperText>Please enter your Email</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Phone Number :</InputLabel>
                  </Grid>

                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Phone Number" />
                    <FormHelperText>Please enter your Phone Number</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Address :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Address" />
                    <FormHelperText>Please enter your Address</FormHelperText>
                  </Grid>            

                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Postal Code :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Postal Code" />
                    <FormHelperText>Please enter your Postal code (if any)</FormHelperText>
                  </Grid>    

                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Password :</InputLabel>
                  </Grid> 
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Password" />
                    <FormHelperText>Please enter your Password as confirmation</FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              
            </Grid>
          </CardContent>

        </MainCard>
      </Grid>
    </Grid>
  );
}

export default StickyActionBarPage;
