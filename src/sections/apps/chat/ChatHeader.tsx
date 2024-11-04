// material-ui
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// project-import
import UserAvatar from './UserAvatar';
import IconButton from 'components/@extended/IconButton';

// assets
import { HambergerMenu } from 'iconsax-react';

// types
import { UserProfile } from 'types/user-profile';

interface Props {
  loading: boolean;
  user: UserProfile;
  handleDrawerOpen: () => void;
}

// ==============================|| CHAT HEADER ||============================== //

const ChatHeader = ({ loading, user, handleDrawerOpen }: Props) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton onClick={handleDrawerOpen} color="secondary" size="large">
        <HambergerMenu />
      </IconButton>
      {loading && Object.keys(user).length === 0 ? (
        <List disablePadding>
          <ListItem disablePadding disableGutters>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              sx={{ my: 0 }}
              primary={<Skeleton animation="wave" height={24} width={50} />}
              secondary={<Skeleton animation="wave" height={16} width={80} />}
            />
          </ListItem>
        </List>
      ) : (
        <>
          <UserAvatar
            user={{
              online_status: user.online_status,
              avatar: user.avatar,
              name: user.name
            }}
          />
          <Stack>
            <Typography variant="subtitle1">{user.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              Active {user.lastMessage} ago
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ChatHeader;
