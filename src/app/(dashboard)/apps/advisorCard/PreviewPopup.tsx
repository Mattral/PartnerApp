import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  ListItemAvatar,
  Stack,
} from '@mui/material';

import axios from 'axios';
import ScheduleAppointmentPopup from './ScheduleAppointmentPopup'; // Import ScheduleAppointmentPopup
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar'; // Assume Avatar component
import { Phone, Email, Event, Schedule, AttachMoney, Accessibility, AccessTime, ReportProblem, Star } from '@mui/icons-material'; // MUI icons
import WorkIcon from '@mui/icons-material/Work';          // For Job Title
import DescriptionIcon from '@mui/icons-material/Description';
import WarningIcon from '@mui/icons-material/Warning';

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
      currency:data.data.primaryData._advisor.expertiseDomains[0]?.pp_paymentCurrency,
      type: data.data.primaryData._advisor.expertiseDomains[0]?.ed_name,
      officeTimes: data.data.primaryData._advisor.officeTimes.map((timeSlot) => ({
        dayOfWeek: timeSlot.ot_dayOfWeek || 'N/A', 
        startTime: timeSlot.ot_startTime || 'N/A', 
        endTime: timeSlot.ot_endTime || 'N/A', 
        paidMeetingBufferTime: timeSlot.pp_paidMeetingBufferTime || 'N/A',
        probonoMeetingBufferTime: timeSlot.pp_probonoMeetingBufferTime || 'N/A',
        allowProbonoMeeting: timeSlot.ot_allowProbonoMeeting || false,
        allowPaidMeeting: timeSlot.ot_allowPaidMeeting || false, 
      })),
      ratings: {
        average: data.data.primaryData._advisor.averageRating,
        lastRatings: data.data.primaryData._advisor.lastRatings,
      },
      availability: data.data.primaryData._advisor.availability, 
    };
    return sortedData;
  };

  useEffect(() => {
    if (open && pers_code) {
      fetchAdvisorProfile();
    }
  }, [open, pers_code]);

  const capitalizeFirstLetter = (string: string) => {
    if (typeof string !== 'string' || string.trim() === '') {
      return ''; 
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ px: 2 }}>
        <List sx={{ width: 1, p: 0 }}>
          <ListItem
            disablePadding
            sx={{ ml: 4 }}
            secondaryAction={
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 7 }}>
                <Tooltip title="Report an Issue">
                  <IconButton color="error" >
                    <ReportProblem />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          >
            <ListItemAvatar sx={{ mr: 2 }}>
              <Avatar alt={sortedAdvisorProfile?.fullName} size="xl" src={sortedAdvisorProfile?.profilePic || '/assets/images/default-avatar.png'} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>{sortedAdvisorProfile?.fullName || 'N/A'}</Typography>}
              secondary={<Typography variant="subtitle2" color="textSecondary">{sortedAdvisorProfile?.type || 'N/A'}</Typography>}
            />
          </ListItem>
        </List>
      </DialogTitle>

      <DialogContent sx={{ px: 0, py: 1 }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 1 }}>
          {profileLoading && <CircularProgress />}

          {sortedAdvisorProfile && (
            <Grid container spacing={3}>
              {/* Left section with advisor info */}
              <Grid item xs={12} sm={8} xl={9}>
                <Grid container spacing={2.25}>
                  <Grid item xs={12}>
                    <MainCard title="About Advisor">
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <WorkIcon sx={{ mr: 4, color: 'primary.main' }} />  {/* Job Title Icon */}
                        <Typography variant="h6">
                          {sortedAdvisorProfile?.jobTitle || 'Title not provided'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 4, color: 'primary.main' }} />  {/* Job Description Icon */}
                        <Typography>
                          {sortedAdvisorProfile.jobDesc || 'No description available.'}
                        </Typography>
                      </Box>
                    </MainCard>
                  </Grid>

                  <Grid item xs={12}>
                    <MainCard title="Contact Info">
                      <Grid container spacing={3}>
                        {/* Phone and Timezone */}

                        <Grid item xs={6} sm={3}>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Accessibility sx={{ color: 'primary.main' }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Timezone</Typography>
                              <Typography variant="body1">{sortedAdvisorProfile.preferredTimezone || 'N/A'}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* Email and Date of Birth */}

                        
                        <Grid item xs={6} sm={3}>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Event sx={{ color: 'primary.main' }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Date of Birth</Typography>
                              <Typography variant="body1">{sortedAdvisorProfile.dateOfBirth || 'N/A'}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>

                  <Grid item xs={12}>
                    <MainCard title="Office Times">
                      <Box sx={{ overflowX: 'auto' }}>
                        <Table sx={{ minWidth: 650 }}>
                          <TableHead>
                            <TableRow
                              sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <TableCell
                                sx={{
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  fontSize: '16px',
                                  color: '#444',
                                  minWidth: '100px',
                                }}
                              >
                                Day
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  fontSize: '16px',
                                  color: '#444',
                                  minWidth: '80px',
                                }}
                              >
                                From
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  fontSize: '16px',
                                  color: '#444',
                                  minWidth: '80px',
                                }}
                              >
                                To
                              </TableCell>
                              <Tooltip
                                title="Pro Bono which means free consultations, advisors may choose to accept this as per their availability"
                                arrow
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    color: '#444',
                                    minWidth: '120px',
                                  }}
                                >
                                  Pro Bono Allowed
                                  <WarningIcon sx={{ fontSize: 20, marginRight: '8px' }} color="secondary" />

                                </TableCell>
                              </Tooltip>

                              <Tooltip
                                title="This is the time frame for usual consultation with payment"
                                arrow
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    color: '#444',
                                    minWidth: '120px',
                                  }}
                                >
                                  Paid Meeting Allowed
                                  <WarningIcon sx={{ fontSize: 20, marginRight: '8px' }} color="secondary" />

                                </TableCell>
                              </Tooltip>

                              <Tooltip
                                title="Buffer time means the difference between the time you are scheduling and current time"
                                arrow
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    color: '#444',
                                    minWidth: '120px',
                                  }}
                                >
                                  Paid Meeting Buffer Time
                                  <WarningIcon sx={{ fontSize: 20, marginRight: '8px' }} color="secondary" />

                                </TableCell>
                              </Tooltip>
                              
                              {/* Add exclamation icon for this header */}
                              <Tooltip
                                title="Information regarding Pro Bono Meeting Buffer Time"
                                arrow
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    color: '#444',
                                    minWidth: '120px',

                                    justifyContent: 'center',
                                  }}
                                >
                                  
                                  ProBono's Buffer Time
                                  <WarningIcon sx={{ fontSize: 20, marginRight: '4px' }} color="secondary" />

                                </TableCell>
                              </Tooltip>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {sortedAdvisorProfile.officeTimes.map((officeTime, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                                  '&:hover': {
                                    backgroundColor: '#e5e5e5',
                                    transform: 'translateY(-2px)',
                                    transition: 'background-color 0.3s, transform 0.3s ease',
                                  },
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                                }}
                              >
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  {capitalizeFirstLetter(officeTime.dayOfWeek)}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  {officeTime.startTime}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  {officeTime.endTime}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  <Chip
                                    label={officeTime.allowProbonoMeeting ? 'Yes' : 'No'}
                                    color={officeTime.allowProbonoMeeting ? 'primary' : 'error'}
                                    sx={{ fontWeight: 'bold', borderRadius: 12 }}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  <Chip
                                    label={officeTime.allowPaidMeeting ? 'Yes' : 'No'}
                                    color={officeTime.allowPaidMeeting ? 'primary' : 'error'}
                                    sx={{ fontWeight: 'bold', borderRadius: 12 }}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  {officeTime.paidMeetingBufferTime || 'N/A'}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
                                  {officeTime.probonoMeetingBufferTime || 'N/A'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </MainCard>
                  </Grid>

                </Grid>
              </Grid>

              {/* Right section with expertise, ratings, and availability */}
              <Grid item xs={12} sm={4} xl={3}>
                <MainCard title="Expertise">
                  <List>
                    <ListItem>
                      <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
                      <ListItemText primary="Hourly Rate" secondary={`${sortedAdvisorProfile.hourlyRate || 'N/A'} `} />
                    </ListItem>
                    <ListItem>
                      <AttachMoney sx={{ mr: 2, color: 'primary.main' }} />
                      <ListItemText primary="Preferred Currency" secondary={`${sortedAdvisorProfile.currency || 'N/A'}`} />
                    </ListItem>
                  </List>
                </MainCard>

                <MainCard title="Ratings">
                  <List sx={{ py: 0 }}>
                    <ListItem>
                      <Star sx={{ mr: 2, color: 'primary.main' }} />
                      <ListItemText primary="Average Rating" secondary={sortedAdvisorProfile.ratings?.average || 'Not available'} />
                    </ListItem>
                    <ListItem>
                      <Star sx={{ mr: 2, color: 'primary.main' }} />
                      <ListItemText primary="Last 10 Ratings" secondary={sortedAdvisorProfile.ratings?.lastRatings || 'No ratings available'} />
                    </ListItem>
                  </List>
                </MainCard>

                <MainCard title="Availability">
                  <Typography>{sortedAdvisorProfile.availability || 'No availability listed.'}</Typography>
                  <Box mt={2}>
                    <Chip label="Book Appointment" color="primary" onClick={() => setShowSchedulePopup(true)} />
                  </Box>
                </MainCard>
              </Grid>
            </Grid>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={() => setShowSchedulePopup(true)} color="primary">Book Appointment</Button>
      </DialogActions>

      {/* Show ScheduleAppointmentPopup */}
      <ScheduleAppointmentPopup
        open={showSchedulePopup}
        onClose={() => setShowSchedulePopup(false)}
        pers_code={pers_code}
        ui_code={ui_code}
      />
    </Dialog>
  );
};

export default PreviewPopup;

/*
                        <Grid item xs={6} sm={3}>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Phone sx={{ color: 'primary.main' }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Phone</Typography>
                              <Typography variant="body1">{sortedAdvisorProfile.phone || 'N/A'}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        */