
'use client';

import { useState } from 'react';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Links from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import Logo from 'components/logo';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { APP_DEFAULT_PATH } from 'config';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// ASSETS
import { DocumentDownload, ExportSquare, HambergerMenu, Minus } from 'iconsax-react';

// TYPES
import { ThemeDirection } from 'types/config';

// ==============================|| COMPONENTS - APP BAR ||============================== //

const Header = () => {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  const linksSx = {
    textDecoration: 'none'
  };

  return (
    <AppBar
      sx={{
        bgcolor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(8px)',
        color: theme.palette.text.primary,
        boxShadow: 'none'
      }}
    >
      <Container maxWidth="xl" disableGutters={matchDownMd}>
        <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
          <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Chip
              label={process.env.NEXT_APP_VERSION}
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              '& .header-link': { fontWeight: 500, '&:hover': { color: theme.palette.primary.main } },
              display: { xs: 'none', md: 'block' }
            }}
            spacing={3}
          >
            <Links
              className="header-link"
              sx={{ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 }}
              color="secondary.main"
              component={Link}
              href="#"
              target="_blank"
              underline="none"
            >
              About
            </Links>
            <Links className="header-link" color="primary" underline="none">
              Services
            </Links>
            <Links
              className="header-link"
              color="secondary.main"
              href="#"
              target="_blank"
              underline="none"
            >
              Pricing
            </Links>
            <Links href="#" target="_blank" underline="none">
              <IconButton
                size="large"
                shape="rounded"
                color="secondary"
                sx={{
                  bgcolor: 'secondary.light',
                  color: 'secondary.darker',
                  '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                }}
              >
                <DocumentDownload />
              </IconButton>
            </Links>
            <Box sx={{ display: 'inline-block' }}>
              <AnimateButton>
                <Button
                  component={Links}
                  href="/login"
                  disableElevation
                  startIcon={<ExportSquare />}
                  color="success"
                  size="large"
                  variant="contained"
                >
                  Login
                </Button>
              </AnimateButton>
            </Box>
          </Stack>
          <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: { xs: 'flex', md: 'none' } }}>
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="warning" component={Link} href={APP_DEFAULT_PATH} sx={{ mt: 0.25 }}>
                Dashboard
              </Button>
              <IconButton
                size="large"
                color="secondary"
                onClick={() => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened)}
                sx={{ p: 1 }}
              >
                <HambergerMenu />
              </IconButton>
            </Stack>
            <Drawer
              anchor="top"
              open={drawerToggle}
              onClose={drawerToggler(false)}
              sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
            >
              <Box
                sx={{ width: 'auto', '& .MuiListItemIcon-root': { fontSize: '1rem', minWidth: 32 } }}
                role="presentation"
                onClick={drawerToggler(false)}
                onKeyDown={drawerToggler(false)}
              >
                <List>
                  <Links sx={linksSx} href="/login" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <Minus color={theme.palette.secondary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                    </ListItemButton>
                  </Links>
                  <Links sx={linksSx} href="/components-overview/buttons" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <Minus color={theme.palette.secondary.main} />
                      </ListItemIcon>
                      <ListItemText primary="All Components" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                    </ListItemButton>
                  </Links>
                  <Links sx={linksSx} href="#" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <Minus color={theme.palette.secondary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Free Version" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                    </ListItemButton>
                  </Links>
                  <Links sx={linksSx} href="#" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <Minus color={theme.palette.secondary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Documentation" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                    </ListItemButton>
                  </Links>
                  <Links sx={linksSx} href="#" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <Minus color={theme.palette.secondary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Support" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                    </ListItemButton>
                  </Links>
                  <Links
                    sx={linksSx}
                    href="#"
                    target="_blank"
                  >
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <Minus color={theme.palette.secondary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Purchase Now" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                      <Chip color="primary" label="v1.0" size="small" />
                    </ListItemButton>
                  </Links>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;