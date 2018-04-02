import styled from 'styled-components';
import { cssConstants } from '../_constants';
import stadiumImage from '../_images/stadium.jpg';

export const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  background-image: url(${stadiumImage});
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 70% auto;
`;

//background-image: url(${stadiumImage});
// background-image: ${props => (props.login ? url(stadiumImage) : 'none')};
