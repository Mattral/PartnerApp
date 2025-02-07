import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CircularProgress, Box, List, ListItem } from '@mui/material';
import axios from 'axios';
import ScheduleAppointmentPopup from './ScheduleAppointmentPopup'; // Import ScheduleAppointmentPopup

interface PreviewPopupProps {
  open: boolean;
  onClose: () => void;
  pers_code: string;
  ui_code: string;
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ open, onClose, pers_code, ui_code }) => {
  const [advisorProfile, setAdvisorProfile] = useState<any | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [authData, setAuthData] = useState<any | null>(null);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false); // State to control ScheduleAppointmentPopup visibility
  const [sortedAdvisorProfile, setSortedAdvisorProfile] = useState<any | null>(null); // State for sorted-out profile

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

  const fetchAdvisorProfile = async () => {
    setProfileLoading(true);
    setAdvisorProfile(null);
    setSortedAdvisorProfile(null); // Reset sorted data
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

    const apiUrl = `${baseUrl}/api/partner/advisors/${pers_code}`;
    const token = authData ? authData?.data?.primaryData?.authorization : '';
    const companyCode = process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV";
    const frontendKey = 'XXX'; // Replace with your frontend key

    const headers = {
      Authorization: `Bearer ${token}`,
      'COMPANY-CODE': companyCode,
      'FRONTEND-KEY': frontendKey,
      'X-Requested-With': 'XMLHttpRequest',
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      setAdvisorProfile(response.data);
      
      // Process and sort out the data as needed
      const sortedProfile = processProfileData(response.data);
      setSortedAdvisorProfile(sortedProfile);
    } catch (err) {
      console.error('Failed to fetch advisor profile.', err);
    } finally {
      setProfileLoading(false);
    }
  };

  const processProfileData = (data: any) => {
    // Example: Process the profile and sort out relevant details
    const sortedData = {
      fullName: `${data.data.primaryData._advisor.pers_fName} ${data.data.primaryData._advisor.pers_lName}`,
      email: data.data.primaryData._advisor.email,
      phone: data.data.primaryData._advisor.pers_phone1,
      profilePic: data.data.primaryData._advisor.pers_profilePic,
      jobTitle: data.data.primaryData._advisor.expertiseDomains[0]?.pp_jobTitle,
      jobDesc: data.data.primaryData._advisor.expertiseDomains[0]?.pp_jobDesc,
      officeTimes: data.data.primaryData.officeTimes,
    };
    return sortedData;
  };

  useEffect(() => {
    if (open && pers_code) {
      fetchAdvisorProfile();
    }
  }, [open, pers_code]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Preview</DialogTitle>
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '400px' }}>
        <Typography variant="h6">HELLO {pers_code} + {ui_code}</Typography>

        {/* Advisor Profile Section */}
        {profileLoading && <CircularProgress />}
        {advisorProfile && (
          <Box mt={2}>
            <Typography variant="h6">Raw API Response</Typography>
            <pre>{JSON.stringify(advisorProfile, null, 2)}</pre>
          </Box>
        )}
        

        {/* Trigger the ScheduleAppointmentPopup */}
        <DialogActions>
          <Button onClick={onClose} color="primary">Close</Button>
          <Button onClick={() => setShowSchedulePopup(true)} color="primary">
            Book Appointment
          </Button>
        </DialogActions>

        {/* Show ScheduleAppointmentPopup */}
        <ScheduleAppointmentPopup
          open={showSchedulePopup}
          onClose={() => setShowSchedulePopup(false)}
          pers_code={pers_code}
          ui_code={ui_code}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewPopup;
