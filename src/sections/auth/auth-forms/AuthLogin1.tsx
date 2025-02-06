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
import AnimateButton from 'components/@extended/AnimateButton';
import { Eye, EyeSlash } from 'iconsax-react';
import useScriptRef from 'hooks/useScriptRef';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, IconButton } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';

// Popup and animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

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

const TitleBox = styled(DialogTitle)(({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'linear-gradient(90deg, #ffdd6b, #ffcf00, #ffe899)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  animation: `${shimmer} 3s linear infinite`,
  backgroundSize: '400% 100%',
}));

const GoldenRing = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '4px solid #ffd700',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
  animation: `${pulse} 2s ease-in-out infinite`,
});

const RadiantWarning = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255, 85, 85, 0.8) 0%, rgba(255, 140, 0, 0.7) 70%)',
  boxShadow: '0 0 30px rgba(255, 85, 85, 0.5)',
  animation: `${pulse} 2s ease-in-out infinite`,
});

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

// Popup component
const Popup = ({ open, onClose, message, authorization, success = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(authorization);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <TitleBox>
        {success ? <GoldenRing /> : <RadiantWarning />}
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
  const { setAuthData } = useAuth(); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [authorization, setAuthorization] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false); 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setKeepSignedIn(event.target.checked);
  };

  return (
    <Formik
      initialValues={{
        email: 'minhtetmyet2630@gmail.com',
        password: 'aAertyuiop@1',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });

          const data = await response.json();

          if (response.status === 200 && data.status === 'treatmentSuccess') {
            const authToken = data.data.primaryData.authorization;
            setStatus({ success: true });
            setSubmitting(false);
            setAuthData(data);
            localStorage.setItem('authData', JSON.stringify(data));
            sessionStorage.setItem('authData', JSON.stringify(data));

            setPopupMessage('Login succeeded!');
            setAuthorization(authToken);
            setShowPopup(true);

            await signIn('credentials', { redirect: false, email: values.email, password: values.password });
            window.location.href = '/dashboard/default';
          } else {
            setStatus({ success: false });
            setErrors({ submit: data.message || 'Login failed' });
            setSubmitting(false);
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: 'An error occurred during login' });
          setSubmitting(false);
          //@ts-ignore
          setPopupMessage(error.message || 'An unknown error occurred');
          setShowPopup(true);
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
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Log in
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