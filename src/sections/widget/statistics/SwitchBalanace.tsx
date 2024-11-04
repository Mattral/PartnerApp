'use client';

// MATERIAL - UI
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { ArrowSwapHorizontal } from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';

const SwitchBalanace = () => {
  const theme = useTheme();

  return (
    <MainCard
      content={false}
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 1),
        color: 'common.white',
        '&:after': {
          content: '""',
          background: `linear-gradient(245deg, transparent 25.46%, rgba(0, 0, 0, 0.2) 68.77%, rgba(0, 0, 0, 0.3) 81.72%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.6
        }
      }}
    >
      <Box sx={{ p: 2, position: 'inherit', zIndex: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Stack>
            <Typography>Available Balance</Typography>
            <Typography variant="h4">$1,234.90</Typography>
          </Stack>
          <Avatar
            variant="rounded"
            type="filled"
            size="lg"
            sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.100' : 'primary.darker' }}
          >
            <ArrowSwapHorizontal />
          </Avatar>
        </Stack>
      </Box>
    </MainCard>
  );
};

export default SwitchBalanace;
