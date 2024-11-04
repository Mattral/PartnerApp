// MATERIAL - UI
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import Logo from 'components/logo';

// ASSETS
import { Facebook } from 'iconsax-react';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover, &:active': {
    color: theme.palette.primary.main
  }
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

type showProps = {
  isFull?: boolean;
};

const FooterBlock = ({ isFull }: showProps) => {
  const theme = useTheme();

  const linkSX = {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    opacity: '0.6',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  };

  return (
    <>
      <Box sx={{ pt: isFull ? 0 : 10, pb: 10 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Logo reverse to="/" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 5, md: 2 }}>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Useful Links</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="#" target="_blank" underline="none">
                        Discover lorem ipsum for Clients
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        Discover lorem ipsum for Advisors
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        How to join as an advisor
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        Help
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Help & Support</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="#" target="_blank" underline="none">
                        Address: Level 54, Lorem ipsum Street, Lorem ipsum City, Qld, 4000
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        Support & Enquiries: ****** 66 46 88
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        Email Us: hello@Loremipsum.com
                      </FooterLink>
                      
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Resources</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="#" target="_blank" underline="none">
                        Privacy Policy
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        Customer Terms
                      </FooterLink>
                      <FooterLink href="#" target="_blank" underline="none">
                        Advisor Terms
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 2.4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography>
                Copyright © 2024{' '}
                <Link href="#" underline="none">
                  {' '}
                  Lorem ipsum Pty Ltd
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                  <Link underline="none" sx={linkSX}>
                    <Facebook size="22" variant="Bulk" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FooterBlock;
