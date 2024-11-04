// MATERIAL - UI like version 1.0,0
//import { useTheme } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';

 //import logoIconDark from 'assets/images/logo-icon-dark.svg';
 //import logoIcon from 'assets/images/logo.svg';


// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  return (
  //const theme = useTheme();
  <svg width="66" height="28" viewBox="0 0 66 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d=""
    fill={theme.palette.primary.main}
  />
  <path
    d=""
    fill={theme.palette.primary.main}
  />
  <path
    d=""
    fill={theme.palette.primary.main}
  />
  {/* "L" */}
  <path
    d="M0 0 L0 28 L18 28 L18 24 L4 24 L5 0 Z"
    fill={theme.palette.primary.main}
  />
  {/* "O" */}
  <path
    d="M20 14 C20 6.268 26.268 0 34 0 C41.732 0 48 6.268 48 14 C48 21.732 41.732 28 34 28 C26.268 28 20 21.732 20 14 Z M24 14 C24 19.523 28.477 24 34 24 C39.523 24 44 19.523 44 14 C44 8.477 39.523 4 34 4 C28.477 4 24 8.477 24 14 Z"
    fill={theme.palette.primary.main}
  />
  {/* "E" */}
  <path
    d="M54 0 L54 28 L160 28 L64 24 L58 24 L58 16 L160 16 L160 12 L58 12 L58 4 L160 4 L160 0 Z"
    fill={theme.palette.primary.main}
  />
</svg>
  );
};

export default LogoIcon;
