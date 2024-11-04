// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';

// THIRD - PARTY
import { sum } from 'lodash';

// TYPES
import { CartProductStateProps } from 'types/cart';

// PROJECT IMPORTS
import { useGetCart } from 'api/cart';

// ASSETS
import { ShoppingCart } from 'iconsax-react';
import IconButton from 'components/@extended/IconButton';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingCart = () => {
  const theme = useTheme();

  const { cart } = useGetCart();

  let totalQuantity: number = 0;
  if (cart && cart.products && cart.products.length > 0) {
    totalQuantity = sum(cart.products.map((item: CartProductStateProps) => item.quantity));
  }

  return (
    <Fab
      component={Link}
      href="/apps/e-commerce/checkout"
      size="large"
      variant="circular"
      sx={{
        borderRadius: 0,
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        top: '65%',
        position: 'fixed',
        right: 0,
        zIndex: theme.zIndex.speedDial,
        boxShadow: theme.customShadows.z1,
        bgcolor: 'background.paper',
        border: `4px solid ${theme.palette.background.paper}`,
        borderRight: 'none',
        '&:hover': {
          bgcolor: 'warning.lighter'
        }
      }}
    >
      <IconButton
        aria-label="settings toggler"
        size="large"
        sx={{ p: 0, width: 30, height: 30, '& svg': { width: 26, height: 26 }, color: 'warning.dark' }}
        color="warning"
      >
        <Badge showZero badgeContent={totalQuantity} color="error">
          <ShoppingCart variant="Bulk" />
        </Badge>
      </IconButton>
    </Fab>
  );
};

export default FloatingCart;
