// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cssConstants, shadows, zIndexes } from '_constants';
import { Icon } from './Icon';

type Props = {
  alertState: {
    type: 'api-error' | 'api-success',
    message: string
  }
};

export const ApiAlertDiv: React.ComponentType<{}> = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: ${zIndexes.BASE};
  font-size: 18px;
  width: 357px;
  height: 90px;
  background-color: ${cssConstants.PRIMARY_WHITE};
  border-color: ${(props) =>
    props.type === 'api-error'
      ? cssConstants.SECONDARY_RED
      : cssConstants.SECONDARY_GREEN};
  box-shadow: ${shadows.SMALL};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const StatusIcon: React.ComponentType<{}> = styled.div`
  position: absolute;
  top: 26px;
  left: 26px;
`;

const StatusText: React.ComponentType<{}> = styled.div`
  position: absolute;
  top: 26px;
  left: 93px;
  font-size: 1.2em;
  font-weight: 300;
  letter-spacing: 1px;
  color: ${(props) => props.color};
`;

const MsgText: React.ComponentType<{}> = styled.div`
  position: absolute;
  top: 54px;
  left: 93px;
  font-size: 0.7em;
  font-weight: 300;
  margin-right: 24px;
  color: ${cssConstants.PRIMARY_BLACK};
`;

export class ApiAlertPresenter extends React.Component<Props> {
  render() {
    const { alertState } = this.props;
    const show = {
      show: alertState.type !== null && alertState.message !== null
    };
    const statusColor =
      alertState.type === 'api-error'
        ? cssConstants.SECONDARY_RED
        : cssConstants.SECONDARY_GREEN;
    const statusText = alertState.type === 'api-error' ? 'Error:' : 'Success!';

    return (
      <ApiAlertDiv {...alertState} {...show}>
        <StatusIcon>
          <Icon name={alertState.type} size={39} color={statusColor} />
        </StatusIcon>
        <StatusText color={statusColor}>{statusText}</StatusText>
        <MsgText>{alertState.message}</MsgText>
      </ApiAlertDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    alertState: state.alert
  };
}

export const ApiAlert = connect(
  mapStateToProps,
  null
)(ApiAlertPresenter);
