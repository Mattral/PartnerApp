import React, { useState, useRef, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid to generate unique keys for each logo
import FadeInWhenVisible from './Animation';
import getCroppedImg, { Area } from './cropImage';
import Cropper from 'react-easy-crop';

const initialClients = [
  { id: uuidv4(), image: '/assets/images/landing/client-eagames.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-vodafone.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-crystal-1.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-haswent-2.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-haxter-3.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-montecito-4.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-slingshot.svg' },
  { id: uuidv4(), image: '/assets/images/landing/client-totalstudio-5.svg' }
];



const PartnerPage = () => {
  const [clients, setClients] = useState(initialClients);
  const [isEditing, setIsEditing] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<string | null>(null);
  const [trustedByText, setTrustedByText] = useState('Trusted By');
  const [descriptionText, setDescriptionText] = useState('From Startups to Fortune 500 companies suitable for everyone');
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageSrc(reader.result as string);
          setIsCropDialogOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (id: string) => {
    const newClients = clients.filter(client => client.id !== id);
    setClients(newClients);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setClients([...clients, { id: uuidv4(), image: croppedImage }]);
      setIsCropDialogOpen(false);
    }
  };

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={trustedByText}
                    onChange={(e) => setTrustedByText(e.target.value)}
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="h2" onClick={handleEditClick} sx={{ cursor: 'pointer' }}>
                    {trustedByText}
                  </Typography>
                )}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    value={descriptionText}
                    onChange={(e) => setDescriptionText(e.target.value)}
                    variant="outlined"
                  />
                ) : (
                  <Typography onClick={handleEditClick} sx={{ cursor: 'pointer' }}>
                    {descriptionText}
                  </Typography>
                )}
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {clients.map((item) => (
              <Grid item key={item.id} onMouseEnter={() => setHoverIndex(item.id)} onMouseLeave={() => setHoverIndex(null)}>
                <FadeInWhenVisible>
                  <Box sx={{ position: 'relative', width: 200, height: 100 }}>
                    <CardMedia component="img" image={item.image} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    {hoverIndex === item.id && (
                      <>
                        <IconButton color="primary" component="span" onClick={() => fileInputRef.current?.click()} sx={{ position: 'absolute', top: 0, right: 0 }}>
                          Upload
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteImage(item.id)} sx={{ position: 'absolute', top: 0, left: 0 }}>
                          Delete
                        </IconButton>
                      </>
                    )}
                  </Box>
                </FadeInWhenVisible>
              </Grid>
            ))}
            {clients.length === 0 && (
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => fileInputRef.current?.click()}>
                  Upload Image
                </Button>
              </Grid>
            )}
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </Grid>
        </Grid>
        {isEditing && (
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save Changes
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Dialog open={isCropDialogOpen} onClose={() => setIsCropDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          {imageSrc && (
            <Box sx={{ position: 'relative', width: '100%', height: 400, background: '#333' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCropDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCropSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PartnerPage;


/*
'use client';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';

const client1 = '/assets/images/landing/client-eagames.svg';
const client2 = '/assets/images/landing/client-vodafone.svg';
const client3 = '/assets/images/landing/client-crystal-1.svg';
const client4 = '/assets/images/landing/client-haswent-2.svg';
const client5 = '/assets/images/landing/client-haxter-3.svg';
const client6 = '/assets/images/landing/client-montecito-4.svg';
const client7 = '/assets/images/landing/client-slingshot.svg';
const client8 = '/assets/images/landing/client-totalstudio-5.svg';

// ==============================|| LANDING - PartnerPage ||============================== //
const PartnerPage = () => {
  const items = [
    { image: client1 },
    { image: client2 },
    { image: client3 },
    { image: client4 },
    { image: client5 },
    { image: client6 },
    { image: client7 },
    { image: client8 }
  ];
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Trusted By</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>From Startups to Fortune 500 companies suitable for everyone</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {items.map((item, index) => (
              <Grid item key={index}>
                <FadeInWhenVisible>
                  <Box
                    sx={{
                      '& img': {
                        transition: 'all 0.08s cubic-bezier(0.37, 0.24, 0.53, 0.99)',
                        filter: 'grayscale(1)',
                        opacity: 0.4,
                        cursor: 'pointer'
                      },
                      '&:hover img': {
                        filter: 'grayscale(0)',
                        opacity: 1
                      }
                    }}
                  >
                    <CardMedia component="img" image={item.image} sx={{ width: 'auto' }} />
                  </Box>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default PartnerPage;
*/