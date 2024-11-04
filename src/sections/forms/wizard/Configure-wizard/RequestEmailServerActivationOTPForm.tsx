'use client';
import { useState } from 'react';
import { Grid, Stack, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import Notification from './Notification';
import MultiFileUpload from './MultiFile';
import { styled } from '@mui/material/styles';
import { CustomFile, DocumentCategory } from 'types/dropzone';

// Define types
interface DocumentType extends CustomFile {
  selectedDocument: string;
  points: number;
  category: DocumentCategory | undefined;
}

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
  marginTop: theme.spacing(4),
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #F8F9FB, #E3E8ED)', // Soft gradient for a gentle feel
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: '#333',
  fontWeight: '500',
  padding: theme.spacing(2),
  border: '1px solid #D0D4DA',
  textAlign: 'center',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: '#F1F3F6',
    transform: 'scale(1.02)',
    color: '#4A90E2', // Gentle hover color
  },
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#B0BEC5',
  color: '#FFF',
  fontWeight: 'bold',
  padding: theme.spacing(2),
  textAlign: 'center',
  '&:first-of-type': {
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
  },
  '&:last-of-type': {
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
  },
}));

const GlowingText = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#5C6BC0',
  animation: 'glow 1.8s infinite alternate',
  '@keyframes glow': {
    '0%': { textShadow: '0 0 5px #5C6BC0, 0 0 10px #5C6BC0' },
    '100%': { textShadow: '0 0 15px #5C6BC0, 0 0 25px #5C6BC0' },
  },
}));

// Main Component
const RequestEmailServerActivationOTPForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false); // Pop-up dialog state
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([]);

  const handleUpload = (data: DocumentType[]) => {
    setSelectedDocuments(data);
    setSnackbarMessage('Files uploaded successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleSubmit = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      selectedDocuments,
    }));
    setOpenDialog(true); // Show dialog on submit
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Grid container spacing={3} sx={{ marginTop: '30px' }}>
      {/* File Upload Section */}
      <Grid item xs={12}>
        <MultiFileUpload
          files={selectedDocuments}
          setFieldValue={(name: string, value: DocumentType[]) => setSelectedDocuments(value)}
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
                  <StyledHeaderCell>Category</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDocuments.map((doc, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>{doc.selectedDocument}</StyledTableCell>
                    <StyledTableCell>{doc.points}</StyledTableCell>
                    <StyledTableCell>{doc.category}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </StyledTableContainer>
      </Grid>

      {/* Navigation Buttons */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, padding: 2 }}>
        <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{
              borderRadius: 20,
              fontWeight: 'bold',
              color: '#FFF',
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#388E3C',
                boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
              },
            }}
          >
            Submit
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleBack}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 20,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            Next
          </Button>
        </Stack>
      </Grid>

      {/* Snackbar Notification */}
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />

      {/* Dialog for Submit Confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            Submission Confirmed!
          </Typography>
          <Typography variant="body1" textAlign="center">
            Your documents have been successfully submitted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RequestEmailServerActivationOTPForm;
