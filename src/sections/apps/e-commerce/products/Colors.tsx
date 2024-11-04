import { useEffect, useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import ColorOptions from './ColorOptions';
import Avatar from 'components/@extended/Avatar';

// TYPES
import { ThemeMode } from 'types/config';
import { ColorsOptionsProps } from 'types/e-commerce';

// ==============================|| PRODUCT - COLOR ||============================== //

interface ColorProps {
  bg: string;
  id: string;
  colors: string[];
  label: string;
  handelFilter: (type: string, params: string) => void;
}

const Color = ({ bg, id, colors, label, handelFilter }: ColorProps) => {
  const theme = useTheme();

  return (
    <Grid item>
      <Tooltip title={label}>
        <ButtonBase
          sx={{
            borderRadius: '50%',
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.secondary.dark}`,
              outlineOffset: 2
            }
          }}
          onClick={() => handelFilter('colors', id)}
        >
          <Avatar
            color="inherit"
            size="sm"
            sx={{
              bgcolor: bg,
              color: theme.palette.mode === ThemeMode.DARK ? 'secondary.800' : 'secondary.lighter',
              border: '3px solid',
              borderColor: colors.some((item: string) => item === id) ? theme.palette.secondary.light : theme.palette.background.paper
            }}
          >
            {' '}
          </Avatar>
        </ButtonBase>
      </Tooltip>
    </Grid>
  );
};

// ==============================|| PRODUCT - COLOR ||============================== //

const Colors = ({ colors, handelFilter }: { colors: string[]; handelFilter: (type: string, params: string) => void }) => {
  const [isColorsLoading, setColorLoading] = useState(true);
  useEffect(() => {
    setColorLoading(false);
  }, []);

  return (
    <>
      {isColorsLoading ? (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={158} />
        </Grid>
      ) : (
        <Stack>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Color
          </Typography>
          <Grid container spacing={1.5} alignItems="center">
            {ColorOptions.map((color: ColorsOptionsProps, index) => (
              <Color key={index} id={color.value} bg={color.bg} label={color.label} colors={colors} handelFilter={handelFilter} />
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default Colors;
