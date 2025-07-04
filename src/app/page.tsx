"use client";
import { useRef } from 'react';
import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Partner from 'sections/landing/Partner';
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
      <div ref={servicesRef} id="services">
        <Technologies />
      </div>
    
      <div ref={pricingRef} id="pricing" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px', }}>
        <div style={{ width: '80%' }}>
          <Pricing1Page />
        </div>
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



