import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

import EventCard from './eventCard';

const Dashboard = ({ events }: { events: any[] }) => {
  return (
    <Box>
      <Grid container spacing={4} style={{ padding: 10 }}>
      {
        events.map((event) => (
          <Grid key={event.name} item xs={12} md={3}>
            <EventCard name={event.name} description={event.description} />
          </Grid>
        ))
      }
      </Grid>
    </Box>
  )
};

export default Dashboard;