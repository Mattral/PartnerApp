'use client';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

// THIRD - PARTY
import { motion } from 'framer-motion';
import { useState } from 'react';

// ASSETS
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| LANDING - HeaderPage ||============================== //

const HeaderPage = () => {
  const theme = useTheme();
  const [text, setText] = useState<string>(
    "Browse the Learning Centre to access hundreds of articles & guides. Prepare documents & contracts in just a few clicks. " +
    "Connect with legal advisors in affordable video sessions. " +
    "With Law On Earth, you'll be able to understand your legal matter and self-act safely and affordably."
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [previousText, setPreviousText] = useState<string>(text); // Track previous text for cancel functionality

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setHoverIndex(index);
    setPreviousText(text); // Save the current text before editing
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setHoverIndex(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setHoverIndex(null);
    setText(previousText); // Revert to previous text
  };

  const handleAddTextClick = () => {
    setText(previousText); // Restore the last text if the current text is empty
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 17 } }}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: '1.825rem', sm: '2rem', md: '3.4375rem' }, fontWeight: 700, lineHeight: 1.2 }}
                >
                  <span>Making </span>
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      animation: 'move-bg 24s infinite linear',
                      '@keyframes move-bg': {
                        '100%': {
                          backgroundPosition: '400% 0'
                        }
                      }
                    }}
                  >
                    <span>Legal Services </span>
                  </Box>
                  <span> accessible for everyone.</span>
                </Typography>
              </motion.div>
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
              <Grid item xs={8}>
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
                  {isEditing && hoverIndex === 0 ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      variant="outlined"
                    />
                  ) : (
                    <Box
                      onMouseEnter={() => setHoverIndex(0)}
                      onMouseLeave={() => setHoverIndex(null)}
                      sx={{ position: 'relative' }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, fontWeight: 400, lineHeight: { xs: 1.4, md: 1.4 } }}
                      >
                        {text || (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddTextClick}
                            sx={{ marginTop: '8px' }}
                          >
                            Add Text
                          </Button>
                        )}
                      </Typography>
                      {hoverIndex === 0 && !isEditing && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleEditClick(0)}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            transform: 'translateY(-100%)',
                            marginBottom: '8px',
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </Box>
                  )}
                </motion.div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
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
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <AnimateButton>
                      <Button component={Link} href="auth/register" size="large" color="secondary" variant="outlined">
                        Register
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button component={Link} href="auth/login" target="_blank" size="large" color="primary" variant="contained">
                        Sign up
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.6
                }}
              >
                <Grid container spacing={3} justifyContent="center">
                  <Grid
                    item
                    sx={{
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        height: 30,
                        bottom: 10,
                        left: 'auto',
                        right: '-12px',
                        width: '1px',
                        bgcolor: 'divider'
                      }
                    }}
                  >
                    <Rating name="read-only" value={4.5} size="small" readOnly />
                    <Typography variant="h4">
                      4.7/5
                      <span
                        style={{
                          fontSize: '75%',
                          fontWeight: 400,
                          margin: 5,
                          color: theme.palette.text.secondary
                        }}
                      >
                        Ratings
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            {isEditing && (
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    delay: 0.6
                  }}
                >
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: { xs: -30, sm: 0 },
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
      </Box>
    </Container>
  );
};

export default HeaderPage 

/*
'use client';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

// THIRD - PARTY
import { motion } from 'framer-motion';
import { useState } from 'react';

// ASSETS
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| LANDING - HeaderPage ||============================== //

const HeaderPage = () => {
  const theme = useTheme();
  const [text, setText] = useState<string>( // Specify type for useState
    "Browse the Learning Centre to access hundreds of articles & guides. Prepare documents & contracts in just a few clicks. " +
    "Connect with legal advisors in affordable video sessions. " +
    "With Law On Earth, you'll be able to understand your legal matter and self-act safely and affordably."
  );
  const [isEditing, setIsEditing] = useState<boolean>(false); // Specify type for useState
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); // Specify type for useState


  const handleEditClick = (index: number) => { // Specify type for index parameter
    setIsEditing(true);
    setHoverIndex(index);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setHoverIndex(null);
    // Here you could also send the updated text to a server if needed
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 17 } }}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: '1.825rem', sm: '2rem', md: '3.4375rem' }, fontWeight: 700, lineHeight: 1.2 }}
                >
                  <span>Making </span>
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      animation: 'move-bg 24s infinite linear',
                      '@keyframes move-bg': {
                        '100%': {
                          backgroundPosition: '400% 0'
                        }
                      }
                    }}
                  >
                    <span>Legal Services </span>
                  </Box>
                  <span> accessible for everyone.</span>
                </Typography>
              </motion.div>
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
              <Grid item xs={8}>
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
                  {isEditing && hoverIndex === 0 ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      variant="outlined"
                    />
                  ) : (
                    <Box
                      onMouseEnter={() => setHoverIndex(0)}
                      onMouseLeave={() => setHoverIndex(null)}
                      sx={{ position: 'relative' }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, fontWeight: 400, lineHeight: { xs: 1.4, md: 1.4 } }}
                      >
                        {text}
                      </Typography>
                      {hoverIndex === 0 && !isEditing && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleEditClick(0)}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            transform: 'translateY(-100%)',
                            marginBottom: '8px',
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </Box>
                  )}
                </motion.div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
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
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <AnimateButton>
                      <Button component={Link} href="/components-overview/buttons" size="large" color="secondary" variant="outlined">
                        Book a Demo
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button component={Link} href="/login" target="_blank" size="large" color="primary" variant="contained">
                        Sign up
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.6
                }}
              >
                <Grid container spacing={3} justifyContent="center">
                  <Grid
                    item
                    sx={{
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        height: 30,
                        bottom: 10,
                        left: 'auto',
                        right: '-12px',
                        width: '1px',
                        bgcolor: 'divider'
                      }
                    }}
                  >
                    <Rating name="read-only" value={4.5} size="small" readOnly />
                    <Typography variant="h4">
                      4.7/5
                      <span
                        style={{
                          fontSize: '75%',
                          fontWeight: 400,
                          margin: 5,
                          color: theme.palette.text.secondary
                        }}
                      >
                        Ratings
                      </span>
                    </Typography>
                  </Grid>
                  
                </Grid>
              </motion.div>
            </Grid>
            {isEditing && (
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    delay: 0.6
                  }}
                >
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: { xs: -30, sm: 0 },
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        
      </Box>
    </Container>
  );
};

export default HeaderPage;
*/
