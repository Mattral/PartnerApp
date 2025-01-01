import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  } from '@mui/material';
import { CheckCircleOutline, ErrorOutline, EventNote, Description, AccessTime } from '@mui/icons-material'; // Import additional icons
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material'; // Correct import for the CloudUpload icon


interface ScheduleAppointmentPopupProps {
  open: boolean;
  onClose: () => void;
  pers_code: string;
  ui_code: string;
}

const ScheduleAppointmentPopup: React.FC<ScheduleAppointmentPopupProps> = ({ open, onClose, pers_code, ui_code }) => {
  const [ca_title, setCaTitle] = useState('');
  const [ca_desc, setCaDesc] = useState('');
  const [ca_requestedFor, setCaRequestedFor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authData, setAuthData] = useState<any | null>(null);

  // Fetch auth data from localStorage
  React.useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setAuthData(parsedData);
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    }
  }, []);

  const convertToApiDateFormat = (inputDate: string): string => {
    const date = new Date(inputDate);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
  
    // Get the local time components
    const year = date.getFullYear(); // Get the full year (local time)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (local time, +1 to fix 0-indexed months)
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (local time)
    const hours = String(date.getHours()).padStart(2, '0'); // Get the hour (local time)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes (local time)
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get the seconds (local time)
  
    // Return the formatted string with UTC timezone (+00:00)
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00:00`;
  };
  
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Book the appointment
  const bookAppointment = async () => {
    if (!ca_title || !ca_desc || !ca_requestedFor) {
      setError('Please fill in all fields.');
      return;
    }

    const requestedDate = new Date(ca_requestedFor);
    const currentDate = new Date();
    if (requestedDate <= currentDate) {
      setError('The requested date/time must be in the future.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const apiUrl = 'https://lawonearth.co.uk/api/back-office/partner/call-appointments/create';
    const token = authData ? authData?.data?.primaryData?.authorization : '';
    const companyCode = 'MC-H3HBRZU6ZK5744S';
    const frontendKey = 'XXX';
    const redirectUrl = 'https://lawonearth.org/';

    const formattedDateTime = convertToApiDateFormat(ca_requestedFor);
    const payload = {
      ui_code,
      ca_title,
      ca_desc,
      ca_requestedFor: formattedDateTime,
      redirectUrl,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'COMPANY-CODE': companyCode,
      'FRONTEND-KEY': frontendKey,
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const response = await axios.post(apiUrl, payload, { headers });

      if (response.data.status === 'treatmentFailure') {
        setError(response.data.data.primaryData.msg);
      } else {
        setSuccess('Appointment successfully booked!');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.status === 'treatmentFailure') {
        setError(err.response.data.data.primaryData.msg);
      } else {
        setError('Failed to book appointment. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>Schedule Appointment</DialogTitle>
      <DialogContent sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Box mb={2}>
          <TextField
            label="Session Title"
            variant="outlined"
            fullWidth
            value={ca_title}
            onChange={(e) => setCaTitle(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventNote />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Session Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={ca_desc}
            onChange={(e) => setCaDesc(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Session Date & Time"
            type="datetime-local"
            value={ca_requestedFor}
            onChange={(e) => setCaRequestedFor(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        {success && (
          <Typography color="green" sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutline sx={{ marginRight: 1 }} />
            {success}
          </Typography>
        )}
        {error && (
          <Typography color="red" sx={{ display: 'flex', alignItems: 'center' }}>
            <ErrorOutline sx={{ marginRight: 1 }} />
            {error}
          </Typography>
        )}


        {/* File Upload Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{ fontWeight: '600' }}
            startIcon={<CloudUpload />}
          >
            Upload Sample
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Box>


      </DialogContent>
      
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="secondary" sx={{ fontWeight: '600' }}>
          Cancel
        </Button>
        <Button
          onClick={bookAppointment}
          color="primary"
          disabled={loading}
          sx={{ fontWeight: '600' }}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleAppointmentPopup;
