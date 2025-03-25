import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Box } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material"; // Import MUI icons
import axios from "axios";

interface GeneratePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (fileName: string) => void;
}

const GeneratePopup: React.FC<GeneratePopupProps> = ({ open, onClose, onConfirm }) => {
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

    // Get the authorization token from localStorage
    const authorizationToken = localStorage.getItem('authData')
    ? JSON.parse(localStorage.getItem('authData')!).data?.primaryData?.authorization
    : null;

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleConfirm = async () => {
    if (fileName) {
      // Retrieve the saved content from localStorage
      const savedContent = localStorage.getItem('extractedHtml');
      
      if (!savedContent) {
        setErrorMessage("No content available to generate the document.");
        return;
      }
  
      // Construct the payload for the API request
      const payload = {
        f_title: fileName,  // The title (file name entered by the user in the popup)
        document: savedContent,  // The HTML content from localStorage
      };
  
      // Prepare the URL with dynamic dm_code and doc_code (you'll need to pass these from your context or UI)
      const dm_code = "XX";  // Example dm_code
      const doc_code = "YY";  // Example doc_code
      const url = `https://lawonearth.co.nz/api/back-office/partner/documents/generate/${dm_code}/${doc_code}`;
  
      // Define the headers required for the request
      const headers = {
        Authorization: `${authorizationToken}`,  // Replace with your actual Bearer token
        'COMPANY-CODE': 'MC-9E234746-3738-4E49-A7FA-27E3998A68E9',
        'FRONTEND-KEY': 'XXX',  // Replace with your actual frontend key
        'X-Requested-With': 'XMLHttpRequest',
      };
  
      try {
        // Make the API call using axios
        const response = await axios.post(url, payload, { headers });
  
        // Handle the response
        if (response.data.status === "treatmentSuccess" && response.data.data.primaryData.docxDownloadLink) {
          const downloadLink = response.data.data.primaryData.docxDownloadLink;
  
          // Trigger the download by creating an anchor element and simulating a click
          const link = document.createElement("a");
          link.href = downloadLink;
          link.download = `${fileName}.docx`;  // Name the file based on the input file name
          link.click();
        } else {
          setErrorMessage("Failed to generate document. Please try again.");
        }
    } catch (error: any) {
        // Check if the error response contains an authentication error
        if (error.response && error.response.data && error.response.data.status === "AuthenticationException") {
          setErrorMessage(error.response.data.data.primaryData.msg);  // Show the specific error message from the API
        } else {
          // Show a generic error message if it's not the expected authentication error
          console.error("Error generating document:", error);
          setErrorMessage("There was an error generating the document. Please try again.");
        }
      }
  
      // Close the modal after confirming
      onConfirm(fileName);
      onClose();
    } else {
      setErrorMessage("Please enter a file name.");
    }
  };

  const handleCancel = () => {
    setErrorMessage("");
    onClose(); // Simply close the modal on cancel
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel} 
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "500px", // Make the popup wider
          maxWidth: "600px", // Make it larger for a more spacious feel
          borderRadius: "20px", // Rounded corners
          backgroundColor: "#ffffff", // Solid white background for clarity
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
        }
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}>
        Please enter the file name
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="File Name"
          fullWidth
          variant="outlined"
          value={fileName}
          onChange={handleFileNameChange}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "12px",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
              "&:hover, &:focus": {
                boxShadow: "0px 0px 15px 4px rgba(0, 255, 255, 0.8)", // Glow effect on hover/focus
                transform: "scale(1.02)", // Slight zoom-in effect
              },
              "&:active": {
                boxShadow: "0px 0px 25px 6px rgba(0, 255, 255, 0.6)", // Stronger glow while writing
              },
            },
            marginBottom: "16px",
          }}
        />
        
        {/* Conditional Error Message */}
        {errorMessage && (
          <Box sx={{ marginTop: "16px", color: "red", fontSize: "0.875rem", textAlign: "center" }}>
            <Typography>{errorMessage}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: "24px", justifyContent: "center" }}>
        {/* Cancel and Confirm Buttons Container */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "16px" }}>
          {/* Cancel Button with Icon and Text */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", justifyContent: "center" }}>
            <IconButton
              onClick={handleCancel}
              color="secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)", transform: "scale(1.1)" },
              }}
            >
              <Cancel sx={{ fontSize: "28px" }} />
              <Typography variant="button" sx={{ color: "secondary.main", fontSize: "1rem" }}>
                Cancel
              </Typography>
            </IconButton>
          </Box>

          {/* Confirm Button with Icon and Text */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", justifyContent: "center" }}>
            <IconButton
              onClick={handleConfirm}
              color="primary"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                "&:hover": { backgroundColor: "rgba(0, 255, 0, 0.1)", transform: "scale(1.1)" },
                "&:focus": { boxShadow: "0px 0px 12px 4px rgba(0, 255, 0, 0.6)" }, // Glow effect on focus
              }}
            >
              <CheckCircle sx={{ fontSize: "28px" }} />
              <Typography variant="button" sx={{ color: "primary.main", fontSize: "1rem" }}>
                Confirm
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GeneratePopup;
