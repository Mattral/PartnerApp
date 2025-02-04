"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Material-UI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'sections/auth/AuthWrapper';

const CheckMail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1 - Request email, Step 2 - Verify OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const router = useRouter();

  // Handle sending OTP request
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setApiResponse(''); // Reset API response on each new request

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('redirectUrl', 'http://lawonearth.org/');

      const response = await axios.post(
        'https://lawonearth.co.nz/api/auth/partner/request-email-validation-otp',
        formData, 
        {
          headers: {
            'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
            'FRONTEND-KEY': 'XXX',
          },
        }
      );

      console.log(response.data);

      // If API response status is 'treatmentSuccess', show the message
      if (response.data.status === 'treatmentSuccess') {
        setApiResponse(response.data.data.primaryData.msg);
        setStep(2); // Move to OTP verification step
      } else if (response.data.status === 'validationError') {
        // If validationError, show validation error from response
        const errorMessage = response.data.data.primaryData.errors?.email?.[0] || 'An error occurred. Please try again.';
        setMessage(errorMessage);
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP request:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setApiResponse(''); // Reset API response on each new request

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('verificationOTP', otp);

      const response = await axios.post(
        'https://lawonearth.co.nz/api/auth/partner/verify-email',
        formData, 
        {
          headers: {
            'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
            'FRONTEND-KEY': 'XXX',
          },
        }
      );

      console.log(response.data);
      if (response.data.status === 'treatmentSuccess') {
        router.push('/login'); // Redirect to login page on success
      } else if (response.data.status === 'validationError') {
        // Handle OTP related validation error
        const otpErrorMessage = response.data.data.primaryData.errors?.verificationOTP?.[0] || 'Invalid OTP. Please try again.';
        setMessage(otpErrorMessage);
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        {/* Upper Section: Email Form and API Response */}
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Enter Your Email</Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
              Please provide your email to receive a verification OTP.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleEmailSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </AnimateButton>
          </form>
        </Grid>

        {/* Display API response message */}
        {apiResponse && (
          <Grid item xs={12}>
            <Typography variant="body2" color="success.main">
              {apiResponse}
            </Typography>
          </Grid>
        )}

        {/* Lower Section: OTP Form */}
        {step === 2 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h3">Please Enter your OTP</Typography>
              <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
                Please enter the OTP sent to your email.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <form onSubmit={handleOtpSubmit}>
                <TextField
                  fullWidth
                  label="OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <AnimateButton>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Submit OTP'}
                  </Button>
                </AnimateButton>
              </form>
            </Grid>
          </>
        )}

        {/* Error message if any */}
        {message && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error">
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </AuthWrapper>
  );
};

export default CheckMail;
