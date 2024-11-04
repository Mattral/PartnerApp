import { SyntheticEvent } from 'react';

// MATERIAL - UI
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import MuiSnackbar from '@mui/material/Snackbar';

// PROJECT IMPORTS
import IconButton from './IconButton';
import { closeSnackbar, useGetSnackbar } from 'api/snackbar';

// ASSETS
import { Add } from 'iconsax-react';

// TYPES
import { KeyedObject } from 'types/root';

// ANIMATION FUNCTION
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// ANIMATION OPTIONS
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const { snackbar } = useGetSnackbar();

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <>
      {/* default snackbar */}
      {snackbar.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={snackbar.message}
          TransitionComponent={animation[snackbar.transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <Add style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {snackbar.variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[snackbar.transition]}
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            variant={snackbar.alert.variant}
            color={snackbar.alert.color}
            action={
              <Stack direction="row" alignItems="center">
                {snackbar.actionButton !== false && (
                  <Button color={snackbar.alert.color} size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {snackbar.close !== false && (
                  <IconButton size="small" aria-label="close" variant="contained" color={snackbar.alert.color} onClick={handleClose}>
                    <Add style={{ transform: 'rotate(45deg)' }} />
                  </IconButton>
                )}
              </Stack>
            }
            sx={{
              ...snackbar.alert.sx,
              ...(snackbar.alert.variant === 'outlined' && {
                bgcolor: 'background.default'
              })
            }}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
