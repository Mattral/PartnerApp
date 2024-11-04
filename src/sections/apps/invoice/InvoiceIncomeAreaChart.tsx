import { useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// TYPES
import { ThemeMode } from 'types/config';

// CHART OPTIONS
const areaChartOptions = {
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  legend: {
    show: false
  },
  stroke: {
    width: [0, 2],
    curve: 'smooth'
  },
  dataLabels: {
    enabled: false
  }
};

// ==============================|| INVOICE - INCOME AREA CHART ||============================== //

const InvoiceIncomeAreaChart = ({ series }: { series: any }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main, theme.palette.warning.main],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: false,
          color: line
        },
        tickAmount: 11
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: [0, 1],
          opacityTo: [0.5, 1],
          stops: [0, 100],
          hover: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.15,
            opacityTo: 0.65,
            stops: [0, 96, 100]
          }
        }
      },
      markers: {
        size: [0, 3],
        colors: theme.palette.common.white,
        strokeWidth: [0, 2],
        strokeColors: theme.palette.warning.main,
        hover: {
          size: 5,
          colors: theme.palette.warning.main,
          strokeColors: theme.palette.common.white
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  return (
    <Box sx={{ '.apexcharts-bar-area': { strokeWidth: 0 } }}>
      <ReactApexChart options={options} series={series} type="line" height={265} />
    </Box>
  );
};

export default InvoiceIncomeAreaChart;
