import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, List, Avatar, Divider, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import axios from 'axios';
import FormData from 'form-data';

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
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ conv_code, ca_code, onClose }) => {
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
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // `${baseUrl}/`

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
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // `${baseUrl}/`

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
    return <div>Error: {error}</div>;
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "16px", boxShadow: 24 } }}>

      <DialogContent sx={{ flex: 1, overflowY: 'auto', padding: 3, maxHeight: '800px', borderRadius: '12px', boxShadow: 6 }}>
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
      </DialogContent>

      {/* Message Input Section */}
      <DialogActions sx={{ display: 'flex', alignItems: 'center', paddingTop: 3 }}>
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
        <Button onClick={onClose} color="primary" sx={{ padding: '6px 16px', borderRadius: '12px' }}>
          Close
        </Button>
      </DialogActions>



    </Dialog>
  );
};

export default Chat;

/*

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import dayjs from "dayjs"; // For time formatting

interface ChatMessage {
  text: string;
  isUser: boolean;
  userName: string;
  timestamp: string;
}

interface ChatPopupProps {
  onClose: () => void;
  userName: string;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ onClose, userName }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Reference to the bottom of the chat box

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: ChatMessage = {
        text: message,
        isUser: true,
        userName: userName,
        timestamp: dayjs().format("HH:mm A"),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleFileSend = () => {
    if (file) {
      console.log("File sent:", file.name);
      setFile(null); // Reset file after sending
    }
  };

  // Auto scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate incoming messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const incomingMessage: ChatMessage = {
        text: "Hi there!",
        isUser: false,
        userName: "ChatBot",
        timestamp: dayjs().format("HH:mm A"),
      };
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }, 5000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "16px", boxShadow: 24 } }}>
      <DialogTitle sx={{ backgroundColor: "#6200ea", color: "#fff", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", textAlign: 'center', fontSize: '1.5rem' }}>
        Chat
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
       
        <Box
          sx={{
            height: '400px', // Increased height
            overflowY: 'scroll',
            mb: 2,
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f9f9f9',
            borderColor: '#e0e0e0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 1,
                  flexDirection: msg.isUser ? 'row-reverse' : 'row',
                }}
              >
            
                <Avatar sx={{ bgcolor: msg.isUser ? "#6200ea" : "#ccc", marginRight: msg.isUser ? 0 : 2, marginLeft: msg.isUser ? 2 : 0 }}>
                  {msg.userName.charAt(0)}
                </Avatar>

                <Box
                  sx={{
                    backgroundColor: msg.isUser ? '#e3f2fd' : '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    boxShadow: 1,
                    maxWidth: '80%',
                    textAlign: msg.isUser ? 'right' : 'left',
                  }}
                >
                
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: msg.isUser ? "#6200ea" : "#000" }}>
                    {msg.userName}
                  </Typography>

                 
                  <Typography variant="body2" sx={{ marginTop: '5px' }}>
                    {msg.text}
                  </Typography>

                  
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', marginTop: '5px' }}>
                    {msg.timestamp}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center">No messages yet.</Typography>
          )}

        
          <div ref={messagesEndRef} />
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

       
        <TextField
          autoFocus
          margin="dense"
          label="Type your message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#6200ea',
              },
              '&:hover fieldset': {
                borderColor: '#3700b3',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#03dac6',
              },
            },
          }}
        />

       
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <input
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" aria-label="upload file" component="span">
              <AttachFile />
            </IconButton>
          </label>
          {file && <Typography variant="body2" sx={{ marginLeft: 1 }}>{file.name}</Typography>}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleSendMessage}
          color="primary"
          variant="contained"
          endIcon={<Send />}
          sx={{ borderRadius: '20px', padding: '10px 20px' }}
        >
          Send Message
        </Button>
        {file && (
          <Button
            onClick={handleFileSend}
            color="secondary"
            variant="contained"
            sx={{ borderRadius: '20px', padding: '10px 20px' }}
          >
            Send File
          </Button>
        )}
        <Button onClick={onClose} color="inherit" variant="outlined" sx={{ borderRadius: '20px', padding: '10px 20px' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatPopup;

*/