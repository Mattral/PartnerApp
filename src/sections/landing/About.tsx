
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

// ASSETS
const aboutImage = 'images/smallTalk.png';

// ==============================|| ABOUT PAGE ||============================== //

const AboutPage = () => {
  const theme = useTheme();
  const [state, setState] = useState(0);

  function handleChange(value: number) {
    setState(value);
  }

  return (
    <Box sx={{ bgcolor: 'primary.main', py: { md: 10, xs: 5 } }} >
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {/* Top heading */}
          <Grid item xs={12}>
            <Typography variant="h3" color="white" gutterBottom align="center">
              About Lorum Ipsum
            </Typography>
          </Grid>

          {/* Left side content with text */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <FadeInWhenVisible>
                  <Button
                    onClick={() => handleChange(0)} 
                    sx={{
                      padding: 4,
                      borderRadius: 1.5,
                      
                      boxShadow: theme.customShadows.z1,
                      width: '100%', // Make it full width within the container
                      display: 'block' // To avoid text from being truncated
                    }}
                    variant="light"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" color="white">
                          We believe that every human being has a right to a basic level of legal assistance and education. The hard part has been finding ways to reduce the cost of legal services and empower the public to manage their own legal needs to the extent they can.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </FadeInWhenVisible>
              </Grid>

              <Grid item xs={12}>
                <FadeInWhenVisible>
                  <Button
                    onClick={() => handleChange(1)} 
                    sx={{
                      padding: 4,
                      borderRadius: 1.5,
                      
                      boxShadow: theme.customShadows.z1,
                      width: '100%', // Make it full width within the container
                      display: 'block' // To avoid text from being truncated
                    }}
                    variant="light"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" color="white">
                        Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </FadeInWhenVisible>
              </Grid>

              <Grid item xs={12}>
                <FadeInWhenVisible>
                  <Button
                    onClick={() => handleChange(2)} 
                    sx={{
                      padding: 4,
                      borderRadius: 1.5,
                      
                      boxShadow: theme.customShadows.z1,
                      width: '100%', // Make it full width within the container
                      display: 'block' // To avoid text from being truncated
                    }}
                    variant="light"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" color="white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </FadeInWhenVisible>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side image */}
          <Grid item xs={12} md={6}>
            <FadeInWhenVisible>
              <CardMedia
                component="img"
                image={aboutImage}
                alt="About Thought Cave"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </FadeInWhenVisible>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
