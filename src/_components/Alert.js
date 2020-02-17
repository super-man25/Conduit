// @flow
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { cssConstants, shadows, zIndexes } from '_constants';
import { actions } from '_state/alert';
import { Icon } from './Icon';
import { Flex } from './Flex';

const StyledApiAlert: React.ComponentType<{}> = styled(Flex)`
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: ${zIndexes.BASE};
  width: 350px;
  background-color: ${cssConstants.PRIMARY_WHITE};
  border-color: ${(props) =>
    props.type === 'apiError'
      ? cssConstants.SECONDARY_RED
      : cssConstants.SECONDARY_GREEN};
  box-shadow: ${shadows.SMALL};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  cursor: pointer;
  padding: 25px;
`;

const StatusIcon: React.ComponentType<{}> = styled.div`
  margin-right: 15px;
`;

const StatusText: React.ComponentType<{}> = styled.div`
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 1px;
  color: ${(props) => props.color};
  margin-bottom: 3px;
`;

const MsgText: React.ComponentType<{}> = styled.div`
  font-size: 13px;
  font-weight: 300;
  color: ${cssConstants.PRIMARY_BLACK};
`;

export const Alert = () => {
  const alertState = useSelector(({ alert }) => alert);
  const dispatch = useDispatch();
  const clearAlert = () => dispatch(actions.clear());

  const show = alertState.type !== null && alertState.message !== null;
  const statusColor =
    alertState.type === 'apiError'
      ? cssConstants.SECONDARY_RED
      : cssConstants.SECONDARY_GREEN;
  const statusText = alertState.type === 'apiError' ? 'Error:' : 'Success!';

  return (
    <StyledApiAlert {...alertState} show={show} onClick={clearAlert}>
      <StatusIcon>
        <Icon name={alertState.type} size={40} color={statusColor} />
      </StatusIcon>
      <Flex direction="column">
        <StatusText color={statusColor}>{statusText}</StatusText>
        <MsgText>{alertState.message}</MsgText>
      </Flex>
    </StyledApiAlert>
  );
};
