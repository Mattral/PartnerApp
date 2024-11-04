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
                    <Tooltip title="Other">
                      <IconButton color="secondary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Close" onClick={handleClose}>
                      <IconButton color="error">
                        <Trash />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemAvatar sx={{ mr: 0.75 }}>
                  <Avatar alt="sth" size="lg" src='/example.png' />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">Lorum Ipsum</Typography>}
                  secondary={<Typography color="secondary">Advisor</Typography>}
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
                          Years of Experience: { Years }
                        </Typography>
                        <Typography>
                          Address: somewhere location
                        </Typography>
                        <Typography>
                          Phone: 999 888 777
                        </Typography>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Education">
                        <List sx={{ py: 0 }}>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Master Degree</Typography>
                                  <Typography>2014-2017</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>Harvard Law School</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Employment">
                        <List sx={{ py: 0 }}>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Law professor </Typography>
                                  <Typography>2018 - Current</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Company</Typography>
                                  <Typography>London University</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Schedule">
                        <Stack spacing={1}>
                          <Typography variant="body2">Additional Notes</Typography>

                            <Typography color="secondary">if there are any notes to pass, appear here </Typography>
                          
                          <Typography variant="body2">Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}</Typography>
                        </Stack>
                      </MainCard>
                    </Grid>
              
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <MainCard title="Uploaded Files (each to be linked with "./example.pdf")">
                      <Stack spacing={1}>
                        <Button variant="outlined">Document 1/Button>
                        <Button variant="outlined">Document 2</Button>
                        <Button variant="outlined">Document 3</Button>
                      </Stack>
                    </MainCard>

                    <MainCard title="Availibility">
                      <Stack spacing={1}>
                        <Button variant="outlined">Probono- Weekends</Button>
                        <Button variant="outlined">Professional -Weekdays</Button>
                      </Stack>
                    </MainCard>
                </Grid>

              </Grid>
            </SimpleBar>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleRequest}>Approve</Button>
            <Button variant="outlined" color="error" onClick={handleClose}>Deny</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Approved successfully!
        </Alert>
      </Snackbar>
      
    </>