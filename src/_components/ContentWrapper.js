import styled from 'styled-components';
import { colors } from '_constants';
import stadiumImage from '_images/stadium.jpg';

const stadium = `url(${stadiumImage})`;

export const ContentWrapper = styled.div`
  position: relative;
  height: ${(props) => (props.login ? '100%' : 'calc(100% - 70px)')};
  margin: 0;
  padding: 0;
  background: ${colors};
  background-image: ${(props) => (props.login ? stadium : 'none')};
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 70% auto;
`;
