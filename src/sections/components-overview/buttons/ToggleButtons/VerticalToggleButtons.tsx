import { useState, MouseEvent } from 'react';

// MATERIAL - UI
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ASSETS
import { Apple, Buildings2, TableDocument } from 'iconsax-react';

// ==============================|| TOGGLE BUTTON - VERTICAL ||============================== //

export default function VerticalToggleButtons() {
  const [view, setView] = useState('tree');

  const handleChange = (event: MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
      <ToggleButton value="tree" aria-label="tree">
        <Buildings2 />
      </ToggleButton>
      <ToggleButton value="grid" aria-label="grid">
        <Apple />
      </ToggleButton>
      <ToggleButton value="table" aria-label="table">
        <TableDocument />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
