
'use client';
import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAuth } from './AuthContext';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import FormData from 'form-data';
import AnimateButton from 'components/@extended/AnimateButton';
import { Eye, EyeSlash } from 'iconsax-react';
import useScriptRef from 'hooks/useScriptRef';
import { fetcher } from 'utils/axios';
import { preload } from 'swr';

import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, IconButton } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';

// Keyframes for shimmer and gentle glow animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Majestic dialog styling with ethereal glow
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
    backdropFilter: 'blur(15px)',
    borderRadius: '30px',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
    animation: `${pulse} 4s ease-in-out infinite`,
    position: 'relative',
    overflow: 'hidden',
  },
}));

// Title box with shimmering gradient and gold accent
const TitleBox = styled(DialogTitle)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'linear-gradient(90deg, #ffdd6b, #ffcf00, #ffe899)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  animation: `${shimmer} 3s linear infinite`,
  backgroundSize: '400% 100%',
});

// Golden ring for success indication
const GoldenRing = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '4px solid #ffd700',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
  animation: `${pulse} 2s ease-in-out infinite`,
});

// Radiant warning icon for error
const RadiantWarning = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255, 85, 85, 0.8) 0%, rgba(255, 140, 0, 0.7) 70%)',
  boxShadow: '0 0 30px rgba(255, 85, 85, 0.5)',
  animation: `${pulse} 2s ease-in-out infinite`,
});

// Token box styling for copy functionality
const TokenBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: '12px 18px',
  borderRadius: '12px',
  marginTop: '15px',
  boxShadow: 'inset 0px 0px 15px rgba(255, 215, 0, 0.2)',
  color: theme.palette.text.primary,
  fontFamily: 'monospace',
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
  },
}));

// Majestic animated button styling
const AnimatedButton = styled(Button)({
  transition: 'transform 0.4s ease, background 0.3s',
  backgroundColor: '#ffd700',
  borderRadius: '25px',
  color: '#fff',
  fontWeight: 'bold',
  padding: '12px 40px',
  fontSize: '1rem',
  animation: `${pulse} 2.5s ease-in-out infinite`,
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: '#ffcf33',
    boxShadow: '0px 6px 30px rgba(255, 215, 0, 0.5)',
  },
});

const Popup = ({ open, onClose, message, authorization, success = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(authorization);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClose = () => {
    // Execute further actions and close the dialog
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <TitleBox>
        {success ? (
          <GoldenRing />
        ) : (
          <RadiantWarning />
        )}
        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}>
          {success ? 'Welcome!' : 'Action Required'}
        </Typography>
      </TitleBox>

      <DialogContent sx={{ padding: '35px', textAlign: 'center' }}>
        <Typography variant="body1" sx={{ fontSize: '1.15rem', color: '#555', lineHeight: 1.7 }}>
          {message}
        </Typography>

        {authorization && (
          <TokenBox onClick={handleCopyToken}>
            <Typography variant="subtitle2" sx={{ color: '#333', fontWeight: 500 }}>
              Authorization Token:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Typography variant="body2" sx={{ color: '#333', wordBreak: 'break-all' }}>
                {authorization}
              </Typography>
              <IconButton size="small" sx={{ color: '#888' }}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </Box>
            {copied && <Typography sx={{ color: '#ffd700', fontSize: '0.85rem', fontWeight: 'bold', mt: 1 }}>Copied!</Typography>}
          </TokenBox>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
        <AnimatedButton onClick={handleClose} variant="contained">
          OK
        </AnimatedButton>
      </DialogActions>
    </StyledDialog>
  );
};







const AuthLogin = ({ providers, csrfToken }: any) => {
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthData } = useAuth(); // Get setAuthData from context
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [authorization, setAuthorization] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);  // New state for "Keep me signed in"

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setKeepSignedIn(event.target.checked);  // Update "Keep me signed in" state
  };

  return (
    <Formik
      initialValues={{
        email: 'minmattral@gmail.com',
        password: 'aAertyuiop@1',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}

      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          signIn('login', { redirect: false, email: values.email, password: values.password });
          const data = new FormData();
          data.append('email', values.email);
          data.append('password', values.password);

          //data.append('redirectUrl', '');
      
          const config = {
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/login',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX', 
              //'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
            },
            data: data,
          };
      
          const response = await axios(config);
      
          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            const authToken = response.data.data.primaryData.authorization;
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher);
            setAuthData(response.data);
            localStorage.setItem('authData', JSON.stringify(response.data));
            sessionStorage.setItem('authData', JSON.stringify(response.data));
      
            setPopupMessage('Login succeeded!');
            setAuthorization(authToken);
            setShowPopup(true);
      
            preload('api/menu/dashboard', fetcher);
            await signIn('credentials', { redirect: false, email: values.email, password: values.password });
            setStatus({ success: true });
            setSubmitting(false);
            window.location.href = '/dashboard/default';

            const signInResult = await signIn('credentials', {
              redirect: false, // Prevent automatic redirect
              email: values.email,
              password: values.password,
              //callbackUrl: '/dashboard/default'
            });
      
            if (signInResult?.error) {
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: signInResult.error || 'Login failed' });
                setSubmitting(false);
              }
            } else 
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
                preload('api/menu/dashboard', fetcher); // Preload dashboard menu on login success
                window.location.href = '/dashboard/default'; // Manually redirect to the desired page
              }
            
          } else {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: response.data.message || 'Login failed' });
              setSubmitting(false);
              throw new Error(response.data.message || 'Login failed');
            }
            throw new Error(response.data.message || 'Login failed');

          }
        } catch (error) {
            setStatus({ success: false });
            setAuthorization(''); // Clear authorization on error
        
            if (axios.isAxiosError(error) && error.response) {
              const apiErrors = error.response.data;
        
              if (apiErrors.status === 'treatmentFailure') {
                // Set the specific error message from the API response
                setPopupMessage(apiErrors.data.primaryData.msg || 'An error occurred');
              } else {
                setPopupMessage('An error occurred during login');
              }
            } else if (error instanceof Error) {
              setPopupMessage(error.message);
            } else {
              setPopupMessage('An unknown error occurred');
            }
        
            setShowPopup(true);
            setSubmitting(false);
          }
        }}
      
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
          <Popup open={showPopup} onClose={() => setShowPopup(false)} message={popupMessage} authorization={authorization} />
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me signed in</Typography>}
                />
                <Links variant="h6" component={Link} href={session ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                  Forgot Password?
                </Links>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;


//__________________________________________________________________________________________________

/*
'use client';

import { useState, SyntheticEvent } from 'react';

// NEXT
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

import axios from 'axios';

// THIRD - PARTY
import * as Yup from 'yup';
import { Formik } from 'formik';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { fetcher } from 'utils/axios';
import useScriptRef from 'hooks/useScriptRef';

// ASSETS
import { Eye, EyeSlash } from 'iconsax-react';
import { preload } from 'swr';

// ============================|| JWT - LOGIN ||============================ //

const AuthLogin = ({ providers, csrfToken }: any) => {
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: 'info@phoenixcoded.co',
        password: '123456',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          signIn('login', { redirect: false, email: values.email, password: values.password });
          const data = new FormData();
          data.append('email', values.email);
          data.append('password', values.password);

          //data.append('redirectUrl', '');
      
          const config = {
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/login',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX', 
              //'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
            },
            data: data,
          };
          const response = await axios(config);
          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher);
          }

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher); // load menu on login success
          }
        } catch (err: any) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me sign in</Typography>}
                />
                <Links variant="h6" component={Link} href={session ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                  Forgot Password?
                </Links>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
*/