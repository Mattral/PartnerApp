'use client';
import { useState } from 'react';
import { Grid, Stack, InputLabel, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import Notification from './Notification';

const CreateEmailServerForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showAdvanced, setShowAdvanced] = useState(false); // Toggle for advanced options

  const handleSubmit = () => {
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={3}>
      {/* Basic Fields - Only Email Username and Password */}
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel>Email Server Username</InputLabel>
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
          <InputLabel>Email Server Password</InputLabel>
          <TextField
            value={formData.es_pwd || ''}
            onChange={(e) => setFormData({ ...formData, es_pwd: e.target.value })}
            id="es_pwd"
            placeholder="Email server Password"
            fullWidth
            required
            type="password"
          />
        </Stack>
      </Grid>

      {/* Checkbox to Show Advanced Options */}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAdvanced}
              onChange={() => setShowAdvanced(!showAdvanced)}
              color="primary"
            />
          }
          label="Show Advanced Options"
        />
      </Grid>

      {/* Advanced Fields - Hidden by Default */}
      {showAdvanced && (
        <>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Email Server Protocol</InputLabel>
              <TextField
                value={formData.es_protocol || ''}
                onChange={(e) => setFormData({ ...formData, es_protocol: e.target.value })}
                id="es_protocol"
                placeholder="smtp is default"
                fullWidth
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
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Email Server Host</InputLabel>
              <TextField
                value={formData.es_host || ''}
                onChange={(e) => setFormData({ ...formData, es_host: e.target.value })}
                id="es_host"
                placeholder="Email server host"
                fullWidth
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
                placeholder="Address as the email sender"
                fullWidth
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
              />
            </Stack>
          </Grid>
        </>
      )}

      {/* Submit and Navigation Buttons */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
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

      {/* Snackbar for Notification */}
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default CreateEmailServerForm;


/*
'use client';
import { useState } from 'react';
import { Grid, Stack, InputLabel, TextField, Button } from '@mui/material';
import Notification from './Notification';

const CreateEmailServerForm = ({ handleNext, handleBack, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = () => {
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

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
export default CreateEmailServerForm;
*/