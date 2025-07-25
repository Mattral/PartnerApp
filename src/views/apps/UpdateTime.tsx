"use client"
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, TextField, Checkbox, FormControlLabel, IconButton, Divider } from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import axios from 'axios';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// API URL
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;  // `${baseUrl}/`

// Function to convert date to the required API time format (H:i)
const convertToApiTimeFormat = (inputDate: Date | null): string => {
  if (!inputDate) return '';  // Return empty string if inputDate is null or undefined

  // Create a new Date object from the input to ensure it's a proper Date
  const date = new Date(inputDate);

  // Extract hours and minutes in local time (not UTC)
  const hours = String(date.getHours()).padStart(2, '0');  // Get hours in local time and pad with leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, '0');  // Get minutes in local time and pad with leading zero if necessary

  return `${hours}:${minutes}`;  // Return the time in "HH:mm" format (local time)
};

interface UpdateTimeProps {
  open: boolean;
  otCode: string;
  onClose: () => void;
}

const UpdateTime: React.FC<UpdateTimeProps> = ({ open, otCode, onClose }) => {
  const [otDayOfWeek, setOtDayOfWeek] = useState<string | null>(null);
  const [otStartTime, setOtStartTime] = useState<Date | null>(null);
  const [otEndTime, setOtEndTime] = useState<Date | null>(null);
  const [allowProbono, setAllowProbono] = useState<boolean>(false);
  const [allowPaid, setAllowPaid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [authData, setAuthData] = useState<any | null>(null);
  const [otName, setOtName] = useState('');

  const savedUiCode = sessionStorage.getItem('uiCode');

  // Fetch the authentication token from localStorage on mount
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setAuthData(parsedData);
      } catch (error) {
        console.error("Failed to parse auth data:", error);
      }
    } else {
      console.error('No authentication data found in localStorage');
    }
  }, []);

  // Submit form data to API
  const handleSubmit = async () => {
    if (!otDayOfWeek || !otStartTime || !otEndTime) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    const formattedStartTime = convertToApiTimeFormat(otStartTime);
    const formattedEndTime = convertToApiTimeFormat(otEndTime);

    const token = authData ? authData?.data?.primaryData?.authorization : '';
    if (!token) {
      setErrorMessage("Authorization token not found.");
      return;
    }

    const payload = {
      ot_name: otName,
      ot_dayOfWeek: otDayOfWeek,
      ot_startTime: formattedStartTime,
      ot_endTime: formattedEndTime,
      ot_allowProbonoMeeting: allowProbono ? '1' : '0',
      ot_allowPaidMeeting: allowPaid ? '1' : '0',
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      //ToDo
      'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
      'FRONTEND-KEY': 'XXX',
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;  // `${baseUrl}/`
      const savedUiCode = sessionStorage.getItem('uiCode');
      const API_URL = `${baseUrl}/api/back-office/partner/advisor-office-times/update/${savedUiCode}/${otCode}`;
      const response = await axios.post(API_URL, payload, { headers });

      // Handle specific API error response for validation errors
      if (response.data.status === "validationError") {
        const errorMsg = response.data.data?.primaryData?.errors?.ot_code?.[0] || response.data.data?.primaryData?.msg || "An error occurred.";
        setErrorMessage(errorMsg);
        setSuccessMessage(null); // Clear any previous success message
      } else if (response.data.status === "treatmentFailure") {
        const errorMsg = response.data.data?.primaryData?.msg || "An error occurred.";
        setErrorMessage(errorMsg);
        setSuccessMessage(null);
      } else {
        setErrorMessage(null);
        setSuccessMessage("Office time has been successfully updated!");
      }
    } catch (error: any) {
      if (error.response) {
        // Handle errors returned from the API
        const errorData = error.response.data;
        const errorMsg = errorData?.data?.primaryData?.errors?.ot_code?.[0] || errorData?.data?.primaryData?.msg || "An error occurred while processing your request.";
        setErrorMessage(errorMsg);
        setSuccessMessage(null); // Clear any previous success message
      } else {
        // Handle network errors or unexpected issues
        setErrorMessage("Network error. Please check your internet connection.");
        setSuccessMessage(null); // Clear any previous success message
      }
      console.error(error); // Log the error for debugging
    }
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>Update Office Time</DialogTitle>
      <Typography sx={{ textAlign: 'center' }}> {otCode}</Typography>
      <DialogContent>
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
            <ErrorOutline sx={{ marginRight: 1 }} />
            {errorMessage}
          </Typography>
        )}

        {successMessage && (
          <Typography color="success" variant="body2" sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
            <CheckCircle sx={{ marginRight: 1 }} />
            {successMessage}
          </Typography>
        )}

        <Divider sx={{ marginBottom: 2 }} />


        <Grid item xs={12} sm={6}>
          <Typography sx={{ marginBottom: 2, fontSize: { xs: '1rem', sm: '1.5rem' }, textAlign: 'center' }}>
            Please name your schedule to remember better?
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Please name your schedule to remember better? *"
            fullWidth
            value={otName}
            onChange={(e) => setOtName(e.target.value)}
            required
          />
        </Grid>

        <Divider sx={{ marginBottom: 2 }} />


        <Grid container spacing={3}>
          {/* Day of Week */}
          <Grid item xs={12} container spacing={2} alignItems="center">
            {/* Left side for the label */}
            <Grid item xs={6} container justifyContent="center" alignItems="center">
              <Typography variant="body1" fontWeight="bold">
                Select Working Day
              </Typography>
            </Grid>


            {/* Right side for the dropdown */}
            <Grid item xs={6} container justifyContent="center" alignItems="center">
              <TextField
                sx={{ maxWidth: '350px' }}  // Set your desired max width here
                value={otDayOfWeek || ''}
                onChange={(e) => setOtDayOfWeek(e.target.value)}
                select
                SelectProps={{
                  native: true,
                }}
                label={''} // Empty label since we moved it to the left side
              >
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>


          {/* Start Time */}
          <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={otStartTime}
                onChange={setOtStartTime}
                //@ts-ignore
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          {/* End Time */}
          <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="End Time"
                value={otEndTime}
                onChange={setOtEndTime}
                //@ts-ignore
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Probono Meeting Option */}
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={allowProbono} onChange={() => setAllowProbono(!allowProbono)} />}
              label="Allow Probono Meeting?"
            />
          </Grid>

          {/* Paid Meeting Option */}
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={allowPaid} onChange={() => setAllowPaid(!allowPaid)} />}
              label="Allow Paid Meeting?"
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTime;
