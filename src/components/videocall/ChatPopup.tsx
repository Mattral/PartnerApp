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
        {/* Chat message display */}
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
                {/* Profile circle */}
                <Avatar sx={{ bgcolor: msg.isUser ? "#6200ea" : "#ccc", marginRight: msg.isUser ? 0 : 2, marginLeft: msg.isUser ? 2 : 0 }}>
                  {msg.userName.charAt(0)}
                </Avatar>

                {/* Chat message bubble */}
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
                  {/* User name */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: msg.isUser ? "#6200ea" : "#000" }}>
                    {msg.userName}
                  </Typography>

                  {/* Chat text */}
                  <Typography variant="body2" sx={{ marginTop: '5px' }}>
                    {msg.text}
                  </Typography>

                  {/* Timestamp - moved below the text message */}
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', marginTop: '5px' }}>
                    {msg.timestamp}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center">No messages yet.</Typography>
          )}

          {/* Auto-scroll to bottom */}
          <div ref={messagesEndRef} />
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Chat message input */}
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

        {/* File upload button */}
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
