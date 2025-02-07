import React, { useState } from 'react';
import { Button, Box, Typography, Card } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface JoinCallProps {
  ca_code: string;
  ca_requestedFor: string;
}

const JoinCall: React.FC<JoinCallProps> = ({ ca_code, ca_requestedFor }) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const router = useRouter();

  // Format the ca_requestedFor to a readable date format
  const formattedDate = new Date(ca_requestedFor).toLocaleString();

  // Calculate the time difference and determine if it's upcoming or due by
  const calculateTimeDifference = () => {
    const currentDate = new Date(); // Current time
    const requestedDate = new Date(ca_requestedFor); // The requested call time
  
    // Calculate the time difference in milliseconds
    const timeDifference = requestedDate.getTime() - currentDate.getTime();
  
    // If the requested time is in the past, show how much time has passed
    if (timeDifference < 0) {
      // Get the absolute value of the time difference for past events
      const pastTimeDifference = Math.abs(timeDifference);
  
      // Calculate how many full days and hours the past event has
      const daysPassed = Math.floor(pastTimeDifference / (1000 * 3600 * 24));  // 1000ms * 3600s * 24h
      const hoursPassed = Math.floor((pastTimeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  
      return `Due ${daysPassed} days and ${hoursPassed} hours ago`;
    }
  
    // If the requested time is in the future, show how much time is remaining
    const futureTimeDifference = timeDifference;
  
    // Calculate how many full days and hours the future event is
    const daysRemaining = Math.floor(futureTimeDifference / (1000 * 3600 * 24)); // 1000ms * 3600s * 24h
    const hoursRemaining = Math.floor((futureTimeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  
    return `Upcoming in ${daysRemaining} days and ${hoursRemaining} hours`;
  };
  
  

  // Retrieve the authorization token from localStorage
  const getAuthToken = () => {
    const storedAuthData = localStorage.getItem('authData');
    let token = '';
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        token = parsedData?.data?.primaryData?.authorization || ''; // Extract the token
      } catch (error) {
        console.error("Failed to parse auth data:", error);
      }
    }
    return token;
  };

  // Handle API call when "Join Call" is clicked
  const handleJoinCall = async () => {
    setLoading(true);
    setResponseMessage(null); // Reset the response message before making the call

    const token = getAuthToken(); // Retrieve the token from localStorage

    if (!token) {
      setResponseMessage('Authorization token is missing.');
      setLoading(false);
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

    const url = `${baseUrl}/api/back-office/partner/identified-call-identities/create`;
    const headers = {
      'Authorization': `Bearer ${token}`,  // Use the token retrieved from localStorage
      'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
      'FRONTEND-KEY': 'XXX',
      'X-Requested-With': 'XMLHttpRequest',
    };
    const payload = {
      ca_code: ca_code,
      redirectUrl: 'https://lawonearth.org/',
    };

    try {
      const response = await axios.post(url, payload, { headers });
      const data = response.data;
      if (data.status === 'treatmentSuccess') {
        setResponseMessage('Call successfully joined!');

        // Extract rai_jwt, cr_sessionKey, and ca_code from the response data
        const rai_jwt = data.data.primaryData._roomAccessIdentity.rai_jwt;
        const cr_sessionKey = data.data.primaryData._roomAccessIdentity.cr_sessionKey;

        console.log(rai_jwt,cr_sessionKey ,ca_code)
        // Ensure all data is available and valid
        if (!rai_jwt || !cr_sessionKey || !ca_code) {
          setResponseMessage('Missing required data. Cannot join call.');
          setLoading(false);
          return;
        }

        // Store rai_jwt, cr_sessionKey, and ca_code in localStorage
        localStorage.setItem('callData', JSON.stringify({
          rai_jwt,
          cr_sessionKey,
          ca_code,
        }));

        // Navigate to the video call page
        router.push(`/call/${cr_sessionKey}`);
      } else {
        setResponseMessage('Failed to join the call.');
      }
    } catch (error) {
      setResponseMessage('Error joining the call.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      {/* Enclosing the content in a beautiful Card */}
      <Card sx={{ padding: 3, boxShadow: 3, borderRadius: '12px', textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'secondary.main',
            fontSize: '1.25rem',
            marginTop: 1,
          }}
        >
          Date of Call: <span style={{ fontWeight: 'normal', color: '#555' }}>{formattedDate}</span>
        </Typography>

        {/* Displaying the time difference */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'text.secondary',
            fontSize: '1.1rem',
            marginTop: 2,
          }}
        >
          {calculateTimeDifference()}
        </Typography>

        {/* Join Call Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleJoinCall}
          disabled={loading}
          sx={{ padding: '10px 20px', fontSize: '1.1rem', marginTop: 3 }}
        >
          {loading ? 'Joining...' : 'Join Call'}
        </Button>

        {/* Displaying the response message */}
        {responseMessage && (
          <Typography sx={{ marginTop: 2, color: responseMessage.includes('Error') ? 'red' : 'green' }}>
            {responseMessage}
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default JoinCall;
