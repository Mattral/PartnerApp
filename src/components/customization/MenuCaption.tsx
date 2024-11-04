import { ChangeEvent } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// ASSETS
const Caption = '/assets/images/customization/caption.svg';
const NoCaption = '/assets/images/customization/no-caption.svg';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const MenuCaption = () => {
  const theme = useTheme();
  const { menuCaption, onChangeMenuCaption } = useConfig();

  const handleMenuCaptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeMenuCaption();
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={menuCaption ? 'caption' : 'default'}
      onChange={handleMenuCaptionChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="caption" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(menuCaption && { borderColor: theme.palette.primary.main }) }}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={Caption} alt="Caption" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(!menuCaption && { borderColor: theme.palette.primary.main }) }}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={NoCaption} alt="NoCaption" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default MenuCaption;
