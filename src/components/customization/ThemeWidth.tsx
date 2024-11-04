// MATERIAL - UI
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// ASSETS
const defaultLayout = '/assets/images/customization/fluid.svg';
const containerLayout = '/assets/images/customization/container.svg';

// ==============================|| CUSTOMIZATION - CONTAINER ||============================== //

const ThemeWidth = () => {
  const { container, onChangeContainer } = useConfig();

  const handleContainerChange = () => {
    onChangeContainer();
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={container ? 'container' : 'fluid'}
      onChange={handleContainerChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="fluid" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(!container && { borderColor: 'primary.main' }) }}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value="container" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(container && { borderColor: 'primary.main' }) }}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={containerLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeWidth;
