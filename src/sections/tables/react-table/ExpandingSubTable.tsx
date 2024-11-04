import { useCallback, useEffect, useMemo, useState, FC, Fragment } from 'react';

// MATERIAL - UI
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// THIRD - PARTY
import { useExpanded, useTable, Column, HeaderGroup, Cell, Row, CellProps } from 'react-table';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';
import mockData from 'utils/mock-data';

// ASSETS
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';

const avatarImage = '/assets/images/users';

// ==============================|| SUB TABLE ||============================== //

function ReactSubTable({ columns, data, loading }: { columns: Column[]; data: []; loading: boolean }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  if (loading) {
    return (
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <Fragment key={index}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i: number) => (
                  <Fragment key={i}>
                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {[0, 1, 2].map((item: number) => (
            <TableRow key={item}>
              {[0, 1, 2, 3, 4, 5].map((col: number) => (
                <TableCell key={col}>
                  <Skeleton animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table {...getTableProps()}>
      <TableHead>
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
        {rows.map((row, index) => {
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
  );
}

// ==============================|| SUB ROW - ASYNC DATA ||============================== //

function SubRowAsync() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[]>([]);
  const numRows = mockData(1);

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        className: 'cell-center',
        Cell: ({ value }: { value: string }) => <Avatar alt="Avatar 1" size="sm" src={`${avatarImage}/avatar-${value}.png`} />
      },
      {
        Header: 'Name',
        accessor: 'fatherName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Contact',
        accessor: 'contact',
        className: 'cell-right'
      },
      {
        Header: 'Country',
        accessor: 'country'
      }
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(makeData(numRows.number.status(1, 5)));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <MainCard
          title="Sub Table"
          secondary={<CSVExport data={data} filename={'expanded-sub-table-data.csv'} />}
          content={false}
          sx={{ ml: { xs: 2.5, sm: 5, md: 6, lg: 10, xl: 12 } }}
        >
          <ReactSubTable columns={columns} data={data} loading={loading} />
        </MainCard>
      </TableCell>
    </TableRow>
  );
}

// ==============================|| REACT TABLE ||============================== //

interface TableProps {
  columns: Column[];
  data: [];
  renderRowSubComponent: FC<any>;
}

function ReactTable({ columns: userColumns, data, renderRowSubComponent }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    {
      columns: userColumns,
      data
    },
    useExpanded
  );

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
        {rows.map((row: Row, i: number) => {
          prepareRow(row);
          const rowProps = row.getRowProps();

          return (
            <Fragment key={i}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: Cell<{}>, index: number) => (
                  <Fragment key={index}>
                    <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                  </Fragment>
                ))}
              </TableRow>
              {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| REACT TABLE - EXPANDING SUB TABLE ||============================== //

const ExpandingSubTable = ({ data }: { data: [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: ({ row }: CellProps<{}>) => {
          const collapseIcon = row.isExpanded ? <ArrowDown2 size={14} /> : <ArrowRight2 size={14} />;
          return (
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
              {collapseIcon}
            </Box>
          );
        },
        SubCell: () => null
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

  const renderRowSubComponent = useCallback(() => <SubRowAsync />, []);

  return (
    <MainCard title="Expanding Sub Table" content={false} secondary={<CSVExport data={data} filename={'expanding-sub-table.csv'} />}>
      <ScrollX>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

export default ExpandingSubTable;
