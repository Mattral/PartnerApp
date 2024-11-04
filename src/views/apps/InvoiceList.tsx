'use client';

import { useMemo, useEffect, Fragment, useState, useRef, ChangeEvent, Ref } from 'react';

// NEXT
import { useRouter } from 'next/navigation';

// MATERIAL - UI
import { alpha, useTheme, PaletteColor } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

// THIRD - PARTY
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Column,
  HeaderGroup,
  Row,
  Cell,
  HeaderProps
} from 'react-table';

// PROJECT IMPORTS
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import EmptyTables from 'views/forms-tables/tables/react-table/EmptyTable';
import InvoiceCard from 'components/cards/invoice/InvoiceCard';
import InvoiceChart from 'components/cards/invoice/InvoiceChart';
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';
import AlertProductDelete from 'sections/apps/invoice/AlertProductDelete';

import { APP_DEFAULT_PATH } from 'config';
import { handlerDelete, deleteInvoice, useGetInvoice, useGetInvoiceMaster } from 'api/invoice';
import { openSnackbar } from 'api/snackbar';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// ASSETS
import { Edit, Eye, InfoCircle, ProfileTick, Trash } from 'iconsax-react';

// TYPES
import { InvoiceList } from 'types/invoice';
import { SnackbarProps } from 'types/snackbar';

interface InvoiceWidgets {
  title: string;
  count: string;
  percentage: number;
  isLoss: boolean;
  invoice: string;
  color: PaletteColor;
  chartData: number[];
}

const avatarImage = '/assets/images/users';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: InvoiceList[];
}

