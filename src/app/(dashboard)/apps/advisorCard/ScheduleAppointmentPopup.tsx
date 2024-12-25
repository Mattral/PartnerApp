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

  // Convert date to API format
  const convertToApiDateFormat = (inputDate: string): string => {
    const date = new Date(inputDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Extract the month in UTC (add 1 because months are zero-indexed), pad it to two digits
    const day = String(date.getUTCDate()).padStart(2, '0'); // Extract the day in UTC, pad it to two digits
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00:00`;
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
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="primary" sx={{ fontWeight: '600' }}>
          Cancel
        </Button>
        <Button
          onClick={bookAppointment}
          color="primary"
          disabled={loading}
          sx={{
            fontWeight: '600',
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleAppointmentPopup;
