// MATERIAL - UI
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ASSETS
import { Camera } from 'iconsax-react';
const UploadCover = '/assets/images/upload/upload.svg';

// TYPES
import { DropzopType } from 'types/dropzone';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }: { type?: string }) {
  return (
    <>
      {type !== DropzopType.standard && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Drag & Drop or Select file</Typography>

            <Typography color="secondary">
              Drop files here or click&nbsp;
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          </Stack>
        </Stack>
      )}
      {type === DropzopType.standard && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Camera style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}
