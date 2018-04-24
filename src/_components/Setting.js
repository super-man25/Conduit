import styled from 'styled-components';

export const Setting = styled.div`
  width: 100%;
  height: 30px;
  padding: 0;
  margin: 0;
  margin-top: 0px;
  margin-bottom: 30px;
  background: transparent;
  > div {
    display: ${ (props) => { return props.edit ? 'block' : 'none'; } };
  }
  > span {
    display: ${ (props) => { return props.edit ? 'none' : 'block'; } };
  }
`;

export default Setting;