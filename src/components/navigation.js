import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Navigation = (props) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
            {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
      <Drawer anchor='left' variant="persistent">
        <List style={{ width: 250 }}>
          <ListItem button>
            <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
            <ListItemText>Events</ListItemText>
          </ListItem>
        </List>
      </Drawer>
  </div>
);

export default Navigation;
