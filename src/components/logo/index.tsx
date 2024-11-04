// NEXT
import Link from 'next/link';

// MATERIAL - UI
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps } from '@mui/system';

// THIRD - PARTY
import { To } from 'history';

// PROJECT IMPORTS
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => (
  <ButtonBase disableRipple component={Link} href={!to ? APP_DEFAULT_PATH : to} sx={sx}>
    {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
  </ButtonBase>
);

export default LogoSection;
