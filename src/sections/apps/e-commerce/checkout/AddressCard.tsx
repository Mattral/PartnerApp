// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// TYPES
import { Address } from 'types/e-commerce';

// ASSETS
import { Edit } from 'iconsax-react';

// ==============================|| CHECKOUT - ADDRESS CARD ||============================== //

interface AddressCardProps {
  address: Address | null;
  change?: boolean;
  handleClickOpen?: (billingAddress: Address) => void;
  billingAddressHandler?: (billingAddress: Address) => void;
}

const AddressCard = ({ address, change, handleClickOpen, billingAddressHandler }: AddressCardProps) => {
  const theme = useTheme();

  return (
    <MainCard
      sx={{ '&:hover': { boxShadow: theme.customShadows.primary }, cursor: 'pointer' }}
      onClick={() => {
        if (billingAddressHandler && address) {
          billingAddressHandler(address);
        }
      }}
    >
      {address && (
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">{address.name}</Typography>
                <Typography color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  ({address.destination})
                </Typography>
                {address.isDefault && (
                  <Chip sx={{ color: 'primary.main', bgcolor: 'primary.lighter', borderRadius: '10px' }} label="Default" size="small" />
                )}
              </Stack>
              {change && (
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<Edit />}
                  onClick={() => {
                    if (handleClickOpen) {
                      handleClickOpen(address);
                    }
                  }}
                >
                  Change
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="body2" color="textSecondary">
                {`${address.building}, ${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.post}`}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {address.phone}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

export default AddressCard;
