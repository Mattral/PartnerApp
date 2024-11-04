'use client';

import { useEffect, useState, MouseEvent } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// THIRD - PARTY
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| CHART ||============================== //

const ApexPieChart = () => {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const mode = theme.palette.mode;

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.secondary[200];
  const backColor = theme.palette.background.paper;

  const pieChartOptions = {
    chart: {
      type: 'pie'
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: true
    },
    labels: ['Components', 'Widgets', 'Pages', 'Forms', 'Other', 'Apps'],
    legend: {
      show: false
    }
  };

  const [series] = useState([40, 20, 10, 15, 5, 10]);
  const [options, setOptions] = useState<ChartProps>(pieChartOptions);

  useEffect(() => {
    const primaryMain = theme.palette.primary.main;
    const primaryLight = theme.palette.primary[200];
    const secondary = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary[400];
    const secondaryDark = theme.palette.secondary.dark;
    const secondaryDarker = theme.palette.secondary.darker;

    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryMain, primaryLight, secondaryLight, secondary, secondaryDark, secondaryDarker],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false
      },
      grid: {
        borderColor: line
      },
      stroke: {
        colors: [backColor]
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, line, grey200, backColor, theme]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" width={downSM ? 280 : 350} height={downSM ? 280 : 350} />
    </div>
  );
};

// ==============================|| CHART WIDGETS - PRODUCT OVERVIEW ||============================== //

const ProductOverview = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Project overview</Typography>
            <IconButton
              color="secondary"
              id="wallet-button"
              aria-controls={open ? 'wallet-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="wallet-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'wallet-button',
                sx: { p: 1.25, minWidth: 150 }
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <ListItemButton onClick={handleClose}>Today</ListItemButton>
              <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
              <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <ApexPieChart />
          </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Apps</Typography>
              </Stack>
              <Typography variant="subtitle1">10+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Other</Typography>
              </Stack>
              <Typography variant="subtitle1">5+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Widgets</Typography>
              </Stack>
              <Typography variant="subtitle1">150+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Forms</Typography>
              </Stack>
              <Typography variant="subtitle1">50+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Components</Typography>
              </Stack>
              <Typography variant="subtitle1">200+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Pages</Typography>
              </Stack>
              <Typography variant="subtitle1">150+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Button variant="outlined" fullWidth color="secondary">
              View all
            </Button>
            <Button variant="contained" fullWidth>
              Create new page
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProductOverview;
