'use client';

import { useMemo, useState, MouseEvent, Fragment } from 'react';

// MATERIAL - UI
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// THIRD - PARTY
import { Column, useTable, HeaderGroup, Cell } from 'react-table';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

import makeData from 'data/react-table';

// ASSETS
import { ArrowDown, ArrowUp, Star1, Wallet3 } from 'iconsax-react';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup: HeaderGroup<{}>, index: number) => (
          <Fragment key={index}>
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroup<{}>, i: number) => (
                <Fragment key={i}>
                  <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
                </Fragment>
              ))}
            </TableRow>
          </Fragment>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Fragment key={i}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: Cell<{}>, index: number) => (
                  <Fragment key={index}>
                    <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| DATA - MONTHLY REVENUE ||============================== //

const MonthlyRevenue = () => {
  const data = useMemo(() => makeData(5), []);

  const icons = [Star1, ArrowDown, Wallet3, ArrowUp];

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Customer',
        accessor: 'fatherName',
        Cell: ({ value }: { value: string }) => {
          const Icons = icons[randomIntFromInterval(0, 3)];
          return (
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar variant="rounded" color="secondary" size="sm">
                <Icons />
              </Avatar>
              <Typography color="text.secondary">{value}</Typography>
            </Stack>
          );
        }
      },
      {
        Header: 'Plan',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Complicated':
              return <Chip color="error" label="Team" size="small" variant="light" sx={{ borderRadius: 1 }} />;
            case 'Relationship':
              return <Chip color="success" label="Premium" size="small" variant="light" sx={{ borderRadius: 1 }} />;
            case 'Single':
            default:
              return <Chip color="info" label="Free" size="small" variant="light" sx={{ borderRadius: 1 }} />;
          }
        }
      },
      {
        Header: 'MRR',
        accessor: 'progress',
        className: 'cell-right',
        Cell: ({ value }: { value: number }) => {
          return (
            <>
              {value > 50 ? (
                <Typography variant="subtitle1">${value}</Typography>
              ) : (
                <Typography color="error" variant="subtitle1">
                  -${value}
                </Typography>
              )}
            </>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard content={false}>
      <Stack sx={{ p: 3 }} spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h5">Monthly Revenuek</Typography>
          <IconButton
            color="secondary"
            id="wallet-button"
            aria-controls={open ? 'wallet-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="wallet-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'wallet-button',
              sx: { p: 1.25, minWidth: 150 }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <ListItemButton onClick={handleClose}>Today</ListItemButton>
            <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
            <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
          </Menu>
        </Stack>
        <Stack>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Typography variant="h5">$746.5k</Typography>
            <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              +20.6
              <ArrowUp size={12} />
            </Typography>
            <Typography></Typography>
          </Stack>
          <Typography color="text.secondary">Past 30 days</Typography>
        </Stack>
      </Stack>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default MonthlyRevenue;
