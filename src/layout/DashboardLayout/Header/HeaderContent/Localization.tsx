import { useRef, useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { getCookie, hasCookie, setCookie } from "cookies-next";

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import useConfig from 'hooks/useConfig';

// ASSETS
import { LanguageSquare } from 'iconsax-react';
import TranslateIcon from '@mui/icons-material/Translate';
import GTranslateIcon from '@mui/icons-material/GTranslate';

// TYPES
import { I18n, ThemeMode } from 'types/config';

// ==============================|| HEADER CONTENT - LOCALIZATION ||============================== //

const Localization = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const { i18n, onChangeLocalization } = useConfig();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (lang: I18n) => {
    onChangeLocalization(lang);
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  // Language options for the picker (English, French, Japanese, German, Chinese)
  const languages = [
    { label: 'English', value: '/auto/en' },
    { label: 'Français', value: '/auto/fr' },
    { label: '日本語', value: '/auto/ja' },
    { label: 'Deutsch', value: '/auto/de' },
    { label: '中文', value: '/auto/zh-CN' },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // Initialize Google Translate when the script is loaded
    //@ts-expect-error
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Check if the language preference is saved in a cookie
    if (hasCookie('googtrans')) {
      setSelected(getCookie('googtrans') as string);
    } else {
      setSelected('/auto/en'); // Default to English if no preference is set
    }
  }, []);

  // Initialize Google Translate with the selected options
  const googleTranslateElementInit = () => {
    //@ts-expect-error
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'auto', // Automatically detect the current language
        autoDisplay: false, // Disable automatic translation display
        includedLanguages: 'en,fr,ja,de,zh-CN', // Supported languages (English, French, Japanese, German, Chinese)
        // @ts-expect-error
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  };

  // Handle language selection from the dropdown
  const langChange = (e: string) => {
    // Store the selected language in a cookie
    setCookie('googtrans', decodeURI(e));
    setSelected(e);

    // Reload the page to apply the language change
    window.location.reload();
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="open localization"
        ref={anchorRef}
        aria-controls={open ? 'localization-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
      >
        <TranslateIcon />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 0 : 0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top-right' : 'top'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, borderRadius: 1.5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <List
                    component="nav"
                    sx={{
                      p: 1,
                      width: '100%',
                      minWidth: 200,
                      maxWidth: 290,
                      bgcolor: theme.palette.background.paper,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 250,
                      },
                    }}
                  >
                    {languages.map((language) => (
                      <ListItemButton
                        key={language.value}
                        selected={selected === language.value}
                        onClick={() => langChange(language.value)}
                      >
                        <ListItemText primary={language.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      {/* Hidden div for Google Translate widget */}
      <div
        id="google_translate_element"
        style={{
          width: '0px',
          height: '0px',
          visibility: 'hidden', // hidden
          position: 'absolute',
          left: '50%',
          zIndex: -9999,
        }}
      ></div>
    </Box>
  );
};

export default Localization;


/* // original
import { useRef, useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import useConfig from 'hooks/useConfig';

// ASSETS
import { LanguageSquare } from 'iconsax-react'; //old one
import TranslateIcon from '@mui/icons-material/Translate';
import GTranslateIcon from '@mui/icons-material/GTranslate';
// TYPES
import { I18n, ThemeMode } from 'types/config';

// ==============================|| HEADER CONTENT - LOCALIZATION ||============================== //

const Localization = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const { i18n, onChangeLocalization } = useConfig();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (lang: I18n) => {
    onChangeLocalization(lang);
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="open localization"
        ref={anchorRef}
        aria-controls={open ? 'localization-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
      >
        <TranslateIcon />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 0 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top-right' : 'top'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, borderRadius: 1.5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <List
                    component="nav"
                    sx={{
                      p: 1,
                      width: '100%',
                      minWidth: 200,
                      maxWidth: 290,
                      bgcolor: theme.palette.background.paper,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 250
                      }
                    }}
                  >
                    <ListItemButton selected={i18n === 'en'} onClick={() => handleListItemClick('en')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">English</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (UK)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={i18n === 'fr'} onClick={() => handleListItemClick('fr')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">français</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (French)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={i18n === 'ro'} onClick={() => handleListItemClick('ro')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Română</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (Romanian)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={i18n === 'zh'} onClick={() => handleListItemClick('zh')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">中国人</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (Chinese)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Localization;

*/