"use client";
import React, { useState } from 'react';
import { useAdvisorData } from './useAdvisorData'; // Import the custom hook

// MATERIAL - UI
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField'; // Import TextField for input fields

// ASSETS
import { Sms, CallCalling, Location, Link2 } from 'iconsax-react';
import Avatar from 'components/@extended/Avatar'; // Custom Avatar component
import MoreIcon from 'components/@extended/MoreIcon'; // Custom MoreIcon component
import MainCard from 'components/MainCard'; // Custom MainCard component

// IMPORTING THE POPUP COMPONENT
import PreviewPopup from './PreviewPopup'; // Import the PreviewPopup component

// ==============================|| ADVISOR FETCHER ||============================== //

const AdvisorFetcher = () => {
  // States for searchKey, minPrice, and maxPrice
  const [searchKey, setSearchKey] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // State for handling popup visibility
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedPersCode, setSelectedPersCode] = useState('');
  const [selectedUiCode, setSelectedUiCode] = useState('');

  // Fetching advisors data with the dynamic params
  const advisors = useAdvisorData(searchKey, minPrice, maxPrice);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePreviewClick = (pers_code: string, ui_code: string) => {
    setSelectedPersCode(pers_code);
    setSelectedUiCode(ui_code);
    setOpenPopup(true); // Open the popup with selected codes
  };

  const renderAdvisorCard = (advisor: any, index: number) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <MainCard sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Grid container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    sx={{ transform: 'rotate(90deg)' }}
                    color="secondary"
                    onClick={handleMenuClick}
                  >
                    <MoreIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={`${advisor.pers_fName} ${advisor.pers_lName}`} src={advisor.pers_profilePic} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">{advisor.pers_fName} {advisor.pers_lName}</Typography>}
                  secondary={<Typography variant="caption" color="secondary">{advisor.ed_name}</Typography>}
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{ 'aria-labelledby': 'fade-button' }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem>{advisor.pers_code}</MenuItem>
              <MenuItem>{advisor.ui_code}</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">{advisor.pp_jobDesc}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Sms size={18} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{advisor.email}</Typography>} />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <CallCalling size={18} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{advisor.pers_phone1}</Typography>} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Location size={18} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{advisor.pers_preferredTimezone}</Typography>} />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Link2 size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography color="secondary">Role: {advisor.pp_jobTitle}</Typography>}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0 }} component="ul">
                {advisor.skills?.map((skill: string, index: number) => (
                  <ListItem disablePadding key={index} sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                    <Chip color="secondary" variant="outlined" size="small" label={skill} />
                  </ListItem>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="secondary">Preferred timezone: {advisor.pers_preferredTimezone}</Typography>
          <Button variant="outlined" size="small" onClick={() => handlePreviewClick(advisor.pers_code, advisor.ui_code)}>
            Preview
          </Button>
        </Stack>
      </MainCard>
    </Grid>
  );

  // Handle changes to the input fields
  const handleSearchKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4 }}>Schedule a call with Advisor</Typography>
      
      {/* Text inputs for searchKey, minPrice, and maxPrice */}
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          label="Search Key"
          variant="outlined"
          value={searchKey}
          onChange={handleSearchKeyChange}
          sx={{ marginRight: 2, width: 200 }}
        />
        <TextField
          label="Min Price"
          variant="outlined"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          sx={{ marginRight: 2, width: 200 }}
        />
        <TextField
          label="Max Price"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          sx={{ width: 200 }}
        />
      </Box>

      {/* Advisor Cards */}
      <Grid container spacing={3} justifyContent="center">
        {advisors.map((advisor, index) => renderAdvisorCard(advisor, index))}
      </Grid>

      {/* Preview Popup */}
      <PreviewPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        pers_code={selectedPersCode}
        ui_code={selectedUiCode}
      />
    </Box>
  );
};

export default AdvisorFetcher;
