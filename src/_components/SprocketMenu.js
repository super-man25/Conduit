import styled from 'styled-components';
import sprocketImg from '_images/sprocket.png';

export const SprocketMenu = styled.div`
  height: 100%;
  width: 38px;
  padding: 0;
  margin: 0;
  background: none;
  background-image: ${`url(${sprocketImg})`};
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
`;
