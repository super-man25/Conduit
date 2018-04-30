import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

export const ImageLayout = (props) => {
  const { imageSrc, children } = props;

  return (
    <Wrapper>
      <ContentPane>
        {children}
      </ContentPane>
      <ImagePane src={imageSrc} />
    </Wrapper>
  );
};

ImageLayout.propTypes = {
  /** Content to display */
  children: PropTypes.node,

  /** Background image source */
  imageSrc: PropTypes.string.isRequired
};
