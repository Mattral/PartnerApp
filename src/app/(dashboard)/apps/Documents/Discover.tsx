"use client";
import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Grid, Card, CardContent, Divider, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';  // Import CloseIcon

interface Doc {
    id: string;
    name: string;
    shortDesc: string;
    fullDesc: string;
}

interface DiscoverModalProps {
    open: boolean;
    onClose: () => void;
    onSelectDocument: (doc: Doc) => void;
    onRenameConfirm: (doc: Doc, newName: string) => void;
}

const DiscoverModal: React.FC<DiscoverModalProps> = ({ open, onClose, onSelectDocument, onRenameConfirm }) => {
    const [newName, setNewName] = useState<string>('');
    const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

    const docs: Doc[] = [
        {
            id: '1',
            name: 'Legal Template A',
            shortDesc: 'A concise description of Template A',
            fullDesc: 'Full description of Template A. Detailed content that explains what it covers and how it can be used.',
        },
        {
            id: '2',
            name: 'Legal Template B',
            shortDesc: 'A concise description of Template B',
            fullDesc: 'Full description of Template B. Detailed content that explains what it covers and how it can be used.',
        },
        {
            id: '3',
            name: 'Legal Template C',
            shortDesc: 'A concise description of Template C',
            fullDesc: 'Full description of Template C. Detailed content that explains what it covers and how it can be used.',
        },
        {
            id: '4',
            name: 'Legal Template D',
            shortDesc: 'A concise description of Template D',
            fullDesc: 'Full description of Template D. Detailed content that explains what it covers and how it can be used.',
        },
        {
            id: '5',
            name: 'Legal Template E',
            shortDesc: 'A concise description of Template E',
            fullDesc: 'Full description of Template E. Detailed content that explains what it covers and how it can be used.',
        },
        {
            id: '6',
            name: 'Legal Template F',
            shortDesc: 'A concise description of Template F',
            fullDesc: 'Full description of Template F. Detailed content that explains what it covers and how it can be used.',
        },
    ];

    const handleChooseClick = (doc: Doc) => {
        setSelectedDoc(doc); // Set the selected document
        onSelectDocument(doc); // Trigger the selection action
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 3, width: '80%', maxWidth: '900px', overflowY: 'auto', maxHeight: '80%', position: 'relative' }}>

                    {/* Close Button */}
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        backgroundColor: 'white',
                        padding: '10px 0',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TextField
                            label="Search Documents"
                            variant="outlined"
                            placeholder="Search for a document..."
                            fullWidth
                            sx={{
                                maxWidth: 600,
                                width: '100%',
                                borderRadius: 6,
                                backgroundColor: 'background.paper',
                                boxShadow: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 4,
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Modal Header */}
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                        Choose a Document
                    </Typography>

                    {/* Cards for Documents */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {docs.map((doc) => (
                            <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                <Card
                                    sx={{
                                        boxShadow: 8,
                                        borderRadius: 4,
                                        padding: 3,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            boxShadow: 16,
                                            transform: 'scale(1.05)', // Smooth hover effect
                                        },
                                        backgroundColor: 'background.default',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
                                            {doc.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}>
                                            {doc.shortDesc}
                                        </Typography>

                                        <Divider sx={{ my: 2 }} />

                                        {/* Full Description */}
                                        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
                                            {doc.fullDesc}
                                        </Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleChooseClick(doc)} // Select button
                                                sx={{
                                                    borderRadius: 5,
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark',
                                                    },
                                                }}
                                            >
                                                Choose
                                            </Button>
                                            {/* Preview Button */}
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                sx={{
                                                    borderRadius: 5,
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        backgroundColor: 'secondary.main',
                                                        color: 'white',
                                                    },
                                                }}
                                            >
                                                Preview
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};

export default DiscoverModal;
