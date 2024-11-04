import { useState } from 'react';

// MATERIAL-UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { PDFDownloadLink } from '@react-pdf/renderer';

// PROJECT IMPORTS
import ListCard from './export-pdf/ListCard';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';

// TYPES
import { CustomerList } from 'types/customer';

// ASSETS
import { DocumentDownload, Edit, Trash } from 'iconsax-react';

interface Props {
  customer: CustomerList;
  open: boolean;
  onClose: () => void;
  editCustomer: () => void;
}

const avatarImage = '/assets/images/users';

export default function CustomerPreview({ customer, open, onClose, editCustomer }: Props) {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = () => {
    setOpenAlert(!openAlert);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={PopupTransition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiDialog-paper': { width: 1024, maxWidth: 1, m: { xs: 1.75, sm: 2.5, md: 4 } } }}
      >
        <Box id="PopupPrint" sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 1 }}>
          <DialogTitle sx={{ px: 0 }}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                    <PDFDownloadLink document={<ListCard customer={customer} />} fileName={`Customer-${customer.name}.pdf`}>
                      <Tooltip title="Export">
                        <IconButton color="secondary">
                          <DocumentDownload />
                        </IconButton>
                      </Tooltip>
                    </PDFDownloadLink>
                    <Tooltip title="Edit">
                      <IconButton color="secondary" onClick={editCustomer}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" onClick={handleClose}>
                      <IconButton color="error">
                        <Trash />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemAvatar sx={{ mr: 0.75 }}>
                  <Avatar alt={customer.name} size="lg" src={`${avatarImage}/avatar-${!customer.avatar ? 1 : customer.avatar}.png`} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">{customer.name}</Typography>}
                  secondary={<Typography color="secondary">{customer.role}</Typography>}
                />
              </ListItem>
            </List>
          </DialogTitle>
          <DialogContent dividers sx={{ px: 0 }}>
            <SimpleBar sx={{ height: 'calc(100vh - 290px)' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} xl={9}>
                  <Grid container spacing={2.25}>
                    <Grid item xs={12}>
                      <MainCard title="About me">
                        <Typography>
                          Hello, Myself {customer.name}, I’m {customer.role} in an international company, {customer.about}
                        </Typography>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Education">
                        {/* Education section remains the same */}
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Employment">
                        {/* Employment section remains the same */}
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Skills">
                        {/* Skills section remains the same */}
                      </MainCard>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                  <MainCard>
                    <Stack spacing={2}>
                      {/* Replace service fee and day selection with PDF view */}
                      <Stack spacing={0.5}>
                        <Typography color="secondary">View My Documents</Typography>
                        <Stack spacing={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            href="/example.pdf"
                            target="_blank"
                            sx={{ mb: 1 }}
                          >
                            View Document
                          </Button>

                        </Stack>
                      </Stack>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            </SimpleBar>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
