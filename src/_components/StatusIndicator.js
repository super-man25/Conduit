// @flow
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Flex, P1 } from '_components';

import type { Status } from '_constants/status.constants';
import { colorForStatus } from '_constants/status.constants';
import { cssConstants } from '../_constants/css.constants';

type Props = {
  status: Status,
  text: string,
  blink?: boolean,
  title?: string
};

const TextContainer = styled.div`
  display: inline-block;
  margin-right: 4px;
`;

const dotAnimation = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.9;
  }
`;

const Circle = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  opacity: 1;
  border-radius: 6px;
  background-color: ${(props) =>
    colorForStatus(props.status) || colorForStatus('info')};

  ${(props) =>
    props.blink &&
    css`
      animation: ${dotAnimation} 2.2s ease infinite;
    `};
`;

export function StatusIndicator(props: Props) {
  const { status, title, text, blink = false } = props;

  return (
    <Flex align="center" title={title}>
      <TextContainer>
        <P1 color={cssConstants.PRIMARY_DARKEST_GRAY} size="small">
          {text}
        </P1>
      </TextContainer>
      <Circle status={status} blink={blink} />
    </Flex>
  );
}
