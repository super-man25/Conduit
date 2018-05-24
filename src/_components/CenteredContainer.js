// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  maxWidth: string
};

export const CenteredContainer: React.ComponentType<Props> = styled.div`
  max-width: ${(props) => props.maxWidth || '1440px'};
  margin: auto;
`;
