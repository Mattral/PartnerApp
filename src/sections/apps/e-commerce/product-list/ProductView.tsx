// NEXT
import Image from 'next/image';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

const productImage = '/assets/images/e-commerce';

// ==============================|| PRODUCT - VIEW ||============================== //

const ProductView = ({ data }: any) => {
  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={6} sm={5} md={4} lg={3}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ bgcolor: 'secondary.200', width: '100%' }}>
                <Image
                  src={data.image && `${productImage}/${data.image}`}
                  alt="product"
                  width={400}
                  height={400}
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </Box>
              <Chip
                label={data.isStock ? 'In Stock' : 'Out of Stock'}
                color={data.isStock ? 'success' : 'error'}
                size="small"
                sx={{ position: 'absolute', right: 8, top: 8 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={1} sx={{ px: 2 }}>
              <Typography variant="h5">{data?.name}</Typography>
              <Typography color="textSecondary">{data?.about}</Typography>
              <Rating name="read-only" value={data.rating} readOnly />
              <Box sx={{ width: '80%', pt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={4} md={3}>
                    <Typography color="textSecondary">Categories</Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Stack direction="row" spacing={0.5}>
                      {data?.categories?.map((item: any, index: number) => (
                        <Typography key={index} variant="h6" sx={{ textTransform: 'capitalize' }}>
                          {item}
                          {data?.categories.length > index + 1 ? ',' : ''}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Typography color="textSecondary">Qty</Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Typography variant="h6">{data?.quantity}</Typography>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Typography color="textSecondary">Price</Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Typography variant="h5">{data?.salePrice ? `$${data?.salePrice}` : `$${data?.offerPrice}`}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default ProductView;
