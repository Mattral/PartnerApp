'use client';

import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MainCard from 'components/MainCard';

// Initial data
const initialPlans = [
  {
    active: false,
    title: 'Starter',
    description: '',
    price: 0,
    permission: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    active: false,
    title: 'Basic',
    description: '',
    price: 69,
    permission: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    active: true,
    title: 'Standard',
    description: '',
    price: 129,
    permission: [0, 1, 2, 3, 4, 5, 6, 7]
  },
];

// Initial common texts
const initialCommonTexts = [
  'Access to our catalogue of 150+ document templates',
  'Download in Microsoft Word format (Pay Per Document)',
  'Access to over 300 articles, booklets, infographics and checklists',
  'Geotagged Content',
  'Discounted video sessions',
  'Access encrypted, securely-stored video recordings of advice sessions',
  '?',
  '?'
];


const Pricing1Page = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [timePeriod, setTimePeriod] = useState(true);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(plans);
  const [commonTexts, setCommonTexts] = useState(initialCommonTexts);

  // Open modal dialog
  const handleClickOpen = () => {
    setFormValues(plans);
    setOpen(true);
  };

  // Close modal dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle change in form fields
  const handleChange = (index: number, field: string, value: string | number) => {
    if (field === 'commonText') {
      const updatedCommonTexts = [...commonTexts];
      updatedCommonTexts[index] = value as string;
      setCommonTexts(updatedCommonTexts);
    } else {
      const updatedPlans = [...formValues];
      updatedPlans[index] = { ...updatedPlans[index], [field]: value };
      setFormValues(updatedPlans);
    }
  };

  // Save changes from modal dialog
  const handleSave = () => {
    setPlans(formValues);
    setOpen(false);
  };

  // Styles for disabled price list
  const priceListDisable = {
    textDecoration: 'line-through'
  };

  // Styles for active plan price
  const priceActivePlan = {
    padding: 3,
    borderRadius: 1,
    bgcolor: 'primary.lighter'
  };

  // Styles for price display
  const price = {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: 1
  };

  return (
    <Grid container spacing={3} sx={{ pt: 6 }}>
      <Grid item xs={12}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" sx={{ mb: 4 }}>
          <Stack spacing={1} sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h3">Choose what works for you!</Typography>
            <Typography color="textSecondary">
              Access to unlimited documents. Save over 40% when you subscribe for 6 months. Current Pricing is listed in AUD.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="subtitle1" color={timePeriod ? 'textSecondary' : 'textPrimary'}>
              Billed Yearly
            </Typography>
            <Switch checked={timePeriod} onChange={() => setTimePeriod(!timePeriod)} inputProps={{ 'aria-label': 'container' }} />
            <Typography variant="subtitle1" color={timePeriod ? 'textPrimary' : 'textSecondary'}>
              Billed Monthly
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item container spacing={3} xs={12} alignItems="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={plan.active ? priceActivePlan : { padding: 3 }}>
                    <Grid container spacing={3}>
                      {plan.active && (
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                          <Chip label="Popular" color="success" />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Stack spacing={0} textAlign="center">
                          <Typography variant="h4">{plan.title}</Typography>
                          <Typography>{plan.description}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={0} alignItems="center">
                          {timePeriod && (
                            <Typography variant="h2" sx={price}>
                              ${plan.price}
                            </Typography>
                          )}
                          {!timePeriod && (
                            <Typography variant="h2" sx={price}>
                              ${plan.price * 12}
                            </Typography>
                          )}
                          <Typography variant="h6" color="textSecondary">
                            Auto Renew!
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Button color={plan.active ? 'primary' : 'secondary'} variant={plan.active ? 'contained' : 'outlined'} fullWidth>
                          {plan.price === 0 ? 'Get Started' : 'Order Now'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <List sx={{ m: 0, p: 0, '&> li': { px: 0, py: 0.625 } }} component="ul">
                    {plan.permission.map((perm, i) => (
                      <Fragment key={i}>
                        <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}}>
                          <ListItemText primary={commonTexts[i]} sx={{ textAlign: 'center' }} />
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Pricing Plans</DialogTitle>
        <DialogContent>
          {formValues.map((plan, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={plan.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={plan.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={plan.price}
                onChange={(e) => handleChange(index, 'price', parseInt(e.target.value))}
                sx={{ mb: 1 }}
              />
            </Box>
          ))}
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Common Texts:
          </Typography>
          {commonTexts.map((text, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Common Text ${index + 1}`}
              value={commonTexts[index]}
              onChange={(e) => handleChange(index, 'commonText', e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Pricing1Page;
