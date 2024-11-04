'use client';
import { useState } from 'react';
import { Grid, Stack, InputLabel, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import Notification from './Notification';

const CreateWebServerForm = ({ handleNext, formData, setFormData }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showAdvanced, setShowAdvanced] = useState(false); // State to handle "Advanced Options" visibility

  const handleSubmit = () => {
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleToggleAdvanced = () => {
    setShowAdvanced(!showAdvanced); // Toggle advanced options
  };

  return (
    <Grid container spacing={3}>
      {/* Default FTP Username and Password Fields */}
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
            type="password"
            value={formData.ws_ftpPwd || ''}
            onChange={(e) => setFormData({ ...formData, ws_ftpPwd: e.target.value })}
            id="ws_ftpPwd"
            placeholder="FTP Password"
            fullWidth
            required
          />
        </Stack>
      </Grid>

      {/* Advanced Options Checkbox */}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAdvanced}
              onChange={handleToggleAdvanced}
              color="primary"
            />
          }
          label="Show Advanced Options"
        />
      </Grid>

      {/* Advanced Options: Hidden unless checkbox is checked */}
      {showAdvanced && (
        <>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>FTP Host</InputLabel>
              <TextField
                value={formData.ws_ftpHost || ''}
                onChange={(e) => setFormData({ ...formData, ws_ftpHost: e.target.value })}
                id="ws_ftpHost"
                placeholder="FTP host"
                fullWidth
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
                placeholder="Folder that keeps the docker image"
                fullWidth
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
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>SSH Password</InputLabel>
              <TextField
                type="password"
                value={formData.ws_sshPwd || ''}
                onChange={(e) => setFormData({ ...formData, ws_sshPwd: e.target.value })}
                id="ws_sshPwd"
                placeholder="Web Server SSH password"
                fullWidth
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
              />
            </Stack>
          </Grid>
        </>
      )}

      {/* Submit and Next Buttons */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleNext} variant="contained" color="primary">Next</Button>
        </Stack>
      </Grid>

      {/* Notification Component */}
      <Notification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default CreateWebServerForm;

/*
'use client';
import { useState } from 'react';
import { Grid, Stack, InputLabel, TextField, Button } from '@mui/material';
import Notification from './Notification';

const CreateWebServerForm = ({ handleNext, formData, setFormData }: any) => {
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

export default CreateWebServerForm;
*/