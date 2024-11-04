import { useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// TYPES
import { ThemeMode } from 'types/config';

interface Props {
  color: string;
  height?: number;
}

// ==============================|| CHART - ECOMMERCE DATA CHART ||============================== //

const EcommerceDataChart = ({ color, height }: Props) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // CHART OPTIONS
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      type: 'bar',
      sparkline: {
        enabled: true
      },
      toolbar: {
        show: false
      },
      offsetX: -2
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '80%'
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
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

  const [series] = useState([
    {
      name: 'Users',
      data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="bar" height={height ? height : 50} />;
};

export default EcommerceDataChart;
