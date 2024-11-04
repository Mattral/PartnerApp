import { useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { getIn } from 'formik';

// PROJECT IMPORTS
import InvoiceField from './InvoiceField';
import AlertProductDelete from './AlertProductDelete';

import { useGetInvoiceMaster } from 'api/invoice';
import { openSnackbar } from 'api/snackbar';

// ASSETS
import { Trash } from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';
import { SnackbarProps } from 'types/snackbar';

// ==============================|| INVOICE - ITEMS ||============================== //

const InvoiceItem = ({ id, name, description, qty, price, onDeleteItem, onEditItem, index, Blur, errors, touched }: any) => {
  const { invoiceMaster } = useGetInvoiceMaster();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [open, setOpen] = useState(false);
  const handleModalClose = (status: boolean) => {
    setOpen(false);
    if (status) {
      onDeleteItem(index);
      openSnackbar({
        open: true,
        message: 'Product Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    }
  };

  const Name = `invoice_detail[${index}].name`;
  const touchedName = getIn(touched, Name);
  const errorName = getIn(errors, Name);

  const textFieldItem = [
    {
      placeholder: 'Item name',
      label: 'Item Name',
      name: `invoice_detail.${index}.name`,
      type: 'text',
      id: id + '_name',
      value: name,
      errors: errorName,
      touched: touchedName,
      align: 'left'
    },
    {
      placeholder: 'Description',
      label: 'Description',
      name: `invoice_detail.${index}.description`,
      type: 'text',
      id: id + '_description',
      value: description,
      align: 'left'
    },
    { placeholder: '', label: 'Qty', type: 'number', name: `invoice_detail.${index}.qty`, id: id + '_qty', value: qty, align: 'right' },
    {
      placeholder: '',
      label: 'price',
      type: 'number',
      name: `invoice_detail.${index}.price`,
      id: id + '_price',
      value: price,
      align: 'right'
    }
  ];

  return (
    <>
      {textFieldItem.map((item: any, index: number) => {
        return (
          <TableCell key={index} align={item.align} sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 } }}>
            <InvoiceField
              onEditItem={(event: any) => onEditItem(event)}
              onBlur={(event: any) => Blur(event)}
              cellData={{
                placeholder: item.placeholder,
                name: item.name,
                type: item.type,
                id: item.id,
                value: item.value,
                errors: item.errors,
                touched: item.touched,
                align: item.align
              }}
              key={item.label}
            />
          </TableCell>
        );
      })}
      <TableCell align="right">
        <Box sx={{ pl: 2 }}>
          {invoiceMaster === undefined ? (
            <Skeleton width={520} height={16} />
          ) : (
            <Typography>{invoiceMaster.country?.prefix + '' + (price * qty).toFixed(2)}</Typography>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                opacity: 0.9
              }
            }
          }}
          title="Remove Item"
        >
          <Button color="error" onClick={() => setOpen(true)}>
            <Trash />
          </Button>
        </Tooltip>
      </TableCell>
      <AlertProductDelete title={name} open={open} handleClose={handleModalClose} />
    </>
  );
};

export default InvoiceItem;
