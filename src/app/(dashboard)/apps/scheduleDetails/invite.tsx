import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Card, CardContent, Divider } from '@mui/material';
import { Cancel as CancelIcon, Send as SendIcon, Mail as MailIcon, GroupAdd as GroupAddIcon } from '@mui/icons-material'; // MUI icons
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InviteProps {
    ca_code: string; // The conversation code passed as a prop
}

const Invite: React.FC<InviteProps> = ({ ca_code }) => {
    // State for managing form input, loading state, and invitee list
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [invitees, setInvitees] = useState<any[]>([]);

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

    // API constants
    const COMPANY_CODE = 'MC-H3HBRZU6ZK5744S';  // The company code of the partner
    const FRONTEND_KEY = 'XXX';  // Replace with your frontend key

    // Handle API call to send invite
    const handleSendInvite = async () => {
        if (!email) {
            toast.error('Please provide an email address');
            return;
        }

        setLoading(true);

        const token = getAuthToken(); // Retrieve token from localStorage

        if (!token) {
            toast.error('Authorization token is missing.');
            setLoading(false);
            return;
        }

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';  // `${baseUrl}/`

            const response = await axios.post(
                `${baseUrl}/api/back-office/partner/call-invites/create`,
                {
                    ca_code: ca_code,
                    gai_email: email,
                    redirectUrl: 'https://lawonearth.org/', // Redirect URL after invitation
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use the token from localStorage
                        'COMPANY-CODE': COMPANY_CODE,
                        'FRONTEND-KEY': FRONTEND_KEY,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                }
            );

            if (response.data.status === 'treatmentSuccess') {
                toast.success('Invitation sent successfully');
                setEmail(''); // Clear the email input
                fetchInvitees(); // Fetch updated list of invitees
            } else {
                toast.error('Failed to send the invitation');
            }
        } catch (error: any) {
            // Handle error and display appropriate message
            if (error.response && error.response.data) {
                const apiError = error.response.data;
                if (apiError.status === 'authenticationError') {
                    toast.error(apiError.data.primaryData.msg); // Show authentication error
                } else {
                    toast.error('An unknown error occurred. Please try again later.');
                }
            } else {
                toast.error('Network error. Please check your internet connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle opening/closing the confirmation dialog
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDialog = () => {
        handleSendInvite();
        handleCloseDialog();
    };

    // Fetch the list of invitees
    const fetchInvitees = async () => {
        const token = getAuthToken(); // Retrieve token from localStorage

        if (!token) {
            toast.error('Authorization token is missing.');
            return;
        }

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';  // `${baseUrl}/`

            const response = await axios.get(
                `${baseUrl}/api/back-office/partner/call-invites/${ca_code}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use the token from localStorage
                        'COMPANY-CODE': COMPANY_CODE,
                        'FRONTEND-KEY': FRONTEND_KEY,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    params: {
                        PaginateResults: '1',
                        MaxResultsPerPage: '12',
                    },
                }
            );

            if (response.data.status === 'treatmentSuccess') {
                setInvitees(response.data.data.primaryData._guestAttendeeInvites.data);
            } else {
                toast.error('Failed to fetch invitees');
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const apiError = error.response.data;
                if (apiError.status === 'authenticationError') {
                    toast.error(apiError.data.primaryData.msg);
                } else {
                    toast.error('An unknown error occurred. Please try again later.');
                }
            } else {
                toast.error('Network error. Please check your internet connection.');
            }
        }
    };

    // Fetch the invitees on component mount
    useEffect(() => {
        fetchInvitees();
    }, [ca_code]);

    // Function to render the status with color
    const getStatusChipColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'primary';
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Card sx={{ boxShadow: 6, borderRadius: '12px', padding: 3, width: '100%', maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GroupAddIcon sx={{ fontSize: '2rem', verticalAlign: 'middle', color: 'primary.main', marginRight: 1 }} />
                        Send an invite to the your team <br/> or anyone to join the conversation.
                    </Typography>

                    {/* TextField and Button on the same line */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                        <TextField
                            label="Invitee Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ marginRight: 2 }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpenDialog}
                            disabled={loading}
                            startIcon={<SendIcon />}
                        >
                            Send Invite
                        </Button>
                    </Box>

                    {/* Confirmation Dialog */}
                    <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ borderRadius: '12px' }}>
                        <DialogTitle sx={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                            Are you sure?
                        </DialogTitle>
                        <DialogContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'center', marginBottom: 2 }}>
                                You are about to send an invite to 
                                <br/><strong>{email}</strong>. Do you want to proceed?
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    onClick={handleCloseDialog}
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        width: '120px',
                                        textTransform: 'none',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <CancelIcon sx={{ fontSize: 18 }} />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmDialog}
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: '120px',
                                        textTransform: 'none',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <SendIcon sx={{ fontSize: 18 }} />
                                    Confirm
                                </Button>
                            </Box>
                        </DialogActions>
                    </Dialog>


                    {/* Display the list of invitees */}
                    <Typography variant="h4" sx={{ marginTop: 3, textAlign: 'center', marginBottom: 2 }}>
                        List of Invitees
                    </Typography>
                    {invitees.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {invitees.map((invitee) => (
                                <Card key={invitee.idGAI} sx={{ display: 'flex', alignItems: 'center', padding: 2, boxShadow: 3, borderRadius: '8px' }}>
                                    <MailIcon sx={{ fontSize: '2rem', verticalAlign: 'middle', color: 'primary.main', marginRight: 1 }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1">{invitee.gai_email}</Typography>
                                    </Box>
                                    <Chip
                                        label={invitee.gai_status.charAt(0).toUpperCase() + invitee.gai_status.slice(1)}
                                        color={getStatusChipColor(invitee.gai_status)}
                                    />
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Typography align="center">No invitees found.</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

// Wrap the component with ToastContainer
const WrappedInvite: React.FC<InviteProps> = (props) => (
    <>
        <Invite {...props} />
        <ToastContainer />
    </>
);

export default WrappedInvite;
