//@flow
import * as React from 'react';
import styled from 'styled-components';

import { mobileBreakpoint } from '_constants';

type Props = {
  children: React.Node,
  imageSrc: string,
};

const Wrapper = styled.div`
  display: flex;
  direction: row;
  height: 100vh;
  width: 100vw;
`;

const ContentPane = styled.div`
  flex: 1;
`;

const ImagePane = styled.div`
  flex: 2;
  background-image: ${(props) => props.src};
  background-repeat: no-repeat;
  background-position: 80% 50%;
  background-size: cover;

  @media (max-width: ${mobileBreakpoint}px) {
    display: none;
  }
`;

export const ImageLayout = (props: Props) => {
  const { imageSrc, children } = props;

  return (
    <Wrapper>
      <ContentPane>{children}</ContentPane>
      <ImagePane src={imageSrc} />
    </Wrapper>
  );
};
