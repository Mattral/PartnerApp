import { useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme, PaletteColor } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| INVOICE - CHART ||============================== //

interface InvoiceChartProps {
  color: PaletteColor;
  data: number[];
}

const InvoiceChart = ({ color, data }: InvoiceChartProps) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const mode = theme.palette.mode;

  // CHART OPTIONS
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      height: 100,
      type: 'area',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    stroke: {
      width: 1,
      curve: 'smooth'
    },
    grid: {
      show: false
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter(val: number) {
          return `$ ${val}`;
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
      chart: {
        ...prevState.chart,
        offsetX: downMD ? -2 : 8
      },
      colors: [color.main],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, color, downMD]);

  const [series] = useState([
    {
      name: 'Sales',
      data: data
    }
  ]);

  return <ReactApexChart options={options} series={series} type="area" height={80} />;
};

export default InvoiceChart;
