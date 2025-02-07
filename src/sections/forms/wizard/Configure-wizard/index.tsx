'use client';
import { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Button, Dialog, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import Notification from './Notification';
import MultiFileUpload from './MultiFile';
import PointSystemConfig from "./clientVOI";
import UploadedFiles from './UploadedFiles';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormData from 'form-data'; // If you are using Node.js
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams

// Main Component
const RequestEmailServerActivationOTPForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false); // Pop-up dialog state
  const [isUploading, setIsUploading] = useState(false); // State for tracking the loading state
  const [authorizationToken, setAuthorizationToken] = useState<string | null>(null); // State for authorization token

  const router = useRouter();
  const searchParams = useSearchParams(); // Access search params
  const vd_code = searchParams.get('vd_code'); // Extract vd_code from the search params

  useEffect(() => {
    // If vd_code is not available, handle it or show a loading message
    if (!vd_code) {
      console.error("vd_code is missing");
    }
  }, [vd_code]);

  useEffect(() => {
    // Retrieve the authorization token from localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        const token = parsedData?.data?.primaryData?.authorization;
        if (token) {
          setAuthorizationToken(`Bearer ${token}`); // Store the token with 'Bearer' prefix
        } else {
          console.error('Authorization token not found');
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    } else {
      console.error('No authentication data found in localStorage');
    }
  }, []); // Only runs once when the component mounts


  const handleSubmit = async () => {
    if (!vd_code) {
      toast.error("Dossier code (vd_code) is missing.");
      return;
    }

    // If authorizationToken is missing, show an error
    if (!authorizationToken) {
      toast.error("Authorization token is missing.");
      return;
    }

    // Show loading spinner while submitting
    setIsUploading(true);

    const formData = new FormData();
    formData.append('vd_code', vd_code);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

    // Set up the axios config
    const config = {
      method: 'post',
      url: `${baseUrl}/api/back-office/partner/manual-client-voi/dossiers/submit`,
      headers: {
        'Authorization': authorizationToken, // Use the token from state
        'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
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
        setSnackbarMessage('Waiting for API response, will be submitted soon.');
        setSnackbarSeverity('error');
        toast.error('Waiting for API response, will be submitted soon.');
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
