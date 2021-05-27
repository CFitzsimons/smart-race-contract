import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
};

const Events = (props) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const onCreateEvent = async (event) => {
    const {
      contract,
    } = props;
    await createEvent(contract, event);
    setShowModal(false);
    props.refreshEvents();
  };
  console.log(props.events);
  return (
    <div className={classes.root}>
      <EventModal isOpen={showModal} closeModal={() => setShowModal(false)} createEvent={onCreateEvent} />
      <Grid container spacing={3} style={{ width: '100%', height: '100%' }}>
        {
          props.events.map((event) => (
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardHeader title={event.name} subheader={moment(event.start).format('M/D/YYYY H:mm')} />
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

export default Events;
