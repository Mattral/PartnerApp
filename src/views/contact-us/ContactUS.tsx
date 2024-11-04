// MATERIAL - UI
import Grid from '@mui/material/Grid';


// PROJECT IMPORTS


import ContactEmail from 'sections/extra-pages/contact/ContactEmail';

// ==============================|| CONTACT US - MAIN ||============================== //

function ContactUSPage() {
  return (
    <Grid container spacing={12} justifyContent="center" alignItems="center" sx={{ mb: 12 }}>
      
      <Grid item xs={12} md={12}>
        <ContactEmail />
      </Grid>
    </Grid>
  );
}

export default ContactUSPage;
