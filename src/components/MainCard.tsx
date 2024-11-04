import { forwardRef, CSSProperties, ReactElement, Ref } from 'react';

// MATERIAL - UI
import { CardProps } from '@mui/material/Card';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import Highlighter from 'components/third-party/Highlighter';

// TYPES
import { KeyedObject } from 'types/root';
import MainCardStyled from './MainCardStyled';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactElement | string;
  subheader?: ReactElement | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: ReactElement | string;
  codeHighlight?: boolean;
  codeString?: string;
  modal?: boolean;
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow = true,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <MainCardStyled {...{ border, shadow, boxShadow, codeHighlight, modal, sx, elevation: elevation || 0, ...others }} ref={ref}>
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeString && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Highlighter codeString={codeString} codeHighlight={codeHighlight} />
          </>
        )}
      </MainCardStyled>
    );
  }
);

export default MainCard;
