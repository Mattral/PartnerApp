'use client';

// MATERIAL - UI
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import EditableTextSection from './EditableTextSection';
import EditableImageSection from './EditableImageSection';

// ASSETS
const featureFigma = '/assets/images/landing/feature-figma.png';
const featureComponents = '/assets/images/landing/feature-components.png';
const featureDocumentation = '/assets/images/landing/feature-documentation.png';

interface Technology {
  icon: string;
  title: string;
  description: string;
  preview: string;
}

const initialTechnologies: Technology[] = [
  {
    icon: featureFigma,
    title: 'Consult with Legal Advisor',
    description: 'Check the live preview of LoE Video Consultations. Schedule now!.',
    preview: '#'
  },
  {
    icon: featureComponents,
    title: 'Explore Legal Contents',
    description: 'Access all components of LoE in one place to make your work easier.',
    preview: '/components-overview/buttons'
  },
  {
    icon: featureDocumentation,
    title: 'Document Generation',
    description: 'Find solutions and navigate through our Service with ease.',
    preview: '#'
  }
];

const ComboPage = () => {
  const [technologies, setTechnologies] = useState<Technology[]>(initialTechnologies);
  const [open, setOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<Technology & { index?: number } | null>(null);

  const handleClickOpen = (card: Technology, index: number) => {
    setCurrentCard({ ...card, index });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCard(null);
  };

  const handleSave = () => {
    if (currentCard?.index !== undefined) {
      const updatedTechnologies = technologies.map((tech, index) =>
        index === currentCard.index ? currentCard : tech
      );
      setTechnologies(updatedTechnologies);
    }
    handleClose();
  };

  const handleDelete = (indexToDelete: number) => {
    const updatedTechnologies = technologies.filter((_, index) => index !== indexToDelete);
    setTechnologies(updatedTechnologies);
  };

  const handleAdd = () => {
    const newCard: Technology = {
      icon: featureFigma,
      title: 'New Service',
      description: 'Description of new service.',
      preview: '#'
    };
    setTechnologies([...technologies, newCard]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentCard) {
      const { name, value } = e.target;
      setCurrentCard({ ...currentCard, [name]: value });
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
                <EditableTextSection initialText="Complete Combo" variant="h2" />
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
                <EditableTextSection initialText="We cater to the needs of both Advisors and Clients, whether they are professional or students." variant="body1" />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <EditableTextSection initialText={tech.title} variant="h5" />
                      </Grid>
                      <Grid item xs={12}>
                        <EditableTextSection initialText={tech.description} variant="body1" />
                      </Grid>
                      <Grid item xs={12}>
                        <EditableImageSection initialImage={tech.icon} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          component={Link}
                          href={tech.preview}
                          target="_blank"
                          sx={{
                            fontWeight: 500,
                            bgcolor: 'secondary.light',
                            color: 'secondary.darker',
                            '&:hover': { color: 'secondary.lighter' }
                          }}
                        >
                          Reference
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => handleClickOpen(tech, index)}
                          sx={{ marginLeft: '10px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="large"
                          onClick={() => handleDelete(index)}
                          sx={{ marginLeft: '10px' }}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Card
          </Button>
        </Grid>
      </Grid>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={currentCard?.title || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={currentCard?.description || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="icon"
            label="Icon URL"
            fullWidth
            value={currentCard?.icon || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ComboPage;



/* each edit version
'use client';

// MATERIAL - UI
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
//import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import EditableTextSection from './EditableTextSection';
import EditableImageSection from './EditableImageSection';

// ASSETS
const featureFigma = '/assets/images/landing/feature-figma.png';
const featureComponents = '/assets/images/landing/feature-components.png';
const featureDocumentation = '/assets/images/landing/feature-documentation.png';

const Technologies = [
  {
    icon: featureFigma,
    title: 'Consult with Legal Advisor',
    description: 'Check the live preview of LoE Video Consultations. Schedule now!.',
    preview: '#'
  },
  {
    icon: featureComponents,
    title: 'Explore Legal Contents',
    description: 'Access all components of LoE in one place to make your work easier.',
    preview: '/components-overview/buttons'
  },
  {
    icon: featureDocumentation,
    title: 'Document Generation',
    description: 'Find solutions and navigate through our Service with ease.',
    preview: '#'
  }
];

// ==============================|| LANDING - ComboPage ||============================== //

const ComboPage = () => {
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
                <EditableTextSection initialText="Complete Combo" variant="h2" />
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
                <EditableTextSection initialText="We cater to the needs of both Advisors and Clients, whether they are professional or students." variant="body1" />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <EditableTextSection initialText={tech.title} variant="h5" />
                      </Grid>
                      <Grid item xs={12}>
                        <EditableTextSection initialText={tech.description} variant="body1" />
                      </Grid>
                      <Grid item xs={12}>
                        <EditableImageSection initialImage={tech.icon} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          component={Link}
                          href={tech.preview}
                          target="_blank"
                          sx={{
                            fontWeight: 500,
                            bgcolor: 'secondary.light',
                            color: 'secondary.darker',
                            '&:hover': { color: 'secondary.lighter' }
                          }}
                        >
                          Reference
                        </Button>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ComboPage;
*/




/*
'use client';

// MATERIAL - UI
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

// ASSETS
import { ExportSquare } from 'iconsax-react';
const featureFigma = '/assets/images/landing/feature-figma.png';
const featureComponents = '/assets/images/landing/feature-components.png';
const featureDocumentation = '/assets/images/landing/feature-documentation.png';

const Technologies = [
  {
    icon: featureFigma,
    title: 'Consult with Legal Advisor',
    description: 'Check the live preview of LoE Video Consultations. Schedule now!.',
    preview: '#'
  },
  {
    icon: featureComponents,
    title: 'Explore Legal Contents',
    description: 'Access all components of LoE in one place to make your work easier.',
    preview: '/components-overview/buttons'
  },
  {
    icon: featureDocumentation,
    title: 'Document Generation',
    description: 'Find solutions and navigate through our Service with ease.',
    preview: '#'
  }
];

// ==============================|| LANDING - ComboPage ||============================== //

const ComboPage = () => {
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
                <Typography variant="h2">Complete Combo</Typography>
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
                <Typography>
                  We caters to the needs of both Advisors and Clients, whether they are professional or students.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h5">{tech.title}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CardMedia component="img" image={tech.icon} sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          startIcon={<ExportSquare />}
                          component={Link}
                          href={tech.preview}
                          target="_blank"
                          sx={{
                            fontWeight: 500,
                            bgcolor: 'secondary.light',
                            color: 'secondary.darker',
                            '&:hover': { color: 'secondary.lighter' }
                          }}
                        >
                          Reference
                        </Button>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ComboPage;
*/