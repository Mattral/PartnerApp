'use client';

import { useState, useEffect } from 'react';

// MATERIAL - UI
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// TYPES
import { ThemeMode } from 'types/config';

interface Props {
  color: string;
}

// ==============================|| CHART ||============================== //

const EcommerceDataChart = ({ color }: Props) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  color = color === 'error.dark' ? theme.palette.error.dark : theme.palette.primary.main;

  // CHART OPTIONS
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '60%',
          background: 'transparent',
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front'
        },
        track: {
          background: alpha(color, 0.5),
          strokeWidth: '50%'
        },

        dataLabels: {
          show: true,
          name: {
            show: false
          },
          value: {
            formatter: (val: number) => val,
            offsetY: 7,
            color: color,
            fontSize: '20px',
            fontWeight: '700',
            show: true
          }
        }
      }
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [color],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [color, mode, primary, secondary, line, theme]);

  const [series] = useState([30]);

  return <ReactApexChart options={options} series={series} type="radialBar" height={150} />;
};

// ==============================|| CHART WIDGET - ECOMMERCE RADIAL  ||============================== //

const EcommerceRadial = ({ color }: { color: string }) => {
  return (
    <MainCard content={false}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2 }}>
        <Box sx={{ width: 120 }}>
          <EcommerceDataChart color={color} />
        </Box>
        <Stack>
          <Typography>Total Earning</Typography>
          <Typography variant="subtitle1">$45,890</Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default EcommerceRadial;
