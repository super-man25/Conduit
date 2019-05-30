import styled from 'styled-components';
import { cssConstants } from '_constants';

export const HideMe = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin: 0;
  padding: 0;
`;

export const ForgotLink = styled.span`
  cursor: pointer;
  color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_GRAY};
  font-size: ${(props) => props.size || cssConstants.SUBHEADING_SIZE_S1};
  font-weight: ${(props) => props.weight || cssConstants.SUBHEADING_WEIGHT_S1};
  &:hover {
    color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_BLACK};
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
  background-color: ${cssConstants.PRIMARY_EVEN_LIGHTER_GRAY};
  font-size: 10px;
  line-height: 130%;
`;

export const LogoImg = styled.img`
  display: block;
  margin: auto;
  padding: 40px;
  padding-top: 10px;
  width: 40%;
`;
