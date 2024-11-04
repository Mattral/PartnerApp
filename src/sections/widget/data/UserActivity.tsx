// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Links from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
import { Clock } from 'iconsax-react';

const Avatar1 = '/assets/images/users/avatar-5.png';
const Avatar2 = '/assets/images/users/avatar-6.png';
const Avatar3 = '/assets/images/users/avatar-7.png';

// ===========================|| DATA WIDGET - USER ACTIVITY ||=========================== //

const UserActivity = () => {
  return (
    <MainCard
      title="User Activity"
      content={false}
      secondary={
        <Links component={Link} href="#" color="primary">
          View all
        </Links>
      }
    >
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Badge
                  variant="dot"
                  overlap="circular"
                  color="error"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                >
                  <Avatar alt="image" src={Avatar1} />
                </Badge>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" variant="caption" color="secondary">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="secondary">
                    now
                  </Typography>
                  <Clock size={14} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    variant="dot"
                    overlap="circular"
                    color="success"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar2} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" variant="caption" color="secondary">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="secondary">
                    2 min ago
                  </Typography>
                  <Clock size={14} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    variant="dot"
                    overlap="circular"
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar3} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" variant="caption" color="secondary">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="secondary">
                    1 day ago
                  </Typography>
                  <Clock size={14} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    variant="dot"
                    overlap="circular"
                    color="warning"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar1} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" variant="caption" color="secondary">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="secondary">
                    3 week ago
                  </Typography>
                  <Clock size={14} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default UserActivity;
