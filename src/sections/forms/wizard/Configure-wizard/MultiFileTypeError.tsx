import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Types
import { CustomFile, DropzopType, UploadMultiFileProps } from 'types/dropzone';
import RejectionFiles from 'components/third-party/dropzone/RejectionFiles';
import PlaceholderContent from 'components/third-party/dropzone/PlaceholderContent';
import { AxiosError } from 'axios';

// Styled components
const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// Adjust document options to reflect actual selected documents
const documentOptions = [
  { label: 'vidoc-9d8a21b6-72d4-4427-b9f2-510357a333b6' },
  { label: 'vidoc-9d84ce3d-a0e7-44ae-8ec9-16fa15c52b04' },
  { label: 'vidoc-9d84ce3d-a44c-46d9-870e-490401b16354' },
  { label: 'vidoc-9d84ed9e-1315-427b-98df-d14c0c35f889' }
];

// Upload Component
const MultiFileUpload = ({
  error,
  showList = false,
  files = [],
  type,
  setFieldValue,
  sx,
  onUpload,
}: UploadMultiFileProps) => {
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: CustomFile[]) => {
      const newFiles = acceptedFiles.map((file: CustomFile) => ({
        ...file,
        preview: URL.createObjectURL(file)
      }));
      if (setFieldValue) {
        setFieldValue('files', [...(files || []), ...newFiles]); // Update Formik state
      }
    }
  });

  const onRemoveAll = () => {
    if (setFieldValue) {
      setFieldValue('files', []);
    }
  };

  const onRemove = (file: CustomFile) => {
    const filteredItems = (files || []).filter((_file) => _file !== file);
    if (setFieldValue) {
      setFieldValue('files', filteredItems);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    setUploading(true); // Show loading state

    const formData = new FormData();
    const vd_code = 'vd-9db3069a-2c90-43f2-b62a-e01ec8d0065b'; // VOI dossier ID

    // Check if files are valid and append them with their corresponding document codes
    if (!files || files.length === 0) {
      toast.error('No files selected for upload.');
      setUploading(false);
      return;
    }

    // Append the files as an array to the formData
    files.forEach((file, index) => {
      const fakeFile = new File([file], `fake_path/${file.name}`, { type: file.type });
      formData.append('files[]', fakeFile); // Append file to form data as an array

      // Append the selected document for each file
      if (file.selectedDocument) {
        formData.append(`vidoc_codes[${index}]`, file.selectedDocument); // Append selected document
      } else {
        console.error('Missing selected document for file:', file.name);
      }
    });

    // Append vd_code outside the loop (only once)
    formData.append('vd_code', vd_code);

    // Debug: Check the formData content before uploading
    console.log('FormData:', formData);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // `${baseUrl}/`

      const response = await axios.post(
        `${baseUrl}/api/back-office/partner/manual-client-voi/files/upload`,
        formData,
        {
          headers: {
            'Authorization': 'Bearer 520|VmpluNvqeBkZeuskfZF5fAv4ddlsaOazSePhk1Vlb1dd7630', // Replace with your actual token
            'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
            'FRONTEND-KEY': 'XXX', // Replace with your frontend key
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );

      if (response.data.status === 'treatmentSuccess') {
        toast.success('Files uploaded successfully!');
        setFieldValue('files', []); // Clear the files after successful upload
      } else {
        toast.error('Failed to upload files');
      }
    } catch (error) {
      // Assert the error type to AxiosError
      if (axios.isAxiosError(error)) {
        const errorMessages = error.response?.data?.data?.primaryData?.errors
          ? Object.values(error.response.data.data.primaryData.errors)
              .flat()
              .join(', ') // Flatten and join error messages into a single string
          : 'There was an error uploading your files.';
    
        toast.error(errorMessages); // Show error messages in a toast
      } else {
        // Handle any non-axios errors
        toast.error('An unknown error occurred.');
      }
    } finally {
      setUploading(false); // Reset the loading state
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          ...(type === DropzopType.standard && { width: 'auto', display: 'flex' }),
          ...sx
        }}
      >
        <Stack {...(type === DropzopType.standard && { alignItems: 'center' })}>
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              ...(type === DropzopType.standard && {
                p: 0,
                m: 1,
                width: 64,
                height: 64
              }),
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: 'error.lighter'
              })
            }}
          >
            <input {...getInputProps()} />
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {type === DropzopType.standard && (files || []).length > 0 && (
            <Button variant="contained" color="error" size="small" onClick={onRemoveAll}>
              Remove all
            </Button>
          )}
        </Stack>

        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

        {(files || []).length > 0 && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            {(files || []).map((file, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2} justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Document</InputLabel>
                    <Select
                      label="Document"
                      value={file.selectedDocument || ""}
                      onChange={(event) => {
                        const selectedOption = documentOptions.find(option => option.label === event.target.value);
                        if (selectedOption) {
                          const updatedFiles = [...(files || [])];
                          updatedFiles[index] = {
                            ...file,
                            selectedDocument: selectedOption.label // Set the selected document for this file
                          };
                          if (setFieldValue) {
                            setFieldValue('files', updatedFiles); // Update the Formik state
                          }
                        }
                      }}
                    >
                      {documentOptions.map((option, idx) => (
                        <MenuItem key={idx} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="body1">{file.name}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  {file.selectedDocument && (
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {file.selectedDocument}
                    </Typography>
                  )}
                  <Button onClick={() => onRemove(file)} color="error">
                    Remove
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>

      {type !== DropzopType.standard && (files || []).length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload files'}
          </Button>
        </Stack>
      )}
      <ToastContainer />
    </>
  );
};

export default MultiFileUpload;


/*
// This is the checkpoint with closest error
// can remove after issue is closed

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Types
import { CustomFile, DropzopType, UploadMultiFileProps } from 'types/dropzone';
import RejectionFiles from 'components/third-party/dropzone/RejectionFiles';
import PlaceholderContent from 'components/third-party/dropzone/PlaceholderContent';
import { AxiosError } from 'axios';

// Styled components
const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

const documentOptions = [
  { label: 'vidoc-9d8a21b6-72d4-4427-b9f2-510357a333b6' },
  { label: 'vidoc-9d84ce3d-a0e7-44ae-8ec9-16fa15c52b04' },
  { label: 'vidoc-9d84ce3d-a44c-46d9-870e-490401b16354' },
  { label: 'vidoc-9d84ed9e-1315-427b-98df-d14c0c35f889' }
];



// Upload Component
const MultiFileUpload = ({
  error,
  showList = false,
  files = [],
  type,
  setFieldValue,
  sx,
  onUpload,
}: UploadMultiFileProps) => {
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: CustomFile[]) => {
      const newFiles = acceptedFiles.map((file: CustomFile) => ({
        ...file,
        preview: URL.createObjectURL(file)
      }));
      if (setFieldValue) {
        setFieldValue('files', [...(files || []), ...newFiles]); // Update Formik state
      }
    }
  });

  const onRemoveAll = () => {
    if (setFieldValue) {
      setFieldValue('files', []);
    }
  };

  const onRemove = (file: CustomFile) => {
    const filteredItems = (files || []).filter((_file) => _file !== file);
    if (setFieldValue) {
      setFieldValue('files', filteredItems);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    setUploading(true); // Show loading state

    const formData = new FormData();
    const vd_code = 'vd-9db3069a-2c90-43f2-b62a-e01ec8d0065b'; // VOI dossier ID

    // Check if files are valid and append them with their corresponding document codes
    if (!files || files.length === 0) {
      toast.error('No files selected for upload.');
      setUploading(false);
      return;
    }

    // Append the files as an array to the formData
    files.forEach((file, index) => {
      // Create a new file with a fake path (if necessary)
      const fakeFile = new File([file], `fake_path/${file.name}`, { type: file.type });
      
      // Instead of appending each file individually, we append them as an array to 'files'
      formData.append('files[]', fakeFile); // Append file to form data as an array

      // Append the selected document for each file
      if (file.selectedDocument) {
        formData.append(`vidoc_codes[${index}]`, file.selectedDocument); // Append selected document
      } else {
        console.error('Missing selected document for file:', file.name);
      }
    });

    // Append vd_code outside the loop (only once)
    formData.append('vd_code', vd_code);

    // Debug: Check the formData content before uploading
    console.log('FormData:', formData);

    try {
      const response = await axios.post(
        'https://lawonearth.co.nz/api/back-office/partner/manual-client-voi/files/upload',
        formData,
        {
          headers: {
            'Authorization': 'Bearer 520|VmpluNvqeBkZeuskfZF5fAv4ddlsaOazSePhk1Vlb1dd7630', // Replace with your actual token
            'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
            'FRONTEND-KEY': 'XXX', // Replace with your frontend key
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );

      if (response.data.status === 'treatmentSuccess') {
        toast.success('Files uploaded successfully!');
        setFieldValue('files', []); // Clear the files after successful upload
      } else {
        toast.error('Failed to upload files');
      }
    } catch (error) {
      // Assert the error type to AxiosError
      if (axios.isAxiosError(error)) {
        const errorMessages = error.response?.data?.data?.primaryData?.errors
          ? Object.values(error.response.data.data.primaryData.errors)
              .flat()
              .join(', ') // Flatten and join error messages into a single string
          : 'There was an error uploading your files.';
    
        toast.error(errorMessages); // Show error messages in a toast
      } else {
        // Handle any non-axios errors
        toast.error('An unknown error occurred.');
      }
    } finally {
      setUploading(false); // Reset the loading state
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          ...(type === DropzopType.standard && { width: 'auto', display: 'flex' }),
          ...sx
        }}
      >
        <Stack {...(type === DropzopType.standard && { alignItems: 'center' })}>
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              ...(type === DropzopType.standard && {
                p: 0,
                m: 1,
                width: 64,
                height: 64
              }),
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: 'error.lighter'
              })
            }}
          >
            <input {...getInputProps()} />
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {type === DropzopType.standard && (files || []).length > 0 && (
            <Button variant="contained" color="error" size="small" onClick={onRemoveAll}>
              Remove all
            </Button>
          )}
        </Stack>

        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

        {(files || []).length > 0 && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            {(files || []).map((file, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2} justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Document</InputLabel>
                    <Select
                      label="Document"
                      value={file.selectedDocument || ""}
                      onChange={(event) => {
                        const selectedOption = documentOptions.find(option => option.label === event.target.value);
                        if (selectedOption) {
                          const updatedFiles = [...(files || [])];
                          updatedFiles[index] = {
                            ...file,
                            selectedDocument: selectedOption.label // Set the selected document for this file
                          };
                          if (setFieldValue) {
                            setFieldValue('files', updatedFiles); // Update the Formik state
                          }
                        }
                      }}
                    >
                      {documentOptions.map((option, idx) => (
                        <MenuItem key={idx} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="body1">{file.name}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  {file.selectedDocument && (
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {file.selectedDocument}
                    </Typography>
                  )}
                  <Button onClick={() => onRemove(file)} color="error">
                    Remove
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>

      {type !== DropzopType.standard && (files || []).length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload files'}
          </Button>
        </Stack>
      )}
      <ToastContainer />
    </>
  );
};

export default MultiFileUpload;
*/