import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const EventCard = ({ name, description }: { name: string, description: string }) => {
  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;