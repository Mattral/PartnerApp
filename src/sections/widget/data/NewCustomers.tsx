// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import Dot from 'components/@extended/Dot';

// ASSETS
import { Clock } from 'iconsax-react';

const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';
const Avatar4 = '/assets/images/users/avatar-4.png';
const Avatar5 = '/assets/images/users/avatar-5.png';

// ===========================|| DATA WIDGET - NEW CUSTOMERS ||=========================== //

const NewCustomers = () => (
  <MainCard title="New Customers" content={false}>
    <SimpleBar sx={{ height: 432 }}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar1} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Alex Thompson
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      Cheers!
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex' }}>
                    <Dot color="success" size={10} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar2} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Doue
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      stay hungry stay foolish!
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex' }}>
                    <Dot color="success" size={10} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar3} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Alex Thompson
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      Cheers!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={14} />
                      <Typography color="text.secondary">30 min ago</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar4} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Doue
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      stay hungry stay foolish!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={14} />
                      <Typography color="text.secondary">10 min ago</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar5} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Shirley Hoe
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      Cheers!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={14} />
                      <Typography color="text.secondary">30 min ago</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar1} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Alex Thompson
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      Cheers!
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex' }}>
                    <Dot color="success" size={10} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar2} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Doue
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      stay hungry stay foolish!
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex' }}>
                    <Dot color="success" size={10} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar3} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Alex Thompson
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      Cheers!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={14} />
                      <Typography color="text.secondary">10 min ago</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar4} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Doue
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      stay hungry stay foolish!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={14} />
                      <Typography color="text.secondary">10 min ago</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="coverimage" src={Avatar5} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Shirley Hoe
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" color="text.secondary">
                      Cheers!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={14} />
                      <Typography color="text.secondary">30 min ago</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </SimpleBar>
  </MainCard>
);

export default NewCustomers;
