import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, CardContent, TextField } from '@material-ui/core';
import {
  DateTimePicker,
} from '@material-ui/pickers';
import { useState } from 'react';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: '50%',
    // backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EventModal = (props) => {
  const classes = useStyles();
  const [max, setMax] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(moment());
  const changeMax = (e) => {
    setMax(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDate = (date) => {
    setStart(date);
  };

  const createEvent = () => {
    props.createEvent({
      title,
      maxParticipants: max,
      start: +start,
    });
    setTitle('');
    setMax('');
    setStart(moment());
  };
  return (
    <Modal open={props.isOpen} onClose={props.closeModal}>
      <Card className={classes.paper}>
        <CardHeader title="Create new race event" />
        <CardContent>
          <TextField style={{ width: '100%' }} value={title} onChange={changeTitle} label="Name of event" />
          <TextField style={{ width: '100%' }}  value={max} onChange={changeMax} label="Max number of participants" type="number" />
          <DateTimePicker
            style={{ width: '100%' }}
            label="Race start"
            onChange={changeDate}
            value={start}
          />
          <Button style={{ float: 'right' }} onClick={createEvent}>
            Create
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default EventModal;