// MATERIAL - UI
import { useEffect, useState } from 'react';

import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// THIRD - PARTY
import { PatternFormat } from 'react-number-format';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// ASSETS
import { CallCalling, Gps, Link1, Sms } from 'iconsax-react';

const avatarImage = '/assets/images/users';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabProfile = () => {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  // add api start

  // State to hold user profile data
  const [userData, setUserData] = useState<any | null>(null);

  // Fetching authorization data from localStorage
  const [authData, setAuthData] = useState<any | null>(null);

  useEffect(() => {
    // Retrieve auth data from localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setAuthData(parsedData);
      } catch (error) {
        console.error("Failed to parse auth data:", error);
      }
    } else {
      console.error('No authentication data found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (authData && authData.data) {
      const { primaryData } = authData.data;
      const authorizationToken = primaryData?.authorization; // Authorization token from primaryData

      // If authorization token is available, fetch user data
      if (authorizationToken) {
        const fetchUserData = async () => {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';  // `${baseUrl}/`

            const response = await fetch(`${baseUrl}/api/back-office/partner/profile`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authorizationToken}`, 
                'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S', 
                'FRONTEND-KEY': 'XXX', 
              },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data.data.primaryData.userInfos.person._person); // Update user data from API
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };

        fetchUserData();
      }
    }
  }, [authData]); // Re-run when authData is available


  // end api load

  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip label="Pro" size="small" color="primary" />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar 1" size="xl" src={`${avatarImage}/default.png`} />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{ userData.pers_fName} { userData.pers_lName}</Typography>
                      <Typography color="secondary">{userData.persType}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{userData.pers_preferredTimezone}</Typography>
                      <Typography color="secondary">TimeZone</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">40</Typography>
                      <Typography color="secondary">Project</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">10+</Typography>
                      <Typography color="secondary">Yrs. of Exp</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <Sms size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{userData.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CallCalling size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{userData.pers_phone1 || 'Number not provided'}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Gps size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">New York</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Link1 size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Link align="right" href="https://google.com" target="_blank">
                          some link here
                        </Link>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
          <MainCard title="Biography">
            <Grid container spacing={1.25}>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">John Doe</Typography>
                <Typography variant="body1">
                  I am an experienced blah blah with over 5 years of experience in creating intuitive, user-centric designs for both small startups and large enterprises....., I had been instrumental in helping organizations optimize their digital presence.... creating websites and applications that are not only visually appealing but also highly functional.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  I began my career as a newbie, learning..... while working alongside seasoned professionals. Over time, i honed my skills in areas such as .............. Throughout career, I had contributed to numerous applications, always maintaining a strong focus user experience.
                </Typography>
              </Grid>
            </Grid>
          </MainCard>

          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="About me">
              <Typography color="secondary">
              I am an experienced blah blah with over 5 years of experience in creating intuitive, user-centric designs for both small startups and large enterprises....., I had been instrumental in helping organizations optimize their digital presence.... creating websites and applications that are not only visually appealing but also highly functional.
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        <Typography>{ userData.pers_fName} { userData.pers_lName}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Mid Name</Typography>
                        <Typography>{ userData.pers_lName || "not provided"}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        <Typography>
                          (+1-876) <PatternFormat value={8654239581} displayType="text" type="text" format="#### ### ###" />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>New York</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography>{ userData.email}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography>{ userData.pers_code}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    <Typography>{userData.email_verified_at}</Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Education">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Master Degree (Year)</Typography>
                        <Typography>2014-2017</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>-</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Bachelor (Year)</Typography>
                        <Typography>2011-2013</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>Imperial College London</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">School (Year)</Typography>
                        <Typography>2009-2011</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>School of London, England</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Emplyment">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                        <Typography>2019-Current</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Job Responsibility</Typography>
                        <Typography>
                          Perform task related to project manager with the 100+ team under my observation. Team management is key role in
                          this company.
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                        <Typography>2017-2019</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Job Responsibility</Typography>
                        <Typography>Team management is key role in this company.</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TabProfile;
