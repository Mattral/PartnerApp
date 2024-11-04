'use client';
import { FC, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import { Email, Search, CheckCircle, Cancel, Chat, RemoveCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import { DocumentDownload, Edit, Trash } from 'iconsax-react';
import DialogActions from '@mui/material/DialogActions';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';
import SimpleBar from 'components/third-party/SimpleBar';
import MainCard from 'components/MainCard';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import PdfModal from 'components/PdfModal';

interface Client {
  client: string;
  email: string;
  address: string;
  telephone: string;
}

const initialUnverifiedData: Client[] = [
  {
    client: "Alpha",
    email: "alpha@gmail.com",
    address: "123 Main Street, Springfield, IL 62701",
    telephone: "(123) 456-7890",
  },
  {
    client: "Beta",
    email: "Beta@gmail.com",
    address: "456 Elm Avenue, Oakville, CA 94577",
    telephone: "(234) 567-8901",
  },
  {
    client: "Gamma",
    email: "Gamma@gmail.com",
    address: "789 Pine Road, Maplewood, NJ 07040",
    telephone: "(345) 678-9012",
  },
  //... other unverified clients
];

const initialVerifiedData: Client[] = [
  {
    client: "Mattral",
    email: "mattral@gmail.com",
    address: "1010 somewhere, somewhere, California",
    telephone: "(456) 789-0123",
  },
  {
    client: "Ekoue",
    email: "ekoue@gmail.com",
    address: "1515 Oak Street, somewhere, California",
    telephone: "(567) 890-1234",
  },
  {
    client: "Kojo",
    email: "kojo@gmail.com",
    address: "1515 Birch Avenue, somewhere, California",
    telephone: "01234 567 890",
  },
  {
    client: "Nebula",
    email: "nebula@gmail.com",
    address: "1717 Willow Drive, somewhere, California",
    telephone: "02345 678 901",
  }
  //... other verified clients
];

const ClientList: FC = () => {
    const [unverifiedData, setUnverifiedData] = useState<Client[]>(initialUnverifiedData);
    const [verifiedData, setVerifiedData] = useState<Client[]>(initialVerifiedData);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openp, setOpenp] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    // Handle viewing client details
    const handleView = (client: Client) => {
      setSelectedClient(client);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = (url: string) => {
        setPdfUrl(url);
        setOpenp(true);
      };
    
      const handleClosePDF = () => {
        setOpenp(false);
        setPdfUrl('');
      };

  // Handle verification action (move client from unverified to verified)
  const handleVerify = (client: Client) => {
    setUnverifiedData(unverifiedData.filter((item) => item.client !== client.client));
    setVerifiedData([...verifiedData, client]);
  };

  // Handle remove verification (move client from verified to unverified)
  const handleRemoveVerify = (client: Client) => {
    setVerifiedData(verifiedData.filter((item) => item.client !== client.client));
    setUnverifiedData([...unverifiedData, client]);
  };

  // Handle cancel action for unverified (show toast notification)
  const handleCancel = (client: Client) => {
    toast.info(`Notification sent to ${client.client} to submit more documents.`);
  };

  // Handle email/chat actions (show toast notification)
  const handleMail = (client: Client) => {
    window.location.href = `mailto:${client.email}`;
  };

  const handleChat = (client: Client) => {
    toast.info(`Notification sent to ${client.client} to chat.`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Clients Management
      </Typography>

      {/* Unverified Clients */}
      <Box my={4}>
        <Typography variant="h6">Unverified Clients</Typography>
        <ClientTable
          data={unverifiedData}
          handleView={handleView}
          handleVerify={handleVerify}
          handleMail={handleMail}
          handleCancel={handleCancel}
          isVerified={false}
        />
      </Box>

      {/* Verified Clients */}
      <Box my={4}>
        <Typography variant="h6">Verified Clients</Typography>
        <ClientTable
          data={verifiedData}
          handleView={handleView}
          handleRemoveVerify={handleRemoveVerify}
          handleMail={handleChat}
          isVerified={true}
        />
      </Box>

      {/* Popup Dialog for Viewing Client */}
      {selectedClient && (
        //

        <>
        <Dialog
            open={open}
            TransitionComponent={PopupTransition}
            keepMounted
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
                        <Tooltip title="Other">
                        <IconButton color="secondary">
                            <Edit />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Close" onClick={handleClose}>
                        <IconButton color="error">
                            <Trash />
                        </IconButton>
                        </Tooltip>
                    </Stack>
                    }
                >
                    <ListItemAvatar sx={{ mr: 0.75 }}>
                    <Avatar alt="User Image" size="lg" src='/example.png' />
                    </ListItemAvatar>
                    <ListItemText
                    primary={<Typography variant="h5">{selectedClient.client}</Typography>}
                    secondary={<Typography color="secondary">Clients</Typography>}
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
                        <MainCard title="About Me">
                            <Typography>Years of Experience: 8</Typography>
                            <Typography>Address: 1234 Some Location</Typography>
                            <Typography>Phone: 999-888-777</Typography>
                        </MainCard>
                        </Grid>


                        <Grid item xs={12}>
                        <MainCard title="Employment">
                            <List sx={{ py: 0 }}>
                            <ListItem divider>
                                <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                    <Typography color="secondary">Law Professor</Typography>
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
                        <MainCard title="Additional Information">
                            <Stack spacing={1}>
                            <Typography variant="body2">Additional Notes</Typography>
                            <Typography color="secondary">
                                Any important notes will appear here if any.
                            </Typography>
                            </Stack>
                        </MainCard>
                        </Grid>
                    </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4} xl={3}>
                    <MainCard title="Uploaded Files">
                        <Stack spacing={1}>

                        <Button variant="outlined" onClick={() => handleOpen('/pdf/example.pdf')}>Document B</Button>
                        <Button variant="outlined" onClick={() => handleOpen('/pdf/example2.pdf')}>Document A</Button>

                        <PdfModal open={openp} onClose={handleClosePDF} pdfUrl={pdfUrl} />
                        </Stack>
                        
                    </MainCard>

                    <MainCard title="Preferred Currency">
                        <Stack spacing={1}>
                        <Button variant="outlined">USD</Button>
                        <Button variant="outlined">AUD</Button>
                        </Stack>

                    </MainCard>
                    </Grid>
                </Grid>
                </SimpleBar>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={() => handleVerify(selectedClient)}>Approve</Button>
                <Button variant="outlined" color="error" onClick={handleClose}>Deny</Button>
            </DialogActions>
            </Box>
        </Dialog>

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Approved successfully!
            </Alert>
        </Snackbar>
        </>


      )}
    </Box>
  );
};

interface ClientTableProps {
  data: Client[];
  handleView: (client: Client) => void;
  handleVerify?: (client: Client) => void;
  handleRemoveVerify?: (client: Client) => void;
  handleMail: (client: Client) => void;
  handleCancel?: (client: Client) => void;
  isVerified: boolean;
}

const ClientTable: FC<ClientTableProps> = ({ data, handleView, handleVerify, handleRemoveVerify, handleMail, handleCancel, isVerified }) => (
  <TableContainer component={Paper}>
    <Table>
      <caption>List of Clients</caption>
      <TableHead>
        <TableRow>
          <TableCell>S/N</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Telephone</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.client}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.telephone}</TableCell>
            <TableCell>
              <Tooltip title="View">
                <IconButton color="primary" onClick={() => handleView(item)}>
                  <Search />
                </IconButton>
              </Tooltip>
              {isVerified ? (
                <>
                  <Tooltip title="Remove Verify">
                    <IconButton color="secondary" onClick={() => handleRemoveVerify!(item)}>
                      <RemoveCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chat">
                    <IconButton color="default" onClick={() => handleMail(item)}>
                      <Chat />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Verify">
                    <IconButton color="success" onClick={() => handleVerify!(item)}>
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Direct Mail">
                    <IconButton color="secondary" onClick={() => handleMail(item)}>
                      <Email />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton color="default" onClick={() => handleCancel!(item)}>
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ClientList;