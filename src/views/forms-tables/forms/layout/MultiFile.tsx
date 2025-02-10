import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { CloudUpload as CloudUploadIcon, FileUpload as FileUploadIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone'; 
import { useRouter, useSearchParams } from 'next/navigation';
import { useDocumentOptions } from './useDocumentOptions';  // Import the custom hook

interface UploadResponse {
  status: string;
  data: {
    primaryData: {
      msg: string;
    };
  };
}

const UploadFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileDocumentCodes, setFileDocumentCodes] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams(); // Access search params
  const vd_code = searchParams.get('vd_code'); // Extract vd_code from the search params

  const { documentOptions, loading, error } = useDocumentOptions();  // Use the custom hook

  useEffect(() => {
    if (!vd_code) {
      console.error("vd_code is missing");
    }
  }, [vd_code]);

  // Retrieve the authorization token from localStorage
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        const token = parsedData?.data?.primaryData?.authorization;
        if (token) {
          setAuthToken(token);
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

  // Handle file selection (drag-and-drop or manual file picker)
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setFileDocumentCodes(Array(acceptedFiles.length).fill(''));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf,.doc,.docx,.jpg,.png,.jpeg' as any,
  });

  const handleDocumentCodeChange = (index: number, code: string) => {
    const newFileDocumentCodes = [...fileDocumentCodes];
    newFileDocumentCodes[index] = code;
    setFileDocumentCodes(newFileDocumentCodes);
  };

  const handleUpload = async () => {
    if (!authToken) {
      toast.error('Error: Authorization token is missing.');
      return;
    }
    setIsUploading(true);

    if (!vd_code) {
      toast.error('Error: Dossier code (vd_code) is missing.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('vd_code', vd_code); // Append vd_code to formData

    files.forEach((file, index) => {
      formData.append('files[' + index + ']', file);
      formData.append('vidoc_codes[' + index + ']', fileDocumentCodes[index]);
    });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await axios.post<UploadResponse>(
        `${baseUrl}/api/back-office/partner/manual-advisor-voi/files/upload`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
            'FRONTEND-KEY': 'XXX',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Upload Successful:', response.data);
      toast.success('Upload Successful!');

      // Clear the files and document codes after a successful upload
      setFiles([]);
      setFileDocumentCodes([]);
    } catch (error) {
      const axiosError = error as AxiosError<UploadResponse>;
      const errorMessage =
        axiosError?.response?.data?.data?.primaryData?.msg ||
        'Error uploading files. Please try again.';
      toast.error(`Upload Failed: ${errorMessage}`);
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Upload Your Files
        </h1>

        {/* Drag-and-Drop Upload Area */}
        <div
          {...getRootProps()}
          className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg mb-6 cursor-pointer hover:border-blue-500 transition-all"
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <CloudUploadIcon className="text-blue-600 mb-4" style={{ fontSize: 50 }} />
            <Typography variant="h6" className="text-gray-700">
              Drag & Drop Files Here or Click to Select
            </Typography>
          </div>
        </div>

        {/* Display selected files and document codes */}
        <div className="space-y-5">
          {files.length > 0 &&
            files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-all"
              >
                <p className="text-lg text-gray-800 font-medium">{file.name}</p>
                <div className="flex items-center space-x-2">
                  <DescriptionIcon className="text-gray-600" />
                  <select
                    className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                    value={fileDocumentCodes[index]}
                    onChange={(e) => handleDocumentCodeChange(index, e.target.value)}
                  >
                    <option value="">Select Document Code</option>
                    {loading ? (
                      <option>Loading...</option>
                    ) : error ? (
                      <option>{error}</option>
                    ) : (
                      documentOptions.map((option, i) => (
                        <option key={i} value={option.value}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            ))}
        </div>

        {/* Upload Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          disabled={isUploading || files.length === 0 || fileDocumentCodes.includes('')}
          className="mt-8 py-4"
          startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : <FileUploadIcon />}
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </Button>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default UploadFiles;


/*
                  <select
                    className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                    value={fileDocumentCodes[index]}
                    onChange={(e) => handleDocumentCodeChange(index, e.target.value)}
                  >
                    <option value="">Select Document Code</option>
                    {documentOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  */