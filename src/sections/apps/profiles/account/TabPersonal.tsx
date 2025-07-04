import { useEffect, useState, ChangeEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { Camera } from 'iconsax-react';

const avatarImage = '/assets/images/users';

const TabPersonal = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(`${avatarImage}`);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('nsw'); // defaulting to 'nsw' for now
  const [authData, setAuthData] = useState<any | null>(null);
  const [authorizationToken, setAuthorizationToken] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string | null>(null); // State to store error messages

  useEffect(() => {
    // Fetch the auth data from localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setAuthData(parsedData);

        // Extract the authorization token and store it in state
        const token = parsedData?.data?.primaryData?.authorization;
        if (token) {
          setAuthorizationToken(token);
        } else {
          console.error('Authorization token not found in auth data');
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    } else {
      console.error('No authentication data found in localStorage');
    }
  }, []);

  const handleSubmit = async () => {
    setErrorMessages(null); // Reset error messages when submitting
    if (!authorizationToken) {
      console.error('Authorization token is missing');
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('pers_fName', firstName);
    formData.append('pers_mName', ''); // Optional middle name
    formData.append('pers_lName', lastName);
    formData.append('s_code', country); // Example state or country code
    formData.append('pers_phone1', phoneNumber);
    formData.append('pers_whatsappLine', whatsapp); // Optional
    formData.append('pers_birthdate', birthDate); // In YYYY-MM-DD format

    // If there's an image to upload, append that as well
    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    try {
      const response = await fetch('https://lawonearth.co.nz/api/back-office/partner/profile/complete', {
        method: 'POST',
        headers: {
          'Authorization': `${authorizationToken}`,
          'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
          'FRONTEND-KEY': 'XXX',
        },
        body: formData, // Using FormData here
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.status === 'treatmentFailure') {
          setErrorMessages(data.data.primaryData.msg); // Show treatment failure message
        } else if (data.status === 'validationError') {
          const validationErrors = data.data.primaryData.errors;
          const errorMessage = Object.values(validationErrors).flat().join(', ');
          setErrorMessages(errorMessage); // Show validation errors
        } else {
          throw new Error('Unknown error occurred.');
        }
      } else {
        console.log('Profile updated successfully:', data);
        // Handle successful response
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessages('An error occurred while updating the profile.'); // General error message
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // FormData to handle the file upload
      const formData = new FormData();
      formData.append('avatar', file);

      // Upload the image to the server
      try {
        const response = await fetch('https://lawonearth.co.uk/api/auth/partner/update-photo', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authorizationToken}`,
            'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
            'FRONTEND-KEY': 'XXX',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        
        // Set the avatar to the uploaded image's URL
        setAvatar(data?.imageUrl); // assuming 'imageUrl' is returned in the response
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <MainCard title="Upload Avatar">
          {/* Error message display */}
          {errorMessages && (
            <Box sx={{ mb: 2 }}>
              <Typography color="error" variant="body2">
                {errorMessages}
              </Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <FormLabel
                  htmlFor="change-avatar"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .MuiBox-root': { opacity: 1 },
                    cursor: 'pointer',
                  }}
                >
                  <Avatar alt="Avatar" src={avatar} sx={{ width: 76, height: 76 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                  id="change-avatar"
                  variant="outlined"
                  sx={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>



      </Grid>
      <Grid item xs={12} sm={6}>
      <MainCard title="Personal Information">
        {/* Error message display */}
        {errorMessages && (
          <Box sx={{ mb: 2 }}>
            <Typography color="error" variant="body2">
              {errorMessages}
            </Typography>
          </Box>
        )}

          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                <TextField
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="personal-first-name"
                  placeholder="First Name"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                <TextField
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="personal-last-name"
                  placeholder="Last Name"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                <TextField
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id="personal-phone"
                  placeholder="Phone Number"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-whatsapp">WhatsApp Line</InputLabel>
                <TextField
                  fullWidth
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  id="personal-whatsapp"
                  placeholder="WhatsApp Line"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="personal-birthdate">Birth Date</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  id="personal-birthdate"
                />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>Update Profile</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TabPersonal;





/*
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
*/