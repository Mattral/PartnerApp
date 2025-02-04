
'use client';

import { useEffect, useState, SyntheticEvent } from 'react';
import useScriptRef from 'hooks/useScriptRef';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { fetcher } from 'utils/axios';
import { preload } from 'swr';
// NEXT
import Link from 'next/link';
import { signIn } from 'next-auth/react';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

// THIRD - PARTY
import * as Yup from 'yup';
import { Formik } from 'formik';

// PROJECT IMPORTS
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// TYPES
import { StringColorProps } from 'types/password';

// ASSETS
import { Eye, EyeSlash } from 'iconsax-react';

//======================== POP UP =======================//

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






// ============================|| JWT - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState<StringColorProps>();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthData } = useAuth(); // Get setAuthData from context
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [authorization, setAuthorization] = useState('');


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        pers_fName: '',
        pers_lName: '',
        email: '',
        pers_mName: '',
        password: '',
        password_confirmation: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        pers_fName: Yup.string().max(255).required('First Name is required'),
        pers_lName: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const data = new FormData();
          data.append('email', values.email);
          data.append('password', values.password);
          data.append('password_confirmation', values.password_confirmation);
          data.append('pers_fName', values.pers_fName);
          data.append('pers_mName', values.pers_mName);
          data.append('pers_lName', values.pers_lName);
          data.append('redirectUrl', 'https://temporary-umber.vercel.app/login');

          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // Provide a fallback if needed


          const config = {
            method: 'post',
            url: `${baseUrl}/api/auth/partner/register`,
            headers: {
              'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
              'FRONTEND-KEY': 'XXX',
              //'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
            },
            data: data,
          };

          const response = await axios(config);

          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            setAuthData(response.data);
            const authToken = response.data.data.primaryData.msg;

            //localStorage.setItem('authData', JSON.stringify(response.data));
            //sessionStorage.setItem('authData', JSON.stringify(response.data));

            setPopupMessage('Register succeeded!');
            setAuthorization(authToken);
            setShowPopup(true);

            const signInResult = await signIn('credentials', {
              redirect: false, // Prevent automatic redirect and doing manual
              pers_fName: values.pers_fName,
              email: values.email,
              password: values.password,
              password_confirmation: values.password_confirmation,
              pers_lName: values.pers_lName,
              redirectUrl: '/check-mail',
            });

            if (signInResult?.error) {
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: signInResult.error || 'Login failed' });
                setSubmitting(false);
              }
            } else {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
                //preload('api/menu/dashboard', fetcher); // Preload dashboard menu on login success
                window.location.href = '/check-mail'; // Manually redirect to the desired page
              }
            }
          } else {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: response.data.message || 'Login failed' });
              setSubmitting(false);
              setAuthorization(''); // Clear authorization on error
              const errors = response.data.data.primaryData.errors;
              let errorMessages = [];
              for (const field in errors) {
                  errorMessages = errorMessages.concat(errors[field]);
              }
              setPopupMessage(errorMessages.join('\n')); // Join errors into a single string
              setShowPopup(true);
            }
          }
        } catch (error) {
          setStatus({ success: false });
          setAuthorization('');
  
          if (axios.isAxiosError(error) && error.response) {
              const apiErrors = error.response.data;
  
              if (apiErrors.status === 'validationError') {
                  // Set validation error messages from the response
                  const errors = apiErrors.data.primaryData.errors;
                  let errorMessages = [];
                  for (const field in errors) {
                      errorMessages = errorMessages.concat(errors[field]);
                  }
                  setPopupMessage('Validation errors:\n' + errorMessages.join('\n'));
              } else {
                  setPopupMessage('An error occurred during registration');
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
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname-login"
                  type="text"
                  value={values.pers_fName}
                  name="pers_fName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                  error={Boolean(touched.pers_fName && errors.pers_fName)}
                />
                {touched.pers_fName && errors.pers_fName && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.pers_fName}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.pers_lName && errors.pers_lName)}
                  id="lastname-signup"
                  type="text"
                  value={values.pers_lName}
                  name="pers_lName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Doe"
                  inputProps={{}}
                />
                {touched.pers_lName && errors.pers_lName && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.pers_lName}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="company-signup">Middle Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.pers_mName && errors.pers_mName)}
                  id="company-signup"
                  type="text"
                  value={values.pers_mName}
                  name="pers_mName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="..."
                  inputProps={{}}
                />
                {touched.pers_mName && errors.pers_mName && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.pers_mName}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="demo@company.com"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Confirm Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password_confirmation}
                  name="password_confirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="******"
                  inputProps={{}}
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password_confirmation}
                  </FormHelperText>
                )}
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
                  Create Account
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Typography component="span" variant="body2">
                Already have an account?{' '}
                <Link href="/login" passHref>
                  <Links variant="subtitle2" color="secondary">
                    Sign in
                  </Links>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthRegister;
