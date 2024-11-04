// components/PdfModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, onClose, pdfUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Document Preview</DialogTitle>
      <DialogContent>
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          style={{ width: '100%', height: '500px' }}
          frameBorder="0"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfModal;
