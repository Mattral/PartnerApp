'use client';

import { useMemo, Fragment } from 'react';

// MATERIAL - UI
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// THIRD - PARTY
import { useTable, Column, HeaderGroup, Cell } from 'react-table';
import { LabelKeyObject } from 'react-csv/lib/core';

// PROJECT IMPORTS
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, HidingSelect } from 'components/third-party/ReactTable';

const avatarImage = '/assets/images/users';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const VisibleColumn = ['id', 'role', 'contact', 'country'];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
    allColumns,
    state: { hiddenColumns }
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columns
        .filter((col: Column<{}>) => VisibleColumn.includes(col.accessor as string))
        .map((col) => col.accessor) as string[]
    }
  });

  let headers: LabelKeyObject[] = [];
  allColumns.map((item) => {
    if (!hiddenColumns?.includes(item.id)) {
      headers.push({ label: item.Header as string, key: item.id });
    }
    return item;
  });

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ p: 2, pb: 0 }}>
        <HidingSelect hiddenColumns={hiddenColumns!} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
        <CSVExport data={data} filename={'hiding-column-table.csv'} headers={headers} />
      </Stack>
      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups.map((headerGroup: HeaderGroup<{}>, i: number) => (
            <Fragment key={i}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: HeaderGroup, index: number) => (
                  <Fragment key={index}>
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
                  {row.cells.map((cell: Cell, index: number) => (
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
    </Stack>
  );
}

// ==============================|| REACT TABLE - COLUMN HIDING ||============================== //

const ColumnHidingTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        className: 'cell-center',
        Cell: ({ value }: { value: number }) => <Avatar alt="Avatar 1" size="sm" src={`${avatarImage}/avatar-${value}.png`} />
      },
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Age',
        accessor: 'age',
        className: 'cell-center'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Contact',
        accessor: 'contact'
      },
      {
        Header: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        className: 'cell-right'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  const data = useMemo(() => makeData(15), []);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default ColumnHidingTable;
