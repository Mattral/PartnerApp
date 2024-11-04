import { useEffect, useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// TYPES
import { ThemeMode } from 'types/config';

// CHART OPTIONS
const redialBarChartOptions = {
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '75%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 5
        }
      }
    }
  },
  labels: ['Vimeo']
};

// ==============================|| TOP CARD - RADIAL BAR CHART ||============================== //

export interface ApexRedialBarChartProps extends ChartProps {}

const ProfileRadialChart = (props: ApexRedialBarChartProps) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const textPrimary = theme.palette.text.primary;
  const primary = theme.palette.primary.main;
  const grey0 = theme.palette.common.white;
  const grey500 = theme.palette.secondary.main;
  const grey200 = theme.palette.secondary[200];

  const [series] = useState<number[]>([30]);
  const [options, setOptions] = useState<ChartProps>(redialBarChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primary],
      plotOptions: {
        radialBar: {
          track: {
            background: mode === ThemeMode.DARK ? grey200 : grey0
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              fontWeight: 600,
              offsetY: 5,
              color: textPrimary
            }
          }
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, grey200, grey0, grey500, textPrimary, primary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" width={136} height={136} />
    </div>
  );
};

export default ProfileRadialChart;
