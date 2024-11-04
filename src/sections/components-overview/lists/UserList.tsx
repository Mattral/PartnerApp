// MATERIAL - UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import AntAvatar from 'components/@extended/Avatar';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';

// ASSETS
const avatarImage = '/assets/images/users';

// ==============================|| LIST - USER ||============================== //

const UserList = () => {
  const userListCodeString = `<List sx={{ p: 0 }}>
  <ListItem
    divider
    secondaryAction={
      <IconButton sx={{ transform: 'rotate(90deg)' }} edge="end" aria-label="delete">
        <MoreIcon />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <AntAvatar alt="Avatar" src={'${avatarImage}/avatar-4.png'} />
    </ListItemAvatar>
    <ListItemText primary="Jone Doe" secondary="Developer" />
  </ListItem>
  <ListItem
    secondaryAction={
      <IconButton sx={{ transform: 'rotate(90deg)' }} edge="end" aria-label="delete">
        <MoreIcon />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <AntAvatar alt="Avatar" src={'${avatarImage}/avatar-5.png'} />
    </ListItemAvatar>
    <ListItemText primary="Aidal Danny" secondary="Project Leader" />
  </ListItem>
</List>`;

  return (
    <MainCard content={false} codeString={userListCodeString}>
      <List sx={{ p: 0 }}>
        <ListItem
          divider
          secondaryAction={
            <IconButton edge="end" sx={{ transform: 'rotate(90deg)' }} aria-label="delete" color="secondary">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <AntAvatar alt="Avatar" src={`${avatarImage}/avatar-4.png`} />
          </ListItemAvatar>
          <ListItemText primary="Jone Doe" secondary="Developer" />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end" sx={{ transform: 'rotate(90deg)' }} aria-label="delete" color="secondary">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <AntAvatar alt="Avatar" src={`${avatarImage}/avatar-5.png`} />
          </ListItemAvatar>
          <ListItemText primary="Aidal Danny" secondary="Project Leader" />
        </ListItem>
      </List>
    </MainCard>
  );
};

export default UserList;
