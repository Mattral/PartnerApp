import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';
import { facebookColor, linkedInColor } from 'config';

// ASSETS
import { Apple, Camera, Facebook, Google } from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';

const avatarImage = '/assets/images/users';

// ==============================|| USER PROFILE - TABS ||============================== //

//Todo: fetch from API 

interface Props {
  focusInput: () => void;
}

const ProfileTabs = ({ focusInput }: Props) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(`${avatarImage}/1.png`); // Todo:fetch image
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
            const response = await fetch('https://lawonearth.co.uk/api/back-office/partner/profile', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authorizationToken}`, // Use authorization from primaryData
                'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S', // Replace with actual company code if needed
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

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>();
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!userData) return <Typography>Loading...</Typography>;


  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              sx={{ transform: 'rotate(90deg)' }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem
                component={Link}
                href="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
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
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
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
                  <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
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
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{userData.pers_fName} {userData.pers_lName}</Typography> 
              <Typography color="secondary">{userData.pers_type}</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}>
              <Google variant="Bold" color={theme.palette.error.main} />
              <Facebook variant="Bold" color={facebookColor} />
              <Apple variant="Bold" color={linkedInColor} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12} sm={6} md={12}>
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
              <Typography color="secondary">Yrs of Exp</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileTabs;
