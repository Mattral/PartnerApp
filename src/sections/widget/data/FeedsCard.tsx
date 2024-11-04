// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Links from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// ASSETS
import { DocumentText, ShoppingCart, Sms } from 'iconsax-react';

// ==============================|| DATA WIDGET - FEEDS ||============================== //

const FeedsCard = () => (
  <MainCard
    title="Feeds"
    content={false}
    secondary={
      <Links component={Link} href="#" color="primary">
        View all
      </Links>
    }
  >
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Box sx={{ position: 'relative' }}>
                <Avatar color="primary" type="filled" size="sm">
                  <Sms variant="Bold" />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="body2">
                    You have 3 pending tasks.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption" color="secondary">
                    just now
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Box sx={{ position: 'relative' }}>
                <Avatar color="error" type="filled" size="sm">
                  <ShoppingCart variant="Bold" />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="body2">
                    New order received
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption" color="secondary">
                    1 day ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Box sx={{ position: 'relative' }}>
                <Avatar color="success" type="filled" size="sm">
                  <DocumentText variant="Bold" />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="body2">
                    You have 3 pending tasks.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption" color="secondary">
                    3 week ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Box sx={{ position: 'relative' }}>
                <Avatar color="primary" type="filled" size="sm">
                  <Sms variant="Bold" />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="body2">
                    New order received
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption" color="secondary">
                    around month
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Box sx={{ position: 'relative' }}>
                <Avatar color="warning" type="filled" size="sm">
                  <ShoppingCart variant="Bold" />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="body2">
                    Order cancelled
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption" color="secondary">
                    2 month ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </MainCard>
);

export default FeedsCard;
