import { useState, ChangeEvent } from 'react';

// MATERIAL - UI
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

// THIRD - PARTY
import { enqueueSnackbar } from 'notistack';

// PROJECT IMPORTS
import { handlerIconVariants } from 'api/snackbar';
import MainCard from 'components/MainCard';

// ==============================|| NOTISTACK - CUSTOM ICON ||============================== //

export default function IconVariants() {
  const [value, setValue] = useState('usedefault');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const NotiStackIconVariantsSnackbarCodeString = `<Button
variant="contained"
fullWidth
sx={{ marginBlockStart: 2 }}
onClick={() => {
  enqueueSnackbar('Your notification here', { variant: 'info' });
  handlerIconVariants(value);
}}
>
  Show Snackbar
</Button>`;

  return (
    <MainCard title="With Icons" codeString={NotiStackIconVariantsSnackbarCodeString}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={value}
          onChange={handleChange}
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="usedefault" control={<Radio />} label="Use Default" />
          <FormControlLabel value="useemojis" control={<Radio />} label="Use Emojis" />
          <FormControlLabel value="hide" control={<Radio />} label="Hide" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => {
          enqueueSnackbar('Your notification here', { variant: 'info' });
          handlerIconVariants(value);
        }}
      >
        Show Snackbar
      </Button>
    </MainCard>
  );
}
