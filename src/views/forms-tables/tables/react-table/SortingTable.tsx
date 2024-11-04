'use client';

import { Fragment, useMemo } from 'react';

// MATERIAL - UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// THIRD - PARTY
import { useTable, useSortBy, Column, Row, HeaderGroup, Cell } from 'react-table';

// PROJECT IMPORTS
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, HeaderSort, SortingSelect } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const sortBy = { id: 'firstName', desc: false };

  const { allColumns, getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setSortBy } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [sortBy]
      }
    },
    useSortBy
  );

  const sortingRow = rows.slice(0, 9);
  let sortedData = sortingRow.map((d: Row) => d.original);
  Object.keys(sortedData).forEach((key: string) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);

  return (
    <MainCard
      title={downSM ? 'Sorting' : 'Sorting Table'}
      content={false}
      secondary={
        <Stack direction="row" alignItems="center" pl={0.75} spacing={{ xs: 0.75, sm: 2 }}>
          <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
          <CSVExport data={sortedData} filename={'sorting-table.csv'} />
        </Stack>
      }
    >
      <ScrollX>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <Fragment key={index}>
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: HeaderGroup, i: number) => (
                    <Fragment key={i}>
                      <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                        <HeaderSort column={column} sort />
                      </TableCell>
                    </Fragment>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {sortingRow.map((row, index) => {
              prepareRow(row);
              return (
                <Fragment key={index}>
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell: Cell, i: number) => (
                      <Fragment key={i}>
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - SORTING ||============================== //

const SortingTable = () => {
  const data = useMemo(() => makeData(40), []);
  const columns = useMemo(
    () => [
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
        Header: 'Visits',
        accessor: 'visits',
        className: 'cell-center'
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

  return <ReactTable columns={columns} data={data} />;
};

export default SortingTable;
