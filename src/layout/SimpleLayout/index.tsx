'use client';

import { lazy, ReactNode } from 'react';
import { useRef } from 'react';
// NEXT
import { usePathname } from 'next/navigation';

// MATERIAL - UI
const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

// PROJECT IMPORTS
import Loader from 'components/Loader';
import { useGetMenuMaster } from 'api/menu';
//import Header from 'layout/SimpleLayout/Header';
// ==============================|| LAYOUTS - STRUCTURE ||============================== //

interface Props {
  children: ReactNode;
}

const SimpleLayout = ({ children }: Props) => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);

  const { menuMasterLoading } = useGetMenuMaster();

  const pathname = usePathname();
  const layout: string = pathname === 'landing' || '/' ? 'landing' : 'simple';

  if (menuMasterLoading) return <Loader />;

  return (
    <>
      <Header refs={{ aboutRef, servicesRef, pricingRef }} />
      {children}
      <FooterBlock isFull={layout === 'landing'} />
    </>
  );
};

export default SimpleLayout;

