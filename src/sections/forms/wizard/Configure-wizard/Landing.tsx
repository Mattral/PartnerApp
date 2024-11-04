"use client";
import { Button } from '@mui/material';

import { useRef, useState } from 'react';
import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Partner from 'sections/landing/Partner';
import SimpleLayout from 'layout/SimpleLayout';
import Pricing1Page from 'views/price/Pricing1';
import About from 'sections/landing/About';
import FooterBlock from 'sections/landing/FB';
import Header from 'layout/SimpleLayout/Header'; // Adjust the import path as needed

const Landing = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);

  // Step state to track the current step (e.g., OTP, Hero page, etc.)
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle "Next" button
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to handle "Back" button
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <SimpleLayout>
          {/* Navigation Buttons */}
          <Button onClick={handleBack} variant="contained" color="primary">Back</Button>
          <Button onClick={handleNext} variant="contained" color="primary">Finish</Button>

          {/* Add your final components here */}
          <Hero />
          <Apps />
          <Technologies />
          <Combo />
          <Pricing1Page />
          <About />
          <Partner />
          <FooterBlock />
          {/* Navigation Buttons */}
          <Button onClick={handleBack} variant="contained" color="primary">Back</Button>
          <Button onClick={handleNext} variant="contained" color="primary">Finish</Button>


    </SimpleLayout>
  );
};

export default Landing;
