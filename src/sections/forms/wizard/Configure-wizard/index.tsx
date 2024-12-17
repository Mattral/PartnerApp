'use client';
import { useState } from 'react';
import { Grid, Stack, Typography, Button, Dialog, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import Notification from './Notification';
import MultiFileUpload from './MultiFile';
import PointSystemConfig from "./clientVOI";
import UploadedFiles from './UploadedFiles';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormData from 'form-data'; // If you are using Node.js

// Main Component
const RequestEmailServerActivationOTPForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false); // Pop-up dialog state
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false); // State for tracking the loading state

  const handleUpload = (data: any[]) => {
    setSelectedDocuments(data);
    setSnackbarMessage('Files uploaded successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleSubmit = async () => {
    // Prepare form data (assuming 'vd_code' is available in the selected documents or formData)
    const vd_code = 'vd-9db3069a-2c90-43f2-b62a-e01ec8d0065b'; // Example, replace with actual vd_code from your state or data
  
    // Show loading spinner while submitting
    setIsUploading(true);
  
    const formData = new FormData();
    formData.append('vd_code', vd_code);
  
    // Set up the axios config
    const config = {
      method: 'post',
      url: 'https://lawonearth.co.uk/api/back-office/partner/manual-client-voi/dossiers/submit',
      headers: {
        'Authorization': 'Bearer 520|VmpluNvqeBkZeuskfZF5fAv4ddlsaOazSePhk1Vlb1dd7630', // Replace with actual token
        'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
        'FRONTEND-KEY': 'XXX',
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: formData, // Send FormData directly
    };
  
    try {
      const response = await axios(config);
  
      // Check if the response contains a status and handle accordingly
      if (response.data.status === 'success') {
        setSnackbarMessage('Dossier submitted successfully!');
        setSnackbarSeverity('success');
        toast.success('Dossier submitted successfully!');
        setOpenDialog(true); // Open dialog on success
      } else if (response.data.status === 'treatmentFailure') {
        // If the response contains 'treatmentFailure', extract the specific message and show it
        const errorMessage = response.data?.data?.primaryData?.msg || 'Submission failed! Please try again later.';
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        toast.error(errorMessage);
      } else {
        // Handle any other response errors
        setSnackbarMessage('Submission failed! Unknown error.');
        setSnackbarSeverity('error');
        toast.error('Submission failed! Unknown error.');
      }
    } catch (error: any) {
      // Handle network or other unexpected errors that are not part of the response body
      console.error('Error submitting dossier:', error);
  
      // Check if the error is from an axios response and contains 'treatmentFailure' status
      if (error.response && error.response.data && error.response.data.status === 'treatmentFailure') {
        // Extract the error message from the API response in case of 'treatmentFailure'
        const errorMessage = error.response?.data?.data?.primaryData?.msg || 'An error occurred while submitting the dossier.';
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        toast.error(errorMessage);
      } else {
        // Default error message for network or other unexpected errors
        setSnackbarMessage('An error occurred while submitting the dossier.');
        setSnackbarSeverity('error');
        toast.error('An error occurred while submitting the dossier.');
      }
    } finally {
      // Stop loading spinner
      setIsUploading(false);
    }
  };
  
  

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Grid container spacing={3} sx={{ marginTop: '30px' }}>
      {/* Left Column - PointSystemConfig */}
      <Grid item xs={12} md={6}>
        <PointSystemConfig />
      </Grid>

      {/* Right Column - MultiFileUpload */}
      <Grid item xs={12} md={6}>
        <MultiFileUpload />
      </Grid>

      {/* Uploaded Files Section - Full width */}
      <Grid item xs={12} sx={{ mt: 3 }}>
        <UploadedFiles />
      </Grid>

      {/* Submit Button Section */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 4, padding: 2 }}>
        <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isUploading} // Disable button while uploading
            sx={{
              borderRadius: 15,
              fontWeight: 'bold',
              backgroundColor: '#5C6BC0', // Blue color to fit theme
              color: '#fff', // White text
              '&:hover': {
                backgroundColor: '#3F51B5', // Darker blue on hover
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Adding slight shadow effect
              },
              padding: '10px 20px',
            }}
          >
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit'
            )}
          </Button>
        </Stack>
      </Grid>

      {/* Snackbar Notification */}
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />

      {/* Dialog for Submit Confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            Submission Confirmed!
          </Typography>
          <Typography variant="body1" textAlign="center">
            Your documents have been successfully submitted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RequestEmailServerActivationOTPForm;
