import { ReactElement } from 'react';

// MATERIAL - UI
import Box from '@mui/material/Box';

// ==============================|| AUTHENTICATION - CARD ||============================== //

const AuthDivider = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '1px',
          zIndex: 1,
          bgcolor: 'divider'
        },
        '& .MuiTypography-root': {
          bgcolor: 'background.paper',
          position: 'relative',
          padding: '8px 20px',
          margin: '0 auto',
          zIndex: 5
        }
      }}
    >
      {children}
    </Box>
  );
};

export default AuthDivider;
