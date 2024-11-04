"use client";

import { useRef } from 'react';

// import ContactUs from 'sections/landing/ContactUs';<ContactUs />
import SimpleLayout from 'layout/SimpleLayout';

import FooterBlock from 'sections/landing/FB';

import FormsWizardPage from 'views/forms-tables/forms/FormsWizard'

const Landing = () => {

  return (
    <SimpleLayout>
      <FormsWizardPage/>

      <FooterBlock />
    </SimpleLayout>
  );
};

export default Landing;




/*"use client"
// PROJECT IMPORTS
import dynamic from 'next/dynamic';
import About from 'sections/landing/About';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Testimonial from 'sections/landing/Testimonial';
import Partner from 'sections/landing/Partner';
import ContactUs from 'sections/landing/ContactUs';
//import FooterBlock from 'sections/landing/FB';
import Pricing1Page from 'views/price/Pricing1';

// ==============================|| LANDING PAGE ||============================== //

const Hero = dynamic(() => import('sections/landing/Header'), { ssr: false });
const Footer = dynamic(() => import('sections/landing/FB'), { ssr: false });

const Landing = () => {
  return (
    <>
      {typeof window !== "undefined" && <Hero />}
      <Hero/>
      <About />
      <Technologies />
      <Combo />
      <Apps />
      <Pricing1Page />
      <Testimonial />
      <Partner />
      <ContactUs />
      <Footer />
      {typeof window !== "undefined" && <Footer />}
    </>
  );
};

export default Landing;
*/