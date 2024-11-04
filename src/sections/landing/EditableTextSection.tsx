'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditableTextSection = ({ initialText, variant }) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [hover, setHover] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setHover(false);
    // Save logic here, e.g., sending updated text to a server
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: 'relative', display: 'inline-block' }}
    >
      {isEditing ? (
        <TextField
          fullWidth
          multiline
          minRows={variant === "body1" ? 4 : 1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
        />
      ) : (
        <Typography variant={variant} sx={{ whiteSpace: 'pre-line' }}>
          {text}
        </Typography>
      )}
      {hover && !isEditing && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translateY(-100%)',
            marginBottom: '8px',
          }}
        >
          Edit
        </Button>
      )}
      {isEditing && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            onClick={handleSaveClick}
            color="primary"
            variant="contained"
            sx={{ backgroundColor: '#3f51b5', color: '#fff' }}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EditableTextSection;
