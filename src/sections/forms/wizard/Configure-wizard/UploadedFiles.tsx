import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    IconButton,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    OpenInNew as OpenInNewIcon,
    Refresh as RefreshIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import FormData from 'form-data'; // If you are using Node.js
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams

// Type definitions for the API response
interface File {
    idF: number;
    f_name: string | null;
    f_path: string;
    vf_code: string;
}

interface ApiResponse {
    status: string;
    data: {
        primaryData: {
            _files: {
                data: File[];
            };
            msg?: string;  // Optional message field for error handling
        };
    };
}

const UploadedFiles = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [fileToDelete, setFileToDelete] = useState<File | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams(); // Access search params
    const vd_code = searchParams.get('vd_code'); // Extract vd_code from the search params

    const [authorizationToken, setAuthorizationToken] = useState<string | null>(null);
    const companyCode = 'MC-H3HBRZU6ZK5744S'; // Replace with actual company code
    const frontendKey = 'XXX'; // Replace with your frontend key


  // Fetch files from the API
  const fetchFiles = async () => {
    if (!authorizationToken) {
      setError('Authorization token is missing.');
      return;
    }

    if (!vd_code) {
      setError('Dossier code (vd_code) is missing.');
      return;
    }

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';  // `${baseUrl}/`

      const response = await axios.get<ApiResponse>(
        `${baseUrl}/api/back-office/partner/manual-client-voi/files/${vd_code}`,
        {
          headers: {
            Authorization: authorizationToken, // Use the token from state
            'COMPANY-CODE': companyCode,
            'FRONTEND-KEY': frontendKey,
            PaginateResults: '1',
            MaxResultsPerPage: '12',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );

      if (response.data.status === 'treatmentSuccess') {
        setFiles(response.data.data.primaryData._files.data);
        setError(null);  // Clear previous errors on successful fetch
      } else if (response.data.status === 'authenticationError') {
        setError(response.data.data.primaryData.msg || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred while fetching the files');
    } finally {
      setLoading(false);
    }
  };

    // Retry fetching data when refresh button is clicked
    const handleRefresh = () => {
        setError(null);
        fetchFiles();
    };

    // Delete the file with confirmation
    const handleDelete = (file: File) => {
        setFileToDelete(file);
        setOpenDialog(true);  // Open the confirmation dialog
    };

    // Handle the actual deletion after confirmation
    const confirmDelete = async () => {
        if (fileToDelete) {
            try {
                const formData = new FormData();
                formData.append('vd_code', vd_code);
                formData.append('vf_codes[0]', fileToDelete.vf_code); // Delete only this file
    
                // Send the delete request to the API
                const response = await axios.post(
                    'https://lawonearth.co.uk/api/back-office/partner/manual-client-voi/files/delete',
                    formData,
                    {
                        headers: {
                            Authorization: authorizationToken,
                            'COMPANY-CODE': companyCode,
                            'FRONTEND-KEY': frontendKey,
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'multipart/form-data', // Make sure Content-Type is set
                        },
                    }
                );
    
                if (response.data.status === 'treatmentSuccess') {
                    // Remove the deleted file from the state
                    setFiles((prevFiles) => prevFiles.filter((file) => file.idF !== fileToDelete.idF));
                    setOpenDialog(false); // Close the dialog
                    setFileToDelete(null); // Reset file to delete
                } else {
                    setError(response.data.data.primaryData.msg || 'Failed to delete the file');
                }
            } catch (error) {
                setError('An error occurred while deleting the file');
            }
        }
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog without doing anything
        setFileToDelete(null);
    };


  // useEffect to retrieve the token and fetch files
  useEffect(() => {
    // Retrieve the authorization token from localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        const token = parsedData?.data?.primaryData?.authorization;
        if (token) {
          setAuthorizationToken(`Bearer ${token}`); // Store the token with 'Bearer' prefix
        } else {
          console.error('Authorization token not found');
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    } else {
      console.error('No authentication data found in localStorage');
    }
  }, []);

  // useEffect to fetch files once authorization token is set
  useEffect(() => {
    if (authorizationToken && vd_code) {
      fetchFiles();
    }
  }, [authorizationToken, vd_code]); // Ensure it triggers when either authorizationToken or vd_code changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }


    return (
        <div className="min-h-[50vh] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto mb-auto">
                <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 animate__animated animate__fadeIn">
                    Uploaded Files
                </h1>

                {loading && <div className="text-center"><CircularProgress color="primary" /></div>}

                {error && (
                    <div className="text-center mb-6">
                        <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }}>
                            {error}
                        </Typography>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {files.map((file) => (
                        <Card
                            key={file.idF}
                            className="transition-all transform hover:scale-105 hover:shadow-xl p-6 bg-white shadow-lg rounded-lg"
                            sx={{ maxWidth: 345, borderRadius: 2 }}
                        >
                            <CardContent>
                                <Typography variant="h6" component="h2" className="font-semibold text-gray-800 mb-4">
                                    {file.f_name || 'Untitled'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" className="mb-6">
                                    <strong>File Path:</strong>{' '}
                                    <a href={file.f_path} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                        <OpenInNewIcon className="inline-block ml-1" />
                                    </a>
                                </Typography>

                                <Tooltip title={`VF Code: ${file.vf_code}`} arrow>
                                    <Typography variant="body2" color="textSecondary" className="mt-2">
                                        VF Code
                                    </Typography>
                                </Tooltip>

                                <div className="flex justify-between items-center mt-4">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(file)}
                                        className="transition-transform transform hover:scale-110"
                                        sx={{
                                            borderRadius: 2,
                                            padding: '10px 20px',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        }}
                                        fullWidth
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Refresh button fixed at the bottom */}
            <div className="fixed bottom-8 right-8 z-10">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRefresh}
                    startIcon={<RefreshIcon />}
                    className="transition-transform transform hover:scale-110"
                    sx={{
                        borderRadius: 2,
                        padding: '10px 20px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Refresh
                </Button>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WarningIcon sx={{ color: 'warning.main', marginRight: 1 }} />
                        Are you sure you want to delete this file?
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ padding: 4 }}>
                    <DialogContentText sx={{ fontSize: '1rem' }}>
                        This action cannot be undone. Please confirm to delete the file permanently.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UploadedFiles;
