// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Links from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// ASSETS
import { Facebook, Profile, ShoppingCart, TickCircle } from 'iconsax-react';

// ==========================|| DATA WIDGET - LATEST MESSAGES ||========================== //

const LatestMessages = () => (
  <MainCard
    title="Latest Messages"
    content={false}
    secondary={
      <Links component={Link} href="#" color="primary">
        View all
      </Links>
    }
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        alignItems="center"
        sx={{
          position: 'relative',
          '&>*': {
            position: 'relative',
            zIndex: '5'
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 8,
            left: 114,
            width: 2,
            height: '100%',
            bgcolor: 'divider',
            zIndex: '1'
          }
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="caption" color="secondary">
                    2 hrs ago
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar color="info">
                    <Facebook variant="Bold" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component="div" align="left" variant="subtitle1">
                    + 1652 Followers
                  </Typography>
                  <Typography color="secondary" align="left" variant="caption">
                    You’re getting more and more followers, keep it up!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="caption" color="secondary">
                    4 hrs ago
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar color="error">
                    <ShoppingCart variant="Bold" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component="div" align="left" variant="subtitle1">
                    + 5 New Products were added!
                  </Typography>
                  <Typography color="secondary" align="left" variant="caption">
                    Congratulations!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="caption" color="secondary">
                    1 day ago
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar color="success">
                    <TickCircle variant="Bold" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component="div" align="left" variant="subtitle1">
                    Database backup completed!
                  </Typography>
                  <Typography color="secondary" align="left" variant="caption">
                    Download the{' '}
                    <Links component={Link} href="#" underline="hover">
                      latest backup
                    </Links>
                    .
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="caption" color="secondary">
                    2 day ago
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar color="primary">
                    <Profile variant="Bold" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component="div" align="left" variant="subtitle1">
                    +2 Friend Requests
                  </Typography>
                  <Typography color="secondary" align="left" variant="caption">
                    This is great, keep it up!
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

export default LatestMessages;
