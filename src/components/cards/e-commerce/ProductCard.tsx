import { useEffect, useState } from 'react';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import { useGetCart, addToCart } from 'api/cart';
import { openSnackbar } from 'api/snackbar';

// TYPES
import { SnackbarProps } from 'types/snackbar';
import { ProductCardProps } from 'types/cart';

// ASSETS
import { Heart } from 'iconsax-react';

const prodImage = '/assets/images/e-commerce';

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({
  id,
  color,
  name,
  brand,
  offer,
  isStock,
  image,
  description,
  offerPrice,
  salePrice,
  rating,
  open
}: ProductCardProps) => {
  const theme = useTheme();

  const prodProfile = image && `${prodImage}/${image}`;

  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const { cart } = useGetCart();

  const addCart = () => {
    addToCart({ id, name, image, salePrice, offerPrice, color, size: 8, quantity: 1, description }, cart.products);
    openSnackbar({
      open: true,
      message: 'Add To Cart Success',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    openSnackbar({
      open: true,
      message: 'Added to favourites',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <SkeletonProductPlaceholder />;

  return (
    <MainCard content={false} sx={{ '&:hover': { transform: 'scale3d(1.02, 1.02, 1)', transition: 'all .4s ease-in-out' } }}>
      <Box sx={{ width: 250, m: 'auto' }}>
        <CardMedia
          sx={{ height: 250, textDecoration: 'none', opacity: isStock ? 1 : 0.25 }}
          image={prodProfile}
          component={Link}
          href={`/apps/e-commerce/product-details/${id}`}
        />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%', position: 'absolute', top: 0, pt: 1.75, pl: 2, pr: 1 }}
      >
        {!isStock && <Chip variant="light" color="error" size="small" label="Sold out" />}
        {offer && <Chip label={offer} variant="combined" color="success" size="small" />}
        <IconButton color="secondary" sx={{ ml: 'auto', '&:hover': { background: 'transparent' } }} onClick={addToFavourite}>
          {wishlisted ? (
            <Heart variant="Bold" style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
          ) : (
            <Heart style={{ fontSize: '1.15rem' }} />
          )}
        </IconButton>
      </Stack>
      <Divider />
      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack>
              <Typography
                component={Link}
                href={`/apps/e-commerce/product-details/${id}`}
                color="textPrimary"
                variant="h5"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
              >
                {name}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {brand}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" rowGap={1.75}>
              <Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5">${offerPrice}</Typography>
                  {salePrice && (
                    <Typography variant="h6" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                      ${salePrice}
                    </Typography>
                  )}
                </Stack>
                <Stack direction="row" alignItems="flex-start">
                  <Rating precision={0.5} name="size-small" value={rating} size="small" readOnly />
                  <Typography variant="caption">({rating?.toFixed(1)})</Typography>
                </Stack>
              </Stack>

              <Button variant="contained" onClick={addCart} disabled={!isStock}>
                {!isStock ? 'Sold Out' : 'Add to Cart'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default ProductCard;
