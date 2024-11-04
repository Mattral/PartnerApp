'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from '@mui/material';

interface Manager {
  client: string;
  email: string;
  address: string;
  telephone: string;
  sites: string;
}

const initialFormData = {
  client: '',
  email: '',
  address: '',
  telephone: '',
  sites: '',
};

const ManagerList = () => {
  const [managers, setManagers] = useState<Manager[]>([
    {
      client: 'Michel',
      email: 'michel@mail.com',
      address: '123 WOnderful Street, Springfield, IL 62701',
      telephone: '(123) 456-7890',
      sites: 'Site A',
    },
    {
      client: 'Mike',
      email: 'mike@mail.com',
      address: '456 Wonderful  Avenue, Brisbane, CA 94577',
      telephone: '(234) 567-8901',
      sites: 'Site A, Site B, Site C',
    },
    {
      client: 'Christine',
      email: 'christine@mail.com',
      address: '789 Wonderful Road, Ohio, Japan',
      telephone: '(345) 678-9012',
      sites: 'Site B, Site C',
    },
    {
      client: 'Davis',
      email: 'davis@mail.com',
      address: '1010 Wonderful Lane, Lakeside, TX 75023',
      telephone: '(456) 789-0123',
      sites: 'Site B',
    },
  ]);

  const [formData, setFormData] = useState(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(managers[index]);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      setManagers((prev) =>
        prev.map((manager, index) => (index === editingIndex ? formData : manager))
      );
    } else {
      setManagers((prev) => [...prev, { ...formData }]);
    }

    setFormData(initialFormData);
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setFormData(initialFormData);
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Managers</Typography>
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
          Add New Manager
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <caption>List of Partner Managers</caption>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Sites</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.telephone}</TableCell>
                <TableCell>{item.sites}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Editable Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingIndex !== null ? 'Edit Manager' : 'Add New Manager'}
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            name="client"
            value={formData.client}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Sites"
            name="sites"
            value={formData.sites}
            onChange={handleChange}
            margin="normal"
          />

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManagerList;
