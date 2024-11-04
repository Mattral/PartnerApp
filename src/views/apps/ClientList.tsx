'use client';
import { FC } from 'react';
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
} from '@mui/material';
import { Edit, Email, Chat } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Client {
  client: string;
  email: string;
  address: string;
  telephone: string;
}

const unverifiedData: Client[] = [
  { client: 'Wilson', email: 'wilson@mail.com', address: '123 Main Street, Springfield, IL 62701', telephone: '(123) 456-7890' },
  { client: 'Brown', email: 'brown@mail.com', address: '456 Elm Avenue, Oakville, CA 94577', telephone: '(234) 567-8901' },
  { client: 'Emily', email: 'emily@mail.com', address: '789 Pine Road, Maplewood, NJ 07040', telephone: '(345) 678-9012' },
  { client: 'Davis', email: 'davis@mail.com', address: '1010 Cedar Lane, Lakeside, TX 75023', telephone: '(456) 789-0123' },
  { client: 'Elizabeth', email: 'elizabeth@mail.com', address: '1313 Oak Street, Rivertown, FL 33009', telephone: '(567) 890-1234' },
  { client: 'Amelia', email: 'amelia@mail.com', address: '1515 Birch Avenue, Hillcrest, OH 43215', telephone: '01234 567 890' },
  { client: 'Olivia', email: 'olivia@mail.com', address: '1717 Willow Drive, Woodland, WA 98052', telephone: '02345 678 901' },
  { client: 'Isabella', email: 'isabella@mail.com', address: '1919 Maple Court, Parkside, CO 80203', telephone: '03456 789 012' },
  { client: 'Harris', email: 'harris@mail.com', address: '2121 Pine Street, Meadowville, NY 10001', telephone: '04567 890 123' },
  { client: 'Einstein Robinson', email: 'pillarogphysis@mail.com', address: 'somewhere nice, ETH Zurrich', telephone: '900 901 234' },
];

const verifiedData: Client[] = [...unverifiedData]; // Duplicate for dummy example, replace with real data

const ClientList: FC = () => {
  const router = useRouter();

  const handleEdit = (client: Client) => {
    console.log('Editing client:', client);
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleChat = () => {
    router.push('/apps/chat');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>

      <Box my={4}>
        <Typography variant="h6">Unverified Clients</Typography>
        <ClientTable data={unverifiedData} handleEdit={handleEdit} handleEmail={handleEmail} handleChat={handleChat} />
      </Box>

      <Box my={4}>
        <Typography variant="h6">Verified Clients</Typography>
        <ClientTable data={verifiedData} handleEdit={handleEdit} handleEmail={handleEmail} handleChat={handleChat} />
      </Box>
    </Box>
  );
};

interface ClientTableProps {
  data: Client[];
  handleEdit: (client: Client) => void;
  handleEmail: (email: string) => void;
  handleChat: () => void;
}

const ClientTable: FC<ClientTableProps> = ({ data, handleEdit, handleEmail, handleChat }) => (
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
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={() => handleEdit(item)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Email">
                <IconButton color="secondary" onClick={() => handleEmail(item.email)}>
                  <Email />
                </IconButton>
              </Tooltip>
              <Tooltip title="Message">
                <IconButton color="default" onClick={handleChat}>
                  <Chat />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ClientList;
