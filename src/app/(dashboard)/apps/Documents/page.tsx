"use client";
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, Divider, Modal, IconButton } from '@mui/material';
import DiscoverModal from './Discover'; // Import DiscoverModal component
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import { useClickAway } from 'react-use'; // Import hook to close modal when clicked outside

const Page: React.FC = () => {
  const [selectedDocs, setSelectedDocs] = useState<any[]>([]); // Selected documents state
  const [isDiscoverOpen, setIsDiscoverOpen] = useState<boolean>(false); // Modal state for Discover
  const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false); // Modal state for Rename
  const [newName, setNewName] = useState<string>(''); // State for new document name
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null); // State for the document being renamed

  // Load selected documents from local storage
  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('selectedDocs') || '[]');
    setSelectedDocs(storedDocs);
  }, []);

  // Handle the document selection and renaming
  const handleSelectDocument = (doc: any) => {
    setSelectedDoc(doc); // Set the selected document
    setIsRenameOpen(true); // Open the rename modal when selecting a document
  };

  const handleRenameConfirm = () => {
    if (selectedDoc && newName) {
      const renamedDoc = { ...selectedDoc, name: newName };

      // Update local storage with the renamed document
      const updatedDocs = [...selectedDocs.filter(doc => doc.id !== selectedDoc.id), renamedDoc];
      localStorage.setItem('selectedDocs', JSON.stringify(updatedDocs));

      // Update the state
      setSelectedDocs(updatedDocs);
      setIsRenameOpen(false);
      setIsDiscoverOpen(false); // Close the Discover modal
    }
  };

  const handleEditClick = (docId: string) => {
    window.location.href = `/apps/editor?docId=${docId}`; // Redirect to the editor page with the selected doc ID
  };

  const handleDelete = (docId: string) => {
    const updatedDocs = selectedDocs.filter(doc => doc.id !== docId);
    localStorage.setItem('selectedDocs', JSON.stringify(updatedDocs));
    setSelectedDocs(updatedDocs);
  };

  const handleDuplicate = (doc: any) => {
    // Placeholder for duplicate functionality
    alert('Duplicate function is under construction.');
  };

  // Modal close logic (click outside)
  const modalRef = React.useRef(null);

  useClickAway(modalRef, () => {
    if (isDiscoverOpen) {
      setIsDiscoverOpen(false); // Close the modal if clicked outside
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Title: "My Documents" */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
        My Documents
      </Typography>

      {selectedDocs.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          No documents selected yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {selectedDocs.map((doc: any) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 8,
                  padding: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: 'background.default',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    {doc.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {doc.shortDesc}
                  </Typography>
                  
                  {/* Full Description Display */}
                  <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
                    {doc.fullDesc}
                  </Typography>
                </CardContent>

                <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={() => handleEditClick(doc.id)} // Redirect to the editor
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={() => handleDuplicate(doc)} // Placeholder for duplicate
                  >
                    Duplicate
                  </Button>

                  {/* Delete Button */}
                  <IconButton
                    onClick={() => handleDelete(doc.id)} // Delete the document
                    sx={{
                      alignSelf: 'center',
                      color: 'error.main',
                      mt: 2,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Discover button */}
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDiscoverOpen(true)} // Open the Discover modal
        >
          Discover
        </Button>
      </Box>

      {/* Discover Modal */}
      <DiscoverModal
        open={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        onSelectDocument={handleSelectDocument}
        onRenameConfirm={handleRenameConfirm} // Pass handleRenameConfirm to the modal
      />

      {/* Rename Modal */}
      <Modal
        open={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        aria-labelledby="rename-document-modal"
        aria-describedby="modal-to-rename-document"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              How do you want to rename your document?
            </Typography>
            <input
              type="text"
              value={newName}
              placeholder="Enter new name"
              onChange={(e) => setNewName(e.target.value)} // Set new name input value
              style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => setIsRenameOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRenameConfirm} // Confirm renaming
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Page;
