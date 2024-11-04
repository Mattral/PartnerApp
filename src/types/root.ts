import { ComponentClass, FunctionComponent } from 'react';

// MATERIAL - UI
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// THIRD - PARTY
import { Icon } from 'iconsax-react';

// ==============================|| TYPES - ROOT  ||============================== //

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    })
  | ComponentClass<any>
  | FunctionComponent<any>
  | Icon;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}
