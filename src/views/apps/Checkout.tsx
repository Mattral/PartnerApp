'use client';

// MATERIAL UI
import Box from '@mui/material/Box';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import CircularLoader from 'components/CircularLoader';
import CheckoutTab from 'sections/apps/e-commerce/checkout/CheckoutTab';
import { useGetCart } from 'api/cart';

// PROJECT IMPORTS: Add your Products component here
import TP from './timepic'; 

// ==============================|| ECOMMERCE - CHECKOUT ||============================== //

const Checkout = () => {
  const { cartLoading, cart } = useGetCart();

  const loader = (
    <MainCard>
      <Box sx={{ height: 'calc(100vh - 310px)' }}>
        <CircularLoader />
      </Box>
    </MainCard>
  );
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TP/>
      {cartLoading ? loader : <CheckoutTab cart={cart} />}
      
      
    </Box>
  );
};

export default Checkout;
