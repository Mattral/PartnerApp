import { Fragment, useEffect, useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

// THIRD - PARTY
import { Chance } from 'chance';

// PROJECT IMPORTS
import UserAvatar from './UserAvatar';
import Dot from 'components/@extended/Dot';
import { useGetUsers } from 'api/chat';

// ASSETS
import { TickCircle } from 'iconsax-react';

// TYPES
import { KeyedObject } from 'types/root';
import { UserProfile } from 'types/user-profile';

const chance = new Chance();

// ==============================|| CHAT - USER LIST ||============================== //

interface UserListProps {
  setUser: (u: UserProfile) => void;
  search?: string;
  selectedUser: string | null;
}

function UserList({ setUser, search, selectedUser }: UserListProps) {
  const theme = useTheme();

  const [data, setData] = useState<UserProfile[]>([]);

  const { usersLoading: loading, users } = useGetUsers();

  useEffect(() => {
    if (!loading) {
      let result = users;
      if (search) {
        result = users.filter((row: KeyedObject) => {
          let matches = true;

          const properties: string[] = ['name'];
          let containsQuery = false;

          properties.forEach((property) => {
            if (row[property].toString().toLowerCase().includes(search.toString().toLowerCase())) {
              containsQuery = true;
            }
          });

          if (!containsQuery) {
            matches = false;
          }
          return matches;
        });
      }
      setData(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, search]);

  if (loading)
    return (
      <List>
        {[1, 2, 3, 4, 5].map((index: number) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton animation="wave" height={24} />}
              secondary={<Skeleton animation="wave" height={16} width="60%" />}
            />
          </ListItem>
        ))}
      </List>
    );

  return (
    <List component="nav">
      {data.map((user) => (
        <Fragment key={user.id}>
          <ListItemButton
            sx={{ pl: 1, borderRadius: 0, '&:hover': { borderRadius: 1 } }}
            onClick={() => {
              setUser(user);
            }}
            divider
            selected={user.id === selectedUser}
          >
            <ListItemAvatar>
              <UserAvatar user={user} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {user.name}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {user.lastMessage}
                  </Typography>
                </Stack>
              }
              secondary={
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <>{user.status}</>
                  <>
                    {user.unReadChatCount ? (
                      <Dot />
                    ) : (
                      // chance.bool() - use for last send msg was read or unread
                      <TickCircle size={16} style={{ color: chance.bool() ? theme.palette.secondary[400] : theme.palette.primary.main }} />
                    )}
                  </>
                </Typography>
              }
            />
          </ListItemButton>
        </Fragment>
      ))}
    </List>
  );
}

export default UserList;
