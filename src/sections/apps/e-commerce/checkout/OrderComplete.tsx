// NEXT
import Link from 'next/link';
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { Chance } from 'chance';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import { PopupTransition } from 'components/@extended/Transitions';

// ASSETS
const completed = '/assets/images/e-commerce/completed.png';

const chance = new Chance();

// ==============================|| CHECKOUT - ORDER COMPLETE ||============================== //

const OrderComplete = ({ open }: { open: boolean }) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={PopupTransition}
      sx={{ '& .MuiDialog-paper': { bgcolor: 'background.paper', backgroundImage: 'none' } }}
    >
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item>
          <MainCard border={false}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <Image
                  src={completed}
                  alt="Order Complete"
                  width={downMD ? 320 : 500}
                  height={downMD ? 200 : 312}
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </Box>
              <Typography variant={downMD ? 'h3' : 'h1'} align="center">
                Thank you for Purchase!
              </Typography>
              <Box sx={{ px: 2.5 }}>
                <Typography align="center" color="textSecondary">
                  We will send a process notification, before it delivered.
                </Typography>
                <Typography align="center" color="textSecondary">
                  Your order id:{' '}
                  <Typography variant="subtitle1" component="span" color="primary">
                    {chance.guid()}
                  </Typography>
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ py: { xs: 1, sm: 3 } }}>
                (219) 404-5468
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Button
                  component={Link}
                  href="/apps/e-commerce/products"
                  variant="outlined"
                  color="secondary"
                  size={downMD ? 'small' : 'medium'}
                >
                  Continue Shopping
                </Button>
                <Button
                  component={Link}
                  href="/apps/e-commerce/products"
                  variant="contained"
                  color="primary"
                  size={downMD ? 'small' : 'medium'}
                >
                  Download Invoice
                </Button>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OrderComplete;
