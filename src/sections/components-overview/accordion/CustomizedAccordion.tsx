'use client';

import { useState, SyntheticEvent } from 'react';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
import { Clock, EmojiHappy, Image as ImageIcon, Profile } from 'iconsax-react';

// ==============================|| ACCORDION - CUSTOMIZED ||============================== //

const CustomizedAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const customAccordionCodeString = `<Box
  sx={{
    '& .MuiAccordion-root': {
      borderColor: 'divider',
      '& .MuiAccordionSummary-root': {
        bgcolor: 'transparent',
        flexDirection: 'row'
      },
      '& .MuiAccordionDetails-root': {
        borderColor: 'divider'
      },
      '& .Mui-expanded': {
        color: 'primary.main'
      }
    }
  }}
>
  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <EmojiHappy />
        <Typography variant="h6">Accordion 01</Typography>
      </Stack>
    </AccordionSummary>
    <AccordionDetails>
      <Stack spacing={2}>
        <Typography variant="h5">Lorem ipsum dolor sit amet,</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </Stack>
    </AccordionDetails>
  </Accordion>
  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Profile />
        <Typography variant="h6">Accordion 02</Typography>
      </Stack>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Clock />
        <Typography variant="h6">Accordion 03</Typography>
      </Stack>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <ImageIcon />
        <Typography variant="h6">Accordion 04</Typography>
      </Stack>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
</Box>`;

  return (
    <MainCard title="Customized" codeString={customAccordionCodeString}>
      <Box
        sx={{
          '& .MuiAccordion-root': {
            borderColor: 'divider',
            '& .MuiAccordionSummary-root': {
              bgcolor: 'transparent',
              flexDirection: 'row',
              '&:focus-visible': {
                bgcolor: 'primary.lighter'
              }
            },
            '& .MuiAccordionDetails-root': {
              borderColor: 'divider'
            },
            '& .Mui-expanded': {
              color: 'primary.main'
            }
          }
        }}
      >
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <EmojiHappy size={18} />
              <Typography variant="h6">Accordion 01</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Typography variant="h5">Lorem ipsum dolor sit amet,</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Profile size={18} />
              <Typography variant="h6">Accordion 02</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Clock size={18} />
              <Typography variant="h6">Accordion 03</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ImageIcon size={18} />
              <Typography variant="h6">Accordion 04</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </MainCard>
  );
};

export default CustomizedAccordion;
