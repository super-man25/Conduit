import styled from 'styled-components';

import { mobileBreakpoint, colors } from '_constants';

export const HideMe = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin: 0;
  padding: 0;
`;

export const ForgotLink = styled.span`
  cursor: pointer;
  color: ${(props) => props.color || colors.lightGray};
  font-size: ${(props) => props.size || '12px'};
  font-weight: ${(props) => props.weight || 'normal'};

  &:hover {
    color: ${(props) => props.color || colors.black};
  }
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LoginFooter = styled.div`
  padding: 40px;
  background-color: ${colors.lightGray};
  font-size: 10px;
  line-height: 130%;
`;

export const LogoImg = styled.img`
  display: block;
  margin: auto;
  padding: 40px;
  padding-top: 10px;
  width: 75%;
`;

export const CenteredContainer = styled.div`
  padding: 20% 40px 40px;
  max-width: 400px;

  @media (max-width: ${mobileBreakpoint}px) {
    margin: 0 auto;
    max-width: none;
    width: 100%;
  }
`;
