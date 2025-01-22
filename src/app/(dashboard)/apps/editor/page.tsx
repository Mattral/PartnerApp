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
        height: '80vh',  // Set full viewport height
        '@media (min-width: 768px)': {
          flexDirection: 'row', // For larger screens, use row layout
        },
      }}
    >
      {/* Question Section */}
      <Box
        sx={{
          position: 'sticky',  // Make the question sticky
          top: 0,  // Stick to the top of the viewport
          height: '30%',  // For small screens
          zIndex: 10,  // Ensure it's above other content if needed
          '@media (min-width: 768px)': {
            height: '100%', // For larger screens, make it take full height
            width: '30%', // For larger screens, make it 30% of the width
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
          height: '70%',  // For small screens
          overflowY: 'auto',  // Make editor scrollable vertically if needed
          '@media (min-width: 768px)': {
            height: '100%', // For larger screens, make it take 70% of the height
            width: '70%', // For large screens, make it 70% of the width
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
