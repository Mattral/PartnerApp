'use client';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// PROJECT IMPORTS
import ReactDraft from 'sections/forms/plugins/ReactDraft';
import ReactQuill from 'sections/forms/plugins/ReactQuill';
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// TYPES
import { ThemeDirection, ThemeMode } from 'types/config';

// ==============================|| PLUGIN - EDITOR ||============================== //

const EditorPage = () => {
  const theme = useTheme();
  const { themeDirection } = useConfig();
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          '& .rdw-editor-wrapper': {
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: '4px',
            overflow: 'visible',
            '& .rdw-editor-main': {
              px: 2,
              py: 0.5,
              border: 'none'
            },
            '& .rdw-editor-toolbar': {
              pt: 1.25,
              border: 'none',
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.light',
              color: theme.palette.mode === ThemeMode.DARK ? 'secondary.lighter' : 'text.primary',
              '& .rdw-option-wrapper': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter',
                borderColor: theme.palette.divider
              },
              '& .rdw-dropdown-wrapper': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter',
                borderColor: theme.palette.divider,
                '& .rdw-dropdown-selectedtext': {
                  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : 'secondary.darker'
                },
                '& .rdw-dropdownoption-default': {
                  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : 'secondary.darker'
                },
                '& .rdw-dropdown-carettoopen': {
                  position: themeDirection === ThemeDirection.RTL ? 'initial' : 'absolute'
                }
              },
              '& .rdw-emoji-modal': {
                left: { xs: -140, sm: -195, md: 5 }
              },
              '& .rdw-embedded-modal': {
                left: { xs: -100, sm: -165, md: 5 }
              },
              '& .rdw-link-modal': {
                left: { xs: 0, sm: -100, md: 5 }
              },
              '& .rdw-image-modal': {
                left: { xs: -190, sm: 30, md: 5 },
                top: '15px'
              },
              '& .rdw-colorpicker-modal': {
                left: { xs: -150, sm: 5 }
              }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '.rdw-dropdown-carettoopen': {
                position: 'absolute !important',
                right: '10%',
                left: 'inherit'
              },
              '.rdw-dropdown-carettoclose': {
                right: '10%',
                left: 'inherit'
              }
            })
          }
        }}
      >
        <MainCard title="React Draft" sx={{ overflow: 'visible' }}>
          <ReactDraft />
        </MainCard>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          '& .quill': {
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.lighter',
            borderRadius: '4px',
            '& .ql-toolbar': {
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light',
              borderColor: theme.palette.divider,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              '& .ql-picker-label': {
                color: theme.palette.mode === ThemeMode.DARK ? 'secondary.lighter' : 'text.primary'
              },
              '&.ql-snow .ql-stroke': {
                stroke: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.lighter : theme.palette.text.primary
              }
            },
            '& .ql-container': {
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100',
              borderColor: `${theme.palette.divider} !important`,
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
              '& .ql-editor': {
                minHeight: 135
              }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '& .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg': {
                right: '0%',
                left: 'inherit'
              }
            })
          }
        }}
      >
        <MainCard title="React Quill">
          <ReactQuill />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default EditorPage;
