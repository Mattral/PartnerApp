'use client';

import { useState } from 'react';

// MATERIAL - UI
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ==============================|| SELECT - AUTO WIDTH ||============================== //

export default function AutoWidthSelect() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const widthSelectCodeString = `<FormControl sx={{ minWidth: 80 }}>
  <InputLabel id="demo-simple-select-autowidth-label">Auto</InputLabel>
  <Select
    labelId="demo-simple-select-autowidth-label"
    id="demo-simple-select-autowidth"
    value={age}
    onChange={handleChange}
    autoWidth
    placeholder="Age"
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Twenty</MenuItem>
    <MenuItem value={21}>Twenty one</MenuItem>
    <MenuItem value={22}>Twenty one and a half</MenuItem>
  </Select>
</FormControl>`;

  return (
    <MainCard title="Auto Width" codeString={widthSelectCodeString}>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Auto</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          placeholder="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </MainCard>
  );
}
