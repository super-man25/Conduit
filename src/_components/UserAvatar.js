import styled from 'styled-components';
import defaultAvatarImg from '../_images/defaultavatar.png';

const defaultAvatar = 'url(' + defaultAvatarImg + ')';

// const avatarImage (props) => (props.user.avatar ? url(props.user.avatar) : defaultAvatar) 

export const UserAvatar = styled.div`
  height: 100%;
  width: 40px;
  float: right;
  margin: 0;
  padding: 0;
  background: none;
  background-image: ${props => (props.user.avatar ? 'url(' + props.user.avatar + ')' : defaultAvatar)};
  background-position: center center;
  background-repeat: no-repeat;
`;
