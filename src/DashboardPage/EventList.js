import React from 'react';

import {
  H4,
  Input,
  Spacing
} from '../_components';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
`;

type Props = {
  loading: boolean
};

const EventList = (props: Props) => {
  const { loading } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Spacing padding="24px 40px">
        <Heading>All Events</Heading>
        <Input type="text" />
      </Spacing>
    </div>
  );
};

EventList.defaultProps = {
  events: [],
  loading: false
};

export default EventList;
