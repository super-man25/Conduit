import React from 'react';

import { Flex, Icon, Text } from '_components';
import { colors } from '_constants';

export const ErrorAlert = (props) => {
  const { msg } = props;
  return (
    <Flex height="20px" align="center" margin="20px">
      <Icon name="apiError" color={colors.red} size={16} />
      <Text paddingLeft="5px" size={12} color={colors.red}>
        {msg}
      </Text>
    </Flex>
  );
};
