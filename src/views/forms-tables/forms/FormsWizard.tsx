// MATERIAL - UI
import Grid from '@mui/material/Grid';

// PROJECT IMPORTS
///import BasicWizard from 'sections/forms/wizard/basic-wizard';
//import ValidationWizard from 'sections/forms/wizard/validation-wizard';
import MultiStepForm from 'sections/forms/wizard/Configure-wizard'
// ==============================|| FORMS WIZARD ||============================== //

const FormsWizardPage = () => (
  <Grid  justifyContent="center">

      <MultiStepForm />


  </Grid>
);

export default FormsWizardPage;

/*
    <Grid item xs={12} md={6} lg={7}>
      <BasicWizard />
    </Grid>
    <Grid item xs={12} md={6} lg={7}>
      <ValidationWizard />
    </Grid>
*/
