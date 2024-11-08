'use client';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';

// ASSETS
import { Personalcard } from 'iconsax-react';

// ==============================|| LAYOUTS - PREMIUM FORM ||============================== //

const CreateWebServerForm = ({ handleNext, formData, setFormData }: any) => {
  const theme = useTheme();

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <Grid container spacing={3} sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      <Grid item xs={12}>
        <MainCard content={false} sx={{ borderRadius: 2, boxShadow: 12, backgroundColor: '#fdfdfd' }}>
          <CardContent sx={{ padding: 4, borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                Verification of Identity:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'medium', color: theme.palette.secondary.main }}>
                Personal Information
              </Typography>
            </Stack>
            <Grid container spacing={3} alignItems="center" sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4}>
                    <Avatar variant="rounded" sx={{ bgcolor: theme.palette.secondary.main, ml: 'auto', width: 64, height: 64 }}>
                      <Personalcard />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={6}>
                    <Typography variant="body1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                      This information is required to verify you as our legitimate client.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderColor: theme.palette.divider, mb: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {[
                    { label: "Name", placeholder: "Enter full name" },
                    { label: "Email", placeholder: "Enter email" },
                    { label: "Phone Number", placeholder: "Enter Phone Number" },
                    { label: "Address", placeholder: "Enter Address" },
                    { label: "Postal Code", placeholder: "Enter Postal Code" },
                    { label: "OTP", placeholder: "Enter OTP", type: "password" }
                  ].map((field, index) => (
                    <Grid item xs={12} sm={6} lg={4} key={index}>
                      <InputLabel sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>{field.label}:</InputLabel>
                      <TextField
                        fullWidth
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': { 
                            borderRadius: 8, 
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
                          },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary }
                        }}
                      />
                      <FormHelperText sx={{ color: theme.palette.text.secondary }}>
                        Please enter your {field.label.toLowerCase()}
                      </FormHelperText>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderColor: theme.palette.divider, mt: 2 }} />
              </Grid>
            </Grid>
          </CardContent>
          
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CreateWebServerForm;


/*
line 99

<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, padding: 2 }}>
<Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
  <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ borderRadius: 20 }}>
    Submit
  </Button>
</Stack>
<Stack direction="row" spacing={2}>
  <Button onClick={handleNext} variant="contained" color="primary" sx={{ borderRadius: 20 }}>
    Next
  </Button>
</Stack>
</Grid>
*/