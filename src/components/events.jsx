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

const createEvent = async (contract, event) => {
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  try {
    const gas = await contract.methods.createRace(
      event.title,
      event.maxParticipants,
      event.start,
    ).estimateGas();
    await contract.methods.createRace(
      event.title,
      event.maxParticipants,
      event.start,
    ).send({
      from: account,
      gas,
    });
  } catch (err) {
    // TODO: Handle failed events
    // https://github.com/CFitzsimons/smart-race-contract/issues/1
  }
};

const getUserEvents = async (contract) => {
  const userEvents = await contract.methods.getUserEvents().call();
  return userEvents;
};

const signup = async (contract, raceName) => {
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  const gas = await contract.methods.signup(raceName).estimateGas();
  await contract.methods.signup(raceName).send({
    from: account,
    gas,
  });
};

const Events = (props) => {
  const {
    contract,
    refreshEvents,
    events,
  } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const onCreateEvent = async (event) => {
    await createEvent(contract, event);
    setShowModal(false);
    refreshEvents();
  };
  useEffect(() => {
    (async () => {
      setMyEvents(await getUserEvents(props.contract));
    })();
  });
  const register = async (raceName) => {
    await signup(props.contract, raceName);
    setMyEvents(await getUserEvents(props.contract));
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
          events.map((event) => (
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardHeader title={event.name} subheader={moment(event.start).format('M/D/YYYY H:mm')} />
                <CardContent style={{ float: 'right' }}>
                  {
                    myEvents.some((raceName) => raceName === event.name) ? (
                      <Button variant="contained">Deregister</Button>
                    ) : (<Button onClick={() => register(event.name)} variant="contained">Register</Button>)
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
  contract: PropTypes.shapeOf({}).isRequired,
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
