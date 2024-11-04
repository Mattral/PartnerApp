import { Fragment, useCallback, useMemo, useState } from 'react';

// MATERIAL - UI
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// THIRD - PARTY
import { Cell, Column, HeaderGroup, Row, useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import update from 'immutability-helper';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, DraggableRow } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// ==============================|| REACT TABLE ||============================== //

const ReactTable = ({ columns, data }: { columns: Column[]; data: [] }) => {
  const [records, setRecords] = useState(data);

  const getRowId = useCallback((row: any) => row.id, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    data: records,
    columns,
    getRowId
  });

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord]
        ]
      })
    );
  };

  return (
    <ScrollX>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: HeaderGroup<{}>, index: number) => (
            <Fragment key={index}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                <TableCell />
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
          {rows.map((row: Row, index: number) => {
            prepareRow(row);
            return (
              <Fragment key={index}>
                <DraggableRow index={index} moveRow={moveRow} {...row.getRowProps()}>
                  {row.cells.map((cell: Cell, i: number) => (
                    <Fragment key={i}>
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    </Fragment>
                  ))}
                </DraggableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </ScrollX>
  );
};

// ==============================|| REACT TABLE - ROW DRAG & DROP ||============================== //

const RowDragDrop = ({ data }: { data: [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
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

  return (
    <MainCard title="Row Drag & Drop" content={false} secondary={<CSVExport data={data} filename={'row-dragable-table.csv'} />}>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <ReactTable columns={columns} data={data} />
      </DndProvider>
    </MainCard>
  );
};

export default RowDragDrop;
