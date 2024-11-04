import { useState, ChangeEvent } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// ASSETS
const defaultLayout = '/assets/images/customization/ltr.svg';
const rtlLayout = '/assets/images/customization/rtl.svg';
const miniMenu = '/assets/images/customization/mini-menu.svg';

// TYPES
import { MenuOrientation, ThemeDirection } from 'types/config';

// ==============================|| CUSTOMIZATION - LAYOUT ||============================== //

const ThemeLayout = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { miniDrawer, themeDirection, onChangeDirection, onChangeMiniDrawer, menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  let initialTheme = 'default';
  if (miniDrawer === true) initialTheme = 'mini';
  if (themeDirection === ThemeDirection.RTL) initialTheme = 'rtl';

  const [value, setValue] = useState<string | null>(initialTheme);
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue === 'default') {
      if (themeDirection === ThemeDirection.RTL) {
        onChangeDirection(ThemeDirection.LTR);
      }
      if (miniDrawer === true) {
        onChangeMiniDrawer(false);
      }
      if (!drawerOpen) {
        handlerDrawerOpen(true);
      }
    }
    if (newValue === 'mini') {
      onChangeMiniDrawer(true);
      if (drawerOpen) {
        handlerDrawerOpen(true);
      }
    }
    if (newValue === ThemeDirection.RTL) {
      onChangeDirection(ThemeDirection.RTL);
    }
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={value} onChange={handleRadioChange}>
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{ borderWidth: 2, p: 1, ...(value === 'default' && { borderColor: theme.palette.primary.main }) }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
        {(menuOrientation === MenuOrientation.VERTICAL || downLG) && (
          <FormControlLabel
            control={<Radio value="mini" sx={{ display: 'none' }} />}
            sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(value === 'mini' && { borderColor: theme.palette.primary.main }) }}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <CardMedia component="img" src={miniMenu} alt="miniMenu" />
                </Stack>
              </MainCard>
            }
          />
        )}
        <FormControlLabel
          control={<Radio value={ThemeDirection.RTL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{ borderWidth: 2, p: 1, ...(value === ThemeDirection.RTL && { borderColor: theme.palette.primary.main }) }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={rtlLayout} alt="rtlLayout" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeLayout;
