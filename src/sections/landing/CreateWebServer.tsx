"use client";
import { useState  } from 'react';
//import Link from 'next/link';
//import { useSession } from 'next-auth/react';
import { fetcher } from 'utils/axios';
//import { FormEvent } from 'react';
//import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import axios from 'axios';
//import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
//import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
//import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
//import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

// PROJECT IMPORTS
//import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { preload } from 'swr';
//import Box from '@mui/material/Box';

// ASSETS
//import { Eye, EyeSlash } from 'iconsax-react';
//import useScriptRef from 'hooks/useScriptRef';
/*
interface CreateNewAppProps {
  providers: any; // Replace `any` with the appropriate type if you know it
  csrfToken: string; // Assuming csrfToken is a string, you can adjust this type if needed
}
*/

const CreateWS = () => {
  
  //const scriptedRef = useScriptRef();
  //const [checked, setChecked] = useState(false);
  //const { data: session } = useSession();
  const [showPassword] = useState(false);
  const [selectedImage] = useState<string | null>(null); // State for image preview
  

  return (
    <Formik
      initialValues={{
        ws_name: '',
        ws_ftpHost: '',
        ws_ftpUsername: '',
        ws_ftpPwd: '',
        ws_ftpPort: '',
        ws_webFolderName: '',
        ws_sshHost: '',
        ws_sshUsername: '',
        ws_sshPwd:'',
        ws_sshPort:'',
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const data = new FormData();
          data.append('Web-Server Name', values.ws_name);
          data.append('webServer_ftpHost', values.ws_ftpHost);
          data.append('FTP UserName.', values.ws_ftpUsername);
          data.append('FTP Password', values.ws_ftpPwd);
          data.append('Port', values.ws_ftpPort);
          data.append('FTP Folder Name', values.ws_webFolderName);
          data.append('SSH Host', values.ws_sshHost);
          data.append('SSH Username', values.ws_sshUsername);
          data.append('SSH Password', values.ws_sshPwd);
          data.append('SSH Port', values.ws_sshPort);
          // Logo handling
          if (selectedImage) {
            const fileInput = document.querySelector<HTMLInputElement>('[name="mc_logo"]');
            const file = fileInput?.files?.[0];
            if (file) {
              data.append('Please upload Logo', file);
            }
          }

          const config = {
            method: 'post',
            url: 'https://lawonearth.co.uk/api/back-office/core/web-servers/create',
            headers: {
              'Authorization': localStorage.getItem("Authorization") || '',
              'COMPANY-CODE': process.env.COMPANY_CODE || '',
              'FRONTEND-KEY': process.env.FRONTEND_KEY || '',
              'X-Requested-With': localStorage.getItem("X-Requested-With") || ''
            },
            data: data,
          };

          const response = await axios(config);

          if (response.data.status === 'treatmentSuccess') {
            setStatus({ success: true });
            preload('api/menu/dashboard', fetcher);
          } else {
            setStatus({ success: false });
            setErrors({ submit: response.data.message || 'Create failed' });
          }
        } catch (error: any) {
          setStatus({ success: false });
          setErrors({ submit: error.message || 'An error occurred' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="create-app">Application Name</InputLabel>
                  <OutlinedInput
                    id="create app"
                    type="text"
                    value={values.ws_name}
                    name="mc_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="What is your WebServer Name?"
                    fullWidth
                    error={Boolean(touched.ws_name && errors.ws_name)}
                  />
                  {touched.ws_name && errors.ws_name && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.ws_name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">FTP Host</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="linked-email"
                    type="text"
                    value={values.ws_ftpHost}
                    name="linkedEmail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Example:ftp-ltm9373.alwaysdata.net"
                    error={Boolean(touched.ws_ftpHost && errors.ws_ftpHost)}
                  />
                  {touched.ws_ftpHost && errors.ws_ftpHost && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_ftpHost}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">User Name in FTP</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_ftpUsername && errors.ws_ftpUsername)}
                    id="linked-phone"
                    type="text"
                    value={values.ws_ftpUsername}
                    name="linkedPhone"
                    onBlur={handleBlur}
                    onChange={handleChange}

                    placeholder="Enter FTP username"
                  />
                  {touched.ws_ftpUsername && errors.ws_ftpUsername && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_ftpUsername}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">FTP Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_ftpPwd && errors.ws_ftpPwd)}
                    id="Service-Domain"
                    type="text"
                    value={values.ws_ftpPwd}
                    name="serviceDomain"
                    onBlur={handleBlur}
                    onChange={handleChange}

                    placeholder="Enter password"
                  />
                  {touched.ws_ftpPwd && errors.ws_ftpPwd && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_ftpPwd}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Port</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_ftpPort && errors.ws_ftpPort)}
                    id="Route53"
                    type={showPassword ? 'text' : 'password'}
                    value={values.ws_ftpPort}
                    name="route53"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Port (21)"
                  />
                  {touched.ws_ftpPort && errors.ws_ftpPort && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_ftpPort}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">FTP folder name</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_webFolderName && errors.ws_webFolderName)}
                    id="default-design"
                    type="text"
                    value={values.ws_webFolderName}
                    name="defaultDesign"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Default is (www)"
                  />
                  {touched.ws_webFolderName && errors.ws_webFolderName && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_webFolderName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">SSH Host</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_sshHost && errors.ws_sshHost)}
                    id="State"
                    type="text"
                    value={values.ws_sshHost}
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter SSH Host Example: ssh-ltm9373.alwaysdata.net"
                  />
                  {touched.ws_sshHost && errors.ws_sshHost && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_sshHost}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">SSH Username</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_sshUsername && errors.ws_sshUsername)}
                    id="State"
                    type="text"
                    value={values.ws_sshUsername}
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter SSH Host Username"
                  />
                  {touched.ws_sshUsername && errors.ws_sshUsername && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_sshUsername}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">SSH Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_sshPwd && errors.ws_sshPwd)}
                    id="State"
                    type="text"
                    value={values.ws_sshPwd}
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter SSH Host Password"
                  />
                  {touched.ws_sshPwd && errors.ws_sshPwd && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_sshPwd}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">SSH Port</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ws_sshPort && errors.ws_sshPort)}
                    id="State"
                    type="text"
                    value={values.ws_sshPort}
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter SSH Port (default:22)"
                  />
                  {touched.ws_sshPort && errors.ws_sshPort && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.ws_sshPort}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

            {/* Other fields and submit button */}

            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </AnimateButton>
            </Grid>


            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  
                  variant="contained"
                  color="primary"
                >
                  Deploy
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateWS;

/*

"use client";
import { useState, SyntheticEvent } from 'react';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { fetcher } from 'utils/axios';
import { FormEvent } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';

import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import axios from 'axios';
import FormData from 'form-data';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { preload } from 'swr';

// ASSETS
import { Data, Eye, EyeSlash } from 'iconsax-react';
import useScriptRef from 'hooks/useScriptRef';


const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      // Example: Upload the image to a server
      const formData = new FormData();
      formData.append('file', event.target.files[0]); // Ensure that event.target.files[0] is a file object
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Image uploaded successfully!');
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  


const CreateWL = ({ providers, csrfToken }: any) => {
    // @ts-ignore
    
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
          
          mc_name: '',
          mc_email: '',
          mc_phone: '',
          mc_domainKey: '',
          mc_route53Key: '',
          fc_data: '',
          s_code: '',
          mc_logo: '',
          // (TODO) in future dom_codes+s_codes 
          submit: null,
        }}

        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const data = new FormData();
            data.append('Application Name', values.mc_name);
            data.append('Linked Email', values.mc_email);
            data.append('Phone No.', values.mc_phone);
            data.append('Domain of Service', values.mc_domainKey);
            data.append('Route53 Key for Deployment', values.mc_route53Key);
            data.append('default design', values.fc_data);
            data.append('State of Origin', values.s_code);
            data.append('Please upload Logo', values.mc_logo);

            
            const config = {
              method: 'post',
              url: 'https://lawonearth.co.uk/api/back-office/core/apps/create',
              headers: {
                'Authorization' : localStorage.getItem("Authorization"),
                'COMPANY-CODE' : process.env.COMPANY_CODE,
                'FRONTEND-KEY' : process.env.FRONTEND_KEY,
                'X-Requested-With' : localStorage.getItem("X-Requested-With")
              },
              
              data: data,
            };
  
            const response = await axios(config);
  
  
            if (response.data.status === 'treatmentSuccess') {
              setStatus({ success: true });
              preload('api/menu/dashboard', fetcher);
            } else {
              setStatus({ success: false });
              setErrors({ submit: response.data.message || 'Create failed' });
            }
          } catch (error: any) {
            setStatus({ success: false });
            setErrors({ submit: error.message || 'An error occurred' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="create-app">Application Name</InputLabel>
                  <OutlinedInput
                    id="create app"
                    type="app"
                    value={values.mc_name}
                    name="mc_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="What is your App Name?"
                    fullWidth
                    error={Boolean(touched.mc_name && errors.mc_name)}
                  />
                  {touched.mc_name && errors.mc_name && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.mc_name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Linked Email</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.mc_email && errors.mc_email)}
                    id="linked-email"
                    type={showPassword ? 'text' : 'password'}
                    value={values.mc_email}
                    name="linkedEmail"
                    onBlur={handleBlur}
                    onChange={handleChange}

                    placeholder="Enter Comapny email"
                  />
                  {touched.mc_email && errors.mc_email && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.mc_email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Company Phone</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.mc_phone && errors.mc_phone)}
                    id="linked-phone"
                    type={showPassword ? 'text' : 'password'}
                    value={values.mc_phone}
                    name="linkedPhone"
                    onBlur={handleBlur}
                    onChange={handleChange}

                    placeholder="Enter Phone Number"
                  />
                  {touched.mc_phone && errors.mc_phone && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.mc_phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Domain of Service</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.mc_domainKey && errors.mc_domainKey)}
                    id="Service-Domain"
                    type={showPassword ? 'text' : 'password'}
                    value={values.mc_domainKey}
                    name="serviceDomain"
                    onBlur={handleBlur}
                    onChange={handleChange}

                    placeholder="Enter Domain of Service"
                  />
                  {touched.mc_domainKey && errors.mc_domainKey && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.mc_domainKey}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Deployment Route53 Key</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.mc_route53Key && errors.mc_route53Key)}
                    id="Route53"
                    type={showPassword ? 'text' : 'password'}
                    value={values.mc_route53Key}
                    name="route53"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle Key's visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter Route 53 Key"
                  />
                  {touched.mc_route53Key && errors.mc_route53Key && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.mc_route53Key}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Default Design Key</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fc_data && errors.fc_data)}
                    id="default-design"
                    type={showPassword ? 'text' : 'password'}
                    value={values.fc_data}
                    name="defaultDesign"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Default Design Key"
                  />
                  {touched.fc_data && errors.fc_data && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.fc_data}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Which state does your Company Located</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.s_code && errors.s_code)}
                    id="State"
                    type={showPassword ? 'text' : 'password'}
                    value={values.s_code}
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter located State"
                  />
                  {touched.s_code && errors.s_code && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.s_code}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              // image upload
             <Grid>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept='image/*' onChange={handleImageChage} />
                    <bottom type="submit"> Upload Logo</bottom>
                </form>

                {selectedImage && (
                    <div>
                    <h3>Preview:</h3>
                    <img src={selectedImage} alt="Selected" style={{ width: '200px' }} />
                    </div>
                )}

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
  
  export default CreateWL;
 */