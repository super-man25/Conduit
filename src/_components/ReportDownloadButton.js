// @flow
import React from 'react';
import { cssConstants } from '_constants';
import { Flex, Icon, EDText } from '_components';

export const ReportDownloadButton = (props: {
  onClick: () => void,
  downloading: boolean
}) => {
  const { onClick, downloading } = props;
  const cursor = downloading ? 'no-drop' : 'pointer';
  const color = downloading
    ? cssConstants.PRIMARY_GRAY
    : cssConstants.PRIMARY_BLUE;
  const type = downloading ? 'disabled' : 'secondary';
  const text = downloading ? 'DOWNLOADING...' : 'DOWNLOAD TRANSACTIONS';
  return (
    <Flex
      style={{ cursor }}
      onClick={!downloading ? onClick : undefined}
      direction="row"
      height="24px"
      align="center"
    >
      <Icon size={24} color={color} name="download" />
      <EDText type={type}>{text}</EDText>
    </Flex>
  );
};
