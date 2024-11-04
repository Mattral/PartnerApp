import { useState } from 'react';

// MATERIAL-UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
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
import ReactDatePicker from 'react-datepicker';


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

// ==============================|| CUSTOMER - CARD PREVIEW ||============================== //

export default function CustomerPreview({ customer, open, onClose, editCustomer }: Props) {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for date
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [serviceFeeEditOpen, setServiceFeeEditOpen] = useState(false);
  const [days, setDays] = useState<string[]>(daysOfWeek);
  const [editDaysOpen, setEditDaysOpen] = useState(false);

  const handleDaySelection = (day: string) => setSelectedDay(day);

const handleDateChange = (vdate: Date | any) => {
  if (vdate instanceof Date || vdate === null) {
    setSelectedDate(vdate);
  } else {
    console.error('Unexpected value type:', vdate);
  }
};

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
                    <Tooltip title="Edit">
                      <IconButton color="secondary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" onClick={handleClose}>
                      <IconButton color="error">
                        <Trash />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemAvatar sx={{ mr: 0.75 }}>
                  <Avatar alt={customer.name} size="lg" src={`${avatarImage}/avatar-${!customer.avatar ? 1 : customer.avatar}.png`} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">Lorum Ipsum</Typography>}
                  secondary={<Typography color="secondary">Advisor</Typography>}
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
                          Hello, I’m Advisor in an international company
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
                                  <Typography color="secondary">Master Degree</Typography>
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
                                  <Typography>2018 - Current</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Company</Typography>
                                  <Typography>London University</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Schedule">
                        <Stack spacing={1}>
                          <Typography variant="body2">Select a date:</Typography>

                          <ReactDatePicker
                            selected={selectedDate}
                            onChange={handleDateChange} // Handle null as undefined
                            selectsStart
                            placeholderText="Select Date and Time"
                            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-primary focus:border-primary"
                            showTimeSelect // Enable time selection
                            timeIntervals={15} // Time selection intervals in minutes
                            timeCaption="Time" // Caption for time selection
                            dateFormat="MMMM d, yyyy h:mm aa" // Display format for date and time
                          />
                          
                          <Typography variant="body2">Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}</Typography>
                        </Stack>
                      </MainCard>
                    </Grid>
              
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <MainCard title="File Views">
                      <Stack spacing={1}>
                        <Button variant="outlined">Document 1</Button>
                        <Button variant="outlined">Document 2</Button>
                        <Button variant="outlined">Document 3</Button>
                        <Button variant="outlined">Another Document</Button>
                      </Stack>
                    </MainCard>
                    <MainCard title="Fee">
                      <Stack spacing={1}>
                        <Button variant="outlined">5$ per min</Button>
                      </Stack>
                    </MainCard>
                </Grid>

              </Grid>
            </SimpleBar>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleRequest}>Request</Button>
            <Button variant="outlined" color="error" onClick={handleClose}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Request sent successfully!
        </Alert>
      </Snackbar>
      
    </>
  );
}
