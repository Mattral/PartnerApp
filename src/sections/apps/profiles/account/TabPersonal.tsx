import { useEffect, useState, ChangeEvent } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// THIRD - PARTY
import { PatternFormat } from 'react-number-format';

// PROJECT IMPORTS
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { facebookColor, linkedInColor } from 'config';

// ASSETS
import { Apple, Camera, Facebook, Google } from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';

const avatarImage = '/assets/images/users';

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

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(`${avatarImage}/default.png`);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [experience, setExperience] = useState('0');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setExperience(event.target.value);
  };

  // add api start ------------------???????????///////////---------------//////////////////////////////

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
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // Provide a fallback if needed

            const response = await fetch(`${baseUrl}/api/back-office/partner/profile`, {
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
      <Grid item xs={12} sm={6}>
        <MainCard title="Personal Information">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <FormLabel
                  htmlFor="change-avtar"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .MuiBox-root': { opacity: 1 },
                    cursor: 'pointer'
                  }}
                >
                  <Avatar alt="Avatar 1" src={avatar} sx={{ width: 76, height: 76 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }} />
                      <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                        Upload
                      </Typography>
                    </Stack>
                  </Box>
                </FormLabel>
                <TextField
                  type="file"
                  id="change-avtar"
                  placeholder="Outlined"
                  variant="outlined"
                  sx={{ display: 'none' }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                <TextField fullWidth defaultValue="your first name" id="personal-first-name" placeholder="First Name" autoFocus />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-first-name">Last Name</InputLabel>
                <TextField fullWidth defaultValue="your last name" id="personal-first-name" placeholder="Last Name" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-location">Country</InputLabel>
                <TextField fullWidth defaultValue="your country" id="personal-location" placeholder="Location" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-zipcode">Zipcode</InputLabel>
                <TextField fullWidth defaultValue="your zip code" id="personal-zipcode" placeholder="Zipcode" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-location">Bio</InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  defaultValue="I am an experienced blah blah with over 5 years of experience in creating intuitive, user-centric designs for both small startups and large enterprises....., I had been instrumental in helping organizations optimize their digital presence.... creating websites and applications that are not only visually appealing but also highly functional."
                  id="personal-location"
                  placeholder="Location"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-experience">Experiance</InputLabel>
                <Select fullWidth id="personal-experience" value={experience} onChange={handleChange} MenuProps={MenuProps}>
                  <MenuItem value="0">Start Up</MenuItem>
                  <MenuItem value="0.5">6 Months</MenuItem>
                  <MenuItem value="1">1 Year</MenuItem>
                  <MenuItem value="2">2 Years</MenuItem>
                  <MenuItem value="3">3 Years</MenuItem>
                  <MenuItem value="4">4 Years</MenuItem>
                  <MenuItem value="5">5 Years</MenuItem>
                  <MenuItem value="6">6 Years</MenuItem>
                  <MenuItem value="10">10+ Years</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Social Network">
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button
                    size="small"
                    startIcon={<Google variant="Bold" style={{ color: theme.palette.error.main }} />}
                    sx={{ color: theme.palette.error.main, '&:hover': { bgcolor: 'transparent' } }}
                  >
                    Google
                  </Button>
                  <Button color="error">Connect</Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button
                    size="small"
                    startIcon={<Facebook variant="Bold" style={{ color: facebookColor }} />}
                    sx={{ color: facebookColor, '&:hover': { bgcolor: 'transparent' } }}
                  >
                    Facebook
                  </Button>
                  <Typography variant="subtitle1" sx={{ color: facebookColor }}>
                    { userData.pers_fName} { userData.pers_lName}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button
                    size="small"
                    startIcon={<Apple variant="Bold" style={{ color: linkedInColor }} />}
                    sx={{ color: linkedInColor, '&:hover': { bgcolor: 'transparent' } }}
                  >
                    Apple
                  </Button>
                  <Button color="error">Connect</Button>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Contact Information">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select defaultValue="1-876">
                        <MenuItem value="91">+91</MenuItem>
                        <MenuItem value="1-671">1-671</MenuItem>
                        <MenuItem value="36">+36</MenuItem>
                        <MenuItem value="225">(255)</MenuItem>
                        <MenuItem value="39">+39</MenuItem>
                        <MenuItem value="1-876">1-876</MenuItem>
                        <MenuItem value="7">+7</MenuItem>
                        <MenuItem value="254">(254)</MenuItem>
                        <MenuItem value="373">(373)</MenuItem>
                        <MenuItem value="1-664">1-664</MenuItem>
                        <MenuItem value="95">+95</MenuItem>
                        <MenuItem value="264">(264)</MenuItem>
                      </Select>
                      <PatternFormat
                        format="+1 (###) ###-####"
                        mask="_"
                        fullWidth
                        customInput={TextField}
                        placeholder="Phone Number"
                        defaultValue="000000"
                        onBlur={() => {}}
                        onChange={() => {}}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField type="email" fullWidth defaultValue="{ userData.email}" id="personal-email" placeholder="Email Address" />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Portfolio URL</InputLabel>
                    <TextField fullWidth defaultValue="yourWebsite.com" id="personal-url" placeholder="Portfolio URL" />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-address">Address</InputLabel>
                    <TextField
                      fullWidth
                      defaultValue="your address is not provided yet"
                      id="personal-address"
                      placeholder="Address"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
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

export default TabPersonal;
