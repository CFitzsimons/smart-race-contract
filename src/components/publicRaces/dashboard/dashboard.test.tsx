import { render } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import Dashboard from './index';

const createEvent = () => ({
  name: uuid(),
  description: 'Constant description',
});

describe('Dashboard', () => {
  test('should create one card per event', () => {
    const events = [createEvent(), createEvent()];
    const { container } = render(<Dashboard events={events} />);

    const results = container.getElementsByClassName('MuiCardContent-root');
    expect(results).toHaveLength(2);
  });
});
