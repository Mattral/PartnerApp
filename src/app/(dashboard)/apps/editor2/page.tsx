"use client";
import React from 'react';
import Question from './Question';
import Editor from './Editor';
import { Box } from '@mui/material';

const Page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Default to column for small screens
        height: '80vh',  // Set 80vh viewport height
        '@media (min-width: 768px)': {
          flexDirection: 'row', // For larger screens, use row layout
        },
      }}
    > 
      {/* Question Section */}
      <Box
        sx={{
          // For mobile screens, make it a normal element without sticky
          position: 'relative',  // No sticky for mobile
          height: '45%',  // For small screens, 45% of height
          width: '100%',  // Full width for small screens
          zIndex: 10,  // Ensure it's above other content if needed
          overflowY: 'auto',
          '@media (min-width: 768px)': {
            position: 'sticky',  // Make it sticky only on large screens
            top: 0,  // Stick to the top of the viewport
            height: '100%', // For larger screens, make it take full height
            width: '35%', // For large screens, 30% width
            padding: '20px',
          },
        }}
      >
        <Question />
      </Box>

      {/* Editor Section */}
      <Box
        sx={{
          flexGrow: 1,  // Ensure editor fills remaining space
          height: '55%',  // For small screens, 55% height
          width: '100%',  // Full width for small screens
          overflowY: 'auto',  // Make editor scrollable vertically if needed
          '@media (min-width: 768px)': {
            height: '100%', // For large screens, make it take full height
            width: '65%', // For large screens, 70% width
            padding: '20px',
          },
        }}
      >
        <Editor />
      </Box>
    </Box>
  );
};

export default Page;
