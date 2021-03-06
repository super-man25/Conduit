// @flow
import React from 'react';
import { colors } from '_constants';
import { Flex, Icon, EDText } from '_components';

export const ReportDownloadButton = (props: {
  onClick: () => void,
  downloading: boolean,
}) => {
  const { onClick, downloading } = props;
  const cursor = downloading ? 'no-drop' : 'pointer';
  const color = downloading ? colors.gray : colors.blue;
  const type = downloading ? 'disabled' : 'secondary';
  const text = downloading ? 'Downloading...' : 'Download Transactions';
  return (
    <Flex
      style={{ cursor }}
      onClick={!downloading ? onClick : undefined}
      direction="row"
      height="24px"
      align="center"
    >
      <Icon size={24} color={color} name="download" />
      <EDText type={type} weight="heavy" size="small">
        {text}
      </EDText>
    </Flex>
  );
};
