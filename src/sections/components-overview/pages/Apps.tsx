'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Slider from 'react-slick';
import FadeInWhenVisible from './Animation';

const initialTechnologies = [
  {
    image: '/assets/images/landing/feature-figma.png',
    title: 'Chat',
    description: 'Power your web apps with the chat app of Law on Earth, send documents and even active before, during and after meeting sessions '
  },
  {
    image: '/assets/images/landing/feature-components.png',
    title: 'Video Call App',
    description: 'Schedule, Request, Add New Session, and Record pages makes your advisor journey complete.'
  },
  {
    image: '/assets/images/landing/feature-documentation.png',
    title: 'Legal Document Generation',
    description: 'Compose Legal Documents, Detailed Inbox pages well suited for any case based on your needs.'
  },
  {
    image: '/assets/images/landing/feature-documentation.png',
    title: 'User Management',
    description: 'Detailed pages for User Management like Profile settings, role assigning, account settings, user management and more to explore.'
  }
];

const AppsPage = () => {
  const theme = useTheme();
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setTitle(technologies[index].title);
    setDescription(technologies[index].description);
    setImage(technologies[index].image);
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      const updatedTechnologies = [...technologies];
      updatedTechnologies[editIndex] = { title, description, image: image || '' };
      setTechnologies(updatedTechnologies);
      setEditIndex(null);
      setTitle('');
      setDescription('');
      setImage(null);
    }
  };

  const handleDeleteClick = () => {
    if (editIndex !== null) {
      const updatedTechnologies = [...technologies];
      updatedTechnologies.splice(editIndex, 1);
      setTechnologies(updatedTechnologies);
      setEditIndex(null);
    }
  };

  const handleAddClick = () => {
    const newTechnology = { title, description, image: image || '' };
    setTechnologies([...technologies, newTechnology]);
    setTitle('');
    setDescription('');
    setImage(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ pt: { md: 10, xs: 2.5 }, pb: { md: 10, xs: 2.5 } }}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  White Labeled Apps
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Each App is carefully crafted to achieve the best feature rich working concept for your project
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Grid container spacing={2.5} alignItems="center">
                  {technologies.map((tech, index) => (
                    <Grid item xs={12} key={index}>
                      <FadeInWhenVisible>
                        <Tooltip title="Click to edit" placement="top">
                          <Button
                            onClick={() => handleEditClick(index)}
                            sx={{
                              padding: 4,
                              borderRadius: 1.5,
                              background: theme.palette.secondary.lighter + 20,
                              boxShadow: theme.customShadows.z1
                            }}
                            variant="light"
                          >
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Typography variant="h4" color="white">
                                  {tech.title}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography color="white">{tech.description}</Typography>
                              </Grid>
                            </Grid>
                          </Button>
                        </Tooltip>
                      </FadeInWhenVisible>
                    </Grid>
                  ))}
                  {technologies.length < initialTechnologies.length && (
                    <Grid item xs={12}>
                      <Button
                        onClick={handleAddClick}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        Add
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Slider {...settings}>
                  {technologies.map((tech, index) => (
                    <Box key={index} sx={{ width: '100%', textAlign: 'center' }}>
                      <CardMedia component="img" image={tech.image} sx={{ width: '100%' }} />
                    </Box>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={editIndex !== null} onClose={() => setEditIndex(null)}>
        <DialogTitle>Edit Technology</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="contained" sx={{ mt: 2 }}>
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {image && (
            <CardMedia component="img" image={image} sx={{ width: '100%', mt: 2 }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditIndex(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="error">
            Delete
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppsPage;




/*Version2
'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slider from 'react-slick';
import FadeInWhenVisible from './Animation';

const initialTechnologies = [
  {
    image: '/assets/images/landing/feature-figma.png',
    title: 'Chat',
    description: 'Power your web apps with the chat app of Law on Earth, send documents and even active before, during and after meeting sessions '
  },
  {
    image: '/assets/images/landing/feature-components.png',
    title: 'Video Call App',
    description: 'Schedule, Request, Add New Session, and Record pages makes your advisor journey complete.'
  },
  {
    image: '/assets/images/landing/feature-documentation.png',
    title: 'Legal Document Generation',
    description: 'Compose Legal Documents, Detailed Inbox pages well suited for any case based on your needs.'
  },
  {
    image: '/assets/images/landing/feature-documentation.png',
    title: 'User Management',
    description: 'Detailed pages for User Management like Profile settings, role assigning, account settings, user management and more to explore.'
  }
];

const AppsPage = () => {
  const theme = useTheme();
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [selectedTechIndex, setSelectedTechIndex] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // @ts-ignore
  const handleChange = (index: number) => {
    setSelectedTechIndex(index);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setTitle(technologies[index].title);
    setDescription(technologies[index].description);
    setImage(technologies[index].image);
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      const updatedTechnologies = [...technologies];
      updatedTechnologies[editIndex] = { title, description, image: image || '' };
      setTechnologies(updatedTechnologies);
      setEditIndex(null);
      setTitle('');
      setDescription('');
      setImage(null);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ pt: { md: 10, xs: 2.5 }, pb: { md: 10, xs: 2.5 } }}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  White Labeled Apps
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Each App is carefully crafted to achieve the best feature rich working concept for your project
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Grid container spacing={2.5} alignItems="center">
                  {technologies.map((tech, index) => (
                    <Grid item xs={12} key={index}>
                      <FadeInWhenVisible>
                        <Button
                          onClick={() => handleEditClick(index)}
                          sx={{
                            padding: 4,
                            borderRadius: 1.5,
                            background: theme.palette.secondary.lighter + 20,
                            boxShadow: theme.customShadows.z1
                          }}
                          variant="light"
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Typography variant="h4" color="white">
                                {tech.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography color="white">{tech.description}</Typography>
                            </Grid>
                          </Grid>
                        </Button>
                      </FadeInWhenVisible>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Slider {...settings}>
                  {technologies.map((tech, index) => (
                    <Box key={index + selectedTechIndex} sx={{ width: '100%', textAlign: 'center' }}>
                      <CardMedia component="img" image={tech.image} sx={{ width: '100%' }} />
                    </Box>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={editIndex !== null} onClose={() => setEditIndex(null)}>
        <DialogTitle>Edit Technology</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="contained" sx={{ mt: 2 }}>
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {image && (
            <CardMedia component="img" image={image} sx={{ width: '100%', mt: 2 }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditIndex(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppsPage;
*/

/*
'use client';

import { useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';

// THIRD - PARTY
import Slider from 'react-slick';

// ASSETS
const featureFigma = '/assets/images/landing/feature-figma.png';
const featureComponents = '/assets/images/landing/feature-components.png';
const featureDocumentation = '/assets/images/landing/feature-documentation.png';

const Technologies = [
  {
    image: featureFigma,
    title: 'Chat',
    description: 'Power your web apps with the chat app of Law on Earth, send documents and even active before, during and after meeting sessions '
  },
  {
    image: featureComponents,
    title: 'Video Call App',
    description: 'Schedule, Request, Add New Session, and Record pages makes your advisor journey complete.'
  },
  {
    image: featureDocumentation,
    title: 'Legal Document Generation',
    description: 'Compose Legal Documents, Detailed Inbox pages well suited for any case based on your needs.'
  },
  {
    image: featureDocumentation,
    title: 'User Management',
    description: 'Detailed pages for User Management like Profile settings, role assigning, account settings, user management and more to explore.'
  }
];
// ==============================|| LANDING - AppsPage ||============================== //

const AppsPage = () => {
  const theme = useTheme();

  const [state, setState] = useState(0);

  function handleChange(value: number) {
    setState(value);
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ pt: { md: 10, xs: 2.5 }, pb: { md: 10, xs: 2.5 } }}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  White Labeled Apps
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Each App is carefully crafted to achieve the best feature rich working concept for your project
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Grid container spacing={2.5} alignItems="center">
                  {Technologies.map((tech, index) => (
                    <Grid item xs={12} key={index}>
                      <FadeInWhenVisible>
                        <Button
                          onClick={() => {
                            handleChange(index);
                          }}
                          sx={{
                            padding: 4,
                            borderRadius: 1.5,
                            background: theme.palette.secondary.lighter + 20,
                            boxShadow: theme.customShadows.z1
                          }}
                          variant="light"
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Typography variant="h4" color="white">
                                {tech.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography color="white">{tech.description}</Typography>
                            </Grid>
                          </Grid>
                        </Button>
                      </FadeInWhenVisible>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Slider {...settings}>
                  {Technologies.map((tech, index) => (
                    <Box key={index + state} sx={{ width: '100%', textAlign: 'center' }}>
                      <CardMedia component="img" image={tech.image} sx={{ width: '100%' }} />
                    </Box>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default AppsPage;
*/
