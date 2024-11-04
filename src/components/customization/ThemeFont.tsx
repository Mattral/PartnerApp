import { ChangeEvent } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// THIRD-PARTY
import { Inter, Poppins, Public_Sans, Roboto } from 'next/font/google';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import { HEADER_HEIGHT } from 'config';
import useConfig from 'hooks/useConfig';

import { FontFamily } from 'types/config';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const publicSans = Public_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// ==============================|| CUSTOMIZATION - FONT FAMILY ||============================== //

const ThemeFont = () => {
  const theme = useTheme();

  const { fontFamily, onChangeFontFamily } = useConfig();

  const handleFontChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeFontFamily(event.target.value as FontFamily);
  };

  const fonts = [
    {
      id: 'inter',
      value: inter.style.fontFamily,
      label: 'Inter'
    },
    {
      id: 'roboto',
      value: roboto.style.fontFamily,
      label: 'Roboto'
    },
    {
      id: 'poppins',
      value: poppins.style.fontFamily,
      label: 'Poppins'
    },
    {
      id: 'public-sans',
      value: publicSans.style.fontFamily,
      label: 'Public Sans'
    }
  ];

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={fontFamily} onChange={handleFontChange}>
      <Grid container spacing={1.75} sx={{ ml: 0 }}>
        {fonts.map((item, index) => (
          <Grid item key={index}>
            <FormControlLabel
              control={<Radio value={item.value} sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  sx={{ bgcolor: fontFamily === item.value ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                  border={false}
                  {...(fontFamily === item.value && { boxShadow: true, shadow: theme.customShadows.primary })}
                >
                  <Box sx={{ minWidth: HEADER_HEIGHT, bgcolor: 'background.paper', p: 1, '&:hover': { bgcolor: 'background.paper' } }}>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5" color="textPrimary" sx={{ fontFamily: item.value }}>
                        Aa
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.label}
                      </Typography>
                    </Stack>
                  </Box>
                </MainCard>
              }
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
};

export default ThemeFont;
