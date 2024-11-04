
'use client';
import { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import CreateWebServerForm from './CreateWebServerForm';
import CreateEmailServerForm from './CreateEmailServerForm';
import RequestEmailServerActivationOTPForm from './RequestEmailServerActivationOTPForm';
import Landing from "./Landing"
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AnimateButton from 'components/@extended/AnimateButton';

import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Partner from 'sections/landing/Partner';
import SimpleLayout from 'layout/SimpleLayout';
import Pricing1Page from 'views/price/Pricing1';
import About from 'sections/landing/About';
import FooterBlock from 'sections/landing/FB';

const steps = [
  'Create Web Server', 
  'Create Email Server', 
  'Request Email Server Activation OTP', 
  'Final Configuration and Setup'
];
const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      
      {activeStep === 0 && <CreateWebServerForm handleNext={handleNext} formData={formData} setFormData={setFormData} />}
      
     
      {activeStep === 1 && (
        <CreateEmailServerForm handleNext={handleNext} handleBack={handleBack} formData={formData} setFormData={setFormData} />
      )}
      
     
      {activeStep === 2 && (
        <RequestEmailServerActivationOTPForm handleNext={handleNext} handleBack={handleBack} formData={formData} setFormData={setFormData} />
      )}

     
      {activeStep === 3 && (
        <>
        {/* Add your final components here */}
        <Hero />
        <Apps />
        <Technologies />
        <Combo />
        <Pricing1Page />
        <About />
        <Partner />
        <FooterBlock />
        {/* Navigation Buttons */}

        <Button onClick={handleBack} variant="contained" color="primary">
          back
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          Finish
        </Button>
      </>
      )}

    </>
  );
};

export default MultiStepForm;

