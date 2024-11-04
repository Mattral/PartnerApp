// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Chip from '@mui/material/Chip';
import Links from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// TYPES
import { ColorProps } from 'types/extended';

// TABLE DATA
const createData = (badgeText: string, badgeType: string, subject: string, dept: string, date: string) => ({
  badgeText,
  badgeType,
  subject,
  dept,
  date
});

const rows = [
  createData('Open', 'default', 'Website down for one week', 'Support', 'Today 2:00'),
  createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
  createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
  createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
  createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
  createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
  createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
  createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug')
];

// ==========================|| DATA WIDGET - RECENT TICKETS ||========================== //

const RecentTickets = () => (
  <MainCard
    title="Recent Tickets"
    content={false}
    secondary={
      <Links component={Link} href="#" color="primary">
        View all
      </Links>
    }
  >
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>Subject</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right" sx={{ pr: 3 }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            let color: ColorProps = 'secondary';
            switch (row.badgeText.toLowerCase()) {
              case 'open':
                color = 'success';
                break;
              case 'progress':
                color = 'primary';
                break;
              case 'error':
              default:
                color = 'error';
            }
            return (
              <TableRow hover key={index} sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                <TableCell sx={{ pl: 3 }}>{row.subject}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <Chip color={color} label={row.badgeText.toLowerCase()} size="small" variant="light" sx={{ borderRadius: 1 }} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </MainCard>
);

export default RecentTickets;
