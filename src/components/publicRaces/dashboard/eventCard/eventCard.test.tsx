import { render, screen } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import EventCard from './eventCard';

const createEvent = () => ({
  name: uuid(),
  description: 'Constant description',
});

describe('EventCard', () => {
  test('should create a card', async () => {
    const { name, description } = createEvent();
    render(<EventCard name={name} description={description} />);

    let foundNode = await screen.findByText(name);
    expect(foundNode).toBeDefined();
    foundNode = await screen.findByText(description);
    expect(foundNode).toBeDefined();
  });
});
