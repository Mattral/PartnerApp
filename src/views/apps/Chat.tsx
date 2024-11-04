'use client';

import { useEffect, useRef, useState } from 'react';

// MATERIAL - UI
import { useTheme, styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Popper from '@mui/material/Popper';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// THIRD - PARTY
import EmojiPicker, { SkinTones, EmojiClickData } from 'emoji-picker-react';

// PROJECT IMPORTS
import ChatHeader from 'sections/apps/chat/ChatHeader';
import ChatDrawer from 'sections/apps/chat/ChatDrawer';
import ChatHistory from 'sections/apps/chat/ChatHistory';
import UserDetails from 'sections/apps/chat/UserDetails';

import MainCard from 'components/MainCard';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';

import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { openSnackbar } from 'api/snackbar';
import { insertChat, useGetUsers } from 'api/chat';
import incrementer from 'utils/incrementer';

// ASSETS
import {
  Add,
  Call,
  Camera,
  DocumentDownload,
  EmojiHappy,
  Image as ImageIcon,
  InfoCircle,
  Paperclip,
  Send,
  Trash,
  VolumeHigh,
  VolumeMute
} from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';
import { SnackbarProps } from 'types/snackbar';
import { UserProfile } from 'types/user-profile';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

// ==============================|| APPLICATION - CHAT ||============================== //

const Chat = () => {
  const theme = useTheme();
  const { usersLoading, users } = useGetUsers();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [emailDetails, setEmailDetails] = useState(false);
  const [user, setUser] = useState<UserProfile>({});

  const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>(null);

  useEffect(() => {
    if (!usersLoading) {
      const newUser = users.filter((item) => item.id?.toString() === '2')[0];
      setUser(newUser);
    }
    // eslint-disable-next-line
  }, [usersLoading]);

  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleUserChange = () => {
    setEmailDetails((prev) => !prev);
  };

  const [openChatDrawer, setOpenChatDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  const [anchorElEmoji, setAnchorElEmoji] = useState<any>(); /** No single type can cater for all elements */

  const handleOnEmojiButtonClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  };

  // handle new message form
  const [message, setMessage] = useState('');
  const textInput = useRef(null);

  const handleOnSend = () => {
    if (message.trim() === '') {
      openSnackbar({
        open: true,
        message: 'Message required',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    } else {
      const d = new Date();
      const newMessage = {
        id: Number(incrementer(users.length)),
        from: 'User1',
        to: user.name,
        text: message,
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      insertChat(user.name!, newMessage);
    }
    setMessage('');
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  // handle emoji
  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setMessage(message + emojiObject.emoji);
  };

  const emojiOpen = Boolean(anchorElEmoji);
  const emojiId = emojiOpen ? 'simple-popper' : undefined;

  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setOpenChatDrawer(!matchDownSM);
  }, [matchDownSM]);

  return (
    <Box sx={{ display: 'flex' }}>
      <ChatDrawer
        openChatDrawer={openChatDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setUser={setUser}
        selectedUser={usersLoading || Object.keys(user).length === 0 ? null : user.id!}
      />
      <Main theme={theme} open={openChatDrawer}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={emailDetails ? 8 : 12}
            xl={emailDetails ? 9 : 12}
            sx={{
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter + 200
              })
            }}
          >
            <MainCard
              content={false}
              sx={{
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
                pt: 2,
                pl: 2,
                borderRadius: emailDetails ? '0' : '0 12px 12px 0',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.shorter + 200
                })
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ bgcolor: 'background.paper', pr: 2, pb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Grid container justifyContent="space-between" spacing={1.5}>
                    <Grid item>
                      <ChatHeader loading={usersLoading} user={user} handleDrawerOpen={handleDrawerOpen} />
                    </Grid>
                    <Grid item>
                      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                        <IconButton size="large" color="secondary">
                          <Call />
                        </IconButton>
                        <IconButton size="large" color="secondary">
                          <Camera />
                        </IconButton>
                        <IconButton onClick={handleUserChange} size="large" color={emailDetails ? 'error' : 'secondary'}>
                          {emailDetails ? <Add style={{ transform: 'rotate(45deg)' }} /> : <InfoCircle />}
                        </IconButton>
                        <IconButton onClick={handleClickSort} sx={{ transform: 'rotate(90deg)' }} size="large" color="secondary">
                          <MoreIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleCloseSort}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                          sx={{ p: 0, '& .MuiMenu-list': { p: 0 } }}
                        >
                          <MenuItem onClick={handleCloseSort}>
                            <DocumentDownload style={{ paddingRight: 8 }} />
                            <Typography>Archive</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleCloseSort}>
                            <VolumeMute style={{ paddingRight: 8 }} />
                            <Typography>Muted</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleCloseSort}>
                            <Trash style={{ paddingRight: 8 }} />
                            <Typography>Delete</Typography>
                          </MenuItem>
                        </Menu>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <SimpleBar
                    sx={{
                      overflowX: 'hidden',
                      height: 'calc(100vh - 416px)',
                      minHeight: 420,
                      '& .simplebar-content': {
                        height: '100%'
                      }
                    }}
                  >
                    <Box sx={{ pl: 1, pr: 3, height: '100%' }}>
                      {usersLoading || Object.keys(user).length === 0 ? (
                        <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                          <CircularWithPath />
                        </Stack>
                      ) : (
                        <ChatHistory theme={theme} user={user} />
                      )}
                    </Box>
                  </SimpleBar>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Stack>
                    <TextField
                      inputRef={textInput}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Your Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value.length <= 1 ? e.target.value.trim() : e.target.value)}
                      onKeyDown={handleEnter}
                      variant="standard"
                      sx={{ pr: 2, '& .MuiInput-root:before': { borderBottomColor: theme.palette.divider } }}
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" sx={{ py: 2, ml: -1 }}>
                        <>
                          <IconButton
                            ref={anchorElEmoji}
                            aria-describedby={emojiId}
                            onClick={handleOnEmojiButtonClick}
                            sx={{ opacity: 0.5 }}
                            size="medium"
                            color="secondary"
                          >
                            <EmojiHappy />
                          </IconButton>
                          <Popper
                            id={emojiId}
                            open={emojiOpen}
                            anchorEl={anchorElEmoji}
                            disablePortal
                            style={{ zIndex: 1200 }}
                            popperOptions={{
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [-20, 125]
                                  }
                                }
                              ]
                            }}
                          >
                            <ClickAwayListener onClickAway={handleCloseEmoji}>
                              <MainCard elevation={8} content={false}>
                                <EmojiPicker onEmojiClick={onEmojiClick} defaultSkinTone={SkinTones.DARK} autoFocusSearch={false} />
                              </MainCard>
                            </ClickAwayListener>
                          </Popper>
                        </>
                        <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
                          <Paperclip />
                        </IconButton>
                        <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
                          <ImageIcon />
                        </IconButton>
                        <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
                          <VolumeHigh />
                        </IconButton>
                      </Stack>
                      <IconButton color="primary" onClick={handleOnSend} size="large" sx={{ mr: 1.5 }}>
                        <Send />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={4} xl={3} sx={{ overflow: 'hidden', display: emailDetails ? 'flex' : 'none' }}>
            <Collapse orientation="horizontal" in={emailDetails && !matchDownMD}>
              <UserDetails user={user} onClose={handleUserChange} />
            </Collapse>
          </Grid>

          <Dialog TransitionComponent={PopupTransition} onClose={handleUserChange} open={matchDownMD && emailDetails} scroll="body">
            <UserDetails user={user} onClose={handleUserChange} />
          </Dialog>
        </Grid>
      </Main>
    </Box>
  );
};

export default Chat;
