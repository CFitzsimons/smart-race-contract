import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Button, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

import EventModal from './eventModal';
import event from '../contracts/models/event';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
  },
}));

const Events = (props) => {
  const {
    refreshEvents,
    events,
  } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [myRaces, setMyRaces] = useState([]);
  const onCreateEvent = async (eventInformation) => {
    await event.createEvent(eventInformation);
    setShowModal(false);
    refreshEvents();
  };
  useEffect(() => {
    (async () => {
      setMyRaces(await event.getUserEvents());
    })();
  }, []);
  const register = async (raceName) => {
    await event.signup(raceName);
    setMyRaces(await event.getUserEvents());
  };
  return (
    <div className={classes.root}>
      <EventModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        createEvent={onCreateEvent}
      />
      <Grid container spacing={3} style={{ width: '100%', height: '100%' }}>
        {
          events.map((race) => (
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardHeader title={race.name} subheader={moment(race.start).format('M/D/YYYY H:mm')} />
                <CardContent style={{ float: 'right' }}>
                  {
                    race.isCreator ? (
                      <Button variant="contained" style={{ marginRight: '5px' }}>Edit</Button>
                    ) : null
                  }
                  {
                    myRaces.some((raceName) => raceName === race.name) ? (
                      <Button variant="contained">Deregister</Button>
                    ) : (<Button onClick={() => register(race.name)} variant="contained">Register</Button>)
                  }
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <Fab onClick={() => setShowModal(true)} color="primary" aria-label="add" style={{ bottom: '2%', right: '2%', position: 'absolute' }}>
        <AddIcon />
      </Fab>
    </div>
  );
};

Events.propTypes = {
  refreshEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    name: PropTypes.string,
  })),
};

Events.defaultProps = {
  events: [],
};

export default Events;
