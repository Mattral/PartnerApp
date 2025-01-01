"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, Button } from '@mui/material';
import { Person, Description as DescriptionIcon, Work as WorkIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import Chat from './Chat';
import Invite from './invite'; // Importing the Invite component
import JoinCall from './join'; // Importing the Join component

interface Appointment {
  idCA: string;
  ca_title: string;
  ca_desc: string;
  ca_code: string; 
  conv_code: string; // Passed to Chat component
  advisor__pp_hourlyRate: string; // Display in UI
  advisor__pp_paymentCurrency: string; // Display in UI
  advisor__pp_jobTitle: string; // Display in UI
  advisor__pp_jobDesc: string; // Display in UI
  ca_requestedFor: string;
  ca_status: string;
  ed_name: string;
  client__pers_fName: string;
  client__pers_lName: string;
  _advisors: {
    pers_fName: string;
    pers_lName: string;
    pers_profilePic: string;
  }[];
}

const ScheduleDetails: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const storedAppointment = JSON.parse(localStorage.getItem('selectedAppointment') || '{}');
    setAppointment(storedAppointment);
  }, []); // Ensure this runs once on mount

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {/* Left Side - Appointment Details */}
        <Grid item xs={12} md={6}>
          {appointment ? (
            <Card sx={{ boxShadow: 6, borderRadius: '12px', padding: 3 }}>
              <CardContent>
                {/* Profile Pic */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                  <Avatar
                    alt={`${appointment._advisors[0].pers_fName} ${appointment._advisors[0].pers_lName}`}
                    src={appointment._advisors[0].pers_profilePic}
                    sx={{ width: 120, height: 120 }}
                  />
                </Box>

                {/* Title */}
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
                  {appointment.ca_title}
                </Typography>

                {/* Advisor Info */}
                <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
                    <Person sx={{ fontSize: '2rem', verticalAlign: 'middle', color: 'primary.main', marginRight: 2 }} />
                    {appointment._advisors[0].pers_fName} {appointment._advisors[0].pers_lName}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1.4rem' }}>
                    <strong>Advisor Domain:</strong> {appointment.ed_name}
                  </Typography>

                  {/* Advisor Details */}
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.4rem' }}>
                      <WorkIcon sx={{ fontSize: '1.7rem', verticalAlign: 'middle', marginRight: 1, color: 'primary.main' }} />
                      <strong>Job Title:</strong> {appointment.advisor__pp_jobTitle}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.4rem' }}>
                      <DescriptionIcon sx={{ fontSize: '1.7rem', verticalAlign: 'middle', marginRight: 1, color: 'primary.main' }} />
                      <strong>Job Description:</strong> {appointment.advisor__pp_jobDesc}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.4rem' }}>
                      <AttachMoneyIcon sx={{ fontSize: '1.7rem', verticalAlign: 'middle', marginRight: 1, color: 'primary.main' }} />
                      <strong>Hourly Rate:</strong> {appointment.advisor__pp_hourlyRate} {appointment.advisor__pp_paymentCurrency.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>

                {/* Client Info */}
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}>
                    <strong>Client:</strong> {appointment.client__pers_fName} {appointment.client__pers_lName}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1.4rem' }}>
                    <strong>Requested For:</strong> {appointment.ca_requestedFor}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1.4rem' }}>
                    <strong>Status:</strong> {appointment.ca_status}
                  </Typography>
                </Box>

                {/* Description */}
                <Box sx={{ marginTop: 5, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', fontSize: '2rem' }}>
                    <DescriptionIcon sx={{ fontSize: '2.5rem', verticalAlign: 'middle', color: 'primary.main', marginRight: 1 }} />
                    Description
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: 'pre-line',
                      marginTop: 2,
                      fontSize: '1.7rem',
                      color: '#444',
                      maxWidth: '700px',
                      textAlign: 'center',
                      lineHeight: '1.5',
                    }}
                  >
                    {appointment.ca_desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography>Loading appointment details...</Typography>
          )}

            {/* Call Invite Section */}
            <Box sx={{ marginTop: 4 }}>
                {/* Passing ca_code to Invite component */}
                {appointment ? <Invite ca_code={appointment.ca_code} /> : <Typography>Loading invite section...</Typography>}
            </Box>

        </Grid>

        {/* Right Side - Chat and Call Join Section */}
        <Grid item xs={12} md={6}>
          {appointment ? (
            <Chat conv_code={appointment.conv_code} ca_code={appointment.ca_code} ca_requestedFor={appointment.ca_requestedFor}/>
          ) : (
            <Typography>Loading chat...</Typography>
          )}

        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleDetails;
