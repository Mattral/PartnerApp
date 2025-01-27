"use client";
import { Grid, Box, Typography, Divider, Card, CardContent, Button, IconButton } from '@mui/material';
import { Description as DescriptionIcon, Category as CategoryIcon, Preview as PreviewIcon, Assignment as AssignmentIcon, TableChart as TableChartIcon } from '@mui/icons-material';

// Dummy data for demonstration
const documentDetails = {
    title: "Legal Template A",
    type: "Agreement",
    shortDescription: "A concise legal template for creating agreements.",
    longDescription: "This document contains the full legal template for creating agreements. It includes sections for general information, clauses, and signatures.",
    category: "Corporate",
    tableOfContents: [
        { id: 1, title: "Section 1: Introduction" },
        { id: 2, title: "Section 2: Terms and Conditions" },
        { id: 3, title: "Section 3: Signatures" },
        { id: 4, title: "Section 4: Miscellaneous" },
    ],
};

const AboutDoc = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: 'primary.main' }}>
                {documentDetails.title}
            </Typography>

            <Grid container spacing={4}>
                {/* Left Side: Document Details */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, color: 'primary.dark' }}>
                            <CategoryIcon sx={{ marginRight: 1 }} /> Category
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>
                            {documentDetails.category}
                        </Typography>

                        <Divider sx={{ marginBottom: 3 }} />

                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, color: 'primary.dark' }}>
                            <AssignmentIcon sx={{ marginRight: 1 }} /> Type
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>
                            {documentDetails.type}
                        </Typography>

                        <Divider sx={{ marginBottom: 3 }} />

                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, color: 'primary.dark' }}>
                            <DescriptionIcon sx={{ marginRight: 1 }} /> Short Description
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>
                            {documentDetails.shortDescription}
                        </Typography>

                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, color: 'primary.dark' }}>
                            Long Description
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 3, color: 'text.secondary' }}>
                            {documentDetails.longDescription}
                        </Typography>

                        <Divider sx={{ marginBottom: 3 }} />

                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, color: 'primary.dark' }}>
                            <TableChartIcon sx={{ marginRight: 1 }} /> Table of Contents
                        </Typography>
                        <ul>
                            {documentDetails.tableOfContents.map((section) => (
                                <li key={section.id}>
                                    <Typography variant="body1">{section.title}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </Grid>

                {/* Right Side: Document Preview */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3, color: 'primary.dark' }}>
                            <PreviewIcon sx={{ marginRight: 1 }} /> Document Preview
                        </Typography>

                        {/* Document Preview */}
                        <Card sx={{ boxShadow: 8, borderRadius: 2, padding: 3, backgroundColor: '#f9f9f9' }}>
                            <CardContent>
                                {/* Embed PDF using iframe */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', backgroundColor: '#e3e3e3', borderRadius: 2 }}>
                                    <iframe
                                        src="/pdf/example2.pdf#toolbar=0"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                    />
                                </Box>

                                {/* Button to trigger preview action */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: 3, borderRadius: 2, fontWeight: 'bold', width: '100%' }}
                                >
                                    Use this Document
                                </Button>
                            </CardContent>
                        </Card>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutDoc;
