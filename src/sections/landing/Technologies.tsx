/*

const initialTechnologies = [
  { icon: techIcons[0].value, title: 'Legal Support', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" , free: '/#', preview: '/#'},
  { icon: techIcons[1].value, title: 'Online Company Registration', description: 'Register your company online, in Australia, in just minutes for as little as $562 AUD. This covers all government fees and includes 16 critical business documents and a company constitution! Start your company with confidence & legal security. You can set your company up for success with Lorem Ipsum.' , free: '/#', preview: '/#'},
  { icon: techIcons[2].value, title: 'Create Legal Documents', description: "Change the way you use legal documents with Lorem Ipsum. We are more than just a 'template' company. Our documents aren't filled with legal jargon and are companies with 'Human Guides'. These guides are written at a grade-7 reading standard, and explain each clause of the legal documents." , free: '/#', preview: '/#' },
  { icon: techIcons[3].value, title: 'Legal Advisors', description: 'Speak to a Lawyer. Booking sessions with fixed-fee Advisors.' , free: '/#', preview: '/#' },
  { icon: techIcons[4].value, title: 'Legal Guides and Courses', description: "Browse the Learning Centre to access hundreds of articles & guides." , free: '/#', preview: '/#'},
  { icon: techIcons[5].value, title: 'Available Anytime Anywhere', description: 'Access Lorem Ipsum\'s services online 24/7. You can complete your documents and business registration in as little as 5 minutes and then instantly download your document.' , free: '/#', preview: '/#'},
  { icon: techIcons[6].value, title: 'Quality You Can Trust', description: 'Each advisor has at least 3-years\' experience in their field, so you can have peace of mind knowing that you can access the expert support that you need.' , free: '/#', preview: '/#'},
  { icon: techIcons[7].value, title: 'Transparent Pricing', description: 'You can save thousands on legal fees with our fixed-price system, you\'ll know exactly what you\'ll pay for from the start so you can make the best decision for your needs.' , free: '/#', preview: '/#'},
];
*/

'use client';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Links from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// ASSETS
import { DocumentDownload, ExportSquare } from 'iconsax-react';

const clock_icon = '/assets/images/landing/fa_regular_clock.png';
const award_icon = '/assets/images/landing/fa_solid_award.png';
const check_icon = '/assets/images/landing/fa_regular_check-circle.png';
const globe_icon = '/assets/images/landing/fa_solid_globe.png';
const handshake_icon = '/assets/images/landing/fa_regular_handshake.png';
const file_icon = '/assets/images/landing/fa_regular_file.png';
const book_icon = '/assets/images/landing/Book_font_awesome.png';
const grad_icon = '/assets/images/landing/fa_solid_user-graduate.png';

let value: string = '';
if (typeof window !== 'undefined') {
  value = window.location.search;
}
const params = new URLSearchParams(value);
const ispValue = params.get('isp');

const Technologies = [
  {
    trending: false,
    icon: clock_icon,
    title: 'Legal Support',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    free: '#',
  },
  {
    trending: true,
    icon: award_icon,
    title: 'Company Registration',
    description: 'Register your company online, in Australia, in just minutes for as little as $562 AUD.',
    free: '#',
  },
  {
    trending: false,
    icon: file_icon,
    title: 'Create Legal Docs',
    description: "Change the way you use legal documents with Lorem Ipsum.",
    free: '#',
  },
  {
    trending: false,
    icon: grad_icon,
    title: 'Legal Advisors',
    description: 'Speak to a Lawyer. Booking sessions with fixed-fee Advisors',
    free: null,
  },
  {
    trending: false,
    icon: book_icon,
    title: 'Legal Guides & Courses',
    description: "Browse the Learning Centre to access hundreds of articles & guides.",
    free: null,
  },
  {
    trending: false,
    icon: globe_icon,
    title: 'Anytime Anywhere',
    description: 'Access services online 24/7. You can complete your documents and business registration in as little as 5 minutes and then instantly download your document.',
    free: '#',
  },
  {
    trending: false,
    icon: check_icon,
    title: 'Quality You Can Trust',
    description: 'Each advisor has at least 3-years\' experience in their field, so you can have peace of mind knowing that you can access the expert support that you need.',
    free: '#',
  },
  {
    trending: false,
    icon: handshake_icon,
    title: 'Transparent Pricing',
    description: 'You can save thousands on legal fees with our fixed-price system, you\'ll know exactly what you\'ll pay for from the start so you can make the best decision for your needs.',
    free: null,
  }
];

// Split Technologies array into two parts
const firstTechnologies = Technologies.slice(0, 5);
const lastTechnologies = Technologies.slice(5);

const TechnologiesPage = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={3} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
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
                <Typography variant="h2" sx={{ fontWeight: 700 }}>Our Services</Typography>
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
                  delay: 0.4
                }}
              >
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>Explore our easy to use services and start your legal journey today.</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* First Block of Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3} justifyContent="center">
            {firstTechnologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard sx={{
                    padding: 3,
                    boxShadow: 4,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 10,
                      background: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs="auto">
                            {tech.trending && (
                              <Badge badgeContent="TRENDING" color="error" variant="light">
                                <CardMedia component="img" image={tech.icon} sx={{ width: 'auto', maxHeight: 100 }} />
                              </Badge>
                            )}
                            {!tech.trending && <CardMedia component="img" image={tech.icon} sx={{ width: 'auto', maxHeight: 100 }} />}
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>{tech.title}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              component={Link}
                              href="{tech.preview}"
                              target="_blank"
                              sx={{
                                fontWeight: 500,
                                bgcolor: 'secondary.light',
                                color: 'secondary.darker',
                                '&:hover': { color: 'secondary.lighter' }
                              }}
                            >
                              Details
                            </Button>
                          </Grid>
                          {tech.free && (
                            <Grid item>
                              <Links component={Link} href={tech.free}>
                                <IconButton
                                  size="large"
                                  shape="rounded"
                                  color="secondary"
                                  sx={{
                                    bgcolor: 'secondary.lighter',
                                    color: 'secondary.darker',
                                    '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                                  }}
                                >
                                  <DocumentDownload />
                                </IconButton>
                              </Links>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Last Block of Cards */}
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>Why Choose Thought Cave?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} justifyContent="center">
            {lastTechnologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard sx={{
                    padding: 3,
                    boxShadow: 4,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 10,
                      background: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs="auto">
                            {tech.trending && (
                              <Badge badgeContent="TRENDING" color="error" variant="light">
                                <CardMedia component="img" image={tech.icon} sx={{ width: 'auto', maxHeight: 100 }} />
                              </Badge>
                            )}
                            {!tech.trending && <CardMedia component="img" image={tech.icon} sx={{ width: 'auto', maxHeight: 100 }} />}
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>{tech.title}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              component={Link}
                              href="{tech.preview}"
                              target="_blank"
                              sx={{
                                fontWeight: 500,
                                bgcolor: 'secondary.light',
                                color: 'secondary.darker',
                                '&:hover': { color: 'secondary.lighter' }
                              }}
                            >
                              Details
                            </Button>
                          </Grid>
                          {tech.free && (
                            <Grid item>
                              <Links component={Link} href={tech.free}>
                                <IconButton
                                  size="large"
                                  shape="rounded"
                                  color="secondary"
                                  sx={{
                                    bgcolor: 'secondary.lighter',
                                    color: 'secondary.darker',
                                    '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                                  }}
                                >
                                  <DocumentDownload />
                                </IconButton>
                              </Links>
                            </Grid>
                          )}
                        </Grid>
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

export default TechnologiesPage;


