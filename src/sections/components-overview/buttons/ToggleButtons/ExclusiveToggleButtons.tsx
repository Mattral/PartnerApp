import { useState, MouseEvent } from 'react';

// MATERIAL - UI
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ASSETS
import { TextalignCenter, TextalignJustifycenter, TextalignLeft, TextalignRight } from 'iconsax-react';

// ==============================|| TOGGLE BUTTON - EXCLUSIVE ||============================== //

export default function ExclusiveToggleButtons() {
  const [alignment, setAlignment] = useState<string | null>('left');

  const handleAlignment = (event: MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
      <ToggleButton value="left" aria-label="left aligned">
        <TextalignCenter />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <TextalignRight />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <TextalignLeft />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list" disabled sx={{ '&.Mui-disabled': { color: 'text.disabled' } }}>
        <TextalignJustifycenter />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
