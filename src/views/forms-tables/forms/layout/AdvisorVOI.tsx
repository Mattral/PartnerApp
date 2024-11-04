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
import DropzonePage from 'views/forms-tables/forms/plugins/DropzonePage';

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
                      These information are required to verify you as our legitimate Advisor.
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
                    <TextField fullWidth placeholder="Enter full name" required />
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>

                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Phone Number :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Phone Number" required />
                    <FormHelperText>Please enter your Phone Number</FormHelperText>
                  </Grid>

                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Years of Experience :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField type="password" fullWidth placeholder="Enter Password" required />
                    <FormHelperText>Please enter the number of year</FormHelperText>
                  </Grid>

                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Password :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField type="password" fullWidth placeholder="Enter Password" required />
                    <FormHelperText>Please enter your Password as confirmation</FormHelperText>
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
                      B. Educational Info:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Degree Name :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Degree name" required />
                    <FormHelperText>Please enter your Degree name</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>College or University :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter College name" required />
                    <FormHelperText>Please enter your College name or Highest level of Education</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Work Experience :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField fullWidth placeholder="Enter Work Experience" required />
                    <FormHelperText>Please state your Work Experience briefly</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '1 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Do you have more than 3 years of experience? :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="YES" />
                    <FormControlLabel control={<Checkbox />} label="NO" />
                  </Grid>
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '1 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Currency :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <TextField select fullWidth placeholder="Select Currency">
                      <option value="USD">USD</option>
                      <option value="EUR">Euro</option>
                      <option value="AUD">AUD</option>
                    </TextField>
                    <FormHelperText>Please select your preferred currency</FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <DropzonePage />
      </Grid>
    </Grid>
  );
}

export default StickyActionBarPage;
