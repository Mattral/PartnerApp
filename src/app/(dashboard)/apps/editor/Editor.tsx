"use client";
import React, { useState, useEffect, useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Box, Typography, Button, Snackbar, ToggleButtonGroup, ToggleButton } from "@mui/material";
import GeneratePopup from "./GeneratePopup";

const Editor = () => {
  const [content, setContent] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mode, setMode] = useState<"editor" | "preview">("preview");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load content from localStorage when the component mounts
  const loadContentFromLocalStorage = () => {
    const savedContent = localStorage.getItem('extractedHtml');
    if (savedContent) {
      setContent(savedContent);
    }
  };

  // Update the content when the localStorage changes
  useEffect(() => {
    loadContentFromLocalStorage();

    const handleStorageChange = () => {
      loadContentFromLocalStorage();
      const currentTime = new Date().toLocaleTimeString();
      setNotification(`Content Updated @ ${currentTime}`);
    };

    const intervalId = setInterval(() => {
      const savedContent = localStorage.getItem('extractedHtml');
      if (savedContent !== content) {
        handleStorageChange();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [content]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    loadContentFromLocalStorage();
    const currentTime = new Date().toLocaleTimeString();
    setNotification(`Content Updated @ ${currentTime}`);
  };

  const handleGenerate = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmPopup = (fileName: string) => {
    console.log("File name:", fileName);
    setIsPopupOpen(false);
  };

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: "editor" | "preview"
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <div>
      {notification && (
        <Box sx={{ backgroundColor: '#4caf50', color: 'white', padding: '8px', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="body1">{notification}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {mode === "editor" ? "Editor" : "Preview"}
        </Typography>

        <Button
          onClick={handleGenerate}
          variant="text"
          color="primary"
          sx={{ mx: 'auto', margin: '0 8px' }}
        >
          Generate Document
        </Button>

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="view mode"
          sx={{ marginRight: '8px' }}
        >
          <ToggleButton value="editor" aria-label="editor mode">
            Editor Mode
          </ToggleButton>
          <ToggleButton value="preview" aria-label="preview mode">
            Preview Mode
          </ToggleButton>
        </ToggleButtonGroup>


      </Box>

      <GeneratePopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleConfirmPopup}
      />

      {mode === "editor" ? (
        <SunEditor
          placeholder={"Write here..."}
          setContents={content}
          onChange={handleChange}
          setOptions={{
            minHeight: "480px",
            height: 'auto',
            buttonList: [
              ["undo", "redo", "font", "fontSize", "fullScreen"],
              ["bold", "underline", "italic", "strike", "subscript", "superscript"],
              ["fontColor", "hiliteColor", "paragraphStyle", "textStyle", "imageGallery"],
              ["align", "list", "lineHeight", "indent", "outdent"],
              ["table", "horizontalRule", "link", "image", "audio", "video"],
              ["removeFormat", "save", "preview", "print", "codeView"],
              ["dir", "dir_ltr", "dir_rtl"],
            ],
          }}
        />
      ) : (
        <Box
          sx={{
            border: '1px solid #eee',
            borderRadius: '4px',
            height: '480px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={content}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="HTML Preview"
          />
        </Box>
      )}
    </div>
  );
};

export default Editor;

/*
"use client";
import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import { Box, Typography, Button, Snackbar } from "@mui/material"; // Import Box, Typography, and Snackbar from MUI for styling
import GeneratePopup from "./GeneratePopup"; // Import the new popup component

const Editor = () => {
  const [content, setContent] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage the popup visibility

  // Load content from localStorage when the component mounts
  const loadContentFromLocalStorage = () => {
    const savedContent = localStorage.getItem('extractedHtml');
    if (savedContent) {
      setContent(savedContent); // Set content if available in localStorage
    }
  };

  // Update the content when the localStorage changes
  useEffect(() => {
    // Load content when the component mounts
    loadContentFromLocalStorage();

    // Add event listener for localStorage changes in the same window
    const handleStorageChange = () => {
      loadContentFromLocalStorage(); // Update content if localStorage is modified
      const currentTime = new Date().toLocaleTimeString();
      setNotification(`Content Updated @ ${currentTime}`);
    };

    // Listen for changes to the localStorage key 'extractedHtml'
    const intervalId = setInterval(() => {
      const savedContent = localStorage.getItem('extractedHtml');
      if (savedContent !== content) {
        handleStorageChange();
      }
    }, 1000); // Check every second for changes

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, [content]); // Add content dependency to recheck for changes

  const handleChange = (newContent: string) => {
    setContent(newContent);
    //localStorage.setItem('extractedHtml', newContent); // Save the updated content to localStorage
  };

  const handleSave = () => {
    loadContentFromLocalStorage();
    const currentTime = new Date().toLocaleTimeString();
    setNotification(`Content Updated @ ${currentTime}`);
  };

  const handleGenerate = () => {
    setIsPopupOpen(true); // Open the popup when the "Generate Document" button is clicked
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleConfirmPopup = (fileName: string) => {
    console.log("File name:", fileName); // You can pass the fileName to the API or save it here
    setIsPopupOpen(false); // Close the popup after confirmation
  };

  return (
    <div>
      {/* Notification Box }
      {notification && (
        <Box sx={{ backgroundColor: '#4caf50', color: 'white', padding: '8px', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="body1">{notification}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
        {/* "Preview" Header }
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Preview
        </Typography>

        {/* "Generate Document" Button - Center aligned }
        <Button
          onClick={handleGenerate}
          variant="contained"
          color="secondary"
          sx={{ mx: 'auto', margin: '0 8px' }} // "mx: 'auto'" centers the button
        >
          Generate Document
        </Button>

        {/* "Load / Reload" Button }
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Load / Reload
        </Button>
      </Box>
      
      {/* GeneratePopup - The modal to enter file name }
      <GeneratePopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleConfirmPopup}
      />


      {/* SunEditor }
      <SunEditor
        placeholder={"Write here..."}  // Updated placeholder text
        setContents={content}
        onChange={handleChange}
        setOptions={{
          minHeight: "480px", // Set height
          height: 'auto',
          buttonList: [
            ["undo", "redo", "font", "fontSize", "fullScreen"], // Undo, redo, font, font size
            ["bold", "underline", "italic", "strike", "subscript", "superscript"], // Text styles
            ["fontColor", "hiliteColor", "paragraphStyle", "textStyle", "imageGallery"], // Text color and highlight
            ["align", "list", "lineHeight", "indent", "outdent"], // Alignment, list, indent
            ["table", "horizontalRule", "link", "image", "audio", "video"], // Table, horizontal rule, link, image
            ["removeFormat", "save", "preview", "print", "codeView"], // Remove format
            ["dir", "dir_ltr", "dir_rtl"],
          ],
        }}
      />
    </div>
  );
};

export default Editor;
*/

