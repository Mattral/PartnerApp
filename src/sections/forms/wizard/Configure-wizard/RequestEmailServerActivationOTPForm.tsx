'use client';
import { useState } from 'react';
import { Grid, Stack, InputLabel, TextField, Button } from '@mui/material';
import Notification from './Notification';

const RequestEmailServerActivationOTPForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = () => {
    setSnackbarMessage('OTP request submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>OTP Code</InputLabel>
          <TextField
            value={formData.otp || ''}
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            placeholder="Enter OTP"
            fullWidth
            required
          />
        </Stack>
      </Grid>
      {/* Other fields */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={handleBack} variant="contained">Back</Button>
        <Button onClick={handleNext} variant="contained" color="primary">Submit</Button>
        <Button onClick={handleNext} variant="contained" color="primary">Next</Button>
      </Grid>
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default RequestEmailServerActivationOTPForm;
