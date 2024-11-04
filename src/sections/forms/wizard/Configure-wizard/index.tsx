'use client';
import { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import CreateWebServerForm from './CreateWebServerForm';
import CreateEmailServerForm from './CreateEmailServerForm';
import RequestEmailServerActivationOTPForm from './RequestEmailServerActivationOTPForm';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const steps = [
  'Personal Info', 
  'File Upload', 
  'Final Setup'
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <CreateWebServerForm 
          handleNext={handleNext} 
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      
      {activeStep === 1 && (
        <CreateEmailServerForm 
          handleNext={handleNext} 
          handleBack={handleBack} 
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      
      {activeStep === 2 && (
        <RequestEmailServerActivationOTPForm 
          handleNext={handleNext} 
          handleBack={handleBack} 
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
    </>
  );
};

export default MultiStepForm;
