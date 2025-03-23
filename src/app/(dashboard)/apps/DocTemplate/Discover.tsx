// Discover.tsx
"use client";
import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Grid, Card, CardContent, Divider, TextField, InputAdornment, IconButton, Tab, Tabs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';  // Import CloseIcon
import { red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

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
    const [selectedTab, setSelectedTab] = useState<number>(0); // State for tabs
    const router = useRouter();  // Initialize the router


    const handlePreviewClick = () => {
        // Redirect to the /AboutDoc page when clicked
        router.push('/apps/AboutDoc');
    };


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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue); // Update selected tab
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
                backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                <Box sx={{
                    backgroundColor: 'white', padding: 4, borderRadius: 3, width: '90%', maxWidth: '1000px',
                    overflowY: 'auto', maxHeight: '80%', position: 'relative', boxShadow: 24 }}>
                    
                    {/* Close Button */}
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute', top: 8, right: 8, color: red[500],
                            '&:hover': { backgroundColor: 'transparent' },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Search Bar */}
                    <Box sx={{
                        position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white',
                        padding: '10px 0', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center' }}>
                        <TextField
                            label="Search Documents"
                            variant="outlined"
                            placeholder="Search for a document..."
                            fullWidth
                            sx={{
                                maxWidth: 600, width: '100%', borderRadius: 6, backgroundColor: 'background.paper',
                                boxShadow: 2, '& .MuiOutlinedInput-root': { borderRadius: 4 },
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
                    <Typography variant="h5" sx={{
                        mb: 3, fontWeight: 'bold', color: 'primary.main', textAlign: 'center', letterSpacing: 1.2 }}>
                        Choose a Document
                    </Typography>

                    {/* Tabs for Document Categories */}
                    <Box sx={{ mb: 3 }}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            textColor="primary"
                            indicatorColor="primary"
                        >
                            <Tab label="Estate" />
                            <Tab label="Trade" />
                            <Tab label="Corporate" />
                            <Tab label="Tax" />
                        </Tabs>
                    </Box>

                    {/* Cards for Documents */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {docs.map((doc) => (
                            <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                <Card
                                    sx={{
                                        boxShadow: 8, borderRadius: 4, padding: 3,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', backgroundColor: 'background.default',
                                        '&:hover': {
                                            boxShadow: 16, transform: 'scale(1.05)', cursor: 'pointer', 
                                        },
                                    }}
                                    onClick={() => handleChooseClick(doc)}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{
                                            fontWeight: 'bold', mb: 1, color: 'primary.dark', textTransform: 'uppercase' }}>
                                            {doc.name}
                                        </Typography>

                                        <Divider sx={{ my: 1 }} />

                                        <Typography variant="body2" sx={{
                                            color: 'text.secondary', fontStyle: 'italic', mb: 2 }}>
                                            {doc.shortDesc}
                                        </Typography>

                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleChooseClick(doc)} // Select button
                                                sx={{
                                                    borderRadius: 5, fontWeight: 'bold', '&:hover': { backgroundColor: 'primary.dark' },
                                                    boxShadow: 2,
                                                }}
                                            >
                                                Choose
                                            </Button>
                                            {/* Preview Button */}
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={handlePreviewClick}
                                                sx={{
                                                    borderRadius: 5, fontWeight: 'bold', '&:hover': {
                                                        backgroundColor: 'secondary.main', color: 'white',
                                                    }, boxShadow: 2,
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
