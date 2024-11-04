'use client';

import { useEffect, useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-importds
import MainCard from 'components/MainCard';

// ASSETS
import { ArrowDown } from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| CHART ||============================== //

const DataChart = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // CHART OPTIONS
  const areaChartOptions = {
    chart: {
      id: 'new-users-chart',
      type: 'rangeBar',
      sparkline: { enabled: true },
      toolbar: {
        show: false
      },
      offsetX: -2
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 5,
        horizontal: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    dataLabels: {
      enabled: false
    }
  };
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  const [series] = useState([
    {
      data: [
        {
          x: 'Rejected',
          y: [1, 6]
        },
        {
          x: 'Pending',
          y: [3, 7]
        },
        {
          x: 'New',
          y: [4, 8]
        },
        {
          x: 'Verified',
          y: [5, 9]
        },
        {
          x: 'Store',
          y: [4, 8]
        },
        {
          x: 'Deleted',
          y: [4, 7]
        },
        {
          x: 'Block',
          y: [2, 5]
        }
      ]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="rangeBar" height={80} />;
};

// ==============================|| CHART WIDGETS - VISITORS ||============================== //

const Visitors = () => {
  const [age, setAge] = useState('30');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">New Users</Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <Select id="demo-simple-select" value={age} onChange={handleChange}>
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>Weekly</MenuItem>
                  <MenuItem value={30}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <DataChart />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="subtitle1">$30,200</Typography>
            <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
              <ArrowDown size={14} style={{ transform: 'rotate(-45deg)' }} />
              30.6%
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" color="secondary">
            View more
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Visitors;
