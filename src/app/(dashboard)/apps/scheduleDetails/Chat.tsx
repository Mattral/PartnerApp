import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, List, Avatar, Divider, Card, CardContent, IconButton } from '@mui/material';
import { Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import axios from 'axios';
import FormData from 'form-data';
import JoinCall from './join'; // Importing the Join component

// Define the structure of the message data
interface Message {
    idMsg: number;
    msg_code: string;
    msg_content: string;
    msg_senderType: string;
    msg_createdAt: string;
    msg_updatedAt: string;
    consulting__pers_fName: string;
    consulting__pers_lName: string;
    _files: Array<{
        idF: number;
        f_code: string;
        f_path: string;
        f_category: string;
        f_name: string;
    }>;
}

interface ChatProps {
    conv_code: string; // Accepting conv_code as a prop, use this for api parameter instead of hardcoded value
    ca_code: string;   // Accepting ca_code as a prop, use this for api parameter instead of hardcoded value
    ca_requestedFor: string;
}

const Chat: React.FC<ChatProps> = ({ conv_code, ca_code, ca_requestedFor }) => {
    const [messages, setMessages] = useState<Message[]>([]); // To store fetched messages
    const [newMessage, setNewMessage] = useState(''); // Message input state
    const [files, setFiles] = useState<File[]>([]); // To store selected files
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    // Function to retrieve the authorization token from localStorage
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

    // Function to fetch messages from the API
    const fetchMessages = async () => {
        const token = getAuthToken(); // Retrieve token from localStorage

        if (!token) {
            setError('Authorization token is missing.');
            setLoading(false);
            return;
        }
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

        const url = `${baseUrl}/api/back-office/partner/consulting-messages`; // Your API endpoint
        const headers = {
            Authorization: `Bearer ${token}`, // Use the token from localStorage
            'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
            'FRONTEND-KEY': 'XXX',
            'X-Requested-With': 'XMLHttpRequest',
        };

        const params = new URLSearchParams({
            ca_code: ca_code, // Use prop `ca_code` for filtering
            ct_code: "", // Optional, leave blank for no filters
            msg_isReplyFor: "",
            ui_code: "",
            pers_code: "",
            gai_code: "",
            msg_content: "",
            sentOnDate: "",
            sentAtTheLatest: "",
            sentAtTheEarliest: ""
        });

        try {
            const response = await fetch(`${url}?${params.toString()}`, { method: 'POST', headers });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            setMessages(data.data.primaryData._messages.data); // Assuming response structure
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch messages initially and set up refresh interval
    useEffect(() => {
        fetchMessages(); // Fetch messages initially
        const intervalId = setInterval(fetchMessages, 5000); // Refresh every 5 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    // Function to handle sending a message with optional files
    const handleSendMessage = async () => {
        if (!newMessage.trim() && files.length === 0) return; // Do not send if there's no message or files

        const formData = new FormData();
        formData.append('conv_code', conv_code); // Using prop `conv_code`
        formData.append('msg_content', newMessage); // Add the message content
        formData.append('msg_isReplyFor', '');
        formData.append('ct_code', '');

        // Add selected files to form data
        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        const token = getAuthToken(); // Retrieve token from localStorage
        if (!token) {
            setError('Authorization token is missing.');
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`, // Use the token from localStorage
            'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
            'FRONTEND-KEY': 'XXX',
            'X-Requested-With': 'XMLHttpRequest',
        };

        try {
            setLoading(true);
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

            const response = await axios.post(
                `${baseUrl}/api/back-office/partner/consulting-messages/create`,
                formData,
                { headers }
            );
            console.log('Message sent:', response.data);
            fetchMessages(); // Refetch messages after sending
            setNewMessage(''); // Clear input
            setFiles([]); // Reset selected files
        } catch (error) {
            setError('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files)); // Set selected files to state
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error} 
        <JoinCall ca_code={ca_code} ca_requestedFor={ca_requestedFor} />
        </div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 4 }}>
            <Paper sx={{ flex: 1, overflowY: 'auto', padding: 3, maxHeight: '800px', borderRadius: '12px', boxShadow: 6 }}>
                {/* Chat Messages */}
                <List sx={{ padding: 0 }}>
                    {/* Use flex-direction: column-reverse to show new messages at the bottom */}
                    <Box sx={{ display: 'flex', flexDirection: 'column-reverse', padding: 0 }}>
                        {messages.map((message) => (
                            <Box
                                key={message.idMsg}
                                sx={{
                                    marginBottom: 2,
                                    display: 'flex',
                                    flexDirection: message.msg_senderType === 'consulting-client' ? 'row-reverse' : 'row',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        marginRight: 2,
                                        backgroundColor: message.msg_senderType === 'consulting-client' ? 'secondary.main' : 'primary.main',
                                    }}
                                >
                                    {message.msg_senderType === 'consulting-client' ? 'C' : 'A'}
                                </Avatar>
                                <Card sx={{ maxWidth: '80%', borderRadius: '12px', padding: 2, boxShadow: 3 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 'bold', marginBottom: 1, textAlign: 'center' }}
                                    >
                                        {message.consulting__pers_fName} {message.consulting__pers_lName} ({message.msg_senderType})
                                    </Typography>

                                    <CardContent
                                        sx={{
                                            backgroundColor: message.msg_senderType === 'consulting-client' ? '#e1f5fe' : '#f1f1f1',
                                            padding: 2,
                                            textAlign: 'left',
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                            {message.msg_content}
                                        </Typography>

                                        {/* Display attached files if any */}
                                        {message._files && message._files.length > 0 && (
                                            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                {message._files.map((file) => (
                                                    <Box key={file.idF} sx={{ marginBottom: 1 }}>
                                                        <IconButton
                                                            component="a"
                                                            href={file.f_path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title={`Open ${file.f_name}`}
                                                        >
                                                            <AttachFileIcon />
                                                        </IconButton>
                                                        <Typography variant="body2" component="span" sx={{ marginLeft: 1 }}>
                                                            {file.f_name} ({file.f_category})
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </CardContent>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textAlign: 'right',
                                            fontStyle: 'italic',
                                            fontSize: '0.9rem',
                                            color: '#757575',
                                            marginTop: 1,
                                        }}
                                    >
                                        {message.msg_createdAt}
                                    </Typography>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </List>

                <Divider sx={{ marginY: 3 }} />
            </Paper>

            {/* Message Input Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 3 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{
                        marginRight: 2,
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' },
                    }}
                />

                {/* Attach File Icon */}
                <IconButton
                    color="primary"
                    component="label"
                    sx={{
                        padding: '8px',
                        borderRadius: '12px',
                    }}
                >
                    <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />
                    <AttachFileIcon />
                </IconButton>

                {/* Send Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{
                        padding: '10px 16px',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <SendIcon />
                </Button>
            </Box>

            {/* Conversation and Appointment Codes in a Card */}
            <Card sx={{ marginTop: 3, padding: 3, textAlign: 'center', boxShadow: 3, borderRadius: '12px' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        fontSize: '1.25rem', // Larger font size
                        marginBottom: 1, // Add space between the two codes
                    }}
                >
                    Conversation Code: <span style={{ fontWeight: 'normal', color: '#555' }}>{conv_code}</span>
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        fontSize: '1.25rem', // Keep consistent size
                        marginTop: 1, // Ensure there's space between the two codes
                    }}
                >
                    Appointment Code: <span style={{ fontWeight: 'normal', color: '#555' }}>{ca_code}</span>
                </Typography>
            </Card>
            <JoinCall ca_code={ca_code} ca_requestedFor={ca_requestedFor} />

        </Box>
    );
};

export default Chat;
