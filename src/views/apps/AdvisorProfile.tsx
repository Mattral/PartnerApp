"use client"
import { useState } from 'react';
import axios from 'axios';

// Material UI imports
import { Grid, Box, Stack, Button, Typography, TextField, Alert, IconButton, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';
import { CheckCircle, Error, Close } from '@mui/icons-material';

const TabPersonal = () => {
    // State to manage the form values
    const [hourlyRate, setHourlyRate] = useState<number | string>('');
    const [currency, setCurrency] = useState<'usd' | 'euro' | null>(null);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [paidMeetingBufferTime, setPaidMeetingBufferTime] = useState<number | string>('');
    const [probonoMeetingBufferTime, setProbonoMeetingBufferTime] = useState<number | string>('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hourlyRate || !currency || !jobTitle || !jobDesc || !paidMeetingBufferTime || !probonoMeetingBufferTime) {
            setError("Please fill all the fields");
            return;
        }

        const data = {
            ui_code: 'ui-manually-added-one-testingpurpose',  // Static UI code
            pp_hourlyRate: hourlyRate,
            pp_paymentCurrency: currency,
            pp_jobTitle: jobTitle,
            pp_jobDesc: jobDesc,
            pp_paidMeetingBufferTime: paidMeetingBufferTime,
            pp_probonoMeetingBufferTime: probonoMeetingBufferTime
        };

        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            // POST request to create the profile
            const response = await axios.post(
                'https://lawonearth.co.uk/api/back-office/partner/advisor-profile/create',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer 600|rj7SWm6qgoMXDmQDtBxzElBKLexbSOT0mKvaRXiofd26c637', // Replace with actual token
                        'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',  // Replace with actual company code
                        'FRONTEND-KEY': 'XXX',  // Replace with actual key
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            // If the profile is created successfully, show success message
            setSuccess("Profile created successfully!");
            console.log("Profile creation response:", response.data);

        } catch (error: any) {
            // If there's an error, we check if the profile already exists
            if (error.response && error.response.data) {
                const { status, data } = error.response.data;
                const msg = data?.primaryData?.msg || "An unknown error occurred.";

                // Handling Validation Errors
                if (status === 'validationError') {
                    // Extract validation errors from the response
                    const validationErrors = data?.primaryData?.errors || {};

                    // Check if there are specific errors for `pp_jobDesc` field (for example)
                    const jobDescError = validationErrors?.pp_jobDesc?.[0];

                    if (jobDescError) {
                        setError(jobDescError);  // Set the specific error message for jobDesc
                    } else {
                        setError("Please correct the errors in the form.");
                    }
                }

                else if (status === 'treatmentFailure' && msg === "You already configured your professional profile, feel free to update it.") {
                    // If profile already exists, automatically trigger update API call
                    await handleUpdateProfile(data);
                } else {
                    setError(msg);
                }
            } else {
                setError("Network or Server error. Please try again later.");
            }
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to trigger the update API call
    const handleUpdateProfile = async (existingData: any) => {
        try {
            const data = {
                ...existingData,
                ui_code: 'ui-manually-added-one-testingpurpose',
                pp_hourlyRate: hourlyRate,
                pp_paymentCurrency: currency,
                pp_jobTitle: jobTitle,
                pp_jobDesc: jobDesc,
                pp_paidMeetingBufferTime: paidMeetingBufferTime,
                pp_probonoMeetingBufferTime: probonoMeetingBufferTime
            };

            const response = await axios.post(
                'https://lawonearth.co.uk/api/back-office/partner/advisor-profile/update',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer 600|rj7SWm6qgoMXDmQDtBxzElBKLexbSOT0mKvaRXiofd26c637', // Replace with actual token
                        'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',  // Replace with actual company code
                        'FRONTEND-KEY': 'XXX',  // Replace with actual key
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            setSuccess("Profile updated successfully!");
            console.log("Profile update response:", response.data);
        } catch (error) {
            setError("Failed to update profile. Please try again.");
            console.error("API Update Error:", error);
        }
    };

    return (
        <Box sx={{ padding: { xs: 2, sm: 3 }, maxWidth: '900px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                Create/Update Advisor Profile
            </Typography>

            {/* Form Start */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Hourly Rate */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="How much do you charge every hour?"
                            type="number"
                            fullWidth
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Currency */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <FormLabel>Choose your preferred currency</FormLabel>
                            <RadioGroup row value={currency} onChange={(e) => setCurrency(e.target.value as 'usd' | 'euro')}>
                                <FormControlLabel value="usd" control={<Radio />} label="USD" />
                                <FormControlLabel value="euro" control={<Radio />} label="Euro" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Job Title */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="What is your Job Title?"
                            fullWidth
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Job Description */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Explain what are your skills and your services"
                            multiline
                            rows={4}
                            fullWidth
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Paid Meeting Buffer Time */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="How long usually should be between the time someone schedules a call with you and the call time?"
                            type="number"
                            fullWidth
                            value={paidMeetingBufferTime}
                            onChange={(e) => setPaidMeetingBufferTime(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Pro bono Meeting Buffer Time */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="How about the buffer time for free consultation service?"
                            type="number"
                            fullWidth
                            value={probonoMeetingBufferTime}
                            onChange={(e) => setProbonoMeetingBufferTime(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ width: '100%' }}>
                            <Button variant="outlined" color="secondary" disabled={loading}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>

            {/* Success and Error Messages */}
            {success && (
                <Alert
                    severity="success"
                    sx={{ mt: 2 }}
                    icon={<CheckCircle sx={{ fontSize: 24 }} color="success" />}
                    action={
                        <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => setSuccess(null)}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    }
                >
                    {success}
                </Alert>
            )}

            {error && (
                <Alert
                    severity="error"
                    sx={{ mt: 2 }}
                    icon={<Error sx={{ fontSize: 24 }} color="error" />}
                    action={
                        <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => setError(null)}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    }
                >
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default TabPersonal;
