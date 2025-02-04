"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Grid, Card, CardContent, Typography, Box, InputAdornment, CircularProgress } from '@mui/material';
import { Search, AccessTime, Person, Email, Error } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Appointment {
    idCA: string;
    ca_title: string;
    ca_desc: string;
    ca_code:string;
    conv_code:string;
    advisor__pp_hourlyRate:string;
    advisor__pp_paymentCurrency:string;
    advisor__pp_jobTitle:string;
    advisor__pp_jobDesc:string;
    ca_requestedFor: string;
    ca_status: string;
    ed_name: string;
    client__pers_fName: string;
    client__pers_lName: string;
    _advisors: {
        pers_fName: string;
        pers_lName: string;
        email: string;
        pers_profilePic: string;
    }[];
}

const ListAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [searchKey, setSearchKey] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const router = useRouter();

    // Function to fetch appointments from API
    const fetchAppointments = async (searchKey: string) => {
        setLoading(true);
        setError('');

        // Retrieve the token from localStorage
        const storedAuthData = localStorage.getItem('authData');
        let token = '';
        if (storedAuthData) {
            try {
                const parsedData = JSON.parse(storedAuthData);
                token = parsedData?.data?.primaryData?.authorization || ''; // Extract the token from stored data
            } catch (error) {
                console.error("Failed to parse auth data:", error);
            }
        }

        // If no token found, show an error
        if (!token) {
            setError('Authorization token is missing.');
            setLoading(false);
            return;
        }

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // `${baseUrl}/`

            const response = await axios.get(`${baseUrl}/api/back-office/partner/call-appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Use the token from localStorage
                    'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
                    'FRONTEND-KEY': 'XXX',
                    'X-Requested-With': 'XMLHttpRequest',
                    PaginateResults: '5',
                    MaxResultsPerPage: '12',
                },
                params: {
                    searchKey: searchKey,
                },
            });
            setAppointments(response.data.data.primaryData._callAppointments.data);
        } catch (error) {
            setError('Failed to fetch appointments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments(searchKey); // Fetch appointments on search key change or component mount
    }, [searchKey]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value);
    };

    const handleCardClick = (appointment: Appointment) => {
        // Store the selected appointment in localStorage
        localStorage.setItem('selectedAppointment', JSON.stringify(appointment));
        
        // Navigate to the schedule details page
        router.push('/apps/scheduleDetails');
        //setSelectedAppointment(appointment);  // Set the selected appointment for the pop-up
    };

    const handleClosePopUp = () => {
        setSelectedAppointment(null); // Close the pop-up by resetting the selected appointment
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', fontSize: '2rem' }}>
                Appointment List
            </Typography>

            {/* Search bar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    label="Search by Title"
                    variant="outlined"
                    value={searchKey}
                    onChange={handleSearchChange}
                    sx={{
                        width: '50%',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#f9f9f9',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: 'primary.main' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, color: 'error.main' }}>
                    <Error sx={{ marginRight: 1, color: 'primary.main' }} />
                    <Typography variant="body1" color="error.main" sx={{ fontSize: '1.1rem' }}>{error}</Typography>
                </Box>
            ) : (
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.idCA}>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        borderRadius: '12px',
                                        boxShadow: 6,
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 12,
                                        },
                                        backgroundColor: '#fff',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleCardClick(appointment)}  // Trigger the popup
                                >
                                    <CardContent>
                                        {/* Profile Picture at the top */}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                            <Avatar
                                                alt={`${appointment._advisors[0].pers_fName} ${appointment._advisors[0].pers_lName}`}
                                                src={appointment._advisors[0].pers_profilePic}
                                                sx={{ width: 90, height: 90 }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', fontSize: '1.2rem' }}>
                                            {appointment.ca_title}
                                        </Typography>

                                        {/* Appointment Details */}
                                        <Box sx={{ marginBottom: 1 }}>
                                            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '1.1rem' }}>
                                                <strong>Requested For:</strong> {appointment.ca_requestedFor}
                                            </Typography>
                                            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
                                                <strong>Status:</strong> {appointment.ca_status}
                                            </Typography>
                                        </Box>

                                        {/* Advisor Information */}
                                        <Box sx={{ marginBottom: 1 }}>
                                            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '1.1rem' }}>
                                                <Person sx={{ fontSize: '1.2rem', color: 'primary.main', verticalAlign: 'middle', marginRight: 1 }} />
                                                <strong>Advisor:</strong> {appointment._advisors[0].pers_fName} {appointment._advisors[0].pers_lName}
                                            </Typography>
                                            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '1.1rem' }}>
                                                <strong>Domain:</strong> {appointment.ed_name}
                                            </Typography>
                                        </Box>

                                        {/* Client Information */}
                                        <Box sx={{ marginBottom: 1 }}>
                                            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '1.1rem' }}>
                                                <Person sx={{ fontSize: '1.2rem', color: 'primary.main', verticalAlign: 'middle', marginRight: 1 }} />
                                                <strong>Client:</strong> {appointment.client__pers_fName} {appointment.client__pers_lName}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
                            No appointments found for the search.
                        </Typography>
                    )}
                </Grid>
            )}


        </Box>
    );
};

export default ListAppointments;
