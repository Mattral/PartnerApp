// MATERIAL - UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
import { DocumentSketch, Element, Grid5 } from 'iconsax-react';

// ==============================|| LIST - BASIC ||============================== //

const BasicList = () => {
  const basicListCodeString = `<List sx={{ p: 0 }}>
  <ListItem disablePadding divider>
    <ListItemButton>
      <ListItemText primary="List item 01" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding divider>
    <ListItemButton>
      <ListItemText primary="List item 02" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding divider>
    <ListItemButton>
      <ListItemIcon>
        <Grid5 />
      </ListItemIcon>
      <ListItemText primary="Sample" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding divider>
    <ListItemButton>
      <ListItemIcon>
        <DocumentSketch />
      </ListItemIcon>
      <ListItemText primary="Page" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <Element />
      </ListItemIcon>
      <ListItemText primary="UI Elements" />
    </ListItemButton>
  </ListItem>
</List>`;

  return (
    <MainCard content={false} codeHighlight codeString={basicListCodeString}>
      <List sx={{ p: 0, '& .MuiListItemButton-root': { borderRadius: 0, my: 0 } }}>
        <ListItem disablePadding divider>
          <ListItemButton>
            <ListItemText primary="List item 01" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding divider>
          <ListItemButton>
            <ListItemText primary="List item 02" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding divider>
          <ListItemButton>
            <ListItemIcon>
              <Grid5 size={18} />
            </ListItemIcon>
            <ListItemText primary="Sample" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding divider>
          <ListItemButton>
            <ListItemIcon>
              <DocumentSketch size={18} />
            </ListItemIcon>
            <ListItemText primary="Page" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Element size={18} />
            </ListItemIcon>
            <ListItemText primary="UI Elements" />
          </ListItemButton>
        </ListItem>
      </List>
    </MainCard>
  );
};

export default BasicList;
