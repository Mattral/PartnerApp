"use client";
import React from 'react';
import Question from './Question';
import Editor from './Editor';
import { Box } from '@mui/material';
import Chatbot from './aiPop';
import { useState } from 'react';

const Page = () => {
  const [isFullView, setIsFullView] = useState(false);

  const handleViewToggle = () => {
    setIsFullView((prev) => !prev);
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Default to column for small screens
        height: '80vh', // Set 80vh viewport height
        '@media (min-width: 768px)': {
          flexDirection: isFullView ? 'column' : 'row', // For larger screens, use row layout unless full view
        },
      }}
    >
      {/* AiDocProcessor Section */}
      <Box
        sx={{
          position: 'relative', // No sticky for mobile
          height: isFullView ? '100%' : '75%', // Full height for full view, 75% for half view on small screens
          width: '100%', // Full width for small screens
          zIndex: 10, // Ensure it's above other content if needed
          overflowY: 'auto',
          '@media (min-width: 768px)': {
            position: isFullView ? 'relative' : 'sticky', // Make it sticky only on large screens for half view
            top: 0, // Stick to the top of the viewport
            height: '100%', // For larger screens, make it take full height
            width: isFullView ? '100%' : '47%', // Full width for full view, 45% for half view
            padding: '20px',
          },
        }}
      >
        <Question
          isFullView={isFullView}
          handleViewToggle={handleViewToggle}
        />
      </Box>

      {/* Editor Section */}
      <Box
        sx={{
          flexGrow: 1, // Ensure editor fills remaining space
          height: isFullView ? '0%' : '25%', // Hide height for full view, 25% for half view on small screens
          width: isFullView ? '0%' : '100%', // Hide width for full view, full width for half view on small screens
          overflow: isFullView ? 'hidden' : "auto", // Hide overflow when height/width is 0%
          transition: 'height 0.3s ease, width 0.3s ease', // Smooth transition
          '@media (min-width: 768px)': {
            height: isFullView ? '0%' : '100%', // Hide height for full view, full height for half view on large screens
            width: isFullView ? '0%' : '53%', // Hide width for full view, 55% for half view on large screens
            padding: isFullView ? '0px' : '20px', // Remove padding when hidden
          },
        }}
      >
        <Editor />
      </Box>

      {/* Chatbot Section */}
      <Box
        sx={{
          position: 'fixed', // Fix the chatbot to the screen
          bottom: 0, // Place it at the bottom of the screen
          right: 0, // Align it to the right of the screen
          zIndex: 9999, // Ensure it appears in front of everything else
          padding: '10px', // Add some padding to the chatbot container
          backgroundColor: 'white', // Optional: Give the chatbot a background to ensure visibility
        }}
      >
        <Chatbot />
      </Box>
    </Box>
  );
};

export default Page;
