'use client';

import { lazy, ReactNode } from 'react';

// MATERIAL - UI
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// PROJECT IMPORTS
import LayoutContent from './LayoutContent';
import Loader from 'components/Loader';
import { useGetMenuMaster } from 'api/menu';

const Header = lazy(() => import('./Header'));

// ==============================|| COMPONENT LAYOUT ||============================== //

interface Props {
  children: ReactNode;
}

const ComponentLayout = ({ children }: Props) => {
  const { menuMasterLoading } = useGetMenuMaster();
  if (menuMasterLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
      <Header />
      <Toolbar sx={{ mt: 2 }} />
      <LayoutContent>{children}</LayoutContent>
    </Container>
  );
};

export default ComponentLayout;
