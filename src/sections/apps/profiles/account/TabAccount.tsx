import { useEffect, useState } from 'react';

// MATERIAL - UI
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';

// STYLES & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

// ==============================|| ACCOUNT PROFILE - MY ACCOUNT ||============================== //

const TabAccount = () => {
  const [signing, setSigning] = useState('facebook');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSigning(event.target.value);
  };

  const [checked, setChecked] = useState(['sb', 'ln', 'la']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // add api start __________________/////////////????????///////////////////////////////////////

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
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // Provide a fallback if needed
            const response = await fetch(`${baseUrl}/api/auth/partner/profile`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authorizationToken}`, // Use authorization from primaryData
                'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV", // Replace with actual company code if needed
                'FRONTEND-KEY': 'XXX', // Replace with actual key if needed
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
      <Grid item xs={12}>
        <MainCard title="General Settings">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="my-account-username">Username</InputLabel>
                <TextField fullWidth defaultValue=" userData.pers_fName" id="my-account-username" placeholder="Username" autoFocus />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="my-account-email">Account Email</InputLabel>
                <TextField fullWidth defaultValue="userData.email" id="my-account-email" placeholder="Account Email" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="my-account-lang">Language</InputLabel>
                <TextField fullWidth defaultValue="English" id="my-account-lang" placeholder="Language" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="my-account-signing">Signing Using</InputLabel>
                <Select fullWidth id="my-account-signing" value={signing} onChange={handleChange} MenuProps={MenuProps}>
                  <MenuItem value="form">Basic Form</MenuItem>
                  <MenuItem value="firebase">Firebase - Auth</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="twitter">Twitter</MenuItem>
                  <MenuItem value="gmail">Gmail</MenuItem>
                  <MenuItem value="jwt">JWT</MenuItem>
                  <MenuItem value="auth0">AUTH0</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard title="Advance Settings" content={false}>
          <List sx={{ p: 0 }}>
            <ListItem divider>
              <ListItemText
                id="switch-list-label-sb"
                primary="Secure Browsing"
                secondary="Browsing Securely ( https ) when it's necessary"
              />
              <Switch
                edge="end"
                onChange={handleToggle('sb')}
                checked={checked.indexOf('sb') !== -1}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-sb'
                }}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                id="switch-list-label-ln"
                primary="Login Notifications"
                secondary="Notify when login attempted from other place"
              />
              <Switch
                edge="end"
                onChange={handleToggle('ln')}
                checked={checked.indexOf('ln') !== -1}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-ln'
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                id="switch-list-label-la"
                primary="Login Approvals"
                secondary="Approvals is not required when login from unrecognized devices."
              />
              <Switch
                edge="end"
                onChange={handleToggle('la')}
                checked={checked.indexOf('la') !== -1}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-la'
                }}
              />
            </ListItem>
          </List>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard title="Recognized Devices" content={false}>
          <List sx={{ p: 0 }}>
            <ListItem divider>
              <ListItemText primary="Cent Desktop" secondary="4351 Deans Lane, Chelmsford" />
              <Stack direction="row" alignItems="flex-start" spacing={0.75}>
                <Dot color="success" size={6} sx={{ mt: '8px !important' }} />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Active</Typography>
              </Stack>
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Imho Tablet" secondary="4185 Michigan Avenue" />
              <Stack direction="row" alignItems="flex-start" spacing={0.75}>
                <Dot color="secondary" size={6} sx={{ mt: '8px !important' }} />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Active 5 days ago</Typography>
              </Stack>
            </ListItem>
            <ListItem>
              <ListItemText primary="Albs Mobile" secondary="3462 Fairfax Drive, Montcalm" />
              <Stack direction="row" alignItems="flex-start" spacing={0.75}>
                <Dot color="secondary" size={6} sx={{ mt: '8px !important' }} />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Active 1 month ago</Typography>
              </Stack>
            </ListItem>
          </List>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Active Sessions" content={false}>
          <List sx={{ p: 0 }}>
            <ListItem divider>
              <ListItemText primary={<Typography variant="h5">Cent Desktop</Typography>} secondary="4351 Deans Lane, Chelmsford" />
              <Button>Logout</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary={<Typography variant="h5">Moon Tablet</Typography>} secondary="4185 Michigan Avenue" />
              <Button>Logout</Button>
            </ListItem>
          </List>
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained">Update Profile</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TabAccount;
