import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CircularProgress, Box, List, ListItem, ListItemText } from '@mui/material';
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

    const apiUrl = `https://lawonearth.co.uk/api/partner/advisors/${pers_code}`;
    const token = authData ? authData?.data?.primaryData?.authorization : '';
    const companyCode = 'MC-H3HBRZU6ZK5744S';
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
    // Process and return the sorted data structure based on your needs
    const sortedData = {
      fullName: `${data.data.primaryData._advisor.pers_fName} ${data.data.primaryData._advisor.pers_lName}`,
      email: data.data.primaryData._advisor.email,
      phone: data.data.primaryData._advisor.pers_phone1International,
      profilePic: data.data.primaryData._advisor.pers_profilePic,
      dateOfBirth: data.data.primaryData._advisor.pers_birthdate,
      preferredTimezone: data.data.primaryData._advisor.pers_preferredTimezone,
      jobTitle: data.data.primaryData._advisor.expertiseDomains[0]?.pp_jobTitle,
      jobDesc: data.data.primaryData._advisor.expertiseDomains[0]?.pp_jobDesc,
      hourlyRate: data.data.primaryData._advisor.expertiseDomains[0]?.pp_hourlyRate,
      type: data.data.primaryData._advisor.expertiseDomains[0]?.ed_name,
      officeTimes: data.data.primaryData._advisor.officeTimes.map((timeSlot) => ({
        dayOfWeek: timeSlot.ot_dayOfWeek || 'N/A',  // Ensure we have default values
        startTime: timeSlot.ot_startTime || 'N/A',  // Ensure we have default values
        endTime: timeSlot.ot_endTime || 'N/A',      // Ensure we have default values
        paidMeetingBufferTime: timeSlot.pp_paidMeetingBufferTime || 'N/A', // Default value
        probonoMeetingBufferTime: timeSlot.pp_probonoMeetingBufferTime || 'N/A', // Default value
        allowProbonoMeeting: timeSlot.ot_allowProbonoMeeting || false, // Default value
        allowPaidMeeting: timeSlot.ot_allowPaidMeeting || false,  // Default value
      })),

      ratings: {
        average: data.data.primaryData._advisor.averageRating,
        lastRatings: data.data.primaryData._advisor.lastRatings,
      },
      availability: data.data.primaryData._advisor.availability, // Assuming this data exists in the API response
    };
    return sortedData;
  };

  useEffect(() => {
    if (open && pers_code) {
      fetchAdvisorProfile();
    }
  }, [open, pers_code]);

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.trim() === '') {
      return ''; // Return an empty string if the input is not a valid string
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };



  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Preview</DialogTitle>
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '400px' }}>

        {/* Advisor Profile Section */}
        {profileLoading && <CircularProgress />}
        {sortedAdvisorProfile && (
          <Box mt={2}>
            {/* Advisor Information */}
            <Typography variant="h6">Advisor Information</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={sortedAdvisorProfile.fullName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={sortedAdvisorProfile.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone" secondary={sortedAdvisorProfile.phone} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Profile Picture" secondary={sortedAdvisorProfile.profilePic || 'No profile picture available'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date of Birth" secondary={sortedAdvisorProfile.dateOfBirth || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Timezone" secondary={sortedAdvisorProfile.preferredTimezone || 'N/A'} />
              </ListItem>
            </List>

            {/* Expertise Section */}
            <Typography variant="h6" mt={3}>Expertise</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Job Title" secondary={sortedAdvisorProfile.jobTitle || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Job Description" secondary={sortedAdvisorProfile.jobDesc || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Hourly Rate" secondary={`$${sortedAdvisorProfile.hourlyRate || 'N/A'} USD`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Type" secondary={sortedAdvisorProfile.type || 'N/A'} />
              </ListItem>
            </List>

            {/* Office Times */}
            <Typography variant="h6" mt={3}>Office Times</Typography>
            <List>
              {sortedAdvisorProfile.officeTimes
                // Sort office times by day of the week
                .sort((a, b) => {
                  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                  return daysOfWeek.indexOf(a.dayOfWeek.toLowerCase()) - daysOfWeek.indexOf(b.dayOfWeek.toLowerCase());
                })
                .map((officeTime, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={capitalizeFirstLetter(officeTime.dayOfWeek)}  // Corrected to 'dayOfWeek'
                      secondary={`From: ${officeTime.startTime} to ${officeTime.endTime}`}  // Corrected to 'startTime' and 'endTime'
                    />
                    <ListItemText
                      primary="Pro Bono Allowed"
                      secondary={officeTime.allowProbonoMeeting ? 'Yes' : 'No'}  // Corrected to 'allowProbonoMeeting'
                    />
                    <ListItemText
                      primary="Paid Meeting Allowed"
                      secondary={officeTime.allowPaidMeeting ? 'Yes' : 'No'}  // Corrected to 'allowPaidMeeting'
                    />
                    <ListItemText
                      primary="Pro Bono Meeting Buffer Time"
                      secondary={`${officeTime.probonoMeetingBufferTime} minutes`}  // Corrected to 'probonoMeetingBufferTime'
                    />
                    <ListItemText
                      primary="Paid Meeting Buffer Time"
                      secondary={`${officeTime.paidMeetingBufferTime} minutes`}  // Corrected to 'paidMeetingBufferTime'
                    />
                  </ListItem>
                ))}
            </List>

            {/* Availability */}
            <Typography variant="h6" mt={3}>Availability</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Next 30 Days" secondary={sortedAdvisorProfile.availability || 'No availability listed.'} />
              </ListItem>
            </List>

            {/* Ratings Section */}
            <Typography variant="h6" mt={3}>Ratings</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Average Rating" secondary={sortedAdvisorProfile.ratings?.average || 'Not available'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last 10 Ratings" secondary={sortedAdvisorProfile.ratings?.lastRatings || 'No ratings available'} />
              </ListItem>
            </List>
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
