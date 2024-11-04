/*'use client';
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
  Button,
} from '@mui/material';
import { Email, Search, CheckCircle, Cancel, Chat, RemoveCircle } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerPreview from './CustomerPreview';


interface Client {
  client: string;
  email: string;
  address: string;
  telephone: string;
  firstName: string;  // Add missing properties
  lastName: string;   // Add missing properties
  avatar?: any;    // Optional avatar
  // Add other missing fields from CustomerList here
}

const initialUnverifiedData: Client[] = [
  {
    client: 'Alpha',
    email: 'alpha@gmail.com',
    address: '123 Main Street, Springfield, IL 62701',
    telephone: '(123) 456-7890',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',   // Add missing properties
    avatar: 'Alpha',  
  },
  {
    client: 'Beta',
    email: 'Beta@gmail.com',
    address: '456 Elm Avenue, Oakville, CA 94577',
    telephone: '(234) 567-8901',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',   // Add missing properties
    avatar: 'Alpha', 
  },
  {
    client: 'Gamma',
    email: 'Gamma@gmail.com',
    address: '789 Pine Road, Maplewood, NJ 07040',
    telephone: '(345) 678-9012',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',   // Add missing properties
    avatar: 'Alpha',  
  },
];

const initialVerifiedData: Client[] = [
  {
    client: 'Mattral',
    email: 'mattral@gmail.com',
    address: '1010 Somewhere, Somewhere, CA',
    telephone: '(456) 789-0123',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',   // Add missing properties
    avatar: 'Alpha',  
  },
  {
    client: 'Ekoue',
    email: 'ekoue@gmail.com',
    address: '1515 Oak Street, Somewhere, CA',
    telephone: '(567) 890-1234',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',   // Add missing properties
    avatar: 'Alpha',  
  },
  {
    client: 'Kojo',
    email: 'kojo@gmail.com',
    address: '1515 Birch Avenue, Somewhere, CA',
    telephone: '01234 567 890',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',  // Add missing properties
    avatar: 'Alpha',  
  },
  {
    client: 'Nebula',
    email: 'nebula@gmail.com',
    address: '1717 Willow Drive, Somewhere, CA',
    telephone: '02345 678 901',
    firstName: 'Alpha',  // Add missing properties
    lastName: 'Alpha',   // Add missing properties
    avatar: 'Alpha', 
  },
];

const ClientList: FC = () => {
  const [unverifiedData, setUnverifiedData] = useState<Client[]>(initialUnverifiedData);
  const [verifiedData, setVerifiedData] = useState<Client[]>(initialVerifiedData);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVerify = (client: Client) => {
    setUnverifiedData(unverifiedData.filter((item) => item.client !== client.client));
    setVerifiedData([...verifiedData, client]);
  };

  const handleRemoveVerify = (client: Client) => {
    setVerifiedData(verifiedData.filter((item) => item.client !== client.client));
    setUnverifiedData([...unverifiedData, client]);
  };

  const handleCancel = (client: Client) => {
    toast.info(`Notification sent to ${client.client} to submit more documents.`);
  };

  const handleMail = (client: Client) => {
    window.location.href = `mailto:${client.email}`;
  };

  const handleChat = (client: Client) => {
    toast.info(`Notification sent to ${client.client} to chat.`);
  };

  return (
    <Box>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Clients Management
      </Typography>

      <Box my={4}>
        <Typography variant="h6">Unverified Advisors</Typography>
        <ClientTable
          data={unverifiedData}
          handleView={handleView}
          handleVerify={handleVerify}
          handleMail={handleMail}
          handleCancel={handleCancel}
          isVerified={false}
        />
      </Box>

      <Box my={4}>
        <Typography variant="h6">Verified Advisors</Typography>
        <ClientTable
          data={verifiedData}
          handleView={handleView}
          handleRemoveVerify={handleRemoveVerify}
          handleMail={handleChat}
          isVerified={true}
        />
      </Box>

      {selectedClient && (
        <CustomerPreview client={selectedClient} open={open} onClose={handleClose} />
      )}

      {selectedClient && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Advisor Details</DialogTitle>
          <DialogContent>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{selectedClient.client}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Email: {selectedClient.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Address: {selectedClient.address}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Telephone: {selectedClient.telephone}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
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

const ClientTable: FC<ClientTableProps> = ({
  data,
  handleView,
  handleVerify,
  handleRemoveVerify,
  handleMail,
  handleCancel,
  isVerified,
}) => (
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
                    <IconButton color="secondary" onClick={() => handleRemoveVerify?.(item)}>
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
                    <IconButton color="success" onClick={() => handleVerify?.(item)}>
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Direct Mail">
                    <IconButton color="secondary" onClick={() => handleMail(item)}>
                      <Email />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton color="default" onClick={() => handleCancel?.(item)}>
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

*/


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

  // Handle viewing client details
  const handleView = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <Box>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Clients Management
      </Typography>

      <Box my={4}>
        <Typography variant="h6">Unverified Advisors</Typography>
        <ClientTable
          data={unverifiedData}
          handleView={handleView}
          handleVerify={handleVerify}
          handleMail={handleMail}
          handleCancel={handleCancel}
          isVerified={false}
        />
      </Box>

      <Box my={4}>
        <Typography variant="h6">Verified Advisors</Typography>
        <ClientTable
          data={verifiedData}
          handleView={handleView}
          handleRemoveVerify={handleRemoveVerify}
          handleMail={handleChat}
          isVerified={true}
        />
      </Box>

      {selectedClient && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Advisor Details</DialogTitle>
          <DialogContent>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{selectedClient.client}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Email: {selectedClient.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Address: {selectedClient.address}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Telephone: {selectedClient.telephone}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
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

