"use client";
import { useRef } from 'react';
import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
// import Testimonial from 'sections/landing/Testimonial';<Testimonial />
import Partner from 'sections/landing/Partner';
// import ContactUs from 'sections/landing/ContactUs';<ContactUs />
import SimpleLayout from 'layout/SimpleLayout';
import Pricing1Page from 'views/price/Pricing1';
import About from 'sections/landing/About';
import FooterBlock from 'sections/landing/FB';
import Header from 'layout/SimpleLayout/Header';// Adjust the import path as needed

const Landing = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);

  return (
    <SimpleLayout>
      <Header refs={{ aboutRef, servicesRef, pricingRef }} />
      <Hero />
      <Apps />
      <div ref={servicesRef}>
        <Technologies />
      </div>
      <Combo />
      <div ref={pricingRef}>
        <Pricing1Page />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <Partner />
      <FooterBlock />
    </SimpleLayout>
  );
};

export default Landing;




/*
// PROJECT IMPORTS
import WidgetData from 'views/widget/WidgetData';

// ===========================|| WIDGET - DATA ||=========================== //

const Data = () => {
  return <WidgetData />;
};

export default Data;
*/

/*
// PROJECT IMPORTS
import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Free from 'sections/landing/Free';
import Testimonial from 'sections/landing/Testimonial';
import Partner from 'sections/landing/Partner';
import ContactUs from 'sections/landing/ContactUs';

// ==============================|| LANDING PAGE ||============================== //

const Landing = () => {
  return (
    <>
      <Hero />
      <Technologies />
      <Combo />
      <Apps />
      <Free />
      <Testimonial />
      <Partner />
      <ContactUs />
    </>
  );
};

export default Landing;


*/