/*

/*

/*
'use client';

import { useState, ReactNode } from 'react';

// MATERIAL - UI
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Notification from './Notification'; // Adjust the path as needed

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// Step options
const steps = ['Create Web Server', 'Create Email Server', 'Request Email Server Activation OTP'];

const getStepContent = (
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setErrorIndex: (i: number | null) => void,
  formData: any,
  setFormData: (d: any) => void
) => {
  switch (step) {
    case 0:
      return (
        <CreateWebServerForm 
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 1:
      return (
        <CreateEmailServerForm 
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 2:
      return (
        <RequestEmailServerActivationOTPForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          formData={formData}
          setFormData={setFormData}
        />
      );
    default:
      throw new Error('Unknown step');
  }
};

// Create Web Server Form
const CreateWebServerForm = ({ handleNext, setErrorIndex, formData, setFormData }: any) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = () => {
    // Handle form submission
    // On success:
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    // On error:
    // setSnackbarMessage('Something went wrong. Please try again.');
    // setSnackbarSeverity('error');
    // setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Web Server Name</InputLabel>
          <TextField
            value={formData.ws_name || ''}
            onChange={(e) => setFormData({ ...formData, ws_name: e.target.value })}
            id="ws_name"
            placeholder="Web server name"
            fullWidth
          />
        </Stack>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>FTP Host</InputLabel>
          <TextField
            value={formData.ws_ftpHost || ''}
            onChange={(e) => setFormData({ ...formData, ws_ftpHost: e.target.value })}
            id="ws_ftpHost"
            placeholder="FTP host"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>FTP Username</InputLabel>
          <TextField
            value={formData.ws_ftpUsername || ''}
            onChange={(e) => setFormData({ ...formData, ws_ftpUsername: e.target.value })}
            id="ws_ftpUsername"
            placeholder="FTP Username"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>FTP Password</InputLabel>
          <TextField
            value={formData.ws_ftpPwd || ''}
            onChange={(e) => setFormData({ ...formData, ws_ftpPwd: e.target.value })}
            id="ws_ftpPwd"
            placeholder="FTP Password"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>FTP Port</InputLabel>
          <TextField
            value={formData.ws_ftpPort || ''}
            onChange={(e) => setFormData({ ...formData, ws_ftpPort: e.target.value })}
            id="ws_ftpPort"
            placeholder="Default is 21"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>FTP Folder</InputLabel>
          <TextField
            value={formData.ws_webFolderName || ''}
            onChange={(e) => setFormData({ ...formData, ws_webFolderName: e.target.value })}
            id="ws_webFolderName"
            placeholder="Folder that keep the docker image"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>SSH Host</InputLabel>
          <TextField
            value={formData.ws_sshHost || ''}
            onChange={(e) => setFormData({ ...formData, ws_sshHost: e.target.value })}
            id="ws_sshHost"
            placeholder="Web Server SSH Host"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>SSH Username</InputLabel>
          <TextField
            value={formData.ws_sshUsername || ''}
            onChange={(e) => setFormData({ ...formData, ws_sshUsername: e.target.value })}
            id="ws_sshUsername"
            placeholder="Web Server SSH username"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>SSH Password</InputLabel>
          <TextField
            value={formData.ws_sshPwd || ''}
            onChange={(e) => setFormData({ ...formData, ws_sshPwd: e.target.value })}
            id="ws_sshPwd"
            placeholder="Web Server SSH password"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>SSH Port</InputLabel>
          <TextField
            value={formData.ws_sshPort || ''}
            onChange={(e) => setFormData({ ...formData, ws_sshPort: e.target.value })}
            id="ws_sshPort"
            placeholder="Default is 22"
            fullWidth
            required
          />
        </Stack>
      </Grid>
      
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleNext} variant="contained" color="primary">Next</Button>
        </Stack>

      </Grid>
      <Notification 
        open={openSnackbar} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
        handleClose={handleCloseSnackbar} 
      />
    </Grid>
  );
};
  

// Create Email Server Form
const CreateEmailServerForm = ({ handleNext, handleBack, setErrorIndex, formData, setFormData }: any) => {

  // @ts-ignore
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // @ts-ignore
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // @ts-ignore
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // @ts-ignore
  const handleSubmit = () => {
    // Handle form submission
    // On success:
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    // On error:
    // setSnackbarMessage('Something went wrong. Please try again.');
    // setSnackbarSeverity('error');
    // setOpenSnackbar(true);
  };

  // @ts-ignore
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email Server Name</InputLabel>
          <TextField
            value={formData.es_name || ''}
            onChange={(e) => setFormData({ ...formData, es_name: e.target.value })}
            id="es_name"
            placeholder="Email server name"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email Server Protocol</InputLabel>
          <TextField
            value={formData.es_protocol || ''}
            onChange={(e) => setFormData({ ...formData, es_protocol: e.target.value })}
            id="es_protocol"
            placeholder="smtp is default"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email Server Encryption</InputLabel>
          <TextField
            value={formData.es_encryption || ''}
            onChange={(e) => setFormData({ ...formData, es_encryption: e.target.value })}
            id="es_encryption"
            placeholder="ssl is default"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email Server Port</InputLabel>
          <TextField
            value={formData.es_port || ''}
            onChange={(e) => setFormData({ ...formData, es_port: e.target.value })}
            id="es_port"
            placeholder="465 is default"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email server host</InputLabel>
          <TextField
            value={formData.es_host || ''}
            onChange={(e) => setFormData({ ...formData, es_host: e.target.value })}
            id="es_host"
            placeholder="Email server host"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email server Username</InputLabel>
          <TextField
            value={formData.es_username || ''}
            onChange={(e) => setFormData({ ...formData, es_username: e.target.value })}
            id="es_username"
            placeholder="Email server Username"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email server Password</InputLabel>
          <TextField
            value={formData.es_pwd || ''}
            onChange={(e) => setFormData({ ...formData, es_pwd: e.target.value })}
            id="es_pwd"
            placeholder="Email server Passoword"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Address to show the user</InputLabel>
          <TextField
            value={formData.es_fromAddress || ''}
            onChange={(e) => setFormData({ ...formData, es_fromAddress: e.target.value })}
            id="es_fromAddress"
            placeholder=" Address as the email sender"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel> Address as the email sender </InputLabel>
          <TextField
            value={formData.es_fromAddress || ''}
            onChange={(e) => setFormData({ ...formData, es_fromAddress: e.target.value })}
            id="es_fromAddress"
            placeholder="Address to show the user"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email sender name</InputLabel>
          <TextField
            value={formData.es_fromName || ''}
            onChange={(e) => setFormData({ ...formData, es_fromName: e.target.value })}
            id="es_fromName"
            placeholder="Name to show the user"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
      <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
        <Button variant="contained" color="secondary">
          Submit
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleBack} variant="contained" color="secondary">
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          Next
        </Button>
      </Stack>

    </Grid>
  </Grid>
  );
};

// Request Email Server Activation OTP Form
const RequestEmailServerActivationOTPForm = ({ handleNext, handleBack, setErrorIndex, formData, setFormData }: any) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <Stack spacing={1}>
        <InputLabel>Email Server ID Code</InputLabel>
        <TextField
          value={formData.es_code || ''}
          onChange={(e) => setFormData({ ...formData, es_code: e.target.value })}
          id="es_code"
          placeholder="Email server ID code"
          fullWidth
          required
        />
      </Stack>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Stack spacing={1}>
        <InputLabel>Email Server Activation OTP</InputLabel>
        <TextField
          value={formData.es_activationOTP || ''}
          onChange={(e) => setFormData({ ...formData, es_activationOTP: e.target.value })}
          id="es_activationOTP"
          placeholder="Email Server Activation OTP"
          fullWidth
          required
        />
      </Stack>
    </Grid>


    <Grid item xs={12}>
    <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
        <Button variant="contained" color="secondary">
          Submit
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleBack} variant="contained" color="secondary">
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          Next
        </Button>
      </Stack>

    </Grid>
  </Grid>
);

// Main Wizard Component
const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard title="Multi-Step Form">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps: { error?: boolean; optional?: ReactNode } = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for completing the setup. Will you deploy the changes?
          </Typography>
          <Stack direction="row" justifyContent="flex-end">
            <AnimateButton>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setFormData({});
                  setActiveStep(0);
                }}
                sx={{ my: 3, ml: 1 }}
              >
                Deploy
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  setFormData({});
                  setActiveStep(0);
                }}
                sx={{ my: 3, ml: 1 }}
              >
                Cancel
              </Button>
            </AnimateButton>
          </Stack>
        </>
      ) : (
        getStepContent(activeStep, handleNext, handleBack, setErrorIndex, formData, setFormData)
      )}
    </MainCard>
  );
};

export default MultiStepForm;

*/