import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CircularProgress, TextField, Box } from '@mui/material';
import axios from 'axios';

interface PreviewPopupProps {
  open: boolean;
  onClose: () => void;
  pers_code: string;
  ui_code: string; // Use this as the UI code
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ open, onClose, pers_code, ui_code }) => {
  // State for input fields and loading
  const [ca_title, setCaTitle] = useState('');
  const [ca_desc, setCaDesc] = useState('');
  const [ca_requestedFor, setCaRequestedFor] = useState<string>(''); // Store as string for datetime-local
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Function to handle the conversion to 24-hour format with timezone offset
  const convertTo24HourFormat = (time: string): string => {
    const date = new Date(time); // Convert string to Date object

    // Get the UTC offset for +00:00
    const timeZoneOffset = '00:00'; // You can change this to +XX:XX if needed

    // Format the date to `Y-m-d H:i:s` format
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Construct the datetime string with timezone offset
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${timeZoneOffset}`;
  };

  // Function to handle the API call for creating the appointment
  const bookAppointment = async () => {
    if (!ca_title || !ca_desc || !ca_requestedFor) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);  // Reset any previous errors
    setSuccess(null); // Reset any previous success message

    const apiUrl = 'https://lawonearth.co.uk/api/back-office/partner/call-appointments/create';
    const token = '604|QBA1u0JACnLnTwCstUuKd2NRE6UbKXxIMJ6CfYc2bdfcbd9f'; // Your Authorization Token
    const companyCode = 'MC-H3HBRZU6ZK5744S'; // Your Company Code
    const frontendKey = 'XXX'; // Replace with your frontend key
    const redirectUrl = 'https://lawonearth.org/'; // The redirect URL

    // Convert to 24-hour format with timezone offset
    const formattedDateTime = convertTo24HourFormat(ca_requestedFor);

    const payload = {
      ui_code, // UI code to be booked
      ca_title, // Title from the form
      ca_desc,  // Description from the form
      ca_requestedFor: formattedDateTime, // Date-time with timezone offset
      redirectUrl, // Redirect URL after the session
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'COMPANY-CODE': companyCode,
      'FRONTEND-KEY': frontendKey,
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const response = await axios.post(apiUrl, payload, { headers });
      setSuccess('Appointment successfully booked!');
      console.log(response.data);
    } catch (err: any) {
      setError('Failed to book appointment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Preview</DialogTitle>
      <DialogContent>
        <Typography variant="h6">HELLO {pers_code} + {ui_code}</Typography>

        {/* Input fields for ca_title, ca_desc, ca_requestedFor */}
        <Box marginBottom={2}>
          <TextField
            label="Session Title"
            variant="outlined"
            fullWidth
            value={ca_title}
            onChange={(e) => setCaTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Session Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={ca_desc}
            onChange={(e) => setCaDesc(e.target.value)}
            margin="normal"
          />
        </Box>

        {/* Simple datetime-local input */}
        <TextField
          label="Session Date & Time"
          type="datetime-local"
          value={ca_requestedFor}
          onChange={(e) => setCaRequestedFor(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />

        {/* Show success or error messages */}
        {loading && <CircularProgress />}
        {success && <Typography color="green">{success}</Typography>}
        {error && <Typography color="red">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button
          onClick={bookAppointment}
          color="primary"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewPopup;


//https://www.apidog.com/apidoc/shared-5bab9a98-f313-440e-a311-d5f0983afa1d/api-9031511