"use client";
import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import { Box, Typography, Button, Snackbar } from "@mui/material"; // Import Box, Typography, and Snackbar from MUI for styling

const Editor = () => {
  const [content, setContent] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

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

  return (
    <div>
      {/* Notification Box */}
      {notification && (
        <Box sx={{ backgroundColor: '#4caf50', color: 'white', padding: '8px', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="body1">{notification}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Preview</Typography>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Load / Reload
        </Button>
      </Box>

      {/* SunEditor */}
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


/*
"use client";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import { Box, Typography } from '@mui/material'; // Import Box and Typography from MUI for styling

const Editor = () => {
  const [content, setContent] = useState<string>("");

  // Load content from localStorage
  const loadContentFromLocalStorage = () => {
    const savedContent = localStorage.getItem('extractedHtml');
    if (savedContent) {
      setContent(savedContent); // Set content if available in localStorage
    } else {
      setContent(""); // Set empty content if no data is found
    }
  };

  // Handle changes in localStorage (from other tabs/windows)
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'extractedHtml') {
      loadContentFromLocalStorage(); // Update content if localStorage is modified
    }
  };

  // Handle changes within the same tab
  const handleLocalStorageChange = () => {
    loadContentFromLocalStorage();
  };

  useEffect(() => {
    // Load content when the component mounts
    loadContentFromLocalStorage();

    // Add event listener for localStorage changes in other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Add event listener for localStorage changes within the same tab
    window.addEventListener('localStorageChange', handleLocalStorageChange);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleLocalStorageChange);
    };
  }, []);

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    // Save content to localStorage
    localStorage.setItem('extractedHtml', content);

    // Trigger a custom event to notify other components in the same tab
    window.dispatchEvent(new Event('localStorageChange'));
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Preview</Typography>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Refresh
        </Button>
      </Box>

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
