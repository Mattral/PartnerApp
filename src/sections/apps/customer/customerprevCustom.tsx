import { useState } from 'react';

// MATERIAL-UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
//import Link from '@mui/material/Link';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// THIRD-PARTY
import { PDFDownloadLink } from '@react-pdf/renderer';

// PROJECT IMPORTS
import AlertCustomerDelete from './AlertCustomerDelete';
import ListCard from './export-pdf/ListCard';

import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';

// TYPES
import { CustomerList } from 'types/customer';

// ASSETS
import { DocumentDownload, Edit, Trash } from 'iconsax-react';

interface Props {
  customer: CustomerList;
  open: boolean;
  onClose: () => void;
  editCustomer: () => void;
}

const avatarImage = '/assets/images/users';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const timeSlots = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

// ==============================|| CUSTOMER - CARD PREVIEW ||============================== //

export default function CustomerPreview({ customer, open, onClose, editCustomer }: Props) {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [serviceFeeEditOpen, setServiceFeeEditOpen] = useState(false);
  const [days, setDays] = useState<string[]>(daysOfWeek);
  const [editDaysOpen, setEditDaysOpen] = useState(false);

  const handleDaySelection = (day: string) => setSelectedDay(day);
  const handleTimeSelection = (time: string) => setSelectedTime(time);

  const handleClose = () => {
    setOpenAlert(!openAlert);
    onClose();
  };

  const handleRequest = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleServiceFeeEditOpen = () => setServiceFeeEditOpen(true);
  const handleServiceFeeEditClose = () => setServiceFeeEditOpen(false);
  const handleServiceFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => setServiceFee(parseFloat(event.target.value));

  const handleEditDaysOpen = () => setEditDaysOpen(true);
  const handleEditDaysClose = () => setEditDaysOpen(false);
  const handleDayToggle = (day: string) => {
    setDays((prevDays) => (prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]));
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={PopupTransition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiDialog-paper': { width: 1024, maxWidth: 1, m: { xs: 1.75, sm: 2.5, md: 4 } } }}
      >
        <Box id="PopupPrint" sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 1 }}>
          <DialogTitle sx={{ px: 0 }}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                    <PDFDownloadLink document={<ListCard customer={customer} />} fileName={`Customer-${customer.name}.pdf`}>
                      <Tooltip title="Export">
                        <IconButton color="secondary">
                          <DocumentDownload />
                        </IconButton>
                      </Tooltip>
                    </PDFDownloadLink>

                  </Stack>
                }
              >
                <ListItemAvatar sx={{ mr: 0.75 }}>
                  <Avatar alt={customer.name} size="lg" src={`${avatarImage}/avatar-${!customer.avatar ? 1 : customer.avatar}.png`} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">{customer.name}</Typography>}
                  secondary={<Typography color="secondary">{customer.role}</Typography>}
                />
              </ListItem>
            </List>
          </DialogTitle>
          <DialogContent dividers sx={{ px: 0 }}>
            <SimpleBar sx={{ height: 'calc(100vh - 290px)' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} xl={9}>
                  <Grid container spacing={2.25}>
                    <Grid item xs={12}>
                      <MainCard title="About me">
                        <Typography>
                          Hello, Myself {customer.name}, I’m {customer.role} in international company, {customer.about}
                        </Typography>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Education">
                        <List sx={{ py: 0 }}>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Master Degree (Year)</Typography>
                                  <Typography>2014-2017</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>Massachusetts Institute of Technology</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Bachelor (Year)</Typography>
                                  <Typography>2011-2013</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>Imperial College London</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">School (Year)</Typography>
                                  <Typography>2009-2011</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>School of London, England</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Employment">
                        <List sx={{ py: 0 }}>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Law professor (Year)</Typography>
                                  <Typography>2019-Present</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Company</Typography>
                                  <Typography>Harvard</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Law associate (Year)</Typography>
                                  <Typography>2016-2019</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Company</Typography>
                                  <Typography>LegalMe Ltd</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Tax lawyer (Year)</Typography>
                                  <Typography>2013-2016</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Company</Typography>
                                  <Typography>-</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Skills">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0 }} component="ul">
                          {customer.skills.map((skill: string, index: number) => (
                            <ListItem disablePadding key={index} sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                              <Chip color="secondary" variant="outlined" size="small" label={skill} />
                            </ListItem>
                          ))}
                        </Box>
                      </MainCard>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                  <MainCard>
                    <Stack spacing={2}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Service Fee per Minute</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="h6">${serviceFee}</Typography>
                          <Button variant="outlined" size="small" onClick={handleServiceFeeEditOpen}>
                            Edit
                          </Button>
                        </Stack>
                      </Stack>

                      <Stack spacing={0.5}>
                        <Typography color="secondary">Select Day</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {days.map((day) => (
                            <Button
                              key={day}
                              variant={selectedDay === day ? 'contained' : 'outlined'}
                              onClick={() => handleDaySelection(day)}
                              sx={{ mb: 1 }}
                            >
                              {day}
                            </Button>
                          ))}
                          <Button variant="outlined" size="small" onClick={handleEditDaysOpen}>
                            Edit Days
                          </Button>
                        </Stack>
                      </Stack>

                      <Stack spacing={0.5}>
                        <Typography color="secondary">Select Time</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? 'contained' : 'outlined'}
                              onClick={() => handleTimeSelection(time)}
                              sx={{ mb: 1 }}
                            >
                              {time}
                            </Button>
                          ))}
                        </Stack>
                      </Stack>
                      <Stack spacing={2}>
                        <Button variant="contained" onClick={handleRequest}>
                          Request
                        </Button>
                      </Stack>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            </SimpleBar>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <AlertCustomerDelete id={customer.id!} title={customer.name} open={openAlert} handleClose={handleClose} />

      <Dialog open={serviceFeeEditOpen} onClose={handleServiceFeeEditClose}>
        <DialogTitle>Edit Service Fee</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Service Fee per Minute"
            value={serviceFee}
            onChange={handleServiceFeeChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleServiceFeeEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleServiceFeeEditClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDaysOpen} onClose={handleEditDaysClose}>
        <DialogTitle>Edit Days</DialogTitle>
        <DialogContent>
          <Typography>Select days to enable or disable:</Typography>
          {daysOfWeek.map((day) => (
            <Stack key={day} direction="row" alignItems="center" spacing={1}>
              <Typography>{day}</Typography>
              <Button
                variant={days.includes(day) ? 'contained' : 'outlined'}
                onClick={() => handleDayToggle(day)}
                sx={{ mb: 1 }}
              >
                {days.includes(day) ? 'Disable' : 'Enable'}
              </Button>
            </Stack>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDaysClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Schedule request sent
        </Alert>
      </Snackbar>
    </>
  );
}
