import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import modalActions from '../../actions/modal'
import PublicIcon from '@mui/icons-material/Public';
import Event from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../img/smart_events.png';

const navigation = [
  {
    text: 'Public Races',
    Icon: PublicIcon
  },
  {
    text: 'My Races',
    Icon: Event,
  }
];

const Sidebar = () => {
  const drawerIsOpen = useSelector((state: RootStateOrAny) => state.modal.drawer);
  const dispatcher = useDispatch();
  return (
    <Drawer variant="persistent" open={drawerIsOpen}>
      <Toolbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatcher(modalActions.toggle())}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <img src={Logo} alt="logo graphic for sidebar header" />
      <Divider />
      <Box>
        <List>
          {
            navigation.map(({ text, Icon }) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
