'use client';
import { useState } from 'react';
import { Grid, Stack, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Notification from './Notification';
import MultiFileUpload from './MultiFile'; 
import { styled } from '@mui/material/styles';
import { CustomFile } from 'types/dropzone';

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  marginTop: theme.spacing(3), // Add margin to the top
  overflow: 'hidden', // Ensure no overflow
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: theme.palette.text.primary,
  border: '1px solid #ddd',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
  padding: theme.spacing(2), // Increase padding for a more spacious feel
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  padding: theme.spacing(2),
  textAlign: 'center',
  '&:first-of-type': {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
  '&:last-of-type': {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  },
}));

const GlowingText = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: '24px',
  color: '#4CAF50',
  animation: 'glow 1.5s infinite alternate',
  '@keyframes glow': {
    '0%': { textShadow: '0 0 5px #4CAF50, 0 0 10px #4CAF50' },
    '100%': { textShadow: '0 0 20px #4CAF50, 0 0 30px #4CAF50' },
  },
}));

// Extend CustomFile to create DocumentType
interface DocumentType extends CustomFile {
  selectedDocument: string;
  points: number;
  type: string; // Include type if necessary
}

const RequestEmailServerActivationOTPForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // State to store selected documents and their points
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([]);

  const handleUpload = (data: DocumentType[]) => {
    setSelectedDocuments(data);
    setSnackbarMessage('Files uploaded successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', selectedDocuments);
    setFormData(prevData => ({
      ...prevData,
      selectedDocuments,
    }));
    handleNext();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={3} sx={{ marginTop: '20px' }}>
      {/* File Upload Section */}
      <Grid item xs={12}>
        <MultiFileUpload
          files={selectedDocuments}
          setFieldValue={(name, value) => setSelectedDocuments(value)}
          onUpload={handleUpload}
        />
      </Grid>

      {/* Current Points Display */}
      <Grid item xs={12}>
        <GlowingText>
          Current Points: {selectedDocuments.reduce((total, item) => total + (item.points || 0), 0)}
        </GlowingText>
      </Grid>

      {/* Table for Documents */}
      <Grid item xs={12}>
        <StyledTableContainer>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledHeaderCell>Document</StyledHeaderCell>
                  <StyledHeaderCell>Points</StyledHeaderCell>
                  <StyledHeaderCell>Type</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDocuments.map((doc, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>{doc.selectedDocument}</StyledTableCell>
                    <StyledTableCell>{doc.points}</StyledTableCell>
                    <StyledTableCell>{doc.type}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </StyledTableContainer>
      </Grid>

      {/* Navigation Buttons */}
      <Stack direction="row" spacing={2}>
        <Button onClick={handleBack} variant="outlined" color="secondary" sx={{ padding: '10px 20px', borderRadius: '8px' }}>
          Back
        </Button>
        <Button onClick={handleBack} variant="contained" color="primary" sx={{ padding: '10px 20px', borderRadius: '8px' }}>
          Submit
        </Button>
      </Stack>

      {/* Snackbar Notification */}
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default RequestEmailServerActivationOTPForm;
