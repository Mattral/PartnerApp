// MATERIAL - UI
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// ASSETS
const avatar = '/assets/images/users/customer-support-1.png';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <CardMedia component="img" image={avatar} />
      <Stack alignItems="center">
        <Typography variant="h5">Chat With AI?</Typography>
        <Typography variant="h6" color="secondary">
          Quicker Response Time
        </Typography>
      </Stack>
      <AnimateButton>
        <Button variant="shadow" size="small" component={Link} href="#" target="_blank">
          Get Support
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