function ReactTable({ columns, data }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'customer_name', desc: false };

  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      sortBy: [sortBy],
      hiddenColumns: ['avatar', 'email'],
      pageIndex: 0,
      pageSize: 5
    }),
    // eslint-disable-next-line
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    allColumns,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    setSortBy
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const componentRef: Ref<HTMLDivElement> = useRef(null);

  // ================ Tab ================

  const groups = ['All', ...new Set(data.map((item: InvoiceList) => item.status))];
  const countGroup = data.map((item: InvoiceList) => item.status);
  const counts = countGroup.reduce(
    (acc: any, value: any) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('status', activeTab === 'All' ? '' : activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e: ChangeEvent<{}>, value: string) => setActiveTab(value)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {groups.map((status: string, index: number) => (
            <Tab
              key={index}
              label={status}
              value={status}
              icon={
                <Chip
                  label={
                    status === 'All'
                      ? data.length
                      : status === 'Paid'
                        ? counts.Paid
                        : status === 'Unpaid'
                          ? counts.Unpaid
                          : counts.Cancelled
                  }
                  color={status === 'All' ? 'primary' : status === 'Paid' ? 'success' : status === 'Unpaid' ? 'warning' : 'error'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 3 }}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </Stack>
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 2}>
          <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
          <CSVExport data={data} filename={'invoice-list.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index: number) => (
              <Fragment key={index}>
                <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                  {headerGroup.headers.map((column: HeaderGroup<{}>, i: number) => (
                    <Fragment key={index}>
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
            {page.map((row: Row, i: number) => {
              prepareRow(row);

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell: Cell, index: number) => (
                      <Fragment key={index}>
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

// ==============================|| INVOICE - LIST ||============================== //

const InvoiceLists = () => {
  const { invoiceLoading, invoice: list } = useGetInvoice();
  const { invoiceMaster } = useGetInvoiceMaster();
  const [invoiceId, setInvoiceId] = useState(0);

  const handleClose = (status: boolean) => {
    if (status) {
      deleteInvoice(invoiceId);
      openSnackbar({
        open: true,
        message: 'Column deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    }
    handlerDelete(false);
  };
  const router = useRouter();

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: ({ getToggleAllPageRowsSelectedProps }: HeaderProps<{}>) => (
          <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
        ),
        accessor: 'selection',
        Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: 'Invoice Id',
        accessor: 'id',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'User Name',
        accessor: 'customer_name',
        disableFilters: true,
        Cell: ({ row }: { row: Row }) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar alt="Avatar" size="sm" src={`${avatarImage}/avatar-${!values.avatar ? 1 : values.avatar}.png`} />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.customer_name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {values.email}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableFilters: true
      },
      {
        Header: 'Create Date',
        accessor: 'date'
      },
      {
        Header: 'Due Date',
        accessor: 'due_date'
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        disableFilters: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableFilters: true,
        filter: 'includes',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Cancelled':
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 'Paid':
              return <Chip color="success" label="Paid" size="small" variant="light" />;
            case 'Unpaid':
            default:
              return <Chip color="info" label="Unpaid" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: { row: Row<{}> }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton
                  color="secondary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    router.push(`/apps/invoice/details/${row.values.id}`);
                  }}
                >
                  <Eye />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    router.push(`/apps/invoice/edit/${row.values.id}`);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setInvoiceId(row.values.id);
                    handlerDelete(true);
                  }}
                >
                  <Trash />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const widgetsData: InvoiceWidgets[] = [
    {
      title: 'Paid',
      count: '$7,825',
      percentage: 70.5,
      isLoss: false,
      invoice: '9',
      color: theme.palette.success,
      chartData: [200, 600, 100, 400, 300, 400, 50]
    },
    {
      title: 'Unpaid',
      count: '$1,880',
      percentage: 27.4,
      isLoss: true,
      invoice: '6',
      color: theme.palette.warning,
      chartData: [100, 550, 300, 350, 200, 100, 300]
    },
    {
      title: 'Overdue',
      count: '$3,507',
      percentage: 27.4,
      isLoss: true,
      invoice: '4',
      color: theme.palette.error,
      chartData: [100, 550, 200, 300, 100, 200, 300]
    }
  ];

  let breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Invoice', to: '/apps/invoice/dashboard' }, { title: 'List' }];

  return (
    <>
      <Breadcrumbs custom heading="Invoice List" links={breadcrumbLinks} />
      <Grid container direction={matchDownSM ? 'column' : 'row'} spacing={2} sx={{ pb: 2 }}>
        <Grid item md={8}>
          <Grid container direction="row" spacing={2}>
            {widgetsData.map((widget: InvoiceWidgets, index: number) => (
              <Grid item sm={4} xs={12} key={index}>
                <MainCard>
                  <InvoiceCard
                    title={widget.title}
                    count={widget.count}
                    percentage={widget.percentage}
                    isLoss={widget.isLoss}
                    invoice={widget.invoice}
                    color={widget.color.main}
                  >
                    <InvoiceChart color={widget.color} data={widget.chartData} />
                  </InvoiceCard>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Box
            sx={{
              background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              borderRadius: 1,
              p: 1.75
            }}
          >
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar alt="Natacha" variant="rounded" type="filled">
                  <ProfileTick style={{ fontSize: '20px' }} />
                </Avatar>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" color="white">
                      Total Recievables
                    </Typography>
                    <InfoCircle color={theme.palette.background.paper} />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" color="white">
                      Current
                    </Typography>
                    <Typography variant="body1" color="white">
                      109.1k
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="white">
                  Overdue
                </Typography>
                <Typography variant="body1" color="white">
                  62k
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h4" color="white" sx={{ pt: 2, pb: 1, zIndex: 1 }}>
              $43,078
            </Typography>
            <Box sx={{ maxWidth: '100%' }}>
              <LinearWithLabel value={90} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <MainCard content={false}>
        <ScrollX>
          {invoiceLoading ? <EmptyTables /> : <ReactTable {...{ data: list, columns }} />}
          <AlertProductDelete
            title={invoiceId.toString()}
            open={invoiceMaster ? invoiceMaster.alertPopup : false}
            handleClose={handleClose}
          />
        </ScrollX>
      </MainCard>
    </>
  );
};

function LinearWithLabel({ value, ...others }: LinearProgressProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color="warning" variant="determinate" value={value} {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(value!)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default InvoiceLists;
