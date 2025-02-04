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
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

// THIRD - PARTY
import * as Yup from 'yup';
import { Formik } from 'formik';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
//import { APP_DEFAULT_PATH } from 'config';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// TYPES
import { StringColorProps } from 'types/password';

// ASSETS
import { Eye, EyeSlash } from 'iconsax-react';
//import {  } from "@clerk/nextjs";


// ============================|| JWT - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState<StringColorProps>();
  const scriptedRef = useScriptRef();
  //const [checked, setChecked] = useState(false);
  //const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthData } = useAuth(); // Get setAuthData from context
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
        password_confirmation:'',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        pers_fName: Yup.string().max(255).required('First Name is required'),
        pers_lName: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
        password_confirmation: Yup.string().max(255).required('Password is required')
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
          //data.append('redirectUrl', '');
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.nz';  // `${baseUrl}/`

          const config = {
            method: 'post',
            url: `${baseUrl}/api/auth/core/login`,
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX', 
              'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
            },
            data: data,
          };
      
          const response = await axios(config);
      
          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            setAuthData(response.data);
            localStorage.setItem('authData', JSON.stringify(response.data));
            sessionStorage.setItem('authData', JSON.stringify(response.data));
            
            const signInResult = await signIn('credentials', {
              redirect: false, // Prevent automatic redirect and doing manual
              pers_fName: values.pers_fName,
              email: values.email,
              password: values.password,
              password_confirmation: values.password_confirmation,
              pers_lName: values.pers_lName,
              callbackUrl: '/dashboard/default'
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
                preload('api/menu/dashboard', fetcher); // Preload dashboard menu on login success
                window.location.href = '/dashboard/default'; // Manually redirect to the desired page
              }
            }
          } else {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: response.data.message || 'Login failed' });
              setSubmitting(false);
            }
          }
        } catch (error: unknown) {
          if (scriptedRef.current) {
            setStatus({ success: false });
      
            if (axios.isAxiosError(error)) {
              setErrors({ submit: error.response?.data?.message || error.message || 'An error occurred' });
            } else if (error instanceof Error) {
              setErrors({ submit: error.message });
            } else {
              setErrors({ submit: 'An unknown error occurred' });
            }
      
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname-login"
                  type="text"
                  value={values.pers_fName}
                  name="firstname"
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
                  name="lastname"
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
                  name="company"
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
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
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
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password_confirmation}
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
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  inputProps={{}}
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password_confirmation}
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
              <Typography variant="body2">
                By Signing up, you agree to our &nbsp;
                <Links variant="subtitle2" component={Link} href="#">
                  Terms of Service
                </Links>
                &nbsp; and &nbsp;
                <Links variant="subtitle2" component={Link} href="#">
                  Privacy Policy
                </Links>
              </Typography>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Create Account
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
   
  );
};

export default AuthRegister;