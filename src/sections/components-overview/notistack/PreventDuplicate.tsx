import { useState, ChangeEvent } from 'react';

// MATERIAL - UI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

// THIRD - PARTY
import { enqueueSnackbar } from 'notistack';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ==============================|| NOTISTACK - PREVENT DUPLICATE ||============================== //

export default function PreventDuplicate() {
  const [checked, setChecked] = useState(true);

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const NotiStackPreventDuplicateCodeString = `<Button
  variant="outlined"
  fullWidth
  sx={{ marginBlockStart: 2 }}
  onClick={() =>
    enqueueSnackbar('You only see me once.', {
      preventDuplicate: checked ? true : false
    })
  }
>
  Show snackbar
</Button>`;

  return (
    <MainCard title="Prevent Duplicate" codeString={NotiStackPreventDuplicateCodeString}>
      <Stack flexDirection={'row'} gap={1} justifyContent={'center'} alignItems={'center'} flexWrap="wrap">
        <Checkbox checked={checked} onChange={handleChangeCheck} inputProps={{ 'aria-label': 'controlled' }} />
        Prevent duplicate
        <Button
          variant="outlined"
          fullWidth
          sx={{ marginBlockStart: 2 }}
          onClick={() =>
            enqueueSnackbar('You only see me once.', {
              preventDuplicate: checked ? true : false
            })
          }
        >
          Show snackbar
        </Button>
      </Stack>
    </MainCard>
  );
}
