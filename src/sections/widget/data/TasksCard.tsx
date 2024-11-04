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
import Dot from 'components/@extended/Dot';

// ASSETS
import { TickCircle } from 'iconsax-react';

// ==============================|| DATA WIDGET - TASKS ||============================== //

const TasksCard = () => (
  <MainCard
    title="Tasks"
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
        spacing={3.5}
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
            top: 30,
            left: 34,
            width: 2,
            height: `calc(100% - 30px)`,
            bgcolor: 'divider',
            zIndex: '1'
          }
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Box sx={{ color: 'success.main', marginLeft: -0.5 }}>
                <TickCircle variant="Bold" />
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography align="left">8:50</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5" color="text.secondary">
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
              <Dot size={14} color="primary" componentDiv sx={{ mt: 0.5 }} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography align="left">Sat, 5 Mar</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5" color="text.secondary">
                    Design mobile Application
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Dot size={14} color="error" componentDiv sx={{ mt: 0.5 }} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography align="left">Sun, 17 Feb</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5" color="text.secondary">
                    <Links component={Link} href="#" underline="hover">
                      Jenny
                    </Links>{' '}
                    assign you a task{' '}
                    <Links component={Link} href="#" underline="hover">
                      Mockup Design
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
              <Dot size={14} color="warning" componentDiv sx={{ mt: 0.5 }} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography align="left">Sat, 18 Mar</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5" color="text.secondary">
                    Design logo
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Dot size={14} color="success" componentDiv sx={{ mt: 0.5 }} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography align="left">Sat, 22 Mar</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5" color="text.secondary">
                    Design mobile Application
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Dot size={14} color="secondary" componentDiv sx={{ mt: -1.5 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </MainCard>
);

export default TasksCard;
