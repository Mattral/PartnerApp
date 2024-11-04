'use client';

import { Fragment, useMemo } from 'react';

// MATERIAL - UI
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Stack from '@mui/material/Stack';

// THIRD - PARTY
import { useTable, useFilters, useGlobalFilter, Column, Row, HeaderGroup, Cell } from 'react-table';

// PROJECT IMPORTS
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, EmptyTable } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  renderFilterTypes,
  filterGreaterThan
} from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, preGlobalFilteredRows, setGlobalFilter } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState,
        filterTypes
      },
      useGlobalFilter,
      useFilters
    );

  const sortingRow = rows.slice(0, 10);

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        <CSVExport data={rows.map((d: Row) => d.original)} filename={'empty-table.csv'} />
      </Stack>

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups.map((headerGroup, index) => (
            <Fragment key={index}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
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
          {headerGroups.map((group: HeaderGroup<{}>, index: number) => (
            <Fragment key={index}>
              <TableRow {...group.getHeaderGroupProps()}>
                {group.headers.map((column: HeaderGroup, i: number) => (
                  <Fragment key={i}>
                    <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          ))}
          {sortingRow.length > 0 ? (
            sortingRow.map((row, index) => {
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
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={7} />
          )}
        </TableBody>

        {/* footer table */}
        <TableFooter sx={{ borderBottomWidth: 2 }}>
          {footerGroups.map((group, index) => (
            <Fragment key={index}>
              <TableRow {...group.getFooterGroupProps()}>
                {group.headers.map((column: HeaderGroup, i: number) => (
                  <Fragment key={i}>
                    <TableCell {...column.getFooterProps([{ className: column.className }])}>{column.render('Footer')}</TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          ))}
        </TableFooter>
      </Table>
    </>
  );
}

// ==============================|| REACT TABLE - EMPTY ||============================== //

const EmptyTables = () => {
  const data = useMemo(() => makeData(0), []);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'firstName'
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'lastName',
          filter: 'fuzzyText'
        },
        {
          Header: 'Email',
          Footer: 'Email',
          accessor: 'email'
        },
        {
          Header: 'Age',
          Footer: 'Age',
          accessor: 'age',
          className: 'cell-center',
          Filter: SliderColumnFilter,
          filter: 'equals'
        },
        {
          Header: 'Visits',
          Footer: 'Visits',
          accessor: 'visits',
          className: 'cell-right',
          Filter: NumberRangeColumnFilter,
          filter: 'between'
        },
        {
          Header: 'Status',
          Footer: 'Status',
          accessor: 'status',
          Filter: SelectColumnFilter,
          filter: 'includes',
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
          Footer: 'Profile Progress',
          accessor: 'progress',
          Filter: SliderColumnFilter,
          filter: filterGreaterThan,
          Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
        }
      ] as Column[],
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default EmptyTables;
