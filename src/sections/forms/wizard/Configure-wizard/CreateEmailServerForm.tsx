'use client';

import { useState } from 'react';
import { Grid, FormHelperText, Stack, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import UploadMultiFile from './MultiFile';
import Notification from './Notification';

// ==============================|| CREATE EMAIL SERVER FORM WITH FILE UPLOAD ||============================== //

const CreateEmailServerForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = (values: any) => {
    setFormData({ ...formData, uploadedFiles: values.files });
    setSnackbarMessage('Files uploaded successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    handleNext(); // Move to the next step after submission
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={3} sx={{ pt: 5 }}>
      <Grid item xs={12}>
        <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Achieve Your Goals
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Minimum Points Required: <strong>100</strong>
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Minimum Primary Documents: <strong>1</strong>
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Upload the following documents to earn points:
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.5}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Primary (mandatory)</Typography>
                <Typography variant="body1">National ID: <strong>50 points</strong></Typography>
                <Typography variant="body1">Passport: <strong>50 points</strong></Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.5}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Secondary (optional)</Typography>
                <Typography variant="body1">Driving License: <strong>25 points</strong></Typography>
                <Typography variant="body1">Employment Certificate: <strong>25 points</strong></Typography>
                <Typography variant="body1">Bachelor's Degree: <strong>25 points</strong></Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={12}>

    
  
</Grid>


      {/* Snackbar for Notification */}
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default CreateEmailServerForm;


/* 76 pasted
  <MainCard
    sx={{
      boxShadow: 3,
      borderRadius: '12px',
      bgcolor: 'background.paper',
      textAlign: 'center',
      p: 2 // Reduced padding around the content of the MainCard
    }}
  >
<Formik
      initialValues={{ files: null }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape({
        files: yup.mixed().required('Files are required.')
      })}
    >
      {({ values, handleSubmit, setFieldValue, touched, errors }) => (
        <form onSubmit={handleSubmit}>
        
          <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          
            <Grid item xs={6} sx={{ textAlign: 'left', paddingLeft: 2 }}>
              <Typography variant="body1">
                Ready to upload your files? Please click Next when you're ready.
              </Typography>
            </Grid>

            
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
              <Stack direction="row" spacing={2}>

                <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
                  <Button variant="contained" color="secondary" onClick={handleBack} sx={{ borderRadius: 20 }}>
                    Back
                  </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Button onClick={handleNext} variant="contained" color="primary" sx={{ borderRadius: 20 }}>
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
    </MainCard>

*/