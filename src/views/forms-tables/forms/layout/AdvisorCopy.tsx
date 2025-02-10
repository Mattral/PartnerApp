import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Document {
    idoc_name: string;
    vidoc_type: string;
    vidoc_nbPoint: number;
}

interface ApiResponse {
    data: {
        primaryData: {
            _idocuments: {
                data: Document[];
                current_page: number;
                total: number;
            };
            vlvl_minNbPoint: number;
            vlvl_minNbPrimaryDoc: number;
        };
    };
}

const ClientLevelVOIDocumentTable: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [minNbPoint, setMinNbPoint] = useState<number>(0);
    const [minNbPrimaryDoc, setMinNbPrimaryDoc] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
      // Get the URL search parameters (query string)
      const urlParams = new URLSearchParams(window.location.search);
      const ed_code = urlParams.get('ed_code'); // Retrieve the ed_code from the query string

      if (!ed_code) {
        setError('ed_code is missing from the query string');
        setLoading(false);
        return;
      }            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/partner/advisor-identification-documents/${ed_code}`, {
                    method: 'GET',
                    headers: {
                        'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
                        'FRONTEND-KEY': 'XXX',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });



                if (response.ok) {
                    const data: ApiResponse = await response.json();
                    const { vlvl_minNbPoint, vlvl_minNbPrimaryDoc, _idocuments } = data.data.primaryData;

                    // Make sure we're accessing the data array properly
                    if (Array.isArray(_idocuments.data)) {
                        setDocuments(_idocuments.data);
                    } else {
                        console.error('Expected _idocuments.data to be an array');
                    }

                    setMinNbPoint(vlvl_minNbPoint);
                    setMinNbPrimaryDoc(vlvl_minNbPrimaryDoc);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                p: 3,
                maxWidth: '100%',
                width: '95%',
                margin: 'auto',
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Header */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
                Client Level VOI Documents
            </Typography>

            {/* Minimum Required Documents */}
            <Typography variant="h6" sx={{ fontSize: '1.6rem', marginBottom: 2, textAlign: 'center' }}>
                Minimum number of documents required: {minNbPoint}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.6rem', marginBottom: 3, textAlign: 'center' }}>
                Minimum number of Primary Documents to upload: {minNbPrimaryDoc}
            </Typography>

            {/* Table of Documents */}
            {loading ? (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Loading documents...
                </Typography>
            ) : (
                <TableContainer sx={{ maxWidth: '90%' }}>
                    <Table sx={{ minWidth: 350 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Doc Name</strong></TableCell>
                                <TableCell align="center"><strong>Doc Type</strong></TableCell>
                                <TableCell align="center"><strong>Point of Doc</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.length > 0 ? (
                                documents.map((doc, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{doc.idoc_name}</TableCell>
                                        <TableCell align="center">{doc.vidoc_type}</TableCell>
                                        <TableCell align="center">{doc.vidoc_nbPoint}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No documents available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default ClientLevelVOIDocumentTable;
