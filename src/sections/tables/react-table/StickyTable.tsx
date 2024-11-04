import { Fragment, useMemo } from 'react';

// MATERIAL - UI
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// THIRD - PARTY
import { useTable, useSortBy, Column, Row, HeaderGroup, Cell } from 'react-table';
import { useSticky } from 'react-table-sticky';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| REACT TABLE ||============================== //

// table style
const TableWrapper = styled('div')(({ theme }) => ({
  '.header': {
    position: 'sticky',
    zIndex: 1,
    width: 'fit-content'
  },
  '& th[data-sticky-td]': {
    position: 'sticky',
    zIndex: '5 !important'
  }
}));

interface TableProps {
  columns: Column[];
  data: [];
  getHeaderProps: (column: HeaderGroup) => {};
  title?: string;
}

function ReactTable({ columns, data, getHeaderProps, title }: TableProps) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 50,
      width: 100,
      maxWidth: 400
    }),
    []
  );
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useSticky
  );

  const sortingRow = rows.slice(0, 19);
  let sortedData = sortingRow.map((d: Row) => d.original);
  Object.keys(sortedData).forEach((key: string) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);

  return (
    <Stack spacing={10}>
      <MainCard
        title={title}
        content={false}
        secondary={
          <CSVExport data={sortedData} filename={title === 'Sticky Header' ? 'sticky-header-table.csv' : 'sticky-column-table.csv'} />
        }
      >
        <ScrollX sx={{ height: 500 }}>
          <TableWrapper>
            <Table {...getTableProps()} stickyHeader>
              <TableHead>
                {headerGroups.map((headerGroup: HeaderGroup<{}>, index: number) => (
                  <Fragment key={index}>
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: HeaderGroup<{}>, i: number) => {
                        return (
                          <Fragment key={i}>
                            <TableCell
                              sx={{ position: 'sticky !important' }}
                              {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                            >
                              <HeaderSort column={column} />
                            </TableCell>
                          </Fragment>
                        );
                      })}
                    </TableRow>
                  </Fragment>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {sortingRow.map((row: Row, index: number) => {
                  prepareRow(row);
                  return (
                    <Fragment key={index}>
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell: Cell, i: number) => {
                          return (
                            <Fragment key={i}>
                              <TableCell
                                sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.100' : 'common.white' }}
                                {...cell.getCellProps([{ className: cell.column.className }])}
                              >
                                {cell.render('Cell')}
                              </TableCell>
                            </Fragment>
                          );
                        })}
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableWrapper>
        </ScrollX>
      </MainCard>
    </Stack>
  );
}

// ==============================|| REACT TABLE - STICKY ||============================== //

const StickyTable = ({ columns, data, title }: { data: []; columns: Column[]; title?: string }) => {
  return <ReactTable columns={columns} data={data} title={title} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />;
};

export default StickyTable;
