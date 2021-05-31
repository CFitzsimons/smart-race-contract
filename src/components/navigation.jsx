import React from 'react';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';

const Navigation = ({ title }) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer anchor="left" variant="persistent">
      <List style={{ width: 250 }}>
        <ListItem button>
          <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
          <ListItemText>Events</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  </div>
);

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navigation;
