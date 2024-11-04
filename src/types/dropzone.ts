// MATERIAL - UI
import { Theme, SxProps } from '@mui/material/styles';

// THIRD - PARTY
import { DropzoneOptions } from 'react-dropzone';

// ==============================|| TYPES - DROPZONE  ||============================== //

export enum DropzopType {
  default = 'DEFAULT',
  standard = 'STANDARD'
}

// types/dropzone.ts
export enum DocumentCategory {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
  selectedDocument?: string; // Add this line
  points?: number; // Add this line
  category?: DocumentCategory; // Add the category type

}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile[] | null;
  setFieldValue: (field: string, value: any) => void;
  sx?: SxProps<Theme>;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  type?: DropzopType;
  sx?: SxProps<Theme>;
  onUpload?: (data: any) => void; // Adjust based on your requirements
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (field: string, value: any) => void;
  
}

export interface FilePreviewProps {
  showList?: boolean;
  type?: DropzopType;
  files: (File | string)[];
  onRemove?: (file: File | string) => void;
}
