'use client';

import { useState, useEffect } from 'react';

// MATERIAL-UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// PROJECT IMPORT
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { DebouncedInput } from 'components/third-party/DebouncedInput';
import CustomerCard from 'sections/apps/customer/ScheduleCard';
import CustomerModal from 'sections/apps/customer/ScheduleModal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import usePagination from 'hooks/usePagination';
import { useGetCustomer } from 'api/customer';

// ASSETS
import { Add } from 'iconsax-react';

// TYPES
import { CustomerList } from 'types/customer';

// ==============================|| CUSTOMER - CARD ||============================== //

const allColumns = [
  {
    id: 1,
    header: 'Default'
  },
  {
    id: 2,
    header: 'Advisor Name'
  },
  {
    id: 3,
    header: 'Email'
  },
  {
    id: 4,
    header: 'Contact'
  },
  {
    id: 5,
    header: 'Age'
  },
  {
    id: 6,
    header: 'Country'
  },
  {
    id: 7,
    header: 'Status'
  }
];

const legalDomains = [
  'Corporate Law',
  'Family Law',
  'Intellectual Property',
  'Labor Law',
  'Real Estate Law'
];

function dataSort(data: CustomerList[], sortBy: string) {
  return data.sort(function (a: any, b: any) {
    if (sortBy === 'Advisor Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Email') return a.email.localeCompare(b.email);
    if (sortBy === 'Contact') return a.contact.localeCompare(b.contact);
    if (sortBy === 'Age') return b.age < a.age ? 1 : -1;
    if (sortBy === 'Country') return a.country.localeCompare(b.country);
    if (sortBy === 'Status') return a.status.localeCompare(b.status);
    return a;
  });
}

const CustomerCardPage = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { customers: lists } = useGetCustomer();

  const [sortBy, setSortBy] = useState('Default');
  const [globalFilter, setGlobalFilter] = useState('');
  const [userCard, setUserCard] = useState<CustomerList[]>([]);
  const [page, setPage] = useState(1);
  const [customerLoading, setCustomerLoading] = useState<boolean>(true);
  const [customerModal, setCustomerModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const handleChangeDomain = (event: SelectChangeEvent) => {
    setSelectedDomain(event.target.value as string);
  };

  // search
  useEffect(() => {
    setCustomerLoading(true);
    if (lists && lists.length > 0) {
      const newData = lists.filter((value: any) => {
        if (globalFilter) {
          return value.name.toLowerCase().includes(globalFilter.toLowerCase());
        } else {
          return value;
        }
      });
      setUserCard(dataSort(newData, sortBy).reverse());
      setCustomerLoading(false);
    }
    // eslint-disable-next-line
  }, [globalFilter, lists, sortBy]);

  const PER_PAGE = 6;

  const count = Math.ceil(userCard.length / PER_PAGE);
  const _DATA = usePagination(userCard, PER_PAGE);

  const handleChangePage = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Box sx={{ position: 'relative', marginBottom: 3 }}>
        <Stack direction="row" alignItems="center">
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            sx={{ width: '100%' }}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <DebouncedInput
              value={globalFilter ?? ''}
              onFilterChange={(value) => setGlobalFilter(String(value))}
              placeholder={`Search ${userCard.length} records...`}
            />

            {/* Date time selection */}
            <Stack direction="row" spacing={2}>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date || undefined)} // Handle null as undefined
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="w-full rounded bg-white-3 p-2 focus:outline-none"
              />
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date || undefined)} // Handle null as undefined
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="w-full rounded bg-white-3 p-2 focus:outline-none"
              />
            </Stack>

            {/* Sort by legal domains */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedDomain}
                onChange={handleChangeDomain}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <Typography variant="subtitle1">Legal Domain</Typography>;
                  }

                  return <Typography variant="subtitle2">{selectedDomain}</Typography>;
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {legalDomains.map((domain, index) => (
                  <MenuItem key={index} value={domain}>
                    {domain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={sortBy}
                onChange={handleChangeSort}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <Typography variant="subtitle1">Sort By</Typography>;
                  }

                  return <Typography variant="subtitle2">Sort by ({sortBy})</Typography>;
                }}
              >
                {allColumns.map((column) => {
                  return (
                    <MenuItem key={column.id} value={column.header}>
                      {column.header}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>


          </Stack>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {!customerLoading && userCard.length > 0 ? (
          _DATA.currentData().map((user: CustomerList, index: number) => (
            <Slide key={index} direction="up" in={true} timeout={50}>
              <Grid item xs={12} sm={6} lg={4}>
                <CustomerCard customer={user} />
              </Grid>
            </Slide>
          ))
        ) : (
          <EmptyUserCard title={customerLoading ? 'Loading...' : 'You have not created any customer yet.'} />
        )}
      </Grid>
      <Stack spacing={2} sx={{ p: 2.5 }} alignItems="flex-end">
        <Pagination
          sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
          count={count}
          size="medium"
          page={page}
          showFirstButton
          showLastButton
          variant="combined"
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>
      <CustomerModal open={customerModal} modalToggler={setCustomerModal} />
    </>
  );
};

export default CustomerCardPage;
