import React from 'react';
import { cssConstants } from '_constants';
import { MenuIcon, Flex, Box, SeatIcon } from '_components';
import { EventInventoryVerticalRule } from './styled';
import { SeatMap } from './SeatMap';

export class EventInventorySeatMap extends React.Component {
  state = {
    showMap: false
  };

  toggleSeatMap = (value) => {
    this.setState({ showMap: value });
  };

  render() {
    const { showMap } = this.state;

    return (
      <Box>
        <Flex align="center">
          <MenuIcon
            height={30}
            width={30}
            styles={{ cursor: 'pointer' }}
            fill={
              showMap ? cssConstants.PRIMARY_GRAY : cssConstants.SECONDARY_BLUE
            }
            onClick={() => this.toggleSeatMap(false)}
          />
          <EventInventoryVerticalRule
            height="28px"
            width="2px"
            margin="0 0.75rem"
          />
          <SeatIcon
            height={28}
            width={28}
            styles={{ cursor: 'pointer' }}
            fill={
              showMap ? cssConstants.SECONDARY_BLUE : cssConstants.PRIMARY_GRAY
            }
            onClick={() => this.toggleSeatMap(true)}
          />
        </Flex>
        {showMap && (
          <Flex justify="center">
            <SeatMap />
          </Flex>
        )}
      </Box>
    );
  }
}
