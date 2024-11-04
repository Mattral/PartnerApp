// MATERIAL - UI 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { useDropzone } from 'react-dropzone';

// PROJECT IMPORTS
import RejectionFiles from 'components/third-party/dropzone/RejectionFiles';
import PlaceholderContent from 'components/third-party/dropzone/PlaceholderContent';

// TYPES
import { CustomFile, DropzopType, UploadMultiFileProps } from 'types/dropzone';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

const documentOptions = [
  { label: 'National ID', points: 50 },
  { label: 'Passport', points: 50 },
  { label: 'Driving License', points: 25 },
  { label: 'Employment Certificate', points: 25 },
  { label: 'Bachelor', points: 25 },
];

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

const MultiFileUpload = ({ error, showList = false, files = [], type, setFieldValue, sx, onUpload, ...other }: UploadMultiFileProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: CustomFile[]) => {
      const newFiles = acceptedFiles.map((file: CustomFile) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      if (setFieldValue) {
        setFieldValue('files', [...(files || []), ...newFiles]);
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

  const handleUpload = () => {
    const uploadData = (files || []).map(file => ({
      name: file.name,
      selectedDocument: file.selectedDocument,
      points: file.points,
    }));

    // Call the onUpload function passed from the parent
    if (onUpload) {
      onUpload(uploadData);
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
                            selectedDocument: selectedOption.label,
                            points: selectedOption.points
                          };
                          if (setFieldValue) {
                            setFieldValue('files', updatedFiles);
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
                      {file.selectedDocument} ({file.points} points)
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
          <Button size="small" variant="contained" onClick={handleUpload}>
            Upload files
          </Button>
        </Stack>
      )}
    </>
  );
};

export default MultiFileUpload;
