// pages/ListTime.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Grid, Card, CardContent, Typography, Box, Button, Chip, InputAdornment } from '@mui/material';
import { AccessTime, EventAvailable, CheckCircleOutline, Search, Add, Close } from '@mui/icons-material'; // Imported icons
import axios from 'axios';
import UpdateTime from './UpdateTime'; // Import the UpdateTime component
import WorkScheduleForm from './AdvisorProfileTime';

interface OfficeTime {
    ot_code: string;
    ot_dayOfWeek: string;
    ot_startTime: string;
    ot_endTime: string;
    ot_allowPaidMeeting: boolean;
    ot_allowProbonoMeeting: boolean;
    pp_probonoMeetingBufferTime: number;
    pp_paidMeetingBufferTime: number;
}

interface ListTimeProps {
    refresh: boolean;
}

const ListTime: React.FC<ListTimeProps> = ({ refresh }) => {
    const [officeTimes, setOfficeTimes] = useState<OfficeTime[]>([]);
    const [searchKey, setSearchKey] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [openDialog, setOpenDialog] = useState<boolean>(false); // Controls the dialog
    const [selectedOtCode, setSelectedOtCode] = useState<string>(''); // Stores selected ot_code
    const [showWorkScheduleForm, setShowWorkScheduleForm] = useState<boolean>(false); // Controls visibility of WorkScheduleForm

    // Fetch office times from the API
    const fetchOfficeTimes = async (searchKey: string) => {
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

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

            const response = await axios.get(
                `${baseUrl}/api/back-office/partner/office-times/ui-manually-added-one-testingpurpose`,
                {
                    params: {
                        searchKey,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,  // Use the token from localStorage
                        'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
                        'FRONTEND-KEY': 'XXX', // Replace with actual frontend key if needed
                        'X-Requested-With': 'XMLHttpRequest',
                        PaginateResults: '1',
                        MaxResultsPerPage: '12',
                    },
                }
            );
            setOfficeTimes(response.data.data.primaryData._officeTimes.data);
        } catch (error) {
            setError('Failed to fetch office times. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfficeTimes(searchKey); // Fetch data on component mount
    }, [refresh, searchKey]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value);
    };

    const handleUpdateClick = (otCode: string) => {
        setSelectedOtCode(otCode);
        setOpenDialog(true); // Open the dialog when "Update" is clicked
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    // Toggle the visibility of WorkScheduleForm
    const handleAddTimeClick = () => {
        setShowWorkScheduleForm(!showWorkScheduleForm);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '1.5rem', sm: '2rem' }, textAlign: 'center' }}>
                Advisor Office Times
            </Typography>


            {/* Centered Search Bar with Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    label="Search by Day (e.g., Monday)"
                    variant="outlined"
                    value={searchKey}
                    onChange={handleSearchChange}
                    sx={{
                        width: '50%', // Smaller width
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px', // Rounded search input
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 2 }}
                    startIcon={showWorkScheduleForm ? <Close /> : <Add />}  // Toggle icon between Add and Close
                    onClick={handleAddTimeClick}
                >
                    {showWorkScheduleForm ? 'Close' : 'Add Time'}  
                </Button>
            </Box>

            {/* Conditionally Render the WorkScheduleForm */}
            {showWorkScheduleForm && <WorkScheduleForm />}

            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Grid container spacing={3}>
                    {officeTimes.length > 0 ? (
                        officeTimes.map((officeTime) => (
                            <Grid item xs={12} sm={6} md={4} key={officeTime.ot_code}>
                                <Card sx={{
                                    maxWidth: 345,
                                    borderRadius: '8px',
                                    boxShadow: 3,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)', // Hover effect
                                        boxShadow: 6,
                                    },
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2D2D2D' }}>
                                            {officeTime.ot_dayOfWeek.charAt(0).toUpperCase() + officeTime.ot_dayOfWeek.slice(1)}
                                        </Typography>

                                        {/* Time Information */}
                                        <Box sx={{ marginBottom: 1 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                <AccessTime sx={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: 1 }} />
                                                <strong>Start Time:</strong> {officeTime.ot_startTime}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <AccessTime sx={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: 1 }} />
                                                <strong>End Time:</strong> {officeTime.ot_endTime}
                                            </Typography>
                                        </Box>

                                        {/* Paid & Pro Bono Meeting Info */}
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Chip
                                                label={officeTime.ot_allowPaidMeeting ? 'Paid Meeting Allowed' : 'No Paid Meeting'}
                                                color={officeTime.ot_allowPaidMeeting ? 'primary' : 'secondary'}
                                                icon={<EventAvailable />}
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 'bold',
                                                    padding: '4px 8px',
                                                    borderRadius: '16px',
                                                    marginBottom: 1,
                                                }}
                                            />
                                            <Chip
                                                label={officeTime.ot_allowProbonoMeeting ? 'Pro Bono Allowed' : 'No Pro Bono'}
                                                color={officeTime.ot_allowProbonoMeeting ? 'primary' : 'secondary'}
                                                icon={<CheckCircleOutline />}
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 'bold',
                                                    padding: '4px 8px',
                                                    borderRadius: '16px',
                                                }}
                                            />
                                        </Box>

                                        {/* Buffer Time Info */}
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Pro Bono Buffer Time:</strong> {officeTime.pp_probonoMeetingBufferTime} mins
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Paid Meeting Buffer Time:</strong> {officeTime.pp_paidMeetingBufferTime} mins
                                            </Typography>
                                        </Box>

                                        {/* Update Button */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginTop: 2, width: '100%' }}
                                            onClick={() => handleUpdateClick(officeTime.ot_code)}
                                        >
                                            Update
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No office times found for the selected day.</Typography>
                    )}
                </Grid>
            )}

            {/* UpdateTime Dialog */}
            <UpdateTime open={openDialog} otCode={selectedOtCode} onClose={handleCloseDialog} />
        </Box>
    );
};

export default ListTime;
