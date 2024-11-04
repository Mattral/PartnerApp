'use client';

// components/PdfPreview.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';

const PdfPreview = ({ isOpen, onRequestClose, pdfFile }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>PDF Preview</h2>
      <button onClick={onRequestClose}>Close</button>
      <div style={{ width: '100%', height: '80vh' }}>
        <Document file={pdfFile}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </Modal>
  );
};

export default PdfPreview; 
