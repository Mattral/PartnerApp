'use client';
import { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from 'components/@extended/Avatar'; // Adjust the path if necessary
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { unverifiedData, verifiedData } from './AdvisorData'; // Adjust the path as necessary
import { Document, Page } from 'react-pdf'; // Importing the PDF components

interface Advisor {
  client: string;
  email: string;
  address: string;
  telephone: string;
  avatar?: string; // Optional property
  role?: string;   // Optional property
}

// Custom reusable table component
const AdvisorTable: FC<{
  title: string;
  data: typeof unverifiedData;
  onPreview: (advisor: typeof unverifiedData[0]) => void;
}> = ({ title, data, onPreview }) => (
  <section>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <caption>List of {title}</caption>
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
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="primary"
                    size="small"
                    onClick={() => onPreview(item)}
                  >
                    Preview
                  </Button>
                  <Button variant="contained" startIcon={<DeleteIcon />} color="error" size="small">
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </section>
);

// Preview component to display selected advisor details
const AdvisorPreviewDialog: FC<{ advisor: typeof unverifiedData[0] | null; open: boolean; onClose: () => void }> = ({ advisor, open, onClose }) => {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  if (!advisor) {
    return (
      <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: 600, maxWidth: '90%', m: 2 } }}>
        <DialogTitle>No Advisor Selected</DialogTitle>
        <DialogContent>
          <Typography>No advisor details available.</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: 600, maxWidth: '90%', m: 2 } }}>
      <DialogTitle>
        <List sx={{ width: 1, p: 0 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={advisor.client} size="lg" src={`example.png`} />
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="h5">{advisor.client}</Typography>} />
          </ListItem>
        </List>
      </DialogTitle>
      <DialogContent dividers>
        <Typography><strong>Email:</strong> {advisor.email}</Typography>
        <Typography><strong>Address:</strong> {advisor.address}</Typography>
        <Typography><strong>Telephone:</strong> {advisor.telephone}</Typography>
        <Box sx={{ mt: 2, border: '1px solid #ccc', borderRadius: 1, padding: 2 }}>
          <Typography variant="h6">Profile Document</Typography>
          <Document file="./example.pdf">
            <Page pageNumber={1} />
          </Document>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Main component
const AdvisorList: FC = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<typeof unverifiedData[0] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handlePreview = (advisor: typeof unverifiedData[0]) => {
    setSelectedAdvisor(advisor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAdvisor(null);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Advisors
      </Typography>

      {/* Unverified Advisors Table */}
      <AdvisorTable
        title="Unverified Advisors"
        data={unverifiedData}
        onPreview={handlePreview}
      />

      {/* Verified Advisors Table */}
      <AdvisorTable
        title="Verified Advisors"
        data={verifiedData}
        onPreview={handlePreview}
      />

      {/* Advisor Preview Dialog */}
      <AdvisorPreviewDialog advisor={selectedAdvisor} open={openDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default AdvisorList;

/*
'use client';
import { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from 'components/@extended/Avatar'; // Adjust the path if necessary
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { unverifiedData, verifiedData } from './AdvisorData'; // Adjust the path as necessary

interface Advisor {
  client: string;
  email: string;
  address: string;
  telephone: string;
  avatar?: string; // Optional property
  role?: string;   // Optional property
}


// Custom reusable table component
const AdvisorTable: FC<{
  title: string;
  data: typeof unverifiedData;
  onPreview: (advisor: typeof unverifiedData[0]) => void;
}> = ({ title, data, onPreview }) => (
  <section>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <caption>List of {title}</caption>
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
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="primary"
                    size="small"
                    onClick={() => onPreview(item)}
                  >
                    Preview
                  </Button>
                  <Button variant="contained" startIcon={<DeleteIcon />} color="error" size="small">
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </section>
);

// Preview component to display selected advisor details
const AdvisorPreviewDialog: FC<{ advisor: typeof unverifiedData[0] | null; open: boolean; onClose: () => void }> = ({ advisor, open, onClose }) => {
  const avatarImage = '/assets/images/users'; // Adjust the path if necessary
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  if (!advisor) {
    return (
      <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: 600, maxWidth: '90%', m: 2 } }}>
        <DialogTitle>No Advisor Selected</DialogTitle>
        <DialogContent>
          <Typography>No advisor details available.</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: 600, maxWidth: '90%', m: 2 } }}>
      <DialogTitle>
        <List sx={{ width: 1, p: 0 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={advisor.client} size="lg" src={`example.png`} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h5">{advisor.client}</Typography>}            />
          </ListItem>
        </List>
      </DialogTitle>
      <DialogContent dividers>
        <Typography><strong>Email:</strong> {advisor.email}</Typography>
        <Typography><strong>Address:</strong> {advisor.address}</Typography>
        <Typography><strong>Telephone:</strong> {advisor.telephone}</Typography>
      </DialogContent>
    </Dialog>
  );
};

// Main component
const AdvisorList: FC = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<typeof unverifiedData[0] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handlePreview = (advisor: typeof unverifiedData[0]) => {
    setSelectedAdvisor(advisor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAdvisor(null);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Advisors
      </Typography>

    
      <AdvisorTable
        title="Unverified Advisors"
        data={unverifiedData}
        onPreview={handlePreview}
      />

     
      <AdvisorTable
        title="Verified Advisors"
        data={verifiedData}
        onPreview={handlePreview}
      />

     
      <AdvisorPreviewDialog advisor={selectedAdvisor} open={openDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default AdvisorList;
*/