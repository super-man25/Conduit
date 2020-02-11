import React from 'react';
import { Flex, Icon, Text } from '_components';
import { cssConstants } from '_constants';

export const ErrorAlert = (props) => {
  const { msg } = props;
  return (
    <Flex height="20px" align="center" margin="20px">
      <Icon name="apiError" color={cssConstants.SECONDARY_RED} size={16} />
      <Text paddingLeft="5px" size={12} color={cssConstants.SECONDARY_RED}>
        {msg}
      </Text>
    </Flex>
  );
};
