'use client';

import { useMemo, Fragment } from 'react';

// MATERIAL - UI
import { alpha, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// THIRD - PARTY
import { useFilters, useRowSelect, useTable, usePagination, Column, Row, HeaderGroup, Cell } from 'react-table';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

import makeData from 'data/react-table';
import SyntaxHighlight from 'utils/SyntaxHighlight';
import { renderFilterTypes } from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { selectedRowIds, pageIndex, pageSize },
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, selectedRowIds: { 0: true, 5: true, 7: true } }
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns: Column[]) => [
        {
          id: 'row-selection-chk',
          accessor: 'Selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ]);
    }
  );

  return (
    <MainCard
      title="Row Selection (Pagination)"
      content={false}
      secondary={<CSVExport data={selectedFlatRows.map((d: Row) => d.original)} filename={'row-selection-table.csv'} />}
    >
      <ScrollX>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={3}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup, index) => (
                <Fragment key={index}>
                  <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                    {headerGroup.headers.map((column: HeaderGroup, i: number) => (
                      <Fragment key={i}>
                        <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                </Fragment>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row: Row, index: number) => {
                prepareRow(row);
                return (
                  <Fragment key={index}>
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell: Cell, i: number) => (
                        <Fragment key={i}>
                          <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                        </Fragment>
                      ))}
                    </TableRow>
                  </Fragment>
                );
              })}
              <TableRow>
                <TableCell sx={{ p: 2, pb: 0 }} colSpan={8}>
                  <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <SyntaxHighlight>
            {JSON.stringify(
              {
                selectedRowIndices: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map((d: Row) => d.original)
              },
              null,
              2
            )}
          </SyntaxHighlight>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - ROW SELECTION ||============================== //

const RowSelectionTable = () => {
  const data = useMemo(() => makeData(2000), []);
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

  return <ReactTable columns={columns} data={data} />;
};

export default RowSelectionTable;
