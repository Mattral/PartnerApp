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
import { handlerDrawerOpen } from 'api/menu';

// ASSETS
const defaultLayout = '/assets/images/customization/vertical.svg';
const horizontalLayout = '/assets/images/customization/horizontal.svg';

// TYPES
import { MenuOrientation } from 'types/config';

// ==============================|| CUSTOMIZATION - CONTAINER ||============================== //

const ThemeMenuLayout = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation, onChangeMenuOrientation, onChangeMiniDrawer } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const handleContainerChange = (e: any) => {
    onChangeMiniDrawer(true);
    onChangeMenuOrientation(e.target.value);
    handlerDrawerOpen(e.target.value !== MenuOrientation.HORIZONTAL);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={menuOrientation} onChange={handleContainerChange}>
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value={MenuOrientation.VERTICAL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(!isHorizontal && { borderColor: theme.palette.primary.main }) }}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value={MenuOrientation.HORIZONTAL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(isHorizontal && { borderColor: theme.palette.primary.main }) }}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={horizontalLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeMenuLayout;
