import styled from 'styled-components';
import { cssConstants } from '_constants';

export const ForgotLink = styled.span`
  cursor: pointer;
  color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_GRAY};
  font-size: ${(props) => props.size || cssConstants.SUBHEADING_SIZE_S1};
  font-weight: ${(props) => props.weight || cssConstants.SUBHEADING_WEIGHT_S1};
  &:hover {
    color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_BLACK};
  }
`;
