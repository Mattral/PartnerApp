import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CircularProgress, TextField, Box } from '@mui/material';
import axios from 'axios';

interface PreviewPopupProps {
  open: boolean;
  onClose: () => void;
  pers_code: string;  // Person ID code used in the API
  ui_code: string;    // Use this as the UI code
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ open, onClose, pers_code, ui_code }) => {
  // State for inputs and loading
  const [ca_title, setCaTitle] = useState('');
  const [ca_desc, setCaDesc] = useState('');
  const [ca_requestedFor, setCaRequestedFor] = useState<string>(''); // Store as string for datetime-local
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<any | null>(null);  // To store the advisor profile data
  const [profileLoading, setProfileLoading] = useState(false);  // To track loading state of advisor API

  // Function to handle the conversion to ISO 8601 format with +00:00 timezone
  const convertToApiDateFormat = (time: string): string => {
    const date = new Date(time); // Convert string to Date object

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Format the date to `Y-m-d H:i:s+00:00`
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Return the formatted date string with +00:00 timezone
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
  };

  // Fetch the advisor profile when the popup is opened
  useEffect(() => {
    if (open && pers_code) {
      fetchAdvisorProfile();
    }
  }, [open, pers_code]);

  // Function to fetch the advisor profile data
  const fetchAdvisorProfile = async () => {
    setProfileLoading(true);
    setAdvisorProfile(null); // Reset previous profile data

    const apiUrl = `https://lawonearth.co.uk/api/partner/advisors/${pers_code}`;
    const token = '604|QBA1u0JACnLnTwCstUuKd2NRE6UbKXxIMJ6CfYc2bdfcbd9f'; // Your Authorization Token
    const companyCode = 'MC-H3HBRZU6ZK5744S'; // Your Company Code
    const frontendKey = 'XXX'; // Replace with your frontend key

    const headers = {
      Authorization: `Bearer ${token}`,
      'COMPANY-CODE': companyCode,
      'FRONTEND-KEY': frontendKey,
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      setAdvisorProfile(response.data);  // Store advisor data
    } catch (err) {
      setError('Failed to fetch advisor profile.');
      console.error(err);
    } finally {
      setProfileLoading(false);
    }
  };

  // Function to handle the API call for creating the appointment
  const bookAppointment = async () => {
    if (!ca_title || !ca_desc || !ca_requestedFor) {
      setError('Please fill in all fields.');
      return;
    }

    // Check if the provided date is in the future
    const requestedDate = new Date(ca_requestedFor);
    const currentDate = new Date();
    if (requestedDate <= currentDate) {
      setError('The requested date/time must be in the future.');
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

    try {
      // Convert to API format (ISO 8601 +00:00 timezone)
      const formattedDateTime = convertToApiDateFormat(ca_requestedFor);

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Preview</DialogTitle>
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '400px' }}>
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

        {/* Advisor Profile Section */}
        {profileLoading && <CircularProgress />}
        {advisorProfile && (
          <Box mt={2}>
            <Typography variant="h6">Advisor Profile</Typography>
            <pre>{JSON.stringify(advisorProfile, null, 2)}</pre>
          </Box>
        )}
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