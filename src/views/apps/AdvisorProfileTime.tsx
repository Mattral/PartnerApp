//hidden page
"use client";

import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, InputLabel, Typography, Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import ListTime from 'views/apps/ListTime';

import axios from 'axios';

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


const WorkScheduleForm = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null); // Single day selection
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [allowProbono, setAllowProbono] = useState<boolean>(false);
  const [allowPaid, setAllowPaid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [authData, setAuthData] = useState<any | null>(null);

  // State to trigger re-render of ListTime
  const [refreshList, setRefreshList] = useState<boolean>(false);

  // Load the authentication data from localStorage
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

  // Handle Day Selection with Toggle Button (single day selection)
  const handleDayChange = (event: React.MouseEvent<HTMLElement>, newDay: string | null) => {
    setSelectedDay(newDay); // Set the selected day as a single value
  };

  // Handle Submit Logic
  const handleSubmit = async () => {
    if (!startTime || !endTime || !selectedDay) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    // Convert start and end times to the required format (H:i)
    const formattedStartTime = convertToApiTimeFormat(startTime);
    const formattedEndTime = convertToApiTimeFormat(endTime);

    // Retrieve the authorization token from authData
    const token = authData ? authData?.data?.primaryData?.authorization : '';
    if (!token) {
      setErrorMessage("Authorization token not found.");
      return;
    }

    const payload = {
      ui_code: 'ui-manually-added-one-testingpurpose',
      ot_dayOfWeek: selectedDay, // Single day selected
      ot_startTime: formattedStartTime, // Format start time to H:i
      ot_endTime: formattedEndTime, // Format end time to H:i
      ot_allowProbonoMeeting: allowProbono ? '1' : '0',
      ot_allowPaidMeeting: allowPaid ? '1' : '0',
    };

    const headers = {
      'Authorization': `Bearer ${token}`, // Use the token from authData
      'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
      'FRONTEND-KEY': 'XXX',
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

      const response = await axios.post(
        `${baseUrl}/api/back-office/partner/office-times/create`,
        payload,
        { headers }
      );

      // Handle the API response
      if (response.data.status === "treatmentFailure") {
        // Handle specific API errors (like validation failure, etc.)
        setErrorMessage(response.data.data.primaryData.msg);
        setSuccessMessage(null); // Clear any previous success message
      } else {
        // Clear the error message and set success message
        setErrorMessage(null);
        setSuccessMessage("Your work schedule has been successfully submitted!"); // Success message
        console.log(response.data); // Log the successful response
      }

      // Trigger refresh of the ListTime component
      setRefreshList(prev => !prev); // Toggle the state to trigger re-render
    } catch (error: any) {
      // Handle errors that occur during the request
      if (error.response) {
        // If the error has a response (e.g., 4xx or 5xx error)
        const errorData = error.response.data;
        if (errorData && errorData.data && errorData.data.primaryData) {
          // Handle API errors (e.g., validation or treatment failures)
          setErrorMessage(errorData.data.primaryData.msg || "An unknown error occurred.");
          setSuccessMessage(null); // Clear any previous success message
        } else {
          // Fallback for other errors
          setErrorMessage("An error occurred while processing your request. Please try again.");
          setSuccessMessage(null); // Clear any previous success message
        }
      } else {
        // Network error or no response from the API
        setErrorMessage("Network error. Please check your internet connection and try again.");
        setSuccessMessage(null); // Clear any previous success message
      }
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div>
      <Box sx={{ padding: { xs: 2, sm: 3 }, maxWidth: 800, margin: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '1.5rem', sm: '2rem' }, textAlign: 'center' }}>
          Set Your Work Schedule
        </Typography>

        <Grid container spacing={3}>
          {/* Select Working Day */}
          <Grid item xs={12}>
            <InputLabel htmlFor="working-day" sx={{ fontWeight: 'bold' }}>
              Select Working Day
            </InputLabel>

            <ToggleButtonGroup
              value={selectedDay}
              onChange={handleDayChange}
              aria-label="day of week"
              fullWidth
              exclusive={true} // Only one selection allowed
              color="primary"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Column on small screens, row on larger screens
                gap: 1,
                marginBottom: 2,
                justifyContent: 'space-between',
              }}
            >
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <ToggleButton key={day} value={day} aria-label={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>

          {/* Start Time */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Work Start Time"
                value={startTime}
                onChange={setStartTime}
                //@ts-ignore
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          {/* End Time */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Work End Time"
                value={endTime}
                onChange={setEndTime}
                //@ts-ignore
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Probono Meeting Option */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={allowProbono} onChange={() => setAllowProbono(!allowProbono)} />}
              label="Do you offer Probono/Free Consultation during selected time?"
              sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
            />
          </Grid>

          {/* Paid Meeting Option */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={allowPaid} onChange={() => setAllowPaid(!allowPaid)} />}
              label="Do you allow paid meetings during selected time?"
              sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
            />
          </Grid>


          <div style={{ textAlign: 'center' }}>
            {errorMessage && (
              <Typography color="error" variant="body1" sx={{ marginBottom: 3, textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}

            {successMessage && (
              <Typography color="success" variant="body1" sx={{ marginBottom: 3, textAlign: 'center' }}>
                {successMessage}
              </Typography>
            )}
          </div>


          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ width: '100%', padding: '10px 0', fontSize: { xs: '14px', sm: '16px' }, fontWeight: 'bold' }}
            >
              Submit Schedule
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* ListTime component with refresh trigger */}
      {/*<ListTime refresh={refreshList} />*/}
    </div>
  );
};

export default WorkScheduleForm;
