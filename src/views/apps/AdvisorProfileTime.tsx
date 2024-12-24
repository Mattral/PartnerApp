"use client";

import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, InputLabel, Typography, Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const WorkScheduleForm = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // Ensure this is an array
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [allowProbono, setAllowProbono] = useState<boolean>(false);
  const [allowPaid, setAllowPaid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle Day Selection with Toggle Buttons
  const handleDayChange = (event: React.MouseEvent<HTMLElement>, newDays: string[]) => {
    setSelectedDays(newDays);
  };

  // Handle Submit Logic
  const handleSubmit = async () => {
    if (!startTime || !endTime || selectedDays.length === 0) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    const payload = {
      ui_code: 'ui-manually-added-one-testingpurpose',
      ot_dayOfWeek: selectedDays.join(','), // Days as a comma-separated string
      ot_startTime: startTime.toISOString(), // ISO formatted time for submission
      ot_endTime: endTime.toISOString(), // ISO formatted time for submission
      ot_allowProbonoMeeting: allowProbono ? '1' : '0',
      ot_allowPaidMeeting: allowPaid ? '1' : '0',
    };

    const headers = {
      'Authorization': 'Bearer 600|rj7SWm6qgoMXDmQDtBxzElBKLexbSOT0mKvaRXiofd26c637',
      'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
      'FRONTEND-KEY': 'XXX',
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const response = await axios.post(
        'https://lawonearth.co.uk/api/back-office/partner/office-times/create',
        payload,
        { headers }
      );
      console.log(response.data);
      setErrorMessage(null); // Clear error message if successful
    } catch (error: any) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 }, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Set Your Work Schedule
      </Typography>

      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ marginBottom: 3 }}>
          {errorMessage}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* Select Days of the Week with Toggle Buttons */}
        <Grid item xs={12}>
          <InputLabel htmlFor="working-days" sx={{ fontWeight: 'bold' }}>
            Select Working Days
          </InputLabel>

          {/* Monday to Friday */}
          <ToggleButtonGroup
            value={selectedDays}
            onChange={handleDayChange}
            aria-label="day of week"
            fullWidth
            exclusive={false} // Allow multiple selections
            color="primary"
            sx={{
              display: 'flex',
              flexWrap: 'nowrap', // Ensure items are not wrapping in this section
              justifyContent: 'space-between', // Distribute space between items
              gap: 1, // Add space between buttons
              marginBottom: 2, // Space between rows
            }}
          >
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
              <ToggleButton key={day} value={day} aria-label={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {/* Saturday and Sunday on another row */}
          <ToggleButtonGroup
            value={selectedDays}
            onChange={handleDayChange}
            aria-label="weekend days"
            fullWidth
            exclusive={false}
            color="primary"
            sx={{
              display: 'flex',
              flexWrap: 'nowrap', // Ensure items are not wrapping in this section
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            {['saturday', 'sunday'].map((day) => (
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
  );
};

export default WorkScheduleForm;
