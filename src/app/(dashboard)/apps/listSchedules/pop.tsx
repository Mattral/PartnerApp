import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { Person, Email, Description as DescriptionIcon } from '@mui/icons-material';

interface PopUpProps {
    appointment: {
        idCA: string;
        ca_title: string;
        ca_desc: string;
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
    };
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ appointment, onClose }) => {
    // Button is disabled for now, change the condition as needed
    const isJoinMeetingDisabled = true;  // Placeholder for disabled state

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { width: '60%' } }}>
            <DialogTitle sx={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                Appointment Details
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Profile Pic */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                    <img
                        src={appointment._advisors[0].pers_profilePic}
                        alt={`${appointment._advisors[0].pers_fName} ${appointment._advisors[0].pers_lName}`}
                        style={{ borderRadius: '50%', width: '150px', height: '150px' }}
                    />
                </Box>

                {/* Title */}
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', fontSize: '2.5rem' }}>
                    Title: {appointment.ca_title}
                </Typography>

                {/* Advisor Info */}
                <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
                        <Person sx={{ fontSize: '2rem', verticalAlign: 'middle', color: 'primary.main', marginRight: 2 }} />
                        {appointment._advisors[0].pers_fName} {appointment._advisors[0].pers_lName}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1.4rem' }}>
                        <Email sx={{ fontSize: '1.7rem', verticalAlign: 'middle', color: 'primary.main', marginRight: 1 }} />
                        {appointment._advisors[0].email}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1.4rem' }}>
                        <strong>Advisor Domain:</strong> {appointment.ed_name}
                    </Typography>
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
                            maxWidth: '700px', // Limit the width for better readability
                            textAlign: 'center', // Center text
                            lineHeight: '1.5',
                        }}
                    >
                        {appointment.ca_desc}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center' }}>
                {/* Close Button */}
                <Button onClick={onClose} color="primary" variant="contained" sx={{ fontSize: '1.4rem', padding: '5px 10px' }}>
                    Close
                </Button>

                {/* Join Meeting Button (Disabled by default) */}
                <Button
                    disabled={isJoinMeetingDisabled}
                    sx={{
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        marginLeft: 2,
                        backgroundColor: isJoinMeetingDisabled ? 'secondary.main' : 'primary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: isJoinMeetingDisabled ? 'secondary.dark' : 'primary.dark',
                        },
                        padding: '5px 10px',
                    }}
                >
                    Join Meeting
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopUp;

/*
import PopUp from './pop';  // Import the pop-up component

            {selectedAppointment && (
                <PopUp appointment={selectedAppointment} onClose={handleClosePopUp} />
            )}

 */