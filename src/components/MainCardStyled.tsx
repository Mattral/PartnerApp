'use client';

// material-ui
import { styled, Theme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';

// project import
import useConfig from 'hooks/useConfig';

// types
import { ThemeMode } from 'types/config';

// ==============================|| MAIN CARD - STYLED ||============================== //

interface Props extends CardProps {
  theme: Theme;
  open?: boolean;
  border?: boolean;
  boxShadow?: boolean;
  shadow?: string;
  codeHighlight?: boolean;
  modal?: boolean;
}

const MainCardStyled = styled(Card, {
  shouldForwardProp: (prop) =>
    prop !== 'border' && prop !== 'shadow' && prop !== 'boxShadow' && prop !== 'codeHighlight' && prop !== 'modal'
})(({ theme, border, shadow, boxShadow, codeHighlight, modal, ...others }: Props) => {
  boxShadow = theme.palette.mode === ThemeMode.DARK ? boxShadow || true : boxShadow;
  const { themeContrast } = useConfig();
  return {
    position: 'relative',
    overflow: 'inherit',
    border: border ? '1px solid' : 'none',
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    ...(((themeContrast && boxShadow) || shadow) && {
      boxShadow: shadow ? shadow : theme.customShadows.z1
    }),
    ...((codeHighlight as any) && {
      '& pre': {
        margin: 0,
        padding: '12px !important',
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.75rem'
      }
    }),
    ...(modal && {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: `calc( 100% - 50px)`, sm: 'auto' },
      '& .MuiCardContent-root': {
        overflowY: 'auto',
        minHeight: 'auto',
        maxHeight: `calc(100vh - 200px)`
      }
    })
  };
});

export default MainCardStyled;
